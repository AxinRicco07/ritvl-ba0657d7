import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPrefix } from "@/utils/fetch";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Read Razorpay public key from env; set VITE_RAZORPAY_KEY_ID in your frontend environment.
const RAZORPAY_KEY_ID = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID as string;

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PendingOrder = {
  items: { sku: string; name: string; price: number; quantity: number; image?: string }[];
  subtotal: number;
  taxes: number;
  deliveryCharges: number;
  total: number;
  paymentMethod: "COD" | "UPI";
  billingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  deliveryAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  orderDate: string;
};

export default function Payment() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [opening, setOpening] = useState(false);
  const [retried, setRetried] = useState(false);

  const startPayment = useCallback(async () => {
    const stored = sessionStorage.getItem("ritvl:pendingOrder");
    if (!stored) {
      toast.error("No pending order found. Please try checkout again.");
      navigate("/checkout");
      return;
    }
    const order: PendingOrder = JSON.parse(stored);

    if (order.paymentMethod !== "UPI") {
      navigate("/checkout");
      return;
    }

    let idempotencyKey = localStorage.getItem("checkout:pendingIdempotencyKey");
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
      localStorage.setItem("checkout:pendingIdempotencyKey", idempotencyKey);
    }

    try {
      setCreating(true);
      // If Razorpay order already exists from Checkout step, reuse it; otherwise create it now.
      let rpOrder = (() => {
        try {
          const storedRp = sessionStorage.getItem("ritvl:rpOrder");
          return storedRp ? JSON.parse(storedRp) : null;
        } catch { return null; }
      })();

      if (!rpOrder) {
        // 1) Create prepaid order on backend (Razorpay order + internal orderId)
        const res = await fetch(`${fetchPrefix}/api/orders/checkout/razorpay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(order),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to initiate payment");
        }
        rpOrder = await res.json();
        // persist for refresh safety
        sessionStorage.setItem("ritvl:rpOrder", JSON.stringify(rpOrder));
      }

      // If server returned a stale order (amount mismatch) and we haven't retried yet,
      // drop idempotency key to force a new Razorpay order creation and retry once.
      if (
        rpOrder?.amount != null &&
        Number.isFinite(rpOrder.amount) &&
        Math.abs((rpOrder.amount / 100) - order.total) > 1 &&
        !retried
      ) {
        console.warn("Razorpay order amount mismatch; regenerating idempotency key and retrying once", {
          rpAmount: rpOrder.amount / 100,
          expected: order.total,
        });
        // regenerate idempotency key and retry once
        localStorage.removeItem("checkout:pendingIdempotencyKey");
        const newKey = crypto.randomUUID();
        localStorage.setItem("checkout:pendingIdempotencyKey", newKey);
        setRetried(true);

        const res2 = await fetch(`${fetchPrefix}/api/orders/checkout/razorpay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": newKey,
          },
          body: JSON.stringify(order),
        });
        if (!res2.ok) {
          const err = await res2.json().catch(() => ({}));
          throw new Error(err.message || "Failed to initiate payment");
        }
        rpOrder = await res2.json();
        sessionStorage.setItem("ritvl:rpOrder", JSON.stringify(rpOrder));
      }

      // 2) Ensure Razorpay script loaded
      const ensureScript = () =>
        new Promise<void>((resolve, reject) => {
          if (window.Razorpay) return resolve();
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
          document.body.appendChild(script);
        });

      await ensureScript();

      // 3) Open Razorpay Checkout
      if (!RAZORPAY_KEY_ID) {
        throw new Error("Razorpay key not configured. Please set VITE_RAZORPAY_KEY_ID");
      }
      setOpening(true);
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        name: "RITVL",
        description: "Order Payment",
        order_id: rpOrder.id,
        prefill: {
          name: order.billingAddress.name,
          email: order.billingAddress.email,
          contact: order.billingAddress.phone,
        },
        theme: { color: "#111827" },
        // Show upi + netbanking prominently
        config: {
          display: {
            blocks: {
              upi: { name: "UPI", instruments: [{ method: "upi" }] },
              netbanking: {
                name: "Netbanking",
                instruments: [{ method: "netbanking" }],
              },
            },
            sequence: ["block.upi", "block.netbanking"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        modal: {
          ondismiss: () => {
            toast.message("Payment cancelled. You can try again.");
            sessionStorage.removeItem("ritvl:rpOrder");
            navigate("/checkout");
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 4) Verify payment on backend
            const verifyRes = await fetch(
              `${fetchPrefix}/api/orders/checkout/razorpay/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorPayOrderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  orderId: rpOrder.orderId,
                }),
              }
            );
            if (!verifyRes.ok) {
              const err = await verifyRes.json().catch(() => ({}));
              throw new Error(err.message || "Payment verification failed");
            }
            const verified = await verifyRes.json();

            // 5) Persist order to localStorage in shape used by Orders page
            const existingOrders = JSON.parse(
              localStorage.getItem("ritvl-orders") || "[]"
            );
            const savedOrder = {
              products: order.items.map((item) => ({
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                sku: item.sku,
                id: item.sku, // fallback
                image: item.image || "",
              })),
              billingAddress: {
                customerName: order.billingAddress.name,
                address1: order.billingAddress.address,
                city: order.billingAddress.city,
                pincode: order.billingAddress.pincode,
                state: order.billingAddress.state,
                country: order.billingAddress.country,
                email: order.billingAddress.email,
                phone: order.billingAddress.phone,
              },
              shippingAddress: {
                customerName: order.deliveryAddress.name,
                address1: order.deliveryAddress.address,
                city: order.deliveryAddress.city,
                pincode: order.deliveryAddress.pincode,
                state: order.deliveryAddress.state,
                country: order.deliveryAddress.country,
                email: order.deliveryAddress.email,
                phone: order.deliveryAddress.phone,
              },
              orderDate: order.orderDate,
              paymentMethod: "PREPAID",
              orderStatus: "CONFIRMED",
              totalAmount: verified?.totalAmount ?? order.total,
              shippingCharges: verified?.shippingCharges ?? order.deliveryCharges,
              taxes: verified?.taxes ?? order.taxes,
              subtotal: verified?.subtotal ?? order.subtotal,
              trackingUrl: verified?.trackingUrl || "",
              shipmentId: verified?.shipmentId || "",
              isShippingBilling: false,
              paymentStatus: "PAID",
              idempotencyKey: idempotencyKey,
              orderId: rpOrder.orderId,
            };
            existingOrders.unshift(savedOrder);
            localStorage.setItem("ritvl-orders", JSON.stringify(existingOrders));

            // Cleanup
            sessionStorage.removeItem("ritvl:pendingOrder");
            sessionStorage.removeItem("ritvl:rpOrder");
            localStorage.removeItem("checkout:pendingIdempotencyKey");
            clearCart();

            toast.success("Payment successful. Order placed!");
            navigate("/orders");
          } catch (err) {
            toast.error((err as Error).message || "Payment verification failed");
          }
        },
      } as any;

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error((error as Error).message || "Unable to start payment");
      navigate("/checkout");
    } finally {
      setCreating(false);
      setOpening(false);
      setLoading(false);
    }
  }, [navigate, clearCart]);

  useEffect(() => {
    startPayment();
  }, [startPayment]);

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4 md:px-8 text-center">
      <div className="flex flex-col items-center gap-4">
        {(loading || creating || opening) ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Redirecting to secure payment...</p>
          </>
        ) : (
          <>
            <p>Payment was cancelled. You can return to checkout.</p>
            <div className="flex gap-3 mt-4">
              <Button onClick={() => navigate("/checkout")}>Back to Checkout</Button>
              <Button variant="secondary" onClick={startPayment}>Try Again</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


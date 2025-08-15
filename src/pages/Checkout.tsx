import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatINRWithPaisa } from "@/utils/currency";
import { toast } from "sonner";
import { fetchPrefix } from "@/utils/fetch";

interface CheckoutFormData {
  billingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  isShippingSameBilling: boolean;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: "COD" | "UPI";
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isShippingChargesLoading, setIsShippingChargesLoading] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For order submission
  const [formData, setFormData] = useState<CheckoutFormData>({
    billingAddress: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    isShippingSameBilling: true,
    shippingAddress: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    paymentMethod: "COD",
  });

  const subtotal = getCartTotal();
  const taxes = Math.round(subtotal * 0.18);
  const [shippingCharges, setShippingCharges] = useState<number>(0);
  const total = subtotal + shippingCharges;

  // Auto-fetch shipping charges when pincode is valid
  useEffect(() => {
    const pincode = formData.shippingAddress.pincode;
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      setIsShippingChargesLoading(true);
      fetch(`${fetchPrefix}/api/shipments/check-cart-serviceability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delivery_postcode: pincode,
          cartItems: cartItems.map((item) => ({
            sku: item.sku,
            quantity: item.quantity,
          })),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isServiceable) {
            setShippingCharges(data.rate);
          } else {
            setShippingCharges(0);
            toast.error("Delivery not available at this pincode.");
          }
        })
        .catch(() => {
          setShippingCharges(0);
          toast.error("Could not calculate shipping. Please try again.");
        })
        .finally(() => {
          setIsShippingChargesLoading(false);
        });
    } else if (pincode.length > 0) {
      setShippingCharges(0);
    }
  }, [formData.shippingAddress.pincode, cartItems]);

  // Prevent accidental navigation during order processing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSubmitting]);

  const handleInputChange = (
    section: "billingAddress" | "shippingAddress",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleShippingSameChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isShippingSameBilling: checked,
      shippingAddress: checked
        ? { ...prev.billingAddress }
        : prev.shippingAddress,
    }));
  };

  const validateForm = () => {
    const { billingAddress, shippingAddress, isShippingSameBilling } = formData;

    const requiredBilling = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];
    for (const field of requiredBilling) {
      if (!billingAddress[field as keyof typeof billingAddress]?.trim()) {
        toast.error(`Please fill in billing ${field}`);
        return false;
      }
    }

    if (!isShippingSameBilling) {
      const requiredShipping = [
        "name",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
      ];
      for (const field of requiredShipping) {
        if (!shippingAddress[field as keyof typeof shippingAddress]?.trim()) {
          toast.error(`Please fill in shipping ${field}`);
          return false;
        }
      }
    }

    if (!shippingCharges) {
      toast.error("Shipping charges not calculated. Please check pincode.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || isSubmitting) return;

    // ✅ Get or generate idempotency key
    let idempotencyKey = localStorage.getItem("checkout:pendingIdempotencyKey");
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
      localStorage.setItem("checkout:pendingIdempotencyKey", idempotencyKey);
    }

    setIsSubmitting(true);

    try {
      const order = {
        items: cartItems.map((item) => ({
          sku: item.sku,
          name: item.name,
          price: item.price.sp,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        taxes,
        deliveryCharges: shippingCharges,
        total,
        paymentMethod: formData.paymentMethod,
        billingAddress: {
          name: formData.billingAddress.name,
          email: formData.billingAddress.email,
          phone: formData.billingAddress.phone,
          address: formData.billingAddress.address,
          city: formData.billingAddress.city,
          state: formData.billingAddress.state,
          pincode: formData.billingAddress.pincode,
          country: "India",
        },
        deliveryAddress: {
          name: formData.shippingAddress.name,
          phone: formData.shippingAddress.phone,
          address: formData.shippingAddress.address,
          city: formData.shippingAddress.city,
          state: formData.shippingAddress.state,
          pincode: formData.shippingAddress.pincode,
          country: "India",
          email: formData.billingAddress.email,
        },
        orderDate: new Date().toISOString().split("T")[0],
      };

      const res = await fetch(`${fetchPrefix}/api/orders/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to place order");
      }

      const result = await res.json();

      // ✅ Success: cleanup
      localStorage.removeItem("checkout:pendingIdempotencyKey");
      const existingOrders = JSON.parse(
        localStorage.getItem("ritvl-orders") || "[]"
      );
      existingOrders.unshift({
        ...result,
        orderId: result.orderId || crypto.randomUUID(),
      });
      localStorage.setItem("ritvl-orders", JSON.stringify(existingOrders));

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error: unknown) {
      const errMsg = (error as Error).message || "Something went wrong";
      console.error("Order error:", error);

      toast.error(`Order failed: ${errMsg}`, {
        duration: 5000,
        action: {
          label: "Retry",
          onClick: () => {
            // Reuse same key
            handlePlaceOrder();
          },
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4 md:px-8 text-center">
        <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to your cart before checkout.
        </p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div
      className={`container max-w-7xl mx-auto py-8 px-4 md:px-8 ${
        isShippingChargesLoading || isSubmitting
          ? "pointer-events-none opacity-95"
          : ""
      }`}
    >
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billing-name">Full Name *</Label>
                  <Input
                    id="billing-name"
                    type="text"
                    value={formData.billingAddress.name}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress",
                        "name",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-email">Email *</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={formData.billingAddress.email}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress",
                        "email",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="billing-phone">Phone Number *</Label>
                <Input
                  id="billing-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.billingAddress.phone}
                  onChange={(e) =>
                    handleInputChange(
                      "billingAddress",
                      "phone",
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="billing-address">Address *</Label>
                <Textarea
                  id="billing-address"
                  value={formData.billingAddress.address}
                  onChange={(e) =>
                    handleInputChange(
                      "billingAddress",
                      "address",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="billing-city">City *</Label>
                  <Input
                    id="billing-city"
                    type="text"
                    value={formData.billingAddress.city}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress",
                        "city",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-state">State *</Label>
                  <Input
                    id="billing-state"
                    type="text"
                    value={formData.billingAddress.state}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress",
                        "state",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-pincode">Pincode *</Label>
                  <Input
                    id="billing-pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.billingAddress.pincode}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress",
                        "pincode",
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="same-as-billing"
                  checked={formData.isShippingSameBilling}
                  onCheckedChange={handleShippingSameChange}
                />
                <Label htmlFor="same-as-billing">Same as billing address</Label>
              </div>
              {!formData.isShippingSameBilling && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shipping-name">Full Name *</Label>
                      <Input
                        id="shipping-name"
                        type="text"
                        value={formData.shippingAddress.name}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingAddress",
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-phone">Phone Number *</Label>
                      <Input
                        id="shipping-phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.shippingAddress.phone}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingAddress",
                            "phone",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shipping-address">Address *</Label>
                    <Textarea
                      id="shipping-address"
                      value={formData.shippingAddress.address}
                      onChange={(e) =>
                        handleInputChange(
                          "shippingAddress",
                          "address",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shipping-city">City *</Label>
                      <Input
                        id="shipping-city"
                        type="text"
                        value={formData.shippingAddress.city}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingAddress",
                            "city",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-state">State *</Label>
                      <Input
                        id="shipping-state"
                        type="text"
                        value={formData.shippingAddress.state}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingAddress",
                            "state",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-pincode">Pincode *</Label>
                      <Input
                        id="shipping-pincode"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={formData.shippingAddress.pincode}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingAddress",
                            "pincode",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: "COD" }))
                    }
                  />
                  <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <input
                    type="radio"
                    id="upi"
                    name="payment"
                    value="upi"
                    disabled
                  />
                  <Label htmlFor="upi" className="text-muted-foreground">
                    UPI (Coming Soon)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.sku}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-secondary rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatINRWithPaisa(
                          item.price.sp * item.quantity * 100
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINRWithPaisa(subtotal * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Taxes (18% GST inc.)
                  </span>
                  <span>{formatINRWithPaisa(taxes * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {isShippingChargesLoading
                      ? "Calculating..."
                      : shippingCharges === 0
                      ? "Free"
                      : formatINRWithPaisa(shippingCharges * 100)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatINRWithPaisa(total * 100)}</span>
                </div>
              </div>
              <Button
                disabled={!shippingCharges || isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatINRWithPaisa } from "@/utils/currency";
import { toast } from "sonner";
import { fetchPrefix } from "@/utils/fetch";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
  const [isShippingChargesLoading, setIsShippingChargesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const total = subtotal + taxes + shippingCharges;

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

  const validateForm = () => {
    const { billingAddress, shippingAddress } = formData;

    const requiredBilling = ["name", "email", "phone", "address", "city", "state", "pincode"];
    for (const field of requiredBilling) {
      if (!billingAddress[field as keyof typeof billingAddress]?.trim()) {
        toast.error(`Please fill in billing ${field}`);
        return false;
      }
    }

    const requiredShipping = ["name", "phone", "address", "city", "state", "pincode"];
    for (const field of requiredShipping) {
      if (!shippingAddress[field as keyof typeof shippingAddress]?.trim()) {
        toast.error(`Please fill in shipping ${field}`);
        return false;
      }
    }

    if (!shippingCharges) {
      toast.error("Shipping charges not calculated. Please check shipping pincode.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || isSubmitting) return;

    let idempotencyKey = localStorage.getItem("checkout:pendingIdempotencyKey");
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
      localStorage.setItem("checkout:pendingIdempotencyKey", idempotencyKey);
    }

    setIsSubmitting(true);

    try {
      const deliveryAddress = {
        ...formData.shippingAddress,
        country: "India",
        email: formData.billingAddress.email,
      };

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
          ...formData.billingAddress,
          country: "India",
        },
        deliveryAddress,
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

      localStorage.removeItem("checkout:pendingIdempotencyKey");
      const existingOrders = JSON.parse(localStorage.getItem("ritvl-orders") || "[]");
      existingOrders.unshift({ ...result, orderId: result.orderId || crypto.randomUUID() });
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container max-w-7xl mx-auto py-16 px-4 md:px-8 text-center"
      >
        <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to your cart before checkout.
        </p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`container max-w-7xl mx-auto py-8 px-4 md:px-8 ${
        isShippingChargesLoading || isSubmitting ? "pointer-events-none opacity-95" : ""
      }`}
    >
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Address */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 py-4">
                <CardTitle className="text-lg font-medium">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="billing-name" className="font-medium">Full Name *</Label>
                    <Input
                      id="billing-name"
                      type="text"
                      value={formData.billingAddress.name}
                      onChange={(e) =>
                        handleInputChange("billingAddress", "name", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="billing-email" className="font-medium">Email *</Label>
                    <Input
                      id="billing-email"
                      type="email"
                      value={formData.billingAddress.email}
                      onChange={(e) =>
                        handleInputChange("billingAddress", "email", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="billing-phone" className="font-medium">Phone Number *</Label>
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
                    className="focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="billing-address" className="font-medium">Address *</Label>
                  <Textarea
                    id="billing-address"
                    value={formData.billingAddress.address}
                    onChange={(e) =>
                      handleInputChange("billingAddress", "address", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-primary/50"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="billing-city" className="font-medium">City *</Label>
                    <Input
                      id="billing-city"
                      type="text"
                      value={formData.billingAddress.city}
                      onChange={(e) =>
                        handleInputChange("billingAddress", "city", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="billing-state" className="font-medium">State *</Label>
                    <Input
                      id="billing-state"
                      type="text"
                      value={formData.billingAddress.state}
                      onChange={(e) =>
                        handleInputChange("billingAddress", "state", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="billing-pincode" className="font-medium">Pincode *</Label>
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
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 py-4">
                <CardTitle className="text-lg font-medium">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="shipping-name" className="font-medium">Full Name *</Label>
                    <Input
                      id="shipping-name"
                      type="text"
                      value={formData.shippingAddress.name}
                      onChange={(e) =>
                        handleInputChange("shippingAddress", "name", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="shipping-phone" className="font-medium">Phone Number *</Label>
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
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="shipping-address" className="font-medium">Address *</Label>
                  <Textarea
                    id="shipping-address"
                    value={formData.shippingAddress.address}
                    onChange={(e) =>
                      handleInputChange("shippingAddress", "address", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-primary/50"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="shipping-city" className="font-medium">City *</Label>
                    <Input
                      id="shipping-city"
                      type="text"
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        handleInputChange("shippingAddress", "city", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="shipping-state" className="font-medium">State *</Label>
                    <Input
                      id="shipping-state"
                      type="text"
                      value={formData.shippingAddress.state}
                      onChange={(e) =>
                        handleInputChange("shippingAddress", "state", e.target.value)
                      }
                      required
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="shipping-pincode" className="font-medium">Pincode *</Label>
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
                      className="focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 py-4">
                <CardTitle className="text-lg font-medium">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-md border border-input hover:border-primary transition-colors">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, paymentMethod: "COD" }))
                      }
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="cod" className="font-medium">Cash on Delivery (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-md border border-input opacity-50">
                    <input 
                      type="radio" 
                      id="upi" 
                      name="payment" 
                      value="upi" 
                      disabled 
                      className="h-4 w-4"
                    />
                    <Label htmlFor="upi" className="text-muted-foreground font-medium">
                      UPI (Coming Soon)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-4 border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 py-4">
              <CardTitle className="text-lg font-medium">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.sku}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className="w-12 h-12 bg-secondary rounded-md overflow-hidden border">
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
                        {formatINRWithPaisa(item.price.sp * item.quantity * 100)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINRWithPaisa(subtotal * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (18% GST)</span>
                  <span>{formatINRWithPaisa(taxes * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {isShippingChargesLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Calculating...
                      </span>
                    ) : shippingCharges === 0 ? (
                      "Free"
                    ) : (
                      // FIXED: Removed *100 multiplication here
                      formatINRWithPaisa(shippingCharges * 100)
                    )}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg pt-1">
                  <span>Total</span>
                  <span>{formatINRWithPaisa(total * 100)}</span>
                </div>
              </div>
              <Button
                disabled={!shippingCharges || isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full mt-4 py-6 text-base"
                size="lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing Order...
                  </span>
                ) : (
                  "Place Order"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
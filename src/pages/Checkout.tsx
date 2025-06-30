
import { useState } from "react";
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
  paymentMethod: "cod" | "upi";
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

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
    paymentMethod: "cod",
  });

  const subtotal = getCartTotal();
  const taxes = Math.round(subtotal * 0.18); // 18% GST
  const shippingCharges = subtotal > 50000 ? 0 : 599; // Free shipping above ₹500
  const total = subtotal + taxes + shippingCharges;

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
        ? {
            name: prev.billingAddress.name,
            phone: prev.billingAddress.phone,
            address: prev.billingAddress.address,
            city: prev.billingAddress.city,
            state: prev.billingAddress.state,
            pincode: prev.billingAddress.pincode,
          }
        : prev.shippingAddress,
    }));
  };

  const validateForm = () => {
    const { billingAddress, shippingAddress, isShippingSameBilling } = formData;
    
    // Validate billing address
    const requiredBillingFields = ["name", "email", "phone", "address", "city", "state", "pincode"];
    for (const field of requiredBillingFields) {
      if (!billingAddress[field as keyof typeof billingAddress]) {
        toast.error(`Please fill in billing ${field}`);
        return false;
      }
    }

    // Validate shipping address if different from billing
    if (!isShippingSameBilling) {
      const requiredShippingFields = ["name", "phone", "address", "city", "state", "pincode"];
      for (const field of requiredShippingFields) {
        if (!shippingAddress[field as keyof typeof shippingAddress]) {
          toast.error(`Please fill in shipping ${field}`);
          return false;
        }
      }
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems.map(item => ({
        id: item.productId,
        name: item.name,
        price: item.price.sp,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal,
      taxes,
      deliveryCharges: shippingCharges,
      total,
      paymentMethod: formData.paymentMethod === "cod" ? "Cash on Delivery" : "UPI",
      deliveryAddress: formData.isShippingSameBilling ? {
        name: formData.billingAddress.name,
        address: formData.billingAddress.address,
        city: formData.billingAddress.city,
        pincode: formData.billingAddress.pincode,
        phone: formData.billingAddress.phone,
      } : {
        name: formData.shippingAddress.name,
        address: formData.shippingAddress.address,
        city: formData.shippingAddress.city,
        pincode: formData.shippingAddress.pincode,
        phone: formData.shippingAddress.phone,
      },
      orderDate: new Date().toISOString().split('T')[0],
      status: "Processing",
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('ritvl-orders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('ritvl-orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    // Show success message
    toast.success("Order placed successfully!");

    // Navigate to orders page
    navigate("/orders");
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
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
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
                    onChange={(e) => handleInputChange("billingAddress", "name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-email">Email *</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={formData.billingAddress.email}
                    onChange={(e) => handleInputChange("billingAddress", "email", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="billing-phone">Phone Number *</Label>
                <Input
                  id="billing-phone"
                  type="tel"
                  value={formData.billingAddress.phone}
                  onChange={(e) => handleInputChange("billingAddress", "phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="billing-address">Address *</Label>
                <Textarea
                  id="billing-address"
                  value={formData.billingAddress.address}
                  onChange={(e) => handleInputChange("billingAddress", "address", e.target.value)}
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
                    onChange={(e) => handleInputChange("billingAddress", "city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-state">State *</Label>
                  <Input
                    id="billing-state"
                    type="text"
                    value={formData.billingAddress.state}
                    onChange={(e) => handleInputChange("billingAddress", "state", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billing-pincode">Pincode *</Label>
                  <Input
                    id="billing-pincode"
                    type="text"
                    value={formData.billingAddress.pincode}
                    onChange={(e) => handleInputChange("billingAddress", "pincode", e.target.value)}
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
                        onChange={(e) => handleInputChange("shippingAddress", "name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-phone">Phone Number *</Label>
                      <Input
                        id="shipping-phone"
                        type="tel"
                        value={formData.shippingAddress.phone}
                        onChange={(e) => handleInputChange("shippingAddress", "phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shipping-address">Address *</Label>
                    <Textarea
                      id="shipping-address"
                      value={formData.shippingAddress.address}
                      onChange={(e) => handleInputChange("shippingAddress", "address", e.target.value)}
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
                        onChange={(e) => handleInputChange("shippingAddress", "city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-state">State *</Label>
                      <Input
                        id="shipping-state"
                        type="text"
                        value={formData.shippingAddress.state}
                        onChange={(e) => handleInputChange("shippingAddress", "state", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-pincode">Pincode *</Label>
                      <Input
                        id="shipping-pincode"
                        type="text"
                        value={formData.shippingAddress.pincode}
                        onChange={(e) => handleInputChange("shippingAddress", "pincode", e.target.value)}
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
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as "cod" }))}
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
                  <Label htmlFor="upi" className="text-muted-foreground">UPI (Coming Soon)</Label>
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
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.sku}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatINRWithPaisa(item.price.sp * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINRWithPaisa(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (18% GST)</span>
                  <span>{formatINRWithPaisa(taxes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCharges === 0 ? "Free" : formatINRWithPaisa(shippingCharges)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatINRWithPaisa(total)}</span>
                </div>
              </div>

              <Button 
                onClick={handlePlaceOrder} 
                className="w-full" 
                size="lg"
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

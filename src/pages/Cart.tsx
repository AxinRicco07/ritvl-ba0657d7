import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, ShoppingCart, LoaderCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatINRWithPaisa } from "@/utils/currency";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const subtotal = getCartTotal();
  const total = subtotal;

  const [dAvailableChecking, setDAvailableChecking] = useState(false);
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">((sessionStorage.getItem("ritvl:preferredPayment") as "COD" | "UPI") || "COD");
  const [codAvailable, setCodAvailable] = useState<boolean | null>(null);
  const [prepaidAvailable, setPrepaidAvailable] = useState<boolean | null>(null);
  const [serviceMessage, setServiceMessage] = useState<string | null>(null);

  const { mutate: checkDelivery } = useMutation({
    mutationFn: async (pincode: string) => {
      const body = {
        delivery_postcode: pincode,
        cartItems: cartItems.map((item) => ({
          sku: item.sku,
          quantity: item.quantity,
        })),
      };

      console.log(JSON.stringify(body, null, 2));

      const response = await fetch(
        `${fetchPrefix}/api/shipments/check-cart-serviceability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check delivery availability");
      }
      return response.json();
    },
    onSuccess: (data: { isServiceable: boolean; message?: string; codAvailable?: boolean; prepaidAvailable?: boolean; rate?: number }) => {
      setServiceMessage(data.message || null);
      setCodAvailable(data.codAvailable ?? null);
      setPrepaidAvailable(data.prepaidAvailable ?? null);

      if (data.isServiceable) {
        if (data.codAvailable === false && data.prepaidAvailable) {
          setPaymentMethod("UPI");
          sessionStorage.setItem("ritvl:preferredPayment", "UPI");
          toast.message(data.message || "Prepaid delivery is available. COD not available for this pincode.");
        } else {
          toast.success(data.message || "Delivery is available for this pincode!");
        }
      } else {
        toast.error(data.message || "Sorry, delivery is not available for this pincode.");
      }
    },
    onError(error, variables, context) {
      toast.error("Failed to check delivery availability. Please try again.");
      console.error("Error checking delivery:", error);
    },
    onSettled() {
      setDAvailableChecking(false);
    },
  });

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4 md:px-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-secondary p-4">
              <CardTitle className="text-lg font-medium">Your Items</CardTitle>
            </CardHeader>
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-sm font-medium">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.quantity}`}
                className="border-t border-border first:border-t-0 p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product info */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div className="w-20 h-20 bg-secondary/30 rounded-md overflow-hidden border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm text-muted-foreground flex items-center gap-1 hover:text-destructive transition-colors mt-2 md:hidden"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">
                      Price:
                    </span>
                    <span>{formatINRWithPaisa(item.price.sp * 100)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-input rounded-md w-24 md:mx-auto">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 hover:bg-secondary transition-colors text-sm disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-secondary transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 md:text-right flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">
                      Total:
                    </span>
                    <span className="font-medium">
                      {formatINRWithPaisa(item.price.sp * item.quantity * 100)}
                    </span>
                  </div>

                  {/* Remove button (desktop) */}
                  <div className="md:col-span-1 text-center hidden md:block">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <div className="flex justify-between mt-6">
            <Button asChild variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button 
              onClick={clearCart} 
              variant="destructive"
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" /> Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINRWithPaisa(subtotal * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-sm text-foreground">
                    Calculated at checkout
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>{formatINRWithPaisa(total * 100)}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Check Delivery Availability</h3>
                <div className="flex gap-2">
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    type="text"
                    placeholder="Enter pincode"
                    className="px-3 py-2 border border-input rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-black"
                    inputMode="numeric"
                  />
                  <Button
                    onClick={() => {
                      if (pincode.trim() === "") {
                        toast.error("Please enter a pincode");
                        return;
                      }
                      if (pincode.length !== 6) {
                        toast.error("Pincode must be 6 digits");
                        return;
                      }
                      setDAvailableChecking(true);
                      checkDelivery(pincode);
                    }}
                    variant="outline"
                    disabled={dAvailableChecking}
                    className="min-w-[80px]"
                  >
                    {dAvailableChecking ? (
                      <LoaderCircle className="animate-spin h-5 w-5" />
                    ) : (
                      "Check"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter a 6-digit pincode to check delivery availability
                </p>
                {serviceMessage && (
                  <p className="text-sm mt-2">{serviceMessage}</p>
                )}
              </div>

              {/* Payment selection */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-3 border rounded-md ${codAvailable === false ? 'opacity-60' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      disabled={codAvailable === false}
                      checked={paymentMethod === "COD"}
                      onChange={() => {
                        setPaymentMethod("COD");
                        sessionStorage.setItem("ritvl:preferredPayment", "COD");
                      }}
                    />
                    <span>Cash on Delivery (COD)</span>
                    {codAvailable === false && (
                      <span className="text-xs text-muted-foreground">Not available for current cart/pincode</span>
                    )}
                  </label>
                  <label className={`flex items-center gap-3 p-3 border rounded-md ${prepaidAvailable === false ? 'opacity-60' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      disabled={prepaidAvailable === false}
                      checked={paymentMethod === "UPI"}
                      onChange={() => {
                        setPaymentMethod("UPI");
                        sessionStorage.setItem("ritvl:preferredPayment", "UPI");
                      }}
                    />
                    <span>UPI / Netbanking (Prepaid)</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
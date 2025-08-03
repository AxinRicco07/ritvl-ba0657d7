import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Package, MapPin, CreditCard, MoreVertical } from "lucide-react";
import { formatINRWithPaisa } from "@/utils/currency";

interface SavedOrder {
  products: {
    quantity: number;
    price: number;
    name: string;
    sku: string;
    id: string;
    image: string;
  }[];
  billingAddress: {
    customerName: string;
    address1: string;
    address2?: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    customerName: string;
    address1: string;
    address2?: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    email: string;
    phone: string;
  };
  orderDate: string;
  paymentMethod: "COD" | "PREPAID" | string;
  orderStatus: "CONFIRMED" | "PENDING" | "CANCELLED" | string;
  totalAmount: number;
  shippingCharges: number;
  taxes: number;
  subtotal: number;
  trackingUrl: string;
  shipmentId: string;
  isShippingBilling: boolean;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | string;
  idempotencyKey: string;
  orderId: string;
}

// What we use in the UI
interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    sku: string;
  }[];
  subtotal: number;
  taxes: number;
  deliveryCharges: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: {
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
  orderDate: string;
  status: string;
  trackingUrl?: string; // Optional for future use
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showCancelMenu, setShowCancelMenu] = useState<string | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem("ritvl-orders");
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders) as SavedOrder[];
        // Transform to match expected structure
        const normalized = parsed.map((order): Order => {
          const id = `${order.orderDate}-${order.products.length}-${order.totalAmount}`;
          return {
            id,
            items: order.products.map((item) => ({
              sku: item.sku,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image, // todo: add image URL if available
              id: item.id,
            })),
            subtotal: order.subtotal,
            taxes: order.taxes,
            deliveryCharges: order.shippingCharges,
            total: order.totalAmount,
            paymentMethod: order.paymentMethod,
            deliveryAddress: {
              // name: order.shippingAddress.address1,
              address: order.shippingAddress.address1,
              city: order.shippingAddress.city,
              pincode: order.shippingAddress.pincode,
              phone: order.shippingAddress.phone,
            },
            orderDate: order.orderDate,
            trackingUrl: order.trackingUrl,
            status: "Confirmed", // Default status
          };
        });
        console.log(normalized);
        setOrders(normalized);
      } catch (error) {
        console.error("Error loading or parsing orders:", error);
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, []);

  const handleCancelOrder = (orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updatedOrders);
    // Optionally persist back to localStorage
    // But only if you're not expecting server sync
    localStorage.setItem(
      "ritvl-orders",
      JSON.stringify(
        updatedOrders.map((o) => {
          // Map back to saved format if needed
          return { ...o, status: undefined }; // or keep minimal
        })
      )
    );
    setShowCancelMenu(null);
  };

  if (orders.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4 md:px-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif mb-4">No orders yet</h1>
          <p className="text-muted-foreground mb-8">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-serif mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="w-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.id.substring(0, 8).toUpperCase()}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      order.status === "Delivered" ||
                      order.status === "Confirmed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowCancelMenu(
                          showCancelMenu === order.id ? null : order.id
                        )
                      }
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {showCancelMenu === order.id &&
                      order.status !== "Cancelled" &&
                      order.status !== "Delivered" && (
                        <div className="absolute right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="w-full px-3 py-2 text-xs text-muted-foreground hover:bg-muted text-left"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-background rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatINRWithPaisa(item.price * item.quantity * 100)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatINRWithPaisa(item.price * 100)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Method
                </h3>
                <p className="text-muted-foreground">{order.paymentMethod}</p>
              </div>

              <Separator />

              {/* Delivery Address */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h3>
                <div className="text-muted-foreground">
                  <p>{order.deliveryAddress.address}</p>
                  <p>
                    {order.deliveryAddress.city} -{" "}
                    {order.deliveryAddress.pincode}
                  </p>
                  <p>Phone: {order.deliveryAddress.phone}</p>
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div>
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2 bg-secondary/30 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatINRWithPaisa(order.subtotal * 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes inc.</span>
                    <span>{formatINRWithPaisa(order.taxes * 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Delivery Charges
                    </span>
                    <span>
                      {formatINRWithPaisa(order.deliveryCharges * 100)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatINRWithPaisa(order.total * 100)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link to={`/tracking-order/${order.id}`}>Track Order</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have any questions about your order, feel free to contact our
            support team.
          </p>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="font-medium text-lg">+91 1800-123-4567</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Available 24/7 for your assistance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

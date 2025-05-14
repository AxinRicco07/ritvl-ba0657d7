
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ChevronLeft, ShoppingCart, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Dreamer's Galaxy Bath Salt",
      price: 25,
      image: "/placeholder.svg",
      quantity: 2,
      size: "8 oz"
    },
    {
      id: 3,
      name: "Large Mystic Palm Salt",
      price: 33,
      image: "/placeholder.svg",
      quantity: 1,
      size: "16 oz"
    }
  ]);
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-medium">Your Cart</h1>
        <Link 
          to="/products" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-border items-center">
                  <div className="col-span-6 flex gap-4 items-center">
                    <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.size}</p>
                      <div className="md:hidden mt-1">
                        <p className="text-primary">${item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        className="md:hidden text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 mt-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center hidden md:block">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center h-9">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="rounded-l-md rounded-r-none h-full w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="flex-1 h-full w-10 flex items-center justify-center border-y border-input text-center">
                        {item.quantity}
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-r-md rounded-l-none h-full w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right flex items-center justify-end gap-4">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      className="hidden md:flex text-muted-foreground hover:text-red-500 transition-colors"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium pb-4 border-b border-border">Order Summary</h2>
              
              <div className="py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $35
                  </p>
                )}
              </div>
              
              <div className="flex justify-between py-4 border-t border-b border-border">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              
              <Button className="w-full mt-6">Proceed to Checkout</Button>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-start gap-3 text-sm">
                  <Package className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Free shipping</span> on orders over $35
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export default Cart;

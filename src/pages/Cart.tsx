
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, ShoppingCart } from "lucide-react";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Relaxing Lavender Bath Salt",
    price: 24.99,
    image: "/placeholder.svg",
    size: "500g",
    strength: "Medium",
    quantity: 2,
  },
  {
    id: "2",
    name: "Energizing Citrus Bath Bomb",
    price: 8.99,
    image: "/placeholder.svg",
    size: "120g",
    strength: "Strong",
    quantity: 1,
  },
  {
    id: "3",
    name: "Soothing Eucalyptus Soak",
    price: 18.50,
    image: "/placeholder.svg",
    size: "250g",
    strength: "Light",
    quantity: 1,
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
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
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-sm font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="border-t border-border first:border-t-0 p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product info */}
                  <div className="md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-secondary/30 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.size} / {item.strength}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-muted-foreground flex items-center gap-1 hover:text-destructive transition-colors mt-2 md:hidden"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">Price:</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">Quantity:</span>
                    <div className="flex items-center border border-input rounded-md w-24 md:mx-auto">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-secondary transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-secondary transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 md:text-right flex justify-between items-center md:block">
                    <span className="text-sm font-medium md:hidden">Total:</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  {/* Remove button (desktop) */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="hidden md:block absolute right-4 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button asChild variant="outline">
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
            <Button onClick={() => setCartItems([])}>Clear Cart</Button>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-secondary/30 rounded-lg p-6">
            <h2 className="font-serif text-xl mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Free shipping on orders over $50
            </p>
            
            <div className="border-t border-border mt-6 pt-6">
              <h3 className="font-medium mb-2">Have a promo code?</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter code" 
                  className="px-3 py-2 border border-input rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

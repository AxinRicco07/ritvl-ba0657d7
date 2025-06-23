
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, Shield, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { formatINRWithPaisa } from "@/utils/currency";

// Mock product data with paisa pricing
const product = {
  id: "1",
  name: "Himalayan Pink Salt",
  price: 209900, // ₹2099.00 in paisa
  originalPrice: 249900, // ₹2499.00 in paisa
  description: "Our premium Himalayan pink salt provides deep relaxation and stress relief. Made with pure essential oils and natural sea salt, it transforms your bath into a luxurious spa experience.",
  longDescription: "Immerse yourself in the soothing properties of our carefully crafted Himalayan pink salt. This therapeutic blend combines premium Dead Sea salts with organic essential oils to create the ultimate relaxation experience. The fine-grain texture dissolves quickly in warm water, releasing aromatic compounds that calm your mind and ease muscle tension. Regular use helps improve sleep quality, reduce stress, and leave your skin feeling soft and nourished.",
  ingredients: "Sea Salt, Epsom Salt (Magnesium Sulfate), Sodium Bicarbonate, Natural Essential Oils, Dried Flowers, Vitamin E",
  rating: 4.8,
  reviewCount: 126,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  options: {
    size: ["250g", "500g", "1kg"],
    fragranceStrength: ["Light", "Medium", "Strong"]
  },
  benefits: [
    "Relieves muscle tension",
    "Improves sleep quality",
    "Soothes skin irritation",
    "Reduces stress & anxiety"
  ],
  featured: true,
  new: false,
  inStock: true
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("500g");
  const [selectedStrength, setSelectedStrength] = useState("Medium");
  const [giftWrap, setGiftWrap] = useState(false);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price + (giftWrap ? 500 : 0), // Add ₹5 for gift wrap in paisa
      image: product.images[0],
      size: selectedSize,
      strength: selectedStrength,
    }, quantity);
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <Link to="/products" className="flex items-center text-sm mb-6 hover:underline hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div>
          <div className="bg-secondary/30 rounded-lg overflow-hidden mb-4 border border-border">
            <AspectRatio ratio={1} className="bg-secondary/20">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-md overflow-hidden border ${selectedImage === index ? 'border-primary' : 'border-border'}`}
              >
                <AspectRatio ratio={1}>
                  <img src={image} alt={`Product view ${index+1}`} className="w-full h-full object-cover" />
                </AspectRatio>
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-medium">{formatINRWithPaisa(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatINRWithPaisa(product.originalPrice)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Product Options */}
          <div className="space-y-8">
            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.options.size.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full ${selectedSize !== size ? "text-primary border-primary hover:bg-primary/5" : ""}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Fragrance Strength */}
            <div>
              <h3 className="font-medium mb-3">Fragrance Strength</h3>
              <div className="flex flex-wrap gap-2">
                {product.options.fragranceStrength.map((strength) => (
                  <Button
                    key={strength}
                    type="button"
                    variant={selectedStrength === strength ? "default" : "outline"}
                    onClick={() => setSelectedStrength(strength)}
                    className={`rounded-full ${selectedStrength !== strength ? "text-primary border-primary hover:bg-primary/5" : ""}`}
                  >
                    {strength}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex gap-4">
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-input">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <Button className="gap-2 flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="bg-secondary/30 border-none">
                <CardContent className="p-4 flex gap-3 items-start">
                  <Truck className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">On orders over ₹50</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/30 border-none">
                <CardContent className="p-4 flex gap-3 items-start">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">30-Day Returns</h4>
                    <p className="text-sm text-muted-foreground">Money back guarantee</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Gift Option */}
            <div className="flex items-start gap-2">
              <Checkbox 
                id="gift-option" 
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                checked={giftWrap}
                onCheckedChange={(checked) => setGiftWrap(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="gift-option"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add gift wrapping (+₹5.00)
                </label>
                <p className="text-sm text-muted-foreground">
                  Includes premium packaging and a handwritten note
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto space-x-8">
            <button className="border-b-2 border-primary py-4 px-1 font-medium text-sm">Product Details</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary">Ingredients</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary">How to Use</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary">Reviews</button>
          </div>
        </div>
        
        <div className="py-8">
          <p className="text-muted-foreground mb-4">
            {product.longDescription}
          </p>
          
          <h3 className="font-medium mb-3 mt-6">Benefits</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card bg-white rounded-lg overflow-hidden border border-border hover:border-primary/30 shadow-sm">
              <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Related product" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 hover:text-primary">Related Product {item}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{formatINRWithPaisa(209900)}</span>
                  <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/5">Add</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

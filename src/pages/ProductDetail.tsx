
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, Shield, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";

// Product data matching the categories and products from other pages
const productData = {
  "1": {
    id: "1",
    name: "Himalayan Pink Salt",
    price: 2099,
    originalPrice: 2499,
    description: "Premium Himalayan pink salt crystals, naturally harvested from ancient sea beds. Rich in minerals and perfect for therapeutic baths and culinary use.",
    longDescription: "Our Himalayan Pink Salt is sourced directly from the pristine mines of Pakistan, where ancient sea beds have crystallized over millions of years. This premium-grade salt contains over 80 trace minerals, including magnesium, potassium, and calcium, making it ideal for both therapeutic baths and gourmet cooking. The beautiful rose-pink color comes from iron oxide deposits, giving each crystal a unique natural hue.",
    ingredients: "100% Pure Himalayan Pink Salt (Sodium Chloride with naturally occurring trace minerals)",
    rating: 4.8,
    reviewCount: 126,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "salts-types",
    benefits: ["Muscle relief", "Detoxification", "Mineral replenishment", "Stress reduction"],
    featured: true,
    new: false,
    inStock: true
  },
  "2": {
    id: "2",
    name: "Mogra Bath Bomb",
    price: 749,
    originalPrice: 899,
    description: "Luxurious mogra-scented bath bomb that fizzes and releases enchanting floral fragrance while nourishing your skin.",
    longDescription: "Transform your bath into a luxurious spa experience with our Mogra Bath Bomb. Infused with the intoxicating fragrance of mogra (jasmine), this bath bomb fizzes gently to release essential oils and skin-conditioning ingredients. The natural mogra fragrance promotes relaxation and emotional balance while leaving your skin soft and delicately scented.",
    ingredients: "Sodium Bicarbonate, Citric Acid, Epsom Salt, Mogra Essential Oil, Coconut Oil, Dried Mogra Petals",
    rating: 4.6,
    reviewCount: 98,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "mogra",
    benefits: ["Aromatherapy", "Skin nourishment", "Relaxation", "Mood enhancement"],
    featured: false,
    new: true,
    inStock: true
  },
  "3": {
    id: "3",
    name: "Lavender Bath Salt",
    price: 1550,
    originalPrice: 1799,
    description: "Calming lavender-infused Epsom salt blend designed to promote deep relaxation and peaceful sleep.",
    longDescription: "Our Lavender Bath Salt combines premium Epsom salt with pure lavender essential oil and dried lavender flowers. Known for its calming properties, lavender helps reduce stress, anxiety, and promotes restful sleep. The magnesium in Epsom salt aids muscle recovery and relaxation, making this the perfect end-of-day ritual.",
    ingredients: "Epsom Salt (Magnesium Sulfate), Lavender Essential Oil, Dried Lavender Flowers, Sea Salt",
    rating: 4.7,
    reviewCount: 74,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "lavender",
    benefits: ["Sleep support", "Stress relief", "Muscle relaxation", "Aromatherapy"],
    featured: true,
    new: false,
    inStock: true
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("500g");
  const [selectedStrength, setSelectedStrength] = useState("Medium");
  
  // Get product data or fallback to first product
  const product = productData[id as keyof typeof productData] || productData["1"];
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <Link to="/products" className="flex items-center text-sm mb-6 hover:underline hover:text-primary transition-colors duration-300">
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
                className={`rounded-md overflow-hidden border transition-all duration-300 ${selectedImage === index ? 'border-primary scale-105' : 'border-border hover:border-primary/50'}`}
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
                  className={`h-4 w-4 transition-colors duration-300 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-medium">₹{product.price.toFixed(0)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toFixed(0)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Product Options */}
          <div className="space-y-8">
            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {["250g", "500g", "1kg"].map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full transition-all duration-300 ${selectedSize !== size ? "text-primary border-primary hover:bg-primary/5 hover:scale-105" : "hover:scale-105"}`}
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
                {["Light", "Medium", "Strong"].map((strength) => (
                  <Button
                    key={strength}
                    type="button"
                    variant={selectedStrength === strength ? "default" : "outline"}
                    onClick={() => setSelectedStrength(strength)}
                    className={`rounded-full transition-all duration-300 ${selectedStrength !== strength ? "text-primary border-primary hover:bg-primary/5 hover:scale-105" : "hover:scale-105"}`}
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
                    className="px-3 py-2 hover:bg-secondary transition-colors duration-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-input">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 hover:bg-secondary transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
                
                <Button className="gap-2 flex-1 transition-all duration-300 hover:scale-105" size="lg">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="bg-secondary/30 border-none transition-all duration-300 hover:bg-secondary/40">
                <CardContent className="p-4 flex gap-3 items-start">
                  <Truck className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">On orders over ₹2000</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/30 border-none transition-all duration-300 hover:bg-secondary/40">
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
              <Checkbox id="gift-option" className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="gift-option"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add gift wrapping (+₹200)
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
            <button className="border-b-2 border-primary py-4 px-1 font-medium text-sm transition-colors duration-300">Product Details</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary transition-colors duration-300">Ingredients</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary transition-colors duration-300">How to Use</button>
            <button className="text-muted-foreground py-4 px-1 text-sm hover:text-primary transition-colors duration-300">Reviews</button>
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
          
          <h3 className="font-medium mb-3 mt-6">Ingredients</h3>
          <p className="text-muted-foreground">{product.ingredients}</p>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Link key={item} to={`/product/${item}`} className="block">
              <div className="bg-white rounded-lg overflow-hidden border border-border hover:border-primary/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Related product" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 hover:text-primary transition-colors duration-300">Related Product {item}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">₹{(Math.random() * 2000 + 500).toFixed(0)}</span>
                    <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105">Add</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, Star, Package, Heart, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const product = products.find((p) => p.id === Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("8 oz");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  
  if (!product) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedSize}) added to your cart`,
    });
  };
  
  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm text-muted-foreground mb-8 hover:text-primary transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-white">
                <img 
                  src={product.image}
                  alt={`${product.name} - Angle ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index} 
                className={`h-4 w-4 ${index < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">(24 reviews)</span>
          </div>
          
          <p className="text-xl text-primary font-medium mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-6">
            Our premium {product.name} is hand-harvested and carefully processed to preserve all natural minerals. 
            Perfect for a relaxing bath experience that helps soothe muscles and calm the mind.
          </p>
          
          <div className="space-y-6 mb-8">
            {/* Size selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {["4 oz", "8 oz", "16 oz", "32 oz"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="rounded-md"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Color selection */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center w-32 h-12">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="rounded-l-md rounded-r-none h-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 h-full flex items-center justify-center border-y border-input text-center">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={increaseQuantity}
                  className="rounded-r-md rounded-l-none h-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={addToCart} className="flex-1">Add to Cart</Button>
            <Button variant="outline" onClick={addToWishlist} className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Add to Wishlist
            </Button>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3">
            <Package className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Free shipping</span> on orders over $35. 
              30-day returns. Eco-friendly packaging made from recycled materials.
            </p>
          </div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <h2 className="text-xl font-medium">About {product.name}</h2>
            <p className="text-muted-foreground">
              Our premium {product.name} is hand-harvested from ancient sea deposits, where it has been naturally enriched 
              with minerals over millions of years. Each batch is carefully processed to preserve the full spectrum of 
              beneficial minerals and trace elements that make our salt exceptional.
            </p>
            <p className="text-muted-foreground">
              Perfect for a relaxing bath experience that helps soothe muscles, detoxify the body, and calm the mind. 
              The unique mineral composition helps draw out impurities while replenishing the skin with essential nutrients.
            </p>
            <div>
              <h3 className="font-medium mt-6 mb-3">Benefits</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Helps relieve muscle tension and soreness</li>
                <li>Promotes relaxation and better sleep</li>
                <li>Supports natural detoxification</li>
                <li>Improves skin hydration and appearance</li>
                <li>Enhances mineral absorption</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mt-6 mb-3">How to Use</h3>
              <p className="text-muted-foreground">
                Add 1-2 cups to warm bath water and soak for 20-30 minutes. For best results, use 2-3 times weekly. 
                Can also be used as a foot soak by adding 1/2 cup to a basin of warm water.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients" className="space-y-4">
            <h2 className="text-xl font-medium">Pure & Natural Ingredients</h2>
            <p className="text-muted-foreground mb-6">
              We believe in total transparency. Our products contain only pure, natural ingredients with no artificial
              additives, fillers, or harmful chemicals.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-medium mb-2">Key Minerals</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex justify-between">
                    <span>Magnesium</span>
                    <span>High</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Calcium</span>
                    <span>Medium</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Potassium</span>
                    <span>Medium</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sodium</span>
                    <span>High</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Trace Minerals</span>
                    <span>Yes (80+ types)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-medium mb-2">Full Ingredients List</h3>
                <p className="text-muted-foreground">
                  Pure Epsom Salt (Magnesium Sulfate), Sea Salt (Sodium Chloride), 
                  {product.scents.includes("Lavender") && " Lavender Essential Oil,"}
                  {product.scents.includes("Rose") && " Rose Essential Oil,"}
                  {product.scents.includes("Eucalyptus") && " Eucalyptus Essential Oil,"}
                  {product.scents.includes("Mint") && " Peppermint Essential Oil,"}
                  {product.scents.includes("Citrus") && " Orange Essential Oil, Lemon Essential Oil,"}
                  {product.scents.includes("Vanilla") && " Vanilla Extract,"}
                  {" Natural Mineral Color (from plant extracts)."}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Our Commitment</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-secondary/50 p-4 rounded-lg">
                  <p className="font-medium mb-1">No Harsh Chemicals</p>
                  <p className="text-sm text-muted-foreground">Free from parabens, sulfates, phthalates, and synthetic fragrances.</p>
                </div>
                <div className="flex-1 bg-secondary/50 p-4 rounded-lg">
                  <p className="font-medium mb-1">Cruelty-Free</p>
                  <p className="text-sm text-muted-foreground">Never tested on animals and contains no animal-derived ingredients.</p>
                </div>
                <div className="flex-1 bg-secondary/50 p-4 rounded-lg">
                  <p className="font-medium mb-1">Eco-Friendly</p>
                  <p className="text-sm text-muted-foreground">Sustainable sourcing and recyclable packaging.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        className={`h-5 w-5 ${index < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-1">Based on 24 reviews</p>
                </div>
                
                <div className="ml-auto">
                  <Button>Write a Review</Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border-b border-border pb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Jane D.</span>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      I love this bath salt! It has a wonderful scent that's not overpowering, and it 
                      really helps me relax after a long day. My skin feels so soft after using it. 
                      Will definitely purchase again.
                    </p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You might also like</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="product-card bg-white rounded-lg overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <span className="text-primary">${relatedProduct.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {relatedProduct.colors.map((color, index) => (
                      <span 
                        key={index} 
                        className="w-3 h-3 rounded-full border border-gray-200" 
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  category: string;
  collection: string;
  scents: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Dreamer's Galaxy Bath Salt",
    price: 25,
    image: "/placeholder.svg",
    colors: ["#E8D5B5", "#8AACB9", "#E2C1B3"],
    category: "Bath Salt",
    collection: "Relaxation",
    scents: ["Lavender", "Vanilla"]
  },
  {
    id: 2,
    name: "Rose's Mist Bath Salt",
    price: 34,
    image: "/placeholder.svg",
    colors: ["#E7A4B7", "#EDE3DE", "#CEA997"],
    category: "Bath Salt",
    collection: "Aromatherapy",
    scents: ["Rose"]
  },
  {
    id: 3,
    name: "Large Mystic Palm Salt",
    price: 33,
    image: "/placeholder.svg",
    colors: ["#99B898", "#FECEA8", "#FF847C"],
    category: "Himalayan Salt",
    collection: "Detox",
    scents: ["Mint", "Eucalyptus"]
  },
  {
    id: 4,
    name: "Pair Serenity Salt",
    price: 30,
    image: "/placeholder.svg",
    colors: ["#2A363B", "#E8B4BC", "#99B898"],
    category: "Epsom Salt",
    collection: "Relaxation",
    scents: ["Lavender"]
  },
  {
    id: 5,
    name: "Himalayan Pink Salt",
    price: 18,
    image: "/placeholder.svg",
    colors: ["#E8B4BC", "#F4DFDF", "#EFC7C7"],
    category: "Himalayan Salt",
    collection: "Gift Sets",
    scents: ["Unscented"]
  },
  {
    id: 6,
    name: "Dead Sea Salt",
    price: 22,
    image: "/placeholder.svg",
    colors: ["#8AACB9", "#A9C6CF", "#C1DAE3"],
    category: "Sea Salt",
    collection: "Detox",
    scents: ["Unscented"]
  }
];

export default ProductDetail;

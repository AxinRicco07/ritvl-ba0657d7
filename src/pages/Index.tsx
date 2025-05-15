
import React, { useEffect, useState } from "react";
import { ArrowRight, Check, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-slide for hero carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const heroImages = [p2, p3, p1];
  const heroTitles = ["Dreamer's Galaxy", "Rose's Mist Bath", "Himalayan Flower"];

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with Auto-Sliding */}
      <section className="relative min-h-[80vh] overflow-hidden flex items-center bg-amber-50/50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
          <div className={`relative z-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-bold text-amber-800">
              Natural Healing.<br />
              Pure Joy.<br />
              Everyday Luxury.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Experience the therapeutic benefits of our premium bath salts—ethically sourced, 100% natural, and crafted for your wellbeing.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="rounded-full bg-green-800 hover:bg-green-700">
                <Link to="/products">SHOP NOW</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-amber-800 text-amber-800">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className={`overflow-hidden rounded-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <div className="relative aspect-[4/3]">
                {heroImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Featured Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex flex-col items-center justify-end p-6 text-center">
                      <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-3 py-1 mb-2 rounded-md">
                        {index === 0 ? "Featured" : index === 1 ? "Bestseller" : "New Arrival"}
                      </span>
                      <h3 className="text-white text-xl font-bold">{heroTitles[index]}</h3>
                      <Button variant="secondary" size="sm" className="mt-2">
                        <Link to={`/product/${index + 1}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === dot ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${dot + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-display text-center mb-2 font-bold">Shop By Categories</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover our curated collection of natural salt blends designed to enhance your daily rituals
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[1/1.2] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                    <span className="text-white text-sm font-medium opacity-90 mb-2">{category.items} Products</span>
                    <span className="inline-flex items-center text-white text-sm font-medium bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full w-fit">
                      Explore <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products - First Row */}
      <section className="py-12 px-4 md:py-16 bg-secondary/10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display">Featured Products</h2>
            <Link to="/products" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group"
              >
                <Card className="product-card border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="overflow-hidden">
                    <AspectRatio ratio={1 / 1}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <span className="text-primary">${product.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {product.colors.map((color, index) => (
                          <span 
                            key={index} 
                            className="w-4 h-4 rounded-full border border-gray-200" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <Button size="sm">Buy</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Second Row */}
      <section className="py-12 px-4 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display">Bestselling Products</h2>
            <Link to="/products" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(2, 6).map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group"
              >
                <Card className="product-card border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="overflow-hidden">
                    <AspectRatio ratio={1 / 1}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <span className="text-primary">${product.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {product.colors.map((color, index) => (
                          <span 
                            key={index} 
                            className="w-4 h-4 rounded-full border border-gray-200" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <Button size="sm">Buy</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 px-4 md:py-16 bg-amber-50/50">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display text-center mb-4">WHY RIVE?</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our mission is to bring the world's finest salts and spices to your kitchen, focusing on quality, sustainability, and exceptional flavor.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              title="ETHICALLY SOURCED" 
              description="We source our healing minerals from farmers, ensuring fair wages and sustainable practices."
            >
              <img src="/placeholder.svg" alt="Ethically Sourced" className="w-10 h-10 mb-4" />
            </FeatureCard>
            
            <FeatureCard 
              title="100% PURE" 
              description="No additives, fillers, or artificial ingredients. Just pure, natural goodness."
            >
              <Check className="w-8 h-8 mb-4 text-gray-700" />
            </FeatureCard>
            
            <FeatureCard 
              title="SHIPS WORLDWIDE" 
              description="We deliver our premium spices to customers across the globe."
            >
              <Package className="w-8 h-8 mb-4 text-gray-700" />
            </FeatureCard>
            
            <FeatureCard 
              title="LAB-TESTED FOR QUALITY" 
              description="Every batch is tested to ensure the highest standards of purity and quality."
            >
              <Star className="w-8 h-8 mb-4 text-gray-700" />
            </FeatureCard>
          </div>
        </div>
      </section>
      
      {/* Collections */}
      <section className="py-12 px-4 md:py-16">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/10 p-6 md:p-8 rounded-lg">
              <h3 className="text-xl font-display uppercase mb-4">PREMIUM SALT COLLECTION</h3>
              <p className="text-muted-foreground mb-6">
                Discover our range of premium salts sourced from the world's finest mines and flats, perfect for finishing dishes or as thoughtful gifts.
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                EXPLORE COLLECTION <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-secondary/10 p-6 md:p-8 rounded-lg">
              <h3 className="text-xl font-display uppercase mb-4">EXOTIC SPICE BLENDS</h3>
              <p className="text-muted-foreground mb-6">
                Hand-crafted spice blends inspired by global cultures. Elevate your cooking with our aromatic spice mixes.
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                EXPLORE COLLECTION <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 px-4 md:py-16 bg-secondary/20">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 px-4 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-4">Join Our Community</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive offers, recipes, and self-care tips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

// Let's add a scrollbar hiding utility to our CSS
const hideScrollbarStyle = document.createElement('style');
hideScrollbarStyle.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-scale-in {
    animation: scale-in 0.2s ease-out forwards;
  }
`;
document.head.appendChild(hideScrollbarStyle);

// Components
const Input = ({ 
  className, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input 
      className={`px-4 py-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
      {...props}
    />
  );
};

const FeatureCard = ({ 
  children, 
  title, 
  description 
}: { 
  children: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      {children}
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

// Data types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
}

interface Category {
  id: number;
  name: string;
  items: number;
  image: string;
  link: string;
}

interface Testimonial {
  name: string;
  title: string;
  comment: string;
  rating: number;
}

// Sample data
const categories: Category[] = [
  {
    id: 1,
    name: "Bath Salts",
    items: 12,
    image: "/placeholder.svg",
    link: "/products?category=bath-salts"
  },
  {
    id: 2,
    name: "Aromatherapy",
    items: 8,
    image: "/placeholder.svg",
    link: "/products?category=aromatherapy" 
  },
  {
    id: 3,
    name: "Gift Sets",
    items: 6,
    image: "/placeholder.svg",
    link: "/gift-sets"
  },
  {
    id: 4,
    name: "Specialty Crystals",
    items: 10,
    image: "/placeholder.svg",
    link: "/products?category=specialty"
  }
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Dreamer's Galaxy",
    price: 25,
    image: "/placeholder.svg",
    colors: ["#E8D5B5", "#8AACB9", "#E2C1B3"]
  },
  {
    id: 2,
    name: "Rose's Mist Bath",
    price: 34,
    image: "/placeholder.svg",
    colors: ["#E7A4B7", "#EDE3DE", "#CEA997"]
  },
  {
    id: 3,
    name: "Large Mystic Palm",
    price: 33,
    image: "/placeholder.svg",
    colors: ["#99B898", "#FECEA8", "#FF847C"]
  },
  {
    id: 4,
    name: "Pair Serenity Plant",
    price: 30,
    image: "/placeholder.svg",
    colors: ["#2A363B", "#E8B4BC", "#99B898"]
  },
  {
    id: 5,
    name: "Soothing Lavender",
    price: 28,
    image: "/placeholder.svg",
    colors: ["#9B89B3", "#EEE1F8", "#726C80"]
  },
  {
    id: 6,
    name: "Ocean Breeze",
    price: 26,
    image: "/placeholder.svg",
    colors: ["#5EAFD3", "#D3EBF5", "#2D6E8E"]
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    title: "Professional Chef",
    comment: "The Himalayan salt flakes that has completely transformed my cooking. The flavor is unmatched, and I love knowing it's ethically sourced.",
    rating: 5
  },
  {
    name: "Michael T.",
    title: "Home Cook",
    comment: "The exotic blends are incredible - perfectly balanced and so unique! I've ordered their salt sampler box exclusively ever since.",
    rating: 5
  },
  {
    name: "Emma R.",
    title: "Loyal Customer",
    comment: "I received a gift set for my own spa-day and the sea salt soothing bath reduced tension. The packaging is beautiful, and the quality is exceptional.",
    rating: 5
  }
];

export default Index;

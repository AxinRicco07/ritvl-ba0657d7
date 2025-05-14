
import { ArrowRight, Check, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SaltSparkle from "@/components/SaltSparkle";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
              Relax. Recharge.<br />
              Renew.<br />
              Rise.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Premium epsom salts crafted for your ultimate bath experience.
            </p>
            <div className="mt-6">
              <Button asChild size="lg" className="rounded-md">
                <Link to="/products">Shop now</Link>
              </Button>
            </div>
            
            {/* Salt Sparkle Animation */}
            <SaltSparkle />
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className={`col-span-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Premium Epsom Salts" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end p-4">
                  <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md">Featured</span>
                </div>
              </div>
            </div>
            
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Epsom Salt Texture" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end p-4">
                  <span className="text-white text-sm font-medium">Texture</span>
                </div>
              </div>
            </div>
            
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Himalayan Pink Salt" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end justify-between p-4">
                  <span className="text-white text-sm font-medium">Himalayan Flower</span>
                  <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white">
                    See More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 px-4 md:py-16 bg-secondary/20">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display">Featured</h2>
            <Link to="/products" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 px-4 md:py-16">
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
      
      {/* New Arrivals */}
      <section className="py-12 px-4 md:py-16 bg-secondary/20">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display">Colorful New Arrivals</h2>
            <Link to="/new-arrivals" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((item) => (
              <div key={item.id} className="relative rounded-lg overflow-hidden aspect-[3/4] group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{item.description}</p>
                  <Button size="sm" variant="outline" className="w-fit bg-white/10 text-white backdrop-blur-sm border-white/20 hover:bg-white/30">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
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
      <section className="py-12 px-4 md:py-16 bg-gray-50">
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

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
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
      </div>
    </div>
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

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
}

interface NewArrival {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  name: string;
  title: string;
  comment: string;
  rating: number;
}

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
  }
];

const newArrivals: NewArrival[] = [
  {
    id: 1,
    title: "Blue Lily",
    description: "Gentle bath for relaxation",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Lavender Dream",
    description: "Soothing sleep support",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Berry Fusion",
    description: "Energizing morning bath",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Red Sunset",
    description: "Rich antioxidant blend",
    image: "/placeholder.svg"
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

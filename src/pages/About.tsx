import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Image1 from "../assets/WhatsApp Image 2025-08-14 at 12.22.09 PM.jpeg";
import Image2 from "../assets/WhatsApp Image 2025-08-14 at 12.22.10 PM.jpeg";
import Image3 from "../assets/WhatsApp Image 2025-08-14 at 12.22.11 PM.jpeg";
import Image4 from "../assets/WhatsApp Image 2025-08-14 at 12.22.08 PM.jpeg";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-blue-50/50">
        <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-blue-800">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              At Ritvl, we believe that self-care begins with nature’s finest ingredients. Our journey started with a simple mission — to create wellness products that are pure, effective, and environmentally responsible. From sourcing premium-grade Epsom salt to infusing it with natural essences like refreshing lemongrass,Cinnamon,Lavender every step is guided by our commitment to quality and sustainability.

We work closely with ethical suppliers, ensuring eco-friendly practices while delivering products that nourish the body and calm the mind. Every jar of Ritvl Epsom Salt is a reflection of our passion for wellness, purity, and the healing power of nature.

Because for us, it’s not just a product — it’s a promise of relaxation, rejuvenation, and care for both you and the planet.
            </p>
            <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src={Image1} 
                  alt="Our workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={Image2} 
                  alt="Founder portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={Image3} 
                  alt="Product creation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section-padding py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-4 text-blue-800">Our Values</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            These principles guide everything we do, from product development to customer service.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">01</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Natural Ingredients</h3>
              <p className="text-muted-foreground">
              Pure, high-grade Epsom salt blended with essential Oils
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">02</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Sustainable Practices</h3>
              <p className="text-muted-foreground">
              Responsibly sourced to ensure eco-friendly production.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">03</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Wellness Focus</h3>
              <p className="text-muted-foreground">
              Promotes relaxation, skin detoxification, and overall well-being.

              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="section-padding bg-blue-50/50 py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-blue-800">Our Process</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Sourcing</h3>
                    <p className="text-muted-foreground">
                    We carefully source premium-grade magnesium sulfate crystals from trusted suppliers to ensure purity and natural quality.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Formulation</h3>
                    <p className="text-muted-foreground">
                    Our salts undergo a thorough filtration and purification process to remove any impurities while preserving mineral integrity.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Production</h3>
                    <p className="text-muted-foreground">
                    We process the salts in a controlled environment, ensuring they retain their therapeutic properties and meet safety standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Testing</h3>
                    <p className="text-muted-foreground">
                    Each batch is sealed in moisture-proof, eco-friendly packaging to lock in freshness and maintain quality until it reaches you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img 
                  src={Image4}
                  alt="Our production process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

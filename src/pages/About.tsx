
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
            </p>
            <p className="text-muted-foreground mb-8">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
            </p>
            <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Our workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Founder portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Product creation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">02</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">03</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Wellness Focus</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="section-padding bg-blue-50/50">
        <div className="container max-w-7xl mx-auto">
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Our production process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Mission */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Join Our Mission</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis lacus nec nulla convallis, in pharetra ex interdum. Donec eleifend augue nec pellentesque facilisis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/careers">View Openings</Link>
            </Button>
            <Button asChild className="bg-white text-blue-900 hover:bg-blue-50">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

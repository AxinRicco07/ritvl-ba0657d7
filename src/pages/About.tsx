
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary/30">
        <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2018, RIVE began with a simple mission: to create natural bath products that transform an everyday ritual into a luxurious self-care experience.
            </p>
            <p className="text-muted-foreground mb-8">
              Our founder, Emily Chen, discovered the therapeutic benefits of Epsom salt baths during her recovery from a sports injury. Disappointed by the limited options available—either clinical-looking unscented salts or heavily perfumed products with artificial ingredients—she set out to create something better.
            </p>
            <Button asChild size="lg" variant="outline">
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
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-4">Our Values</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            These principles guide everything we do, from product development to customer service.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif">01</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Natural Ingredients</h3>
              <p className="text-muted-foreground">
                We use only natural, ethically sourced ingredients. No artificial fragrances, dyes, or preservatives—ever.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif">02</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                We're committed to minimizing our environmental footprint through sustainable sourcing, plastic-free packaging, and carbon-neutral shipping.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif">03</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Wellness Focus</h3>
              <p className="text-muted-foreground">
                Our products are designed to enhance your wellbeing, addressing specific needs from stress relief to muscle recovery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="section-padding bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-serif mb-6">Our Process</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Sourcing</h3>
                    <p className="text-muted-foreground">
                      We partner with suppliers who share our values. Our Epsom salts are pharmaceutical grade, and our essential oils are 100% pure and steam-distilled.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Formulation</h3>
                    <p className="text-muted-foreground">
                      Our small-batch blends are developed by our in-house aromatherapist, combining traditional knowledge with modern wellness research.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Production</h3>
                    <p className="text-muted-foreground">
                      Each product is handcrafted in our New England workshop, where we maintain strict quality control standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Testing</h3>
                    <p className="text-muted-foreground">
                      We never test on animals. Our products are tested by human volunteers to ensure efficacy, gentleness, and sensory appeal.
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
      
      {/* Team */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            The passionate people behind RIVE's products and mission.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[220px] mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Our Mission */}
      <section className="section-padding bg-black text-white">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Join Our Mission</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            We're always looking for passionate individuals to join our growing team. Check out our current openings or send us your resume.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/careers">View Openings</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

const teamMembers = [
  {
    name: "Emily Chen",
    role: "Founder & CEO",
    bio: "Former physical therapist with a passion for natural wellness and sustainable business practices.",
    image: "/placeholder.svg"
  },
  {
    name: "David Martinez",
    role: "Head of Product Development",
    bio: "Aromatherapist and herbalist with 15 years of experience in natural product formulation.",
    image: "/placeholder.svg"
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    bio: "Designer with a background in sustainable packaging and brand identity for wellness brands.",
    image: "/placeholder.svg"
  },
  {
    name: "Michael Lee",
    role: "Operations Manager",
    bio: "Supply chain expert focused on ethical sourcing and sustainable manufacturing processes.",
    image: "/placeholder.svg"
  }
];

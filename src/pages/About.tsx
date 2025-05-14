
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Our Story</h1>
              <p className="text-lg text-muted-foreground mb-8">
                RIVE was born from a passion for holistic wellness and a desire to create premium bath products 
                that nourish both body and soul. Our journey began with a simple belief: that moments of self-care 
                should be elevated through exceptional quality and thoughtful ingredients.
              </p>
              <Button asChild size="lg">
                <Link to="/products">Explore Our Products</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="RIVE Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to bring the world's finest salts and minerals to your self-care routine,
              focusing on quality, sustainability, and exceptional experiences. We believe that taking 
              time for yourself shouldn't just be a luxury—it should be an essential part of your wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-4">Quality</h3>
              <p className="text-muted-foreground">
                We source the highest quality natural ingredients from sustainable producers around the world,
                ensuring every product delivers exceptional results.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-4">Integrity</h3>
              <p className="text-muted-foreground">
                Transparency is core to our business. We're committed to honest practices, from ethically sourcing 
                our ingredients to clearly labeling our products.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                Our commitment to the planet means eco-friendly packaging, sustainable sourcing practices,
                and minimizing our environmental footprint at every step.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">Our Journey</h2>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <img 
                  src="/placeholder.svg" 
                  alt="Our Beginning" 
                  className="rounded-lg"
                />
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <h3 className="text-xl font-medium mb-4">The Beginning</h3>
                <p className="text-muted-foreground mb-4">
                  Founded in 2018 by Sarah Chen, RIVE began as a small batch production
                  in her home kitchen. Sarah's background in herbalism and natural wellness
                  informed her approach to creating mineral-rich bath products that deliver both
                  therapeutic benefits and sensory pleasure.
                </p>
                <p className="text-muted-foreground">
                  What started as a passion project quickly gained attention for its exceptional
                  quality and effectiveness, leading to our first retail partnership with local
                  wellness shops.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <h3 className="text-xl font-medium mb-4">Growing with Purpose</h3>
                <p className="text-muted-foreground mb-4">
                  By 2020, we had expanded our operations while maintaining our commitment to quality
                  and sustainability. We established direct relationships with salt miners and mineral
                  suppliers across the globe, ensuring fair wages and ethical practices.
                </p>
                <p className="text-muted-foreground">
                  This period also saw the introduction of our signature collections, carefully designed
                  to address specific wellness needs while delivering indulgent bath experiences.
                </p>
              </div>
              <div className="md:col-span-2">
                <img 
                  src="/placeholder.svg" 
                  alt="Growing with Purpose" 
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <img 
                  src="/placeholder.svg" 
                  alt="Today & Beyond" 
                  className="rounded-lg"
                />
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <h3 className="text-xl font-medium mb-4">Today & Beyond</h3>
                <p className="text-muted-foreground mb-4">
                  Today, RIVE is recognized as a leader in premium bath salts and minerals,
                  but we remain true to our founding principles. Every product continues to be
                  crafted with attention to detail, using only the finest natural ingredients.
                </p>
                <p className="text-muted-foreground">
                  As we look to the future, we're committed to innovation, sustainability,
                  and creating moments of wellness that nurture both our customers and the planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals behind RIVE share a commitment to quality,
              wellness, and sustainability. Together, we work to bring you the finest bath products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-secondary">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-primary mb-2">{member.title}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us */}
      <section className="bg-mint-100 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be the first to know about new products, special offers, and wellness tips.
            Join our community of bath enthusiasts and self-care advocates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 border border-input bg-white rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
}

const team: TeamMember[] = [
  {
    name: "Sarah Chen",
    title: "Founder & CEO",
    bio: "Herbalist and wellness advocate with a passion for creating natural products that enhance everyday rituals.",
    photo: "/placeholder.svg"
  },
  {
    name: "Marcus Lee",
    title: "Head of Product",
    bio: "Chemist with expertise in natural formulations and a commitment to sustainable sourcing practices.",
    photo: "/placeholder.svg"
  },
  {
    name: "Elena Rivera",
    title: "Creative Director",
    bio: "Designer and aromatherapist who crafts our sensory experiences and brand aesthetic.",
    photo: "/placeholder.svg"
  },
  {
    name: "Thomas Wright",
    title: "Operations Manager",
    bio: "Logistics expert ensuring our eco-friendly supply chain delivers quality products to your door.",
    photo: "/placeholder.svg"
  }
];

export default About;

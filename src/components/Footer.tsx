
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-serif">
                r
              </div>
              <span className="text-xl font-serif italic">ritvl</span>
            </div>
            <p className="mb-4 text-gray-300">
              Premium epsom salts crafted with natural ingredients for the ultimate bath experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">Pinterest</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-300 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/bestseller" className="text-gray-300 hover:text-primary transition-colors">Bestsellers</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-300 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-gray-300 hover:text-primary transition-colors">Sale</Link></li>
              <li><Link to="/gift-sets" className="text-gray-300 hover:text-primary transition-colors">Gift Sets</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/our-story" className="text-gray-300 hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/ingredients" className="text-gray-300 hover:text-primary transition-colors">Ingredients</Link></li>
              <li><Link to="/sustainability" className="text-gray-300 hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white focus-visible:ring-primary"
              />
              <Button className="bg-primary text-white hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} RIVE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../assets/ritvlpng.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-16 w-16"/>
            <span className="text-2xl font-sans font-light tracking-widest bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
  <strong>ritvl</strong>
</span>
{/* <span className="text-2xl font-elegant font-medium italic tracking-normal bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
  ritvl
</span> */}
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="products">Products</NavLink>
            <NavLink to="contact">Contact Us</NavLink>
            <NavLink to="about">About Us</NavLink>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container max-w-7xl mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
              <MobileNavLink to="/products" onClick={toggleMenu}>Products</MobileNavLink>
              <MobileNavLink to="/contact" onClick={toggleMenu}>Contact Us</MobileNavLink>
              <MobileNavLink to="/about" onClick={toggleMenu}>About Us</MobileNavLink>
            </nav>
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="flex items-center gap-2" aria-label="Search">
                <Search className="h-4 w-4" /> Search
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" aria-label="Account">
                <User className="h-4 w-4" /> Account
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" aria-label="Cart">
                <Link to="/cart" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children,
  onClick
}: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    className="text-foreground hover:text-primary transition-colors py-2"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;

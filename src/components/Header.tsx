import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/8e7016af-d0f3-4dc7-9dae-e425da734d83.png"
              className="h-20 w-20"
              alt="ritvl logo"
            />
            <span className="text-2xl font-sans font-light tracking-widest bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
              <strong>ritvl</strong>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            {/* <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container max-w-7xl mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/products" onClick={toggleMenu}>
                Products
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={toggleMenu}>
                Contact Us
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={toggleMenu}>
                About Us
              </MobileNavLink>
            </nav>
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                aria-label="Search"
              >
                <Search className="h-4 w-4" /> Search
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                aria-label="Account"
              >
                <User className="h-4 w-4" /> Account
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 relative"
                aria-label="Cart"
              >
                <Link to="/cart" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-foreground hover:text-primary transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  children,
  onClick,
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

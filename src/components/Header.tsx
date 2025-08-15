import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchOpen) {
      // focus input when opened
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
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
            <NavLink to="/orders">Order</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={onSubmitSearch} className="relative flex items-center">
              <div className={`flex items-center transition-all duration-200 ${isSearchOpen ? 'w-64' : 'w-10'} overflow-hidden border border-border rounded-md bg-background`}>
                <button type="button" aria-label="Search" onClick={toggleSearch} className="p-2 text-foreground/80 hover:text-foreground">
                  <Search className="h-5 w-5" />
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSearchOpen(false);
                  }}
                  placeholder="Search products..."
                  className={`bg-transparent text-sm outline-none px-2 py-2 ${isSearchOpen ? 'block' : 'hidden'}`}
                  aria-label="Search products"
                />
              </div>
            </form>
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
            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-border">
              <form onSubmit={(e) => { e.preventDefault(); if (searchTerm.trim()) { navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`); setIsMenuOpen(false);} }} className="flex items-center gap-2">
                <div className="flex items-center flex-1 border border-border rounded-md px-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none px-2 py-2 text-sm"
                    aria-label="Search products"
                  />
                </div>
                <Button type="submit" size="sm" variant="outline">Search</Button>
              </form>

              <div className="flex items-center gap-6">
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

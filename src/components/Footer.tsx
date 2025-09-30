import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container max-w-7xl mx-auto py-16 px-4 md:px-8">
        
        {/* Grid container */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10">
          
          {/* Logo / Description */}
          <div className="col-span-3 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-700 border border-gray-700 flex items-center justify-center text-gray-100 font-serif text-xl">
                r
              </div>
              <span className="text-2xl font-brittany text-gray-100 tracking-tight">Ritvl</span>
            </div>
            <p className="mb-6 text-gray-400 max-w-md text-sm leading-relaxed">
              Premium epsom salts crafted with natural ingredients for the ultimate bath experience.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://www.instagram.com/ritvlofficial/profilecard/?igsh=anh5aXJtOXhsN2No" 
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Instagram SVG */}
              </a>
              <a 
                href="https://www.facebook.com/share/16jTNne3Z5/?mibextid=wwXIfr" 
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Facebook SVG */}
              </a>
              <a 
                href="https://www.youtube.com/@RitvlOfficial" 
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300" 
                target="_blank"
              >
                {/* YouTube SVG */}
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-100 uppercase tracking-wider text-sm mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                { path: "/products", label: "All Products" },
                { path: "/products?sort=rating", label: "Bestsellers" },
                { path: "/products?sort=newest", label: "New Arrivals" },
                { path: "/products?sort=price-low", label: "Sale" },
                { path: "/products?sort=featured", label: "Gift Sets" }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-gray-100 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-100 uppercase tracking-wider text-sm mb-5">About</h3>
            <ul className="space-y-3">
              {[
                { path: "/about", label: "Our Story" },
                { path: "/ingredients", label: "Ingredients" },
                { path: "/faq", label: "FAQs" },
                { path: "/contact", label: "Contact Us" }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-gray-100 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div> {/* End of grid container */}

        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RITVL. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              { path: "/privacy", label: "Privacy Policy" },
              { path: "/terms", label: "Terms of Service" },
              { path: "/refund", label: "Refund Policy" },
              { path: "/contact", label: "Bulk Delivery" },
              { path: "/shipping", label: "Shipping Policy" }
            ].map((link) => (
              <Link 
                key={link.label}
                to={link.path} 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div> {/* End of container */}
    </footer>
  );
};

export default Footer;
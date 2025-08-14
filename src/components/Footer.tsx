import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container max-w-7xl mx-auto py-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-700 border border-gray-700 flex items-center justify-center text-gray-100 font-serif text-xl">
                r
              </div>
              <span className="text-2xl font-serif italic text-gray-100 tracking-tight">ritvl</span>
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/16jTNne3Z5/?mibextid=wwXIfr" 
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
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
          
          <div>
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
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RITVL. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              { path: "/privacy-policy", label: "Privacy Policy" },
              { path: "/terms", label: "Terms of Service" },
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
      </div>
    </footer>
  );
};

export default Footer;
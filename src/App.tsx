
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import "./App.css";

// Animation wrapper component
const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Add page transition class
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
      
      // Remove animation class after animation completes
      const timer = setTimeout(() => {
        mainContent.classList.remove('animate-fade-in');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
        
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <AnimationWrapper>
              <Routes>
                <Route index element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gift-sets" element={<Products />} />
                <Route path="/our-story" element={<About />} />
                <Route path="/ingredients" element={<About />} />
                <Route path="/sustainability" element={<About />} />
                <Route path="/faq" element={<About />} />
                <Route path="/privacy-policy" element={<About />} />
                <Route path="/terms" element={<About />} />
                <Route path="/shipping" element={<About />} />
                <Route path="/careers" element={<About />} />
                <Route path="/new-arrivals" element={<Products />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimationWrapper>
            <WhatsAppButton />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

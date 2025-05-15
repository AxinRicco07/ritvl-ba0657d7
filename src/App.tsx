
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            <WhatsAppButton />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

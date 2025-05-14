
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/bestseller" element={<Products />} />
        <Route path="/sale" element={<Products />} />
        <Route path="/gift-sets" element={<Products />} />
        <Route path="/our-story" element={<About />} />
        <Route path="/ingredients" element={<About />} />
        <Route path="/sustainability" element={<About />} />
        <Route path="/faq" element={<About />} />
        <Route path="/contact" element={<About />} />
        <Route path="/privacy-policy" element={<About />} />
        <Route path="/terms" element={<About />} />
        <Route path="/shipping" element={<About />} />
        <Route path="/careers" element={<About />} />
        <Route path="/new-arrivals" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

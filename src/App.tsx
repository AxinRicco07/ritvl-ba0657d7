import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import TrackingOrder from "./pages/TrackingOrder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./App.css";
import Layout from "./Layout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import UserAuthPage from "./components/auth/UserAuth";
import AdminAuth from "./pages/admin/AdminAuth";
import PrivacyPolicy from "./pages/Privacy";
import ShippingPolicy from "./pages/Shipping";
import Ingredients from "./pages/Ingredients";
import FAQs from "./pages/FAQs";

const queryClient = new QueryClient();

//  Wrapper to protect admin routes
const RequireAuth = () => {
  const token = localStorage.getItem("ritvl-admin-token");
  return token ? <Outlet /> : <Navigate to="/admin/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<UserAuthPage />} />
            {/* Admin Login (public) */}
            <Route path="/admin/login" element={<AdminAuth />} />

            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/tracking-order/:orderId" element={<TrackingOrder />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/faq" element={<FAQs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/*  Protected Admin Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/add" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomers />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;

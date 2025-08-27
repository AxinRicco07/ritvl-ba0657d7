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
import Payment from "./pages/Payment";
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
import { useEffect, useState } from "react";
import { fetchPrefix } from "./utils/fetch";
import Ingredients from "./pages/Ingredients";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import AdminEditProductForm from "./pages/admin/AdminEditProductForm";

const queryClient = new QueryClient();

//  Wrapper to protect admin routes
const RequireAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = async () => {
      try {
        // Make fetch request to the admin auth check endpoint
        const response = await fetch(`${fetchPrefix}/api/auth/admin/check`, {
          method: 'GET',
          credentials: 'include', // This includes cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  // Redirect to login if not authenticated
  console.log(window.location.href, "is");
  if (isAuthenticated && window.location.href.includes("login")) return <Navigate to="/admin/dashboard" />
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
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

            {/* Public Routes */}
            <Route element={<Layout />}> 
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/pay" element={<Payment />} />
              <Route path="/tracking-order/:orderId" element={<TrackingOrder />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminAuth />} />

            {/*  Protected Admin Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                
                	<Route path="products" element={<AdminProducts />} />
                	<Route path="products/add" element={<AdminProductForm />} />
                	<Route path="products/edit/:id" element={<AdminEditProductForm />} />
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

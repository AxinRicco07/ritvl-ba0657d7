import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import path from "path";

const AdminLayout: React.FC = () => {
  const { toast } = useToast();

  const navItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <Package className="w-4 h-4" />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Campaigns",
      path: "/admin/campaigns",
      icon: <Megaphone className="w-4 h-4" />,
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    // Add your logout logic here
  };

  return (
    <div className="flex flex-col font-body h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center">
            <NavLink to="/" className="mr-6">
              <h1 className="text-xl font-bold text-primary">RITVL</h1>
            </NavLink>
            <h2 className="text-sm font-medium text-gray-600">Admin Panel</h2>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm flex-shrink-0 overflow-y-auto">
          <nav className="h-full p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-h-full relative px-6 py-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

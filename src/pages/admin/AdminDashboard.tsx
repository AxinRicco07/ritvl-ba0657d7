
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Package, ShoppingCart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Total Sales",
      value: "$12,670",
      change: "+12%",
      icon: <BarChart className="h-5 w-5 text-gray-500" />,
      description: "Last 30 days"
    },
    {
      title: "Active Customers",
      value: "542",
      change: "+8%",
      icon: <Users className="h-5 w-5 text-gray-500" />,
      description: "Last 30 days"
    },
    {
      title: "Products",
      value: "48",
      change: "+2",
      icon: <Package className="h-5 w-5 text-gray-500" />,
      description: "Total active products"
    },
    {
      title: "Orders",
      value: "165",
      change: "+24%",
      icon: <ShoppingCart className="h-5 w-5 text-gray-500" />,
      description: "Last 30 days"
    }
  ];

  // Mock data for recent orders
  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", date: "2025-05-15", status: "Delivered", total: "$85.00" },
    { id: "ORD-002", customer: "Jane Smith", date: "2025-05-14", status: "Processing", total: "$142.50" },
    { id: "ORD-003", customer: "Michael Brown", date: "2025-05-14", status: "Shipped", total: "$67.25" },
    { id: "ORD-004", customer: "Sarah Wilson", date: "2025-05-13", status: "Processing", total: "$129.99" },
    { id: "ORD-005", customer: "Robert Jones", date: "2025-05-12", status: "Delivered", total: "$94.75" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance and analytics.</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Overview of the latest orders placed in your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

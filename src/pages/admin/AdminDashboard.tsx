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

  // Mock data for recent orders - expanded to show scrolling
  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", date: "2025-05-15", status: "Delivered", total: "$85.00" },
    { id: "ORD-002", customer: "Jane Smith", date: "2025-05-14", status: "Processing", total: "$142.50" },
    { id: "ORD-003", customer: "Michael Brown", date: "2025-05-14", status: "Shipped", total: "$67.25" },
    { id: "ORD-004", customer: "Sarah Wilson", date: "2025-05-13", status: "Processing", total: "$129.99" },
    { id: "ORD-005", customer: "Robert Jones", date: "2025-05-12", status: "Delivered", total: "$94.75" },
    { id: "ORD-006", customer: "Emily Davis", date: "2025-05-11", status: "Cancelled", total: "$56.25" },
    { id: "ORD-007", customer: "David Miller", date: "2025-05-10", status: "Delivered", total: "$112.30" },
    { id: "ORD-008", customer: "Lisa Garcia", date: "2025-05-09", status: "Processing", total: "$89.99" },
    { id: "ORD-009", customer: "Mark Johnson", date: "2025-05-08", status: "Shipped", total: "$156.75" },
    { id: "ORD-010", customer: "Amanda White", date: "2025-05-07", status: "Delivered", total: "$78.50" },
    { id: "ORD-011", customer: "Chris Lee", date: "2025-05-06", status: "Processing", total: "$203.25" },
    { id: "ORD-012", customer: "Rachel Green", date: "2025-05-05", status: "Cancelled", total: "$45.99" },
    { id: "ORD-013", customer: "Tom Wilson", date: "2025-05-04", status: "Delivered", total: "$134.50" },
    { id: "ORD-014", customer: "Kelly Brown", date: "2025-05-03", status: "Shipped", total: "$92.75" },
    { id: "ORD-015", customer: "Steve Davis", date: "2025-05-02", status: "Processing", total: "$167.99" },
    { id: "ORD-016", customer: "Nina Martinez", date: "2025-05-01", status: "Delivered", total: "$98.25" },
    { id: "ORD-017", customer: "Paul Anderson", date: "2025-04-30", status: "Processing", total: "$145.75" },
    { id: "ORD-018", customer: "Grace Taylor", date: "2025-04-29", status: "Shipped", total: "$76.50" },
    { id: "ORD-019", customer: "Alex Turner", date: "2025-04-28", status: "Delivered", total: "$189.99" },
    { id: "ORD-020", customer: "Maya Patel", date: "2025-04-27", status: "Processing", total: "$112.25" },
    { id: "ORD-021", customer: "James Wilson", date: "2025-04-26", status: "Delivered", total: "$95.00" },
    { id: "ORD-022", customer: "Sophie Chen", date: "2025-04-25", status: "Shipped", total: "$178.50" },
    { id: "ORD-023", customer: "Ryan Murphy", date: "2025-04-24", status: "Processing", total: "$234.75" },
    { id: "ORD-024", customer: "Emma Thompson", date: "2025-04-23", status: "Cancelled", total: "$67.99" },
    { id: "ORD-025", customer: "Lucas Rodriguez", date: "2025-04-22", status: "Delivered", total: "$156.25" }
  ];

  return (
    <div className="space-y-6 max-h-full h-full overflow-hidden flex flex-col">
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

      {/* Recent orders with scrollable table */}
      <Card className="h-full flex flex-col flex-1 min-h-0">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Overview of the latest orders placed in your store.</CardDescription>
        </CardHeader>
        <CardContent className="pb-6 max-h-full flex-1 overflow-hidden rounded-md">
          <div className="rounded-md border h-full overflow-hidden overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
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
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
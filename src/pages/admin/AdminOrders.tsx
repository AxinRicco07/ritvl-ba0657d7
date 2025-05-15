
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminOrders: React.FC = () => {
  const { toast } = useToast();
  
  // Mock data for orders
  const orders = [
    { 
      id: "ORD-001", 
      customer: "John Doe", 
      email: "john@example.com", 
      date: "2025-05-15", 
      status: "Delivered", 
      total: 85.00,
      items: 3
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith", 
      email: "jane@example.com", 
      date: "2025-05-14", 
      status: "Processing", 
      total: 142.50,
      items: 2
    },
    { 
      id: "ORD-003", 
      customer: "Michael Brown", 
      email: "michael@example.com", 
      date: "2025-05-14", 
      status: "Shipped", 
      total: 67.25,
      items: 1
    },
    { 
      id: "ORD-004", 
      customer: "Sarah Wilson", 
      email: "sarah@example.com", 
      date: "2025-05-13", 
      status: "Processing", 
      total: 129.99,
      items: 4
    },
    { 
      id: "ORD-005", 
      customer: "Robert Jones", 
      email: "robert@example.com", 
      date: "2025-05-12", 
      status: "Delivered", 
      total: 94.75,
      items: 2
    },
    { 
      id: "ORD-006", 
      customer: "Emily Davis", 
      email: "emily@example.com", 
      date: "2025-05-11", 
      status: "Cancelled", 
      total: 56.25,
      items: 1
    },
    { 
      id: "ORD-007", 
      customer: "David Miller", 
      email: "david@example.com", 
      date: "2025-05-10", 
      status: "Delivered", 
      total: 112.30,
      items: 3
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "default";
      case "Processing": return "secondary";
      case "Shipped": return "secondary";
      case "Cancelled": return "destructive";
      default: return "default";
    }
  };
  
  const handleViewOrder = (id: string) => {
    toast({
      title: "View Order",
      description: `Viewing details for order: ${id}`,
    });
  };
  
  const handleUpdateStatus = (id: string) => {
    toast({
      title: "Update Status",
      description: `Status update for order: ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders and track shipments.</p>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id)}
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {["processing", "shipped", "delivered", "cancelled"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>{tab.charAt(0).toUpperCase() + tab.slice(1)} Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders
                        .filter(order => order.status.toLowerCase() === tab)
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>{order.customer}</div>
                              <div className="text-sm text-muted-foreground">{order.email}</div>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleViewOrder(order.id)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id)}
                              >
                                Update
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminOrders;

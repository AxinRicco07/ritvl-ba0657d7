import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminCustomers: React.FC = () => {
  const { toast } = useToast();

  // Mock data for customers
  const customers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      totalOrders: 12,
      totalSpent: 1250.75,
      status: "Active",
      joined: "2024-01-15",
      tier: "Gold",
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      totalOrders: 8,
      totalSpent: 892.50,
      status: "Active",
      joined: "2024-02-10",
      tier: "Silver",
    },
    {
      id: "CUST-003",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 345-6789",
      totalOrders: 3,
      totalSpent: 245.25,
      status: "Active",
      joined: "2024-03-22",
      tier: "Bronze",
    },
    {
      id: "CUST-004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      totalOrders: 25,
      totalSpent: 2890.99,
      status: "VIP",
      joined: "2023-08-05",
      tier: "Platinum",
    },
    {
      id: "CUST-005",
      name: "Robert Jones",
      email: "robert@example.com",
      phone: "+1 (555) 567-8901",
      totalOrders: 6,
      totalSpent: 567.75,
      status: "Active",
      joined: "2024-04-18",
      tier: "Silver",
    },
    {
      id: "CUST-006",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 678-9012",
      totalOrders: 0,
      totalSpent: 0.00,
      status: "Inactive",
      joined: "2024-05-01",
      tier: "Bronze",
    },
    {
      id: "CUST-007",
      name: "David Miller",
      email: "david@example.com",
      phone: "+1 (555) 789-0123",
      totalOrders: 15,
      totalSpent: 1567.30,
      status: "Active",
      joined: "2023-12-12",
      tier: "Gold",
    },
    {
      id: "CUST-008",
      name: "Lisa Garcia",
      email: "lisa@example.com",
      phone: "+1 (555) 890-1234",
      totalOrders: 4,
      totalSpent: 359.99,
      status: "Active",
      joined: "2024-03-08",
      tier: "Bronze",
    },
    {
      id: "CUST-009",
      name: "Mark Johnson",
      email: "mark@example.com",
      phone: "+1 (555) 901-2345",
      totalOrders: 18,
      totalSpent: 2156.75,
      status: "VIP",
      joined: "2023-09-15",
      tier: "Platinum",
    },
    {
      id: "CUST-010",
      name: "Amanda White",
      email: "amanda@example.com",
      phone: "+1 (555) 012-3456",
      totalOrders: 7,
      totalSpent: 678.50,
      status: "Active",
      joined: "2024-02-28",
      tier: "Silver",
    },
    {
      id: "CUST-011",
      name: "Chris Lee",
      email: "chris@example.com",
      phone: "+1 (555) 123-5678",
      totalOrders: 22,
      totalSpent: 3203.25,
      status: "VIP",
      joined: "2023-06-20",
      tier: "Platinum",
    },
    {
      id: "CUST-012",
      name: "Rachel Green",
      email: "rachel@example.com",
      phone: "+1 (555) 234-6789",
      totalOrders: 1,
      totalSpent: 45.99,
      status: "Active",
      joined: "2024-05-10",
      tier: "Bronze",
    },
    {
      id: "CUST-013",
      name: "Tom Wilson",
      email: "tom@example.com",
      phone: "+1 (555) 345-7890",
      totalOrders: 9,
      totalSpent: 1034.50,
      status: "Active",
      joined: "2024-01-08",
      tier: "Silver",
    },
    {
      id: "CUST-014",
      name: "Kelly Brown",
      email: "kelly@example.com",
      phone: "+1 (555) 456-8901",
      totalOrders: 5,
      totalSpent: 492.75,
      status: "Active",
      joined: "2024-03-15",
      tier: "Bronze",
    },
    {
      id: "CUST-015",
      name: "Steve Davis",
      email: "steve@example.com",
      phone: "+1 (555) 567-9012",
      totalOrders: 13,
      totalSpent: 1667.99,
      status: "Active",
      joined: "2023-11-22",
      tier: "Gold",
    },
    {
      id: "CUST-016",
      name: "Nina Martinez",
      email: "nina@example.com",
      phone: "+1 (555) 678-0123",
      totalOrders: 6,
      totalSpent: 598.25,
      status: "Active",
      joined: "2024-04-02",
      tier: "Silver",
    },
    {
      id: "CUST-017",
      name: "Paul Anderson",
      email: "paul@example.com",
      phone: "+1 (555) 789-1234",
      totalOrders: 11,
      totalSpent: 1345.75,
      status: "Active",
      joined: "2023-12-30",
      tier: "Gold",
    },
    {
      id: "CUST-018",
      name: "Grace Taylor",
      email: "grace@example.com",
      phone: "+1 (555) 890-2345",
      totalOrders: 2,
      totalSpent: 176.50,
      status: "Active",
      joined: "2024-04-25",
      tier: "Bronze",
    },
    {
      id: "CUST-019",
      name: "Alex Turner",
      email: "alex@example.com",
      phone: "+1 (555) 901-3456",
      totalOrders: 16,
      totalSpent: 1989.99,
      status: "Active",
      joined: "2023-10-08",
      tier: "Gold",
    },
    {
      id: "CUST-020",
      name: "Maya Patel",
      email: "maya@example.com",
      phone: "+1 (555) 012-4567",
      totalOrders: 0,
      totalSpent: 0.00,
      status: "Inactive",
      joined: "2024-05-12",
      tier: "Bronze",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "VIP":
        return "secondary";
      case "Inactive":
        return "destructive";
      default:
        return "default";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "default";
      case "Gold":
        return "secondary";
      case "Silver":
        return "secondary";
      case "Bronze":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleViewCustomer = (id: string) => {
    toast({
      title: "View Customer",
      description: `Viewing details for customer: ${id}`,
    });
  };

  const handleEditCustomer = (id: string) => {
    toast({
      title: "Edit Customer",
      description: `Editing customer: ${id}`,
    });
  };

  return (
    <div className="space-y-6 max-h-full h-full overflow-hidden flex flex-col">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage customer accounts and view their activity.
        </p>
      </div>

      <Tabs defaultValue="all" className="flex flex-col flex-1 min-h-0">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 min-h-0 overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent className="pb-6 max-h-full flex-1 overflow-hidden rounded-md">
              <div className="rounded-md border h-full overflow-hidden overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.id}
                        </TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>
                          <div>{customer.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.phone}
                          </div>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getTierColor(customer.tier)}>
                            {customer.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleViewCustomer(customer.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCustomer(customer.id)}
                          >
                            Edit
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

        {["active", "vip", "inactive"].map((tab) => (
          <TabsContent key={tab} value={tab} className="flex-1 min-h-0 overflow-hidden">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6 max-h-full flex-1 overflow-hidden rounded-md">
                <div className="rounded-md border h-full overflow-hidden overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers
                        .filter((customer) => customer.status.toLowerCase() === tab)
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                              {customer.id}
                            </TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>
                              <div>{customer.email}</div>
                              <div className="text-sm text-muted-foreground">
                                {customer.phone}
                              </div>
                            </TableCell>
                            <TableCell>{customer.totalOrders}</TableCell>
                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={getTierColor(customer.tier)}>
                                {customer.tier}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(customer.status)}>
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleViewCustomer(customer.id)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCustomer(customer.id)}
                              >
                                Edit
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

export default AdminCustomers;
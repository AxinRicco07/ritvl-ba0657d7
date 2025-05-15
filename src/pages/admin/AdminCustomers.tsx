
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminCustomers: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for customers
  const customers = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com",
      location: "New York, USA",
      orders: 5,
      totalSpent: 325.75,
      status: "Active",
      joinDate: "2025-01-15"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com",
      location: "London, UK",
      orders: 3,
      totalSpent: 142.50,
      status: "Active",
      joinDate: "2025-02-20"
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      email: "michael@example.com",
      location: "Toronto, Canada",
      orders: 1,
      totalSpent: 67.25,
      status: "Inactive",
      joinDate: "2025-03-05"
    },
    { 
      id: 4, 
      name: "Sarah Wilson", 
      email: "sarah@example.com",
      location: "Sydney, Australia",
      orders: 7,
      totalSpent: 429.99,
      status: "Active",
      joinDate: "2025-01-10"
    },
    { 
      id: 5, 
      name: "Robert Jones", 
      email: "robert@example.com",
      location: "Berlin, Germany",
      orders: 2,
      totalSpent: 94.75,
      status: "Active",
      joinDate: "2025-04-12"
    },
    { 
      id: 6, 
      name: "Emily Davis", 
      email: "emily@example.com",
      location: "Paris, France",
      orders: 0,
      totalSpent: 0,
      status: "New",
      joinDate: "2025-05-11"
    },
  ];

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  const handleViewCustomer = (id: number) => {
    toast({
      title: "View Customer",
      description: `Viewing details for customer ID: ${id}`,
    });
  };
  
  const handleEmailCustomer = (email: string) => {
    toast({
      title: "Email Customer",
      description: `Composing email to: ${email}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage your customer relationships.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "Active"
                            ? "default"
                            : customer.status === "Inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewCustomer(customer.id)}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEmailCustomer(customer.email)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
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

export default AdminCustomers;

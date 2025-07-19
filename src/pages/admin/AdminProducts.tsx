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

const AdminProducts: React.FC = () => {
  const { toast } = useToast();

  // Mock data for products
  const products = [
    {
      id: "PROD-001",
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      category: "Electronics",
      price: 89.99,
      stock: 45,
      status: "Active",
      created: "2025-04-15",
    },
    {
      id: "PROD-002",
      name: "Smart Watch Pro",
      sku: "SWP-002",
      category: "Wearables",
      price: 299.99,
      stock: 23,
      status: "Active",
      created: "2025-04-10",
    },
    {
      id: "PROD-003",
      name: "Gaming Mouse X1",
      sku: "GMX-003",
      category: "Gaming",
      price: 45.99,
      stock: 0,
      status: "Out of Stock",
      created: "2025-04-08",
    },
    {
      id: "PROD-004",
      name: "USB-C Hub",
      sku: "UCH-004",
      category: "Accessories",
      price: 34.99,
      stock: 67,
      status: "Active",
      created: "2025-04-05",
    },
    {
      id: "PROD-005",
      name: "Mechanical Keyboard",
      sku: "MKB-005",
      category: "Computing",
      price: 129.99,
      stock: 15,
      status: "Low Stock",
      created: "2025-04-02",
    },
    {
      id: "PROD-006",
      name: "Portable Speaker",
      sku: "PSP-006",
      category: "Audio",
      price: 79.99,
      stock: 89,
      status: "Active",
      created: "2025-03-28",
    },
    {
      id: "PROD-007",
      name: "Laptop Stand",
      sku: "LPS-007",
      category: "Accessories",
      price: 25.99,
      stock: 156,
      status: "Active",
      created: "2025-03-25",
    },
    {
      id: "PROD-008",
      name: "Wireless Charger",
      sku: "WCH-008",
      category: "Charging",
      price: 39.99,
      stock: 3,
      status: "Low Stock",
      created: "2025-03-20",
    },
    {
      id: "PROD-009",
      name: "4K Webcam",
      sku: "4KW-009",
      category: "Video",
      price: 159.99,
      stock: 28,
      status: "Active",
      created: "2025-03-15",
    },
    {
      id: "PROD-010",
      name: "Phone Case Pro",
      sku: "PCP-010",
      category: "Accessories",
      price: 19.99,
      stock: 234,
      status: "Active",
      created: "2025-03-12",
    },
    {
      id: "PROD-011",
      name: "Bluetooth Earbuds",
      sku: "BTE-011",
      category: "Audio",
      price: 69.99,
      stock: 0,
      status: "Out of Stock",
      created: "2025-03-08",
    },
    {
      id: "PROD-012",
      name: "Tablet Stand",
      sku: "TBS-012",
      category: "Accessories",
      price: 29.99,
      stock: 78,
      status: "Active",
      created: "2025-03-05",
    },
    {
      id: "PROD-013",
      name: "Gaming Headset",
      sku: "GHS-013",
      category: "Gaming",
      price: 99.99,
      stock: 12,
      status: "Low Stock",
      created: "2025-03-01",
    },
    {
      id: "PROD-014",
      name: "Monitor Arm",
      sku: "MNA-014",
      category: "Computing",
      price: 79.99,
      stock: 45,
      status: "Active",
      created: "2025-02-25",
    },
    {
      id: "PROD-015",
      name: "Cable Organizer",
      sku: "CBO-015",
      category: "Organization",
      price: 14.99,
      stock: 189,
      status: "Active",
      created: "2025-02-20",
    },
    {
      id: "PROD-016",
      name: "Power Bank 20000mAh",
      sku: "PB2-016",
      category: "Charging",
      price: 49.99,
      stock: 56,
      status: "Active",
      created: "2025-02-15",
    },
    {
      id: "PROD-017",
      name: "Smart Light Bulb",
      sku: "SLB-017",
      category: "Smart Home",
      price: 24.99,
      stock: 123,
      status: "Active",
      created: "2025-02-10",
    },
    {
      id: "PROD-018",
      name: "Desk Pad XXL",
      sku: "DPX-018",
      category: "Accessories",
      price: 34.99,
      stock: 67,
      status: "Active",
      created: "2025-02-05",
    },
    {
      id: "PROD-019",
      name: "Car Phone Mount",
      sku: "CPM-019",
      category: "Automotive",
      price: 22.99,
      stock: 145,
      status: "Active",
      created: "2025-02-01",
    },
    {
      id: "PROD-020",
      name: "Noise Cancelling Headphones",
      sku: "NCH-020",
      category: "Audio",
      price: 199.99,
      stock: 8,
      status: "Low Stock",
      created: "2025-01-28",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
      case "Discontinued":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleViewProduct = (id: string) => {
    toast({
      title: "View Product",
      description: `Viewing details for product: ${id}`,
    });
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product: ${id}`,
    });
  };

  return (
    <div className="space-y-6 max-h-full h-full overflow-hidden flex flex-col">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog and inventory.
        </p>
      </div>

      <Tabs defaultValue="all" className="flex flex-col flex-1 min-h-0">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 min-h-0 overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>All Products</CardTitle>
            </CardHeader>
            <CardContent className="pb-6 max-h-full flex-1 overflow-hidden rounded-md">
              <div className="rounded-md border h-full overflow-hidden overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.id}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {product.sku}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
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

        {["active", "low-stock", "out-of-stock"].map((tab) => (
          <TabsContent key={tab} value={tab} className="flex-1 min-h-0 overflow-hidden">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>
                  {tab === "low-stock" ? "Low Stock" : tab === "out-of-stock" ? "Out of Stock" : "Active"} Products
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6 max-h-full flex-1 overflow-hidden rounded-md">
                <div className="rounded-md border h-full overflow-hidden overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products
                        .filter((product) => {
                          if (tab === "active") return product.status === "Active";
                          if (tab === "low-stock") return product.status === "Low Stock";
                          if (tab === "out-of-stock") return product.status === "Out of Stock";
                          return true;
                        })
                        .map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              {product.id}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {product.sku}
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(product.status)}>
                                {product.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleViewProduct(product.id)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(product.id)}
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

export default AdminProducts;
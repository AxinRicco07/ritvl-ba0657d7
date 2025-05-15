
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for products
  const products = [
    { id: 1, name: "Sea Salt Body Scrub", category: "Body Care", price: 24.99, stock: 45, status: "In Stock" },
    { id: 2, name: "Lavender Bath Salt", category: "Bath", price: 18.50, stock: 32, status: "In Stock" },
    { id: 3, name: "Citrus & Honey Face Mask", category: "Face Care", price: 29.99, stock: 12, status: "Low Stock" },
    { id: 4, name: "Eucalyptus Shower Steamer", category: "Bath", price: 15.99, stock: 0, status: "Out of Stock" },
    { id: 5, name: "Rose Water Toner", category: "Face Care", price: 22.50, stock: 28, status: "In Stock" },
    { id: 6, name: "Himalayan Salt Soap", category: "Body Care", price: 12.99, stock: 50, status: "In Stock" },
    { id: 7, name: "Detox Bath Set", category: "Gift Sets", price: 45.00, stock: 15, status: "In Stock" },
    { id: 8, name: "Exfoliating Salt Scrub", category: "Body Care", price: 26.99, stock: 8, status: "Low Stock" },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product form would open here",
    });
  };
  
  const handleEditProduct = (id: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product with ID: ${id}`,
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Delete Product",
      description: `Product with ID: ${id} would be deleted`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product inventory.</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Products</CardTitle>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : product.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4" />
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

export default AdminProducts;

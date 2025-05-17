
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define the product image type
interface ProductImage {
  id: string;
  url: string;
  isMain?: boolean;
}

// Define the product type
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  images: ProductImage[];
}

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for products with images
  const products: Product[] = [
    { 
      id: 1, 
      name: "Sea Salt Body Scrub", 
      category: "Body Care", 
      price: 24.99, 
      stock: 45, 
      status: "In Stock",
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1500673922987-e212871fec22", isMain: true }
      ]
    },
    { 
      id: 2, 
      name: "Lavender Bath Salt", 
      category: "Bath", 
      price: 18.50, 
      stock: 32, 
      status: "In Stock",
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", isMain: true }
      ]
    },
    { 
      id: 3, 
      name: "Citrus & Honey Face Mask", 
      category: "Face Care", 
      price: 29.99, 
      stock: 12, 
      status: "Low Stock",
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", isMain: true }
      ] 
    },
    { 
      id: 4, 
      name: "Eucalyptus Shower Steamer", 
      category: "Bath", 
      price: 15.99, 
      stock: 0, 
      status: "Out of Stock",
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", isMain: true }
      ]
    },
    { 
      id: 5, 
      name: "Rose Water Toner", 
      category: "Face Care", 
      price: 22.50, 
      stock: 28, 
      status: "In Stock",
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", isMain: true }
      ]
    },
    { 
      id: 6, 
      name: "Himalayan Salt Soap", 
      category: "Body Care", 
      price: 12.99, 
      stock: 50, 
      status: "In Stock",
      images: []
    },
    { 
      id: 7, 
      name: "Detox Bath Set", 
      category: "Gift Sets", 
      price: 45.00, 
      stock: 15, 
      status: "In Stock",
      images: []
    },
    { 
      id: 8, 
      name: "Exfoliating Salt Scrub", 
      category: "Body Care", 
      price: 26.99, 
      stock: 8, 
      status: "Low Stock",
      images: []
    },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          <Button asChild className="bg-blue-600 hover:bg-blue-500">
            <Link to="/admin/products/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
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
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        {product.images.length > 0 ? (
                          <AspectRatio ratio={1 / 1}>
                            <img 
                              src={product.images.find(img => img.isMain)?.url || product.images[0].url} 
                              alt={product.name} 
                              className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-500 text-xs">No image</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
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
                        className={product.status === "In Stock" ? "bg-blue-600 hover:bg-blue-500" : ""}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hover:text-blue-600"
                      >
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="hover:text-destructive"
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

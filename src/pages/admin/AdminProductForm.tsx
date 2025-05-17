
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FlaskConical, ArrowLeft, Save, PackagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Product type definition
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description?: string;
  imageUrl?: string;
}

const AdminProductForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  // Form state
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "In Stock",
    description: "",
    imageUrl: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock categories
  const categories = ["Bath", "Body Care", "Face Care", "Gift Sets"];

  // Mock product data for edit mode
  const mockProducts: Product[] = [
    { id: 1, name: "Sea Salt Body Scrub", category: "Body Care", price: 24.99, stock: 45, status: "In Stock", description: "Exfoliating scrub with sea salt minerals" },
    { id: 2, name: "Lavender Bath Salt", category: "Bath", price: 18.50, stock: 32, status: "In Stock", description: "Relaxing bath salt infused with lavender" },
    { id: 3, name: "Citrus & Honey Face Mask", category: "Face Care", price: 29.99, stock: 12, status: "Low Stock", description: "Refreshing face mask with citrus and honey" },
  ];
  
  // Load product data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      
      // Simulate API call to fetch product data
      setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast({
            title: "Product not found",
            description: `No product found with ID: ${id}`,
            variant: "destructive",
          });
          navigate("/admin/products");
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode, navigate, toast]);
  
  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: isEditMode ? "Product Updated" : "Product Created",
        description: isEditMode 
          ? `Product "${product.name}" was updated successfully` 
          : `Product "${product.name}" was created successfully`,
      });
      setIsLoading(false);
      navigate("/admin/products");
    }, 800);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Update your existing product information" : "Create a new product in your catalog"}
          </p>
        </div>
        
        <Button variant="outline" onClick={() => navigate("/admin/products")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>
      
      <Card className="border-blue-100">
        <CardHeader className="bg-blue-50/50">
          <CardTitle className="flex items-center gap-2">
            {isEditMode 
              ? <FlaskConical className="h-5 w-5 text-blue-600" />
              : <PackagePlus className="h-5 w-5 text-blue-600" />
            }
            {isEditMode ? "Product Information" : "New Product Details"}
          </CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  value={product.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter product name"
                  className="focus-visible:ring-blue-500"
                  required
                />
              </div>
              
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={product.category} 
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger id="category" className="focus-visible:ring-blue-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={product.price} 
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  className="focus-visible:ring-blue-500"
                  required
                />
              </div>
              
              {/* Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  min="0"
                  value={product.stock} 
                  onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                  className="focus-visible:ring-blue-500"
                  required
                />
              </div>
              
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={product.status} 
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger id="status" className="focus-visible:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={product.imageUrl || ""} 
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="focus-visible:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={product.description || ""} 
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter product description"
                className="min-h-[100px] focus-visible:ring-blue-500"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4 bg-blue-50/30 border-t border-blue-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
              disabled={isLoading}
              className="border-blue-200 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading} 
              className="bg-blue-600 hover:bg-blue-500 text-white flex gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Product'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminProductForm;

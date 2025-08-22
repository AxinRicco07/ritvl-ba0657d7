import React, { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { 
  PackagePlus, 
  Trash2, 
  Eye, 
  Edit3, 
  Package,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";
import { InventoryRecord, PublicProduct } from "@/types/product";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductInventoryRecord = PublicProduct & {
  quantity: number;
  status: "active" | "low-stock" | "out-of-stock";
};

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const queryClient = useQueryClient();
  const {
    data: productsList,
    isFetching,
    isError,
  } = useQuery<PublicProduct[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/products`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: inventoryList, isFetching: isInventoryFetching } = useQuery<
    InventoryRecord[]
  >({
    queryKey: ["admin-inventory"],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/inventory/list`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return res.json();
    },
  });

  const [products, setProducts] = useState<ProductInventoryRecord[]>([]);

  useEffect(() => {
    if (productsList && inventoryList) {
      const combinedData = productsList.map((product) => {
        const inventoryItem = inventoryList.find(
          (item: InventoryRecord) => item.sku === product.sku
        );
        
        let status: "active" | "low-stock" | "out-of-stock" = "out-of-stock";
        
        if (inventoryItem?.quantity >= (inventoryItem.fewStocks ?? 100) && inventoryItem?.inStock) {
          status = "active";
        } else if (inventoryItem?.quantity < (inventoryItem.fewStocks ?? 100) && inventoryItem?.inStock) {
          status = "low-stock";
        }
        
        return {
          ...product,
          quantity: inventoryItem?.quantity || 0,
          status: status,
        };
      });
      setProducts(combinedData);
    }
  }, [productsList, inventoryList]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "low-stock":
        return "secondary";
      case "out-of-stock":
        return "destructive";
      case "Discontinued":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className="h-3 w-3 mr-1" />;
      case "low-stock":
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case "out-of-stock":
        return <XCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
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

  const handleDeleteProduct = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${fetchPrefix}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete product");
      }

      toast({
        title: "Success",
        description: `Product "${name}" has been deleted.`,
      });

      await queryClient.invalidateQueries({queryKey: ['admin-products']});
      await queryClient.invalidateQueries({queryKey: ['admin-inventory']});
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not delete product.",
        variant: "destructive",
      });
    }
  };

  const getTabStats = (status: string) => {
    if (status === "all") return products.length;
    return products.filter(p => p.status === status).length;
  };

  const isLoading = isFetching || isInventoryFetching;

  const ProductTableSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-8" />
          </div>
        </div>
      ))}
    </div>
  );

  const ProductTable = ({ products: tableProducts }: { products: ProductInventoryRecord[] }) => (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b border-border/50">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="font-semibold text-foreground">ID</TableHead>
            <TableHead className="font-semibold text-foreground">Product</TableHead>
            <TableHead className="font-semibold text-foreground">SKU</TableHead>
            <TableHead className="font-semibold text-foreground">Category</TableHead>
            <TableHead className="font-semibold text-foreground">Price</TableHead>
            <TableHead className="font-semibold text-foreground">Stock</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableProducts.map((product) => (
            <TableRow 
              key={product.id} 
              className="group border-border/50 hover:bg-muted/50 transition-all duration-200 hover:shadow-sm"
            >
              <TableCell className="font-medium text-sm">
                <div className="font-mono text-muted-foreground">
                  #{product.id.slice(-8)}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{product.name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground font-mono">
                  {product.sku}
                </div>
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium">
                  {product.category.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-green-700 dark:text-green-400">
                  ₹{product.price.sp.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <div className={`font-medium ${
                  product.quantity === 0 
                    ? 'text-destructive' 
                    : product.quantity < 10 
                    ? 'text-orange-600 dark:text-orange-400' 
                    : 'text-foreground'
                }`}>
                  {product.quantity}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={getStatusColor(product.status)}
                  className="inline-flex items-center transition-all duration-200 hover:scale-105"
                >
                  {getStatusIcon(product.status)}
                  {product.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                    asChild
                  >
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Edit3 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-destructive"
                    onClick={() =>
                      handleDeleteProduct(product.id, product.name)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tableProducts.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog and inventory with ease.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
            <Button 
              className="gap-1" 
              asChild
            >
              <Link to="add">
                <PackagePlus className="h-4 w-4" />
                <span>Add Product</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Advanced Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Price Range</DropdownMenuItem>
              <DropdownMenuItem>Stock Level</DropdownMenuItem>
              <DropdownMenuItem>Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <TabsList className="mb-6 bg-muted/50 p-1 w-full max-w-md">
          <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-background">
            <Package className="h-4 w-4 mr-2" />
            All
            <span className="ml-2 px-2 py-0.5 bg-muted-foreground/20 rounded-full text-xs">
              {getTabStats("all")}
            </span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1 data-[state=active]:bg-background">
            <TrendingUp className="h-4 w-4 mr-2" />
            Active
            <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
              {getTabStats("active")}
            </span>
          </TabsTrigger>
          <TabsTrigger value="low-stock" className="flex-1 data-[state=active]:bg-background">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Low Stock
            <span className="ml-2 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">
              {getTabStats("low-stock")}
            </span>
          </TabsTrigger>
          <TabsTrigger value="out-of-stock" className="flex-1 data-[state=active]:bg-background">
            <XCircle className="h-4 w-4 mr-2" />
            Out of Stock
            <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs">
              {getTabStats("out-of-stock")}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0 overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {activeTab === "all" && "All Products"}
                  {activeTab === "active" && "Active Products"}
                  {activeTab === "low-stock" && "Low Stock Products"}
                  {activeTab === "out-of-stock" && "Out of Stock Products"}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredProducts.filter(product => 
                    activeTab === "all" ? true : product.status === activeTab
                  ).length} products
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6 flex-1 overflow-hidden p-0">
              {isLoading ? (
                <div className="p-6">
                  <ProductTableSkeleton />
                </div>
              ) : (
                <div className="h-full overflow-y-auto">
                  <ProductTable 
                    products={filteredProducts.filter(product => 
                      activeTab === "all" ? true : product.status === activeTab
                    )} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminProducts;
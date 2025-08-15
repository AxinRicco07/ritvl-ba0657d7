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
import { PackagePlus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";
import { InventoryRecord, PublicProduct } from "@/types/product";

type ProductInventoryRecord = PublicProduct & {
  quantity: number;
  status: "active" | "low-stock" | "out-of-stock";
};

const AdminProducts: React.FC = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient()
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
          (item: ProductInventoryRecord) => item.sku === product.sku
        );
        return {
          ...product,
          quantity: inventoryItem?.quantity || 0,
          status:
            inventoryItem.quantity >= (inventoryItem.fewStocks ?? 100) &&
            inventoryItem.inStock
              ? "active"
              : inventoryItem.quantity < (inventoryItem.fewStocks ?? 100) &&
                inventoryItem.inStock
              ? "low-stock"
              : "out-of-stock",
        };
      });
      setProducts(combinedData);
    }
  }, [productsList, inventoryList]);

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
    // Confirm deletion
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
        credentials: "include", // important for session/auth cookies
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete product");
      }

      // ✅ Success
      toast({
        title: "Success",
        description: `Product "${name}" has been deleted.`,
      });

      await queryClient.invalidateQueries({queryKey: ['admin-products']})
      await queryClient.invalidateQueries({queryKey: ['admin-inventory']})

      // Optionally: refetch data or filter locally
      // Since we're using react-query, we can invalidate queries
      // But for now, just refresh the list
      window.location.reload(); // or better: invalidate query (see advanced option below)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not delete product.",
        variant: "destructive",
      });
    }
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
          <TabsTrigger value="all">List Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 min-h-0 overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <div>All Products</div>
              </CardTitle>
              <div>
                <Button variant="outline">
                  <Link
                    className="inline-flex items-center justify-center space-x-2"
                    to="add"
                  >
                    <PackagePlus />
                    <span>Add Product</span>
                  </Link>
                </Button>
              </div>
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
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>₹{product.price.sp}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            View
                          </Button>
                          {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            Edit
                          </Button> */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDeleteProduct(product.id, product.name)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
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
          <TabsContent
            key={tab}
            value={tab}
            className="flex-1 min-h-0 overflow-hidden"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>
                  {tab === "low-stock"
                    ? "Low Stock"
                    : tab === "out-of-stock"
                    ? "Out of Stock"
                    : "Active"}{" "}
                  Products
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
                          if (tab === "active")
                            return product.status === "active";
                          if (tab === "low-stock")
                            return product.status === "low-stock";
                          if (tab === "out-of-stock")
                            return product.status === "out-of-stock";
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
                            <TableCell>{product.category.name}</TableCell>
                            <TableCell>
                              ₹{product.price.sp.toFixed(2)}
                            </TableCell>
                            <TableCell>{product.quantity}</TableCell>
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

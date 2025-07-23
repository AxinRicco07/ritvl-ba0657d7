import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductImageUploader from "@/components/admin/ProductImageUploader";
import { CreateProduct, PublicProduct } from "@/types/product";

// Interfaces (same as before)
interface ProductImage {
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

interface SizeVariant {
  label: string;
  priceModifier: number;
}

interface Product {
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  slug: string;
  price: {
    sp: number;
    mrp: number;
    discount: number;
  };
  images: ProductImage[];
  variants: {
    size: SizeVariant[];
    fragranceStrength: string[];
  };
  details: string;
  ingredients: string;
  howToUse: string;
  benefits: string[];
  ratings: {
    average: number;
    count: number;
  };
  tags: string[];
  category: {
    name: string;
  };
  relatedProducts: string[];
  packaging: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  productType: string;
  inventoryId: string;
}


function partialProduct(product: PublicProduct, inventoryId: string): CreateProduct{
    return {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        sku: product.sku,
        slug: product.slug,
        price: {
            sp: product.price.sp,
            mrp: product.price.mrp,
            discount: product.price.discount,
        },
        images: product.images,
        variants: {
            size: product.variants.size,
            fragranceStrength: product.variants.fragranceStrength,
        },
        details: product.details,
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        benefits: product.benefits,
        ratings: product.ratings,
        tags: product.tags,
        category: product.category,
        relatedProducts: product.relatedProducts,
        packaging: {
            weight: 0,
            dimensions: {
                length: 0,
                width: 0,
                height: 0,
            },
        },
        productType: product.productType,
        inventoryId: inventoryId,
    };
}

const AdminProductEditForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: productData, isFetching, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  const {data: inventoryData, isFetching: isInventoryFetching} = useQuery({
    queryKey: ["inventory", product?.inventoryId],
    queryFn: async () => {
        const res = await fetch(`/api/inventory/${product?.inventoryId}`)
        if (!res.ok) throw new Error("Failed to fetch inventory");
        return res.json();
    }
  })

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  const updateInventory = useMutation({
    mutationFn: async ({ sku }: { sku: string }) => {
      const res = await fetch(`/api/inventory/${product?.inventoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku,
          quantity: 1,
          inStock: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to update inventory");
      return res.json();
    },
  });

  const updateProduct = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: `Product "${product?.name}" updated successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Something went wrong updating the product",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: string, value: any) => {
    if (!product) return;
    setProduct((prev) => ({ ...prev!, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (product.images.length === 0) {
      toast({
        title: "Image Required",
        description: "Please add at least one product image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateInventory.mutateAsync({ sku: product.sku });
      await updateProduct.mutateAsync();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching || !product) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load product. Please try again.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update your product information</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-blue-50/50">
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-600" />
            Product Information
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Product Images */}
            <div className="space-y-2">
              <Label>Product Images</Label>
              <ProductImageUploader
                images={product.images}
                onChange={(images) => handleChange("images", images)}
              />
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "name",
                "sku",
                "slug",
                "shortDescription",
              ].map((key) => (
                <div key={key} className="space-y-2">
                  <Label>{key}</Label>
                  <Input
                    value={(product as any)[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}

              {/* Price Fields */}
              {["mrp", "sp", "discount"].map((key) => (
                <div key={key} className="space-y-2">
                  <Label>{key.toUpperCase()}</Label>
                  <Input
                    type="number"
                    value={product.price[key as keyof typeof product.price]}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev!,
                        price: {
                          ...prev!.price,
                          [key]: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
              ))}

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={product.category.name}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev!,
                      category: { name: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            {/* Textareas */}
            {["description", "details", "ingredients", "howToUse"].map((key) => (
              <div key={key} className="space-y-2">
                <Label>{key}</Label>
                <Textarea
                  value={(product as any)[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}

            {/* Arrays */}
            {["benefits", "tags", "relatedProducts", "variants.fragranceStrength"].map((key) => (
              <div key={key} className="space-y-2">
                <Label>{key}</Label>
                <Textarea
                  placeholder="Comma separated"
                  value={((key.includes(".") ? key.split(".").reduce((a, b) => a[b], product) : (product as any)[key]) || []).join(", ")}
                  onChange={(e) => {
                    const value = e.target.value.split(",").map((v) => v.trim());
                    if (key.includes(".")) {
                      const [parent, child] = key.split(".");
                      setProduct((prev) => ({
                        ...prev!,
                        [parent]: {
                          ...(prev as any)[parent],
                          [child]: value,
                        },
                      }));
                    } else {
                      handleChange(key, value);
                    }
                  }}
                />
              </div>
            ))}

            {/* Packaging */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input
                  type="number"
                  value={product.packaging.weight}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev!,
                      packaging: {
                        ...prev!.packaging,
                        weight: parseFloat(e.target.value),
                      },
                    }))
                  }
                />
              </div>
              {["length", "width", "height"].map((dim) => (
                <div key={dim} className="space-y-2">
                  <Label>{dim}</Label>
                  <Input
                    type="number"
                    value={product.packaging.dimensions[dim as keyof typeof product.packaging.dimensions]}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev!,
                        packaging: {
                          ...prev!.packaging,
                          dimensions: {
                            ...prev!.packaging.dimensions,
                            [dim]: parseFloat(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4 bg-blue-50/30 border-t border-blue-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
              className="border-blue-200 hover:bg-blue-50"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white flex gap-2"
              disabled={isLoading}
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminProductEditForm;

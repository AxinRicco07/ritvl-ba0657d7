import React, { useEffect, useState } from "react";
import { BrowserRouter, useNavigate, useParams } from "react-router-dom";
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
import { Save, ArrowLeft, FlaskConical, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateProduct } from "@/types/product";

// NOTE: This code assumes the existence of `fetchPrefix` and other components/types.

// Interfaces
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

// A simple, self-contained component to handle image uploads
// This replaces the external import to ensure the code compiles and runs.
const ProductImageUploader: React.FC<{
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}> = ({ images, onChange }) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onChange([...images, { url: newImageUrl.trim() }]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img.url}
              alt={img.altText || `Product image ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add new image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddImage();
            }
          }}
        />
        <Button type="button" onClick={handleAddImage} className="flex gap-2 items-center">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
};


// Helper: strip product down to safe payload
// Use the full Product from this module so we keep packaging (weight, dimensions)
function partialProduct(product: Product, inventoryId: string): CreateProduct {
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
    ratings: {
      average: product.ratings?.average ?? 0,
      count: product.ratings?.count ?? 0,
    },
    tags: product.tags,
    category: product.category,
    relatedProducts: product.relatedProducts,
    packaging: {
      weight: product.packaging?.weight ?? 1,
      dimensions: {
        length: product.packaging?.dimensions?.length ?? 1,
        width: product.packaging?.dimensions?.width ?? 1,
        height: product.packaging?.dimensions?.height ?? 1,
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

  // Fetch product
  const { data: productData, isFetching, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/products/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  // Fetch inventory (depends on product)
  useQuery({
    queryKey: ["inventory", product?.inventoryId],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/inventory/${product?.inventoryId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return res.json();
    },
    enabled: Boolean(product?.inventoryId),
  });

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  // Mutations
  const updateInventory = useMutation({
    mutationFn: async ({ sku }: { sku: string }) => {
      const res = await fetch(`${fetchPrefix}/api/inventory/${product?.inventoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku,
          quantity: 1,
          inStock: true,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update inventory");
      return res.json();
    },
  });

  const updateProduct = useMutation({
    mutationFn: async () => {
      if (!product) throw new Error("No product to update");
      const payload = partialProduct(product, product.inventoryId);

      const res = await fetch(`${fetchPrefix}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: `Product "${product?.name}" updated successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
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

  // Handlers
  const handleChange = (field: string, value: any) => {
    if (!product) return;
    setProduct((prev) => ({ ...prev!, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // NOTE: This uses window.confirm, which should be replaced with a custom modal in a real app.
    const confirmed = window.confirm(
      "Are you sure you want to save the changes? By doing so you'll lose the previous data."
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await updateInventory.mutateAsync({ sku: product!.sku });
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

  // Conditional rendering
  if (isFetching || !product) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load product. Please try again.</div>;
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
              {["name", "sku", "slug", "shortDescription"].map((key) => (
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
                  value={(
                    (key.includes(".")
                      ? key.split(".").reduce((a: any, b) => a[b], product)
                      : (product as any)[key]) || []
                  ).join(", ")}
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
                  value={product.packaging?.weight || ''}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev!,
                      packaging: {
                        ...(prev?.packaging || {}),
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
                    value={
                      product.packaging?.dimensions?.[
                        dim as keyof typeof product.packaging.dimensions
                      ] || ''
                    }
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev!,
                        packaging: {
                          ...(prev?.packaging || {}),
                          dimensions: {
                            ...(prev?.packaging?.dimensions || {}),
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

export default function App() {
  return (
    <BrowserRouter>
      <AdminProductEditForm />
    </BrowserRouter>
  );
}


export default AdminProductEditForm;

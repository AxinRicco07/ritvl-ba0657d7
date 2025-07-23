import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, ArrowLeft, PackagePlus, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductImageUploader from "@/components/admin/ProductImageUploader";
import { fetchPrefix } from "@/utils/fetch";
import { CreateProduct, PublicProduct } from "@/types/product";
import MultipleProductsSelect from "@/components/admin/RelatedProductSelect";

const AdminProductForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    slug: "",
    price: { sp: 0, mrp: 0, discount: 0 },
    images: [],
    variants: { size: [], fragranceStrength: [] },
    details: "",
    ingredients: "",
    howToUse: "",
    benefits: [""],
    ratings: { average: 0, count: 0 },
    tags: [""],
    category: { name: "" },
    relatedProducts: [""],
    packaging: {
      weight: 1,
      dimensions: { length: 1, width: 1, height: 1 },
    },
    productType: "salt",
    inventoryId: "",
  });

  const [qty, setQty] = useState(1);

  const setProductPayload = useCallback(
    (updater: (prev: CreateProduct) => CreateProduct) => {
      setProduct(updater);
    },
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const {
    data: productsList = [],
    isLoading: isRelatedProductsLoading,
    isError,
  } = useQuery<PublicProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/products`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const inventoryMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: product.sku,
          quantity: qty,
          inStock: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to create inventory");
      return res.json();
    },
  });

  const productMutation = useMutation({
    mutationFn: async (inventoryId: string) => {
      const res = await fetch(`${fetchPrefix}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, inventoryId }),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: `Product "${product.name}" created successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong while creating product.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const inventory = await inventoryMutation.mutateAsync();
      const newProduct = await productMutation.mutateAsync(inventory.id);
      toast({
        title: "Product Created",
        description: `Product "${newProduct.id}" created successfully!`,
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "Update your existing product information"
              : "Create a new product in your catalog"}
          </p>
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

      {/* Form Card */}
      <Card>
        <CardHeader className="bg-blue-50/50">
          <CardTitle className="flex items-center gap-2">
            {isEditMode ? (
              <FlaskConical className="h-5 w-5 text-blue-600" />
            ) : (
              <PackagePlus className="h-5 w-5 text-blue-600" />
            )}
            {isEditMode ? "Product Information" : "New Product Details"}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Product Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <ProductImageUploader
                images={product.images}
                onChange={(images) => handleChange("images", images)}
              />
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", key: "name" },
                { label: "SKU", key: "sku" },
                { label: "Slug", key: "slug" },
                { label: "Short Description", key: "shortDescription" },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={(product as any)[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    required
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
                      ...prev,
                      category: { name: e.target.value },
                    }))
                  }
                />
              </div>

              {/* Price fields */}
              {["mrp", "sp", "discount"].map((priceKey) => (
                <div key={priceKey} className="space-y-2">
                  <Label>{priceKey.toUpperCase()}</Label>
                  <Input
                    step="0.01"
                    type="number"
                    value={
                      product.price[priceKey as keyof typeof product.price]
                    }
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          [priceKey]: parseFloat(e.target.value),
                        },
                      }))
                    }
                    min={0}
                  />
                </div>
              ))}

              {/* Product Type */}
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Input
                  value={product.productType}
                  onChange={(e) => handleChange("productType", e.target.value)}
                />
              </div>
            </div>

            {/* Textarea fields */}
            {["description", "details", "ingredients", "howToUse"].map(
              (key) => (
                <div key={key} className="space-y-2">
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Textarea
                    value={(product as any)[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              )
            )}

            {/* Arrays */}
            {["Benefits", "Tags"].map((key) => (
              <div key={key} className="space-y-2">
                <Label>{key}</Label>
                <Textarea
                  placeholder="Separate values by comma"
                  value={(
                    (key.includes(".")
                      ? key.split(".").reduce((a, b) => a[b], product)
                      : (product as any)[key]) || []
                  ).join(", ")}
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((v) => v.trim());
                    if (key.includes(".")) {
                      const [parent, child] = key.split(".");
                      setProduct((prev) => ({
                        ...prev,
                        [parent]: {
                          ...prev[parent as keyof typeof prev],
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

            <MultipleProductsSelect
              products={productsList.map((p) => {
                return {
                  id: p.id,
                  name: p.name,
                  image:
                    p.images.filter((img) => img.isPrimary)[0]?.url ||
                    "/placeholder.svg",
                  price: p.price.sp,
                  category: p.category.name,
                  description: p.shortDescription || "",
                };
              })}
              setProductPayload={setProductPayload}
            />

            {/* Packaging */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Weight (g)</Label>
                <Input
                  type="number"
                  value={product.packaging.weight}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      packaging: {
                        ...prev.packaging,
                        weight: parseFloat(e.target.value),
                      },
                    }))
                  }
                />
              </div>
              {["Length", "Width", "Height", "Quantity"].map((dim) => (
                <div key={dim} className="space-y-2">
                  <Label>{dim}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={
                     dim === "Quantity"
                        ? qty
                        : product.packaging.dimensions[dim.toLowerCase()]
                    }
                    min={dim === "Quantity" ? 1 : 0}
                    onChange={(e) => {
                      if (dim === "Quantity") {
                        setQty(parseInt(e.target.value, 10));
                      } else {
                        setProduct((prev) => ({
                        ...prev,
                        packaging: {
                          ...prev.packaging,
                          dimensions: {
                            ...prev.packaging.dimensions,
                            [dim]: parseFloat(e.target.value),
                          },
                        },
                      }))
                      }
                    }}
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
              {isLoading ? "Saving..." : "Save Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminProductForm;

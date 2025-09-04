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
import ProductTags from "@/components/admin/ProductTags";
import { MultiSelect } from "@/components/ui/multi-select";

const TAGS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
];

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
    tags: [],
    category: { name: "" },
    relatedProducts: [""],
    packaging: {
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
    },
    productType: "salt",
    inventoryId: "",
  });

  useEffect(() => {
    console.log("Product has been changed", product);
    setBenefitsInput((product.benefits || []).join(", "));
  }, [product]);

  const [qty, setQty] = useState(0);
  const [benefitsInput, setBenefitsInput] = useState<string>("");
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
          inStock: qty > 0,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create inventory");
      return res.json();
    },
  });

  const productMutation = useMutation({
    mutationFn: async ({ inventoryId, payload }: { inventoryId: string; payload: CreateProduct }) => {
      const res = await fetch(`${fetchPrefix}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, inventoryId }),
        credentials: "include",
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

    const parsedBenefits = benefitsInput
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

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
      const payload: CreateProduct = { ...product, benefits: parsedBenefits };
      const newProduct = await productMutation.mutateAsync({ inventoryId: inventory.id, payload });
      toast({
        title: "Product Created",
        description: `Product "${newProduct.id}" created successfully!`,
      });
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
                images={product.images.map(img => ({ ...img, id: img.url }))}
                onChange={(images) => handleChange("images", images.map(({ id, ...img }) => img))}
              />
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", key: "name", required: true },
                { label: "SKU", key: "sku", required: true },
                { label: "Slug", key: "slug", required: true },
                { label: "Short Description", key: "shortDescription", required: true },
              ].map(({ label, key, required }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
                  <Input
                    value={(product as any)[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    required={required}
                    placeholder={`Enter ${label.toLowerCase()}`}
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
                  placeholder="e.g., Bath Salts, Soaps"
                />
              </div>

              {/* Price fields */}
              {[
                { key: "mrp", label: "MRP (Maximum Retail Price)" },
                { key: "sp", label: "Selling Price" },
                { key: "discount", label: "Discount (%)" }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    step="0.01"
                    type="number"
                    value={
                      product.price[key as keyof typeof product.price] || ""
                    }
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          [key]: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    min={0}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Product Type */}
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Input
                  value={product.productType}
                  onChange={(e) => handleChange("productType", e.target.value)}
                  placeholder="e.g., salt, soap, oil"
                />
              </div>
            </div>

            {/* Textarea fields */}
            {[
              { key: "description", label: "Description" },
              { key: "details", label: "Details" },
              { key: "ingredients", label: "Ingredients" },
              { key: "howToUse", label: "How To Use" }
            ].map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Textarea
                  value={(product as any)[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="min-h-[80px]"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Benefits textarea */}
            <div className="space-y-2">
              <Label>Benefits</Label>
              <Textarea
                placeholder="Separate values by comma (e.g., Relaxation, Skin hydration, Stress relief)"
                value={benefitsInput}
                onChange={(e) => {
                  setBenefitsInput(e.target.value);
                }}
                onBlur={() => {
                  const value = benefitsInput
                    .split(",")
                    .map((v) => v.trim())
                    .filter((v) => v.length > 0);
                  handleChange("benefits", value);
                }}
              />
            </div>

            <div>
              <Label>Tags</Label>
              <MultiSelect
                options={TAGS_OPTIONS}
                onValueChange={(values) => {
                  setProduct(prev => ({...prev, tags: values.filter(v => v)}))
                }}
                defaultValue={product.tags}
                placeholder="Select tags for your product"
              />
            </div>

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
              setProductPayload={setProduct}
            />

            {/* Packaging */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={product.packaging.weight || ""}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      packaging: {
                        ...prev.packaging,
                        weight: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="0.5"
                  min={0}
                />
              </div>
              {["length", "width", "height"].map((dim) => (
                <div key={dim} className="space-y-2">
                  <Label>{dim.charAt(0).toUpperCase() + dim.slice(1)} (cm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={product.packaging.dimensions[dim as keyof typeof product.packaging.dimensions] || ""}
                    min={0}
                    onChange={(e) => {
                      const key = dim as keyof typeof product.packaging.dimensions;
                      const parsed = parseFloat(e.target.value) || 0;
                      setProduct((prev) => ({
                        ...prev,
                        packaging: {
                          ...prev.packaging,
                          dimensions: {
                            ...prev.packaging.dimensions,
                            [key]: parsed,
                          },
                        },
                      }));
                    }}
                    placeholder={`${dim === 'length' ? '15' : dim === 'width' ? '10' : '5'}`}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label>Initial Stock Quantity</Label>
                <Input
                  type="number"
                  value={qty || ""}
                  min={0}
                  onChange={(e) => {
                    setQty(parseInt(e.target.value, 10) || 0);
                  }}
                  placeholder="100"
                />
              </div>
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
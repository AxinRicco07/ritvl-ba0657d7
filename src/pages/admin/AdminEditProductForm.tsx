import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft, FlaskConical, X, Plus, ImageIcon, DollarSign, Package, Tag, List, BarChart, Grid, Link, Check, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchPrefix } from "@/utils/fetch";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Default product structure to avoid undefined values
const defaultProduct = {
  name: "",
  description: "",
  shortDescription: "",
  sku: "",
  slug: "",
  price: {
    sp: 1,
    mrp: 1,
    discount: 0
  },
  images: [
    {
      url: "",
      altText: "",
      isPrimary: false
    }
  ],
  inventory: {
    quantity: 1,
    inStock: true
  },
  variants: {
    size: [
      {
        "label": "",
        "priceModifier": 0
      }
    ],
    fragranceStrength: [""]
  },
  details: "",
  ingredients: "",
  howToUse: "",
  benefits: [""],
  ratings: {
    average: 0,
    count: 0
  },
  packaging: {
    weight: 1,
    dimensions: {
      length: 1,
      width: 1,
      height: 1
    }
  },
  inventoryId: "",
  reviews: [],
  tags: [],
  category: {
    name: "",
  },
  relatedProducts: [],
  productType: "salt",
  id: "",
};

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

interface ProductPrice {
  sp: number;
  mrp: number;
  discount: number;
}

interface ProductRatings {
  average: number;
  count:  number;
}

interface ProductCategory {
  name: string;
}

interface ProductInventory {
  quantity: number;
  inStock: boolean;
}

interface ProductPackaging {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

interface Product {
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  slug: string;
  price: ProductPrice;
  images: ProductImage[];
  inventory: ProductInventory;
  variants: {
    size: SizeVariant[];
    fragranceStrength: string[];
  };
  details: string;
  ingredients: string;
  howToUse: string;
  benefits: string[];
  ratings: ProductRatings;
  packaging: ProductPackaging;
  inventoryId: string;
  reviews: any[];
  tags: string[];
  category: ProductCategory;
  relatedProducts: string[];
  productType: string;
  id: string;
}

// ProductImageUploader component
const ProductImageUploader: React.FC<{
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}> = ({ images, onChange }) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onChange([...images, { url: newImageUrl.trim(), altText: "", isPrimary: false }]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative group border rounded-lg overflow-hidden">
            <img
              src={img.url}
              alt={img.altText || `Product image ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
            {img.isPrimary && (
              <Badge className="absolute top-1 left-1 bg-green-600">Primary</Badge>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleSetPrimary(index)}
                title="Set as primary"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Paste image URL here"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddImage();
            }
          }}
          className="flex-1"
        />
        <Button type="button" onClick={handleAddImage} className="flex gap-2 items-center">
          <Plus className="h-4 w-4" /> Add Image
        </Button>
      </div>
    </div>
  );
};

const AdminProductEditForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [product, setProduct] = useState<Product>(defaultProduct as Product);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Fetch product
  const { data: productData, isFetching, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is missing");
      
      const res = await fetch(`${fetchPrefix}/api/products/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    refetchOnWindowFocus: false,
    enabled: !!id, // Only run query if id exists
  });

  useEffect(() => {
    if (productData) {
      // Ensure all number fields have proper values
      const processedData = {
        ...productData,
        price: {
          sp: Number(productData.price?.sp) || 1,
          mrp: Number(productData.price?.mrp) || 1,
          discount: Number(productData.price?.discount) || 0,
        },
        inventory: productData.inventory || {
          quantity: 1,
          inStock: true
        },
        variants: {
          ...productData.variants,
          size: (productData.variants?.size || []).map(size => ({
            label: size.label || "",
            priceModifier: Number(size.priceModifier) || 0,
          })),
        },
        packaging: productData.packaging || {
          weight: 1,
          dimensions: {
            length: 1,
            width: 1,
            height: 1
          }
        },
        // Auto-populate inventoryId with product id
        inventoryId: productData.id || ""
      };
      setProduct(processedData as Product);
    }
  }, [productData]);

  // Update product mutation
  const updateProduct = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      // Check if ID is available
      if (!id) {
        throw new Error("Product ID is missing");
      }

      // Prepare the payload exactly as the API expects
      const payload = {
        name: updatedProduct.name || "",
        description: updatedProduct.description || "",
        shortDescription: updatedProduct.shortDescription || "",
        sku: updatedProduct.sku || "",
        slug: updatedProduct.slug || "",
        price: {
          sp: Number(updatedProduct.price.sp) || 1,
          mrp: Number(updatedProduct.price.mrp) || 1,
          discount: Number(updatedProduct.price.discount) || 0,
        },
        images: updatedProduct.images || [],
        inventory: {
          quantity: Number(updatedProduct.inventory.quantity) || 1,
          inStock: Boolean(updatedProduct.inventory.inStock)
        },
        variants: {
          size: (updatedProduct.variants.size || []).map(size => ({
            label: size.label || "",
            priceModifier: Number(size.priceModifier) || 0,
          })),
          fragranceStrength: updatedProduct.variants.fragranceStrength || [],
        },
        details: updatedProduct.details || "",
        ingredients: updatedProduct.ingredients || "",
        howToUse: updatedProduct.howToUse || "",
        benefits: Array.isArray(updatedProduct.benefits) 
          ? updatedProduct.benefits 
          : [""],
        ratings: {
          average: Number(updatedProduct.ratings.average) || 0,
          count: Number(updatedProduct.ratings.count) || 0,
        },
        packaging: {
          weight: Number(updatedProduct.packaging.weight) || 1,
          dimensions: {
            length: Number(updatedProduct.packaging.dimensions.length) || 1,
            width: Number(updatedProduct.packaging.dimensions.width) || 1,
            height: Number(updatedProduct.packaging.dimensions.height) || 1
          }
        },
        inventoryId: updatedProduct.inventoryId || id // Use the product ID as inventory ID
      };

      const res = await fetch(`${fetchPrefix}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update product");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: `Product "${product.name}" updated successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setProduct((prev) => ({ 
      ...prev, 
      [parent]: {
        ...(prev as any)[parent],
        [field]: value
      }
    }));
  };

  const handlePriceChange = (field: keyof ProductPrice, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setProduct((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [field]: isNaN(numValue) ? 0 : numValue,
      },
    }));
  };

  const handleSizeVariantChange = (index: number, field: keyof SizeVariant, value: string) => {
    const newSizes = [...product.variants.size];
    if (field === "priceModifier") {
      const numValue = value === "" ? 0 : parseFloat(value);
      newSizes[index][field] = isNaN(numValue) ? 0 : numValue;
    } else {
      newSizes[index][field] = value;
    }
    handleNestedChange("variants", "size", newSizes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if ID is available
    if (!id) {
      toast({
        title: "Update Failed",
        description: "Product ID is missing",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to save the changes? By doing so you'll lose the previous data."
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await updateProduct.mutateAsync(product);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Conditional rendering
  if (isFetching) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load product. Please try again.</div>;
  }

  // Navigation tabs
  const tabs = [
    { id: "basic", label: "Basic Info", icon: <Package className="h-4 w-4" /> },
    { id: "pricing", label: "Pricing", icon: <IndianRupee className="h-4 w-4" /> },
    { id: "media", label: "Media", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "details", label: "Details", icon: <List className="h-4 w-4" /> },
    { id: "variants", label: "Variants", icon: <Grid className="h-4 w-4" /> },
    { id: "seo", label: "SEO & Tags", icon: <Tag className="h-4 w-4" /> },
    { id: "inventory", label: "Inventory", icon: <BarChart className="h-4 w-4" /> },
  ];

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

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className={`flex items-center gap-2 rounded-none border-b-2 ${activeTab === tab.id ? "border-primary" : "border-transparent"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-600" />
            {tabs.find(tab => tab.id === activeTab)?.label || "Product Information"}
          </CardTitle>
          <CardDescription>
            {activeTab === "basic" && "Update basic product information"}
            {activeTab === "pricing" && "Manage pricing and inventory details"}
            {activeTab === "media" && "Upload and manage product images"}
            {activeTab === "details" && "Add detailed product descriptions"}
            {activeTab === "variants" && "Configure product variants and options"}
            {activeTab === "seo" && "Manage SEO metadata and tags"}
            {activeTab === "inventory" && "Manage inventory and packaging details"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={product.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={product.sku || ""}
                      onChange={(e) => handleChange("sku", e.target.value)}
                      placeholder="Product SKU"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={product.slug || ""}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      placeholder="product-url-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      value={product.shortDescription || ""}
                      onChange={(e) => handleChange("shortDescription", e.target.value)}
                      placeholder="Brief product description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={product.category.name || ""}
                      onChange={(e) => handleNestedChange("category", "name", e.target.value)}
                      placeholder="Product category"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productType">Product Type *</Label>
                    <Input
                      id="productType"
                      value={product.productType || ""}
                      onChange={(e) => handleChange("productType", e.target.value)}
                      placeholder="e.g., salt, soap, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={product.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Detailed product description"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mrp">MRP (Maximum Retail Price) ₹</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mrp"
                        type="number"
                        step="0.01"
                        value={product.price.mrp || 1}
                        onChange={(e) => handlePriceChange("mrp", e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sp">Selling Price ₹ *</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="sp"
                        type="number"
                        step="0.01"
                        value={product.price.sp || 1}
                        onChange={(e) => handlePriceChange("sp", e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      value={product.price.discount || 0}
                      onChange={(e) => handlePriceChange("discount", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <ProductImageUploader
                    images={product.images}
                    onChange={(images) => handleChange("images", images)}
                  />
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="details">Product Details</Label>
                  <Textarea
                    id="details"
                    value={product.details || ""}
                    onChange={(e) => handleChange("details", e.target.value)}
                    placeholder="Detailed product specifications"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    value={product.ingredients || ""}
                    onChange={(e) => handleChange("ingredients", e.target.value)}
                    placeholder="List of ingredients"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="howToUse">How To Use</Label>
                  <Textarea
                    id="howToUse"
                    value={product.howToUse || ""}
                    onChange={(e) => handleChange("howToUse", e.target.value)}
                    placeholder="Usage instructions"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Variants Tab */}
            {activeTab === "variants" && (
              <div className="space-y-6">
                <div className="space-y-4">
                    <Label>Size Variants</Label>
                    {product.variants.size.map((size, index) => (
                      <div key={index} className="flex gap-4 items-end p-3 border rounded-md">
                        <div className="flex-1 space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={size.label || ""}
                            onChange={(e) => handleSizeVariantChange(index, "label", e.target.value)}
                            placeholder="Size label"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label>Price Modifier ₹</Label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              step="0.01"
                              value={size.priceModifier || 0}
                              onChange={(e) => handleSizeVariantChange(index, "priceModifier", e.target.value)}
                              className="pl-9"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newSizes = product.variants.size.filter((_, i) => i !== index);
                            handleNestedChange("variants", "size", newSizes);
                          }}
                          className="mb-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newSizes = [...product.variants.size, { label: "", priceModifier: 0 }];
                        handleNestedChange("variants", "size", newSizes);
                      }}
                      className="flex gap-2 items-center"
                    >
                      <Plus className="h-4 w-4" /> Add Size Variant
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fragranceStrength">Fragrance Strength Options</Label>
                    <Textarea
                      id="fragranceStrength"
                      placeholder="Comma separated values (e.g., Light, Medium, Strong)"
                      value={Array.isArray(product.variants.fragranceStrength) 
                        ? product.variants.fragranceStrength.join(", ") 
                        : ""}
                      onChange={(e) => {
                        const value = e.target.value.split(",").map((v) => v.trim()).filter(v => v);
                        handleNestedChange("variants", "fragranceStrength", value);
                      }}
                    />
                  </div>
              </div>
            )}

            {/* SEO & Tags Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="benefits">Product Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Comma separated benefits"
                    value={Array.isArray(product.benefits) 
                      ? product.benefits.join(", ") 
                      : ""}
                    onChange={(e) => {
                      const value = e.target.value.split(",").map((v) => v.trim()).filter(v => v);
                      handleChange("benefits", value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Textarea
                    id="tags"
                    placeholder="Comma separated tags for better discoverability"
                    value={Array.isArray(product.tags) 
                      ? product.tags.join(", ") 
                      : ""}
                    onChange={(e) => {
                      const value = e.target.value.split(",").map((v) => v.trim()).filter(v => v);
                      handleChange("tags", value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relatedProducts">Related Products (IDs)</Label>
                  <Textarea
                    id="relatedProducts"
                    placeholder="Comma separated product IDs"
                    value={Array.isArray(product.relatedProducts) 
                      ? product.relatedProducts.join(", ") 
                      : ""}
                    onChange={(e) => {
                      const value = e.target.value.split(",").map((v) => v.trim()).filter(v => v);
                      handleChange("relatedProducts", value);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === "inventory" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Stock Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={product.inventory.quantity || 1}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 1 : parseInt(e.target.value);
                        handleNestedChange("inventory", "quantity", isNaN(value) ? 1 : value);
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="inStock">Stock Status</Label>
                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                      <Switch
                        id="inStock"
                        checked={product.inventory.inStock}
                        onCheckedChange={(checked) => handleNestedChange("inventory", "inStock", checked)}
                      />
                      <Label htmlFor="inStock" className="cursor-pointer">
                        {product.inventory.inStock ? "In Stock" : "Out of Stock"}
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Package Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      value={product.packaging.weight || 1}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 1 : parseFloat(e.target.value);
                        handleNestedChange("packaging", "weight", isNaN(value) ? 1 : value);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inventoryId">Inventory ID</Label>
                    <Input
                      id="inventoryId"
                      value={product.inventoryId || id || ""}
                      readOnly
                      className="bg-muted"
                      placeholder="Auto-populated with product ID"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="length">Package Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      step="0.01"
                      value={product.packaging.dimensions.length || 1}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 1 : parseFloat(e.target.value);
                        handleNestedChange("packaging", "dimensions", {
                          ...product.packaging.dimensions,
                          length: isNaN(value) ? 1 : value
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="width">Package Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.01"
                      value={product.packaging.dimensions.width || 1}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 1 : parseFloat(e.target.value);
                        handleNestedChange("packaging", "dimensions", {
                          ...product.packaging.dimensions,
                          width: isNaN(value) ? 1 : value
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Package Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.01"
                      value={product.packaging.dimensions.height || 1}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 1 : parseFloat(e.target.value);
                        handleNestedChange("packaging", "dimensions", {
                          ...product.packaging.dimensions,
                          height: isNaN(value) ? 1 : value
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Editing: <span className="font-medium">{product.name || "Unnamed Product"}</span>
            </div>
            <div className="flex justify-end space-x-4">
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
                className="bg-blue-600 hover:bg-blue-500 text-white flex gap-2 shadow-md"
                disabled={isLoading || !id}
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminProductEditForm;
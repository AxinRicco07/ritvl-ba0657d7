"use client";

import { useEffect, useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CreateProduct } from "@/types/product";

interface ProductSelect {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

type Props = {
  products: ProductSelect[];
  setProductPayload: React.Dispatch<React.SetStateAction<CreateProduct>>;
};

export default function MultipleProductsSelect({
  products,
  setProductPayload,
}: Props) {
  const [selectedProducts, setSelectedProducts] = useState<ProductSelect[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductToggle = (product: ProductSelect) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearAll = () => {
    setSelectedProducts([]);
  };

  useEffect(() => {
    setProductPayload(prev => {
        return {
            ...prev,
            relatedProducts: selectedProducts.map(p => p.id),
        }
    })
  },[selectedProducts, setProductPayload])

  

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className={`w-full space-x-4 flex justify-between ${isDropdownOpen ? '' : 'items-center'}`}>
      {/* Selected Products Chips */}
      {/* {selectedProducts.length > 0 && ( */}
        <Card className="w-full max-w-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">
                Selected Products ({selectedProducts.length})
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  ₹{totalPrice.toFixed(2)}
                </span>
                <Button type="button" variant="outline" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((product) => (
                <Badge
                  key={product.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {product.name}
                  <Button
                  type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeProduct(product.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      {/* )} */}

      {/* Dropdown Container */}
      <div className="relative w-full">
        {/* Dropdown Trigger */}
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between bg-transparent"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Select products...</span>
          {isDropdownOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <Card className="absolute top-[50%] left-0  right-0 z-10 mt-1 max-h-80 overflow-hidden">
            <CardContent className="p-0">
              {/* Search Input */}
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Product Options List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No products found matching your search.
                  </div>
                ) : (
                  filteredProducts.map((product, index) => {
                    const isSelected = selectedProducts.some(
                      (p) => p.id === product.id
                    );

                    return (
                      <div key={product.id}>
                        <div
                          className={`flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer ₹{
                            isSelected ? "bg-muted/30" : ""
                          }`}
                          
                        >
                          <Checkbox
                            id={`dropdown-₹{product.id}`}
                            checked={isSelected}
                            onClick={() => handleProductToggle(product)}
                          />
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-8 h-8 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {product.category}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0 ml-2">
                                <p className="font-semibold text-sm">
                                  ₹{product.price}
                                </p>
                                {isSelected && (
                                  <Badge variant="default" className="text-xs">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < filteredProducts.length - 1 && <Separator />}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

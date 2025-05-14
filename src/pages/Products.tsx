
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Search, X } from "lucide-react";

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    collections: [] as string[],
    scents: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };
  
  const handleCollectionChange = (collection: string) => {
    setFilters(prev => {
      if (prev.collections.includes(collection)) {
        return {
          ...prev,
          collections: prev.collections.filter(c => c !== collection)
        };
      } else {
        return {
          ...prev,
          collections: [...prev.collections, collection]
        };
      }
    });
  };
  
  const handleScentChange = (scent: string) => {
    setFilters(prev => {
      if (prev.scents.includes(scent)) {
        return {
          ...prev,
          scents: prev.scents.filter(s => s !== scent)
        };
      } else {
        return {
          ...prev,
          scents: [...prev.scents, scent]
        };
      }
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setFilters({
      categories: [],
      collections: [],
      scents: []
    });
    setSearchQuery("");
  };
  
  const filteredProducts = products.filter(product => {
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Filter by collections
    if (filters.collections.length > 0 && !filters.collections.includes(product.collection)) {
      return false;
    }
    
    // Filter by scents
    if (filters.scents.length > 0 && !filters.scents.some(scent => product.scents.includes(scent))) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden w-full flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            {showFilters ? <X className="h-4 w-4" /> : <Package className="h-4 w-4" />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>
        
        {/* Filters sidebar */}
        <aside className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={priceRange}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Collections</h3>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <div key={collection} className="flex items-center gap-2">
                    <Checkbox 
                      id={`collection-${collection}`}
                      checked={filters.collections.includes(collection)}
                      onCheckedChange={() => handleCollectionChange(collection)}
                    />
                    <label 
                      htmlFor={`collection-${collection}`}
                      className="text-sm cursor-pointer"
                    >
                      {collection}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Scents</h3>
              <div className="space-y-2">
                {scents.map((scent) => (
                  <div key={scent} className="flex items-center gap-2">
                    <Checkbox 
                      id={`scent-${scent}`}
                      checked={filters.scents.includes(scent)}
                      onCheckedChange={() => handleScentChange(scent)}
                    />
                    <label 
                      htmlFor={`scent-${scent}`}
                      className="text-sm cursor-pointer"
                    >
                      {scent}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
        
        {/* Products grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h1 className="text-2xl md:text-3xl font-serif">All Products</h1>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end mb-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{product.name}</h3>
          <span className="text-primary">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.colors.map((color, index) => (
              <span 
                key={index} 
                className="w-4 h-4 rounded-full border border-gray-200" 
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <Button size="sm">Buy</Button>
        </div>
      </div>
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  category: string;
  collection: string;
  scents: string[];
}

const categories = ["Bath Salt", "Sea Salt", "Himalayan Salt", "Epsom Salt", "Salt Scrub"];
const collections = ["Relaxation", "Energizing", "Detox", "Aromatherapy", "Gift Sets"];
const scents = ["Lavender", "Rose", "Eucalyptus", "Mint", "Citrus", "Vanilla", "Unscented"];

const products: Product[] = [
  {
    id: 1,
    name: "Dreamer's Galaxy Bath Salt",
    price: 25,
    image: "/placeholder.svg",
    colors: ["#E8D5B5", "#8AACB9", "#E2C1B3"],
    category: "Bath Salt",
    collection: "Relaxation",
    scents: ["Lavender", "Vanilla"]
  },
  {
    id: 2,
    name: "Rose's Mist Bath Salt",
    price: 34,
    image: "/placeholder.svg",
    colors: ["#E7A4B7", "#EDE3DE", "#CEA997"],
    category: "Bath Salt",
    collection: "Aromatherapy",
    scents: ["Rose"]
  },
  {
    id: 3,
    name: "Large Mystic Palm Salt",
    price: 33,
    image: "/placeholder.svg",
    colors: ["#99B898", "#FECEA8", "#FF847C"],
    category: "Himalayan Salt",
    collection: "Detox",
    scents: ["Mint", "Eucalyptus"]
  },
  {
    id: 4,
    name: "Pair Serenity Salt",
    price: 30,
    image: "/placeholder.svg",
    colors: ["#2A363B", "#E8B4BC", "#99B898"],
    category: "Epsom Salt",
    collection: "Relaxation",
    scents: ["Lavender"]
  },
  {
    id: 5,
    name: "Himalayan Pink Salt",
    price: 18,
    image: "/placeholder.svg",
    colors: ["#E8B4BC", "#F4DFDF", "#EFC7C7"],
    category: "Himalayan Salt",
    collection: "Gift Sets",
    scents: ["Unscented"]
  },
  {
    id: 6,
    name: "Dead Sea Salt",
    price: 22,
    image: "/placeholder.svg",
    colors: ["#8AACB9", "#A9C6CF", "#C1DAE3"],
    category: "Sea Salt",
    collection: "Detox",
    scents: ["Unscented"]
  },
  {
    id: 7,
    name: "Citrus Burst Salt Scrub",
    price: 28,
    image: "/placeholder.svg",
    colors: ["#F7CE5B", "#F7A072", "#ED6A5A"],
    category: "Salt Scrub",
    collection: "Energizing",
    scents: ["Citrus"]
  },
  {
    id: 8,
    name: "Eucalyptus Dream Bath",
    price: 32,
    image: "/placeholder.svg",
    colors: ["#99B898", "#A8E0CC", "#C6F1D6"],
    category: "Bath Salt",
    collection: "Aromatherapy",
    scents: ["Eucalyptus", "Mint"]
  },
  {
    id: 9,
    name: "Luxury Gift Set",
    price: 65,
    image: "/placeholder.svg",
    colors: ["#2A363B", "#E8B4BC", "#99B898", "#FECEA8"],
    category: "Bath Salt",
    collection: "Gift Sets",
    scents: ["Lavender", "Rose", "Eucalyptus"]
  }
];

export default Products;

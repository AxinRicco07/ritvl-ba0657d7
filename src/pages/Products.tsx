
import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, X, ChevronDown, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Mock product data
const allProducts = [
  {
    id: "1",
    name: "Relaxing Lavender Bath Salt",
    price: 24.99,
    image: "/placeholder.svg",
    category: "bath-salts",
    benefits: ["relaxation", "sleep"],
    rating: 4.8,
    reviewCount: 126,
    featured: true,
    new: false,
    fragranceIntensity: "medium",
    isGiftSet: false
  },
  {
    id: "2",
    name: "Energizing Citrus Bath Bomb",
    price: 8.99,
    image: "/placeholder.svg",
    category: "bath-bombs",
    benefits: ["energy", "mood"],
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    new: true,
    fragranceIntensity: "strong",
    isGiftSet: false
  },
  {
    id: "3",
    name: "Soothing Eucalyptus Soak",
    price: 18.50,
    image: "/placeholder.svg",
    category: "bath-salts",
    benefits: ["respiratory", "muscle-relief"],
    rating: 4.7,
    reviewCount: 74,
    featured: true,
    new: false,
    fragranceIntensity: "strong",
    isGiftSet: false
  },
  {
    id: "4",
    name: "Rose Petal Mineral Bath",
    price: 22.99,
    image: "/placeholder.svg",
    category: "bath-salts",
    benefits: ["skin-health", "relaxation"],
    rating: 4.5,
    reviewCount: 63,
    featured: false,
    new: false,
    fragranceIntensity: "light",
    isGiftSet: false
  },
  {
    id: "5",
    name: "Dead Sea Mud Mask",
    price: 15.99,
    image: "/placeholder.svg",
    category: "body-care",
    benefits: ["detox", "skin-health"],
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    new: false,
    fragranceIntensity: "light",
    isGiftSet: false
  },
  {
    id: "6",
    name: "Himalayan Pink Salt Scrub",
    price: 17.50,
    image: "/placeholder.svg",
    category: "body-care",
    benefits: ["exfoliation", "skin-health"],
    rating: 4.7,
    reviewCount: 85,
    featured: false,
    new: true,
    fragranceIntensity: "medium",
    isGiftSet: false
  },
  {
    id: "7",
    name: "Relaxation Gift Set",
    price: 49.99,
    image: "/placeholder.svg",
    category: "gift-sets",
    benefits: ["relaxation", "sleep", "stress-relief"],
    rating: 4.9,
    reviewCount: 57,
    featured: true,
    new: false,
    fragranceIntensity: "medium",
    isGiftSet: true
  },
  {
    id: "8",
    name: "Muscle Recovery Soak",
    price: 28.99,
    image: "/placeholder.svg",
    category: "bath-salts",
    benefits: ["muscle-relief", "recovery"],
    rating: 4.8,
    reviewCount: 94,
    featured: false,
    new: false,
    fragranceIntensity: "strong",
    isGiftSet: false
  }
];

const categories = [
  { id: "bath-salts", label: "Bath Salts" },
  { id: "bath-bombs", label: "Bath Bombs" },
  { id: "body-care", label: "Body Care" },
  { id: "gift-sets", label: "Gift Sets" }
];

const benefits = [
  { id: "relaxation", label: "Relaxation" },
  { id: "sleep", label: "Sleep Support" },
  { id: "muscle-relief", label: "Muscle Relief" },
  { id: "energy", label: "Energy & Focus" },
  { id: "skin-health", label: "Skin Health" },
  { id: "respiratory", label: "Respiratory Support" },
  { id: "mood", label: "Mood Enhancement" },
  { id: "detox", label: "Detoxification" },
  { id: "recovery", label: "Recovery" },
  { id: "stress-relief", label: "Stress Relief" }
];

const fragranceIntensities = [
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "strong", label: "Strong" }
];

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedIntensities, setSelectedIntensities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const toggleBenefit = (benefitId: string) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitId) 
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };
  
  const toggleIntensity = (intensityId: string) => {
    setSelectedIntensities(prev => 
      prev.includes(intensityId) 
        ? prev.filter(id => id !== intensityId)
        : [...prev, intensityId]
    );
  };
  
  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    // Apply category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Apply benefits filter
    if (selectedBenefits.length > 0 && !product.benefits.some(benefit => selectedBenefits.includes(benefit))) {
      return false;
    }
    
    // Apply fragrance intensity filter
    if (selectedIntensities.length > 0 && !selectedIntensities.includes(product.fragranceIntensity)) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return Number(b.new) - Number(a.new);
      default: // featured
        return Number(b.featured) - Number(a.featured);
    }
  });
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBenefits([]);
    setSelectedIntensities([]);
  };
  
  const hasActiveFilters = selectedCategories.length > 0 || selectedBenefits.length > 0 || selectedIntensities.length > 0;
  
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-4">Products</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button 
            onClick={toggleMobileFilters} 
            variant="outline" 
            className="lg:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters {hasActiveFilters && `(${selectedCategories.length + selectedBenefits.length + selectedIntensities.length})`}
          </Button>
          
          <div className="flex items-center ml-auto">
            <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
            <select 
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-input rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Mobile filters modal */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={toggleMobileFilters}
            ></div>
            
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4 pb-4 border-b border-border">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  type="button"
                  className="text-muted-foreground"
                  onClick={toggleMobileFilters}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              
              {hasActiveFilters && (
                <div className="px-4 py-4 border-b border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="w-full justify-center"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
              
              <div className="space-y-6 p-4">
                <FilterSection title="Product Type">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label 
                        htmlFor={`mobile-category-${category.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                <FilterSection title="Benefits">
                  {benefits.map(benefit => (
                    <div key={benefit.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-benefit-${benefit.id}`}
                        checked={selectedBenefits.includes(benefit.id)}
                        onCheckedChange={() => toggleBenefit(benefit.id)}
                      />
                      <label 
                        htmlFor={`mobile-benefit-${benefit.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {benefit.label}
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                <FilterSection title="Fragrance Intensity">
                  {fragranceIntensities.map(intensity => (
                    <div key={intensity.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-intensity-${intensity.id}`}
                        checked={selectedIntensities.includes(intensity.id)}
                        onCheckedChange={() => toggleIntensity(intensity.id)}
                      />
                      <label 
                        htmlFor={`mobile-intensity-${intensity.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {intensity.label}
                      </label>
                    </div>
                  ))}
                </FilterSection>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop filters */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 space-y-6">
            {hasActiveFilters && (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="w-full justify-center"
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            <FilterSection title="Product Type">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </FilterSection>
            
            <FilterSection title="Benefits">
              {benefits.map(benefit => (
                <div key={benefit.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`benefit-${benefit.id}`}
                    checked={selectedBenefits.includes(benefit.id)}
                    onCheckedChange={() => toggleBenefit(benefit.id)}
                  />
                  <label 
                    htmlFor={`benefit-${benefit.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {benefit.label}
                  </label>
                </div>
              ))}
            </FilterSection>
            
            <FilterSection title="Fragrance Intensity">
              {fragranceIntensities.map(intensity => (
                <div key={intensity.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`intensity-${intensity.id}`}
                    checked={selectedIntensities.includes(intensity.id)}
                    onCheckedChange={() => toggleIntensity(intensity.id)}
                  />
                  <label 
                    htmlFor={`intensity-${intensity.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {intensity.label}
                  </label>
                </div>
              ))}
            </FilterSection>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="mt-6 lg:mt-0 lg:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FilterSection = ({ 
  title, 
  children 
}: { 
  title: string, 
  children: React.ReactNode 
}) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="border-b border-border pb-6">
      <button 
        className="flex w-full items-center justify-between text-sm font-medium mb-2"
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        <ChevronDown 
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {expanded && (
        <div className="space-y-4 pt-2">
          {children}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }: { product: typeof allProducts[number] }) => {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-secondary/30 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {product.new && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium hover:underline">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1 mt-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <Button size="sm" variant="outline" className="gap-1">
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

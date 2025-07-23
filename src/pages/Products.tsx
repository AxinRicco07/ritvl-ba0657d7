import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, X, ChevronDown, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { formatINRWithPaisa } from "@/utils/currency";
import { PublicProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";

// Mock product data with paisa values (1 rupee = 100 paisa)
const allProducts = [
  {
    id: "1",
    name: "Himalayan Pink Salt",
    price: 209900, // ₹2099.00 in paisa
    image: "/placeholder.svg",
    category: "salts-types",
    benefits: ["relaxation", "sleep"],
    rating: 4.8,
    reviewCount: 126,
    featured: true,
    new: false,
    fragranceIntensity: "medium",
    isGiftSet: false,
  },
  {
    id: "2",
    name: "Mogra Bath Bomb",
    price: 74900,
    image: "/placeholder.svg",
    category: "mogra",
    benefits: ["energy", "mood"],
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    new: true,
    fragranceIntensity: "strong",
    isGiftSet: false,
  },
  {
    id: "3",
    name: "Lavender Bath Salt",
    price: 155000,
    image: "/placeholder.svg",
    category: "lavender",
    benefits: ["respiratory", "muscle-relief"],
    rating: 4.7,
    reviewCount: 74,
    featured: true,
    new: false,
    fragranceIntensity: "strong",
    isGiftSet: false,
  },
  {
    id: "4",
    name: "Rose Petal Salt",
    price: 192000,
    image: "/placeholder.svg",
    category: "rose",
    benefits: ["skin-health", "relaxation"],
    rating: 4.5,
    reviewCount: 63,
    featured: false,
    new: false,
    fragranceIntensity: "light",
    isGiftSet: false,
  },
  {
    id: "5",
    name: "Jasmine Body Scrub",
    price: 133900,
    image: "/placeholder.svg",
    category: "jasmine",
    benefits: ["detox", "skin-health"],
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    new: false,
    fragranceIntensity: "light",
    isGiftSet: false,
  },
  {
    id: "6",
    name: "Lemon Grass Salt",
    price: 145800,
    image: "/placeholder.svg",
    category: "lemon-grass",
    benefits: ["exfoliation", "skin-health"],
    rating: 4.7,
    reviewCount: 85,
    featured: false,
    new: true,
    fragranceIntensity: "medium",
    isGiftSet: false,
  },
  {
    id: "7",
    name: "Cinnamon Salt Mix",
    price: 416600,
    image: "/placeholder.svg",
    category: "cinnamon",
    benefits: ["relaxation", "sleep", "stress-relief"],
    rating: 4.9,
    reviewCount: 57,
    featured: true,
    new: false,
    fragranceIntensity: "medium",
    isGiftSet: true,
  },
  {
    id: "8",
    name: "Ocean Blue Salt",
    price: 241500,
    image: "/placeholder.svg",
    category: "ocean-blue",
    benefits: ["muscle-relief", "recovery"],
    rating: 4.8,
    reviewCount: 94,
    featured: false,
    new: false,
    fragranceIntensity: "strong",
    isGiftSet: false,
  },
  {
    id: "9",
    name: "Geranium Bath Salt",
    price: 187500,
    image: "/placeholder.svg",
    category: "geranium",
    benefits: ["mood", "stress-relief"],
    rating: 4.6,
    reviewCount: 78,
    featured: false,
    new: true,
    fragranceIntensity: "medium",
    isGiftSet: false,
  },
];

const categories = [
  { id: "salts-types", label: "Salts Types" },
  { id: "mogra", label: "Mogra" },
  { id: "lavender", label: "Lavender" },
  { id: "rose", label: "Rose" },
  { id: "jasmine", label: "Jasmine" },
  { id: "lemon-grass", label: "Lemon Grass" },
  { id: "cinnamon", label: "Cinnamon" },
  { id: "ocean-blue", label: "Ocean Blue" },
  { id: "geranium", label: "Geranium" },
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
  { id: "stress-relief", label: "Stress Relief" },
];

const fragranceIntensities = [
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "strong", label: "Strong" },
];

const productTypes = [
  "salt",
  "mogra",
  "lavender",
  "rose",
  "jasmine",
  "lemon grass",
  "cinnamon",
  "oceanblue",
  "geranium",
] as const;

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    (typeof productTypes)[number][]
  >([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedIntensities, setSelectedIntensities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");

  const toggleMobileFilters = () => setMobileFiltersOpen(!mobileFiltersOpen);
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBenefits([]);
    setSelectedIntensities([]);
  };
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBenefits.length > 0 ||
    selectedIntensities.length > 0;

  const toggle = (
    id: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) =>
    setter((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<PublicProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${fetchPrefix}/api/products`, {
        method: "GET"
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const filteredProducts = products.filter((product) => {
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.productType)
    )
      return false;

    if (
      selectedBenefits.length > 0 &&
      !product.benefits.some((b) => selectedBenefits.includes(b))
    )
      return false;

    // if (
    //   selectedIntensities.length > 0 &&
    //   !selectedIntensities.includes(product.fragranceIntensity)
    // )
    //   return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price.sp - b.price.sp;
      case "price-high":
        return b.price.sp - a.price.sp;
      case "rating":
        return b.ratings.average - a.ratings.average;
      case "newest":
        return Number(b.tags.includes("new")) - Number(a.tags.includes("new"));
      default:
        return (
          Number(b.tags.includes("featured")) -
          Number(a.tags.includes("featured"))
        );
    }
  });

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
            Filters
            {hasActiveFilters &&
              ` (${
                selectedCategories.length +
                selectedBenefits.length +
                selectedIntensities.length
              })`}
          </Button>

          <div className="flex items-center ml-auto">
            <label htmlFor="sort" className="text-sm mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-input rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
        {/* Filters */}
        {mobileFiltersOpen && (
          <MobileFilters
            onClose={toggleMobileFilters}
            toggleCategory={(id) =>
              toggle(id, selectedCategories, setSelectedCategories)
            }
            toggleBenefit={(id) =>
              toggle(id, selectedBenefits, setSelectedBenefits)
            }
            toggleIntensity={(id) =>
              toggle(id, selectedIntensities, setSelectedIntensities)
            }
            selectedCategories={selectedCategories}
            selectedBenefits={selectedBenefits}
            selectedIntensities={selectedIntensities}
            clearAllFilters={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        <div className="hidden lg:block lg:col-span-3">
          <SidebarFilters
            toggleCategory={(id) =>
              toggle(id, selectedCategories, setSelectedCategories)
            }
            toggleBenefit={(id) =>
              toggle(id, selectedBenefits, setSelectedBenefits)
            }
            toggleIntensity={(id) =>
              toggle(id, selectedIntensities, setSelectedIntensities)
            }
            selectedCategories={selectedCategories}
            selectedBenefits={selectedBenefits}
            selectedIntensities={selectedIntensities}
            clearAllFilters={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="mt-6 lg:mt-0 lg:col-span-9">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading products.</div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters.
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

const SidebarFilters = ({
  toggleCategory,
  toggleBenefit,
  toggleIntensity,
  selectedCategories,
  selectedBenefits,
  selectedIntensities,
  clearAllFilters,
  hasActiveFilters,
}: any) => (
  <div className="sticky top-20 space-y-6">
    {hasActiveFilters && (
      <Button
        variant="outline"
        size="sm"
        onClick={clearAllFilters}
        className="w-full justify-center text-primary border-primary hover:bg-primary/5"
      >
        Clear all filters
      </Button>
    )}

    <FilterGroup
      title="Product Type"
      options={productTypes.map((pt, i) => ({ id: pt, label: pt }))}
      selected={selectedCategories}
      toggle={toggleCategory}
    />
    {/* <FilterGroup
      title="Benefits"
      options={benefits}
      selected={selectedBenefits}
      toggle={toggleBenefit}
    />
    <FilterGroup
      title="Fragrance Intensity"
      options={fragranceIntensities}
      selected={selectedIntensities}
      toggle={toggleIntensity}
    /> */}
  </div>
);

const MobileFilters = ({
  onClose,
  toggleCategory,
  toggleBenefit,
  toggleIntensity,
  selectedCategories,
  selectedBenefits,
  selectedIntensities,
  clearAllFilters,
  hasActiveFilters,
}: any) => (
  <div className="fixed inset-0 z-40 flex lg:hidden">
    <div
      className="fixed inset-0 bg-black bg-opacity-25"
      onClick={onClose}
    ></div>
    <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
      <div className="flex items-center justify-between px-4 pb-4 border-b border-border">
        <h2 className="text-lg font-medium">Filters</h2>
        <button type="button" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {hasActiveFilters && (
        <div className="px-4 py-4 border-b border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full justify-center text-primary border-primary hover:bg-primary/5"
          >
            Clear all filters
          </Button>
        </div>
      )}

      <div className="space-y-6 p-4">
        <FilterGroup
          title="Product Type"
          options={productTypes.map((pt, i) => ({ id: pt, label: pt }))}
          selected={selectedCategories}
          toggle={toggleCategory}
        />
        {/* <FilterGroup
          title="Benefits"
          options={benefits}
          selected={selectedBenefits}
          toggle={toggleBenefit}
        />
        <FilterGroup
          title="Fragrance Intensity"
          options={fragranceIntensities}
          selected={selectedIntensities}
          toggle={toggleIntensity} 
        />*/}
      </div>
    </div>
  </div>
);

const FilterGroup = ({
  title,
  options,
  selected,
  toggle,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  toggle: (id: string) => void;
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
          className={`h-4 w-4 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="space-y-4 pt-2">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center space-x-2">
              <Checkbox
                id={opt.id}
                checked={selected.includes(opt.id)}
                onCheckedChange={() => toggle(opt.id)}
              />
              <label htmlFor={opt.id} className="text-sm">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }: { product: PublicProduct }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images.find((img) => img.isPrimary)?.url || "/fallback.jpg",
      sku: product.sku,
    });
  };

  const primaryImage = product.images.find((img) => img.isPrimary)?.url || "/fallback.jpg";
  const averageRating = Math.floor(product.ratings?.average || 0);

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="product-card bg-white rounded-lg overflow-hidden border border-border hover:border-primary/30 shadow-sm">
        <div className="aspect-square bg-secondary/30 relative overflow-hidden">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.tags?.includes("new") && (
            <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium hover:underline hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < averageRating ? "fill-primary text-primary" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.ratings?.count || 0})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {formatINRWithPaisa(product.price?.sp * 100 || 0)}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-primary border-primary hover:bg-primary/5"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

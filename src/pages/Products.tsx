import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filter, X, ChevronDown, ShoppingCart, Star, Share2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { formatINRWithPaisa } from "@/utils/currency";
import { PublicProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";
import { toast } from "@/components/ui/use-toast";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize sort and search from URL query and update when it changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sort = params.get("sort");
    const q = params.get("q")?.trim() || "";
    const allowed = ["featured", "price-low", "price-high", "rating", "newest"];
    if (sort && allowed.includes(sort)) {
      setSortOption(sort);
    }
    setSearchQuery(q);
  }, [location.search]);

  // Keep the URL in sync when sort changes via dropdown (preserve existing q)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (sortOption) {
      params.set("sort", sortOption);
      navigate({ pathname: "/products", search: params.toString() }, { replace: true });
    }
  }, [sortOption]);

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

    // Text search across product name (case-insensitive)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (product.name || "").toLowerCase();
      if (!name.includes(q)) return false;
    }

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

const ShareButton = ({ productId, productName }: { productId: string; productName: string }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const productUrl = `${window.location.origin}/product/${productId}`;
  const shareText = `Check out this amazing product: ${productName}`;
  
  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(productUrl);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    setShowShareMenu(false);
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`;
    // Redirect in the same tab for immediate handoff
    window.location.href = whatsappUrl;
    setShowShareMenu(false);
  };

  const handleInstagramShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Best-effort: try to open Instagram app, then fall back to web DM compose
    const instagramDeepLink = 'instagram://app';
    const webFallback = 'https://www.instagram.com/direct/new/';

    // Copy link so user can paste inside Instagram
    try { navigator.clipboard?.writeText(productUrl); } catch {}

    // Attempt deep link first
    const timer = setTimeout(() => {
      // Fallback to web if app doesn't open
      window.location.href = webFallback;
    }, 800);

    // Some browsers may block or immediately navigate; this is a best-effort
    window.location.href = instagramDeepLink;
    // Clear timeout if navigation happens successfully (cannot detect reliably, but harmless)
    setTimeout(() => clearTimeout(timer), 2000);

    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0 hover:bg-secondary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowShareMenu(!showShareMenu);
        }}
      >
        <Share2 className="h-4 w-4" />
      </Button>
      
      {showShareMenu && (
        <div className="absolute right-0 top-9 z-50 bg-white border border-border rounded-md shadow-lg p-2 min-w-[160px]">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-secondary rounded transition-colors"
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-secondary rounded transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <button
            onClick={handleInstagramShare}
            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-secondary rounded transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </button>
        </div>
      )}
      
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowShareMenu(false);
          }}
        />
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
      <div className="product-card bg-white rounded-lg border border-border hover:border-primary/30 shadow-sm">
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
            <div className="flex items-center gap-2">
              <ShareButton productId={product.id} productName={product.name} />
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
      </div>
    </Link>
  );
};

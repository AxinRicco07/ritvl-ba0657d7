import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Bath,
  CheckCircle,
  FlaskConical,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SaltSparkle from "@/components/SaltSparkle";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import ethics from "../assets/7942.jpg";
import { formatINRWithPaisa } from "@/utils/currency";
import { useQuery } from "@tanstack/react-query";
import { fetchPrefix } from "@/utils/fetch";
import { HomeProduct } from "@/types/product";
import HeroCarousel from "@/components/HeroCarousel";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";
import FullPageBannerCarousel from "@/components/home/FullPageBannerCarousel";

const fetchProductsData = async (): Promise<{
  featuredProducts: HomeProduct[];
  bestSellingProducts: HomeProduct[];
  banners: { imageUrl: string; redirectUrl: string; imageOrder: number }[];
}> => {
  const res = await fetch(`${fetchPrefix}/api/home`, {
    method: "GET",
  });
  if (!res.ok) {
    console.log("Fetch error");
    throw new Error("Failed to fetch home page data");
  }
  return res.json();
};

const ListProducts = function ({ products }: { products: HomeProduct[] }) {
  return products.map((product, idx) => (
    <Link
      key={product.productId}
      to={`/product/${product.productId}`}
      className={`group animate-fade-in`}
      style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
    >
      <Card className="product-card border-none shadow-md hover:shadow-lg transition-all duration-300">
        <div className="overflow-hidden">
          <AspectRatio
            ratio={1 / 1}
            className="zoom-hover p-2 bg-slate-100 rounded-t-md"
          >
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full rounded-md h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h3 className="font-medium truncate text-base md:text-lg md:max-w-[90%]">
              {product.name}
            </h3>
            <span className="text-primary font-medium text-xl md:text-2xl whitespace-nowrap">
              {formatINRWithPaisa(product.price.sp * 100)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mt-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.ratings.average)
                      ? "fill-primary text-primary"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.ratings.count})
              </span>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 hidden md:block hover:bg-blue-500 sparkle-button text-xs sm:text-sm"
            >
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  ));
};

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<HomeProduct[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: fetchProductsData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const { bestSellingProducts, featuredProducts, banners } = data || {
    bestSellingProducts: [],
    featuredProducts: [],
  };

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data) {
      const { bestSellingProducts, featuredProducts } = data;
      setHeroImages([
        featuredProducts[0],
        bestSellingProducts[0],
        bestSellingProducts[1] || bestSellingProducts[0],
      ]);
    }
  }, [data]);

  if (isLoading) return <HomePageSkeleton />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with Auto-Sliding */}
      <section className="relative md:min-h-[80vh] max-h-[80vh] overflow-hidden flex items-center bg-gradient-to-br from-blue-50 to-blue-100">
        {!banners || banners.length === 0 ? (
          <div className="container max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
            <div
              className={`relative z-10 ${
                isVisible ? "animate-slide-in-left" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative inline-block">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-bold text-blue-900">
                  {["Natural Healing.", "Pure Joy.", "Everyday Luxury."].map(
                    (text, index) => (
                      <span key={index} className="block text-reveal">
                        <span
                          className="relative inline-block"
                          style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                        >
                          {text}
                          <SaltSparkle />
                        </span>
                      </span>
                    )
                  )}
                </h1>
              </div>

              <p
                className="mt-6 text-xl text-blue-800/90 max-w-xl animate-fade-in font-serif italic"
                style={{ animationDelay: "0.9s" }}
              >
                Experience the therapeutic benefits of our premium bath
                salts—100% natural and crafted for your wellbeing.
              </p>

              <div className="mt-8 flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-blue-700 hover:bg-blue-600 sparkle-button animate-fade-in transition-all shadow-lg"
                  style={{ animationDelay: "1.1s" }}
                >
                  <Link to="/products">SHOP NOW</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-blue-700 text-blue-700 hover:bg-blue-50/50 animate-fade-in shadow"
                  style={{ animationDelay: "1.3s" }}
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            <HeroCarousel heroImages={heroImages} />
          </div>
        ) : (
          <FullPageBannerCarousel
            banners={banners
              .sort((a, b) => a.imageOrder - b.imageOrder)
              .map((b) => ({
                image: b.imageUrl,
                redirectUrl: b.redirectUrl,
              }))}
          />
        )}
      </section>

      {/* Featured Products - First Row */}
      <section className="py-4 px-4 md:py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="md:container max-w-7xl md:mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display animate-slide-in-left text-blue-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors animate-slide-in-right text-blue-700"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ListProducts products={featuredProducts} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Star className="w-12 h-12 mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold mb-2">
                No featured products available
              </h3>
              <p className="mb-4">
                Please check back later for our latest featured products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products - Second Row */}
      <section className="py-4 px-4 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="md:container max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display animate-slide-in-left text-blue-900">
              Bestselling Products
            </h2>
            <Link
              to="/products"
              className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors animate-slide-in-right text-blue-700"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {bestSellingProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ListProducts products={bestSellingProducts} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Star className="w-12 h-12 mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold mb-2">
                No best selling products available
              </h3>
              <p className="mb-4">
                Please check back later for our latest best selling products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us - Updated Section */}
      <section className="py-4 px-4 md:py-16 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display text-center mb-4 animate-slide-in-bottom text-blue-900">
            Why <strong className="text-blue-700">Epsom</strong> Salt?
          </h2>
          <p
            className="text-center text-blue-800/90 max-w-2xl mx-auto mb-12 animate-slide-in-bottom font-serif text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Because self-care should be simple, natural, and effective. Epsom
            salt is packed with magnesium – the mineral your body loves for
            relaxation, skin glow, and stress relief. Melt away stress in a warm
            soak Rejuvenate tired muscles after a long day Exfoliate & refresh
            your skin naturally Bring spa-like calm right into your home With
            every soak, you’re not just relaxing – you’re recharging mind, body
            & soul.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`animate-zoom-in bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all`}
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <FeatureCard
                  title={
                    index === 0
                      ? "HIGH MAGNESIUM CONTENT"
                      : index === 1
                      ? "PHARMACEUTICAL GRADE"
                      : index === 2
                      ? "THERAPEUTIC BENEFITS"
                      : "MULTI-PURPOSE USE"
                  }
                  description={
                    index === 0
                      ? "Rich in magnesium sulfate to replenish mineral levels and support cellular function."
                      : index === 1
                      ? "Medical-grade purity with no additives or synthetic enhancements."
                      : index === 2
                      ? "Effective for muscle relief, stress reduction, and detoxification."
                      : "Perfect for baths, compresses, skincare, and gardening applications"
                  }
                >
                  {index === 0 ? (
                    <FlaskConical className="w-10 h-10 mb-4 text-blue-600 animate-pulse" />
                  ) : index === 1 ? (
                    <CheckCircle className="w-8 h-8 mb-4 text-blue-600 animate-bounce" />
                  ) : index === 2 ? (
                    <Bath className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />
                  ) : (
                    <Sparkles className="w-8 h-8 mb-4 text-blue-600 animate-bounce" />
                  )}
                </FeatureCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-4 px-4 md:py-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display text-center mb-12 animate-fade-in text-blue-900">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-sm border border-blue-100 animate-slide-in-bottom`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } ${i === 2 ? "animate-bounce" : ""}`}
                    />
                  ))}
                </div>
                <p className="italic text-blue-800/90 mb-6 font-serif">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-blue-700/80">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Compone
const FeatureCard = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      {children}
      <h3 className="font-medium mb-2 text-blue-900">{title}</h3>
      <p className="text-blue-800/80 text-sm">{description}</p>
    </div>
  );
};

interface Category {
  id: number;
  name: string;
  items: number;
  image: string;
  link: string;
}

interface Testimonial {
  name: string;
  title: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    title: "Professional Chef",
    comment:
      "The Himalayan salt flakes that has completely transformed my cooking. The flavor is unmatched, and I love knowing it's ethically sourced.",
    rating: 5,
  },
  {
    name: "Michael T.",
    title: "Home Cook",
    comment:
      "The exotic blends are incredible - perfectly balanced and so unique! I've ordered their salt sampler box exclusively ever since.",
    rating: 5,
  },
  {
    name: "Emma R.",
    title: "Loyal Customer",
    comment:
      "I received a gift set for my own spa-day and the sea salt soothing bath reduced tension. The packaging is beautiful, and the quality is exceptional.",
    rating: 5,
  },
];

export default Index;

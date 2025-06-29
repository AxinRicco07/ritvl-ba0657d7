import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HomeProduct } from "@/types/product";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import SaltSparkle from "./SaltSparkle";

const HeroCarousel = ({ heroImages }: { heroImages: HomeProduct[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    // Register listener
    api.on("select", onSelect);

    // Set initial index
    onSelect();

    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <Carousel
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ loop: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroImages.map((p, index) => (
            <CarouselItem key={index} className="relative aspect-[4/3]">
              <img
                src={p.images.find((i) => i.isPrimary)?.url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex flex-col items-center justify-end p-6 text-center">
                <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-3 py-1 mb-2 rounded-md">
                  {index === 0 ? "Featured" : "Bestseller"}
                </span>
                <h3 className="text-white text-xl font-bold">{p.name}</h3>
                <Button variant="secondary" size="sm" className="mt-2">
                  <Link to={`/product/${p.productId}`}>View Details</Link>
                </Button>
                <SaltSparkle />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedIndex(i);
              api?.scrollTo(i);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              selectedIndex === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

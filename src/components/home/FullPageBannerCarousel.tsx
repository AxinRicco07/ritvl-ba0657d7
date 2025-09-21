"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // adjust path as needed
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define props interface
interface BannerSlide {
  image: string; // image URL or path
  redirectUrl: string; // URL to redirect on "Shop Now"
}

interface FullPageBannerCarouselProps {
  banners: BannerSlide[];
  className?: string; // optional for extra styling
}

const FullPageBannerCarousel: React.FC<FullPageBannerCarouselProps> = ({
  banners,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="h-full relative">
              <div className="w-full h-full relative overflow-hidden">
                {/* Full-bleed background image */}
                <img
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  style={{
                    // position: "absolute",
                    // top: 0,
                    // left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                  // loading={index === 0 ? "eager" : "lazy"} // prioritize first image
                  className="brightness-90" // optional: improve text contrast
                />
                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 z-10">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                    Discover Our Collection
                  </h2>
                  <p className="text-lg md:text-xl mb-8 max-w-lg drop-shadow-md">
                    Elevate your style with our latest arrivals.
                  </p>
                  <Link to={banner.redirectUrl} className="z-20">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-full drop-shadow-lg"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="left-4 text-white bg-black/30 hover:bg-black/50 z-30" />
        <CarouselNext className="right-4 text-white bg-black/30 hover:bg-black/50 z-30" />
      </Carousel>
    </div>
  );
};

export default FullPageBannerCarousel;
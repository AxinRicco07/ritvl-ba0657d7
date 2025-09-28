"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

// Props
interface BannerSlide {
  image: string; // Cloudinary base URL (must include `/upload/`)
  redirectUrl: string;
}

interface FullPageBannerCarouselProps {
  banners: BannerSlide[];
  className?: string;
  aspectRatio?: number; // optional, default 2 (width:height = 2:1)
}

// breakpoints (widths) — height is calculated based on ratio
const widths = [640, 1024, 1440, 1920, 2400];

// const breakpoints = [
//   { w: 640, h: 320 },
//   { w: 1024, h: 512 },
//   { w: 1440, h: 720 },
//   { w: 1920, h: 960 },
//   { w: 2400, h: 1200 },
// ];
// const breakpoints = [
//   { w: 640, hRatio: 0.7 }, // Mobile: taller, h = 0.7 * w
//   { w: 1024, hRatio: 0.4 }, // Tablet
//   { w: 1440, hRatio: 0.35 }, // Small desktop
//   { w: 1920, hRatio: 0.33 }, // Large desktop
//   { w: 2400, hRatio: 0.33 }, // XL desktop
// ];

const breakpoints = [
  { w: 360, hRatio: 0.9 }, // very small mobile (e.g., iPhone SE, Galaxy S)
  { w: 390, hRatio: 0.75 }, // small mobile (e.g., iPhone 13, 14)
  { w: 414, hRatio: 0.7 }, // larger mobile (e.g., iPhone 14 Plus)
  { w: 640, hRatio: 0.65 }, // mobile / small tablets
  { w: 1024, hRatio: 0.45 }, // tablets
  { w: 1440, hRatio: 0.45 }, // small desktop
  { w: 1920, hRatio: 0.33 }, // large desktop
  { w: 2400, hRatio: 0.45 }, // XL desktop
];

// function buildSrcSet(baseUrl: string) {
//   return breakpoints
//     .map(
//       ({ w, h }) =>
//         `${baseUrl.replace(
//           "/upload/",
//           `/upload/w_${w},h_${h},c_fit,f_auto,q_auto/`
//         )} ${w}w`
//     )
//     .join(", ");
// }
// function buildSrcSet(baseUrl: string) {
//   return breakpoints
//     .map(({ w, hRatio }) => {
//       const h = Math.round(w * hRatio);
//       return `${baseUrl.replace(
//         "/upload/",
//         `/upload/w_${w},h_${h},c_fit,f_auto,q_auto/`
//       )} ${w}w`;
//     })
//     .join(", ");
// }
function buildSrcSet(baseUrl: string, aspectRatio: number) {
  return breakpoints
    .map(({ w, hRatio }) => {
      const h = Math.round(w * hRatio);
      // Use c_fill + g_auto for smart cropping
      return `${baseUrl.replace(
        "/upload/",
        `/upload/w_${w},h_${h},c_fill,g_auto,f_auto,q_auto/`
      )} ${w}w`;
    })
    .join(", ");
}

const FullPageBannerCarousel: React.FC<FullPageBannerCarouselProps> = ({
  banners,
  className = "",
  aspectRatio = 2, // default 2:1
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner, index) => {
            const hRatio = 1 / aspectRatio; // e.g., aspectRatio=2 → h = w/2 → hRatio = 0.5
            const srcSet = buildSrcSet(banner.image, aspectRatio);
            const defaultWidth = 1200;
            const defaultHeight = Math.round(defaultWidth * hRatio);
            const defaultSrc = banner.image.replace(
              "/upload/",
              `/upload/w_${defaultWidth},h_${defaultHeight},c_fill,g_auto,f_auto,q_auto/`
            );

            return (
              <CarouselItem key={index} className="relative">
                <Link to={banner.redirectUrl} className="block w-full">
                  <div
                    className="w-full relative"
                    // style={{ aspectRatio: `${aspectRatio}/1` }}
                  >
                    <img
                      src={defaultSrc}
                      srcSet={srcSet}
                      sizes="
                    (max-width: 360px) 360px,
                    (max-width: 390px) 390px,
                    (max-width: 414px) 414px,
                    (max-width: 640px) 640px,
                    (max-width: 1024px) 1024px,
                    (max-width: 1440px) 1440px,
                    (max-width: 1920px) 1920px,
                    2400px"
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-contain" // 👈 key change
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="left-4 text-white bg-black/30 hover:bg-black/50 z-30" />
        <CarouselNext className="right-4 text-white bg-black/30 hover:bg-black/50 z-30" />
      </Carousel>
    </div>
  );
};

export default FullPageBannerCarousel;

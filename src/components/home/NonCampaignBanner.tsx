import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import SaltSparkle from "../SaltSparkle";
import { useEffect, useState } from "react";
import { HeroImage } from "./types";

type NonCampaignBannerProps = {
  heroImages: HeroImage[];
};

export default function NonCampaignBanner({
  heroImages,
}: NonCampaignBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative md:min-h-[50vh] md:max-h-[65vh] md:py-10 lg:py-20 flex items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="md:container md:max-w-2xl lg:max-w-6xl md:flex-row items-center mx-auto sm:p-2 md:px-0 flex lg:flex-none lg:grid  lg:grid-cols-2 flex-col-reverse md:gap-12 gap-8">
        {/* <div className="container max-w-7xl mx-auto px-4 md:px-6 md:grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8 flex flex-col-reverse lg:grid lg:flex-none"> */}
        <div
          className={`relative p-2 sm:p-0 z-10 ${
            isVisible ? "animate-slide-in-left" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative inline-block w-full">
            <h1 className="font-display md:hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight tracking-tight font-bold text-blue-900">
              Natural Healing . Pure Joy . Everyday Luxury
            </h1>
            <h1 className="font-display hidden md:block text-4xl text-left md:text-5xl lg:text-6xl leading-tight tracking-tight font-bold text-blue-900">
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
            className="mt-6 text-xl text-center md:text-left text-blue-800/90 max-w-xl animate-fade-in font-serif italic"
            style={{ animationDelay: "0.9s" }}
          >
            Experience the therapeutic benefits of our premium bath salts—100%
            natural and crafted for your wellbeing.
          </p>

          <div className="mt-8 flex justify-center md:justify-start mb-4 gap-4">
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
    </div>
  );
}

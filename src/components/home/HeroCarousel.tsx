import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomeProduct } from "@/types/product";
import SaltSparkle from "../SaltSparkle";
import { motion } from "framer-motion";
import { HeroImage } from "./types";

const HeroCarousel = ({ heroImages }: { heroImages: HeroImage[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Custom autoplay implementation
  useEffect(() => {
    if (!emblaApi) return;

    const startAutoplay = () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);

      autoplayTimer.current = setTimeout(() => {
        emblaApi.scrollNext();
      }, 5000);
    };

    startAutoplay();

    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [emblaApi, selectedIndex]);

  // Progress bar animation
  useEffect(() => {
    if (!emblaApi) return;

    let progressTimer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 5000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(100, (elapsed / duration) * 100);
      setProgress(percentage);

      if (percentage < 100) {
        progressTimer = setTimeout(updateProgress, 50);
      }
    };

    if (selectedIndex !== -1) {
      progressTimer = setTimeout(updateProgress, 50);
    }

    return () => {
      if (progressTimer) clearTimeout(progressTimer);
    };
  }, [selectedIndex, emblaApi]);

  return (
    <div className="relative w-full md:rounded-xl overflow-hidden shadow-lg md:shadow-2xl">
      <div
        ref={emblaRef}
        className="overflow-hidden h-[40dvh]"
        // className="overflow-hidden h-[50vh] min-h-[400px] max-h-[600px]"
      >
        <div className="flex h-full">
          {heroImages.map((p, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <Link to={p.redirectPath} className="block w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />

                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{
                    scale: selectedIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 10 }}
                >
                  <img
                    src={p.imageUrl}
                    alt={`Picture of ${p.altText}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0,
                      y: selectedIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4"
                  >
                    <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full uppercase tracking-wider">
                      {index === 0 ? "Featured" : "Bestseller"}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0,
                      y: selectedIndex === index ? 0 : 30,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-white text-3xl lg:max-w-[80%] md:text-2xl lg:text-3xl font-bold max-w-2xl mb-2 md:mb-6 drop-shadow-lg"
                  >
                    {p.title}
                  </motion.h2>

                  {/* <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: selectedIndex === index ? 1 : 0,
                    y: selectedIndex === index ? 0 : 40,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="mb-6"
                >
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white hidden md:inline-flex text-black hover:bg-white/90 shadow-lg px-8 py-6 rounded-full font-medium"
                  >
                    <Link to={p.redirectPath}>Shop Now</Link>
                  </Button>
                </motion.div> */}

                  <SaltSparkle />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute hidden  bottom-8 left-0 right-0 md:flex justify-center gap-4 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              emblaApi?.scrollTo(i);
              setProgress(0);
            }}
            className="relative w-16 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            {selectedIndex === i && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-full p-3"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-full p-3"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;

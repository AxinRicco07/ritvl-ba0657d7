import { Button } from "@/components/ui/button";
import Whatsapp from "../assets/whatsapp.png";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const whatsappNumber = "917026252325";
  const [isJiggling, setIsJiggling] = useState(true);

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsJiggling(false);
  };

  // Make the button jiggle periodically
  useEffect(() => {
    const jiggleInterval = setInterval(() => {
      setIsJiggling(true);
      const timer = setTimeout(() => setIsJiggling(false), 1000);
      return () => clearTimeout(timer);
    }, 15000); // Jiggle every 15 seconds

    return () => clearInterval(jiggleInterval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className={`h-14 w-14 rounded-full bg-transparent hover:bg-transparent p-0 shadow-lg transform transition-transform duration-300 ${
          isJiggling ? "animate-jiggle" : ""
        }`}
      >
        <img 
          src={Whatsapp} 
          alt="Chat with us on WhatsApp" 
          className="w-10 h-10 object-contain"
        />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
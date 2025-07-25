
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast({
        title: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Format Indian phone number
    let formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    
    // If number doesn't start with country code, add +91 for India
    if (formattedNumber.length === 10 && !formattedNumber.startsWith('91')) {
      formattedNumber = '91' + formattedNumber;
    }
    
    const message = `Hello! I'm ${name || 'a customer'} interested in your products. Please contact me.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, "_blank");
    
    // Show success message
    toast({
      title: "Thank you!",
      description: "We'll contact you soon via WhatsApp.",
    });
    
    // Reset and close form
    setPhoneNumber("");
    setName("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 animate-scale-in w-[280px]">
          <form onSubmit={handleSubmit}>
            <h3 className="font-medium text-lg mb-3">Contact via WhatsApp</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210 or +919876543210"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter your 10-digit Indian mobile number</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="default" 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg flex items-center justify-center animate-jiggle"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default WhatsAppButton;

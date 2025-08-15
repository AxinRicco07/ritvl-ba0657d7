import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Image1 from "../assets/WhatsApp Image 2025-08-14 at 12.22.09 PM.jpeg";
import Image2 from "../assets/WhatsApp Image 2025-08-14 at 12.22.10 PM.jpeg";
import Image3 from "../assets/WhatsApp Image 2025-08-14 at 12.22.11 PM.jpeg";
import Image4 from "../assets/WhatsApp Image 2025-08-14 at 12.22.08 PM.jpeg";

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-blue-50/50">
        <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-blue-800">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your privacy matters to us at ritvl.com. This Privacy Policy
              explains how we collect, use, store, and safeguard your
              information when you use our services. By using our website, you
              agree to the terms outlined here.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={Image2}
                  alt="Data security illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={Image1}
                  alt="Privacy protection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={Image3}
                  alt="Secure storage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="section-padding py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-4 text-blue-800">
            Information We Collect
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            We collect certain types of information to provide and improve our
            services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">01</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Personal Information</h3>
              <p className="text-muted-foreground">
                Information you provide directly, such as your name, email
                address, and payment details when creating an account or making
                a purchase.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">02</span>
              </div>
              <h3 className="font-medium text-xl mb-3">
                Automatically Collected Data
              </h3>
              <p className="text-muted-foreground">
                Technical details like your IP address, browser type, operating
                system, and browsing behavior on our site.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">03</span>
              </div>
              <h3 className="font-medium text-xl mb-3">
                Cookies & Tracking
              </h3>
              <p className="text-muted-foreground">
                We use cookies to improve your browsing experience, remember
                preferences, and analyze site performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Usage & Protection */}
      <section className="section-padding bg-blue-50/50 py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-blue-800">
                How We Use & Protect Your Data
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Providing Services
                    </h3>
                    <p className="text-muted-foreground">
                      We use your information to operate, maintain, and improve
                      our website and services.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Communication
                    </h3>
                    <p className="text-muted-foreground">
                      We may contact you regarding updates, service
                      announcements, or important notices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Data Security
                    </h3>
                    <p className="text-muted-foreground">
                      We implement technical and organizational measures to
                      safeguard your personal data against unauthorized access.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Legal Compliance
                    </h3>
                    <p className="text-muted-foreground">
                      We may disclose your data if required by law or to
                      protect our rights and safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src={Image4}
                  alt="Data protection process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

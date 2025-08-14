import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ShippingPolicy() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-blue-50/50">
        <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-blue-800">
              Shipping Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We aim to get your order to you quickly and safely. Below you’ll
              find details on processing times, shipping methods, delivery
              estimates, and how to track your order.
            </p>
            <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Shipping and delivery illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Packaging"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Courier"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processing & Shipping Times */}
      <section className="section-padding py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-4 text-blue-800">
            Processing & Shipping Times
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Orders are typically processed within 1–2 business days (Monday–Friday,
            excluding holidays). Processing includes order verification,
            quality checks, and packing. Shipping time begins after processing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">01</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Domestic Shipping</h3>
              <p className="text-muted-foreground">
                Standard delivery usually arrives in 3–7 business days after
                dispatch, depending on your location and the carrier’s service
                levels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">02</span>
              </div>
              <h3 className="font-medium text-xl mb-3">Express Options</h3>
              <p className="text-muted-foreground">
                Where available, you can select expedited shipping at checkout.
                Delivery estimates will be shown based on your address.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-serif text-blue-700">03</span>
              </div>
              <h3 className="font-medium text-xl mb-3">International Shipping</h3>
              <p className="text-muted-foreground">
                International transit times vary by destination and customs
                processing. Any applicable duties or taxes are the responsibility
                of the recipient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rates, Tracking, and Delivery */}
      <section className="section-padding bg-blue-50/50 py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg mb-2">Shipping Rates</h3>
                <p className="text-muted-foreground">
                  Shipping costs are calculated at checkout based on weight,
                  destination, and selected service. From time to time, we may
                  offer promotional free shipping—look out for banners or messages
                  at checkout.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Order Tracking</h3>
                <p className="text-muted-foreground">
                  Once your order ships, you’ll receive an email with a tracking
                  link. It may take up to 24 hours for tracking details to become
                  available after dispatch.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Delivery Attempts</h3>
                <p className="text-muted-foreground">
                  Carriers may make multiple delivery attempts. If a package is
                  returned to us due to an incorrect address or failed delivery,
                  we’ll contact you to arrange reshipment (additional fees may
                  apply).
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Address Changes</h3>
                <p className="text-muted-foreground">
                  We can update your shipping address before the order ships. If
                  your order has already been dispatched, please contact the
                  carrier directly using your tracking number.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg mb-2">Damaged or Lost Packages</h3>
                <p className="text-muted-foreground">
                  If your order arrives damaged, or appears lost in transit,
                  please reach out to us within 7 days of the expected delivery
                  date. We’ll work with the carrier to investigate and resolve the
                  issue.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Customs, Duties & Taxes</h3>
                <p className="text-muted-foreground">
                  International shipments may be subject to customs duties, taxes,
                  and fees set by the destination country. These are the
                  recipient’s responsibility and are not included in product or
                  shipping prices.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Holiday & Peak Periods</h3>
                <p className="text-muted-foreground">
                  During peak seasons and holidays, processing and delivery times
                  may be extended. We recommend ordering early to ensure timely
                  arrival.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Questions?</h3>
                <p className="text-muted-foreground">
                  We’re here to help. For any shipping questions, contact our
                  support team and include your order number for faster
                  assistance.
                </p>
                <div className="mt-4">
                  <Button asChild>
                    <Link to="/contact">Get in touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </main>
  );
}


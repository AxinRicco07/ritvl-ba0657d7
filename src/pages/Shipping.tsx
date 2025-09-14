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
              Ensuring a seamless and convenient shopping experience, our Shipping
              Policy provides transparent guidelines for order fulfilment and
              delivery.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>

          {/* Illustrations */}
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

      {/* Shipping Content */}
      <section className="section-padding py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-6 md:px-8 prose prose-neutral dark:prose-invert prose-lg">
         <div> 
          <h2>Prepaid Orders</h2>
          <ul className="list-disc ml-6 space-y-3">
            <li>
              <strong>Free Shipping:</strong> Enjoy free shipping on orders
              exceeding a minimum order amount of INR 999/-.
            </li>
            <li>
              <strong>Shipping Charge for Orders Below Minimum Amount:</strong> An
              additional amount will be applied to orders below the minimum order
              amount during checkout.
            </li>
          </ul>
         </div>

         <div>
          <h2>Cash on Delivery (COD) Orders</h2>
          <ul className="list-disc ml-6 space-y-3">
            <li>
              <strong>Shipping Fee:</strong> During the checkout process, a nominal
              COD fee of INR 50 will be added to the order.
            </li>
            <li>
              <strong>Order Confirmation:</strong> Before processing your COD order,
              our team will contact you to verify the order details.
            </li>
            <li>
              <strong>Order Cancellation:</strong> If we are unable to reach you
              within 8 days of the order placement date, your order will be
              automatically cancelled.
            </li>
          </ul>
          </div>
          <p>
            Once your order has been confirmed, it will usually be shipped within{" "}
            <strong>24 business hours</strong>.
          </p>
        </div>
      </section>

      {/* Last Updated */}
      {/* <section className="py-8 bg-blue-50/30">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section> */}
    </main>
  );
}

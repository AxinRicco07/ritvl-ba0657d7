import React from "react";

const Bulk: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-serif mb-6">Bulk Delivery & Wholesale</h1>

      <p className="text-muted-foreground mb-6">
        We support bulk and wholesale orders for spas, hotels, gyms, wellness centers, resellers, gifting, and corporate requirements. Get reliable supply, consistent quality, and timely delivery pan-India.
      </p>

      <section className="space-y-3 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Why choose Ritvl for bulk orders?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Pharmaceutical-grade Epsom salt (Magnesium Sulfate) with consistent purity</li>
          <li>Flexible packaging: 500g, 1kg, 5kg, 10kg or custom</li>
          <li>Custom blends and fragrances on request</li>
          <li>Competitive bulk pricing with volume-based discounts</li>
          <li>GST invoice and compliant documentation</li>
          <li>Pan-India logistics with reliable partners</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Order terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Minimum Order Quantity (MOQ): 25 kg (flexible based on requirement)</li>
          <li>Lead time: 2–5 business days for standard packs; 7–10 days for customizations</li>
          <li>Shipping: Prepaid; freight calculated based on destination and weight</li>
          <li>Payments: UPI/Bank transfer/Online payment (GST invoices provided)</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">How to place a bulk order</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Share your requirements (quantity, pack size, fragrance/customizations).</li>
          <li>We’ll confirm pricing, lead time, and shipping estimate.</li>
          <li>Order is processed after payment confirmation; tracking shared on dispatch.</li>
        </ol>
      </section>

      <section className="mt-10 space-y-2 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Contact</h2>
        <p><span className="font-medium text-foreground">Phone:</span> 7026252325</p>
        <p>
          <span className="font-medium text-foreground">Email:</span> <a href="mailto:Support@ritvl.com" className="text-primary underline">Support@ritvl.com</a>
        </p>
        <p>
          <span className="font-medium text-foreground">Website:</span> <a href="https://www.ritvl.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://www.ritvl.com</a>
        </p>
        <p><span className="font-medium text-foreground">Address:</span> HBR Layout, Kalyanagar Bangalore 560043</p>
      </section>
    </div>
  );
};

export default Bulk;


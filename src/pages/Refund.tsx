import React from "react";

const Refund: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-serif mb-6">Refund Policy</h1>

      <section className="space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Returns Information</h2>
        <p>
          Ritvl offers its customers an "Easy Return Policy" with clear instructions on initiating a return request for a product.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Eligibility of Return</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Returns or replacements will solely be considered in instances where the product received by the customer is determined to have incurred damage during shipping, if an incorrect product was delivered, or if it exhibits manufacturing defects.
          </li>
          <li>Kindly reach out to us within 48 business hours of receiving your order.</li>
          <li>
            The product should be returned in its original packaging, ensuring that all labels remain intact, while maintaining a pristine condition.
          </li>
          <li>
            Products are eligible for return only if they were purchased from our official website, {" "}
            <a href="https://www.ritvl.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">
              https://www.ritvl.com
            </a>
            .
          </li>
          <li>
            The final decision regarding the acceptance of the return will be at our discretion and contingent upon a thorough verification of the product's condition.
          </li>
        </ol>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Process of Return</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Upon completion of the verification process for the returned products, the refund process will be initiated to the original payment account.
          </li>
          <li>
            For any inquiries regarding returns, our valued customers can reach out to our esteemed customer service team via email or telephone.
          </li>
        </ol>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Refund Policy</h2>
        <p>
          In the instance of manufacturing defects, incorrect product delivery, or shipping damage, customers are entitled to receive for the amount they paid for the product.
        </p>
        <p>
          No exchange or refund will be entertained once the order is placed. Refund of the amount will be given only when the product is 'OUT OF STOCK' or 'not shipped'.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Order Cancellation Before Dispatch</h2>
        <p>
          If you decide to cancel your order after placing it, you may do so by contacting our customer service team on the same day, prior to the dispatch of your order. If you cancel the order within 24hrs, the total amount paid will be refunded to your designated mode of payment.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Order Cancellation After Dispatch</h2>
        <p>
          If the product has been shipped and the customer wishes to rescind the order, they have 48hrs from the date of delivery to request a refund. Please note that INR 100 will be charged to the customer as a transportation fee.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Eligibility Of Refund</h2>
        <p>
          After the verification process for the returned products, the refund will be initiated to the original payment account within a timeframe of 24 to 48 business hours. It will take approximately 4 to 7 business days for the refunded amount to be reflected in your mode of payment.
        </p>
      </section>

      <section className="mt-10 space-y-2 text-muted-foreground">
        <h2 className="text-xl font-medium text-foreground">Contact</h2>
        <p>
          <span className="font-medium text-foreground">Phone:</span> 7026252325
        </p>
        <p>
          <span className="font-medium text-foreground">Email:</span> <a href="mailto:Support@ritvl.com" className="text-primary underline">Support@ritvl.com</a>
        </p>
        <p>
          <span className="font-medium text-foreground">Address:</span> HBR Layout, Kalyanagar Bangalore 560043
        </p>
      </section>
    </div>
  );
};

export default Refund;


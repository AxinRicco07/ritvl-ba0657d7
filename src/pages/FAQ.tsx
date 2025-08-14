export default function FAQ() {
  return (
    <main>
      <section className="relative bg-blue-50/50">
        <div className="container max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-blue-800">
            FAQs
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Find quick answers to common questions about our epsom salt blends, shipping, and orders.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-xl mb-2">What is Epsom salt and how does it help?</h3>
              <p className="text-muted-foreground">
                Epsom salt is magnesium sulfate. A warm bath with Epsom salt is commonly used to relax muscles and support a sense of calm.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-2">Are your ingredients natural?</h3>
              <p className="text-muted-foreground">
                We prioritize clean, simple formulas featuring premium Epsom salt and thoughtfully selected essential oils and botanical extracts.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-2">How much should I use?</h3>
              <p className="text-muted-foreground">
                Typically 1–2 cups per standard bathtub. Adjust to your preference.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-2">Is it safe during pregnancy or with certain conditions?</h3>
              <p className="text-muted-foreground">
                If you are pregnant or have any medical condition, consult your healthcare provider before using Epsom salt baths.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-2">What is your shipping policy?</h3>
              <p className="text-muted-foreground">
                We ship across India with reliable partners. For timelines and costs, see our Shipping Policy page available in the footer.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-2">Can I track my order?</h3>
              <p className="text-muted-foreground">
                Yes. Use the order tracking page from your Orders section or the link provided in your confirmation email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

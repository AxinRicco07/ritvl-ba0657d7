import { Link } from "react-router-dom";

export default function Ingredients() {
  return (
    <main>
      <section className="relative bg-blue-50/50">
        <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-blue-800">
              Ingredients
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We keep it simple and effective. Our blends start with premium-grade Epsom salt (Magnesium Sulfate),
              enhanced with thoughtfully selected botanicals and essential oils. Each ingredient is chosen to relax
              the body, calm the mind, and elevate your bath ritual.
            </p>
            <ul className="space-y-6">
              <li>
                <h3 className="font-medium text-xl mb-1">Epsom Salt (Magnesium Sulfate)</h3>
                <p className="text-muted-foreground">
                  Known to soothe tired muscles, help with relaxation, and support overall wellness. A clean, reliable base for
                  every blend.
                </p>
              </li>
              <li>
                <h3 className="font-medium text-xl mb-1">Lemongrass</h3>
                <p className="text-muted-foreground">
                  Bright, uplifting aroma that leaves you refreshed. Often used for its invigorating and clarifying feel.
                </p>
              </li>
              <li>
                <h3 className="font-medium text-xl mb-1">Lavender</h3>
                <p className="text-muted-foreground">
                  A classic for deep relaxation. Calming and soothing—perfect for your evening unwind.
                </p>
              </li>
              <li>
                <h3 className="font-medium text-xl mb-1">Cinnamon</h3>
                <p className="text-muted-foreground">
                  Warm and comforting notes to enrich your soak with a cozy, spa-like experience.
                </p>
              </li>
              <li>
                <h3 className="font-medium text-xl mb-1">Natural Fragrance & Plant Extracts</h3>
                <p className="text-muted-foreground">
                  Used sparingly to complement our essential oils and deliver a balanced aromatic profile.
                </p>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 order-first lg:order-last">
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-blue-100" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg bg-blue-100" />
            <div className="aspect-square overflow-hidden rounded-lg bg-blue-100" />
          </div>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-blue-800">How we choose ingredients</h2>
          <p className="text-muted-foreground mb-6">
            Inspired by the values on our About page—purity, sustainability, and wellness—we partner with ethical
            suppliers and keep our formulas clean and purposeful. No unnecessary fillers; just what your body and
            mind need for a great soak.
          </p>
          <p className="text-muted-foreground">
            Have questions about a specific blend or sensitivity? Head to our <Link to="/contact" className="text-blue-600 underline">Contact</Link> page and we’ll help.
          </p>
        </div>
      </section>
    </main>
  );
}


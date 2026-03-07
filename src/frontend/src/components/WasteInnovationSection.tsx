import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";

const bullets = [
  "Post-consumer plastic diversion",
  "Organic composting systems",
  "Bio-based material synthesis",
];

export default function WasteInnovationSection() {
  const imageRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="innovation"
      className="py-24 lg:py-32 bg-background"
      data-ocid="innovation.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="/assets/generated/waste-to-material.dim_800x600.jpg"
                alt="Waste to material innovation facility"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Decorative border */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/20 -z-10"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="delay-200 order-1 lg:order-2">
            <span className="inline-block mb-5 text-primary text-xs font-semibold tracking-widest uppercase">
              Circular Economy
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Turning Waste{" "}
              <span className="text-primary italic font-light">Into Worth</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              We are pioneering a circular economy where waste becomes a
              resource. Our research and development transforms post-consumer
              waste into usable raw materials and new products — closing the
              loop on pollution and creating value from what was once discarded.
            </p>

            {/* Bullets */}
            <ul className="space-y-4">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-primary mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-foreground font-medium text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const products = [
  {
    image: "/assets/generated/product-bags.dim_800x600.jpg",
    title: "Biodegradable Carry Bags",
    desc: "Cornstarch-based grocery bags that decompose naturally, leaving zero plastic behind. Strong, flexible, and eco-certified.",
    badge: "100% Compostable",
    badgeColor: "bg-primary/15 text-primary border-primary/30",
  },
  {
    image: "/assets/generated/product-tissue.dim_800x600.jpg",
    title: "Eco Tissue Paper",
    desc: "Soft, sustainable tissue paper for everyday use — gentle on skin, gentle on Earth. Packaged plastic-free.",
    badge: "Plastic-Free",
    badgeColor: "bg-secondary/30 text-secondary-foreground border-secondary/40",
  },
  {
    image: "/assets/generated/product-tissue.dim_800x600.jpg",
    title: "Kitchen Rolls",
    desc: "Durable, absorbent kitchen rolls made sustainably without harsh chemicals. Built for everyday life.",
    badge: "Sustainably Sourced",
    badgeColor: "bg-accent/60 text-accent-foreground border-accent/50",
  },
];

export default function ProductsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="products"
      className="py-24 lg:py-32 bg-muted/40"
      data-ocid="products.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block mb-4 text-primary text-xs font-semibold tracking-widest uppercase">
            What We Make
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Made from nature. Built for daily life.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.title} {...product} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  image,
  title,
  desc,
  badge,
  badgeColor,
  index,
}: {
  image: string;
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-ocid={`products.item.${index}`}
      className={`card-hover group rounded-2xl overflow-hidden bg-card border border-border/60 ${
        index === 2 ? "delay-200" : index === 3 ? "delay-400" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2.5">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

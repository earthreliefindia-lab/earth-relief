import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Handshake, ShoppingBag, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: ShoppingBag,
    title: "Sell Your Products",
    desc: "Join our curated eco marketplace and reach millions of conscious consumers who actively choose sustainable.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Brand",
    desc: "Marketing, visibility, and community support to help sustainable businesses scale and make real impact.",
  },
  {
    icon: Handshake,
    title: "Build Together",
    desc: "Partner with Earth Relief to co-create a greener supply chain and contribute to a circular economy.",
  },
];

interface MarketplaceSectionProps {
  onPartnerClick: () => void;
}

export default function MarketplaceSection({
  onPartnerClick,
}: MarketplaceSectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="marketplace"
      className="py-24 lg:py-32"
      style={{
        background: "oklch(88 0.025 145 / 0.25)",
        backgroundColor: "oklch(90 0.02 120)",
      }}
      data-ocid="marketplace.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block mb-4 text-primary text-xs font-semibold tracking-widest uppercase">
            Eco Marketplace
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            A Platform for the Planet's Brands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Earth Relief is building the world's most trusted marketplace for
            sustainable brands — a curated ecosystem where purpose-driven
            companies grow together.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} {...pillar} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onPartnerClick}
            data-ocid="marketplace.primary_button"
            className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-10 py-3 text-base shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Register as a Vendor
          </Button>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const delay = index === 1 ? "delay-200" : index === 2 ? "delay-400" : "";

  return (
    <div
      ref={ref}
      className={`card-hover group text-center rounded-2xl p-8 bg-card border border-border/50 hover:border-primary/30 cursor-default ${delay}`}
    >
      <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 mx-auto">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

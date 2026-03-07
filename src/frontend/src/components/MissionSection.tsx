import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Globe,
  GraduationCap,
  Leaf,
  Lightbulb,
  Recycle,
  TreePine,
} from "lucide-react";

const missionCards = [
  {
    icon: Recycle,
    title: "Replace Plastics",
    desc: "Biodegradable & compostable alternatives to single-use plastic — products that decompose naturally and leave no trace.",
  },
  {
    icon: Lightbulb,
    title: "Circular Innovation",
    desc: "Waste-to-material and waste-to-product solutions that close the loop on pollution and resource waste.",
  },
  {
    icon: GraduationCap,
    title: "Educate & Empower",
    desc: "Awareness programs in schools and communities that inspire a generation of sustainable thinkers and doers.",
  },
];

const visionCards = [
  {
    icon: Leaf,
    title: "Organic Living",
    desc: "Promoting sustainable products and organic lifestyles that nourish both people and the planet.",
  },
  {
    icon: Globe,
    title: "Global Ecosystem",
    desc: "Building a thriving network of eco-friendly businesses worldwide committed to a shared sustainable future.",
  },
  {
    icon: TreePine,
    title: "Nature Protection",
    desc: "Encouraging people everywhere to cherish, protect, and restore the natural beauty of our world.",
  },
];

function MissionCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-child card-hover group rounded-2xl p-7 bg-card border border-border/60 hover:border-primary/30 cursor-default ${delay ?? ""}`}
    >
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2.5">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function MissionSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="mission"
      className="py-24 lg:py-32 bg-background"
      data-ocid="mission.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block mb-4 text-primary text-xs font-semibold tracking-widest uppercase">
            Why We Exist
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Earth Relief is on a mission to replace harmful materials, restore
            ecosystems, and rebuild our relationship with the natural world.
          </p>
        </div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {missionCards.map((card, i) => (
            <MissionCard
              key={card.title}
              {...card}
              delay={i === 1 ? "delay-200" : i === 2 ? "delay-400" : ""}
            />
          ))}
        </div>

        {/* Divider label */}
        <div className="text-center my-12">
          <span className="inline-block px-6 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-xs font-semibold tracking-widest uppercase border border-secondary/40">
            Our Vision
          </span>
        </div>

        {/* Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionCards.map((card, i) => (
            <MissionCard
              key={card.title}
              {...card}
              delay={i === 1 ? "delay-200" : i === 2 ? "delay-400" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

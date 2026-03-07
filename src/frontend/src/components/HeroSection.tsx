import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const leaves = [
  {
    cls: "leaf-float",
    style: {
      top: "15%",
      left: "8%",
      width: 32,
      height: 32,
      opacity: 0.55,
      animationDelay: "0s",
    },
  },
  {
    cls: "leaf-float-2",
    style: {
      top: "30%",
      right: "12%",
      width: 20,
      height: 20,
      opacity: 0.45,
      animationDelay: "2s",
    },
  },
  {
    cls: "leaf-float-3",
    style: {
      top: "60%",
      left: "15%",
      width: 26,
      height: 26,
      opacity: 0.4,
      animationDelay: "1s",
    },
  },
  {
    cls: "leaf-float-4",
    style: {
      top: "20%",
      right: "30%",
      width: 18,
      height: 18,
      opacity: 0.5,
      animationDelay: "3.5s",
    },
  },
  {
    cls: "leaf-float-5",
    style: {
      top: "70%",
      right: "8%",
      width: 22,
      height: 22,
      opacity: 0.35,
      animationDelay: "1.5s",
    },
  },
];

function LeafSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 2C16 2 28 8 28 18C28 24.627 22.627 30 16 30C9.373 30 4 24.627 4 18C4 8 16 2 16 2Z"
        fill="rgba(255,255,255,0.7)"
      />
      <path
        d="M16 4L16 28"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M16 10C13 13 10 16 10 20"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M16 10C19 13 22 16 22 20"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-earth.dim_1600x900.jpg')",
        }}
      />

      {/* Dark green overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(18 0.1 145 / 0.82) 0%, oklch(22 0.12 145 / 0.75) 50%, oklch(12 0.08 145 / 0.88) 100%)",
        }}
      />

      {/* Floating leaves */}
      {leaves.map((leaf) => (
        <span
          key={leaf.cls}
          className={`absolute pointer-events-none select-none ${leaf.cls}`}
          style={leaf.style}
          aria-hidden="true"
        >
          <LeafSVG width={leaf.style.width} height={leaf.style.height} />
        </span>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <span className="inline-block mb-8 px-5 py-2 rounded-full border border-white/25 text-white/85 text-[0.65rem] font-bold tracking-[0.12em] uppercase bg-white/8 backdrop-blur-sm">
            Sustainability · Innovation · Impact
          </span>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-bold text-white leading-[1.02] tracking-tight mb-6">
            Healing the Earth,{" "}
            <span className="block italic font-light text-white/90">
              One Choice at a Time
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Replacing single-use plastics. Restoring ecosystems. Building a
            sustainable future for all.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              size="lg"
              asChild
              data-ocid="hero.primary_button"
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold rounded-full px-10 py-3 text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              <a href="#mission">Explore Our Mission</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              data-ocid="hero.secondary_button"
              className="border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white font-semibold rounded-full px-10 py-3 text-base transition-all duration-300"
            >
              <a href="#products">Shop Eco Products</a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#mission"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors flex flex-col items-center gap-2 animate-bounce"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase font-medium">
            Scroll
          </span>
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}

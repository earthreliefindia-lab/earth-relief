import { useGetImpactStats } from "@/hooks/useQueries";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const fallbackStats: StatItem[] = [
  {
    value: 50000,
    suffix: "+ kg",
    label: "Plastic Replaced",
    description: "Kilograms of plastic diverted from landfills and oceans",
  },
  {
    value: 120,
    suffix: "+",
    label: "Eco Partners",
    description: "Sustainable businesses in our growing global network",
  },
  {
    value: 25000,
    suffix: "+",
    label: "Students Educated",
    description: "Young minds inspired to live sustainably",
  },
  {
    value: 80,
    suffix: "+",
    label: "Communities Reached",
    description: "Communities across regions touched by our programs",
  },
];

function useCountUp(target: number, duration, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return count;
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 2000, active);

  return (
    <div className="text-center px-4 py-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="font-heading text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
        {count.toLocaleString()}
        <span className="text-primary/80">{stat.suffix}</span>
      </div>
      <div className="text-white font-semibold text-lg mb-2">{stat.label}</div>
      <div className="text-white/50 text-sm leading-relaxed">
        {stat.description}
      </div>
    </div>
  );
}

export default function ImpactSection() {
  const { data: impactData = null } = useGetImpactStats();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = impactData
    ? [
        {
          value: Number(impactData.plasticReplacedKg),
          suffix: "+ kg",
          label: "Plastic Replaced",
          description:
            "Kilograms of plastic diverted from landfills and oceans",
        },
        {
          value: Number(impactData.ecoPartners),
          suffix: "+",
          label: "Eco Partners",
          description: "Sustainable businesses in our growing global network",
        },
        {
          value: Number(impactData.studentsEducated),
          suffix: "+",
          label: "Students Educated",
          description: "Young minds inspired to live sustainably",
        },
        {
          value: Number(impactData.communitiesReached),
          suffix: "+",
          label: "Communities Reached",
          description: "Communities across regions touched by our programs",
        },
      ]
    : fallbackStats;

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "oklch(24 0.1 145)",
      }}
      data-ocid="impact.section"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(62 0.15 145) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, oklch(42 0.12 145) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block mb-4 text-primary/80 text-xs font-semibold tracking-widest uppercase">
            Our Impact
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Numbers That Matter
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Measurable change. Real results. A planet healing one step at a
            time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

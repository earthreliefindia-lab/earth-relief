import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Shield, Sprout, ThermometerSun } from "lucide-react";

const programs = [
  { icon: BookOpen, label: "Hygiene awareness" },
  { icon: Shield, label: "Environmental protection workshops" },
  { icon: ThermometerSun, label: "Global warming education" },
  { icon: Sprout, label: "Sustainable living skills" },
];

export default function EducationSection() {
  const imageRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="education"
      className="py-28 lg:py-40 bg-background"
      data-ocid="education.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="eyebrow-pill mb-5 inline-flex">
              Social Mission
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Educating the{" "}
              <span className="text-primary italic font-light">
                Next Generation
              </span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Earth Relief runs active awareness programs in schools and
              colleges, teaching hygiene, environmental responsibility, and
              sustainable lifestyle practices. We believe lasting change begins
              in the classroom.
            </p>

            {/* Program highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {programs.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white card-shadow border-0 hover:shadow-card-lg transition-all duration-200"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Future initiative note */}
            <div className="p-6 rounded-2xl bg-primary/6 border border-primary/15">
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="font-semibold text-foreground">
                  Coming Soon:
                </span>{" "}
                The Earth Relief School — a future education initiative focused
                on high-quality learning, practical skills, physical activity,
                and teaching kindness toward nature and society.
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="delay-200">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] card-shadow-lg">
              <img
                src="/assets/generated/education-program.dim_800x600.jpg"
                alt="Education and awareness program"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-secondary/30 -z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

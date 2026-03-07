import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PartnerSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();
  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.companyName || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.submitPartnerForm(
        form.name,
        form.email,
        form.companyName,
        form.message,
      );
      setSubmitted(true);
      toast.success("Partner application submitted! We'll be in touch soon.");
      setForm({ name: "", email: "", companyName: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="partner"
      className="py-24 lg:py-32 bg-muted/40"
      data-ocid="partner.section"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block mb-4 text-primary text-xs font-semibold tracking-widest uppercase">
            Collaboration
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Grow With Us
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Join the Earth Relief ecosystem and help build a more sustainable
            world. We support brands, businesses, and innovators committed to a
            greener future.
          </p>
        </div>

        <div ref={formRef} className="delay-200">
          {submitted ? (
            <div
              data-ocid="partner.success_state"
              className="text-center p-12 rounded-2xl bg-card border border-primary/20"
            >
              <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto mb-5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-muted-foreground text-sm">
                Your application has been received. Our team will review and
                reach out to you within 2–3 business days.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSubmitted(false)}
                data-ocid="partner.secondary_button"
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card border border-border/60 p-8 space-y-5 shadow-sm"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="partner-name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="partner-name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    data-ocid="partner.input"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="partner-email"
                    className="text-sm font-medium"
                  >
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="partner-email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    data-ocid="partner.input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="partner-company"
                  className="text-sm font-medium"
                >
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="partner-company"
                  placeholder="Your company"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  data-ocid="partner.input"
                  required
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="partner-message"
                  className="text-sm font-medium"
                >
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="partner-message"
                  placeholder="Tell us about your brand, products, and how you'd like to collaborate..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  data-ocid="partner.textarea"
                  required
                  rows={5}
                />
              </div>

              {loading && (
                <div
                  data-ocid="partner.loading_state"
                  className="sr-only"
                  aria-live="polite"
                >
                  Submitting your application...
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                data-ocid="partner.submit_button"
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold py-3 text-base transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

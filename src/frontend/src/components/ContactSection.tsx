import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Loader2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const formRef = useScrollReveal<HTMLDivElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();
  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(
        form.name,
        form.email,
        form.subject,
        form.message,
      );
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 lg:py-40 bg-background"
      data-ocid="contact.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="eyebrow-pill mb-5 inline-flex">Get In Touch</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Contact & Collaboration
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Have a question, partnership idea, or just want to say hello? We'd
            love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Form */}
          <div ref={formRef}>
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="text-center p-12 rounded-3xl bg-white card-shadow border-0"
              >
                <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="24"
                    height="24"
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
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  We'll get back to you within 24–48 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  data-ocid="contact.secondary_button"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white card-shadow border-0 p-10 space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      data-ocid="contact.input"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      data-ocid="contact.input"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject *</Label>
                  <Input
                    id="contact-subject"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    data-ocid="contact.input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us more..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    data-ocid="contact.textarea"
                    required
                    rows={5}
                  />
                </div>

                {loading && (
                  <div
                    data-ocid="contact.loading_state"
                    className="sr-only"
                    aria-live="polite"
                  >
                    Sending message...
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  data-ocid="contact.submit_button"
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold text-base transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="delay-200 space-y-8">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                Let's Build a{" "}
                <span className="text-primary italic font-light">
                  Greener World
                </span>{" "}
                Together
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're a brand, school, government body, or an
                individual passionate about sustainability — Earth Relief is
                always open to new ideas, partnerships, and collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hello@earthrelief.org"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white card-shadow border-0 hover:shadow-card-lg transition-all duration-200 group"
                data-ocid="contact.link"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Email
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    hello@earthrelief.org
                  </div>
                </div>
              </a>

              <a
                href="tel:+911234567890"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white card-shadow border-0 hover:shadow-card-lg transition-all duration-200 group"
                data-ocid="contact.link"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Phone
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    +91 12345 67890
                  </div>
                </div>
              </a>
            </div>

            {/* Nature image */}
            <div className="rounded-3xl card-shadow overflow-hidden aspect-video">
              <img
                src="/assets/generated/nature-aerial.dim_1200x600.jpg"
                alt="Aerial view of pristine nature"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

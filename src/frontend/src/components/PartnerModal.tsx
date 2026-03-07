import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PartnerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PartnerModal({ open, onClose }: PartnerModalProps) {
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
      toast.success("Partner application submitted!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", companyName: "", message: "" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg w-full"
        data-ocid="partner.modal"
        aria-describedby="partner-modal-desc"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold">
            Partner With Us
          </DialogTitle>
          <DialogDescription id="partner-modal-desc">
            Join Earth Relief's eco ecosystem. Tell us about your brand and
            vision.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div data-ocid="partner.success_state" className="text-center py-8">
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
              Application Received!
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              We'll review your application and reach out within 2–3 business
              days.
            </p>
            <Button
              variant="outline"
              onClick={handleClose}
              data-ocid="partner.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name">Full Name *</Label>
                <Input
                  id="modal-name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  data-ocid="partner.input"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-email">Email *</Label>
                <Input
                  id="modal-email"
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
              <Label htmlFor="modal-company">Company Name *</Label>
              <Input
                id="modal-company"
                placeholder="Your company"
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                data-ocid="partner.input"
                required
                autoComplete="organization"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-message">Message *</Label>
              <Textarea
                id="modal-message"
                placeholder="Tell us about your brand and collaboration interests..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                data-ocid="partner.textarea"
                required
                rows={4}
              />
            </div>

            {loading && (
              <div
                data-ocid="partner.loading_state"
                className="sr-only"
                aria-live="polite"
              >
                Submitting...
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                data-ocid="partner.cancel_button"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                data-ocid="partner.submit_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

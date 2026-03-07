import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationProps {
  onPartnerClick: () => void;
}

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Products", href: "#products" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Impact", href: "#impact" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation({ onPartnerClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.08)] border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
          aria-label="Earth Relief home"
        >
          <img
            src="/assets/generated/logo-mark-transparent.dim_200x200.png"
            alt="Earth Relief Logo"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span
            className={`font-heading font-bold text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Earth Relief
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={"nav.link"}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:text-primary ${
                  scrolled
                    ? "text-foreground/70 hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button
            onClick={onPartnerClick}
            data-ocid="nav.primary_button"
            className={`font-semibold text-sm transition-all duration-300 rounded-full px-5 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-white text-foreground hover:bg-white/95"
            }`}
          >
            Partner With Us
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border px-6 pb-5">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  className="block px-3 py-2.5 text-sm font-medium text-foreground/70 rounded-md hover:bg-muted hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              setMenuOpen(false);
              onPartnerClick();
            }}
            data-ocid="nav.primary_button"
            className="w-full mt-3 bg-primary text-primary-foreground font-semibold hover:opacity-90"
          >
            Partner With Us
          </Button>
        </div>
      )}
    </header>
  );
}

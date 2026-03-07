const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "#mission" },
      { label: "Mission", href: "#mission" },
      { label: "Impact", href: "#impact" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Biodegradable Bags", href: "#products" },
      { label: "Tissue Paper", href: "#products" },
      { label: "Kitchen Rolls", href: "#products" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Marketplace", href: "#marketplace" },
      { label: "Partner Program", href: "#partner" },
      { label: "Vendor Register", href: "#partner" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" },
      { label: "Education", href: "#education" },
    ],
  },
];

export default function FooterSection() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-16 lg:py-20 border-t border-border/60"
      style={{ background: "oklch(20 0.08 145)" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#top"
              className="flex items-center gap-2.5 mb-4"
              data-ocid="footer.link"
              aria-label="Earth Relief"
            >
              <img
                src="/assets/generated/logo-mark-transparent.dim_200x200.png"
                alt="Earth Relief"
                className="w-9 h-9 rounded-full object-cover opacity-90"
              />
              <span className="font-heading text-lg font-bold text-white">
                Earth Relief
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-52">
              Healing the Earth, One Choice at a Time.
            </p>
          </div>

          {/* Footer columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading text-sm font-semibold text-white/75 uppercase tracking-wider mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      data-ocid="footer.link"
                      className="text-white/50 text-sm hover:text-white/85 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© {year} Earth Relief. All rights reserved.</span>
              <span className="hidden sm:block">·</span>
              <span>Committed to a plastic-free world.</span>
            </div>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

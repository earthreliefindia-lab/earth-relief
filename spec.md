# Earth Relief

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full multi-section marketing website for Earth Relief, a sustainability-driven company
- Hero section with full-screen impact statement and animated earth/leaf visuals
- Mission & Vision section with animated cards
- Sustainable Products section showcasing cornstarch bags, tissue paper, kitchen rolls
- Marketplace for Eco Brands section with vendor registration CTA
- Waste to Material Innovation section highlighting R&D and circular economy
- Education & Awareness Programs section covering school/college outreach
- Partner With Us / Vendor Registration section with a contact form
- Impact Statistics section with animated counters (plastic replaced, partners, communities reached)
- Blog / Knowledge Hub section with sample article cards
- Contact & Collaboration section with a form
- Sticky navigation with smooth scroll links
- Footer with links and social icons

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan

**Backend (Motoko)**
- `submitPartnerApplication(name, email, company, message)` — store vendor/partner inquiries
- `submitContactMessage(name, email, message)` — store contact form submissions
- `getBlogPosts()` — return list of sample blog post records
- `getImpactStats()` — return impact statistics (kg plastic replaced, partners, students reached)

**Frontend**
- Design tokens: soft earth palette — warm white background, forest green primary, sage secondary, warm beige accent, charcoal foreground
- Fonts: Cabinet Grotesk (headings), General Sans (body)
- Sections: Nav, Hero, Mission, Products, Marketplace, WasteToMaterial, Education, PartnerForm, ImpactStats, Blog, Contact, Footer
- Smooth scroll behavior, fade-in-on-scroll animations using Intersection Observer
- Animated counter for impact stats
- Responsive mobile-first layout
- Minimal UI, generous whitespace, subtle shadows
- Nature-themed SVG/illustration accents
- Vendor registration modal dialog with form

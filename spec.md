# Earth Relief

## Current State
A full-screen multi-section sustainability website with 12 sections: Hero, Mission, Products, Marketplace, WasteInnovation, Impact, Education, Partner, Blog, Contact, Footer, and Navigation. The design uses a forest-green dark palette but has serious contrast issues — the foreground OKLCH token (`22 0.02 60`) renders as a medium-dark grey that is nearly invisible on white backgrounds. The primary green (`42 0.16 145`) is too dark and low-chroma to register as a vivid green. Cards lack visible shadows. Section spacing is adequate but the hero is not tall enough. Typography scale is good but can be elevated further. The overall feel is functional but not premium.

## Requested Changes (Diff)

### Add
- Strong card drop shadows (`0 4px 24px rgba(0,0,0,0.08)`, `0 1px 4px rgba(0,0,0,0.04)`) across all card components
- Reveal/scroll-reveal class `reveal-child` to index.css so it works as `fade-in-up` alias
- Section divider/spacing tokens for consistent vertical rhythm (py-28 lg:py-40 on non-hero sections)
- Subtle green tint backgrounds for alternating sections to create depth without darkness
- Premium section header eyebrow pill style (green background pill instead of bare text)

### Modify
- **index.css** design tokens:
  - `--foreground`: change to `15 0.02 60` (near-black `#1a1a1a` equivalent in OKLCH)
  - `--card-foreground`: same near-black
  - `--primary`: change to `62 0.22 145` (vivid #22c55e equivalent — bright eco green)
  - `--primary-foreground`: `98 0.005 145` (near-white for contrast on green buttons)
  - `--muted-foreground`: `48 0.025 60` (visible medium-dark grey, not too light)
  - `--background`: `99 0.002 120` (true white-ish)
  - `--secondary`: `88 0.055 145` (very light green tint for alt backgrounds)
  - `--secondary-foreground`: `20 0.02 60` (dark text on light green)
  - `--border`: `90 0.02 145` (subtle green-tinged border)
  - `--card`: `99.5 0.001 120` (pure white card)
  - Add `card-shadow` shadow utility: `0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`
  - Add `card-shadow-lg` for hover: `0 12px 40px -8px rgba(0,0,0,0.14), 0 4px 12px -4px rgba(0,0,0,0.06)`
  - Increase `--radius` to `1rem`
- **HeroSection**: increase min-height to `100svh`, headline from `text-8xl` to `text-8xl lg:text-9xl`, subtext from `text-xl` to `text-xl md:text-2xl`, add more breathing room between eyebrow/headline/sub/CTA
- **MissionSection, ProductsSection, MarketplaceSection, WasteInnovationSection, EducationSection, PartnerSection, BlogSection, ContactSection**: increase vertical padding to `py-28 lg:py-40`, apply `card-shadow` and `rounded-2xl` to all cards
- **ProductsSection** cards: add card-shadow, increase rounded corners to `rounded-3xl`
- **MissionSection** cards: apply card-shadow, white background on cards
- **MarketplaceSection**: apply card-shadow to pillar cards
- **ImpactSection**: keep dark forest background but improve stat card styling with stronger contrast text and vivid primary accent numbers
- **Navigation**: improve scrolled state to use true white background with subtle shadow
- **FooterSection**: keep dark but ensure text contrast is sufficient (white/60 minimum on dark bg)
- **All section eyebrows**: upgrade from bare `text-primary uppercase text-xs` spans to small pill badges with green background

### Remove
- The broken/invisible `muted-foreground` low-contrast grey — replace throughout with properly visible text

## Implementation Plan
1. Update `index.css` — fix all OKLCH color tokens, add card-shadow utilities, update radius
2. Update `tailwind.config.js` — register card-shadow and card-shadow-lg in boxShadow theme
3. Update `HeroSection.tsx` — bigger typography, more spacing, ensure eyebrow pill is crisp
4. Update `MissionSection.tsx` — card shadows, bigger section padding, eyebrow pill upgrade
5. Update `ProductsSection.tsx` — card shadows, rounded-3xl, section padding
6. Update `MarketplaceSection.tsx` — card shadows, section padding
7. Update `WasteInnovationSection.tsx` — section padding, image shadow upgrade
8. Update `ImpactSection.tsx` — vivid green accent numbers, improve stat card borders
9. Update `EducationSection.tsx` — card shadows, section padding
10. Update `Navigation.tsx` — white bg + shadow on scroll, clean CTA
11. Update `FooterSection.tsx` — improve text contrast

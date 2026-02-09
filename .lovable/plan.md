

## Simplify to a Minimal One-Page Landing Page

Strip the site down to a clean, focused single-screen experience: headline, subheader, CTA, fox mascot, and footer. No scrolling sections, no wave dividers, no cards.

---

### What Gets Removed

- **ServicesSection** - delete component and file
- **WhyUsSection** - delete component and file
- **MissionSection** - delete component and file
- **FAQSection** - delete component and file
- **CTASection** - delete component and file
- **WaveDivider** - delete component (no longer needed)
- **useScrollAnimation hook** - delete (no scroll sections to animate)

### What Stays (modified)

- **Header** - keep as-is (centered fox logo + "Red Fox Labs")
- **Hero** - redesigned as the full landing page content
- **Footer** - simplified

### New Page Structure

```text
+--------------------------------------+
|     [fox icon] Red Fox Labs          |  <- Header (existing)
+--------------------------------------+
|                                      |
|     Product. Strategy. Design.       |  <- Tagline (bold, large)
|                                      |
|     We build efficient digital       |  <- Subheader copy
|     products that just work.         |
|     No fluff, no subscriptions.      |
|                                      |
|        [ Book a free call ]          |  <- CTA button
|                                      |
|          [fox mascot image]          |  <- Fox icon with float animation
|                                      |
+--------------------------------------+
|  Made with care · (c) 2026 Red Fox   |  <- Footer (existing, simplified)
+--------------------------------------+
```

### Updated Messaging

- **Headline**: "Product. Strategy. Design." (punchy, no geographic focus)
- **Subheader**: Short copy about building efficient digital products -- no mention of Bay Area or small business specifically
- **Trust line**: "One-time investment. No subscriptions. You own everything."
- **CTA**: "Book a free call" (links to existing Google Calendar URL)

### Technical Changes

1. **Delete 7 files**: `ServicesSection.tsx`, `WhyUsSection.tsx`, `MissionSection.tsx`, `FAQSection.tsx`, `CTASection.tsx`, `WaveDivider.tsx`, `use-scroll-animation.ts`
2. **Rewrite `Hero.tsx`**: Combine headline, subheader, CTA button, and fox mascot into one centered full-height section
3. **Update `Index.tsx`**: Remove all section imports, render only Header, Hero, Footer
4. **Simplify `Footer.tsx`**: Keep as-is (already minimal)
5. **Clean `index.css`**: Remove blob/wave-related utilities if no longer referenced
6. **Update `index.html`**: Remove Bay Area references from meta description and keywords
7. **Update `sitemap.xml`/`robots.txt`**: Update lastmod date


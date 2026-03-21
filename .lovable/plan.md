

## Plan: Update Phone Number & Add Sticky WhatsApp Button

### 1. Replace Phone Number Everywhere

Old: `4915216251471` / `+49 1521 6251471`
New: `4917680774054` / `+49 176 80774054`

**Files to update:**
- `src/components/Navigation.tsx` — WhatsApp link, tel: links, display text (4 occurrences)
- `src/components/HeroSection.tsx` — WhatsApp link (1 occurrence)
- `src/components/ContactFormSection.tsx` — WhatsApp links (2 occurrences)
- `src/components/Footer.tsx` — WhatsApp link, tel: link, display text (3 occurrences)
- `src/pages/Impressum.tsx` — display text (1 occurrence)
- `src/pages/Datenschutz.tsx` — display text (1 occurrence)
- `index.html` — meta tags, schema.org JSON-LD (4 occurrences)

### 2. Add Sticky Floating WhatsApp Button (Mobile Only)

Create a new component `src/components/FloatingWhatsApp.tsx`:
- Fixed position bottom-right corner
- Green WhatsApp circle button with icon
- Only visible on mobile (`md:hidden`)
- Links to `wa.me/4917680774054` with pre-filled message
- Slight shadow and pulse animation for visibility
- z-index high enough to stay above all content

Add it to `src/pages/Index.tsx` (renders on every page visit).

### Technical Details
- Uses Tailwind's `md:hidden` for mobile-only display
- `fixed bottom-6 right-6 z-50` positioning
- WhatsApp green (`#25D366`) background
- Subtle pulse animation via Tailwind `animate-pulse` or custom keyframe




## Code Cleanup and Efficiency Plan

Based on a comprehensive review of the codebase, I've identified several opportunities to clean up unused code and improve efficiency.

---

## Summary of Findings

### Unused Files and Components

| Item | Issue |
|------|-------|
| `src/integrations/supabase/types.ts` | 266 lines of Supabase types that are never imported anywhere (Supabase integration was removed) |
| `src/components/ui/toast.tsx` | Radix toast components not used anywhere in the app |
| `src/components/ui/toaster.tsx` | Toaster component imported in App.tsx but never triggers any toasts |
| `src/hooks/use-toast.ts` | Toast hook never called by any component |
| `src/components/ui/tooltip.tsx` | Only `TooltipProvider` is used; `Tooltip`, `TooltipTrigger`, `TooltipContent` exports are never used |

### Unused Dependencies

| Package | Reason |
|---------|--------|
| `@radix-ui/react-toast` | Toast components exist but are never triggered |
| `@radix-ui/react-tooltip` | Only TooltipProvider wrapper is used, no actual tooltips in the app |
| `react-helmet-async` | HelmetProvider wrapper exists but `<Helmet>` is never used (all SEO is in static index.html) |

### Redundant Providers in App.tsx

The app includes multiple providers that serve no functional purpose:
- **TooltipProvider**: Wraps the entire app but no tooltips are rendered
- **Toaster (Radix)**: Registered but never receives toast messages
- **Sonner**: Another toast system, also never triggered
- **HelmetProvider** (in main.tsx): No `<Helmet>` components exist

### Outdated/Incorrect Content

| File | Issue |
|------|-------|
| `public/sitemap.xml` | Uses `redfoxlabs.com` but actual domain appears to be `redfoxlabs.lovable.app` |
| `public/robots.txt` | Uses `redfoxlabs.com` domain |

---

## Cleanup Plan

### Phase 1: Delete Unused Supabase Types

**Delete:** `src/integrations/supabase/types.ts` and the empty `src/integrations/` directory

This file contains 266 lines of Supabase database types that are never imported anywhere. The Supabase integration was previously removed, but this types file was left behind.

### Phase 2: Remove Unused Toast System (Radix)

The app has TWO toast systems (Radix Toast and Sonner) but neither is actually used. Since Sonner is simpler and already re-exported, we can remove the more complex Radix setup.

**Delete:**
- `src/components/ui/toast.tsx` (127 lines)
- `src/components/ui/toaster.tsx` (33 lines)  
- `src/hooks/use-toast.ts` (191 lines)

**Update `src/App.tsx`:**
- Remove the Radix Toaster import and component

**Update `package.json`:**
- Remove `@radix-ui/react-toast` dependency

### Phase 3: Clean Up Tooltip System

Since no actual tooltips are used in the app, the TooltipProvider wrapper is unnecessary overhead.

**Delete:** `src/components/ui/tooltip.tsx` (28 lines)

**Update `src/App.tsx`:**
- Remove TooltipProvider wrapper and import

**Update `package.json`:**
- Remove `@radix-ui/react-tooltip` dependency

### Phase 4: Remove Unused react-helmet-async

The HelmetProvider is registered but no `<Helmet>` components exist. All SEO meta tags are already in static `index.html`.

**Update `src/main.tsx`:**
- Remove HelmetProvider wrapper and import

**Update `package.json`:**
- Remove `react-helmet-async` dependency

### Phase 5: Simplify App.tsx Structure

After the above changes, App.tsx becomes much cleaner:
- Remove TooltipProvider wrapper
- Remove Radix Toaster component
- Keep Sonner (in case toast functionality is needed later)

### Phase 6: Update Domain References (Optional)

If the live domain is `redfoxlabs.lovable.app` rather than `redfoxlabs.com`:

**Update:**
- `public/sitemap.xml` - Update domain
- `public/robots.txt` - Update sitemap URL
- `index.html` - Update canonical URL and OG URLs

(Skip this if you plan to use a custom domain `redfoxlabs.com` in production)

---

## Impact Summary

| Metric | Before | After |
|--------|--------|-------|
| Files removed | - | 6 files |
| Lines of code removed | - | ~645 lines |
| Dependencies removed | - | 3 packages |
| Unused providers removed | - | 3 wrappers |

### Files After Cleanup

```text
src/components/ui/
├── WaveDivider.tsx  (keep)
├── accordion.tsx    (keep - used by FAQ)
├── button.tsx       (keep - used throughout)
└── sonner.tsx       (keep - simple toast if needed)

src/hooks/
└── use-scroll-animation.ts  (keep - used by all sections)
```

---

## Technical Notes

- **Why keep Sonner?** It's a simpler toast library and the component is already configured. If you ever need toasts (e.g., for form submissions), it's ready to use.
- **Why remove Radix Toast?** It's a more complex implementation with custom hooks and state management that duplicates Sonner's functionality.
- **Why remove TooltipProvider?** It adds React context overhead with no benefit since no tooltips are rendered.
- **Why remove HelmetProvider?** All SEO is handled in static HTML, so the React-based meta tag management is unnecessary runtime overhead.


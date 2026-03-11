

# Increase Green Eyebrow Label Size Site-Wide

Keep all labels as `<p>` tags (correct semantics). Change `text-xs` → `text-sm` in the green eyebrow label class pattern across all 8 files:

1. `src/components/HeroSection.tsx`
2. `src/components/CtaSection.tsx`
3. `src/components/ServicesSection.tsx`
4. `src/components/BlogSection.tsx`
5. `src/components/AboutSection.tsx`
6. `src/pages/Blog.tsx`
7. `src/components/ServicesComparison.tsx`
8. `src/components/CategoriesSection.tsx`

Each file: find `text-xs font-semibold uppercase tracking-[0.2em] text-primary` → replace `text-xs` with `text-sm`.


## 1. Hero — replace `.canvas-1440` with fluid sizing

- [x] 1.1 Re-fetch the Hero desktop frame (`12405:6628` canvas, EN + TC) via Figma MCP to
      confirm current token values for the headline (Jumbo) max size, CTA panel width, and
      gutters — `clamp()` max bounds must hit these exactly, not be re-eyeballed.
- [x] 1.2 In `HomeHero.tsx`'s desktop branch, replace the `.canvas-1440` wrapper and its
      absolute 1440×960-coordinate children with `clamp()`-sized headline pairs (`%`-based
      vertical anchors, fixed-px horizontal gutters) and a `min(558px, N%)`-capped CTA panel,
      per design.md.
- [x] 1.3 Remove `.canvas-1440` and its scale-transform rule from `app/globals.css`.
- [x] 1.4 Confirm `HeroCursorTrail` and `MastPhotoCycle` still work unmodified — both already
      sit outside the (now-removed) collage wrapper per D106/D122.

## 2. Mission/Intro — cursor-follow photo reveal + fluid heading

- [x] 2.1 Re-fetch the Intro desktop frame (`12405:6419` / TC `0:254`) to confirm current
      heading token values; derive `clamp()` bounds that resolve to the same 3-line break at
      1440px and hold through 1024px (design.md's "derived call").
- [x] 2.2 Build a new page-local client component (parallel to `HeroCursorTrail.tsx`) that
      tracks the pointer within the Intro section's own bounds (`getBoundingClientRect()` on
      the section's ref), renders the Mission photo at the pointer position clamped to those
      bounds, hidden until the pointer enters, fading in/out — per
      `specs/home-mission-cursor-reveal/spec.md`.
- [x] 2.3 Re-run the spawn/position check on `scroll`, against the last known pointer
      position, matching `HeroCursorTrail`'s existing scroll-reconciliation pattern.
- [x] 2.4 In `HomeIntro.tsx`'s desktop branch, remove the static `absolute bottom-[-10px]
      left-[50.903%]` overlap image and its positioning comment (D-D), replace the heading's
      sizing with the `clamp()` bounds from 2.1, and compose the new cursor-reveal component.
- [x] 2.5 Confirm the mobile branch (`lg:hidden`) is untouched — the photo stays at its
      existing static mobile position per `specs/home-mission-cursor-reveal/spec.md`'s
      desktop-only requirement.

## 3. Services — fluid sizing tune-up

- [x] 3.1 Re-fetch the Services desktop frame to confirm current heading and accordion-label
      token max values.
- [x] 3.2 In `HomeServices.tsx`'s desktop branch, change the heading and accordion item label
      font sizing to `clamp()`, and the cross-fading background image's `left`/`width` to
      `clamp()`, matching Make's bounds. No change to the hover/open-index interaction logic
      (D121) or the mobile branch.

## 4. Decisions and docs

- [x] 4.1 Append a new entry to `openspec/DECISIONS.md`: Figma Make as the spec for Home's
      sub-1440px responsive behavior (Hero/Intro/Services), superseding D040's accepted costs
      for these three sections only; record the Intro heading's derived `clamp()` sizing and
      the new cursor-reveal interaction in the same entry, same shape as D122.
- [x] 4.2 Add `phase-16i` to `openspec/reference/roadmap.md`, noting it supersedes D040's
      accepted costs for Hero/Intro/Services only — other pages/sections are unaffected.
- [x] 4.3 Confirm no `app/_components/INVENTORY.md` entry is needed — the new cursor-reveal
      component stays page-local (single consumer), same precedent as `HeroCursorTrail.tsx`.

## 5. Verification

- [x] 5.1 `npm run lint` and `npx tsc --noEmit` both pass.
- [x] 5.2 Visual check via Playwright/next-devtools at 1024px, 1280px, 1440px, and a wide
      viewport (e.g. 1920px) in both `/en` and `/zh`: Hero and Services fill the viewport with
      no gutters at any of these widths; Intro's heading never overlaps the cursor-reveal
      photo at any width in this range.
- [x] 5.3 Confirm Hero renders pixel-identical to the pre-change output at exactly 1440px
      (design.md's noted risk) — compare before/after screenshots at that width.
- [x] 5.4 Confirm 393px mobile is unaffected across all three sections, both locales.
- [x] 5.5 Confirm `prefers-reduced-motion` suppresses the new Mission cursor-reveal's
      fade/position transitions, matching `HeroCursorTrail`'s existing behavior.

## Context

See proposal.md - Why. Three Home sections currently handle the 1024–1440px band
differently, none of them well: Hero scales a fixed 1440×960 composition via `.canvas-1440`
(D040) and letterboxes above 1440px; Intro reflows its heading in a flex column with no
frame to reflow against, so the heading can grow taller than the space its overlapping photo
assumes; Services already reflows correctly in structure (D042) but interpolates its sizing
by eye rather than against any reference. The Figma Make file (`fileKey
myqsxGwnrcNHEdsE2SFZXk`) is this project's established fallback spec for gaps the static
Figma doesn't cover (D106, D121, D122, D123); its own `src/app/HomeHero.tsx` and
`src/app/App.tsx` were read directly for this phase and are the source for the approach
below.

## Goals / Non-Goals

**Goals:**

- Hero and Services fill the viewport at every width ≥1024px with no fixed-width cap,
  matching Make's own layout exactly.
- Intro's heading and overlap photo can never collide, by construction — not by tuning
  positions to avoid it in the cases we happened to check.
- The desktop/mobile switch stays at 1024px (D040); nothing about the mobile layout changes.
- `openspec/DECISIONS.md` gets one entry naming the Make file as the spec for these three
  sections' sub-1440 behavior, so a later phase doesn't re-litigate it or assume D040's
  original accepted costs still apply here.

**Non-Goals:**

- Not touching any other page's responsive behavior. This is scoped to Home's Hero,
  Mission/Intro, and Services sections only.
- Not adopting Make's full-bleed approach as a general site-wide pattern — `.canvas-1440`'s
  removal is because its one consumer (Hero) is going away, not because placed-canvas scaling
  is wrong as a technique in general.
- Not changing `HeroCursorTrail.tsx` or `MastPhotoCycle.tsx` — both already sit outside the
  collage boundary (D106, D122) and are unaffected by the collage's removal.
- Not re-deriving Services' hover cross-fade interaction (D121) — only its sizing.
- Not adding an animation library. The new Mission cursor-reveal component follows
  `HeroCursorTrail.tsx`'s existing pattern: plain React state, CSS transitions, no GSAP.

## Decisions

### Figma Make is the spec for Home's sub-1440px responsive behavior

Extends D106/D121/D122/D123's precedent from "no canonical interaction exists" to "no
canonical sub-1440 layout exists." The static Figma frames are drawn at 1440px and 393px
only (CLAUDE.md's own stated constraint); Make's own responsive implementation, built by the
same designer, is better evidence for the gap than re-deriving proportional math from the two
fixed frames. Recorded as a new DECISIONS.md entry superseding D040's "accepted costs" for
these three sections specifically — D040's general placed-canvas/flow-section split is
otherwise unchanged and still governs every other page.

### Hero and Services use `clamp()`, not a scale transform

`.canvas-1440`'s `transform: scale()` approach (D040) preserves exact Figma coordinates at
the cost of capping at 1440px and requiring the custom-property workaround already documented
in `globals.css` (Lightning CSS silently drops inline `calc()` in a `transform`). Make's
`clamp()` approach has no such workaround, has no cap, and is the reference's own technique —
adopting it removes both problems at once rather than patching the scale approach to also
uncap.

**Alternative considered**: keep `.canvas-1440` but change its `max-width` to `none` and let
it fill the viewport. Rejected — the collage's children are still fixed at 1440×960 and
*transform-scaled up* past a 1:1 ratio above 1440px, which is a different (and untested)
regime from "scale down to fit," and still requires deriving `clamp()`-equivalent bounds for
the scale factor itself. Going directly to `clamp()` on the actual typography is simpler and
matches Make exactly.

### Intro's overlap photo becomes a cursor-follow reveal, not a repositioned static image

See proposal.md - What Changes. The alternative (keep it static, just clamp its position so
it can never overlap the heading's bounding box) was offered to and rejected by the user in
favor of matching Make's actual interaction — consistent with how this project already
treated the Hero's cursor trail and the Services hover cross-fade as spec-worthy gaps rather
than visual-only static interpolation.

**Bounds-clamping**: the photo's position clamps to the *section's* bounds (not the
viewport's), using the same `getBoundingClientRect()`-on-own-ref pattern as
`HeroCursorTrail.tsx` and Make's own `missionRef`/`updateMissionImg`, so it never renders
outside the white Mission section into the dark Hero or Services sections above/below it.

### Intro's heading gets `clamp()` sizing — a derived call, not copied from Make

Make's own Mission heading is a **fixed** 180px/fixed-margin block with no fluid sizing at
all (`fontSize: 180`, `left: 32, right: 231`), which would overflow its own reserved column
below roughly 1150px — Make was evidently never tested at narrower desktop widths. Since this
phase's goal is "the heading and photo can never collide," not "match Make's heading sizing
literally," the heading is given `clamp()` bounds sized so it resolves to the same 3-line
break Make hardcodes, down to 1024px. This is the one piece of this phase without a direct
Make answer — flagged per CLAUDE.md's "Responsive" rule (derived behavior is not silently
invented) and recorded in the same DECISIONS.md entry.

## Risks / Trade-offs

- [Mission's cursor-reveal photo is invisible until the pointer moves into the section — a
  visitor who never moves their cursor over that section (e.g., keyboard/touch navigation
  scrolling past it) never sees the photo at all] → Accepted, same trade-off this project
  already made for the Hero's cursor trail (D122) and Services' hover cross-fade (D121); the
  Mission section's heading, body copy, and CTA are all independently visible and functional
  without it.
- [Removing `.canvas-1440` changes Hero's rendered output at exactly 1440px — today's scale-1
  render vs. the new `clamp()` curve's value at 1440px — even though both are designed to hit
  the same token-defined max size] → Mitigated by sizing the `clamp()` max exactly to the
  existing Jumbo/H1 token values already in `globals.css`, so 1440px should render
  pixel-identical; verified visually at apply time rather than assumed.
- [`clamp()`'s middle (viewport-relative) term means Hero/Services text size now responds
  continuously to viewport width, including above 1440px — unlike `.canvas-1440`, which
  pinned to scale-1 and stopped growing] → Accepted per the earlier decision to remove the cap
  entirely; `clamp()`'s own max bound still prevents unbounded growth at very wide viewports.

## Open Questions

(none — the one genuine unknown, Intro's heading sizing below 1440px, is resolved above as a
derived call rather than deferred)

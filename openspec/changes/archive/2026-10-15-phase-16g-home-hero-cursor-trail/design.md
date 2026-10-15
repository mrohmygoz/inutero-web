## Context

See proposal.md for motivation. Same category of gap as D106/D121: **the canonical Figma
file (`zSq5F5v3UrVAdIjuSipe3H`) draws no version of this interaction** — the Hero is a static
collage with no per-frame cursor-reaction data. Two non-canonical references exist instead:

1. A **Figma Make** file (`fileKey myqsxGwnrcNHEdsE2SFZXk`, the same file D121's Services
   hover was built from) whose `src/app/HomeHero.tsx` is a full working reference
   implementation of the cursor image-trail, and whose `src/app/GlobalCursor.tsx` is a
   separate, unscoped custom-cursor effect that is explicitly **not** part of this phase.
2. A user-supplied codepen (`thingbynemanja/ogjaaNE`) demonstrating the generic "image
   trail follows cursor" pattern this family of effect belongs to — GSAP-based, looser
   timing. The Make file's own tuning (85px spawn threshold, plain CSS transitions, single-
   visible-ghost crossfade) supersedes the codepen's parameters; the codepen confirms the
   mechanic family, not the numbers to implement.

Target file: `app/[locale]/_components/HomeHero.tsx`, desktop branch only (the
`hidden ... lg:block` section wrapping the `canvas-1440` scaled collage, D040 — the collage is
uniformly CSS-scaled to the viewport, not a fluid layout).

## Goals / Non-Goals

**Goals:**
- Desktop-only (`lg:`, ≥1024px) cursor-driven image trail scoped to the Hero section,
  reproducing the Make reference's spawn/fade mechanic (85px threshold, single visible ghost,
  0.22s fade-in / 0.65s fade-out, small random rotation, scroll re-trigger).
- Reuse the existing 5 hero photos (`hero-1.jpg`–`hero-5.jpg`) already shipped for
  `MastPhotoCycle` — no new asset export.
- Keep the effect fully independent of the scaled `canvas-1440` collage's coordinate space.

**Non-Goals:**
- `GlobalCursor.tsx`'s site-wide custom pointer replacement — a different, unscoped effect
  the user confirmed is out of scope for this phase.
- Mobile/tablet. Below `lg:` nothing changes — the existing `MastPhotoCycle` auto-dissolve is
  untouched.
- Any change to the collage images, headline, scroll label, body copy, or CTAs.
- Adding an animation library. The codepen reference uses GSAP; this repo has no animation
  dependency today and the Make file's actual implementation is plain CSS transitions +
  `requestAnimationFrame`, which is what gets built.

## Decisions

**New page-local component**, `HeroCursorTrail.tsx` in `app/[locale]/_components/`, sibling
to `MastPhotoCycle.tsx` and composed into `HomeHero.tsx`'s desktop section only — mirroring how
`MastPhotoCycle` is composed into the mobile section only. `"use client"`, mounts its own
`ghosts` state array (capped to a small trailing window, matching the Make reference's
`slice(-6)`), though only one ghost is ever visually `show:true` at a time.

**Coordinate scoping**: the mousemove listener and the ghost overlay attach to the outer
`<section>` element, using `getBoundingClientRect()` for section-relative coordinates — the
same approach the Make reference's `heroRef` uses, and the same independence `MastPhotoCycle`
already has from the scaled collage. The ghost layer sits as a sibling to (not inside)
`canvas-1440`, so ghost image pixel size (240×360, or a value tuned during apply) stays
constant regardless of viewport width and never needs to pass through the collage's CSS scale
transform. **Why not scope inside `canvas-1440`**: that div's scale factor changes continuously
with viewport width above 1024px; keeping ghosts outside it means one less coordinate
transform to get wrong, at the cost of ghost size not scaling with the collage (acceptable —
the Make reference's own ghosts are fixed-pixel too).

**Spawn/fade mechanic**: ported directly from the Make reference — spawn gated by
`Math.hypot(dx, dy) >= 85`, new ghost mounts at `opacity:0, scale:0.94` then flips to
`opacity:0.88, scale:1` two `requestAnimationFrame`s later (`transition: opacity 0.22s
ease-out, transform 0.22s ease-out`), while the previous ghost is immediately flagged
`show:false` (`transition: opacity 0.65s ease-in, transform 0.65s ease-in`) and removed from
the DOM 700ms later. Scroll re-triggers the same spawn check against the last known pointer
position, gated to only fire while that position is still within the section's bounding rect.
No GSAP — React state + inline `transition` styles + `rAF`, consistent with every other
animated component in this codebase (`HomeServices` D121, `MastPhotoCycle`).

**Image sourcing**: round-robin through `hero-1.jpg`–`hero-5.jpg` via an incrementing index,
independent of `MastPhotoCycle`'s own index/timer (the two run on different sections and must
not share mutable state). No re-export, no new files.

**`prefers-reduced-motion`**: reuse the same `matchMedia("(prefers-reduced-motion: reduce)")`
pattern `MastPhotoCycle` already has — when set, the mousemove/scroll handlers short-circuit
before spawning, so no ghost ever mounts.

**Alternatives considered**: porting the codepen's GSAP timing (100px threshold, bouncy
`back.out(2)` ease, fixed 0.6s/0.6s in/out) instead of the Make file's tuning. Rejected — the
Make file is the project-specific, already-tuned reference (same precedent as D121 reusing the
Make file's state model over inventing one), and adding GSAP as a dependency for one effect
isn't justified when CSS transitions reproduce the same mechanic.

## Risks / Trade-offs

- **No drawn Figma frame to verify against** — fidelity here is "does it match the Make
  reference's behavior", not a pixel comparison. → Verification in tasks.md is behavioral
  (move the cursor, confirm spawn threshold/fade timing/rotation/scroll re-trigger), not a
  screenshot diff.
- **Ghost images are fixed-pixel (240×360 or similar) while the collage itself scales with
  `canvas-1440`** — at very wide viewports the ghosts will look proportionally smaller than
  the collage photos. → Accepted; the Make reference has the same property, and re-deriving a
  scale-aware ghost size adds complexity for a purely decorative effect.
- **A fast, erratic mouse (e.g. a quick flick across the whole section) could spawn and
  immediately queue a fade-out on the same frame.** → The Make reference's immediate
  `show:false` + 0ms timeout on the previous ghost already handles this; no additional
  debouncing needed beyond the 85px threshold.

## Open Questions

- Exact ghost image pixel size (240×360 from the Make reference vs. a value re-tuned against
  this project's own hero photos' aspect ratios) — deferred to apply time; doesn't change the
  interaction model, spec, or task breakdown either way.

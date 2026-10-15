## Why

The Home Hero (`app/[locale]/_components/HomeHero.tsx`) desktop collage is otherwise static —
nothing responds to the visitor's cursor. The user wants a cursor-driven image trail over the
desktop hero: as the cursor moves across the section, portrait photos spawn and fade at the
cursor position, matching an interaction specified via a Figma Make reference implementation
(`src/app/HomeHero.tsx` in fileKey `myqsxGwnrcNHEdsE2SFZXk`, the same file phase 16f's Services
hover was built from) and a generic codepen pattern the user supplied directly.

## What Changes

- Desktop only (`lg:` / ≥1024px, this project's breakpoint convention). Mobile is unchanged —
  the existing `MastPhotoCycle` auto-dissolve stays as-is.
- A new mousemove-driven "ghost" image trail scoped to the desktop Hero `<section>`: once the
  cursor has moved ≥85px since the last spawn, a 240×360px portrait photo mounts centered on
  the cursor, tilted by a small random angle, fades/scales in over 0.22s, then fades/scales out
  over 0.65s as soon as the next ghost spawns (only one ghost visible at a time). The same spawn
  logic re-fires on scroll, replayed against the last known cursor position, while that position
  is still within the hero's bounds.
- Images cycle round-robin through the 5 existing hero photos already in
  `public/images/home/` (`hero-1.jpg`–`hero-5.jpg`) — no new asset export.
- `prefers-reduced-motion` disables the spawn/animation, same precedent as `MastPhotoCycle`.
- No new npm dependency — implemented with React state, CSS transitions, and
  `requestAnimationFrame`, not GSAP (the codepen reference uses GSAP, but the Make file's own
  tuning is pure CSS and is the actual spec; this repo has no animation library and isn't
  adding one for this).
- **Explicitly out of scope**: the Make file's separate `GlobalCursor.tsx` (a site-wide custom
  cursor dot that replaces the pointer on every page). That is a different, unscoped effect the
  user confirmed is not part of this phase.

## Capabilities

### New Capabilities
- `home-hero-cursor-trail`: desktop-only cursor-driven image trail on the Home page's Hero
  section, independent of the existing collage, headline, and mobile Mast behavior.

### Modified Capabilities
(none — the existing collage, headline, scroll label, and CTA content are unchanged)

## Impact

- `app/[locale]/_components/HomeHero.tsx` — desktop branch only; composes a new trail
  component alongside the existing collage.
- `app/[locale]/_components/` — new page-local component (parallel to `MastPhotoCycle.tsx`)
  implementing the trail; single consumer, not promoted to `app/_components/`.
- `public/images/home/` — no new assets; reuses `hero-1.jpg`–`hero-5.jpg`.
- `openspec/DECISIONS.md` — records this as a derived/user-specified interaction (no canonical
  Figma prototype reaction exists for it, same category as D106/D121) and the coordinate-
  scoping choice relative to the `canvas-1440` scaled collage (D040).
- `openspec/reference/roadmap.md` — phase 16g row added.
- No change to `app/_components/INVENTORY.md` — the new component remains page-local.

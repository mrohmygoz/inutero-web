## 1. Component

- [x] 1.1 Create `app/[locale]/_components/HeroCursorTrail.tsx` ("use client"), sibling to
      `MastPhotoCycle.tsx`: a `ghosts` state array, an incrementing image index round-robining
      `hero-1.jpg`–`hero-5.jpg`, and a `spawnGhost(x, y)` callback gated by the 85px movement
      threshold (see design.md → Decisions).
- [x] 1.2 Implement the spawn/fade mechanic: new ghost mounts at `opacity:0, scale:0.94`, flips
      to `opacity:0.88, scale:1` two `requestAnimationFrame`s later
      (`transition: opacity 0.22s ease-out, transform 0.22s ease-out`); the previous ghost is
      immediately flagged hidden (`transition: opacity 0.65s ease-in, transform 0.65s
      ease-in`, `opacity:0, scale:0.94`) and removed from the DOM 700ms later. Give each ghost
      a small random rotation (`(Math.random() - 0.5) * 10` degrees).
- [x] 1.3 Attach the mousemove handler to the component's own wrapping `<div>`/`ref`, computing
      ghost position from `getBoundingClientRect()` — not from a coordinate space inside
      `canvas-1440`. Add a `scroll` listener that re-runs the spawn check against the last
      known pointer position, only while that position is still within the wrapper's bounds.
- [x] 1.4 Respect `prefers-reduced-motion`: short-circuit the mousemove/scroll handlers before
      spawning when the media query matches, matching `MastPhotoCycle`'s existing pattern.
- [x] 1.5 Mark the ghost layer `aria-hidden`, `pointer-events-none` on every ghost `<img>`, so
      it never intercepts clicks on the headline, CTAs, or scroll label.

## 2. Integration

- [x] 2.1 In `HomeHero.tsx`, compose `<HeroCursorTrail />` inside the desktop
      (`hidden bg-(--color-basic-accent) lg:block`) section only, as a sibling to the
      `canvas-1440` div (not nested inside it) so ghost sizing stays independent of the
      collage's scale transform. Do not touch the mobile (`lg:hidden`) section.
- [x] 2.2 Confirm z-index/stacking places ghosts above the collage photos but does not obscure
      interaction with the headline text's `mix-blend-hard-light` rendering or the CTA/scroll
      label hit areas.

## 3. Decisions & docs

- [x] 3.1 Record the next decision (D122) in `openspec/DECISIONS.md`: no canonical Figma
      prototype reaction exists for this interaction (same category as D106/D121), citing the
      Figma Make reference (`fileKey myqsxGwnrcNHEdsE2SFZXk`, `src/app/HomeHero.tsx`) and the
      user-supplied codepen pattern reference, the `GlobalCursor.tsx` exclusion, and the
      coordinate-scoping choice relative to `canvas-1440` (D040).
- [x] 3.2 Append the phase-16g row to `openspec/reference/roadmap.md`'s phase table and tick it
      once done.
- [x] 3.3 Confirm no `app/_components/INVENTORY.md` update is needed — `HeroCursorTrail` stays
      page-local, single consumer, same precedent as `MastPhotoCycle`.

## 4. Verification

- [x] 4.1 At 1440px, both `/en` and `/zh`: move the cursor across the Hero and confirm photos
      spawn centered on the pointer at roughly the 85px threshold, each fading/scaling in then
      out as the next one spawns (only one visible at a time), cycling through the 5 hero
      photos; scroll the page with the pointer stationary over the hero and confirm the trail
      still reacts.
- [x] 4.2 At 1440px, confirm the trail never blocks clicks on the headline, "View our work" /
      "Work with us" CTAs, or the scroll label.
- [x] 4.3 At 393px, both `/en` and `/zh`: confirm the mobile Hero (`MastPhotoCycle`) is
      pixel-for-pixel and behaviorally unchanged by this phase.
- [x] 4.4 Toggle `prefers-reduced-motion: reduce` (devtools or OS setting) and confirm no ghost
      ever spawns at 1440px.
- [x] 4.5 `npm run lint`
- [x] 4.6 `npx tsc --noEmit`

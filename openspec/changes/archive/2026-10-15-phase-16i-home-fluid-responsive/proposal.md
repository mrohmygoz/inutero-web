## Why

Home's three above-the-fold sections (Hero, Mission/Intro, Services) have no Figma frame below
1440px — D040 only committed to "placed canvas scales, flow sections reflow" and explicitly
accepted the cost: *"the intro heading reflows to more lines than the design draws... and the
section grows taller."* That cost is now visibly wrong in the browser: Hero's `.canvas-1440`
caps at 1440px and letterboxes with gutters on wider screens instead of filling them, and
Intro's auto-wrapping heading collides with its overlapping photo once it wraps past 3 lines
(confirmed via side-by-side screenshots against the designer's own Figma Make build,
`fileKey myqsxGwnrcNHEdsE2SFZXk`). This project already treats that Make file as the spec
wherever the static Figma has no canonical answer (D106, D121, D122, D123); reading its actual
source (`src/app/HomeHero.tsx`, `src/app/App.tsx`) shows it solves both problems structurally —
`clamp()`-based fluid typography with no fixed-width cap for Hero and Services, and an
interactive cursor-follow photo reveal for Mission instead of a statically anchored overlap.

## What Changes

- **Hero**: remove `.canvas-1440` (D040's uniform-scale wrapper) from `HomeHero.tsx`'s desktop
  branch. Replace the absolute 1440×960-coordinate collage with Make's fluid model: `clamp()`
  headline sizing (72px → 246px, matching the existing Jumbo token's max), `%`-based vertical
  anchors for the headline pairs, fixed-px gutters, and a `min(558px, 42%)`-capped CTA panel.
  No max-width cap — the section fills the viewport at every width above 1024px, matching the
  Make reference exactly rather than centering with gutters beyond 1440px. `HeroCursorTrail`
  and `MastPhotoCycle` are unaffected (D122/D106 already scope them outside the collage).
- **Mission/Intro**: replace the statically anchored overlap photo (`absolute bottom-[-10px]
  left-[50.903%]`) with a new interactive cursor-follow reveal, same family as
  `HeroCursorTrail.tsx` — hidden (`opacity: 0`) until the pointer enters the desktop section,
  then tracks the pointer clamped to the section's bounds, fading in/out. This removes the
  overlap bug by construction: the photo no longer has a fixed position relative to the heading
  block at all. The heading itself gets fluid (`clamp()`) sizing — a derived call, since Make's
  own fixed-180px/fixed-margin heading has no answer below ~1150px either and would overflow
  there; sized to always resolve to 3 lines down to 1024px.
- **Services**: add `clamp()` fluid sizing to the heading and accordion item labels, and
  `clamp()`-based `left`/`width` to the cross-fading background image position, matching Make.
  No structural change — Services is already a flow section with hover cross-fade (D121); this
  phase only tunes its sub-1440 scaling to match the reference instead of linear-interpolating
  by eye.
- **BREAKING** (internal only): `.canvas-1440` in `globals.css` becomes unused once Hero stops
  consuming it — removed, since Intro and Services never used it (D042) and no other section
  does.
- `openspec/DECISIONS.md` gains an entry establishing the Figma Make file as the spec for Home's
  sub-1440px responsive behavior specifically, superseding D040's accepted costs for these three
  sections (not project-wide — other pages/sections are unaffected).

## Capabilities

### New Capabilities
- `home-mission-cursor-reveal`: desktop-only cursor-driven photo reveal on the Home page's
  Mission/Intro section, replacing the previous static overlap positioning.

### Modified Capabilities
(none — no existing capability spec covers Hero/Services layout or sizing; the fluid-scaling
work on those two sections is an implementation-technique change with no new or altered
user-facing requirement, so it is not spec-tracked. `home-services-hover`'s existing hover
requirements are unchanged by this phase.)

## Impact

- `app/[locale]/_components/HomeHero.tsx` — desktop branch restructured: `.canvas-1440` removed,
  absolute 1440-coordinate children replaced with `clamp()`/`%`-based fluid positioning.
- `app/[locale]/_components/HomeIntro.tsx` — desktop branch: static overlap image replaced by a
  new cursor-follow component; heading sizing becomes fluid.
- `app/[locale]/_components/` — new page-local component for the Mission cursor reveal (parallel
  to `HeroCursorTrail.tsx`), single consumer, not promoted to `app/_components/`.
- `app/[locale]/_components/HomeServices.tsx` — fluid sizing added to heading, accordion labels,
  and the cross-fade image's position; no structural change.
- `app/globals.css` — `.canvas-1440` and its scale-transform rule removed.
- `openspec/DECISIONS.md` — new entry (Make-as-spec for Home sub-1440 behavior, superseding
  D040's accepted costs for Hero/Intro/Services only) plus an entry for the new cursor-reveal
  interaction, same shape as D122.
- `openspec/reference/roadmap.md` — phase 16i row added.
- No change to `app/_components/INVENTORY.md` — new component remains page-local.

# Phase 6 — Home part 2 (Services + Featured Projects + CTA)

## Why

Phase 5 built Home's top half. `/en` and `/zh` currently end after the Intro and fall straight
into the Footer — the phase boundary, not a defect. This phase closes Home: the Services
accordion (核心服務), the Featured Projects preview (專案精選), and the `UniversalCTA` block
(行動呼籲) that Phase 4 already built but has never been placed on a real page. Home is the
first page in the deck to reach 100%.

## What Changes

- **`HomeServices`** — new page-local section. Desktop EN `12210:2346` (1440×1535), desktop TC
  `0:268` (1440×1377); mobile EN `10275:2585` (393×1026), mobile TC `12368:4727` (393×798).
  Structure is the same at both breakpoints: rotated `Services` eyebrow tag, a display heading,
  a photograph, a four-item accordion overlaying that photograph, and a `full services list`
  CTA. The two breakpoints differ in arrangement, not content — desktop puts the heading full
  width and floats the 900px accordion over a 620×767 image on the right; mobile stacks
  heading → image, with the 369px accordion overlaying the image's lower two-thirds.
- **The accordion is interactive** — one item open at a time, item 1 open on load, per the
  user's decision at proposal time. Figma draws only that single state; the per-item 36px icon
  is the affordance it already shows. This makes `HomeServices` the first client component
  outside `Nav`. The behavior is **derived** (D005) — no second-state frame exists — and is
  recorded as a decision rather than reported as matching the design.
- **`HomeFeaturedProjects`** — new page-local section. Desktop EN `12210:2392` (1440×1114),
  desktop TC `0:313`; mobile EN `10275:3132` (393×2384), mobile TC `12368:2418` (393×2318).
  Rotated `Portfolio` eyebrow + `FEATURED PROJECTS` heading, three project cards scattered at
  different offsets and slight rotations, and a centered `VIEW ALL PROJECTS` CTA. Composes the
  existing **`ProjectCard`** shared component (`app/_components/ProjectCard.tsx`) — the scatter
  and rotation live in per-card wrappers, not in the card. No new shared component.
- **`UniversalCTA` placed on Home** — desktop instance `12612:11943` / `0:373`, mobile symbol
  `12212:5282`, TC instance `12368:2429`. The component exists and renders on `/styleguide`;
  this phase renders it on a page for the first time. No changes to the component are expected.
- **Home copy for both sections, both locales** — from `openspec/reference/content-matrix.md`
  → Home (D032). This includes the four service summary descriptions and the three project
  card blurbs, both of which are still **Lorem ipsum in Figma** — the matrix supplies the real
  copy and outranks the text layers.
- **Section photography and card imagery** — exported from Figma with `download_assets` into
  `public/`: the Services `image 26` (mobile `12368:4729`, desktop container `12210:2383`) and
  the three Featured Projects card images. Per the user's decision, all three card images come
  from Figma as currently drawn; Phase 11 replaces them with the MDX-backed originals. No
  placeholder rectangles (D-G).
- **`app/[locale]/page.tsx`** — renders `HomeHero` → `HomeIntro` → `HomeServices` →
  `HomeFeaturedProjects` → `UniversalCTA`, and the stale Phase 5 boundary comment is removed.
- **Mobile hero photo cycle** — folded into this phase on the user's direction, correcting a
  Phase 5 omission rather than adding new scope. The mobile `Mast` (`10275:3101`) is a **five**-
  variant set — `Default` `10275:3093` plus `Variant2` `10275:3102`, `Variant3` `10275:3109`,
  `Variant4` `10275:3115`, `Variant5` `10275:3121` — all 393×665 with an identical headline
  lockup, differing only in the photograph. Phase 5 shipped `Default` alone and left the section
  a still image. `HomeHero`'s mobile subtree gains the cycle and the four missing photographs are
  exported. **Desktop is untouched** — its hero is a static three-photo collage with no variant
  set and no timed reaction.

  **This is designed, not derived.** Each variant carries a prototype reaction, read off the
  nodes directly: `AFTER_TIMEOUT` at **0.8s** → `CHANGE_TO` the next variant, transition
  `DISSOLVE`, easing `LINEAR`, duration **0.2s**, wrapping `Variant5` → `Default`. One photo per
  second, five-second loop. Implement those values; do not substitute a slower, more "editorial"
  timing. `get_motion_context` returns empty here because it reports timeline keyframes, not
  prototype reactions — the reactions were read via the Plugin API and are recorded in design.md.
  The only part still undesigned is `prefers-reduced-motion`, decided in design.md.
- **`openspec/DECISIONS.md`** — gains this phase's derived calls: accordion interaction model,
  where the Home service items and project cards link given that `/services` has no anchors and
  no portfolio slugs exist yet, and how the card scatter is expressed responsively.

**Explicitly out of scope.** The Services *page* (`/services`, Phases 8–9) is untouched — the
Home accordion is a summary, and its four items reuse the summary copy from the matrix, not the
long service descriptions. Real portfolio content and `/portfolio/[slug]` routes stay Phase 11.
The Vol.3 poster in the sheet's Dropbox folder is **not** fetched this phase. The floating
desktop `MENU` square (`12423:8613` / `0:504`) remains deferred per D039.

## Capabilities

### New Capabilities

None. This phase implements three sections of a finished design onto an existing route. It adds
no route, no build-time contract, and no behavior a spec would describe — `localized-routing`
already covers `/en` and `/zh` resolving, and `design-primitives` already covers `Cta`,
`ProjectCard`, and `UniversalCTA`. The accordion's open/close behavior is section-local UI
state, not a system requirement.

### Modified Capabilities

None.

`skip_specs: true` is set in this change's `.openspec.yaml` accordingly, per the guidance to
prefer opting out over inventing a requirement to satisfy validation.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/page.tsx` | Two sections + `UniversalCTA` appended; Phase 5 boundary comment removed |
| `app/[locale]/_components/HomeHero.tsx` | Mobile subtree gains the five-photo dissolve cycle; becomes `'use client'`. Desktop collage untouched. |
| `app/[locale]/_components/HomeServices.tsx` | New — `'use client'` (accordion state) |
| `app/[locale]/_components/HomeFeaturedProjects.tsx` | New — server component |
| `app/_lib/i18n` | Services and Featured Projects strings for `en` and `zh` |
| `public/` | Services photograph + three project card images + four mobile hero photographs |
| `app/_components/ProjectCard.tsx` | Composed as-is; touched only if the Home occurrence needs a prop it does not have |
| `app/globals.css` | Only if a token in `design-tokens.md` is not yet wired into `@theme` |
| `openspec/DECISIONS.md` | Appended decisions, continuing from D040 |
| `app/_components/INVENTORY.md` | Updated only if `ProjectCard`'s row changes; no new shared component is introduced |

No dependency changes. No API routes. Nothing is removed.

**User verifies:** `/en` and `/zh` at 393px and 1440px — Home now runs hero → intro → services
→ featured projects → green CTA → footer with no gap, the accordion opens and closes, and the
`VIEW ALL PROJECTS` / `full services list` buttons navigate.

## Addendum — prototype motion and card corrections (post-gate, 2026-08-03)

Added after the review gate, on the user's direction, before archiving. Four commits
(`5fde4cd`, `ce5133c`, `1ab082d`, `777ecbb`).

The gate report claimed the accordion interaction was *Derived* and that Featured Projects had no
motion. **Both were wrong**, and the cause was a single bad method: the phase checked
`get_motion_context` and the frame roots, which report timeline keyframes only. A deep
`node.reactions` sweep and the user's prototype recordings showed the design specifies far more.

- **The Services accordion is animated and designed** — the mobile section is a component set
  (`10275:2617`) with one variant per open item, and every item carries `ON_CLICK` → `CHANGE_TO`
  with `SMART_ANIMATE / EASE_OUT / 0.3s`. It shipped snapping. Now a 300ms ease-out
  `grid-template-rows` transition with cross-fading `+`/`×` glyphs. D041 corrected in place.
- **Featured Projects cards stack on scroll** — the heading pins and each card slides up over the
  previous. No API surface exposes this; it was built from the user's recordings and stays
  **Derived**. `overflow-x-clip` is load-bearing: `overflow-hidden` would silently kill `sticky`.
- **`ProjectCard` rendered the wrong order**, corrected twice. Home's desktop card `12210:2404`
  matches mobile; the image-first `12610:6812` is the **Portfolio page's** card — a different
  design that Phase 10 must reconcile with a variant prop, not a breakpoint switch.
- **The card image is now an aspect ratio, not a fixed height** — `h-96` against a ~400px desktop
  card was near-square and `object-cover` cropped the posters badly.
- **Both Featured Projects CTAs were the wrong tone** — `10275:3147` and `12358:2031` are green,
  and were built dark.

D046 and D047 added; D041 rewritten. The user's hand-tuned card spacing was preserved across the
restructure rather than reverted to the drawn values.

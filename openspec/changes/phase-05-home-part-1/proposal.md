# Phase 5 — Home part 1 (Hero + Intro)

## Why

Phases 1–4 delivered tokens, primitives, the shell, and the shared blocks. Every route is
reachable, but `/en` and `/zh` still render the Phase 1 placeholder — a centered site name and
a stub string. Home is the site's front door, the only page in the deck that carries the dark
NAV, and at 6019px it is one of the pages the phase plan explicitly splits. This phase builds
its top half: the Hero and the Intro (Mission) section, at both breakpoints, in both locales.

## What Changes

- **`HomeHero`** — new page-local section. Desktop EN `12405:6947`, desktop TC `0:187` (inside
  `12635:15868`); mobile EN is two nodes, `10275:3094` (`Mast`) plus `12217:911` (the green copy
  panel), mobile TC inside `12368:2413`. Genuinely responsive, not one tree repositioned:
  desktop overlays three photographs and floats the green panel over the hero's bottom-left;
  mobile is a single full-bleed photo with the green panel stacked beneath it. The headline is
  four staggered display words (`CREATIVE` / `SOULS` / `GLOBAL` / `VISIONS`) alternating white
  and brand green, wrapping the imagery on desktop. Composes the existing `Cta` primitive plus
  a plain underlined text link, and carries a rotated `scroll down` label at the left edge.
- **`HomeIntro`** — new page-local section. Desktop EN `12405:6419`, desktop TC `0:254`; mobile
  EN `12212:6318`, mobile TC inside `12368:2413`. A four-line green display heading with a
  per-line tint ramp, an image overlapping the heading's lower right, and a body paragraph plus
  `Our story` CTA anchored bottom-right on desktop / stacked below the image on mobile. Reuses
  the inline eyebrow-tag treatment (green dot + rotated `Mission` label) already established by
  `TitleGroup`, rather than introducing a second one.
- **Home page composition** — `app/[locale]/page.tsx` stops rendering the placeholder and
  renders `HomeHero` + `HomeIntro`. It passes `theme="dark"` to `Nav` per D017, because both
  desktop Home frames instance `Desktop NAV/DARK`.
- **Home copy in both locales** — the hero and intro strings enter `app/_lib/i18n` from
  `openspec/reference/content-matrix.md`, which outranks the Figma text layers (D032). Two rows
  differ from what the frames draw: the hero body ends `…international touring and promotion`
  (Figma says `live production`), and the ZH intro heading is `根植本土，前進世界。` where the TC
  frame still draws the older, longer Chinese line. The hero headline itself stays English in
  both locales — that is what the TC frame shows and what the matrix marks `keep EN`.
- **Hero and intro photography** — exported from Figma with `download_assets` into `public/`.
  Four raster assets: `image 29` / `image 30` / `image 31` in the desktop hero, the mobile
  hero's full-bleed photo, and `image 21` in the Intro. No placeholders — this phase is meant
  to be reviewed in a browser.
- **`openspec/DECISIONS.md`** — gains the three calls this phase is forced to make: the deferred
  desktop `MENU` button, the ZH intro heading reflow, and hero sections living page-local rather
  than in `app/_components/`.

**Explicitly out of scope**, and left for Phase 6: the Services section (`12210:2346`), Featured
Projects (`12210:2392`), and placing `UniversalCTA` on Home. `Footer` already renders from the
locale layout and is untouched. Until Phase 6 lands, `/en` ends after the Intro and falls
straight into the Footer — that is expected, not a defect.

The floating green `MENU` square (`12423:8613` desktop EN, `0:504` desktop TC) is **not built**.
It sits outside the Hero frame at the Hero/Intro boundary and implies a scroll-driven desktop
nav, but the panel it would open has no verified design — Phase 3 found the desktop expanded-menu
frame to be a stray documentation duplicate. Recorded as deferred, revisited in the Polish phase.

## Capabilities

### New Capabilities

None. This phase implements two sections of a finished design. It adds no route, no build-time
contract, and no behavior a spec would describe — `localized-routing` already covers `/en` and
`/zh` resolving, and `design-primitives` already covers the `Cta` this phase composes.

### Modified Capabilities

None.

`skip_specs: true` is set in this change's `.openspec.yaml` accordingly, per the guidance to
prefer opting out over inventing a requirement to satisfy validation.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/page.tsx` | Placeholder body replaced by `HomeHero` + `HomeIntro`; `Nav` theme set to dark |
| `app/[locale]/_components/HomeHero.tsx` | New |
| `app/[locale]/_components/HomeIntro.tsx` | New |
| `app/_lib/i18n` | Home hero + intro strings added for `en` and `zh` |
| `public/` | Four exported photographs |
| `app/globals.css` | Only if a token in `design-tokens.md` is not yet wired into `@theme` |
| `openspec/DECISIONS.md` | Three appended decisions |
| `app/_components/INVENTORY.md` | Unchanged — no shared component is introduced |

No dependency changes. No API routes. Nothing existing is removed beyond the Phase 1 placeholder
copy, whose dictionary key becomes unused and is deleted with it.

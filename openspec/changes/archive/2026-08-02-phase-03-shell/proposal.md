## Why

Phase 2 shipped ten primitives, but nothing composes them and the site is still a single page.
Every one of the nine routes wears the same NAV and Footer, so building them per-page would
guarantee nine drifting copies of the two most-visible components on the site.

Phase 3 builds the shell — NAV and Footer, both locales, both themes, both breakpoints — and
stands up all nine routes as stubs so the shell is navigable end to end. This is also the last
phase in which the route table is cheap to change (D003), so the URL shape locks here.

## What Changes

- **`Nav`** in `app/_components/` — the site header. One responsive component covering the
  393px and 1440px designs, both locale variants, and both the light and dark themes. It
  contains the primary route links, the logo, the locale switcher, and the mobile expanded
  menu state.
- **`Footer`** in `app/_components/` — one responsive component, `Default` + `TC` variants.
- **`app/_lib/routes.ts`** — a single typed route table derived from
  `openspec/reference/routes.md`, so NAV, Footer, the locale switcher, and every later page
  read the same list rather than hardcoding paths.
- **Locale switcher** — swaps `/en/x` ↔ `/zh/x` preserving the current path. Route slugs stay
  English in both locales (D003, reconfirmed by the user for this phase).
- **Eight new stub routes** under `app/[locale]/`: `about`, `services`, `portfolio`,
  `portfolio/[slug]`, `artists`, `news`, `news/[slug]`, `contact`. Each renders its localized
  display name from `routes.md` plus the shell, and nothing else — page bodies are phases 7–15.
- **`app/[locale]/layout.tsx`** starts rendering `Nav` and `Footer` around `children`.
- **`app/_lib/i18n/{en,zh}.ts`** gains the nav labels, footer copy, and stub page titles.
- **`/styleguide`** gains a Nav + Footer section so both are reviewable in isolation, including
  the dark NAV over a stand-in dark surface.
- **`INVENTORY.md`** gains two entries; **`DECISIONS.md`** gains the phase's decisions —
  principally that the NAV theme is a static per-page prop, not a scroll-driven behavior.

### Figma nodes in scope

| Component | Desktop | Mobile |
| :--- | :--- | :--- |
| NAV (light) | `12653:5366` — EN `12573:10177`, CN `12653:5367` | `12219:1100` |
| NAV (dark) | `12653:5259` — EN `12573:10140`, CN `12653:5260` | derive from instance — no separate mobile dark definition |
| NAV expanded / menu state | `12612:8541` (EN), `12635:12923` (TC) | `10270:2118` (EN), `12368:2386` (TC) |
| Footer | `12635:16158` — Default `12573:9181`, TC `12635:16558` | `12384:4852` |
| Logo | read from within the NAV nodes | `10275:3087` |

Per D012, desktop appearances are surveyed across at least two occurrences rather than trusted
from a single node.

### Explicitly out of scope

| Item | Why |
| :--- | :--- |
| `UniversalCTA` `12653:5649`, `NewsletterSignup` `12612:8163`, `Article` body renderer `CMS` `12610:7361` | Phase 4 |
| MDX pipeline and real detail-page content | Phase 4 sets up the pipeline; Phases 11/14 supply content. The `[slug]` stubs here use a placeholder param. |
| Any page body beyond a localized title | Phases 5–15 |
| `Mast` `10275:3101`, `Tab` `10275:2552` | Section-level compositions belonging to their page phases |
| Scroll-driven NAV theme transitions | See design.md — the theme is a static prop this phase |
| Per-page `generateMetadata` beyond title + `hreflang` | Phase F polish owns full metadata |

## Capabilities

### New Capabilities

_None._ NAV and Footer are visual implementations of a finished design; their appearance is
not a spec (the Figma file is its source of truth). What is behavioral — routing and locale —
already has a spec.

### Modified Capabilities

- `localized-routing`: gains requirements that were unstated while only `/` existed — the full
  nine-route table must resolve under both locale prefixes, every page must expose its
  cross-locale counterpart via a switcher and via `hreflang`, and an unknown route under a
  valid locale prefix must 404 rather than render an empty shell.

## Impact

| Area | Change |
| :--- | :--- |
| `app/_components/` | Two new components (`Nav`, `Footer`) + INVENTORY entries |
| `app/[locale]/` | Eight new route directories; `layout.tsx` now renders the shell |
| `app/_lib/routes.ts` | New — typed route table shared by nav, footer, switcher, metadata |
| `app/_lib/i18n/{en,zh}.ts` | Nav/footer/page-title keys added to both locales in the same change (D010) |
| `app/styleguide/` | New shell specimens section |
| `app/globals.css` | `@theme` additions only if the shell consumes an unmapped token. No raw values. |
| `openspec/specs/localized-routing/` | Delta spec adds route-coverage and locale-switch requirements |
| `openspec/DECISIONS.md` | NAV theme mechanism, `[slug]` stub strategy, tablet nav behavior |
| Dependencies | None added |
| Routes | 8 added × 2 locales |

## Verification

The user opens `/en` and clicks every link in the NAV and the Footer — nothing 404s. They use
the locale switcher on a non-home page and land on the same page in the other locale. They
repeat at 393px, where the NAV collapses to its menu, and confirm the expanded menu matches
the mobile NAV frame. `/styleguide` shows the light NAV, the dark NAV, and the Footer in both
locales for side-by-side comparison against the Figma frames.

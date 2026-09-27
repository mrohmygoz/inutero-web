# Phase 9 — Services part 2

## Why

Phase 8 shipped the Services header and the four service cards, then stopped. The page
currently runs straight from the fourth card into the Footer with no FAQ and no closing CTA —
the two sections the Figma frames draw below `ServicesList`. This phase finishes the page.

It also settles the one question Phase 8 deferred to this gate: whether the Footer's Services
sub-links deep-link into this page or stay whole-page links. That could not be answered until
the page was complete, and now it is.

## What Changes

### Sections built

- **FAQ** — an accordion, five items, item 1 open on load, one open at a time. A two-column
  split at desktop (heading left, rows right) and a stack at mobile. Appends below
  `ServicesList`.
- **Closing CTA** — composes the existing `UniversalCTA` (Phase 4). No new component; this is a
  call site, and it is the last element before the Footer in all four frames.

### Copy

The FAQ block enters `app/_lib/i18n/{en,zh}/services.ts`, which Phase 8 deliberately left
without it. Source is `openspec/reference/content-matrix.md` → *Services — FAQ* (D032), which
**replaces the Figma question set entirely** — the sheet shifted each answer up one row against
the Figma question beside it and dropped one, and Figma's Q3 carries an explicit `直接刪掉`.

**Five items ship, not six.** The matrix's sixth row is still `待補` from the client. It is
omitted rather than rendered as a placeholder (user decision, this gate) — Figma also draws
exactly five rows, so omitting it matches the frames. It stays tracked in the matrix's
outstanding-copy table.

### Shared-file edits

Two, both small, both with a recorded decision:

- **`app/_components/AccordionPanel.tsx` (new).** D041 pre-committed that a second consumer with
  a verified design is the bar for promoting Home's accordion out of `app/[locale]/_components/`.
  This FAQ is that consumer — but the audit finds the two share *mechanics only*, not design.
  Only the headless panel wrapper is promoted (user decision, this gate); every visual choice
  stays with the consumer. Gets an `INVENTORY.md` entry.
- **`Footer.tsx` + `ServicesList.tsx`.** The four Services sub-links stop pointing at the whole
  `/services` route (D-G) and deep-link to the four service cards, which gain anchor `id`s
  (user decision, this gate). Note the Footer carries **four** such links, not the five the
  roadmap's Inherited Work row says — they map 1:1 onto the four cards, so no link is left over.

### Explicitly not in scope

- Phase 10 (Portfolio). The page ends here.
- Any change to `ServiceCard`, `ServicesHero`, or the hero padding Phase F already owns.
- `UniversalCTA`'s own design. It is built and verified; this phase places it.

## Figma nodes

Sourced from `openspec/reference/design-inventory.md` (page frames) and confirmed by a
`get_metadata` sweep of all four.

| Section | Desktop EN | Desktop TC | Mobile EN | Mobile TC |
| :--- | :--- | :--- | :--- | :--- |
| Page frame | `12612:8668` | `12635:12925` | `12220:2064` | `12368:2814` |
| FAQ | `12573:6686` | `I12635:12925;12573:6686` | `12220:2269` | `12368:2828` |
| CTA | `12573:9015` | `I12635:12925;12573:9015` | `12220:2432` | `12389:5918` |

Drawn section heights, which the build is measured against:

| Section | Desktop EN | Desktop TC | Mobile EN | Mobile TC |
| :--- | ---: | ---: | ---: | ---: |
| FAQ | 756.69px | 660.68px | 1067.25px | 793.25px |
| CTA | 780px | 780px | 734px | 734px |

Both locales' desktop FAQ rows sit in a 624px column at x=752; the heading column is 688px wide
at x=32. TC is ~96px shorter at desktop because `常見問題` sets on one line where
`COMMON QUESTIONS` wraps to two, and ~274px shorter at mobile for the same reason plus a
shorter open answer.

## Capabilities

### New Capabilities

None. This is UI implementation against a finished design; `skip_specs: true` is set in
`.openspec.yaml`, consistent with every page phase since Phase 5.

### Modified Capabilities

None.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/services/page.tsx` | Renders `ServicesFaq` then `UniversalCTA` below `ServicesList`; the Phase 8 placeholder comment is removed |
| `app/[locale]/services/_components/ServicesFaq.tsx` | New, `'use client'` — the accordion |
| `app/[locale]/services/_components/ServicesList.tsx` | Anchor `id` per card |
| `app/_lib/i18n/{en,zh}/services.ts` | New `faq` block — eyebrow, heading, five Q/A pairs |
| `app/_components/AccordionPanel.tsx` | New, promoted from `HomeServices` |
| `app/[locale]/_components/HomeServices.tsx` | Imports the promoted panel instead of defining it |
| `app/_components/Footer.tsx` | Four Services sub-links repointed at anchors |
| `app/_components/INVENTORY.md` | `AccordionPanel` entry; `Footer` and `UniversalCTA` notes updated |
| `openspec/DECISIONS.md` | New entries for the four decisions this phase makes |
| `openspec/reference/roadmap.md` | Tick Phase 9; close the Footer sub-links Inherited Work row |

No new dependencies. No route changes. No token changes expected — if the FAQ needs a value that
`design-tokens.md` does not carry, that is a finding to report, not a token to invent.

## User verifies

At `/en/services` and `/zh/services`, 393px and 1440px:

1. The FAQ section renders below the fourth service card, with the first question open.
2. Clicking a closed question opens it and closes the open one; the panel animates rather than
   snapping.
3. The green CTA block sits between the FAQ and the Footer.
4. The four Services links in the Footer scroll to their matching service card rather than
   reloading the page.

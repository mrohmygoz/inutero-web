# Phase 12 — Featured Artists

## Why

`/[locale]/artists` is still a `PagePlaceholder`. It is the next unbuilt page in roadmap order
and the last of the three filter-driven listing pages (Portfolio, Artists, News) — `Tag`,
`ArtistCard`, and the filter/empty-state pattern Phase 10 established are already built and
waiting for their second and third consumers.

## What Changes

### Sections built

- **Header** — the `OUR PARTNERS` / `keep EN` eyebrow and the `FEATURED ARTISTS` / 合作藝人
  display heading. Figma's description paragraph (`12220:1079`, `12220:1082`) is **removed**
  per the matrix's `直接刪除`, the same instruction Portfolio's header carried.
- **Filter + grid** — the same five service-line tags Portfolio and Footer already use
  (`serviceAnchors`), reusing Portfolio's derived filter behaviour (client-side, single-select,
  `All` default, empty-state line) rather than re-deriving it.
- **Artist cards** — `ArtistCard` (built Phase 3, zero consumers so far) renders the 8 real
  artists supplied by the matrix.
- **Closing CTA** — `UniversalCTA`, placed unmodified, per `routes.md` → Shared Sections.

### Content

**8 artists ship, not 16.** Figma draws 16 card slots across its desktop and mobile frames;
the matrix supplies full Chinese copy for exactly 8, tagged with their 服務項目 (which map onto
the same four service lines Portfolio's filter uses). Figma's slot count is a drawn sample,
same finding as Portfolio's 11-vs-5 disagreement — not a target to fill.

**English artist bios are `待補` for all 8** — the matrix has no English column for this
section. Following the precedent D032 records for Portfolio's card copy (「可以先用AI製作中文內容
提供中文版示意」 read in reverse), English bios are AI-generated from the Chinese, marked
explicitly as placeholder, non-final copy — not left blank, since a real page cannot ship with
half its cards mid-locale.

**Press photos** — the matrix links one press photo per artist (8 total), owed to this phase
per `content-matrix.md` → Assets. Exported via `download_assets` into `public/images/artists/`.
Where a specific artist's asset cannot be resolved from the Figma file, `ArtistCard`'s existing
neutral placeholder path covers it (same fallback `ProjectCard` already uses) rather than
blocking the phase.

### Derived behaviour — reused from Portfolio, not re-derived

The filter row, tag ids, and empty-state copy line reuse Portfolio's D083/D085 findings
directly: no prototype exists on any of the four Artists frames either (to be confirmed by
the design.md sweep), and inventing a second filter interaction for the same five tags would
contradict D077's "one source, no drift" reasoning.

### Explicitly not in scope

- Individual artist detail pages — no such route exists in `routes.md`; Featured Artists is a
  single listing page.
- Any change to `ArtistCard`, `Tag`, `UniversalCTA`, `Footer`, or the filter mechanics beyond
  wiring this page's tag set — those are Portfolio's shipped implementations, reused as-is.
- The floating desktop `MENU` square, if it recurs on this frame — D045 owns it.
- Real English artist bios — they do not exist yet; flagged here as AI-placeholder, same as
  Portfolio's English project copy.

## Figma nodes

Sourced from `openspec/reference/design-inventory.md`. To be confirmed/expanded by a
`get_metadata` sweep of all four frames during design.md.

| Section | Desktop EN | Desktop TC | Mobile EN | Mobile TC |
| :--- | :--- | :--- | :--- | :--- |
| Page frame | `12612:8774` | `12635:12928` | `12211:3608` | `12368:2593` |
| Header (to locate) | — | — | — | — |
| Filter tags | `12220:1059,1061,1062,1063,1064` (mobile) | — | — | — |
| Card | `12592:6786` (desktop) | — | `12220:1114` | — |
| Card slots | `12220:1113, 1114, 1147` (16 slots) | — | — | — |

**Known height difference:** mobile EN is 5115px vs. mobile TC 3416px for this page (per
`design-inventory.md` → Bilingual Structure) — a real layout difference, not copy swap. The
design.md sweep must fetch both mobile frames rather than assuming parity.

## Capabilities

### New Capabilities

None. This is UI implementation against a finished design; `skip_specs: true` is set in
`.openspec.yaml`, consistent with every page phase since Phase 5.

### Modified Capabilities

None.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/artists/page.tsx` | Replaces `PagePlaceholder`; reads the artist roster and renders header → filter/grid → CTA |
| `app/[locale]/artists/_components/ArtistsHero.tsx` | New — eyebrow, heading |
| `app/[locale]/artists/_components/ArtistsGrid.tsx` | New, `'use client'` — filter state, grid, empty state (reuses Portfolio's derived pattern) |
| `app/_lib/artists.ts` | New — 8 real artist records (name, bio EN/ZH, services, photo) |
| `app/_lib/i18n/{en,zh}/artists.ts` | New — eyebrow, heading, filter label, empty-state line |
| `public/images/artists/*` | New — 8 press photos exported from Figma |
| `app/_components/INVENTORY.md` | `ArtistCard`'s first real consumer noted |
| `openspec/DECISIONS.md` | New decisions for the AI-placeholder English bios and the reused filter |
| `openspec/reference/roadmap.md` | Tick Phase 12 |
| `openspec/reference/content-matrix.md` | Mark the 8 artists as supplied; note English bios remain non-final |

No new dependencies. No route changes. `artists` likely joins `darkNavRoutes` if the header
instances a dark NAV — confirmed during design.md, same check Portfolio made.

## User verifies

At `/en/artists` and `/zh/artists`, 393px and 1440px:

1. The header shows the `FEATURED ARTISTS` / 合作藝人 heading with no description paragraph.
2. 8 artist cards render, each with a photo, name, service tags, and bio.
3. Clicking a service-line filter tag narrows the grid; `All` restores all 8; a tag with no
   matching artist shows the empty-state line.
4. The green CTA block sits between the grid and the Footer.

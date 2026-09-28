## Why

`/[locale]/news` is still a `PagePlaceholder`. It is the entry point to Phase 14's News
Details template, which already has a working route (`app/[locale]/news/[slug]`, Phase 4)
carrying one placeholder MDX entry with fabricated Latin-filler body text. The client has now
supplied 14 real press releases (`/Users/ypeng/Documents/Personal/Inutero/web_ref/news/`,
2026.01.28 through 2026.05.13) — real headlines, real bodies, real photos — so this phase can
ship the listing with genuine content instead of `待補` placeholders, and retire the Phase 4
placeholder article rather than carrying it forward.

## What Changes

- Build `/[locale]/news` at both breakpoints, both locales: dark-NAV hero header (tagline +
  heading + body), the five-tag filter row, and the article-teaser grid — existing shared
  `Article` component, no new shared component expected.
- **Scope split, not a new phase**: at 6001px this frame exceeds the project's ~5000px
  single-phase guideline (the same reasoning that split Home into 5/6 and Services into 8/9).
  Pagination and the closing `NewsletterSignup` band are deferred to **Phase 13a**, recorded
  under Inherited Work — this phase ships the header, filter, and real-content grid, which is
  the part reviewable content-first (per this session's actual ask) and the larger of the two
  halves.
- **Content ingestion**: all 14 client press releases become MDX entries under
  `content/news/{en,zh}/`. ZH bodies preserve the original press release text exactly
  (client-authored, not to be rewritten); EN bodies are new translations of the same content.
  Each entry is tagged with one of the four real filter categories (see design.md).
- **Filter mechanism is derived** (no Figma prototype exists on any News frame's tag row,
  matching the finding on Portfolio/Artists) — reused verbatim from Portfolio's single-select,
  `All`-default, client-side mechanism (D-B, `phase-10-portfolio/design.md`), with News's own
  tag taxonomy (`All / Artists & Works / Global Touring / Events / About In Utero` — the one
  tag set that is *not* the four service lines, per `content-matrix.md`).
- **Retires the Phase 4 placeholder article** `taipei-indie-goes-abroad` — superseded by the
  real 2026.05.13 press release for the same underlying story (In Utero's free community tour
  with Huan Huan), closing most of the roadmap's outstanding `sample-live.jpg` deletion row
  (the styleguide's own `BlockSpecimens` reference is untouched — out of scope here).
- Real photos from each press release's supplied assets replace the grid's placeholder image
  state.

## Capabilities

### New Capabilities

None. This is UI implementation against a finished design plus content authoring; the filter
and pagination mechanisms are derived interaction, recorded in `DECISIONS.md` rather than as
spec requirements — consistent with every listing-page phase since Phase 10.

### Modified Capabilities

None.

## Impact

- `app/[locale]/news/page.tsx` — replaces `PagePlaceholder` with the real page (header, filter,
  grid; no pagination or newsletter band yet — see scope split above).
- New `app/[locale]/news/_components/` — `NewsGrid` (filter + grid, client component, mirrors
  `PortfolioGrid`'s shape minus pagination, which 13a adds).
- `content/news/{en,zh}/` — 14 new MDX entries; `taipei-indie-goes-abroad.mdx` removed from
  both locales.
- `public/images/news/` (new) — press photos exported per article.
- `app/_lib/routes.ts` — new `newsFilters` tag-id/label table, mirroring `serviceAnchors`.
- `openspec/reference/roadmap.md`, `app/_components/INVENTORY.md`, `openspec/DECISIONS.md` —
  updated per phase convention.
- Does **not** touch News Details (`[slug]/page.tsx`) beyond what already renders today's
  MDX via `Cms` — the detail template redesign is Phase 14's.

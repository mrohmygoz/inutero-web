## Why

Phase 13 shipped `/[locale]/news`'s header, filter, and real-content grid, but stopped there
because the full frame (6001px) exceeded the project's ~5000px single-phase guideline. Three
pieces were deferred and recorded under `roadmap.md` → Inherited Work: the paginator (reusing
the shared `Pagination` component already built for Portfolio), the closing `NewsletterSignup`
band, and the "Top News" banner between the header and the filter row — which Phase 13 could
not build at all because the Figma node was empty at the time. A later re-check
(`content-matrix.md`, 2026-09-28) found the node now has real content in three of four frames,
confirmed its purpose ("Top News" — a single featured-article hero), but found the four frames
disagree on which article is featured, leaving an editorial decision this phase must resolve.

## What Changes

- **Pagination**: wire the existing `Pagination` component into `NewsGrid`, mirroring
  `PortfolioGrid`'s pattern exactly — client-side page state, reset to page 1 on filter change,
  `Math.ceil(visible.length / PAGE_SIZE)`. With 16 real articles (vs. Portfolio's 3), the
  paginator becomes reachable in its default state for the first time on this site — no
  page-size workaround needed to verify it.
- **NewsletterSignup band**: place the existing `NewsletterSignup` component below the grid,
  its first real page consumer (previously only shown in `/styleguide`).
- **Top News banner**: build the featured-article hero between `NewsHeader` and `NewsGrid` —
  full-bleed photo, tag chip, headline, date, dark gradient overlay (`12211:4017` mobile;
  `12573:7967` desktop EN; `12573:7968`/`I12635:12929;12573:7967` desktop TC, empty in the
  current TC frame). **Resolves the featured-article decision by config, not derivation**: adds
  an explicit `featuredSlug` field per locale to `app/_lib/i18n/{en,zh}/news.ts`, resolved
  against the `news` manifest at build time (title, date, image, tag pulled live from the MDX
  entry's frontmatter — same "point at a slug, read everything else from the manifest" pattern
  Phase 13b applies to Home). A slug that doesn't resolve in that locale's manifest fails the
  build loudly (`ContentParityError`/thrown, not a silent fallback), consistent with D002.
- Neither addition touches News Details (`[slug]/page.tsx`) or the filter/grid logic Phase 13
  already shipped.

## Capabilities

### New Capabilities

None. Pagination and the newsletter band are existing shared components gaining a new
consumer; the Top News banner is UI implementation against a finished design plus one
build-time config field. Consistent with every listing-page phase since Phase 10, this is
implementation, not new spec-level behavior — the `featuredSlug` resolution rule is recorded in
this phase's own `design.md` and `openspec/DECISIONS.md`, not as a spec requirement.

### Modified Capabilities

None.

## Impact

- `app/[locale]/news/_components/NewsGrid.tsx` — adds `Pagination`, page-index state, reset on
  filter change.
- `app/[locale]/news/page.tsx` — passes a larger article slice (no longer needs to when
  `NewsGrid` paginates), adds the Top News lookup and passes its resolved data down.
- New `app/[locale]/news/_components/NewsTopStory.tsx` (or similar, page-local) — the banner.
- `app/_lib/i18n/{en,zh}/news.ts` — new `featuredSlug` field (and pagination/newsletter copy
  already present in the matrix, not yet wired).
- `app/_components/INVENTORY.md` — `NewsletterSignup`'s and `Pagination`'s "first real
  consumer" notes updated.
- `openspec/DECISIONS.md` — records the featured-article resolution rule.
- `openspec/reference/roadmap.md` — ticks Phase 13a, closes the two Inherited Work rows it owed.

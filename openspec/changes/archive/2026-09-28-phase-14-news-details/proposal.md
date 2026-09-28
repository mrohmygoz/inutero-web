## Why

`/[locale]/news/[slug]` currently renders through `ContentDetail`, a deliberate placeholder
(`app/[locale]/_components/ContentDetail.tsx`) documented in its own docstring as "NOT the
designed detail page." It shows only a bare title, date, MDX body, and `ShareRow` — no hero
image, no tags, no breadcrumb, no related posts, no newsletter band. The real design (Figma
"News Details," desktop 6448px) has never been built. This phase builds it, closing the last
planned-but-undone route on the roadmap before Phase 15 (Contact).

## What Changes

- Build `NewsDetail`, a page-local component parallel to Phase 11's `PortfolioDetail`, and
  route `app/[locale]/news/[slug]/page.tsx` through it instead of `ContentDetail`.
- Add a `NEWS > {title}` breadcrumb matching Portfolio Details' pattern.
- Add the hero section: full-bleed image, title, date, tag chip(s) — News entries carry a
  `tags` array (not Portfolio's single `services` field), so the hero/meta treatment reuses
  `Tag` (solid variant) the way `Article`/`NewsGrid` already do, not `PortfolioDetail`'s
  single-role meta bar.
- Make the hero image configurable per article: extend `frontmatter.ts`'s `heroImage` field
  (currently Portfolio-only, forbidden on news) to also be valid on `news`, optional, falling
  back to the listing `image` when absent — same contract Portfolio already has, letting an
  article use a distinct hero photo instead of reusing its listing-grid poster.
- Reuse `ShareRail` (desktop) and `ShareRow` (both breakpoints) verbatim from Portfolio
  Details — promote `ShareRail` from `[locale]/portfolio/[slug]/_components/` into
  `app/_components/` per the standing INVENTORY note, since it now has a second consumer.
- Build a "Related posts" section using the existing `Article` shell (INVENTORY already
  names News Details as its second consumer) — selection logic derived (shared-tag match,
  falling back to most-recent), since no prototype/reaction exists to confirm one.
- Place `NewsletterSignup` (its second real page consumer, per INVENTORY) as the closing
  "stay connected" band, matching News's own placement pattern from Phase 13a.
- Remove `news/[slug]`'s dependency on `ContentDetail`. Leave `ContentDetail` itself in place
  only if Portfolio Details still needs it — it does not (Phase 11 replaced it there), so this
  phase deletes `ContentDetail.tsx` once News is the last caller gone.
- Verify all four frames (desktop/mobile × EN/TC) — 6448px desktop height likely means the
  hero + hero-meta pass first, related posts + newsletter as a natural second pass within the
  same phase (both are small, reused components, not new design surface).

## Capabilities

### New Capabilities

(none — this is a UI implementation phase against an already-specified route; no new
system behavior, only the designed presentation of an existing MDX-backed page)

### Modified Capabilities

(none)

## Impact

- `app/[locale]/news/[slug]/page.tsx` — swap `ContentDetail` for `NewsDetail`.
- New: `app/[locale]/news/[slug]/_components/NewsDetail.tsx`.
- `app/_components/ShareRail.tsx` — promoted from Portfolio Details' page-local folder;
  `PortfolioDetail.tsx` updates its import.
- `app/_components/INVENTORY.md` — update `ShareRail`'s entry (now shared, two consumers);
  update `Article` and `NewsletterSignup` entries with their real second-consumer notes.
- Possible deletion of `app/[locale]/_components/ContentDetail.tsx` once no route uses it.
- `openspec/reference/roadmap.md` — tick Phase 14, record the `ContentDetail` retirement and
  any derived-behavior decisions (related-posts selection has no Figma reaction to match)
  under Inherited Work / DECISIONS.md.
- `app/_lib/content/frontmatter.ts` — `heroImage` becomes valid (optional) on `news`, not
  just `portfolio`; validation relaxes from "forbidden on news" to "optional on both,"
  matching the existing fallback-to-`image` behavior `PortfolioDetail` already relies on.
  No new field — an existing one gains a second content type. Any of the 16 real news
  entries may set `heroImage` in its `.mdx` frontmatter if it wants a hero photo distinct
  from its listing poster; none are required to.

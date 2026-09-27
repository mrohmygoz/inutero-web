## Why

`/[locale]/portfolio/[slug]` currently renders through `ContentDetail`, a deliberately plain
placeholder (title, date, `Cms` body, `ShareRow`) built in the shared-blocks phase specifically
so the MDX pipeline had something to prove itself against before any page owned the route.
Phase 10 shipped the real Portfolio grid linking to three real slugs; those links now land on
the placeholder instead of the designed Portfolio Details page (`12612:8706` desktop,
`12211:3371` mobile). Home's three Featured Project cards still point at the Portfolio index
for the same reason — the prototype's real target didn't exist until this phase.

## What Changes

- Build the real Portfolio Details page for `/[locale]/portfolio/[slug]`: breadcrumb, meta
  fields (Client / Date / Role), MDX body, and pagination footer, replacing `ContentDetail` for
  this route. Figma nodes: desktop `12612:8706`, mobile `12211:3371`, TC desktop `12635:12927`,
  TC mobile `12368:2481`.
- Build the desktop-only left share rail (owed by Phase 10's roadmap "Inherited Work" row,
  sourced from `Cms`'s node `12610:7361`) alongside the bottom `ShareRow`, which already ships.
- Add a `client` (合作夥伴) field to the portfolio frontmatter contract — present on two of the
  three real projects, absent on the third — and populate it in the three existing MDX files.
- Replace the three MDX bodies' placeholder/Lorem-ipsum copy with real article bodies, condensed
  from client-supplied press releases (delivered 2026-09-27): 2–3 real photos interspersed for
  `hotpot-band-show` and `inner-voices-of-that-day`, one lead promo photo for `bottoms-up`. This
  closes the content matrix's "card bodies remain 待補" note under Portfolio.
- Repoint Home's three Featured Project cards from the Portfolio index to their real detail
  routes (`bottoms-up`, `hotpot-band-show`, `inner-voices-of-that-day`), closing the Phase 11
  row in `roadmap.md` → Inherited Work.
- Wire the page's "Back to portfolio" pagination footer (prev/next between the three real
  slugs, wrapping at the ends — three slugs is the whole set, so "1 / 12" from the sample data
  does not apply).
- `news/[slug]` keeps using `ContentDetail` unchanged; Phase 14 replaces it there.

## Capabilities

No spec-level behavior changes. This phase is UI implementation of an already-specified content
type (`mdx-content` already governs frontmatter validation, slug-to-route generation, and body
rendering) against a finished Figma design — it adds one optional frontmatter field and a page
template, neither of which changes a documented requirement or scenario. `skip_specs: true` is
set in `.openspec.yaml`, consistent with Phase 10's precedent for the same content type.

### New Capabilities

(none)

### Modified Capabilities

(none)

## Impact

- `app/[locale]/portfolio/[slug]/page.tsx` — swaps `ContentDetail` for a new page-local
  `PortfolioDetail` component (or equivalent); `news/[slug]/page.tsx` is untouched.
- `app/[locale]/_components/ContentDetail.tsx` — likely deleted once Portfolio is its last
  reason to exist, or kept solely for `news/[slug]` until Phase 14 — decide in design.md.
- `app/_lib/content/frontmatter.ts` — new optional `client` field, portfolio-only.
- `content/portfolio/{en,zh}/*.mdx` — three files gain `client` frontmatter (two populated, one
  omitted) and real article bodies replacing placeholder copy.
- `public/images/content/` — gains seven real photos (one lead shot for `bottoms-up`, three each
  for `hotpot-band-show` and `inner-voices-of-that-day`); `sample-live.jpg` is removed once
  nothing references it.
- `app/_components/Cms.tsx` and/or a new share-rail component — adds the desktop left rail;
  `app/_components/INVENTORY.md` gets an entry or an amendment.
- `app/[locale]/_components/HomeFeaturedProjects.tsx` and `app/_lib/i18n/{en,zh}/home.ts` —
  cards gain real `href`s (or a `slug` field) instead of the shared portfolio index link.
- `openspec/reference/roadmap.md` — ticks Phase 11, closes its Inherited Work row and the
  Phase 11/14 share-rail row (or notes what remains for Phase 14).
- `openspec/DECISIONS.md` — records the `client` field's optionality and the pagination
  behavior for a three-item set.

## Why

Phase 11 (Portfolio Details) shipped `/[locale]/portfolio/[slug]` without the Figma frame's
bottom Gallery section (desktop `12573:7449`, mobile `12211:3462`), recorded as D090: no
project's supplied content included a distinct gallery image set beyond the photos already
interspersed through the MDX body, and reusing or padding with placeholders would fabricate
content. That reasoning was sound at the time, but the section is still part of the finished
design and the client review flagged it as missing rather than as an accepted gap. This phase
builds it, sourcing images from each project's own body photos (already real, already
supplied) instead of duplicating or inventing anything.

## What Changes

- Add a `Gallery` section to `PortfolioDetail`, rendered at both breakpoints, built against
  Figma nodes `12573:7449` (desktop) and `12211:3462` (mobile).
- Source each project's gallery images from two places, combined: the photos already
  embedded in its MDX body (`heroImage` + inline body images, deduplicated, in body order),
  plus a new optional `gallery: string[]` frontmatter field for additional images that are not
  part of the article body — the client may supply more photos for a project than what reads
  well inline in the article.
- Handle the count mismatch honestly: Figma's sample draws 4 images; a project with no
  `gallery` field and only 1 distinct body photo renders however many it actually has, and a
  project with a supplied `gallery` list can exceed 4. No padding, no repeats, no invented
  placeholder images either way.
- Supersede D090's "not built" call with a new decision recording why reusing body photos as
  the gallery source is not the same fabrication D090 ruled out (the images are real and
  already part of the project's own content; only their presentation is new), and recording
  the image-count-per-project reality.

## Capabilities

### New Capabilities
(none — UI section against a finished design, no new spec-level behavior)

### Modified Capabilities
(none)

## Impact

- `app/[locale]/portfolio/[slug]/_components/PortfolioDetail.tsx` (or its section
  subcomponents) — adds the Gallery section to the render tree.
- New page-local component, e.g. `app/[locale]/portfolio/[slug]/_components/Gallery.tsx`.
- `app/_lib/content/frontmatter.ts` — new optional `gallery: string[]` field, portfolio-only,
  same optional-but-typed shape as `heroImage`.
- `content/portfolio/{en,zh}/*.mdx` — existing three projects may add a `gallery` list where
  the client has supplied extra photos beyond the article body.
- `openspec/DECISIONS.md` — new decision superseding D090's "not built" clause.
- `openspec/reference/roadmap.md` — Phase 11 row's Gallery gap marked resolved by 11a.

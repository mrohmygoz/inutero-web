## Why

`app/_lib/i18n/{en,zh}/home.ts`'s `featuredProjects.cards` fully duplicates data that
`content/portfolio/{en,zh}/*.mdx` frontmatter already owns — `title`, `dateLabel`, `image`,
`services`/`tags` ids, and `description`/`excerpt` are authored twice, once per content type,
per locale (four copies of each fact). This has already drifted: Home's `international-booking`
tag reads "Tour Planning" in English while Portfolio's own filter dictionary and every other
consumer of that id (Artists, Footer, Services) read "Global Touring" — the same id, two labels,
with no mechanism to catch the divergence. A future portfolio copy edit (title, image swap, tag
correction) silently stops matching what Home displays unless someone remembers to edit both
files. `content/portfolio/` is already the source of truth for the Portfolio listing and detail
pages (Phase 10/11); Home should read it, not re-author it.

## What Changes

- `home.ts`'s `featuredProjects.cards` becomes an ordered array of portfolio slugs (`string[]`),
  one per locale — inclusion and display order both encoded by presence/position in that array,
  same as today just without the duplicated fields. Section chrome (`eyebrow`, `heading`, `cta`)
  is untouched.
- `HomeFeaturedProjects.tsx` resolves each slug against `getManifest("portfolio")` (already the
  single source of truth used by `/[locale]/portfolio` and its detail pages) and reads `title`,
  `dateLabel`, `image`, `excerpt`, `services` straight from frontmatter — no re-authoring.
- Tag labels resolve through `app/_lib/i18n/{en,zh}/portfolio.ts`'s existing `filter.tags`
  dictionary (the same lookup `PortfolioGrid` already uses), not a second, hand-copied label per
  card. **This corrects the "Tour Planning" vs. "Global Touring" drift as a side effect** — the
  visible label for `international-booking` on Home's cards changes to match Portfolio/Artists.
- A `home.ts` slug that doesn't exist in that locale's portfolio manifest fails the build loudly
  (thrown error naming the slug), matching every other manifest-lookup contract on this site
  (D002) — not a silently-dropped card.
- No visual, layout, or interaction change: `ProjectCard`'s props, the scatter positioning, and
  the section's own copy are unaffected. This is a data-source change behind an unchanged UI.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is an internal refactor — the rendered page is unchanged except for the one label
correction described above, which is a bug fix (drifted copy), not a new requirement.

## Impact

- `app/_lib/i18n/en/home.ts`, `app/_lib/i18n/zh/home.ts` — `featuredProjects.cards` shrinks from
  five duplicated fields per card to one slug string per card.
- `app/[locale]/_components/HomeFeaturedProjects.tsx` — becomes async, calls
  `getManifest("portfolio")`, maps slugs to `ContentEntry` data, resolves tag labels via
  `portfolio.filter.tags` instead of home's own per-card `label` strings.
- No route, content, or component-API changes outside the above. `ProjectCard`,
  `content/portfolio/`, and `/[locale]/portfolio` are all read, not modified.
- `app/_components/INVENTORY.md` — note `HomeFeaturedProjects`'s data source change.
- `openspec/DECISIONS.md` — records the slug-array pattern and the label-drift fix.
- `openspec/reference/roadmap.md` — ticks Phase 13b.

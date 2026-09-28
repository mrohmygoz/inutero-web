## 1. Data shape

- [ ] 1.1 In `app/_lib/i18n/en/home.ts`, change `featuredProjects.cards` from
      `{ slug, dateLabel, title, description, tags, image }[]` to `string[]` of portfolio slugs,
      in display order: `["2025-11-08-bottoms-up", "2024-09-04-hotpot-band-show",
      "2026-05-08-inner-voices-of-that-day"]` (same three, same order as today).
- [ ] 1.2 Mirror the same change in `app/_lib/i18n/zh/home.ts` — same slugs (content is locale-
      neutral; only the `ProjectTag`/label plumbing being removed was locale-specific).
- [ ] 1.3 Remove the now-unused `ProjectTag` type and its `ServiceId` import from `home.ts` if
      nothing else in the file needs them.

## 2. Component

- [ ] 2.1 Convert `HomeFeaturedProjects` to an `async function` component; call
      `getManifest("portfolio")` and filter/map to the slugs in `featuredProjects.cards`, in the
      array's own order (not the manifest's date-sort order).
- [ ] 2.2 Throw a descriptive error (naming the missing slug and locale) if any configured slug
      has no matching manifest entry for that locale.
- [ ] 2.3 Replace the per-card `tags: {id, label}[]` consumption with a lookup against
      `getDictionary(locale).portfolio.filter.tags[serviceId]` for each of the entry's
      `frontmatter.services`, keeping `serviceTagColor` for color as today.
- [ ] 2.4 Confirm `dateLabel`, `title`, `image`, `excerpt` map 1:1 from `ContentEntry.frontmatter`
      into `ProjectCard`'s existing props — no prop-shape change on `ProjectCard` itself.

## 3. Verification

- [ ] 3.1 `next-devtools-mcp`: check for framework errors/warnings on `/en` and `/zh`.
- [ ] 3.2 `playwright-cli`: screenshot the Featured Projects section at 393px and 1440px, both
      locales; confirm all three cards render with correct title/date/image/description and the
      corrected tag labels (`international-booking` now reads "Global Touring" in EN, matching
      Portfolio/Artists — not a regression).
- [ ] 3.3 Confirm each card's `href` still resolves to `/{locale}/portfolio/{slug}` and the linked
      detail page loads.
- [ ] 3.4 `npm run lint` and `npx tsc --noEmit`.

## 4. Documentation

- [ ] 4.1 Append a decision to `openspec/DECISIONS.md` (next id after whatever 13a used)
      recording the slug-array pattern and the "Tour Planning" → "Global Touring" label
      correction, with the reasoning from design.md.
- [ ] 4.2 Update `app/_components/INVENTORY.md`'s `HomeFeaturedProjects`/`ProjectCard` notes to
      reflect that Home now reads the portfolio manifest instead of duplicating card data.
- [ ] 4.3 Update `openspec/reference/roadmap.md`: tick Phase 13b.

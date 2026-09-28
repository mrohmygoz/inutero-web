## 1. Design context

- [x] 1.1 Run `/figma-design-to-code`, then fetch `get_design_context` + `get_screenshot` for the
      Top News banner on all four frames: mobile `12211:4017`, desktop EN `12573:7967`, desktop
      TC `12573:7968`/`I12635:12929;12573:7967` (expect empty — note it, don't skip the fetch),
      and mobile TC `12368:2637`. **Note:** `12573:7968` itself renders the same placeholder
      content as desktop EN (a component-default fallback), but the true override node
      `I12635:12929;12573:7967` confirmed empty (no children) — matches design.md's assumption.
- [x] 1.2 Re-confirm `Pagination`'s and `NewsletterSignup`'s existing prop contracts
      (`app/_components/Pagination.tsx`, `app/_components/NewsletterSignup.tsx`) — no Figma
      re-fetch needed, they're unchanged; read the code and their `INVENTORY.md` rows only.
      **Design issue found & resolved with user:** News's pagination node (`12612:7790`) is on a
      light section and uses dark-gray inactive text, not `Pagination.tsx`'s hardcoded white —
      component was NOT zero-change after all. Added a `tone?: "dark" | "light"` prop (default
      `"dark"`, Portfolio unaffected); News passes `"light"`. Confirmed via Figma fetch, not
      assumed.

## 2. Featured-article config

- [x] 2.1 Add `featuredSlug: string` to `app/_lib/i18n/en/news.ts` and `app/_lib/i18n/zh/news.ts`,
      both set to `2026-05-13-in-utero-huan-huan-community-tour` — it exists as a slug in both
      `content/news/en/` and `content/news/zh/` (content-parity guaranteed by `listSlugs`), and
      TC's own frame already features it. Do not use `taipei-indie-goes-abroad` (retired) or
      transcribe the EN frame's placeholder-derived headline (D098).
- [x] 2.2 In `app/[locale]/news/page.tsx`, resolve `featuredSlug` against the already-fetched
      `getManifest("news")` array; throw a descriptive error (naming the slug and locale) if not
      found — do not add a silent fallback.

## 3. Top News banner

- [x] 3.1 Build `app/[locale]/news/_components/NewsTopStory.tsx` (page-local, server component) —
      full-bleed image, tag chip (`newsFilters`/`newsTagColor`, first tag if multi-tagged), large
      headline, date label (reuse `formatNewsDateLabel` from `page.tsx` — extract it to a shared
      spot if both files need it), dark gradient overlay per the Figma screenshots.
      `newsTagColor` extracted to a new shared `_components/tagColors.ts` (was `NewsGrid`-local)
      so the banner and the grid cards can't disagree on a tag's color.
- [x] 3.2 Place it in `page.tsx` between `NewsHeader` and `NewsGrid`.
- [x] 3.3 Link the banner to the featured article's detail page
      (`/${locale}/news/${featuredSlug}`) — no prototype found on the banner node in any of the
      four frames (matching every other News/Portfolio interactive element); the whole banner is
      the click target, derived.

## 4. Pagination

- [x] 4.1 Add `page` state to `NewsGrid.tsx`, mirroring `PortfolioGrid.tsx`'s
      `PAGE_SIZE = 9` / `Math.ceil` / reset-on-filter-change pattern.
- [x] 4.2 Render `Pagination` below the article list, wired to `page`/`pageCount`/`setPage`,
      passing `news`'s existing pagination copy (content-matrix row: "Prev / Next", `keep EN`).
      `tone="light"` — see 1.2's design-issue note.
- [x] 4.3 Verify page 2 is reachable with the real 16-article set at both breakpoints (no
      page-size override needed, unlike Portfolio) — screenshot page 1 and page 2 in both
      locales.

## 5. Newsletter band

- [x] 5.1 Place `NewsletterSignup` (no `action` — still no endpoint, D-F) below the grid/paginator
      in `page.tsx`.
- [x] 5.2 Update `INVENTORY.md`'s `NewsletterSignup` row: it now has a real page consumer, not
      just `/styleguide`.

## 6. Verification

- [x] 6.1 `next-devtools-mcp`: check for framework errors/warnings on `/en/news` and `/zh/news`.
      `get_compilation_issues` → `{"issues":[]}`; `get_errors` → no config/session errors.
- [x] 6.2 `playwright-cli`: screenshot the full page (header → banner → filter/grid → paginator
      page 1 → paginator page 2 → newsletter) at 393px and 1440px, both locales; compare the
      banner against the Figma screenshots from Task 1.1 (Close tier — it's not in the Exact
      list). All 4 page-1 shots + page-2 (via a scripted Next click, since page 2 needs client
      interaction) reviewed — banner, grid, pagination (both tones), and newsletter all match.
- [x] 6.3 `npm run lint` and `npx tsc --noEmit`. Both clean (lint: 1 pre-existing unrelated
      warning in `AboutHero.tsx`; tsc: no errors).

## 7. Documentation

- [x] 7.1 Append a decision to `openspec/DECISIONS.md` (next id after D101) recording the
      featured-article resolution rule (`featuredSlug` config, not auto-derivation) and which
      slug was chosen per locale and why. Added as D102 — also records the `Pagination` `tone`
      design-gap finding (see 1.2).
- [x] 7.2 Update `openspec/reference/roadmap.md`: tick Phase 13a; close its two Inherited Work
      rows (pagination + newsletter band; Top News banner).
- [x] 7.3 Update `app/_components/INVENTORY.md` for `Pagination` and `NewsletterSignup`'s new
      consumers; add an entry for `NewsTopStory` if it's promoted, or note it as page-local if
      not. `NewsTopStory` added as page-local (`[locale]/news/_components/`), not promoted —
      single consumer.

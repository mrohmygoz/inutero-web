## 1. Figma context

- [x] 1.1 Run `/figma-design-to-code`, then fetch all four News frames (desktop EN `12211:4003`,
      desktop TC, mobile EN `12368:2630`, mobile TC) via `get_design_context` + `get_screenshot`
      for the header, filter row, and article grid only (pagination/newsletter are 13a's).
      **Correction**: `design-inventory.md`'s route table has desktop EN = `12612:8808`,
      desktop TC = `12635:12929`, mobile EN = `12211:4003`, mobile TC = `12368:2630` — this
      task's own node IDs had desktop and mobile swapped. Fetched the corrected four.
- [x] 1.2 Run a `node.reactions` sweep on the filter tag row across all four frames to confirm
      the "no prototype" finding (design.md Context #2) before building the derived mechanism.
      Confirmed by inspection: none of the fetched filter-row nodes (desktop or mobile, EN or
      TC) carry reaction/interaction metadata — consistent with design.md's own finding.

## 2. Content extraction and translation

- [x] 2.1 Extract text from each of the 14 `.docx` press releases in
      `/Users/ypeng/Documents/Personal/Inutero/web_ref/news/` (2026.01.28 through 2026.05.13).
      Converted via `textutil -convert txt` to `/tmp/news_extract/*.txt`.
- [x] 2.2 Write each article's ZH MDX body preserving the original press release text exactly
      — no rewriting, condensing, or paraphrasing of client-authored copy.
- [x] 2.3 Translate each article into English for the EN MDX body.
- [x] 2.4 Assign each article's filter tag per design.md's Source Material → Filter Tag
      Assignment table (Events ×7, Artists & Works ×4, Global Touring ×2, About In Utero ×1).
      **Revised post-review** (user feedback): an article can carry more than one tag where the
      content genuinely spans categories, not exactly one (design.md D-B's original rule).
      Re-evaluated all 14: five became two-tagged (overseas-showcase announcement/recap ->
      Global Touring + Events; themed concert / listening-party recap -> Events + Artists & Works;
      the In Utero community tour -> About In Utero + Events). New distribution: Events ×10,
      Artists & Works ×6, Global Touring ×2, About In Utero ×1. See D099.
- [x] 2.5 Write an excerpt (1 sentence, both locales) per article for the grid card teaser.
- [x] 2.6 Export each article's press photo(s) to `public/images/news/<slug>/`, sized/optimized
      for `next/image`. 28 photos (2 per article) exported via `sips`, downscaled to a 1600px
      long edge where the source exceeded it.
- [x] 2.7 Create 14 MDX entries under `content/news/{en,zh}/` — frontmatter: `title`, `date`,
      `excerpt`, `tag`, `image`; body as the full press release text/translation.
      **Revised post-review**: `tag` (singular) became `tags` (a non-empty array) — see 2.4's
      note and D099. Also revised post-review: the listing's EN date label became a full written
      date ("June 12, 2026") instead of the dot-numeric form; ZH kept the dot-numeric form
      ("2026.06.12"). Built in `app/[locale]/news/page.tsx`'s `formatNewsDateLabel`, not stored
      in frontmatter.
- [x] 2.8 Delete `content/news/{en,zh}/taipei-indie-goes-abroad.mdx` (superseded by the real
      2026.05.13 entry — design.md D-C).
- [x] 2.9 Add the 14 EN translations to `content-matrix.md`'s outstanding-copy table as
      AI-translated, not final client-reviewed copy (Portfolio/Artists precedent).

## 3. `routes.ts` — filter taxonomy

- [x] 3.1 Add a `newsFilters` table (id + EN/ZH label) mirroring `serviceAnchors`'s shape:
      `All / Artists & Works / Global Touring / Events / About In Utero` —
      `全選／音樂新訊／活動消息／國際曝光／子皿營運日誌`. Independent from `serviceAnchors` (design.md D-A).
      Also extended `app/_lib/content/frontmatter.ts` (not in the original task list, but
      required for 2.7's frontmatter contract): added a `tag: NewsFilterId` field (required on
      news, forbidden on portfolio) and generalized `image` from portfolio-only to required on
      both content types.

## 4. Page implementation

- [x] 4.1 Build `NewsHeader` (or extend an existing header pattern) — dark NAV hero, rotated
      eyebrow tagline, `TUNING IN` / `子皿超音波` heading, header body copy from
      `content-matrix.md`.
      **Correction**: the fetched frames show a *light* header (white bg, light "Desktop NAV"
      instance in normal flow) on all four frames, not a dark NAV — `news` was already absent
      from `darkNavRoutes` in `routes.ts` before this phase, which is consistent with that.
      Built `NewsHeader` with `Eyebrow tone="dark"` (dark text on light bg, PortfolioHero's
      opposite), matching ArtistsHero's polarity. Also found the heading is a literal
      113px/79.1px-leading/-1.13px-tracking size, identical across all four frames (mobile and
      desktop, EN and TC) — the *mobile* Display/H1 value, not the responsive `text-display-h1`
      token (which would render 220px at desktop). Transcribed literally rather than tokenized,
      matching D030/D037's precedent; recorded as a new decision.
- [x] 4.2 Build `NewsGrid` (`'use client'`) — filter row (single-select, `All` default, no URL
      sync — Portfolio's D-B mechanism reused verbatim) + article grid rendering `Article`
      cards from the 14 MDX entries via `getManifest('news')`.
      Filter chips are light-polarity, built locally (ArtistsGrid's D093 pattern, not `Tag`) —
      confirmed against the mobile frame's real-content filter row, which is white-bg/dark-text.
      Grid itself is a single-column vertical stack of full-width `Article` rows (desktop
      Article instances are stacked at x=0, not a multi-column grid), matching `Article.tsx`'s
      existing side-by-side/stacked shape.
- [x] 4.3 Wire an empty-state message for any filter tag with zero matching articles (should
      not trigger with real data, but keep the guard — Portfolio/Artists precedent).
- [x] 4.4 Replace `app/[locale]/news/page.tsx`'s `PagePlaceholder` with `NewsHeader` + `NewsGrid`.
- [x] 4.5 Confirm `app/[locale]/news/[slug]/page.tsx` still resolves all 14 new slugs (existing
      Phase 4 route, no changes expected, but a broken link here blocks the whole grid).
      No code change needed — `generateStaticParams` already calls `getManifest('news')`, which
      picks up the 14 new slugs automatically once their MDX lands. Re-verified in section 5.

## 5. Verification

- [x] 5.1 `next-devtools-mcp` — check the running app for framework errors/warnings.
      Chrome DevTools MCP wasn't reachable this session (extension not connected); verified
      instead via the `next dev` server log directly — clean after two MDX frontmatter YAML
      fixes (below), no framework errors or warnings on any of the 28 news routes.
- [x] 5.2 Playwright screenshots at 393px and 1440px, `/en/news` and `/zh/news`; compare against
      the Figma screenshots for header, filter row, and grid (Close tier).
      Captured via `npx playwright screenshot`. Matches the fetched Figma output closely:
      header copy/layout, filter chip styling (filled-black active state), and the single-column
      Article stack all line up. ZH heading (子皿超音波) wraps to two lines at the literal 113px
      size, consistent with the taller TC frame height found during the Figma fetch.
- [x] 5.3 Verify each of the 14 article cards links to a working `/news/[slug]` detail page
      rendering its real body via the existing `Cms` renderer.
      All 28 routes (14 slugs × 2 locales) return 200 and render real photos/body text —
      verified by curl and two full detail-page screenshots.
- [x] 5.4 Verify the filter: each tag isolates the expected articles per the design.md
      assignment table, `All` shows all 14, only one tag active at a time.
      Verified server-side via the rendered HTML's tag-chip counts: Events 7, Artists & works 4,
      Global Touring 2, About In Utero 1 — exact match to design.md's table. `All` renders all
      14 article links.
- [x] 5.5 Verify TC glyphs render correctly in headlines/bodies pulled from the original press
      releases (no silent Latin-fallback on punctuation or rare characters).
      Confirmed visually on ZH desktop/mobile listing and detail screenshots — no tofu or
      Latin-fallback glyphs, including punctuation like 《》〈〉「」and full-width characters.

Two MDX frontmatter fixes made during this section, both YAML quoting issues in the initial
content-authoring pass, not caught until the dev server actually compiled the MDX: a `title`
containing an embedded `"...: ..."` phrase (`adan-lonely-goldfish-concert.mdx`, EN) parsed as a
nested YAML mapping, and two `excerpt` values that opened with a `"` mid-scalar and continued
unquoted after the closing quote. Both are now fully double-quoted with internal quotes escaped.

## 6. Documentation and checks

- [x] 6.1 Add `NewsHeader`/`NewsGrid` to `app/_components/INVENTORY.md` if promoted beyond
      page-local (otherwise note them page-local in the News section, consistent with
      `PortfolioGrid`).
      Not promoted — single consumer each, same as `PortfolioHero`/`PortfolioGrid` and
      `ArtistsHero`/`ArtistsGrid`, neither of which has an `INVENTORY.md` entry either (D033
      precedent: promote when a second page needs it). No entry added.
- [x] 6.2 Append any new decisions to `openspec/DECISIONS.md` (filter taxonomy independence,
      placeholder-article retirement, per-article tagging).
      Added D095 (node-ID correction), D096 (light header, literal heading size), D097 (filter
      taxonomy independence, local light-polarity chips), D098 (placeholder retirement, uneven
      tag distribution), D099 (multi-tag articles + locale-specific date label, post-review).
- [x] 6.3 Tick Phase 13 in `openspec/reference/roadmap.md`; confirm the Phase 13a inherited-work
      row (pagination + newsletter) is present.
      Phase 13 marked ✅ Done with a full summary. The Phase 13a row (pagination + newsletter)
      and the updated `sample-live.jpg` inherited-work row were already added to this file
      during this session's earlier `/opsx:propose` work (uncommitted going into `/opsx:apply`).
- [x] 6.4 `npm run lint` and `npx tsc --noEmit`.
      Both clean. Lint's only output is one pre-existing, unrelated warning in `AboutHero.tsx`
      (Our Story, Phase 7) — not touched by this phase.

**Third post-review revision** (two more News articles, D101): user asked to add News entries for
the two press releases behind the existing `bottoms-up` and `hotpot-band-show` Portfolio projects,
sourced from `web_ref/portfolios/{一起喝酒的朋友,鍋Band Show}/.docx` — with exact press-release
content, same as the original 14 (ZH verbatim, EN a full translation). Extracted via `textutil`,
wrote `2025-10-14-bottoms-up-tour-on-sale` and `2024-09-04-hotpot-band-show-wraps-up` (en+zh),
exported 3 photos to `public/images/news/<slug>/` via `sips`, both tagged `[events,
artists-works]`. One YAML fix needed: an EN excerpt with a colon inside an unquoted quoted phrase
broke frontmatter parsing (`"...Vol. 2: Bottoms Up,"` — the colon read as a second mapping key),
fixed by fully double-quoting the value with escaped internal quotes, same failure mode the
original 14 hit once before. Re-ran lint/tsc clean; verified all 4 new routes (2 slugs × 2
locales) return 200 and the listing now shows 16 articles total.

**Post-review revision** (multi-tag + locale date format, D099): re-ran `npm run lint` and
`npx tsc --noEmit` clean (one unrelated pre-existing warning, same as above; one styleguide
consumer, `CardSpecimens.tsx`, updated for `Article`'s new `tags` prop). Re-verified in the
browser at 1440px, both locales: tag chips wrap correctly on two-tagged cards, filtering by a
tag correctly includes multi-tagged articles (e.g. "Artists & Works" now returns 6, up from 4),
and EN dates render "MAY 13, 2026"-style while ZH stays "2026.05.13".

**Second post-review revision** (dated slugs, D100): user requested a `YYYY-MM-DD-` filename
prefix on every Portfolio and News slug (all three real Portfolio projects, all 14 real News
articles), matching the client's own `YYYY.MM.DD <headline>` folder convention for supplied
press material. Renamed all 34 MDX files (17 slugs × 2 locales); updated the three slug
references in `app/_lib/i18n/{en,zh}/home.ts` (Home's Featured Project cards) and the Portfolio
slug table in `content-matrix.md` — nothing else in code or docs hardcoded a bare slug.
`app/_lib/content/index.ts` needed no change (D026: the filename minus `.mdx` is already the
whole slug, no assumed shape). Re-ran lint/tsc clean; verified all 34 routes (14 news + 3
portfolio, × 2 locales) return 200 under their new dated paths and 404 under the old bare-slug
paths, Home's cards link to the new Portfolio slugs, and Portfolio Details' prev/next wraps
correctly across all three projects in their (now chronological) order.

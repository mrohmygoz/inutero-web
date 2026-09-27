## 1. Figma context

- [x] 1.1 Run `/figma-design-to-code`, then fetch `get_design_context` + `get_screenshot` for
      all four Portfolio Details frames: desktop EN `12612:8706`, desktop TC `12635:12927`,
      mobile EN `12211:3371`, mobile TC `12368:2481`.
- [x] 1.2 Run `node.reactions` / `get_metadata` sweep across the four frames for the pagination
      footer and the share rail — confirm whether either carries a real prototype before
      building the derived behavior in design.md.
- [x] 1.3 Fetch the desktop-only left share rail's own node from `Cms`'s source (`12610:7361`)
      to get its exact position, icon set, and spacing relative to the article body.

## 2. Content contract

- [x] 2.1 Add optional `client` field to `Frontmatter` and `parseFrontmatter` in
      `app/_lib/content/frontmatter.ts` — portfolio-only, allowed empty, forbidden (must be
      absent) on news, per design.md.
- [x] 2.2 Add `client: "雷擎 L8ching／張淦勛 Giyu Tjuljaviya／宋楚琳"` to
      `content/portfolio/{en,zh}/bottoms-up.mdx` (translate for the `en` file).
- [x] 2.3 Add `client: "巴奈、滅火器主唱楊大正、大象體操、緩緩 Huan Huan、Mong Tong、昭霖"` to
      `content/portfolio/{en,zh}/hotpot-band-show.mdx` (translate for the `en` file).
- [x] 2.4 Leave `client` absent on `content/portfolio/{en,zh}/inner-voices-of-that-day.mdx` — no
      合作夥伴 value was supplied for this project.

### 2a. Real article bodies (source: client-supplied press releases)

Source docx files, delivered 2026-09-27, live outside the repo at
`/Users/ypeng/Documents/Personal/Inutero/web_ref/{一起喝酒的朋友,鍋Band Show,彼日的心內話}/`.
Extracted plain text is at `/tmp/docx_extract/{bottoms-up,hotpot,inner-voices}.txt` for this
session, but that path is not durable — re-run `textutil -convert txt` from the source docx if
it's gone by the time this task runs. Each release is a full press article (600–900 Chinese
characters); per user decision, MDX bodies are a **condensed rewrite**, not the verbatim
release, with the ZH body written first and the EN body adapted from it (not a literal
sentence-by-sentence translation — match the site's existing editorial voice, e.g. the
`inner-voices-of-that-day.mdx` EN body already in place).

Photos per project are already resized to 1600px and copied into `public/images/content/`:

| Project | Files already staged |
| :--- | :--- |
| `bottoms-up` | `bottoms-up-promo.jpg` (single promo shot, supplied later than the other two) |
| `hotpot-band-show` | `hotpot-band-show-venue.jpg`, `hotpot-band-show-yang-dazheng.jpg`, `hotpot-band-show-birthday-surprise.jpg` |
| `inner-voices-of-that-day` | `inner-voices-of-that-day-zhongshan-group.jpg`, `inner-voices-of-that-day-huatan-performance.jpg`, `inner-voices-of-that-day-beidou-audience.jpg` |

Per user decision, `hotpot-band-show` and `inner-voices-of-that-day` intersperse 2–3 photos
through the body, not a full photo dump — one every few paragraphs, each with a real (not
generic) `title` caption, matching the `Figure` component's existing caption treatment.
`bottoms-up` gets its one promo shot as the lead image at the top of the body, above the first
paragraph — user-specified placement, since it's the only photo for that project.

- [x] 2a.1 Rewrite `content/portfolio/zh/bottoms-up.mdx` body from the 一起喝酒的朋友 press
      release — three-stop tour (台南泉發/台中The Pillars柱/台北女巫店), the three artists
      (雷擎、張淦勛、宋楚琳), the origin story (北投/石牌酒友聚會), the venue-specific cocktail
      pairing. Open with `bottoms-up-promo.jpg` as the lead image, real caption, before any body
      text.
- [x] 2a.2 Rewrite `content/portfolio/en/bottoms-up.mdx` body to match, adapted not
      transliterated, same lead image.
- [x] 2a.3 Rewrite `content/portfolio/zh/hotpot-band-show.mdx` body from the 鍋 Band Show press
      release — the 詹記西門大世界 venue concept, the three time-slot lineup (大象體操／緩緩
      Huan Huan、Mong Tong／昭霖、楊大正／巴奈), the bassist's post-injury return and the
      drummer's on-stage birthday. Intersperse `hotpot-band-show-venue.jpg`,
      `hotpot-band-show-yang-dazheng.jpg`, and `hotpot-band-show-birthday-surprise.jpg` with
      real captions.
- [x] 2a.4 Rewrite `content/portfolio/en/hotpot-band-show.mdx` body to match, same three images.
- [x] 2a.5 Rewrite `content/portfolio/zh/inner-voices-of-that-day.mdx` body from the 彼日的心內話
      press release — three stops (台北中山老人住宅暨服務中心／彰化花壇安耆日照中心／彰化北斗
      有冊店), the band's own reflections on preparing classic-era songs for an older audience,
      the Beidou stop's open-to-neighbours format. Replace the current Lorem-ipsum pull-quote
      with a real line adapted from the release (e.g. 一珍或石頭的回憶段落). Swap the placeholder
      `/images/content/sample-live.jpg` for `inner-voices-of-that-day-zhongshan-group.jpg`,
      `inner-voices-of-that-day-huatan-performance.jpg`, and
      `inner-voices-of-that-day-beidou-audience.jpg`.
- [x] 2a.6 Rewrite `content/portfolio/en/inner-voices-of-that-day.mdx` body to match, same three
      images and an adapted pull-quote.
- [ ] 2a.7 Delete `public/images/content/sample-live.jpg` once nothing references it.

## 3. Portfolio Details page

- [x] 3.1 Build the new page-local Portfolio Details component (breadcrumb: "Portfolio >
      {title}" / "過往案例 > {title}", meta row rendering Client/Date/Role from frontmatter with
      Client omitted when empty, `Cms` body) replacing `ContentDetail` in
      `app/[locale]/portfolio/[slug]/page.tsx`. `news/[slug]/page.tsx` keeps `ContentDetail`.
- [x] 3.2 Match desktop and mobile layout, spacing, and typography to the fetched frames at both
      breakpoints, both locales.
- [x] 3.3 Build the prev/next pagination footer (design.md: content-manifest order, wraps at
      both ends) as a small page-local control, not a reuse of `Pagination`.
- [x] 3.4 Build the desktop-only left share rail, reusing `ShareRow`'s target/URL logic (extract
      a shared piece only if duplication becomes real once both are on screen).

## 4. Home repoint

- [x] 4.1 Add `slug: string` to each card in `featuredProjects.cards` in
      `app/_lib/i18n/{en,zh}/home.ts` (`bottoms-up`, `hotpot-band-show`,
      `inner-voices-of-that-day`).
- [x] 4.2 Update `HomeFeaturedProjects.tsx` to build each card's `href` from its own `slug` via
      `localizedHref`, replacing the shared `portfolioHref` fallback.

## 5. Verification

- [x] 5.1 `next-devtools-mcp`: check for framework errors/warnings on `/en/portfolio/[slug]` and
      `/zh/portfolio/[slug]` for all three real slugs.
- [x] 5.2 `playwright-cli`: screenshot Portfolio Details at 393px and 1440px, in `/en` and `/zh`,
      for at least one project with a `client` value and the one without; compare against the
      Figma screenshots from task 1.1.
- [x] 5.3 Verify Home's three cards and the Portfolio grid's cards both land on their real
      detail routes (not the Portfolio index) at both breakpoints, both locales.
- [x] 5.4 Verify the prev/next footer wraps correctly at both ends of the three-project set.

## 6. Housekeeping

- [x] 6.1 Update `app/_components/INVENTORY.md` for any new shared component (the share rail, if
      it becomes shared rather than page-local).
- [x] 6.2 Append the `client`-field-optionality decision and the pagination-footer decision to
      `openspec/DECISIONS.md` (design.md already drafts the reasoning).
- [x] 6.3 Update `openspec/reference/roadmap.md`: tick Phase 11, close its Inherited Work row,
      and close or update the Phase 11/14 share-rail row depending on what's left for Phase 14.
- [x] 6.4 Run `npm run lint` and `npx tsc --noEmit`; fix any errors.

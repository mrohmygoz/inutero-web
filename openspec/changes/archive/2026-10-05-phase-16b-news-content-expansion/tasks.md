## 1. Setup

- [x] 1.1 Re-read `openspec/reference/roadmap.md`, `content-matrix.md` (News section), and the
      16 existing `content/news/{en,zh}/*.mdx` files for tone/format precedent (frontmatter
      shape, image path convention, tag usage).
- [x] 1.2 Inventory `web_ref/news_add/` once more against `public/images/news/`,
      `public/images/artists/`, `public/images/portfolio/` to shortlist substitute-image
      candidates per genre (festival stage, concert crowd, artist portrait, press conference)
      before starting per-article work, per design.md's substitute-image decision.

## 2. Per-article content (one task per `web_ref/news_add/` folder, 25 total)

Each task: read the `.docx`, assign date/slug/tags per design.md, write ZH body (verbatim,
boilerplate trimmed), write EN body (translated), export/pick hero + gallery images, create both
`content/news/en/<slug>.mdx` and `content/news/zh/<slug>.mdx`. Note in the task whether the
image is real (exported from the folder) or substituted.

- [x] 2.1 `260526` 日本樂壇超新星 kiyu 攜新曲參戰赤聲噪動音樂祭 — real photos supplied.
- [x] 2.2 `260601` 日本億級全才創作歌手須田景凪 首次來台演出即完售 — real photos supplied.
- [x] 2.3 `260614` 滅火器台北小巨蛋秒殺光榮回鄉 — placeholder only, needs substitute image.
- [x] 2.4 `260616` 2026 火球祭 11月桃園棒球場登場，Dragon Ash 再次來台 — placeholder only, needs
      substitute image.
- [x] 2.5 `260617` 陳建瑋 9 歲女兒做歌唱出全台小學生心聲 — real photos supplied.
- [x] 2.6 `260623` 金曲樂團大象體操推出全新單曲〈公路 Highway〉 — placeholder only, needs
      substitute image.
- [x] 2.7 `260701` R.fu 推出首張撒奇萊雅語饒舌專輯《扛 THE WEIGHT》 — placeholder only, needs
      substitute image.
- [x] 2.8 `260707` 2026 火球祭公布第二波卡司 — placeholder only, needs substitute image.
- [x] 2.9 `260710` 張仁與首張全創作專輯《新的過去舊的還在》 — placeholder only, needs substitute
      image.
- [x] 2.10 `260714` 張淦勛 Giyu Tjuljaviya 8/22 Legacy Taipei 首場個人大型專場 — placeholder
      only, needs substitute image.
- [x] 2.11 `260719` 滅火器 On Fire Day 台北小巨蛋演唱會次日活動新聞稿 — real photos supplied
      (large set); `.mp4` assets in this folder are out of scope (design.md).
- [x] 2.12 `260729` 火球祭第三波陣容 — placeholder only, needs substitute image.
- [x] 2.13 `260801` 滅火器回高雄開唱，高雄巨蛋秒殺加開場次 — placeholder only, needs substitute
      image.
- [x] 2.14 `260804` 呼聲 VOICES 2026 首波陣容竇靖童、盧廣仲、漢堡黃 — real photo supplied.
- [x] 2.15 `260811` 客語歌手黃宇寒 Han 宣布 8 月底巡迴開跑 — real photo supplied.
- [x] 2.16 `260813` 徐佳瑩預告十月「呼聲 VOICES」獻唱經典曲 — real photo supplied.
- [x] 2.17 `260814` 大象體操吉他手張凱翔攜手 2026 諸羅搖滾「嘉義新聲徵選」 — real photo supplied.
- [x] 2.18 `260825` 張淦勛 Giyu Tjuljaviya《如雲影隨行》台北演唱會圓滿落幕 — real photo
      supplied.
- [x] 2.19 `260826` 2026 火球祭公布第四波陣容 — real photo supplied.
- [x] 2.20 `260827` Karencici、RubberBand、張醒嬋「呼聲 VOICES 2026」開賣 — real photo supplied.
- [x] 2.21 `260901` Makav 真愛第二張創作專輯《Greater Waves》搶聽會 — real photo supplied.
- [x] 2.22 `260904` 溫蒂漫步第三張專輯首波單曲〈秘密 the hidden me〉 — real photos supplied.
- [x] 2.23 `260907` 「呼聲 VOICES 2026」陣容全解禁 — real photo supplied.
- [x] 2.24 `260910` 金旋獎得主「阿克沃 Awkward」單曲〈透明〉 — real photo supplied.
- [x] 2.25 `260916` 2026 火球祭最終陣容 FEVER 333、Northern19 — real photo supplied.
- [x] 2.26 `260924` 溫蒂漫步新專輯《The House Of》發行 — real photos supplied.

## 3. Build-time validation

- [x] 3.1 `npm run dev` (or build) and confirm all 25 new slugs resolve at
      `/en/news/<slug>` and `/zh/news/<slug>` with no missing-translation build failure
      (`mdx-content` spec's locale-completeness check).
- [x] 3.2 Confirm the News listing (`/en/news`, `/zh/news`) includes all 25 new articles,
      paginates correctly, and that each tag filter shows the expected set (spot-check at least
      one article per tag).

## 4. Verification

- [x] 4.1 Playwright screenshot at least 3 of the new articles' detail pages at 393px and
      1440px, both locales, confirming hero image, gallery, and body render without layout
      breakage (same `NewsDetail` component as the existing 16 — no component change expected).
- [x] 4.2 Spot-check EN translations for the substitute-image articles and at least 2 others
      for tone/accuracy against the ZH source.
- [x] 4.3 `npm run lint` and `npx tsc --noEmit` both pass.

## 5. Documentation

- [x] 5.1 Update `openspec/reference/roadmap.md` with a `16b` row (status, change name, summary
      including the real-vs-substitute image count and tag distribution, mirroring Phase 13's
      row style).
- [x] 5.2 Update `openspec/reference/content-matrix.md`'s News section if it enumerates
      articles by slug.
- [x] 5.3 Append any new decisions made during implementation (e.g. a disambiguated tag call,
      a specific substitute-image choice worth recording) to `openspec/DECISIONS.md`.

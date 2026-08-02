# Phase 4 addendum — adopt the content matrix as the source of truth for copy

## Why

Every string in the site today was transcribed from the Figma text layers. The client's
copy deck — **子皿網站_內容矩陣**, a Google Sheet owned by `gagatzan@gmail.com`, shared
2026-08-02, last modified 2026-07-31 — supersedes that. Its own instructions tab says so
explicitly: the Figma English is *「多數為暫定文案或 Lorem ipsum 占位文字，僅供參考版型與語氣長度」*
— mostly provisional or placeholder text, useful only for judging layout and tone length.

Two consequences, and the second is the reason to do this now rather than later:

1. **Some shipped strings are wrong.** The Footer's Chinese service links and its Services
   column heading do not match what the sheet specifies, and its social icons point at `#`
   while the sheet supplies the real profile URLs.
2. **Phases 5–15 will otherwise start from Figma text again.** The sheet carries finished
   copy for pages that do not exist yet — the Home hero headline changes from
   "Taiwanese / Music / Global / stage" to "Creative Souls / Global Visions", the entire
   Our Story narrative, all four Services descriptions, the FAQ set, and the Contact
   department emails. Without a durable in-repo transcription, every one of those phases
   re-derives copy from a source the client has already superseded.

## What Changes

- **New reference doc `openspec/reference/content-matrix.md`** — a full transcription of the
  sheet, page by page, taking its place alongside `routes.md`, `design-inventory.md`, and
  `design-tokens.md` as a "read this before implementing" source. It records, per row, the
  final English, the final Chinese, and the rows still marked 待補 (to be supplied) so a
  later phase can tell "no copy yet" from "copy is the empty string".
- **Footer Chinese copy corrected** to what the sheet specifies:
  - Services column heading: `Services` → `服務項目` (the sheet marks only 欄位標題2 "In Utero"
    as 保留英文; the Services heading carries a translation)
  - Service links: `藝人經紀整合` → `藝人經紀`, `海內外巡演規劃` → `巡演規劃`,
    `演出活動製作` → `活動製作`
- **Footer social icons wired to real URLs.** The sheet's Contact tab supplies Facebook,
  Instagram, YouTube, and Podcast links. This retires the `href="#"` placeholders flagged
  during the Phase 4 review as the same dead-link defect D022 exists to prevent.
- **Verification, not change, for the rest of the shipped surface.** `UniversalCTA`,
  `NewsletterSignup`, `ShareRow`, the Nav locale switcher, and the `routes.ts` Chinese labels
  were all checked against the sheet and already match. The sheet independently confirms two
  Phase 4 decisions that were recorded as judgment calls: the CTA headline stays English in
  both locales, and the button reads `跟我們聊聊` — exactly the string D030 picked from a
  conflict between two Figma frames.
- **Two conflicts raised, not silently resolved.** See Impact.

**Explicitly out of scope:** applying the sheet's copy to pages that do not exist yet. Home,
Our Story, Services, Portfolio, Artists, News, and Contact copy is transcribed into the
reference doc and used by Phases 5–15 when those pages are built. Writing it into `en.ts`/`zh.ts`
now would mean maintaining dictionary keys for components nobody has designed the props for.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is copy correction plus a reference document — no system behavior changes. The
change declares `skip_specs: true`.

## Impact

| Area | Change |
| :--- | :--- |
| `openspec/reference/content-matrix.md` | New. Full sheet transcription. |
| `app/_lib/i18n/zh.ts` | Footer `servicesHeading`, `artistManagement`, `internationalTourPlanning` |
| `app/_components/Footer.tsx` | Social `href="#"` → real URLs; platform list reconciled with the sheet |
| `CLAUDE.md` | Add the content matrix to the "Read These First" table |
| `openspec/DECISIONS.md` | D032 — the matrix outranks Figma for copy; Figma stays authoritative for layout |

**One conflict resolved, one still open:**

1. ~~**Service #4's Chinese name is inconsistent inside the sheet itself.**~~ **Resolved by the
   user, 2026-08-02: `活動製作`.** The Footer tab said `演出製作`; the Home summary, Services page,
   and Portfolio filter tabs all said `活動製作`. The majority form wins, and it is now the single
   name for this service line everywhere it appears — including Phases 6, 9, and 10.
2. **The social platform set does not match.** The Footer renders Facebook, Instagram, X, and
   YouTube (icon assets already committed). The sheet supplies Facebook, Instagram, YouTube,
   and **Podcast** — no X URL, and no Podcast icon exists.

## Verification

1. `openspec/reference/content-matrix.md` reads as a usable brief — a Phase 5 implementer can
   build the Home hero from it without opening the sheet.
2. `/zh` Footer shows `服務項目`, `藝人經紀`, `巡演規劃`.
3. Footer social icons navigate to real profiles rather than staying on the page.
4. `npm run lint`, `npx tsc --noEmit`, and `npm run build` stay clean.

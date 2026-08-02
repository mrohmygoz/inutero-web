# Phase 4 addendum — Tasks

The site stays runnable throughout: group 1 writes a document, group 2 changes three strings
and four hrefs, group 3 documents. Nothing here can break a build.

## 1. Transcribe the content matrix

- [x] 1.1 Re-read the sheet (`1DMrnb5xxDZoMlt1TxX372Z_BvMn__0-vtYqwMSWLRv0`) and record its `modifiedTime` — confirm it has not been revised since 2026-07-31
- [x] 1.2 Create `openspec/reference/content-matrix.md` with a header recording the file ID, owner, `modifiedTime`, and how to re-check it in one call
- [x] 1.3 Transcribe the Global tab (NAV, Footer, site-wide CTA) — final EN, final ZH, and `（保留英文）` markers preserved as such
- [x] 1.4 Transcribe Home, Our Story, and Services — including the four full Services descriptions and the FAQ set, quoted whole rather than summarized
- [x] 1.5 Transcribe Portfolio, Project Details, Featured Artists, News, News Details, and Contact
- [x] 1.6 Record every layout instruction that is not copy: `直接刪除段落`, `直接拿掉`, `新增段落` (Our Story credits). A later phase must not build a section the client asked to remove
- [x] 1.7 Add a per-page "Not yet supplied （待補）" list (D-D) — call out that Portfolio cards, Artist cards, and the News article list are all unwritten, so Phases 10/12/13 need content before they can ship more than a shell
- [x] 1.8 Add a per-page asset list for the Dropbox links (photography, press releases, posters) — recorded for Phases 11/12/14, not downloaded here
- [x] 1.9 Strip the sheet's Figma URLs, keep only node IDs, and note why (they point at `7uC2EQp61AsMp8ebZQcI7w`, the view-seat file CLAUDE.md forbids; node IDs are identical between files)
- [x] 1.10 Record service #4's name as `活動製作` (user decision 2026-08-02) and flag the sheet's Footer tab as the outlier, so a later phase transcribing that tab does not reintroduce `演出製作`
- [x] 1.11 Record the still-open social platform conflict (sheet supplies FB/IG/YT/Podcast; Footer renders FB/IG/X/YT)

## 2. Apply the deltas that touch shipped code

- [x] 2.1 `zh.ts` — `footer.servicesHeading`: **left as `Services`.** The TC Footer frame `12635:16558` renders this label in English, and `VerticalLabel`'s `rotate-90` lays CJK glyphs on their side. Escalated as conflict #3 rather than shipped broken (D-B stop-and-ask)
- [x] 2.2 `zh.ts` — `footer.artistManagement`: `藝人經紀整合` → `藝人經紀`; `footer.internationalTourPlanning`: `海內外巡演規劃` → `巡演規劃`
- [x] 2.3 `zh.ts` — `footer.eventProduction`: `演出活動製作` → `活動製作` (user decision 2026-08-02, resolving the sheet's internal `演出製作` vs `活動製作` conflict). Comment it as the site-wide name for this service line so Phases 6/9/10 do not re-derive it from the Footer tab's outlier
- [x] 2.4 `Footer.tsx` — wire Facebook, Instagram, and YouTube to the sheet's real URLs, replacing `href="#"`; add `target="_blank"` + `rel="noopener noreferrer"`
- [x] 2.5 ~~Leave the X icon in place~~ **Superseded by the user's 2026-08-02 decision:** the fourth slot is Podcast (Firstory), not X. Wired to a real URL; icon is a documented placeholder (neutral link glyph) pending a real asset, rather than the X brand mark pointed at another platform
- [x] 2.6 Verify no other shipped string needs changing: re-check `UniversalCTA`, `NewsletterSignup`, `ShareRow`, the Nav locale switcher (`繁中`/`EN`), and `routes.ts` Chinese labels against the transcription

## 3. Documentation

- [x] 3.1 Add `content-matrix.md` to CLAUDE.md's "Read These First" table, with a one-line description of what it gives you
- [x] 3.2 Append D032 to `openspec/DECISIONS.md` — the matrix outranks Figma for copy, Figma keeps layout, and the consequence when the new copy does not fit the designed lockup (D-B)
- [x] 3.3 Note in D032 that the sheet independently confirms D030's two judgment calls (English headline, `跟我們聊聊`), so those are now sourced rather than inferred

## 4. Verification

- [x] 4.1 `npm run lint` and `npx tsc --noEmit` clean
- [x] 4.2 `npm run build` passes
- [x] 4.3 Screenshot `/zh` Footer at 393px and 1440px — confirm `服務項目`, `藝人經紀`, `巡演規劃` render and nothing wraps badly at the new lengths
- [x] 4.4 Confirm the three wired social links resolve to real profiles — Facebook 200, YouTube 200, Instagram 429 (rate-limits curl; URL itself is well-formed)
- [x] 4.5 Spot-check the transcription against the sheet for three long Chinese passages (Our Story narrative, Services 01, FAQ Q1) — character-level, not gist
- [x] 4.6 Report the two open conflicts and the `（待補）` inventory plainly, so the user knows what the client still owes

## 5. Gate

- [x] 5.1 Stop. Hand to the user. **Do not begin Phase 5**, and do not apply the matrix's copy to unbuilt pages.

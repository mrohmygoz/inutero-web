## Context

See proposal.md for motivation. This is a pure content phase: new MDX entries plus a
`home.ts` config reorder, no component/route/taxonomy change.

Two source layers feed this phase:
1. `web_ref/portfolios_add/` — client-supplied `.docx` press releases and photography (7 of 8
   projects; 臥軌的火車 has only a cover image here).
2. The client's own "Project Details" tab in the content-matrix Google Sheet
   (`1DMrnb5xxDZoMlt1TxX372Z_BvMn__0-vtYqwMSWLRv0`, gid `67798789`) — this is **authoritative**
   over anything inferred from the `.docx`/photo folders. It gives, per project, the official
   EN+ZH title/excerpt pair (same two-line format already used by the 3 shipped entries,
   confirmed by cross-checking its Bottoms Up row against the live `.mdx`), client name
   (合作夥伴), date/date-range (時間), role (職責 — maps directly to the `services` taxonomy),
   and Dropbox links for the press release and photos. D1/D2 below are rewritten against this
   sheet, not against folder-naming/content guesses — the sheet resolves every tag and most
   date questions this design doc originally flagged as non-final.
3. For 臥軌的火車 specifically, the user additionally supplied MTV音樂頻道's 2024-08-10 article
   (https://www.mtv.com.tw/news/newsdetail/11084) as its body-copy source — a full press
   write-up with exact tour dates, downloaded alongside 5 real photos to
   `web_ref/portfolios_add/臥軌的火車.../mtv_photos/`.

## Goals / Non-Goals

**Goals:**
- Ship 8 real Portfolio entries. Each `excerpt` is the sheet's own official EN/ZH copy verbatim
  (not AI-translated — a step up from the Phase 13/16b precedent, which only had ZH to work
  from). Bodies are condensed from the `.docx`/MTV source, ZH first; EN bodies are AI-translated
  from ZH and flagged non-final, same as always.
- Assign each entry's `services` tags from the sheet's own 職責 field, not inference.
- Reorder Home's 3 featured-project cards per explicit client priority.

**Non-Goals:**
- No gallery gets exhaustively dumped. Phase 11a's precedent (hero + body-referenced images,
  deduplicated) applies — each project gets a curated subset, not every source image.
- Dropbox-hosted press-release/photo links in the sheet are not fetched automatically (no
  Dropbox auth in this environment) — tasks.md calls out using them as a manual fallback where
  the `web_ref/` folder's own material is thinner (GIMA, 臥軌的火車).
- No change to `ProjectCard`, the Portfolio filter, or `frontmatter.ts`'s schema.

## Decisions

**D1 — Slugs, dates, and client.** `YYYY-MM-DD-slug` per Phase 13/16b convention. Where the
sheet gives a year/range rather than an exact date (most rows — 職責/時間 describe an ongoing
client relationship, not one event), the slug is still dated to the specific event the body
covers (the `.docx`/article's own event), consistent with how the 3 shipped entries work:

| Slug | Client (合作夥伴) | Date basis |
| :--- | :--- | :--- |
| `2025-11-22-fireball-fest` | 夥球擊 | Festival dates in the Day 1/2 `.docx` (sheet's own range: 2019–2026, ongoing) |
| `2024-10-11-world-music-festival-taiwan` | 風潮音樂 | Opening day of the `.docx`-covered 2024 edition (sheet: 2024) |
| `2022-11-05-golden-indie-music-awards` | 必應創造 | Date embedded in the client's own working-photo filenames (sheet: 2018–2020, 2022–2026, ongoing; this entry covers the one edition we have photography for) |
| `2026-04-24-organik-festival` | Smoke Machine | Festival dates in the `.docx`-covered 2026 edition (sheet: 2023–2026, ongoing) |
| `2026-05-12-our-song` | 公視台語台 | Kickoff press-conference date in the `.docx` (sheet: 2026) |
| `2026-03-26-taiwan-beats-showcase-sxsw` | Young Team Productions | The `.docx`-covered 2026 SXSW edition (sheet: 2021–2026, ongoing) |
| `2024-06-xx-elephant-gym-europe-mongolia-tour` | 大象體操 | Sheet confirms the Europe/Mongolia leg is **2024** (resolving this doc's earlier open question) — but no exact day is given for any of the 11 listed stops (Lisbon/Porto/Barcelona/Milan/Amsterdam/Brussels/Paris/London/Bristol/Manchester/Ulaanbaatar). Placeholder day flagged non-final; swap for a real date if the client's Dropbox press release has one. |
| `2024-09-03-railway-suicide-train-yesterday-once-more` | 臥軌的火車 | Tour opening date from the MTV article (sheet only says 2024.09, matching) |

**D2 — `services` tag assignment, from the sheet's 職責 field.** Mapping used (confirmed against
the 3 shipped entries' own frontmatter, which already encode this exact vocabulary):
行銷宣傳 → `pr-marketing`; 媒體宣傳 → `pr-marketing`; 社群經營 → `pr-marketing`; 巡演規劃 →
`international-booking`; 海外團策展/海外事務 → `international-booking`; 活動製作 → `event-production`;
入圍者接待 → `event-production`; 亞洲音樂大賞策展 → `international-booking`.

| Slug | Sheet's 職責 | Tags |
| :--- | :--- | :--- |
| `fireball-fest` | 行銷宣傳、海外團策展、海外事務 | `pr-marketing`, `international-booking` |
| `world-music-festival-taiwan` | 媒體宣傳 | `pr-marketing` |
| `golden-indie-music-awards` | 入圍者接待（2022–26）、行銷宣傳（2018–20）、社群經營（2025）、亞洲音樂大賞策展（2022–24） | `event-production`, `pr-marketing`, `international-booking` |
| `organik-festival` | 行銷宣傳 | `pr-marketing` |
| `our-song` | 行銷宣傳 | `pr-marketing` |
| `taiwan-beats-showcase-sxsw` | 行銷宣傳 | `pr-marketing` |
| `elephant-gym-europe-mongolia-tour` | 巡演規劃 | `international-booking` |
| `railway-suicide-train-yesterday-once-more` | 行銷宣傳／巡演規劃／活動製作 | `pr-marketing`, `international-booking`, `event-production` |

No entry in this batch carries `artist-management` — the sheet doesn't assign it to any of the
8, including the two artist-specific ones (Elephant Gym, 臥軌的火車); both are booking/tour-planning
engagements, not full management. This supersedes this doc's earlier (pre-sheet) guess that
Elephant Gym and SXSW should carry `artist-management`.

**D3 — Excerpt copy.** Each entry's `excerpt` (EN) and its ZH counterpart are the sheet's own
text verbatim — e.g. GIMA's EN excerpt is literally "One of Taiwan's major music awards for
independent music, established in 2010 to encourage diverse and original music creation. The
awards span a wide range of genres, including rock, folk, electronic, hip-hop, jazz, R&B and
alternative pop." This is official client copy, not AI-translated, and is used as-is rather than
condensed further.

**D4 — Home hero reorder.** `featuredProjects.cards` becomes
`["2025-11-22-fireball-fest", "2022-11-05-golden-indie-music-awards", "2026-05-08-inner-voices-of-that-day"]`
in both `en.ts` and `zh.ts`, per explicit client instruction (火球祭 → 金音獎 → 母親節緩巡). Reuses
D103's existing mechanism — no component change.

**D5 — GIMA body copy.** The sheet's own note is "活動新聞稿：以照片為主／照片：＃子皿金音" — i.e. the
client confirms there is no press-release text, photos are the primary material. Body is written
from the sheet's official excerpt/role history (above) plus what the photography documents
(子皿工作照 = In Utero's own event-production working photos; 子皿特輯 = a photo feature), not
fabricated narrative.

## Risks / Trade-offs

- [AI-translated EN bodies, same as every prior content phase] → Flagged non-final; excerpts are
  the one exception (D3, official copy). A future polish phase can batch-review all AI-translated
  EN Portfolio/News bodies together (Phase F candidate).
- [Elephant Gym Europe/Mongolia leg has no exact date for any of its 11 stops] → placeholder day
  within the sheet-confirmed 2024 window, flagged non-final (D1).
- [GIMA has no source narrative] → D5; flagged thin rather than fabricated.
- [Dropbox press-release/photo links in the sheet aren't auto-fetched] → tasks.md flags manual
  follow-up only where `web_ref/`'s own material is thin.

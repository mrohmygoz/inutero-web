# Phase 13 — News: Design

## Table of Contents

- [Context](#context)
- [Goals / Non-Goals](#goals--non-goals)
- [Decisions](#decisions)
- [Source Material → Filter Tag Assignment](#source-material--filter-tag-assignment)
- [Risks / Trade-offs](#risks--trade-offs)
- [Open Questions](#open-questions)

## Context

See `proposal.md` → *Why*. Two constraints shape the approach:

1. **The detail route already works.** `app/[locale]/news/[slug]/page.tsx` and the `content/`
   manifest shipped in Phase 4, currently serving one placeholder entry. This phase is the
   listing plus real content, not a new content pipeline — same shape as Phase 10 (Portfolio)
   relative to Phase 4's seeded portfolio entry.
2. **The filter row has no prototype.** Same finding as Portfolio (D083) and Artists (D094): a
   `node.reactions` sweep of all four News frames turns up no interaction on the tag row.
   Figma draws one static state (`All` active).
3. **The frame is 6001px tall — over the project's ~5000px single-phase guideline.** This
   phase scopes to header + filter + grid; pagination and the closing `NewsletterSignup` band
   move to Phase 13a (see D-E below).

## Goals / Non-Goals

**Goals:**

- Reuse Portfolio's filter mechanism verbatim (D-B, `phase-10-portfolio/design.md`; reused
  again by Artists, D094) — single-select, `All` default, client-side, no URL sync. This
  phase does not re-derive that interaction, only supplies News's own tag *ids* and *labels*.
- Every one of the 14 real press releases becomes a real MDX entry with a real filter tag —
  no article ships as `待補` or under a guessed/default tag.
- ZH bodies are the original press release text, verbatim (client-authored — this is the one
  content type in the site where "translate for the other locale, preserve exactly for this
  one" both apply within the same phase, unlike Portfolio/Artists where Chinese was also
  AI-assisted).

**Non-Goals:**

- Multi-select filtering, URL-synced filter state, search — same non-goals Portfolio recorded,
  unclaimed by any News frame either.
- Re-litigating the filter *mechanism* — only the tag set is page-owned (Artists precedent,
  D094: mechanism reused, "what is page-owned" is the label text and empty-state copy).
- News Details' template redesign (Phase 14) — this phase does not touch how a body renders,
  only which bodies exist.
- The featured-banner node (`12211:4017`) — the matrix marks it `待補` with its purpose
  unconfirmed in Figma ("元件未展開，需在Figma確認用途"). Not built, same as Portfolio's removed
  description paragraph.

## Decisions

### D-A: Filter tag taxonomy — News's own four categories, not the service lines

**Chosen:** `All / Artists & Works / Global Touring / Events / About In Utero` (EN) —
`全選／音樂新訊／活動消息／國際曝光／子皿營運日誌` (ZH), taken verbatim from `content-matrix.md`'s
News section. Tag ids live in a new `newsFilters` table in `routes.ts`, mirroring the shape of
`serviceAnchors` (id + both-locale label, one source so the row and any per-article tag cannot
drift) — but this is an **independent table**, not a reuse of `serviceAnchors` itself. The
matrix is explicit that this is "the one tag set that is not the service lines" (do not reuse
Portfolio/Artists tag ids here, and do not let News's ids leak into either of those pages).

**Alternatives considered:** Reusing `serviceAnchors` — rejected, matrix explicitly calls this
out as a different taxonomy. Deriving tags from Figma's drawn sample (`All / Industry / artists
/ tour / events`) — rejected, the matrix's final copy supersedes it (content-matrix outranks
Figma text layers, per `CLAUDE.md`).

### D-B: One tag per article, assigned by content, not by date or rotation

**Chosen:** Each article gets exactly one filter tag (single-select mechanism, D-B/D094
precedent), assigned by reading what the press release is actually about — see the table
below. This is a **judgment call per article**, not an auto-generated distribution: a single
release is `Artists & Works`, an SXSW showcase is `Global Touring`, a concert/ticket/festival
announcement is `Events`, and In Utero's own brand-led community initiative is `About In
Utero`. Same tagging discipline as Portfolio's 職責-derived tags (D087) — real category, not
`待補`.

**Alternatives considered:** Tagging every press release `Events` (most are event-adjacent) —
rejected, it would make three of the four filter tags nearly empty and defeats the point of a
filter. Leaving tags unassigned pending client input — rejected per this session's explicit
instruction to design the feature and assign tags now, not defer.

### D-C: The Phase 4 placeholder article is retired, not kept alongside real content

**Chosen:** `content/news/{en,zh}/taipei-indie-goes-abroad.mdx` is deleted. Its underlying
story — In Utero's free community tour with 緩緩 Huan Huan — is real and has its own genuine
press release dated 2026.05.13, which becomes this phase's `About In Utero`-tagged entry with
real body text and real photos. Keeping both would duplicate one real event under two slugs
with two different (one fabricated) bodies.

**Consequence:** `public/images/content/sample-live.jpg` loses its only `content/` reference.
`app/styleguide/_components/BlockSpecimens.tsx` still references it directly — that reference,
and the file's deletion, stay out of this phase's scope (styleguide is not a page phase touches
for content reasons); the roadmap's Inherited Work row is updated to reflect only that
remaining reference.

### D-D: Real photos, sourced per article from the client's supplied folder

**Chosen:** Each MDX entry's hero/body image(s) come from that article's own press-photo
folder under `web_ref/news/`, exported to `public/images/news/<slug>/`. Mirrors Portfolio's
precedent (real posters shipped in Phase 10, not deferred) and Artists' (real photos, Phase
12) — this site has consistently shipped real imagery as soon as it exists, never a grey box
placeholder for content the client has already supplied.

### D-E: Split at the grid, not mid-grid — pagination and newsletter move to Phase 13a

**Chosen:** This phase's boundary is the article grid's bottom edge. Pagination and
`NewsletterSignup` are both self-contained existing components with no dependency on the grid's
internals beyond a page-count number — deferring them costs nothing structurally, unlike
splitting the grid itself would.

**Alternatives considered:** Splitting header vs. filter+grid (mirrors Home's roughly-even
5/6 split) — rejected, the filter and grid are one client component (`NewsGrid`) and cannot
review independently; a header-only review gate would show an empty page. Building everything
in one phase anyway — rejected per the project's stated ~5000px guideline, and pagination's
reachability is itself a per-page-size question (Risks, below) better verified once the grid
it depends on already exists and is reviewed.

## Source Material → Filter Tag Assignment

14 real press releases in `web_ref/news/` (2026.01.28–2026.05.13), each with a `.docx` press
release and photo assets. All 14 ship. Slugs are new (kebab-case, English, per `routes.md`'s
slug convention); dates are the folder's date.

| Date | Headline (source, ZH) | Filter tag | Why |
| :--- | :--- | :--- | :--- |
| 2026.01.28 | Organik Festival 2026 有機音樂祭 4/24-4/26，早鳥旋即完售 | Events | Festival ticket-sale news |
| 2026.03.06 | 6 組臺灣音樂人將參演 2026 SXSW「Taiwan Beats Showcase」 | Global Touring | Overseas showcase announcement |
| 2026.03.13 | 雷擎 L8ching 推出春日公路單曲〈藍色公路〉 | Artists & Works | Single release |
| 2026.03.27 | 6 組臺灣音樂人出演 2026 SXSW 大獲好評 | Global Touring | Overseas showcase recap |
| 2026.03.28 | 滅火器包場《冠軍之路》票房破億，開啟小巨蛋「攻蛋之路」 | Events | Concert-run announcement |
| 2026.04.02 | 昭霖 Zhaolin 推出首張個人創作專輯《夢中相見》 | Artists & Works | Album release |
| 2026.04.08 | 滅火器台北小巨蛋演唱會啟售記者會 | Events | Ticket sale / press conference |
| 2026.04.10 | Organik Festival 完整 38 組藝人陣容公開 | Events | Festival lineup announcement |
| 2026.04.14 | 滅火器小巨蛋加開 7/19 場次 | Events | Ticket sale announcement |
| 2026.04.16 | aDAN 薛詒丹《孤獨金魚：自由的練習》專場 | Events | Concert announcement |
| 2026.04.17 | 雷擎L8ching 推出鄉村搖滾單曲〈我愛我的生活〉 | Artists & Works | Single release |
| 2026.04.29 | 昭霖 Zhaolin 相隔一個月再發新專《夢中夢》 | Artists & Works | Album release |
| 2026.05.01 | 雷擎L8ching《春子》新專輯聽歌會 | Events | Listening-party event recap |
| 2026.05.13 | 子皿 In Utero 攜緩緩 Huan Huan 走入日照中心與地方社區 | About In Utero | In Utero's own brand-led community initiative, not a client artist's release/event |

Distribution: Events 7, Artists & Works 4, Global Touring 2, About In Utero 1 — uneven, but
that is the real shape of the client's press output (mostly concert/ticket news), not an
artifact of the tagging. The one `About In Utero` article is enough to exercise that filter's
non-empty and its siblings' non-selected states; no filter is left permanently empty.

## Risks / Trade-offs

- **[Risk]** 14 articles is enough that Phase 13a's pagination may actually be reachable,
  unlike Portfolio's (3 projects) and Artists' (8) → **Mitigation**: this phase's grid renders
  unpaginated (all 14 cards, `Pagination` not yet wired in) — 13a must derive a page size from
  the grid and verify in-browser whether the control renders, rather than assuming Portfolio's
  "not reachable" finding (D084) carries over.
- **[Risk]** Translating 14 press releases introduces EN copy that has no client review yet →
  **Mitigation**: flag EN bodies as AI-translated, not final client copy, in the same place
  Portfolio (D081) and Artists (bios) flagged their AI-assisted EN — the outstanding-copy
  table in `content-matrix.md`.
- **[Risk]** `.docx` source files need extraction before they can be read/translated →
  **Mitigation**: convert during `tasks.md` execution (existing `pdf`/`docx`-handling
  tooling, not a new dependency); source `.docx` files stay in `web_ref/`, never committed to
  the repo.

## Open Questions

None — filter taxonomy, tag assignment, and content scope were resolved this session rather
than deferred.

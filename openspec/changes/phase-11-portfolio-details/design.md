## Context

`ContentDetail` (`app/[locale]/_components/ContentDetail.tsx`) is explicit throwaway scaffolding
— its own comment says Phases 11 and 14 replace it wholesale. It currently serves both
`portfolio/[slug]` and `news/[slug]`. This phase only owns Portfolio; News Details is Phase 14.

The content matrix's "Project Details" section gives real meta for three projects (合作夥伴 /
時間 / 職責), but 合作夥伴 (Client) is present for two of the three and absent for the third, and
no project has a 連結 (Link) value — the sheet's only Link is Figma's own sample data
("bottomsup.tw"), explicitly called out elsewhere in the matrix as sample rather than supplied
content. `時間` and `職責` are already captured as `dateLabel` and `services` in the existing
frontmatter contract (Phase 10); only Client is new.

Figma's pagination footer reads "Back to portfolio / 1 / 12" — sample data for a 12-item set.
The real set is three items, all Phase 11 will ever see.

The content matrix flagged all three article bodies as `待補` and Phase 11's — that supply
landed 2026-09-27 as three client press releases (one per project, 600–900 Chinese characters
each) plus photos: three each for `hotpot-band-show` and `inner-voices-of-that-day`, and one
lead promo shot for `bottoms-up` (supplied slightly later than the release itself). See
tasks.md §2a for the source paths and per-project photo list.

## Goals / Non-Goals

**Goals:**
- Real Portfolio Details page matching the Figma frames (breadcrumb, meta row, body, footer).
- Desktop-only left share rail, closing the roadmap's Phase 11/14 inherited-work row for this
  route.
- Home's three cards and the page's own prev/next linking use real slugs, not the index page.

**Non-Goals:**
- `news/[slug]` — untouched, still renders through `ContentDetail`. Phase 14 owns it.
- A fourth project or any new project content — three real projects is the full supplied set.
- Resolving D079 (zh mobile `Label/M` token bug) — out of scope, tracked separately.

## Decisions

**`client` is optional, not required, on portfolio frontmatter.** The validator in
`frontmatter.ts` currently makes `dateLabel`/`image`/`services` required-and-non-empty on
portfolio, forbidden on news. `client` follows the same required-on-portfolio/forbidden-on-news
shape for *presence of the key as a concept*, but unlike those three, the sheet itself omits a
value for one of three real projects (Vol.3 彼日的心內話 has no 合作夥伴 row) — so making it
required-non-empty would force fabricating a value the client never supplied. `client` is typed
`string` and allowed to be `""` on portfolio (rendered as an absent meta row, not a broken one),
still forbidden (must be absent) on news. This is the one field in the contract that is
optional-but-typed rather than required-but-typed — documented here since it's the exception to
Phase 10's pattern, not a new pattern.

**Link is not rendered.** No real project has a link value, and inventing one (a placeholder
URL, or the client's own site) would render fabricated content. The Figma meta row templates
Client / Date / Role / Link as a fixed four-item list; this implementation renders whichever of
Client / Date / Role have values and omits Link entirely, since the frontmatter contract has no
field for it and no supplied data to put there. If a future project supplies a link, add the
field then rather than reserving empty UI now.

**Pagination footer is prev/next by array order, not "N / 12".** The `Pagination` component
(`app/_components/Pagination.tsx`) already returns `null` below two pages, by design (D084) —
correct for the grid's page-of-pages meaning, but this footer's "1 / 12" is a *project* index,
not a page index, and reuses none of that component's logic. Build a small page-local prev/next
control instead: order is the content manifest's own slug order (chronological, oldest file
first, matching `PortfolioGrid`'s listing), wrapping at both ends since three items with no wrap
means the first and last project each lose one direction for no design reason. Not `Pagination`
— that component's contract is page index + count, and forcing this into it would need a fake
`pageCount` to get the right disabled-state semantics.

**`ContentDetail` is deleted, not kept for News's sake.** `news/[slug]` (Phase 14) does not
exist as a real page yet — it renders the same placeholder that has always stood in for both
routes, and that page's own Phase 14 will replace it anyway. Keeping a component alive for one
remaining call site whose owning phase is guaranteed to delete it within a few phases adds dead
weight now for zero benefit later; Phase 14 writes its own detail component the same way this
phase does for Portfolio. `news/[slug]/page.tsx` continues to import `ContentDetail` until
Phase 14 — deleting the file now would break that route, so `ContentDetail` stays until Phase 14
repoints the import, but Portfolio stops depending on it as of this phase.

**Share rail lives in the new Portfolio Details page component, not in `Cms`.** D027 already
settled that share UI is not `Cms`'s concern — `Cms` renders body content, `ShareRow` and the
new rail act on the page. The rail is desktop-only (`hidden lg:flex` or equivalent), fixed/sticky
alongside the body per the Figma frame, and reuses `ShareRow`'s existing copy-link/LinkedIn/X/
Facebook target logic rather than re-deriving the current-URL handling — extract that logic to a
shared hook/util if `ShareRow` and the rail would otherwise duplicate the `useSyncExternalStore`
call, decided during implementation once both shapes are on screen together.

**Article bodies are a condensed rewrite of the press releases, not a verbatim copy — per user
decision.** Each release is full media-kit copy (quotes from every band member, ticketing
details, sponsor credits) sized for a news outlet, not a portfolio page. The MDX body keeps the
concrete facts (dates, venues, who played) and one or two human quotes, and drops ticketing
mechanics and sponsor-credit boilerplate that don't serve a portfolio reader. The EN body is
adapted from the condensed ZH version rather than translated line-by-line, matching the voice
`inner-voices-of-that-day.mdx`'s existing EN body already established before this phase. Photos
are interspersed 2–3 per body (also per user decision) rather than appended as a gallery, each
captioned with what it actually shows, not a generic label.

**Home's cards get an explicit `slug` field, not a title-matching lookup.** `home.ts`'s
`featuredProjects.cards` are keyed by `title` today (used only as a React `key`). Matching a
card to a portfolio slug by comparing titles is fragile — a future copy edit to one string and
not the other silently breaks the link. Add `slug: string` to each card object and read it
directly in `HomeFeaturedProjects.tsx` to build the href via `localizedHref`.

## Risks / Trade-offs

[Client field renders inconsistently across the three cards — two show a Client row, one
doesn't] → This is the real content, not a bug; the Figma frame shows one fixed sample set and
never demonstrates the field-missing case, so there's no visual precedent to match — the row
simply doesn't render, consistent with how the rest of the site treats optional content.

[Prev/next wrap-around may not match a not-yet-seen prototype] → A `node.reactions` sweep of the
Portfolio Details frames should run during implementation, matching Phase 10's rigor; if a real
prototype exists on the pagination footer, it wins over this derived wrap behavior.

[Extracting share-URL logic from `ShareRow` touches an already-shipped component] → Keep the
extraction minimal (a hook returning the current absolute URL) and verify `ShareRow`'s existing
News/Portfolio Details rendering is pixel-identical after the refactor.

# Phase Roadmap

The live phase plan. **This file is editable** — unlike `DECISIONS.md`, which is append-only,
and unlike the archived `bootstrap-site-build-process/design.md`, which holds the original
version of this table as history and must not be changed.

Every phase updates this file: tick its row, and record anything it deferred under
[Inherited Work](#inherited-work).

## Table of Contents

- [The Rule](#the-rule)
- [Phase Plan](#phase-plan)
- [Inherited Work](#inherited-work)
- [Still Open](#still-open)

## The Rule

**One phase per session. Never start the next phase.** The gate is structural — the next
phase's proposal does not exist yet, so there is nothing to work from. If the current phase's
tasks are done, stop and report.

The loop and the per-phase requirements live in `CLAUDE.md` → "How This Project Is Built".

## Phase Plan

Phases 8–15 may still split; this is a plan, not a contract. Phase 4 already split into two
changes, and Phase 7 grew a 7a/7b/7c trio.

| Phase | Name | Status | Change id | Output |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Design inventory | ✅ Done | `2026-08-01-bootstrap-site-build-process` | `openspec/reference/` |
| 1 | Skeleton, tokens, i18n | ✅ Done | `2026-08-01-phase-01-skeleton-tokens-i18n` | `/en` and `/zh` resolve; `/` redirects; `/styleguide` shows the ramps; both scripts' fonts load |
| 2 | Primitives | ✅ Done | `2026-08-01-phase-02-primitives` | CTA, Secondary CTA, Tag, card shells — all on `/styleguide` |
| 3 | Shell | ✅ Done | `2026-08-02-phase-03-shell` | NAV (light + dark, EN + CN), Footer (EN + TC); all 9 routes stubbed × 2 locales |
| 4 | Content matrix copy | ✅ Done | `2026-08-02-phase-04-content-matrix-copy` | `content-matrix.md` as the copy source of truth (D032) |
| 4 | Shared blocks | ✅ Done | `2026-08-02-phase-04-shared-blocks` | UniversalCTA, NewsletterSignup, Article card, MDX pipeline + `Cms` body renderer |
| 5 | Home part 1 | ✅ Done | `2026-08-03-phase-05-home-part-1` | 主視覺, 品牌聲明 |
| 6 | Home part 2 | ✅ Done | `2026-08-03-phase-06-home-part-2` | 專案精選, 核心服務, 行動呼籲 |
| 7 | Our Story | ✅ Done | `2026-08-04-phase-07-our-story` | `/[locale]/about`, both breakpoints |
| 7a | OpenSpec hygiene | ✅ Done | `2026-09-18-phase-07a-openspec-hygiene` | Reference docs corrected; this roadmap promoted out of the archive. Docs only. |
| 7b | Component consolidation | ✅ Done | `phase-07b-component-consolidation` | Shared `Eyebrow` (12 call sites, 6 components); `TitleGroup` deleted; i18n split into `{en,zh}/{home,about,common}.ts` with explicit `typeof en*` annotations. `SectionHeader` audited and **not** built — 2 of 9 sites fit, gate was 5 (D057). Refactor only, no pixels changed. |
| 7c | Mobile menu viewport fit | ✅ Done | `phase-07c-mobile-menu-viewport-fit` | The open mobile menu was a fixed 838px box (EN; 773px ZH) that scrolled on anything shorter. Overlay moved to `h-dvh`, body scroll lock added, seven link boxes clamped and the logo block dropped below `max-height: 666px`. Close row pinned top, footer bottom, mark + links centred between (D065, diverges from Figma by user decision). Fits without scrolling down to 553px where the mark is absent; short phones keep the mark and scroll instead. Decisions D062–D065. |
| 8 | Services part 1 | ✅ Done | `phase-08-services-part-1` | `/[locale]/services` 首圖 + 服務部分, both breakpoints. `ServicesHero` matches Figma's desktop frame heights exactly (1334px EN, 1528px TC). Mobile was built to 825px EN / 880px TC and then hand-tuned post-build to 814 / 870 by user decision — mobile is deliberately ~10px off the frame, desktop is not. `ServiceCard` got its first real consumer and two Phase 3 errors fell out of it — desktop feature rows stack, they do not pair up (D069). Decisions D066–D073. |
| 9 | Services part 2 | ✅ Done | `phase-09-services-part-2` | 常見問題部分 + 行動呼籲, both breakpoints. FAQ is a five-item accordion — designed behaviour, but a deep `node.reactions` sweep found **no prototype at all** on this section, so the 300ms timing is inherited from D041 rather than measured (D074). `AccordionPanel` promoted to `app/_components/`, mechanics only (D075). `UniversalCTA` placed unmodified, its second real consumer. Footer's Services sub-links now deep-link to anchors (D077). Decisions D074–D079. |
| 10 | Portfolio | ✅ Done | `phase-10-portfolio` | `/[locale]/portfolio`, both breakpoints. Three real projects from the client sheet, driven by the **MDX manifest** rather than a parallel data module (D080) — `dateLabel`, `image` and `services` join the frontmatter contract, validated per content type (D081). `ProjectCard` gained its `variant` prop and the long-standing "they differ only in child order" note turned out to be **wrong** — the two cards also differ in padding structure and image box (D082). Filter, empty state and paginator are **entirely derived**: a reaction sweep of all four frames found prototypes on the NAV, the Footer and the grid container only (D083–D085). The paginator ships unreachable — three projects is one page. Home's card tags were realigned to the sheet's 職責 (D087). Decisions D080–D088. |
| 11 | Portfolio Details | ✅ Done | `phase-11-portfolio-details` | `/[locale]/portfolio/[slug]`, both breakpoints. Real article bodies for all three projects, condensed from client press releases (D090). `client` frontmatter field added, optional-but-typed — the one portfolio field allowed empty (D090). Desktop-only `ShareRail` built, composed by the new page-local `PortfolioDetail`, not `Cms` (D027); `ShareRow`'s URL/target logic extracted to `share.ts` for both to share. Prev/next footer replaces the sample "1/12" counter, wrapping at both ends of the three-project set (D090). Figma's Gallery section is not built — no project supplies distinct gallery images (D090). **Gallery gap resolved by Phase 11a** — see below. Home's three Featured Project cards repointed at real slugs. Decision D090. |
| 11a | Portfolio Gallery | ✅ Done | `phase-11a-portfolio-gallery` | Built the Gallery section D090 deferred, after client review flagged it as missing. New `Gallery.tsx` (page-local, horizontal scroller — Figma's own 4-image sample overflows its section width) sourced from `ContentEntry.galleryImages`: hero + body photos (parsed from raw `.mdx` in document order) + a new optional `gallery` frontmatter field, deduplicated. No min/max enforced. Decision D091 (supersedes D090's "not built" clause, not its fabrication reasoning). |
| 12 | Featured Artists | ⬜ Planned | — | `/[locale]/artists` |
| 13 | News | ⬜ Planned | — | `/[locale]/news` (6001px — may split) |
| 14 | News Details | ⬜ Planned | — | `/[locale]/news/[slug]` (6448px — likely splits) |
| 15 | Contact | ⬜ Planned | — | `/[locale]/contact` + form submit target |
| F | Polish | ⬜ Planned | — | Tablet audit, per-page metadata both locales, `hreflang`, a11y, asset export, Lighthouse |

## Inherited Work

Deferrals with a known target, recorded by the phase that made them. A phase claiming one of
these rows must tick it here. These were previously discoverable only by reading a component's
notes in `INVENTORY.md`, which is not where a phase looks.

| Owed by | Item | Source |
| :--- | :--- | :--- |
| ~~Phase 10~~ ✅ | ~~Reconcile the Portfolio card with a variant prop on `ProjectCard`.~~ **Done — and the premise was wrong.** The row said the two differ as a "different design" but every note framed that as child order. A `get_design_context` diff found they also differ in the card-vs-content padding split and in the image box (fixed 352.386px full-bleed vs `aspect-[333/445]` inset). The prop survived; the reasoning did not (D082). | `INVENTORY.md` → `ProjectCard` |
| ~~Phase 11~~ ✅ | ~~Replace `ProjectCard`'s neutral image placeholder with real project imagery.~~ **Done early in Phase 10.** The posters were already exported to `public/images/projects/` by Phase 6 and are carried by the MDX `image` field. The placeholder path remains for a card with no image. | `INVENTORY.md` → `ProjectCard` |
| ~~Phase 11~~ ✅ | ~~Repoint Home's three project cards from `/[locale]/portfolio` at their real detail routes.~~ **Done.** Each card in `home.ts` gained an explicit `slug` field (not a title-matching lookup — a future copy edit could silently break that); `HomeFeaturedProjects.tsx` builds each `href` from its own card's slug. Home still hardcodes its three cards in `home.ts` rather than reading the manifest — not folded in, out of scope for this phase. | D043; Phase 10; D090 |
| ~~Phase 11~~ ✅ | ~~Build the desktop-only left share rail.~~ **Done as `ShareRail`**, composed by the new `PortfolioDetail` page component (not `Cms` — D027). `ShareRow`'s URL-read/target logic moved to a shared `share.ts` module so both use one implementation. News Details (Phase 14) can reuse it verbatim or promote it to `app/_components/` if it does. | `INVENTORY.md` → `Cms`, `ShareRow`, `ShareRail`; D031; D090 |
| Phase 14 | Delete `public/images/content/sample-live.jpg`. Phase 11 tried and couldn't — it's still referenced by `content/news/{en,zh}/taipei-indie-goes-abroad.mdx` and the styleguide's `BlockSpecimens`. Once News Details (Phase 14) gives that article a real photo, or the placeholder reference is otherwise removed, delete the file. | Phase 11 tasks.md §2a.7 |
| ~~Phase 8~~ ✅ | ~~Re-measure the mobile menu's clamp minima.~~ **Resolved, no re-measure needed.** Phase 8 added `services` to `darkNavRoutes` only — a theme table, not the link list — so the seven-link count the 553px floor is sized for is unchanged. Verified in the browser: the overlay fits at 393x553 in both locales. The obligation transfers unchanged to the next phase that touches `routes.ts`'s `routes` array. | D062, D063 |
| User | **Verify the mobile menu on a real phone.** Phase 7c could not: `h-dvh` and browser-chrome behaviour are not reproducible in headless Chrome, which checks the arithmetic but not the chrome. The specific thing to watch is the logo staying put while the URL bar collapses mid-scroll. | D064; phase-07c task 6.6 |
| Phase F | Build the Our Story **Credits** section. The matrix marks it `新增段落` (a section Figma does not draw); Phase 7 deferred it by user decision, partly because the Web Design credit is still `待補`. Recorded only in `2026-08-04-phase-07-our-story/proposal.md` until now. | `content-matrix.md` → Our Story; phase-07 proposal |
| ~~Phase 9~~ ✅ | ~~Repoint the Footer's five Services sub-links.~~ **Done — and it was FOUR links, not five.** `serviceLabelKeys` held four, mapping 1:1 onto the four service cards, so nothing was left over. They now point at `/{locale}/services#{id}`, with labels and ids paired in `routes.ts`'s `serviceAnchors` so they cannot drift, and `scroll-mt` on the card clearing the absolute NAV. Verified from another route and same-page at both breakpoints (D077). | `phase-08-services-part-1/design.md` → Open Questions |
| Phase F | **Re-check the Services mobile hero padding.** Built at Figma's 29/20/25, hand-tuned to 20/16/20 after the build, which shortens the hero by ~10px at both locales. Intentional, but it is the one place on the page that knowingly misses the Close tier. | `ServicesHero.tsx` |
| Phase F | **Audit the Services 768–1023px band.** It is deliberately the mobile design at a wider viewport (D072); the one visible artifact is the hero body's fixed 354px box leaving space to its right. | D072 |
| Phase F (or user) | **`Label/M` is `11 / 11` in `globals.css` but `14 / 14` in `design-tokens.md` for Mobile Chinese** — the one mode where it differs, bolded as such in the reference. Every eyebrow and label on `/zh` below 1024px renders 3px small. Figma corroborates 14px. Reported and **deliberately left untouched at the user's instruction**; fixing it repaints already-approved zh mobile pages site-wide and needs its own change. | D079 |
| Phase F | **Services page totals drift from the frames, and the cause is Phase 8's cards, not Phase 9's sections.** `ServicesList` renders 584px desktop cards against the drawn 647px — which is D066 working as intended (content-driven, three feature rows not four) — and the mobile cards run long in EN. Phase 9's own sections measure true: CTA is exact in all four combos, FAQ is +3.9px desktop EN and otherwise differs only by copy the matrix changed. Worth one deliberate look at the whole page rather than per-section. | Phase 9 verification |
| Before Phase F | **Revisit D039.** The floating desktop `MENU` square `12423:8613` carries a real prototype reaction — `ON_CLICK` → `OVERLAY` to `12612:8541`. D039 deferred it on the premise that frame was a stray duplicate; the prototype contradicts that. Needs its own change: it touches `Nav` and every page rendering it. | D045 |
| Phase F | **Audit the Portfolio 1024–1439px band.** The grid stays 3-up with fluid columns down to 1024px rather than dropping to 2-up (D086, user decision). The known cost is narrow cards near 1024px. | D086 |
| Phase F (or whoever adds a 10th project) | **Verify the paginator in a reachable state.** It ships built and correct but invisible — three projects is one page, so the Phase 10 gate could not see it. Checked by temporarily lowering the page size; that is not a page state a reviewer can reach. The page size itself (9) is derived, since Figma's two grids disagree — 11 slots desktop, 5 mobile. | D084 |
| Phase F | **Portfolio's mobile TC header is 163px against the frame's 213px.** The frame's height comes from a rotated eyebrow rail sized for `CASE STUDIES` at the Mobile Chinese `Label/M` — copy the matrix replaced, at a token D079 already reports as wrong. Not reproducible with the delivered copy, deliberately not chased. Mobile EN is within 1px and both desktop headers are exact. | D088, D079 |

## Still Open

Questions that are genuinely undecided. Answered questions belong in `DECISIONS.md`, not here.

| Question | Needed by |
| :--- | :--- |
| Contact form submit target — a Route Handler that emails, or a third-party form service? The design shows the form; delivery is not a design concern. | Phase 15 |
| Tablet behavior (768–1439px) has no design. Each phase derives it and records the derivation; Phase F audits the result as a whole. | Phase F |

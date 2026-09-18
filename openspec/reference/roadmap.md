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
| 7c | Mobile menu viewport fit | ✅ Done | `phase-07c-mobile-menu-viewport-fit` | The open mobile menu was a fixed 838px box (EN; 773px ZH) that scrolled on anything shorter. Overlay moved to `h-dvh`, body scroll lock added, seven link boxes clamped and the logo block dropped below `max-height: 820px` — fits without scrolling down to 553px. 393×852 is byte-identical to before in both locales. Decisions D062–D064. |
| 8 | Services part 1 | ⬜ Planned | — | 首圖, 服務部分 (the frame is 6260px, which is why it splits) |
| 9 | Services part 2 | ⬜ Planned | — | 常見問題部分, 行動呼籲 |
| 10 | Portfolio | ⬜ Planned | — | `/[locale]/portfolio` |
| 11 | Portfolio Details | ⬜ Planned | — | `/[locale]/portfolio/[slug]` + real MDX content |
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
| Phase 10 | The Portfolio page's card `12610:6812` is genuinely image-first — a **different design**, not a breakpoint variant of Home's card. Reconcile it with a variant prop on `ProjectCard`, never an `lg:` switch. | `INVENTORY.md` → `ProjectCard` |
| Phase 11 | Replace `ProjectCard`'s neutral image placeholder with real project imagery from MDX content. | `INVENTORY.md` → `ProjectCard` |
| Phase 11 | Repoint Home's three project cards from `/[locale]/portfolio` at their real detail routes. The prototype targets Portfolio Details (`12612:8706`); the index was a deliberate stand-in until a slug exists. | D043 |
| Phase 11 / 14 | Build the desktop-only left share rail. `ShareRow` (the bottom row) shipped in Phase 4; the rail did not. | `INVENTORY.md` → `Cms`, `ShareRow`; D031 |
| Phase 8 | **Re-measure the mobile menu's clamp minima.** Phase 8 adds nothing to `navRoutes`, but any phase that does invalidates the 553px floor arithmetic — it is sized for exactly seven links. Take the room from the links or the logo, never the exempt close/social/locale rows (D062). | D062, D063 |
| User | **Verify the mobile menu on a real phone.** Phase 7c could not: `h-dvh` and browser-chrome behaviour are not reproducible in headless Chrome, which checks the arithmetic but not the chrome. The specific thing to watch is the logo staying put while the URL bar collapses mid-scroll. | D064; phase-07c task 6.6 |
| Phase F | Build the Our Story **Credits** section. The matrix marks it `新增段落` (a section Figma does not draw); Phase 7 deferred it by user decision, partly because the Web Design credit is still `待補`. Recorded only in `2026-08-04-phase-07-our-story/proposal.md` until now. | `content-matrix.md` → Our Story; phase-07 proposal |
| Before Phase F | **Revisit D039.** The floating desktop `MENU` square `12423:8613` carries a real prototype reaction — `ON_CLICK` → `OVERLAY` to `12612:8541`. D039 deferred it on the premise that frame was a stray duplicate; the prototype contradicts that. Needs its own change: it touches `Nav` and every page rendering it. | D045 |

## Still Open

Questions that are genuinely undecided. Answered questions belong in `DECISIONS.md`, not here.

| Question | Needed by |
| :--- | :--- |
| Contact form submit target — a Route Handler that emails, or a third-party form service? The design shows the form; delivery is not a design concern. | Phase 15 |
| Tablet behavior (768–1439px) has no design. Each phase derives it and records the derivation; Phase F audits the result as a whole. | Phase F |

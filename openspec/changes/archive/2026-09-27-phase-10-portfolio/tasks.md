# Phase 10 — Portfolio: Tasks

## 1. Design context

- [x] 1.1 Invoke `/figma-design-to-code`, then `get_design_context` + `get_screenshot` for the header on all four frames: `12573:6910`, `I12635:12926;12573:6910`, `12210:3066`, `12368:2455`.
- [x] 1.2 Fetch the filter rail on all four: `12573:6926`, `I12635:12926;12573:6926`, `12210:3084`, `12368:2458`. Capture the real filter label in each locale — mobile TC reads `專案種類`, which is not a translation of `Filter`; confirm what desktop TC uses rather than assuming it matches.
- [x] 1.3 Fetch the Portfolio card `12610:6812` (desktop EN), `I12635:12926;12610:6812` (desktop TC), `12219:1187` (mobile EN), `12368:2473` (mobile TC).
- [x] 1.4 Fetch Home's card `12210:2404` for comparison. **Diff the two element sets.** If they differ by anything other than child order, stop and report before touching `ProjectCard` — that invalidates D-C.
- [x] 1.5 Fetch the pagination row: `12573:7129` (desktop) and the `Pagination (V3)` instances `12341:1980` / `12368:2478` (mobile).
- [x] 1.6 Sweep `node.reactions` across all four page frames for any prototype on the filter tags or pagination buttons. Record the result either way — D041's precedent is that "no prototype found" is itself a finding worth writing down.

## 2. Data layer

- [x] 2.1 Extend `parseFrontmatter` with a content-type argument and a `services` field validated for `portfolio` only; values must be `serviceAnchors` ids from `routes.ts`. An unknown id throws naming the file and the id.
- [x] 2.2 Update every `parseFrontmatter` call site in `app/_lib/content/index.ts` to pass the type; widen the `Frontmatter` type so `services` is present on portfolio entries.
- [x] 2.3 Add `services` to `content/portfolio/{en,zh}/inner-voices-of-that-day.mdx` (renamed from `huan-huan-free-tour` to match its title) (Vol.3 — 行銷宣傳／巡演規劃／活動製作).
- [x] 2.4 Author `content/portfolio/{en,zh}/` MDX for Vol.2 一起喝酒的朋友 and Vol.1 鍋 Band Show from `content-matrix.md` → *Project Details — the three real projects*. Frontmatter + a short placeholder body only; real bodies are Phase 11's. English is AI-generated and marked non-final.
- [x] 2.5 Confirm `npm run dev` loads all three detail routes in both locales — the parity check and the new field both fail loudly at build time if 2.3/2.4 are wrong.

## 3. Copy

- [x] 3.1 Create `app/_lib/i18n/{en,zh}/portfolio.ts` — eyebrow, heading, filter label, the five tag labels, the empty-state line, and pagination labels. Source is `content-matrix.md` → *Portfolio* (D032), which outranks the Figma text layers.
- [x] 3.2 Register both in `app/_lib/i18n/{en,zh}/index.ts` with the explicit `typeof en*` annotation Phase 7b established.
- [x] 3.3 Verify the four service tag labels match the Services page exactly — #4 is `活動製作`, never `演出製作` (matrix conflict #1).

## 4. `ProjectCard` variant

- [x] 4.1 Add `variant?: 'home' | 'portfolio'` defaulting to `'home'`; `'portfolio'` renders image-first per 1.3. No `lg:` switch — the ordering is per-page, not per-breakpoint.
- [x] 4.2 Confirm Home's three cards at `/en` and `/zh` are pixel-unchanged at both breakpoints. This is a regression check, not a new screenshot comparison.
- [x] 4.3 Add the variant to `/styleguide` so both orderings are reviewable side by side.

## 5. Page sections

- [x] 5.1 Add `portfolio` to `darkNavRoutes` in `routes.ts`. Re-confirm the mobile menu still fits at 393×553 in both locales — the `routes` array is untouched, so the Phase 7c clamp minima should hold, but verify rather than assume.
- [x] 5.2 Build `PortfolioHero` (server) — eyebrow + TagDot + display heading, both breakpoints, both locales. **No description paragraph** (matrix `直接刪除段落`). Reuse the shared `Eyebrow`; the hero reserves the NAV's height itself, per D070.
- [x] 5.3 Build `Pagination` in `app/_components/` — numbered buttons, ellipsis, `Next`. Returns `null` below two pages. Presentational: takes `page`, `pageCount`, `onChange`.
- [x] 5.4 Build `PortfolioGrid` (`'use client'`) — filter row, grid, empty state, paginator. Single-select tags, `All` default, page index resets on filter change, no motion, `aria-live="polite"` on the grid region. Desktop two-column split (rail left, grid right); mobile stack.
- [x] 5.5 Grid columns: 3-up above 1024px with fluid column widths down to 1024px, single column below (D-G, user decision at the propose gate). No 2-up band.
- [x] 5.6 Replace `PagePlaceholder` in `app/[locale]/portfolio/page.tsx` — read the manifest, pass serialisable rows only (never `Body`), render hero → grid → `UniversalCTA`.
- [x] 5.7 Cards link to `/[locale]/portfolio/[slug]`.

## 6. Verification

- [x] 6.1 `next-devtools-mcp`: no framework errors or warnings on `/en/portfolio` and `/zh/portfolio`.
- [x] 6.2 Playwright screenshots at 393px and 1440px, both locales, compared against the 1.1–1.3 Figma screenshots. Measure **per section** against its frame height — the page total will drift because cards are content-driven (D066 precedent).
- [x] 6.3 Filter behaviour by hand in both locales: `Global Touring / 巡演規劃` → two cards; `Artist Management / 藝人經紀` → empty-state line; `All / 全選` → three cards.
- [x] 6.4 Paginator: temporarily lower the page size, screenshot the row against 1.5, then restore. Report this as a temporary-state check — **the user cannot reach a paginated state at the gate** (D-E).
- [x] 6.5 Tab through the filter row and confirm the grid change is announced; confirm `prefers-reduced-motion` is a no-op here (there is no motion to suppress).
- [x] 6.6 Confirm the dark NAV renders on `/portfolio` and the light NAV still renders on `/news`, `/artists`, `/contact`.

## 7. Documentation

- [x] 7.1 `app/_components/INVENTORY.md` — new `Pagination` entry; update the `ProjectCard` row with the `variant` prop and close its "owed by Phase 10" note.
- [x] 7.2 `openspec/DECISIONS.md` — append D080+ for: MDX manifest over a `projects.ts`; per-type `services` validation; the `variant` prop; derived filter semantics; the auto-hiding paginator and its derived page size; the empty-state line; the 1024–1439px fluid 3-up band. Note the reaction-sweep result from 1.6.
- [x] 7.3 `openspec/reference/roadmap.md` — tick Phase 10; close the `ProjectCard` Inherited Work row; add rows for what Phase 11 inherits (real imagery, real bodies, repointing Home's cards now that slugs exist — D043) and what Phase F inherits (tablet grid audit, paginator verification once a second page exists).
- [x] 7.4 `openspec/reference/content-matrix.md` — mark the three projects as supplied for the Portfolio cards; keep the English copy flagged non-final in the outstanding-copy table.
- [x] 7.5 `npm run lint` and `npx tsc --noEmit` both clean.
- [x] 7.6 Report honestly at the gate: the paginator unverifiable in the browser, the English copy AI-generated, and the 1.4 card diff result.

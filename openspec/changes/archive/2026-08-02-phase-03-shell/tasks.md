# Phase 3 Tasks — Shell

Ordered so the site stays runnable at every step. Group 4 (routes) lands before group 5/6
(NAV, Footer) so the shell always has somewhere to link to; if the session runs long, stopping
after group 5 leaves a navigable site with a real NAV and a still-absent Footer, which is a
coherent partial phase to report honestly.

## 1. Reference reading and setup

- [x] 1.1 Read `openspec/reference/routes.md`, `openspec/reference/design-inventory.md`, `openspec/DECISIONS.md`, `app/_components/INVENTORY.md`, and this change's `proposal.md` + `design.md`
- [x] 1.2 Read `app/globals.css` `@theme inline` and `openspec/reference/design-tokens.md` — know which tokens exist before reading any Figma value
- [x] 1.3 Read `app/[locale]/layout.tsx`, `app/_lib/i18n/`, and the Phase 2 components the shell may compose (`Cta`, `SecondaryCta`, `Tag`) so the shell reuses rather than redraws
- [x] 1.4 Invoke `/figma-design-to-code` (mandatory prerequisite before any `get_design_context` call)

## 2. Figma fetch — NAV

File key `zSq5F5v3UrVAdIjuSipe3H`. Fetch all four frames per component (desktop/mobile × EN/TC).

- [x] 2.1 Desktop NAV light: `get_design_context` + `get_screenshot` on EN `12573:10177` and CN `12653:5367`
- [x] 2.2 Desktop NAV dark: EN `12573:10140` and CN `12653:5260`
- [x] 2.3 Mobile NAV: `12219:1100` — **carries a real `Light`/`Dark` property**, resolving the Phase 0 open question; plus Logo `10275:3087`
- [x] 2.4 Expanded/menu frames: mobile `10270:2118` (EN) + `12368:2386` (TC) fetched in full; desktop `12612:8541` screenshot-checked — **it's a stray documentation duplicate, not a real desktop interaction** (see design.md Derived Sources); not built
- [x] 2.5 Occurrence survey per D012: Home `12405:6998` confirms `Desktop NAV/DARK` is a real instance over the Hero, not just an unused variant
- [x] 2.6 Token mapping recorded inline in fetched code (Display/H6 nav links, Body/L locale pill, Label/M menu button) — all map to existing tokens, no raw values needed
- [x] 2.7 Dark-NAV usage (Home Hero) recorded in `design.md` Derived Sources for page phases to consult

## 3. Figma fetch — Footer

- [x] 3.1 Desktop Footer: `get_design_context` + `get_screenshot` on Default `12573:9181`; TC screenshot `12635:16558`
- [x] 3.2 Mobile Footer `12384:4852` fetched — carries both `Default`/`TC` in one node
- [x] 3.3 Structural comparison: EN/TC identical structure both breakpoints, only copy and Chinese type-scale differ (design.md Derived Sources)
- [x] 3.4 Footer contains a newsletter field — static markup this phase per D-G / Open Questions; also found a **Services sub-links column** not in `routes.md`, scoped per new decision D-G

## 4. Route table and stub routes

- [x] 4.1 Create `app/_lib/routes.ts` per D-B — typed route list with `key`, `path`, per-locale display name, plus `localizedHref(route, locale)` and `swapLocale(pathname, locale)` helpers
- [x] 4.2 Verified against `openspec/reference/routes.md` entry by entry — 7 nav-table routes (home + 6), canonical display names per D004
- [x] 4.3 Create `app/_lib/metadata.ts` — one helper producing title + `alternates.canonical` + `alternates.languages` for a given route key and locale, reading `routes.ts`
- [x] 4.4 Create `app/[locale]/_components/PagePlaceholder.tsx` per D-F — throwaway, **not** added to `INVENTORY.md`
- [x] 4.5 Add the six static stub routes: `about`, `services`, `portfolio`, `artists`, `news`, `contact` — each a `page.tsx` rendering `PagePlaceholder` plus a `generateMetadata` calling the 4.3 helper
- [x] 4.6 Add the two dynamic stub routes `portfolio/[slug]` and `news/[slug]` per D-D — `generateStaticParams` returning one placeholder slug, relying on the locale layout's inherited `dynamicParams = false` for the 404 behavior
- [x] 4.7 Add the nav/footer/page-title copy to **both** `app/_lib/i18n/en.ts` and `zh.ts` in the same edit (D010). Prose copy goes in the dictionaries; structural route labels stay in `routes.ts` (D-B). `Services`/`In Utero` footer column headings kept literally identical across locales — matches the Figma source, which leaves them untranslated (design.md Derived Sources)
- [x] 4.8 Confirmed via `curl`: all 9 static routes × 2 locales 200; `/en/nonexistent` 404; unknown `[slug]` (`portfolio/other-slug`) 404; `/fr` 404; `/` → 307 → `/en`

## 5. Nav

- [x] 5.1 Build `app/_components/Nav.tsx` — one responsive component (D-C: `'use client'`, labels passed as props), `theme: 'light' | 'dark'` defaulting to `'light'` (D-A), links generated from `routes.ts`
- [x] 5.2 Mobile expanded menu: `<button>` with `aria-expanded`/`aria-controls`, closes on link click and on `Escape` (closes via full navigation for plain `<a>` links too — no client-side router state to desync)
- [x] 5.3 Locale switcher — swaps the first path segment via `swapLocale`, preserving the current path; label shows the *target* locale name matching Figma
- [x] 5.4 Applied the 1024px (`lg:`) collapse boundary (D-E) — one markup tree, CSS-responsive via `hidden`/`lg:flex`
- [x] 5.5 Render `Nav` in `app/[locale]/layout.tsx` above `children`
- [x] 5.6 Added NAV specimens to `/styleguide` via `ShellSpecimens.tsx` — light and dark, both locales, `data-locale="zh"` wrapper per D016

## 6. Footer

- [x] 6.1 Build `app/_components/Footer.tsx` — server component, `Default` + TC handled by locale prop not a duplicate tree, links from `routes.ts`
- [x] 6.2 Render `Footer` in `app/[locale]/layout.tsx` below `children`
- [x] 6.3 Added Footer specimens to `/styleguide` via `ShellSpecimens.tsx`, both locales, same `data-locale="zh"` pattern

## 7. Continuity artifacts

- [x] 7.1 Added `Nav` and `Footer` to `app/_components/INVENTORY.md` with file, consumers, Figma node IDs, and the `theme` prop contract
- [x] 7.2 Appended D017–D022 to `openspec/DECISIONS.md` (with ToC entries): NAV theme prop, shared route table, `Nav` client boundary, placeholder-slug stubs, 1024px nav collapse, Footer non-route content scoping
- [x] 7.3 Grepped `Nav.tsx`, `Footer.tsx`, the stub pages, `routes.ts`, `metadata.ts` — zero hex values; every bracket `px` value is component-intrinsic geometry (padding/gaps/icon sizes/logo dims/border widths) matching Figma exactly, same pattern as Phase 2 primitives
- [x] 7.4 Recorded the occurrence-survey findings in `design.md` under "Derived Sources"

## 8. Verification

- [x] 8.1 `npm run dev` (already running on :3000); `next-devtools-mcp` `get_errors` returned `{"configErrors":[],"sessionErrors":[]}` — no framework errors
- [x] 8.2 Playwright CLI screenshots at 393px and 1440px, both locales: `/en`, `/zh`, `/en/about`, `/en/portfolio/placeholder`, `/styleguide` (full page)
- [x] 8.3 Compared NAV/Footer screenshots against the Figma references fetched in groups 2–3 — structure, spacing proportions, colors, and type all match at a visual read. Not pixel-diffed numerically, but no visible drift found
- [x] 8.4 Verified route reachability via `curl` for every route in both locales (200) rather than manually clicking each link — equivalent coverage, faster to run
- [x] 8.5 Locale switcher verified by code construction (`swapLocale` preserves path, unit-testable logic) and visually confirmed on `/styleguide` (EN pill shows "繁中", ZH pill shows "EN" — target-locale labeling matches Figma)
- [~] 8.6 Mobile expanded menu verified by code review and static screenshot (collapsed state, both locales) — **not interactively click-tested** this session (no scriptable Playwright driver available in this environment, only the CLI screenshot command). Structure was built directly from the fetched `10270:2118`/`12368:2386` frames. Flagging as a gap for the user to click-test in the browser gate
- [x] 8.7 Focus-visible outline applied to every interactive element (nav links, locale pill, menu button, footer links) via the same `focus-visible:outline-(--color-brand-primary-green)` pattern as Phase 2 primitives; `aria-expanded`/`aria-controls` present on the menu button
- [x] 8.8 Confirmed via `curl` on `/en/services` and `/zh/services`: canonical + both `hreflang` alternates present, pointing at `/en/services` and `/zh/services` (not locale home). Repeated for a detail route (`/en/news/placeholder`) — also correct
- [x] 8.9 `/styleguide` still `noindex, nofollow`; `/` still 307 → `/en`. Phase 2 `Article`, `ServiceCard`, and `ArtistCard` were revised during this phase's review (see 8.12) — everything else from Phase 2 unchanged
- [x] 8.10 `npm run lint`, `npx tsc --noEmit`, `npm run build` all clean; build output confirms 9 routes × 2 locales + `/styleguide` = 19 pages, all SSG/static
- [x] 8.11 See report below.
- [x] 8.12 Extended live browser review (post-8.11) surfaced real bugs the initial screenshot pass missed, fixed against fresh Figma re-fetches rather than guessed:
  - **Logo** (`Logo.tsx`, new): exported PNGs carried an opaque placeholder background; replaced with an inline recolorable SVG built from the actual vector path. A first path-copy was accidentally truncated, cropping the mark — replaced with the complete path.
  - **Nav**: duplicate border at desktop (outer thin border stacking with the inner `border-b-3`); locale pill was outlined when Figma specifies solid-fill (dark-on-light / white-on-dark); pill height didn't match the mobile menu button (`items-center` → `items-stretch`); desktop link-row/pill wrapper was missing the `pt-10/pb-48` rhythm that makes the border cross through the logo rather than sit centered against it.
  - **Footer**: outer padding rhythm was split incorrectly (fixed to one `pt-16 pb-16` wrapper with the logo's own `py-[30px]` inside it); logo was missing entirely; logo/newsletter alignment and vertical-label top-alignment were wrong; mobile padding (`px-[10px] py-[20px]`) and background (dark, unifying the whole card) differ from desktop (`px-8 py-16`, transparent) — confirmed via a fresh mobile Figma fetch, not assumed from the desktop spec alone.
  - **Article** (Phase 2 component, revised): `border-t`/`pt-21` belonged to the text column only at desktop (was stretching under the image); missing the desktop-only title wrapper (`items-center justify-center pb-[20px]`).
  - **ServiceCard** (Phase 2 component, revised): description was in the wrong panel entirely (now overlays the photo at desktop, sits below it at mobile — two `hidden`/`lg:hidden` copies); feature rows were stacking at mobile instead of staying side-by-side; numbered tag was invisible (rotated without a reserved box, clipped by `overflow-hidden`) and, once visible, rotated the wrong direction and wasn't top-aligned with the title (fixed via pixel measurement, not estimation); missing the component's own intrinsic padding (mobile `px-[15px] py-[30px]` dark wrapper, desktop `p-8` transparent wrapper) and the photo's mobile right-bleed (`mr-[-15px]`, confirmed from Figma's own stated dimensions: 393 card − 15 padding ≈ 378 photo width, i.e. only the left inset applies).
  - **ArtistCard** (Phase 2 component, revised): was not responsive at all — hardcoded to the desktop 320×550 layout at every viewport. Rebuilt with real mobile/desktop differences (image height, content-block height, gaps, bio color/clamp, border color) verified against fresh fetches of both `12592:6786` and `12220:1114`.
  - Social-link alignment in `ArtistCard` was checked against a fresh fetch and confirmed already correct (`justify-end`/right-aligned per both breakpoint exports) — flagged by the user as a possible bug, verified NOT to be one before the session ended.
  - `app/_components/INVENTORY.md` updated for `ArtistCard`, `ServiceCard`, and `TaglineWrapper` (no longer used by `ServiceCard`) to reflect these corrections.

# Phase 8 — Tasks

## 1. Design context

- [x] 1.1 Invoke `/figma-design-to-code` before any `get_design_context` call (mandatory prerequisite).
- [x] 1.2 Fetch the Services **header** in all four frames: desktop EN `12573:6453`, desktop TC inside `12635:12925`, mobile EN `12220:2065`, mobile TC inside `12368:2814`. Record the live text of the body layer — its layer name is stale News/Portfolio copy.
- [x] 1.3 Fetch the **service cards** in all four frames: desktop `12600:7551` (instances `12612:8667`, `12600:7461`, `12600:7509`, `12600:7552`) and mobile `12220:2696` / `2666` / `2786` / `2816`, plus their TC counterparts. Capture the CTA button label in both locales (D-C leaves the label to Figma).
- [x] 1.4 `get_screenshot` on the desktop EN, desktop TC, mobile EN and mobile TC header + cards regions, to compare against later.
- [x] 1.5 Confirm every token the two sections use already exists in `@theme`; if one in `design-tokens.md` is unwired, note it for task 5.4.

## 2. Assets

- [x] 2.1 `download_assets` the hero photograph (desktop `12573:6477`, mobile `12220:2587`) into `public/images/services/`. Export both if the two breakpoints use different images (D-D).
- [x] 2.2 `download_assets` the four service card photographs into `public/images/services/`.
- [x] 2.3 Check the exported file sizes and formats; re-export any oversized asset rather than shipping it.

## 3. Content

- [x] 3.1 Create `app/_lib/i18n/en/services.ts` — the header block (eyebrow stays `SERVICES` in both locales, heading, body) and a typed array of the four services from `content-matrix.md` → Services.
- [x] 3.2 Create `app/_lib/i18n/zh/services.ts` with the TC copy, annotated `typeof enServices` (D060). Do not transcribe the FAQ copy — that is Phase 9's.
- [x] 3.3 Register `services` in `app/_lib/i18n/{en,zh}/index.ts`.
- [x] 3.4 Proofread both files against the matrix: four descriptions, twelve feature rows, correct numbering 01–04.

## 4. Sections

- [x] 4.1 Add `services` to `darkNavRoutes` in `app/_lib/routes.ts` (D-F).
- [x] 4.2 Build `app/[locale]/services/_components/ServicesHero.tsx` — rotated `Services` eyebrow (reuse the shared `Eyebrow`, caller supplies the reserved box), two-line display heading, body line, full-bleed photograph via `next/image` (D-D). Both breakpoints in one component.
- [x] 4.3 Build `app/[locale]/services/_components/ServicesList.tsx` — maps the four services over the shared `ServiceCard`; vertical rhythm only, no layout of its own (D-A). CTA href is `localizedHref("contact", locale)` on all four (D-C).
- [x] 4.4 Replace `PagePlaceholder` in `app/[locale]/services/page.tsx` with `ServicesHero` → `ServicesList`. Leave the FAQ and `UniversalCTA` out — Phase 9 appends them.
- [x] 4.5 Render each of the four cards with its real copy and check `ServiceCard` holds. If a prop is genuinely required, add it and note it; do not reshape the card's layout (D-E).

## 5. Verification

- [x] 5.1 `next-devtools-mcp` — no framework errors or warnings on `/en/services` and `/zh/services`.
- [x] 5.2 Playwright screenshots of `/en/services` and `/zh/services` at **393px** and **1440px**; compare side-by-side against the task 1.4 Figma screenshots. Close tier — stop at ≤4px drift.
- [x] 5.3 Verify the dark NAV renders over the hero at both breakpoints and both locales, and that the mobile menu still fits without scrolling (the seven-link count is unchanged, so this confirms the D062/D063 floor rather than re-measuring it).
- [x] 5.4 Wire any token found unwired in task 1.5 into `@theme` and surface it on `/styleguide`.
- [x] 5.5 Confirm TC copy fits the fixed 647px desktop card in all four instances. If it does not, clamp and report at the gate — do not resize the card (D-E).
- [x] 5.6 `npm run lint` and `npx tsc --noEmit` both clean.

## 6. Documentation

- [x] 6.1 Update `app/_components/INVENTORY.md` — `ServiceCard`'s row gains its first real consumer (and any prop added in 4.5); `Eyebrow`'s call-site count updated. No new shared component expected.
- [x] 6.2 Append this phase's decisions to `openspec/DECISIONS.md`, continuing from D065 — at minimum the tablet snap (D-B), the CTA target (D-C), and anything derived during implementation.
- [x] 6.3 Update `openspec/reference/roadmap.md` — tick Phase 8, resolve the Phase 8 Inherited Work row (clamp minima verified, not re-measured), and record anything deferred to Phase 9 or Phase F.
- [x] 6.4 Stop and hand to the user. State plainly that the page ends at the Footer with no FAQ and no green CTA by design, and list anything skipped or only partly done.

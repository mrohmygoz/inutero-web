## 1. Design context

- [x] 1.1 Invoke `/figma-design-to-code` (mandatory prerequisite) before any Figma MCP call.
- [x] 1.2 Fetch all four page frames: desktop EN `12612:8545`, desktop TC `12635:12924`, mobile EN `12210:2817`, mobile TC `12368:2432`.
- [x] 1.3 Resolve the desktop hero. `get_metadata` on `12573:6372` returns a childless frame — run `get_design_context` on it and determine whether the headline is live text or a flattened raster. If flattened, build from the mobile hero subtree `12212:6345` at desktop scale and record it as derived (design.md → Risks).
- [x] 1.4 Fetch section context for the remaining three: Intro `12573:6107` / `12212:6370` / `12368:2435`; How We Work `12610:6253` / `12219:948` / `12368:2436`; Team `12573:6174` / `12210:2881` / `12368:2437`.
- [x] 1.5 Run a `reactions` sweep over the three `Button` nodes under `12610:6264` (`12610:6307`, `12610:6266`, `12610:6314`) to confirm How We Work is static — per D-E, do not assume from `get_motion_context` alone.
- [x] 1.6 Export the hero photograph and the Intro's 464×380 image (`12573:6123`) with `download_assets` into `public/`. No placeholder rectangles.

## 2. Content and assets

- [x] 2.1 Rename the nine files in `public/images/about/` to ASCII slugs, normalising the mixed extensions. Record the slug ↔ member mapping.
- [x] 2.2 Add a typed `TeamMember[]` to `app/_lib/i18n` — Latin name, Chinese name, EN title, ZH title, ZH description, image slug — transcribed from the original filenames (D-A). Where no English title exists (`冬季限定`), the Chinese title serves both locales.
- [x] 2.3 Add the Our Story strings for `en` and `zh` from `content-matrix.md` → *Our Story*: hero eyebrow + headline (**Figma's** FROM TAIWAN TO THE WORLD. / 立足台灣 走向世界, per the proposal's override), hero body (the **matrix's** founder story, both paragraphs), Intro eyebrow + heading + body paragraph (**Figma's** "We believe that authentic music..." / its ZH counterpart — matrix's REMOVE annotation overridden, see D-D), How We Work eyebrow + heading + three points, Team eyebrow + heading.
- [x] 2.4 Do **not** add the Credits section — out of scope (proposal → *Explicitly out of scope*).

## 3. Sections

- [x] 3.1 Build `AboutHero` at both breakpoints, both locales. Body block grows with the real copy; drawn heights are minimums (D-C).
- [x] 3.2 Build `AboutIntro` at both breakpoints, both locales — heading, body paragraph, and photograph, all as drawn (D-D, matrix override).
- [x] 3.3 Build `AboutHowWeWork` at both breakpoints, both locales — static 3-up at desktop, stack at mobile, collapsing at `lg` not to a 2-up (D-E, D-F).
- [x] 3.4 Build `AboutTeam` composing the existing `TeamCard`: native scroll-snap row at every width, mobile-only dot indicator tracking scroll position, one dot per member (D-B). Client component; keep the boundary tight.
- [x] 3.5 Replace `PagePlaceholder` in `app/[locale]/about/page.tsx` with the four sections plus `UniversalCTA`. NAV theme is resolved by path in `app/_lib/routes.ts`, not a page-passed prop (`Nav` is rendered by the layout) — added `"about"` to `darkNavRoutes`.
- [x] 3.6 Wire any token used here that is not yet in `@theme` from `openspec/reference/design-tokens.md` — never eyedropped.

## 4. Verification

- [x] 4.1 Check the running app with `next-devtools-mcp` for framework errors and warnings.
- [x] 4.2 Screenshot `/en/about` and `/zh/about` at **393px** and **1440px** with `playwright-cli`; compare each section side-by-side against its Figma frame. Do this per-section, not once at the end.
- [x] 4.3 Confirm the team row scrolls at both breakpoints, all nine members are reachable, the dots track position at mobile and are absent at desktop, and TC glyphs render in the team names and descriptions.
- [x] 4.4 Sweep 768–1439px against the D-F table and confirm the derived behaviour matches what was decided — report it as derived, never as design-matching.
- [x] 4.5 Run `npm run lint` and `npx tsc --noEmit`.

## 5. Records

- [x] 5.1 Update `app/_components/INVENTORY.md` — `TeamCard`'s row gains its first real consumer and the roster-driven usage. No new shared component is introduced; if that turns out false, add its entry.
- [x] 5.2 Append this phase's decisions to `openspec/DECISIONS.md`, continuing from D048: the hero headline override of D032, the hero body/height growth, the Intro body paragraph override (matrix's REMOVE annotation was mis-cited/stale, built as drawn), the team roster source and its EN copy policy, and the scroll-snap carousel with its dot indicator.
- [x] 5.3 Report honestly — name anything skipped, blocked, or partly done, and flag the deferred Credits section and the two `待補` credit names for the polish phase.

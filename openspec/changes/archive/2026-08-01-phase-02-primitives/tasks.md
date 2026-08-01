# Phase 2 Tasks — Primitives

Ordered so the site stays runnable at every step. Groups 4 and 5 each add components and their
styleguide specimens together, so `/styleguide` is reviewable after either one — if the session
runs long, stopping after group 4 leaves a coherent, honestly-reported partial phase.

## 1. Reference reading and setup

- [x] 1.1 Read `openspec/reference/design-inventory.md`, `openspec/DECISIONS.md`, `app/_components/INVENTORY.md`, and this change's `proposal.md` + `design.md`
- [x] 1.2 Read `app/globals.css` `@theme inline` and `openspec/reference/design-tokens.md` — know which tokens exist before reading any Figma value, so a Figma value maps to a token rather than becoming a literal
- [x] 1.3 Invoke `/figma-design-to-code` (mandatory prerequisite before any `get_design_context` call)

## 2. Figma fetch — definitions

Follow the Figma Fetch Plan in `design.md`. File key `zSq5F5v3UrVAdIjuSipe3H`.

- [x] 2.1 Fetch the six mobile primitive definitions: CTA `12368:4718`, Secondary CTA `12368:4721`, Tag `12219:1180`, Title Group `12219:946`, Tagline Wrapper `10270:2179`, Project card `10274:2306` — `get_design_context` + `get_screenshot` each
- [x] 2.2 Fetch the three desktop card definitions: Artist Card `12592:6786`, TeamCard `12610:6405`, ServiceCard `12600:7460`
- [x] 2.3 Record, for each of the nine, which design tokens its values map to. Any value that maps to no token is a signal to re-read design-tokens.md — do not introduce a raw value

## 3. Figma fetch — occurrence survey (D-A)

- [x] 3.1 `get_metadata` on Home `12405:6998`, Portfolio `12612:8704`, and UniversalCTA `12573:9014` to locate desktop occurrences of the six mobile primitives
- [x] 3.2 For each mobile primitive, `get_design_context` on **at least two** desktop occurrences from different frames; note height, padding, type token, and fill
- [x] 3.3 `get_metadata` + `get_design_context` on mobile occurrences of the three cards: Featured Artists `12211:3608`, Our Stories `12210:2817`, Services `12220:2064`
- [x] 3.4 Where occurrences disagree **materially** (different height, padding, type token, or fill), stop and ask the user. Where they disagree ≤4px, pick per D-A step 4 and note both node IDs plus the drift — CTA color conflict resolved by user 2026-08-01 (`tone` prop); TeamCard padding drift within Close tier
- [x] 3.5 Check the TC counterpart frame's geometry via `get_metadata` for each primitive; fetch full TC context only where geometry actually differs (fetch-plan step 5) — no primitive showed a TC-specific layout difference; all use the shared `html[lang="zh"]` type-scale cascade with no structural change
- [x] 3.6 Write the resulting source-node table into `design.md` under a new "Derived Sources" section — this is the audit trail Phase 10 will read

## 4. Six mobile-origin primitives

Each component: `app/_components/<Name>.tsx`, header comment naming its mobile and desktop
source node IDs, `locale: Locale` prop, tokens only, no raw values.

- [x] 4.1 `Cta` — `Default` + `TC`, polymorphic `<a>`/`<button>` per D-D, fill-width below 1024px and hug-width above per D-E — plus `tone` prop per user decision (D-D addendum)
- [x] 4.2 `SecondaryCta` — same shape as `Cta`; share the width/state logic rather than copying it — plus `tone` prop, same pattern applied consistently
- [x] 4.3 `Tag` — `Default` + `Active` as a caller-set prop — plus `solid` variant with `color` for the Project card chip usage (proposal scoped both under Tag)
- [x] 4.4 `TitleGroup` — plus `tone` and `headingSize` props per Derived Sources survey
- [x] 4.5 `TaglineWrapper` — no desktop horizontal occurrence found; single rotated orientation. Plus `tone` prop, same background-adaptation pattern
- [x] 4.6 `ProjectCard` — presentational props only (D-C)
- [x] 4.7 Apply the D-F interaction states once, shared across all interactive primitives — uniform hover shift, visible `focus-visible` ring on a brand token, no pressed state, no transitions — via `app/_components/_buttonStyles.ts`
- [x] 4.8 Split `app/styleguide/page.tsx` into `app/styleguide/_components/` per D-G, moving the existing Phase 1 token specimens unchanged; verify `/styleguide` renders identically before adding anything new
- [x] 4.9 Add the Primitives specimens for 4.1–4.6 — every variant, rendered twice: plain and inside a `lang="zh"` wrapper

## 5. Three desktop-origin card shells

- [x] 5.1 `ArtistCard` — fixed 320px card width per D-E; presentational props
- [x] 5.2 `TeamCard` — fixed 284px card width; presentational props
- [x] 5.3 `ServiceCard` — **shell only.** No Services page grid, no accordion, no section padding (D-C)
- [x] 5.4 Export real image assets used by the cards via `download_assets` into `public/`; use a neutral sized placeholder only where a card's design does not depend on imagery — 3 card photos to `public/images/cards/`, 4 social icons to `public/icons/social/`. `ProjectCard`'s image stays an optional placeholder (D-C) since its content is per-project MDX data, not shipped this phase.
- [x] 5.5 Add the Cards specimens to `/styleguide`, both locales, same pattern as 4.9

## 6. Article card (added mid-phase, 2026-08-01, user-directed)

A follow-up audit of every repeating visual unit in the file (prompted by the user asking
whether any other "Cards" were worth implementing) found `Article` (`12612:7696`) as the one
genuinely structured repeating card left unbuilt — title/tag/date/image, same shape as
`ProjectCard`. Originally scoped out under "coupled to the MDX pipeline"; revisited and shipped
as a presentational shell instead, same pattern as `ProjectCard`/`ServiceCard` (D-C). Two other
candidates were surveyed and confirmed **not** cards: `ProjectDetailPage` gallery tiles
(Portfolio Details) are plain images with no structure, and `Mast` is a hero/masthead image
treatment, not a card — neither added.

- [x] 6.1 Fetch desktop definition `12612:7696` and mobile occurrence `12220:1670` (News page) via `get_design_context`
- [x] 6.2 Survey confirms no material conflict — same content model both breakpoints, ordinary responsive reflow (desktop splits side-by-side, mobile stacks with the image last). Recorded in `design.md` Derived Sources.
- [x] 6.3 Build `Article` — presentational shell (title, tag, date, excerpt-free per Figma, image), no MDX/route knowledge, reuses `Tag` (solid variant)
- [x] 6.4 Add the Article specimen to `/styleguide`, both locales, same pattern as the other cards — used real Figma content for both (EN from the desktop definition, ZH from the News TC page `I12635:12929;12612:8806;...`, tag `子皿營運日誌` / title `雷擎《春子》新專輯聽歌會活動新聞稿`), not invented placeholder text — applying the discipline established after the earlier ZH-copy correction

## 7. Continuity artifacts

- [x] 7.1 Add all nine Group 4/5 components to `app/_components/INVENTORY.md` with file, Figma node(s), and intended consumers
- [x] 7.1a Add `Article`'s entry to `app/_components/INVENTORY.md` once built
- [x] 7.2 Append to `openspec/DECISIONS.md` (with ToC entries): the fill→hug width switch at 1024px (D-E); the derived interaction-state set (D-F); the canonical-occurrence choice for any primitive whose desktop occurrences drifted; and the finding that desktop primitives are drawn locally rather than instanced, so future phases do not re-discover it — D012–D015
- [x] 7.3 Confirm no new raw color, size, or spacing value entered the codebase — grep the new components for hex values and bare `px` — zero hex values; `px` arbitrary values are all component-intrinsic geometry (fixed widths, gaps, border widths) with no token equivalent, not eyedropped design-token values
- [x] 7.3a Repeat the raw-value grep for `Article` once built — zero hex values, `px` values are the same kind of component-intrinsic geometry (309/350/419px image dimensions, 15/21px gaps)

## 8. Verification

- [x] 8.1 `npm run dev`; check `next-devtools-mcp` for framework errors and warnings (fall back to server logs + browser console listeners if unavailable, and say which was used) — used `next-devtools-mcp`: `get_errors` and `get_compilation_issues` both returned empty
- [x] 8.2 Playwright screenshots of `/styleguide` at **393px and 1440px**, covering both the plain and the `lang="zh"` specimen sections — Chrome extension unavailable this session; used Playwright CLI instead (per CLAUDE.md's stated tooling), both breakpoints and both locale sections captured
- [x] 8.3 Compare each specimen side-by-side against its `get_screenshot` reference — mobile definitions from group 2, desktop occurrences from group 3. Apply the `Close` fidelity tier (≤4px) — structure, tags, colors, and type all match; two bugs found and fixed during this pass (duplicate React key on ArtistCard social links; ServiceCard title overflowing its column — both below)
- [x] 8.4 Regression check: `/en` and `/zh` still render at both widths, unchanged from Phase 1 — both 200
- [x] 8.5 Confirm each primitive's text content appears exactly once in the DOM at both widths (spec: one primitive serves both breakpoints — no duplicate hidden render) — confirmed by construction: every component is CSS-only responsive (`lg:` classes), no duplicate mobile/desktop JSX branches
- [x] 8.6 Confirm `/styleguide` still returns `noindex` — confirmed via response header/meta tag
- [x] 8.7 Keyboard-tab through the styleguide; confirm every interactive primitive shows a visible focus ring — confirmed via Playwright: `Cta` focus outline computes to `solid rgb(8,196,84) 2px`
- [x] 8.8 `npm run lint` and `npx tsc --noEmit` both clean; `npm run build` succeeds — all three clean; build pre-renders both locales + static `/styleguide`
- [x] 8.9 Report honestly — name anything skipped, blocked, derived rather than designed, or only partly done. Then stop and hand to the user for the browser gate. **Do not start Phase 3.**
- [x] 8.10 Re-verify (screenshots + tsc/lint/build) after `Article` is added — all clean; screenshots confirm desktop split / mobile stacked layout renders correctly in both locales, real Chinese content wraps cleanly at the correctly-cascaded type scale (D016 fix)

**Bugs found and fixed during 7.3:**
- `ArtistCard`'s social-link list keyed on `href`, which collided when specimens used the same placeholder `href="#"` for all four links — React logged duplicate-key errors. Fixed by keying on `label` instead.
- Fixed a `next/image` aspect-ratio warning on `ArtistCard`'s social icons by switching from fixed `width`/`height` props to `fill` inside a sized wrapper (Tailwind's preflight was overriding one axis).
- `ServiceCard`'s title looked like it overflowed its column. Root-caused with real measurements rather than guessing: the word `MANAGEMENT` at 120px renders at 487px, comfortably inside the ~680px Figma allocates — the actual bug was `/styleguide`'s `max-w-(--container-large)` (1280px) wrapper squeezing `ServiceCard` (documented as full-bleed 1440px, D-C) down to a 496px column. Fixed by breaking the specimen out of the container in `CardSpecimens.tsx`. Also added `min-w-0` and `[word-break:break-word]` to the title (and the equivalent heading in `TitleGroup`/`ProjectCard`/`ArtistCard`/`TeamCard`, matching Figma's own generated code, which applies `word-break: break-word` to nearly every text node) as a defensive fallback for genuinely long copy.
- **Bigger finding, D016:** the Chinese specimens throughout `/styleguide` — including Phase 1's original text-style specimens — were silently rendering at the **English** type scale. `globals.css`'s Chinese overrides key off `html[lang="zh"]`, correct for the real `/zh` route (`[locale]/layout.tsx` sets `lang` on `<html>`), but `/styleguide`'s `<html>` is hardcoded `lang="en"` (D011) and the nested `<section lang="zh">` preview wrappers never matched that selector. Unnoticed in Phase 1 (subtle body-text deltas); obvious in Phase 2 once a 120px EN heading rendered where a 78px ZH one belonged. Fixed by changing the two Chinese override selectors to `:is(html[lang="zh"], [data-locale="zh"])` (preserves identical specificity for both branches) and adding `data-locale="zh"` to every simulated-Chinese wrapper in the styleguide. Verified the real `/zh` route is unaffected (`--text-display-h1` still resolves to 150px there).
- **User-flagged, follow-up:** the Chinese type-scale fix corrected sizing but exposed that my Chinese specimen *copy* itself was fabricated placeholder text (invented translations), not sourced from the Figma TC frames — e.g. `我們的藝人`/`我們的使命` for `TitleGroup`, `藝人管理`/`巡演企劃`/`公關與行銷` for `Tag`, a dropped-character project title (`起喝酒的朋友` vs. the real `一起喝酒的朋友`), and a fully invented `ServiceCard` description/feature list. Re-fetched the actual TC frames (Featured Artists `12635:12928`, Home `12635:15868`, Services `12635:12925`) and replaced every specimen string with real Figma text, each with a comment citing its source node. Notable findings recorded inline: both TC eyebrow labels ("Featured Artists", "Mission") are themselves left untranslated in the source file; `ArtistCard`'s TC genre line is not a literal translation of the EN copy (Figma uses its own phrasing); `TeamCard`'s real TC content wasn't checked (Our Story TC page not fetched) and remains an unverified placeholder, flagged as such in code.

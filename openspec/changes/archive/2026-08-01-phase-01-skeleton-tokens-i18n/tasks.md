# Phase 1 Tasks — Skeleton, Tokens, i18n

Ordered so the site stays runnable. Groups 1–3 leave the app rendering at every step;
the scaffold is not deleted until its replacement exists.

## 1. Ground rules and reference reading

- [x] 1.1 Read `openspec/reference/design-tokens.md` in full — it is the token source of truth; do not re-extract from Figma and never call `get_variable_defs`
- [x] 1.2 Read the Next.js 16 routing, `next/font`, and metadata guides in `node_modules/next/dist/docs/` — confirm the `<html lang>` placement and `generateStaticParams` patterns for this version rather than assuming
- [x] 1.3 Confirm the actual Google Fonts subset names each of the five families ships; a non-existent subset name fails the build

## 2. Fonts

- [x] 2.1 Load the five families from design-tokens.md → Fonts via `next/font/google`, each exposing a CSS variable; declare the weights/styles the variables specify even where the family lacks them (D008 — the browser synthesizes, matching Figma)
- [x] 2.2 Set `preload: false` and `display: 'swap'` on the Traditional Chinese faces; keep preload on the Latin faces
- [x] 2.3 Remove Geist Sans and Geist Mono entirely
- [x] 2.4 Add the explicit CJK fallback to the body font stack per D008, so Chinese body copy is deterministic rather than per-OS

## 3. Design tokens in `app/globals.css`

- [x] 3.1 Delete the `--background`/`--foreground` placeholder pair, the `prefers-color-scheme` block (D007 — there is no dark theme), and the `body { font-family: Arial }` rule
- [x] 3.2 Declare the Primitives and opacity ramps as plain custom properties — not exposed as Tailwind color utilities
- [x] 3.3 Declare the Color Schemes semantic layer; this is the only color layer components may use
- [x] 3.4 Declare the `:root` base layer — Mobile English text styles plus Mobile spacing
- [x] 3.5 Add the `html[lang="zh"]` layer — Mobile Chinese text styles only
- [x] 3.6 Add the `@media (width >= 1024px)` layer with **both** a `:root` block (Desktop English + Desktop spacing) **and** an `html[lang="zh"]` block (Desktop Chinese). The second is not optional: `html[lang="zh"]` outranks `:root` on specificity regardless of order, so omitting it silently leaves `/zh` on the mobile scale at desktop widths
- [x] 3.7 Declare the containers and max-widths once outside the media query — they are identical in both spacing modes
- [x] 3.8 Map everything into `@theme inline`: `--color-*`, `--spacing-*`/`--container-*`, and the `--text-<name>` + `--text-<name>--line-height` + `--text-<name>--letter-spacing` triples. Use `@theme inline`, not `@theme` — plain `@theme` flattens the `var()` references the cascade depends on
- [x] 3.9 Cross-check every value against design-tokens.md; leading and tracking are absolute px in Figma, not ratios

## 4. i18n foundation

- [x] 4.1 Create `app/_lib/i18n/index.ts` — the `locales` tuple, the `Locale` type, and a type guard
- [x] 4.2 Create `app/_lib/i18n/en.ts` and `app/_lib/i18n/zh.ts`, with `zh` typed as `typeof en` so a missing key is a `tsc` error naming that key
- [x] 4.3 Add a `getDictionary(locale)` accessor returning the typed dictionary
- [x] 4.4 Seed only the copy this phase actually renders — do not pre-populate keys for unbuilt pages

## 5. Routing skeleton

- [x] 5.1 Create `app/[locale]/layout.tsx` using `LayoutProps<'/[locale]'>`: `generateStaticParams()` for both locales, `notFound()` on any other segment, and `<html lang>` set from the resolved locale
- [x] 5.2 Add `generateMetadata` with localized title/description and `alternates.languages` covering both locales; remove the "Create Next App" defaults
- [x] 5.3 **Adapted:** `app/layout.tsx` was removed entirely rather than reduced. `/styleguide` and `/[locale]` are sibling top-level branches with no shared ancestor, so per the Next.js docs (`layout.md` → "Root Layout" — "You can create multiple root layouts... Omitting `app/layout.js` so layouts in subdirectories... each become root layouts for their respective directories"), each branch owns its own `<html>`/`<body>` via its own layout (`app/[locale]/layout.tsx`, `app/styleguide/layout.tsx`), both importing a shared `app/_lib/fonts.ts`. Documented in D011 and design.md.
- [x] 5.4 Create `app/[locale]/page.tsx` — a minimal placeholder Home, enough to prove both locales render and that `lang` drives the Chinese type scale. Not the Home design; that is Phases 5–6
- [x] 5.5 Add `redirects()` to `next.config.ts`: `/` → `/en`, `permanent: false` (D011)
- [x] 5.6 Delete the create-next-app `app/page.tsx`

## 6. Styleguide

- [x] 6.1 Create `app/styleguide/page.tsx` with `robots: { index: false, follow: false }`
- [x] 6.2 Render color swatches grouped by Color Schemes, labelled with token name and value
- [x] 6.3 Render all 15 text styles as live specimens
- [x] 6.4 Render the TC specimens inside an explicit `lang="zh"` wrapper — the page sits outside `[locale]`, so both scales must be visible on one page
- [x] 6.5 Render the spacing, container, and max-width ramps
- [x] 6.6 Render one specimen per font family, exercising both scripts where the family covers them

## 7. Continuity artifacts

- [x] 7.1 Create `app/_components/INVENTORY.md` with the "read before building a component" preamble and an empty table — Phase 1 adds no shared components
- [x] 7.2 Append D009 (1024px switch), D010 (typed dictionaries), and D011 (config-level root redirect) to `openspec/DECISIONS.md`, including their ToC entries
- [x] 7.3 Update the "the Desktop/Mobile switch width is not defined" note in `openspec/reference/design-tokens.md` to point at D009

## 8. Verification

- [x] 8.1 `npm run dev`, then check for framework errors and warnings — zero found (checked via server logs and Playwright console/page-error listeners; `next-devtools-mcp` was not available in this session)
- [x] 8.2 Playwright screenshots at **393px and 1440px** for `/en`, `/zh`, and `/styleguide`
- [x] 8.3 Compared the styleguide against `get_screenshot` of desktop `COMP` `12612:8830` and mobile `COMP` `12219:1582`. **Caveat:** COMP holds assembled Phase 2–4 components (NAV, Footer, UniversalCTA, cards), not a dedicated type-ramp frame, so this was a qualitative check — display font weight/style, label styling, and brand greens (`#08c454`/`#38ff88`) all visually match; no numeric comparison was possible from this frame.
- [x] 8.4 Confirmed `/` lands on `/en` (307), and `/fr` 404s rather than falling back
- [x] 8.5 Confirmed `/zh` renders real Traditional Chinese glyphs (Mochiy Pop One and Chivo Mono's Noto Sans TC fallback both render actual CJK glyphs, not tofu/system fallback)
- [x] 8.6 Confirmed crossing 1024px flips both the type scale and computed custom-property values on `/zh` (H1 62px→150px, H2 43px/weight 400→130px/weight 700, Label M 14px→11px) and `/en`
- [x] 8.7 Verified a deliberately removed `zh.home.title` key fails `npx tsc --noEmit` with a named error, then restored it
- [x] 8.8 `npm run lint` and `npx tsc --noEmit` both clean; `npm run build` also verified clean (both locales pre-rendered via `generateStaticParams`, `/styleguide` static)
- [x] 8.9 Stopping here. Handing off to the user for the browser gate. Not starting Phase 2.

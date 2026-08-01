# Phase 1 — Skeleton, Tokens, i18n

## Why

The repo is still an untouched `create-next-app` scaffold: Geist fonts, placeholder
`--background`/`--foreground` tokens, a `prefers-color-scheme` dark block that D007 forbids,
a demo `app/page.tsx`, and no `[locale]` segment at all. Every later phase depends on three
things that do not yet exist — the `app/[locale]/` routing skeleton, the design tokens wired
to their four text modes, and the five Figma font families. Building any component before
these land guarantees per-section token drift and a locale retrofit across every page.

## What Changes

- **BREAKING** — the create-next-app scaffold is removed: Geist fonts, the placeholder token
  pair, the `prefers-color-scheme` dark block (D007: there is no dark theme), the demo
  `app/page.tsx`, and the "Create Next App" metadata defaults.
- `app/[locale]/` becomes the only route home. `layout.tsx` validates the segment,
  pre-renders both locales, and drives `<html lang>`; `page.tsx` is a minimal placeholder
  proving both locales render. Bare `/` redirects to `/en` via `redirects()` in
  `next.config.ts` — not a root `app/page.tsx`, which would be a route outside `[locale]/`.
- `app/globals.css` is rebuilt from `openspec/reference/design-tokens.md`: all 124 variables,
  the semantic Color Schemes layer, the 15 text styles across their four modes, and the
  Spacing & Sizing pair — exposed to Tailwind through `@theme inline`.
- The five font families load via `next/font/google`, with the explicit CJK fallback D008
  requires.
- `app/_lib/i18n/` holds hand-rolled typed dictionaries, no library. `zh` is typed against
  `en`, so a missing translation is a compile error rather than a silent fallback.
- `app/styleguide/page.tsx` ships as a permanent, `noindex` token gallery — colors, all 15
  text styles in both scales, the spacing ramp, and one specimen per font family.
- `app/_components/INVENTORY.md` is created (empty; Phase 1 adds no shared components).
- Three new decisions are appended to `openspec/DECISIONS.md`: the Mobile→Desktop token
  switch width, the i18n dictionary approach, and the root-redirect mechanism.

**Not in scope:** primitives (CTA, Tag, Title Group, card shells) are Phase 2. Real page
sections are Phase 5 onward. No component beyond the styleguide's own markup is built here.

## Capabilities

### New Capabilities

- `localized-routing`: how a request resolves to a locale — the two supported locales, the
  bare-`/` redirect, rejection of unknown locale segments, static generation of both locales,
  the `lang` attribute contract that drives the Chinese type scale, and the requirement that a
  missing translation fails the build instead of falling back.

### Modified Capabilities

None — `openspec/specs/` is empty; this is the first change to declare a capability.

## Figma Coverage

This phase implements no design frames. Token values come from
`openspec/reference/design-tokens.md`, which is already the complete Plugin API export — no
re-extraction, and never `get_variable_defs`. The only Figma reads are `get_screenshot` on the
two `COMP` sections, used solely to eyeball the type ramp against the rendered styleguide:

| Canvas | Section | Node ID |
| :--- | :--- | :--- |
| Desktop | `COMP` | `12612:8830` |
| Mobile | `COMP` | `12219:1582` |

## Verification

The user opens `/styleguide` beside the two `COMP` frames and confirms the color, type, and
spacing ramps match; then checks that `/` lands on `/en`, that `/zh` renders Chinese display
type at the Chinese scale with real TC glyphs, and that crossing the desktop breakpoint flips
both the type scale and the page padding. Checked at 393px and 1440px in both locales.

## Impact

| Area | Effect |
| :--- | :--- |
| `app/layout.tsx` | Fonts replaced; metadata defaults removed; `<html lang>` becomes locale-driven |
| `app/globals.css` | Rewritten from the token export |
| `app/page.tsx` | Deleted |
| `app/[locale]/` | New — `layout.tsx`, `page.tsx` |
| `app/_lib/i18n/` | New — locale constants, guard, dictionaries |
| `app/styleguide/page.tsx` | New — permanent, `noindex`, excluded from the sitemap |
| `app/_components/INVENTORY.md` | New |
| `next.config.ts` | Gains `redirects()` |
| `openspec/DECISIONS.md`, `openspec/reference/design-tokens.md` | Updated with the new decisions |
| Dependencies | None added. `next/font/google` and Tailwind v4 are already present. |

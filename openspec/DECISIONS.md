# Design & Architecture Decisions

Decisions the Figma file does not make for us, or where we deliberately diverge from it.
Append only — do not rewrite history. Each phase adds the decisions it was forced to make.

Record a decision here when: the design is silent (e.g. tablet), the design contradicts
itself (e.g. naming drift), or we chose something the design implies but does not state.
Do **not** record things readable from the code or the design itself.

## Table of Contents

- [D001 — Locale strategy](#d001--locale-strategy)
- [D002 — Content source for detail pages](#d002--content-source-for-detail-pages)
- [D003 — Route slugs stay English in both locales](#d003--route-slugs-stay-english-in-both-locales)
- [D004 — Canonical page naming](#d004--canonical-page-naming)
- [D005 — Tablet breakpoint is derived, not designed](#d005--tablet-breakpoint-is-derived-not-designed)
- [D006 — Mobile and desktop of a section ship together](#d006--mobile-and-desktop-of-a-section-ship-together)
- [D007 — No dark/light theme system](#d007--no-darklight-theme-system)
- [D008 — Fonts are implemented exactly as the variables declare](#d008--fonts-are-implemented-exactly-as-the-variables-declare)

## D001 — Locale strategy

**Decision:** Two locales, `en` and `zh`. Both carry an explicit URL prefix
(`/en/...`, `/zh/...`). Bare `/` redirects to `/en`. English is the default for
first-time visitors. Implemented as `app/[locale]/`.

**Why:** The Figma file contains complete `DESKTOP 中文` and `MOBILE 中文` section sets, so
bilingual is a requirement, not an enhancement. Symmetric prefixes avoid serving the same
page at two URLs, which an implicit default locale would cause.

**How to apply:** Every route lives under `app/[locale]/`. No page may be added outside it.
Locale-aware components (NAV, Footer, UniversalCTA) take locale from route params, not from
a client-side store.

## D002 — Content source for detail pages

**Decision:** `portfolio/[slug]` and `news/[slug]` are backed by MDX files in the repo,
one directory per locale.

**Why:** The design includes a `CMS` component (a long-form article body renderer with mixed
media) on News Details, and the sitemap calls for 300–800 word project narratives. That is
prose, not structured data — MDX fits; typed JSON arrays do not. Keeping it in-repo preserves
the static-build, no-backend architecture.

**How to apply:** Content lives outside `app/`. A missing translation must fail loudly at
build time, not silently fall back.

## D003 — Route slugs stay English in both locales

**Decision:** `/zh/about`, not `/zh/關於子皿` or `/zh/guanyu`.

**Why:** Simpler routing, no transliteration bikeshedding, and the design gives no localized
slugs. Reversible, but only cheaply before stub routes ship in Phase 3.

## D004 — Canonical page naming

**Decision:** Where the sitemap, desktop, and mobile designs disagree, `openspec/reference/routes.md`
wins. Notably: `/about` is **Our Story**, `/artists` is **Featured Artists**,
`/portfolio/[slug]` is **Portfolio Details**.

**Why:** Three sources named these differently. Without one canonical table, every phase
re-decides and the nav ends up inconsistent with page titles.

## D005 — Tablet breakpoint is derived, not designed

**Decision:** Only 393px and 1440px are designed. Behavior between 768px and 1439px is
invented by whoever implements the section, and each non-obvious derivation gets appended
to this log.

**Why:** No tablet frames exist. Pretending otherwise leads to an agent inventing layout and
reporting it as matching the design.

**How to apply:** When a section's tablet behavior is not a trivial interpolation
(e.g. a 3-up grid that must become 2-up, a horizontal scroller that must stack), stop and
ask rather than guessing. Record the answer here.

## D006 — Mobile and desktop of a section ship together

**Decision:** A phase delivers a section at both breakpoints, not desktop-then-mobile.

**Why:** The responsive rule between the two designed widths is an invention (see D005). It
is far cheaper to invent once with both frames in view than to build desktop and retrofit
mobile, which reliably produces a rewrite.

## D007 — No dark/light theme system

**Decision:** The site has exactly one appearance. Do not build a theme system, a theme
toggle, `prefers-color-scheme` handling, or dark-mode token variants.

**Why:** The `Color Schemes` and `Primitives` collections each have a single mode — there is
no dark variant of any color token in the design. Confirmed by the full variable export in
[[design-tokens]].

**How to apply:** Two things in the design look like theming and are not:

- `Desktop NAV/DARK` (`12653:5259`) is a **per-component variant** — a dark nav used over
  full-bleed hero imagery. Implement it as a prop on the Nav component, not as a theme.
- The `Opacity/White *` and `Opacity/Neutral Darkest *` ramps exist for overlays on
  photography, not for light/dark switching.

If a future phase feels it needs a theme, that is a signal it has misread one of the above.
Stop and ask rather than introducing one.

## D008 — Fonts are implemented exactly as the variables declare

**Decision:** Use the five families exactly as the Figma variables specify. Do not substitute
faces, do not add a Traditional Chinese body face, and do not raise these with the designer.

**Why:** User decision, 2026-08-01, after the three problems below were raised. The design file
is treated as final; matching it is preferred over improving it.

**How to apply:**

| Declared | Reality | Implementation |
| :--- | :--- | :--- |
| `Mochiy Pop One` **Bold** | Google Fonts ships Regular 400 only | Declare `font-weight: 700`; the browser synthesizes it. Figma faux-bolds the same way, so this matches the design file. |
| `Noto Serif TC` **Bold Italic** (Desktop CN `Accent/Display`) | The family has no italic | Declare `font-style: italic`; the browser synthesizes an oblique. Same reasoning. |
| `Chivo Mono` for **Chinese body and label** | Chivo Mono has zero CJK glyphs | See below — this one cannot be "as-is" without a choice. |

**The Chivo Mono case needs one implementation decision the design cannot make.** A CJK
character in Chivo Mono does not render as anything; the browser falls back per-character to
whatever the OS supplies. Left implicit, that is PingFang on macOS, Microsoft JhengHei on
Windows, and Noto Sans CJK on Android — three different looks, none chosen.

So the font stack declares an **explicit** CJK fallback rather than an implicit one:

```
font-family: "Chivo Mono", "Noto Sans TC", system-ui, sans-serif;
```

This changes no Latin rendering — Chivo Mono still wins for every character it covers. It only
makes the Chinese fallback deterministic instead of platform-dependent. If the intent was to
accept platform defaults, drop `"Noto Sans TC"` from the stack; nothing else changes.

**Consequence to accept:** Chinese body copy is not set in a designed typeface. This is a
known, deliberate gap, not an implementation bug — do not "fix" it in a later phase without
revisiting this decision.

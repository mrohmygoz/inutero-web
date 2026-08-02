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
- [D009 — Mobile→Desktop token switch at 1024px](#d009--mobiledesktop-token-switch-at-1024px)
- [D010 — i18n via hand-rolled typed dictionaries](#d010--i18n-via-hand-rolled-typed-dictionaries)
- [D011 — Root redirect via next.config.ts, not a root page](#d011--root-redirect-via-nextconfigts-not-a-root-page)
- [D012 — Desktop primitives are drawn locally, not instanced](#d012--desktop-primitives-are-drawn-locally-not-instanced)
- [D013 — Cta and SecondaryCta carry a background-adaptive `tone` prop](#d013--cta-and-secondaryCta-carry-a-background-adaptive-tone-prop)
- [D014 — Interaction states for primitives are derived, not designed](#d014--interaction-states-for-primitives-are-derived-not-designed)
- [D015 — Fill→hug width switch for buttons at 1024px](#d015--fillhug-width-switch-for-buttons-at-1024px)
- [D016 — Styleguide Chinese specimens need `data-locale="zh"`, not just `lang="zh"`](#d016--styleguide-chinese-specimens-need-data-localezh-not-just-langzh)
- [D017 — NAV theme is a static per-page prop, not scroll-driven](#d017--nav-theme-is-a-static-per-page-prop-not-scroll-driven)
- [D018 — One typed route table, `app/_lib/routes.ts`](#d018--one-typed-route-table-app_libroutests)
- [D019 — `Nav` is a client component; `Footer` stays a server component](#d019--nav-is-a-client-component-footer-stays-a-server-component)
- [D020 — Detail-route stubs use a placeholder slug](#d020--detail-route-stubs-use-a-placeholder-slug)
- [D021 — Nav collapses to the mobile menu at 1024px](#d021--nav-collapses-to-the-mobile-menu-at-1024px)
- [D022 — Footer's non-route content is scoped down, not omitted](#d022--footers-non-route-content-is-scoped-down-not-omitted)
- [D023 — Zh display/accent fonts fall back to the Latin face for mixed-in Latin text](#d023--zh-displayaccent-fonts-fall-back-to-the-latin-face-for-mixed-in-latin-text)
- [D024 — The mobile NAV rule stretches to the locale pill instead of a fixed 225px](#d024--the-mobile-nav-rule-stretches-to-the-locale-pill-instead-of-a-fixed-225px)
- [D025 — MDX via `@next/mdx` and dynamic imports; the root `mdx-components.tsx` is a deliberate no-op](#d025--mdx-via-nextmdx-and-dynamic-imports-the-root-mdx-componentstsx-is-a-deliberate-no-op)
- [D026 — Content contract: basename is the slug, frontmatter is guarded by hand](#d026--content-contract-basename-is-the-slug-frontmatter-is-guarded-by-hand)
- [D027 — `Cms` renders the article body only; unmapped elements are derived](#d027--cms-renders-the-article-body-only-unmapped-elements-are-derived)
- [D028 — MDX detail pages ship a deliberately plain wrapper](#d028--mdx-detail-pages-ship-a-deliberately-plain-wrapper)
- [D029 — `NewsletterSignup` is inert without an `action`, and is not the Footer's block](#d029--newslettersignup-is-inert-without-an-action-and-is-not-the-footers-block)
- [D030 — `UniversalCTA` copy: English headline in both locales; two source conflicts resolved](#d030--universalcta-copy-english-headline-in-both-locales-two-source-conflicts-resolved)
- [D031 — The article share row is built; the desktop-only left rail is not, and its X glyph replaces the row's YouTube](#d031--the-article-share-row-is-built-the-desktop-only-left-rail-is-not-and-its-x-glyph-replaces-the-rows-youtube)
- [D032 — The content matrix outranks Figma for copy; Figma keeps layout](#d032--the-content-matrix-outranks-figma-for-copy-figma-keeps-layout)
- [D033 — Home hero and intro are page-local sections](#d033--home-hero-and-intro-are-page-local-sections)
- [D034 — The stacked layout holds to 1440px; the collage engages above it](#d034--the-stacked-layout-holds-to-1440px-the-collage-engages-above-it)
- [D035 — The Home hero headline uses the Latin display scale in both locales](#d035--the-home-hero-headline-uses-the-latin-display-scale-in-both-locales)
- [D036 — The dark NAV overlays the hero rather than sitting above it](#d036--the-dark-nav-overlays-the-hero-rather-than-sitting-above-it)
- [D037 — The Intro heading gradient is written literally, not tokenized](#d037--the-intro-heading-gradient-is-written-literally-not-tokenized)
- [D038 — The ZH Intro heading wraps naturally at the designed Chinese scale](#d038--the-zh-intro-heading-wraps-naturally-at-the-designed-chinese-scale)
- [D039 — The floating desktop `MENU` square is not built](#d039--the-floating-desktop-menu-square-is-not-built)
- [D040 — One layout breakpoint at 1024px; placed compositions scale, flow sections reflow](#d040--one-layout-breakpoint-at-1024px-placed-compositions-scale-flow-sections-reflow)

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
wins. Notably: `/about` is **Our Story**, `/portfolio/[slug]` is **Portfolio Details**, and
`/artists` is **Featured Artists** as a page but **Artists** as a NAV/Footer link label.

**Why:** Three sources named these differently. Without one canonical table, every phase
re-decides and the nav ends up inconsistent with page titles.

**Amended 2026-08-02:** the original table conflated *page name* with *link label*. Those
are two strings, and `/artists` is the one route where they differ — the design renders
"Artists" in every NAV and Footer instance while naming the page frame "Featured Artists".
The long label wrapped to two lines in the 393px expanded menu and pushed that frame's
fixed 852px layout below the fold, which is what surfaced the conflation. `routes.md` now
carries both columns; `routes.ts` `label` is the *link* label.

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

## D009 — Mobile→Desktop token switch at 1024px

**Decision:** The Text Styles and Spacing & Sizing modes switch from Mobile to Desktop at
`@media (width >= 1024px)` — Tailwind's `lg` breakpoint.

**Why:** design-tokens.md flags this width as undefined in the Figma variables. 1024px matches
`Container/container-medium` and is a compromise between 768px (`container-small` — desktop
display type would overflow badly at that width) and 1280px (`container-large` — safest for
type, but leaves the 768–1279px range rendering the mobile layout, an implausibly wide band of
phone-looking pages on laptops). User decision, Phase 1.

**How to apply:** Desktop display type is tight between 1024px and 1280px; the max-width
tokens absorb most of it. The residue is tablet behavior and falls under D005 — derived, not
a bug to fix without a real tablet design.

## D010 — i18n via hand-rolled typed dictionaries

**Decision:** `app/_lib/i18n/` holds a `locales` tuple, a `Locale` type, an `isLocale` type
guard, and per-locale dictionary modules (`en.ts`, `zh.ts`) where `zh` is typed as `typeof en`.
No i18n library.

**Why:** D002 requires a missing translation to fail the build loudly. A shared TS type makes
a missing key a `tsc --noEmit` compile error naming that key — stronger than any library's
runtime warning — with zero added dependencies. The site is nine static pages with no plurals
and no runtime locale switching, so `next-intl`'s message catalogs, formatters, and middleware
would all sit unused. User decision, Phase 1.

**How to apply:** Every new page's copy is added to both `en.ts` and `zh.ts` in the same
change. Do not add a key to one locale and defer the other — the type error is the intended
failure mode, not a bug to suppress.

## D011 — Root redirect via next.config.ts, not a root page

**Decision:** Bare `/` redirects to `/en` via `redirects()` in `next.config.ts`
(`permanent: false`), not a root `app/page.tsx` calling `redirect()`.

**Why:** A root `app/page.tsx` would be a route outside `app/[locale]/`, which D001 forbids.
Config-level redirects also resolve before any rendering, so nothing is generated for `/`.
`permanent: false` (307, not 308) because a permanent redirect is cached indefinitely by
browsers and would make changing the default locale later effectively irreversible for
returning visitors. `/styleguide` remains the one sanctioned exception to "no route outside
`[locale]/`" — it predates this decision and is not part of the public site.

**How to apply:** Since Phase 1 also removed the top-level `app/layout.tsx` (see design.md —
"multiple root layouts" is the supported pattern for a route tree with two independent
top-level branches, `[locale]` and `styleguide`), there is no root `app/page.tsx` either;
each branch owns its own `<html>`/`<body>` shell.

## D012 — Desktop primitives are drawn locally, not instanced

**Decision:** Treat every desktop appearance of a primitive (CTA, Secondary CTA, Tag, Title
Group, Tagline Wrapper, Project card) as hand-drawn per occurrence, not a symbol instance, and
derive it by surveying at least two occurrences rather than trusting a single one.

**Why:** Phase 2's metadata sweep found the desktop `COMP` section (`12612:8830`) contains no
primitives at all — only composed blocks (NAV, Footer, UniversalCTA, NewsletterSignup,
Article, cards). A spot check of the desktop `UniversalCTA` button (`12573:9014`) confirmed it
is a locally-drawn `Button` frame, not an instance of the mobile `CTA` symbol (`12368:4718`):
different width behavior (hug vs. fill) and, as the fuller survey found, inconsistent fill
color across occurrences (see D013). Nothing in the file structure flags this — a later phase
assuming desktop instances agree with each other, or with mobile, will ship a mismatch.

**How to apply:** Before shipping any desktop-only appearance of a shared primitive, fetch at
least two occurrences from different page frames. Full survey method is D-A in
`openspec/changes/phase-02-primitives/design.md`.

## D013 — Cta and SecondaryCta carry a background-adaptive `tone` prop

**Decision:** `Cta` takes `tone: 'dark' | 'green'` (default `'dark'`). `SecondaryCta` takes
`tone: 'dark' | 'light'` (default `'dark'`). Both default to the treatment used on light
backgrounds, matching the mobile symbol definitions.

**Why:** The Phase 2 occurrence survey found the desktop CTA button uses two different
fill/text color pairs depending on the section it sits in — dark bg/white text on the Hero and
UniversalCTA, green bg/dark text on Home's "Featured Projects" preview (all three otherwise
pixel-identical: same padding, height, and type). The same background-adaptation pattern
turned up for SecondaryCta once the survey covered `ServiceCard`'s nested instance (white
outline/text on ServiceCard's dark panel, vs. dark outline/text everywhere else). User decision
2026-08-01: expose it as a caller-set prop now rather than shipping one variant and forcing a
later page phase to extend the component again.

**How to apply:** Any page phase using `Cta` or `SecondaryCta` against a dark or photo-heavy
background must pass the matching tone explicitly — the default assumes a light background.

## D014 — Interaction states for primitives are derived, not designed

**Decision:** No primitive shipped in Phase 2 has a designed hover, focus, or pressed state
(the design defines only `Tag`'s caller-set `Active`, which is not an interaction). Every
interactive primitive gets one uniform, deliberately plain treatment: an instant `hover:opacity-80`
shift and a `focus-visible` outline in `--color-brand-primary-green`, with no pressed state and
no CSS transition. Implemented once in `app/_components/_buttonStyles.ts`, shared by `Cta` and
`SecondaryCta`; `ArtistCard`'s social links apply the same focus treatment directly.

**Why:** The Figma file gives no hover/focus/motion reference for any primitive. Inventing a
distinct visual language per component risks it calcifying into "the design" once later phases
copy the pattern. A single dull, uniform treatment is cheap to replace in one place if a later
phase (or Phase F polish) gets a real reference.

**How to apply:** Do not treat this hover/focus treatment as matching the Figma file — it does
not, because no file reference exists. If a later phase finds real hover/focus specs, update
`_buttonStyles.ts` once rather than patching each component that uses it.

## D015 — Fill→hug width switch for buttons at 1024px

**Decision:** `Cta` and `SecondaryCta` are fill-width (`w-full`) below 1024px and hug-width
(`w-auto`) at and above 1024px, via Tailwind's `lg:` breakpoint.

**Why:** Mobile buttons are fill-width (363px, matching their container) in every mobile
occurrence surveyed; every desktop occurrence is hug-width (sized to its label, padding
otherwise identical). Something has to decide where that switch happens, and the Figma file
does not — the same open question D009 already resolved for the token-mode switch. Reusing
1024px keeps a button from ever rendering desktop type at mobile (fill) proportions or vice
versa.

**How to apply:** Falls under D005 (tablet is derived) — the switch is a button implementation
detail, not a new derivation, since D009 already set the precedent this reuses.

## D016 — Styleguide Chinese specimens need `data-locale="zh"`, not just `lang="zh"`

**Decision:** Every Chinese type-scale override in `globals.css` is now keyed to
`:is(html[lang="zh"], [data-locale="zh"])` instead of bare `html[lang="zh"]`. Any element on
`/styleguide` simulating a Chinese context must carry both `lang="zh"` (real semantics/glyph
correctness) and `data-locale="zh"` (the token-cascade hook).

**Why:** Found during Phase 2 visual verification. `/styleguide`'s own `<html>` is hardcoded
`lang="en"` (it sits outside `[locale]`, per D001/D011), so the Chinese type-scale CSS —
written to key off `html[lang="zh"]`, correct for the real `/zh` route where `[locale]/layout.tsx`
sets that attribute on `<html>` — never matched the nested `<section lang="zh">` wrappers used
to preview Chinese specimens. Every Chinese specimen on `/styleguide`, including Phase 1's
original text-style specimens, was silently rendering at the **English** type scale. This went
unnoticed in Phase 1 because body-text size deltas between the two languages are subtle: a 14px
vs 13px difference doesn't visibly break anything. It became obvious in Phase 2 because a
120px English desktop `Display/H3` rendering where a 78px Chinese one belonged forced "藝人管理"
into an ugly 3-character-then-1 wrap.

`:is()` was chosen specifically because it preserves the exact specificity (0,1,1) of the
original `html[lang="zh"]` compound selector for *both* branches — this matters because the
desktop Chinese block must keep outranking the media-less `:root` (see the specificity note on
that block, D009's original concern); simply adding a second lower-specificity selector would
have reintroduced that bug for the new branch.

**How to apply:** Any future styleguide specimen that needs to preview Chinese-locale rendering
must add `data-locale="zh"` to its wrapping element, not rely on `lang="zh"` alone. This does
not affect the real site — `[locale]/layout.tsx` continues to set `lang` directly on `<html>`,
which the `html[lang="zh"]` branch still matches exactly as before.

## D017 — NAV theme is a static per-page prop, not scroll-driven

**Decision:** `Nav` takes `theme: 'light' | 'dark'` (default `'light'`). Pages under a
full-bleed hero pass `'dark'`. Nothing watches scroll position.

**Why:** The design ships `Desktop NAV` (`12653:5366`) and `Desktop NAV/DARK` (`12653:5259`) as
two separate component definitions with no transition, intermediate state, or scroll annotation
anywhere in the file — matching D007's earlier finding that the dark NAV is a per-component
variant, not a theme system. Phase 3's occurrence survey confirmed real usage: the Home desktop
frame (`12405:6998`) places a `Desktop NAV/DARK` instance directly over the Hero.

**How to apply:** A page phase building a hero checks its own Figma frame for a dark NAV
instance and passes `theme="dark"` accordingly — `Nav` does not infer this itself.

## D018 — One typed route table, `app/_lib/routes.ts`

**Decision:** A single `routes` array (`key`, path `segment`, per-locale `label`) is the one
source `Nav`, `Footer`, the locale switcher, and stub-page metadata all read from.
`openspec/reference/routes.md` stays the human source of truth; `routes.ts` is its
machine-readable transcription.

**Why:** The nav and footer link sets overlap but are not identical (footer also links a
Services sub-group with no route of its own), so hardcoding links per component would create
two places for the same path to drift. Display labels live in `routes.ts` rather than the i18n
dictionaries because they are structural, not prose — duplicating them into `en.ts`/`zh.ts`
would be a second copy of the same string (D010 still governs actual prose copy).

## D019 — `Nav` is a client component; `Footer` stays a server component

**Decision:** `Nav` is `'use client'` in full (not split into server shell + client islands);
`Footer` has no interactivity and stays a server component.

**Why:** `Nav` needs `usePathname` for the locale switcher and `useState` for the mobile menu.
It is a few hundred bytes of markup with no data dependency, so the JS cost of shipping it whole
is smaller than the complexity cost of splitting one visual element across three files — the
mobile expanded state re-renders the entire bar anyway, so an island boundary would end up
wrapping the whole component regardless.

## D020 — Detail-route stubs use a placeholder slug

**Decision:** `portfolio/[slug]` and `news/[slug]` ship with `generateStaticParams` returning a
single hardcoded `"placeholder"` slug per locale, relying on `dynamicParams = false` (already
set on the locale layout) to 404 every other slug.

**Why:** The route shape is exactly what "the shell is navigable end to end" needs to prove, and
the 404-on-unknown-slug behavior (part of this phase's `localized-routing` spec delta) is easier
to verify now than to retrofit later. Building the real MDX pipeline here would violate the
one-phase rule — Phase 4 replaces the hardcoded list with a content directory scan and this
behavior carries over unchanged.

## D021 — Nav collapses to the mobile menu at 1024px

**Decision:** `Nav` switches from the inline desktop link row to the hamburger/mobile-menu
button at `lg` (1024px), matching D009 (token mode switch) and D015 (button fill→hug switch).

**Why:** The designed frames are 393px and 1440px; the collapse point between them is not a
design value (falls under D005). Reusing 1024px is the third derivation to land on the same
width, which is the point — one boundary for type scale, button width, and nav layout means a
page never renders desktop navigation above mobile type or vice versa.

## D022 — Footer's non-route content is scoped down, not omitted

**Decision:** The Footer's Services sub-links (Artist Management, International Booking & Tour
Planning, PR & Marketing, Event Production) all point at the whole `/services` route rather than
per-section anchors. The legal links (Privacy Policy, Terms of Service, Cookies Settings) render
as inert `<span>`s, not `<a>`s.

**Why:** Neither Services' in-page anchor structure nor any legal page was ever in scope for
this phase — Services content is Phase 8/9, and legal pages were never in the nine-route table
in `routes.md` at all. Rendering the Services group as real, working links to the whole page
surfaces a visible part of the Figma footer usefully; rendering the legal links as dead
`<a href="#">`s would silently promise a destination that never resolves, which is worse than a
plain label.

**How to apply:** Add real routes for legal pages, or per-section anchors for Services, only if
a later phase or the user decides they're in scope — not assumed here. If Phase 8/9 adds anchor
IDs to the Services page sections, `Footer.tsx`'s four Services links should be updated to point
at them instead of the bare route.

## D023 — Zh display/accent fonts fall back to the Latin face for mixed-in Latin text

**Decision:** In `html[lang="zh"]`, `--font-display` and `--font-accent` are two-font stacks —
`var(--font-display-latin), var(--font-display-cjk)` (same pattern for `--font-accent`) — not a
single CJK font.

**Why:** User request, 2026-08-02. Without the Latin face first, a Latin word inside zh display
or accent copy (e.g. an English brand name) rendered using Mochiy Pop One / Noto Serif TC's own
Latin glyphs instead of the designed Alumni Sans / Bodoni Moda SC shapes. This mirrors D008's
Chivo Mono → Noto Sans TC fallback, in the opposite direction.

**Consequence to accept:** Each face in `app/_lib/fonts.ts` is loaded at one fixed weight —
Alumni Sans and Bodoni Moda SC at 700, Mochiy Pop One at 400. Zh h1/h5/h6/h7 (mobile) request
`font-weight: 400`; a Latin word inside one of those still renders at Alumni Sans's only
available weight, 700 — visibly bolder than the surrounding Chinese text. Accepted rather than
loading a second Latin weight, which D008 already rules out changing without raising with the
designer.

## D024 — The mobile NAV rule stretches to the locale pill instead of a fixed 225px

**Decision:** The horizontal rule that crosses the mobile logo mark (Line 1, `12563:4300`) is a
`flex-1` item that grows to 32px short of the locale pill, rather than the fixed `225px` the
design gives it.

**Why:** User request, 2026-08-02. `225px` is only correct at the designed 393px width. Between
394px and 1023px the bar keeps widening while the rule does not, leaving it stranded well short
of the controls. Growing it keeps the bar reading as one composition across the whole
mobile-to-desktop-collapse range.

**Consequence to accept:** The 32px trailing gap was tuned so that 393px lands at 222px —
within 3px of the frame's 225px, so the designed width is effectively preserved where a
designed value exists. Every wider viewport is derived behavior per D005.

## D025 — MDX via `@next/mdx` and dynamic imports; the root `mdx-components.tsx` is a deliberate no-op

**Decision:** Long-form content compiles through `@next/mdx` (with `@mdx-js/loader`,
`remark-frontmatter`, `remark-mdx-frontmatter`). Detail pages load a file with
`await import(...)` against a path that interpolates the locale and slug, with the content
type baked in statically. `pageExtensions` is left at its default, so an `.mdx` file can
never become a route and escape `app/[locale]/`. A root `mdx-components.tsx` exists but
returns `{}`.

**Why:** This is the pattern the vendored Next 16 docs document for content outside `app/`
(`node_modules/next/dist/docs/01-app/02-guides/mdx.md` → "Using dynamic imports"). It
compiles at build time with no runtime MDX cost. `next-mdx-remote/rsc` was rejected — it
compiles from a string at render time, which is right for a CMS and pointless for local files.

The empty `mdx-components.tsx` is not an oversight: `@next/mdx` **requires** the file to exist
(the App Router integration silently fails without it), while the `CMS` design is an
article-body treatment rather than a site-wide markdown theme. Returning `{}` satisfies the
framework without applying the treatment globally. `<Cms>` passes its element map as a
`components` prop, which the MDX runtime spreads last and which therefore always wins.
`MDXProvider` was rejected specifically because it is React context and would have forced
`'use client'` onto every article body.

**How to apply:** remark/rehype plugins must be named as **strings** in `next.config.ts` —
Turbopack passes plugin config to Rust and cannot serialize a JS function. The two-variable
dynamic import was verified to work under Turbopack; the eager-registry fallback contemplated
in the phase design was not needed.

## D026 — Content contract: basename is the slug, frontmatter is guarded by hand

**Decision:** `content/{news,portfolio}/{en,zh}/<slug>.mdx`. The filename minus `.mdx` is the
slug — it is never declared in frontmatter. Frontmatter declares `title`, `date` (ISO
`YYYY-MM-DD`), and `excerpt`, validated by a hand-written type guard in `app/_lib/content/`,
not a schema library. One module (`app/_lib/content/index.ts`) scans the directories, checks
locale parity, and validates every file; `generateStaticParams` calls it, so a violation fails
the build before any route is emitted.

**Why:** A slug in frontmatter can disagree with the route the file produces; a filename cannot.
The hand-rolled guard follows the precedent D010 set for the i18n dictionaries — three fields on
two content types does not justify a dependency, and the guard names the exact file and field in
its message, which a generic schema error does not. Centralizing the parity check matters more
than it looks: checked inside `generateStaticParams` instead, a missing `zh` file would produce a
*shorter route list* — a silently narrower site — rather than the loud failure D002 requires.

**How to apply:** Verified failure modes, all naming the file: missing counterpart locale,
missing required field, and wrong-typed field (a non-ISO date). Do not add a fallback path for
any of them.

## D027 — `Cms` renders the article body only; unmapped elements are derived

**Decision:** `app/_components/Cms.tsx` implements the five body elements the `CMS` node
(`12610:7361`) defines — paragraph, heading, figure image, figure caption, blockquote. The left
share rail and the bottom share row that also live in that node are **not** built. Elements the
design does not cover (`h1`, `h3`, lists, links, `hr`) get minimal token-derived styling.
Content images render through a plain `<img>`, not `next/image`.

**Why:** The share rails are News-Details / Portfolio-Details page chrome, not MDX body elements,
and belong to Phases 14 and 11 under D-E. For the derived elements: real MDX produces lists and
links whatever the design says, and browser-default styling inside a designed article body reads
as a bug — but this styling has no Figma reference and must not be reported as matching one.
`next/image` needs intrinsic width and height, which markdown image syntax cannot carry.

**How to apply:** Caption text comes from markdown's `title` (`![alt](/src "caption")`), so `alt`
stays real alt text rather than being read aloud twice. Two structural fixes are load-bearing and
must survive refactors: a paragraph whose only child is the figure renders as the figure (markdown
wraps a lone image in `<p>`, which would put `<figure>` inside `<p>` — invalid HTML and a
hydration error), and the blockquote unwraps its nested paragraph (otherwise the paragraph's
Body/L mapping silently renders a 45px display quote at 16px). Phases 11/14 may replace the plain
`<img>` with an explicit MDX `<Figure>` component carrying real dimensions.

## D028 — MDX detail pages ship a deliberately plain wrapper

**Decision:** `app/[locale]/_components/ContentDetail.tsx` renders the frontmatter title, the
date, and the `<Cms>` body in a plain centered container. No hero, meta row, share rail, or
related posts. Like `PagePlaceholder`, it is throwaway scaffolding colocated under `[locale]/` —
not in `app/_components/` and not in INVENTORY.md.

**Why:** News Details is 6448px tall (Phase 14, likely splitting) and Portfolio Details is Phase
11. Building that chrome in Phase 4 is exactly the "start the next phase because it looks obvious"
failure the one-phase rule exists to prevent. The bar Phase 4 has to clear is "the pipeline works
and the body is styled".

**How to apply:** Nothing in this wrapper matches the design, because it was not built from one.
Phases 11 and 14 replace it wholesale rather than extending it.

## D029 — `NewsletterSignup` is inert without an `action`, and is not the Footer's block

**Decision:** `NewsletterSignup` takes an optional `action`. Without it the field and button
render as inert markup — no `<form>`, button `type="button"`, no handler and no fake success
state. `Footer.tsx` keeps its own separate newsletter block, whose button changed from
`type="submit"` to `type="button"` for the same reason.

**Why:** No newsletter endpoint exists and none is in scope — the only planned Route Handler is
Phase 15's contact form. A `<form>` with no `action` submits a GET to the current URL and visibly
reloads the page, which is worse than doing nothing; the Footer had exactly that live defect. Same
reasoning D022 applied to the Footer's legal links.

The Phase 4 Figma survey answered the open question about the two blocks: they are **genuinely
different designs**. The Footer block has a small green `Label/M` heading plus a disclaimer line
and sits as one of three columns on a light surface; `NewsletterSignup` (`12612:8163` /
`12212:6048`) is a standalone full-width dark section with a `Display/H3` heading and no
disclaimer. Footer was therefore not refactored to compose it.

**How to apply:** Whoever wires a real endpoint passes `action` and decides then whether the block
needs to become a client component.

## D030 — `UniversalCTA` copy: English headline in both locales; two source conflicts resolved

**Decision:** `universalCta.headingLine1/2` ("Let's make" / "Some noise") and `inquiriesLabel`
("General Inquiries") are **the same English strings in `en.ts` and `zh.ts`**. Only `button`
translates.

**Why:** Not an untranslated string — the CN desktop frame (`12653:5650`) and the TC mobile frame
(`12368:2429`) both render the headline and the label in English. Copying that faithfully means
duplicating English into `zh.ts`, which looks like a missing translation and is not one.

**Two source conflicts, both resolved by picking one string:**

| Conflict | Frames | Resolution |
| :--- | :--- | :--- |
| Button label | desktop CN `和我們聊聊` vs. mobile TC `跟我們聊聊` | `跟我們聊聊` — D010 gives one key one string, and the two are semantically identical |
| Inquiries label | desktop "General / Other Inquiries" vs. mobile "General Inquiries" | "General Inquiries" — the shorter form carries the same meaning, and D010 dictionaries are not breakpoint-aware |

**Also worth knowing:** the desktop headline size (288px / 187.238px / -3px) is not any token —
desktop Jumbo is 246px and H1 is 220px. Locally drawn per D012, transcribed literally. The same is
true of the `CMS` desktop heading at 64px, which is *not* the desktop `Display/H5` token (that
token's letter-spacing is overridden to -0.78px; the heading uses -0.41px).

## D031 — The article share row is built; the desktop-only left rail is not, and its X glyph replaces the row's YouTube

**Decision:** `ShareRow.tsx` implements the bottom share row from the `CMS` node (desktop
`12612:8414`, mobile `12211:4535`), composed by `ContentDetail` below the body — not by `Cms`.
The desktop-only **left share rail** (`12610:7339`) is still not built. The row's third glyph
is the **X** icon taken from the left rail, not the YouTube icon the row itself draws.

**Why (row built, rail not):** the bottom row exists at both designed breakpoints, so it ships
complete under D006, and it is self-contained — a label, four icons, and a hairline rule that
sits under the body with no layout dependency. The left rail has no 393px counterpart and
occupies a 353px column *beside* the article, which is the detail page's two-column layout
rather than a body element. Building it now would mean building it against a page shell that
Phases 11/14 have not yet designed, then reworking it.

**Why the glyph swap:** the design's two share groups disagree on the third icon — the bottom
row draws YouTube (`16.682×11.686`), the left rail draws X (`14.997×13.337`). YouTube has no
share endpoint, so a YouTube icon under a "SHARE" label could only ever be dead, which is the
defect D022 exists to prevent. The rail's X makes all four targets real (copy link, LinkedIn,
X, Facebook) and is drawn from the same node rather than invented. **This is a visible
deviation from the bottom-row frame** — reverse it by swapping `public/icons/share/x.svg` back
for the YouTube glyph and deciding what that button should do.

**Why it is a client component:** a real share intent needs the page's absolute URL, and the
project has no configured site origin — there is no `metadataBase` anywhere. The URL is read
via `useSyncExternalStore` (browser snapshot `window.location.href`, server snapshot `""`)
rather than an effect-then-`setState`, which React 19's lint rules reject. The alternative was
`href="#"` placeholders, i.e. the same dead-link defect the Footer's social icons still carry.

**How to apply:** `ShareRow` takes `locale` and `title`. If a site origin is ever configured,
this can become a server component and the URL can be built at render time. The Footer's
`href="#"` social links remain a separate, pre-existing gap — not fixed here.

## D032 — The content matrix outranks Figma for copy; Figma keeps layout

**Decision:** `openspec/reference/content-matrix.md` — a transcription of the client's copy deck
(Google Sheet `1DMrnb5xxDZoMlt1TxX372Z_BvMn__0-vtYqwMSWLRv0`, 子皿網站_內容矩陣) — is the source of
truth for **what a string says**. Figma remains the source of truth for everything else: which
strings exist, where they sit, layout, spacing, type scale, and component structure.

**Why:** The sheet's own instructions tab states the Figma English is
「多數為暫定文案或 Lorem ipsum 占位文字，僅供參考版型與語氣長度」 — mostly provisional or placeholder
text, useful only for judging layout and tone length. Every string shipped before Phase 4's
addendum was transcribed from those text layers. Without a written precedence rule, each of
Phases 5–15 would re-derive copy from a source the client has already superseded.

The transcription is hand-written and versioned in git rather than fetched at build time: the
architecture forbids runtime fetching, the sheet is a human deliverable revised in bursts rather
than a live source, and a build that reads it would depend on a Google account's auth state. The
doc records the sheet's `modifiedTime` so a later phase can detect staleness in one MCP call.

**How to apply:**

- Read `content-matrix.md` before writing any user-visible string. It is now in CLAUDE.md's
  "Read These First" table.
- When the final copy is materially longer or shorter than the Figma string it replaces — the
  Home hero drops from four lines to two — the layout consequence is **derived** under D005.
  No frame exists for the new copy. Stop and ask rather than reflowing a designed lockup.
- The doc preserves the sheet's markers rather than flattening them: `（保留英文）` means ship
  English under `/zh`; `（待補）` means the copy does not exist yet and the phase is blocked, not
  that the string is empty; `直接刪除段落` / `新增段落` are layout instructions, not copy.

**Confirmations and conflicts found on adoption:**

The matrix independently confirms two D030 judgment calls that were picked from disagreeing
Figma frames — the `UniversalCTA` headline stays English in both locales, and the button reads
`跟我們聊聊`. Those are now sourced rather than inferred. It also confirms `ShareRow`'s `Share`
label stays English under `/zh` (「功能性文字，通常不需業主提供」).

Three conflicts surfaced. One is settled; two are open and recorded in the doc:

| # | Conflict | Status |
| :--- | :--- | :--- |
| 1 | Service #4's Chinese name — the matrix's Footer tab says `演出製作`, its Home/Services/Portfolio tabs say `活動製作` | **Resolved 2026-08-02: `活動製作`**, site-wide. Phases 6, 9 and 10 render the same string. |
| 2 | Social platforms — the matrix supplies Facebook/Instagram/YouTube/**Podcast**; the Footer and the TC Figma frame both carry **X** | **Resolved 2026-08-02: Podcast replaces X.** All four slots resolve to real destinations. No Podcast glyph exists in the Figma social set, so that slot uses the neutral link/chain glyph as an explicit placeholder rather than pointing the X brand mark at another platform; `social-brand/x.svg` stays committed. |
| 3 | Footer Services column heading — the matrix gives `服務項目`, the TC Footer frame `12635:16558` renders `SERVICES` in English | **Resolved 2026-08-02: stays English.** The matrix row is treated as an oversight — the adjacent `IN UTERO` label *is* marked `保留英文`, the TC frame renders English, and `VerticalLabel`'s `rotate-90` lays CJK glyphs on their side. |

**Note on precedence in practice.** Conflicts #2 and #3 are both cases where the matrix and a
*locale-specific* Figma frame disagree, and they were resolved in opposite directions — #2 for the
matrix, #3 for the design. That is the point of escalating rather than applying the rule
mechanically: a matrix row contradicting a TC frame its author may never have opened is a
question, not a mandate. The general rule still stands; these are two named exceptions to it,
and neither was decided by the implementer.

## D033 — Home hero and intro are page-local sections

**Decision:** `HomeHero` and `HomeIntro` live in `app/[locale]/_components/`, not
`app/_components/`, and get no `INVENTORY.md` entry.

**Why:** Each has exactly one consumer and no variant surface beyond locale, which the
page already has from route params. The `TaglineWrapper` precedent applies: a Phase 2
primitive extracted "for consistency", found to have a single consumer, and deleted again
in Phase 3. `INVENTORY.md` earns its keep by listing what a later phase would otherwise
rebuild; a Home-only hero is not that.

**How to apply:** Promote a section to `app/_components/` when a *second* page needs it,
and add the INVENTORY entry at that point — not in anticipation.

## D034 — The stacked layout holds to 1440px; the collage engages above it

> **Superseded by [D040](#d040--one-layout-breakpoint-at-1024px-placed-compositions-scale-flow-sections-reflow) (2026-08-03).** Kept as the record of what was decided and built during Phase 5; the breakpoint it describes is no longer in the code.

**Decision:** Home's hero and intro run their 393px stacked layout from 393px to 1439px.
The 1440px composition engages at `min-width: 1440px`, exposed as the Tailwind `desktop:`
variant (`--breakpoint-desktop: 1440px` in `@theme`). This is deliberately *not* the same
breakpoint as D009 (token switch) or D021 (NAV collapse), both at 1024px.

**Why:** The desktop hero is placed against a fixed 1440px canvas — three overlapping
photographs and four display words at absolute coordinates. It does not interpolate:
shrinking it changes which photo covers which word. User decision 2026-08-02, chosen over
scaling the collage in relative units (the overlaps become unverifiable against any frame)
and over a centered fixed 1440px canvas (introduces horizontal overflow).

**How to apply:**

- Build the stacked subtree **fluid**, never to 393px fixed widths — it has to survive a
  1280px viewport. Use `w-[calc(100%-Npx)] max-w-[Npx]` rather than a bare fixed width.
- The stacked subtree carries `tokens-mobile-type`, which pins the display sizes back to
  their mobile-mode values for the 1024–1440 band. Without it the mobile layout renders at
  the desktop type scale it was never drawn for (Display/H1 jumps 113px → 220px at 1024px).
  Extend that class in `globals.css` when a later phase's stacked section needs another
  token; the values are transcribed from `design-tokens.md`, not new.
- **Known unresolved consequence:** between 1024px and 1439px the desktop NAV bar (89px
  logo, D021) renders over the stacked hero, whose headline starts at y=86 — the logo and
  the first word collide. No frame exists at that width. Resolving it means changing either
  D021 (hold the mobile NAV to 1440px, affects every page) or this decision (switch the
  hero at 1024px, requires a derived collage). Left for the Polish phase.

## D035 — The Home hero headline uses the Latin display scale in both locales

**Decision:** The four hero words (`Creative` / `Souls` / `Global` / `Visions`) are English
literals in both dictionaries *and* render at the English display sizes under `/zh`. Applied
via `tokens-headline-h1-latin` / `tokens-headline-jumbo-latin` in `globals.css`, set on the
headline elements so they outrank the `html[lang="zh"]` root.

**Why:** The content matrix marks the headline `keep EN`, and the TC frames draw the same
four English words at the *same* sizes — desktop `0:191`–`0:194` are 660×160 boxes exactly
like their EN counterparts (one line of Jumbo desktop-English leading, 159.9px), and mobile
`0:4`–`0:7` are 80px-tall lines (H1 mobile-English leading, 79.1px) rather than the 74.4px
Chinese leading. Letting the Chinese scale apply shrank the `/zh` headline to 166px against
EN's 246px — visibly wrong, and not what the design shows.

**How to apply:** Any locked-English display lockup in a Chinese page needs this treatment.
Locale-sensitive tokens are keyed to the *page* language, not the *string's* language, so a
string that stays English needs its scale pinned explicitly.

## D036 — The dark NAV overlays the hero rather than sitting above it

**Decision:** On pages whose frames instance `Desktop NAV/DARK`, the NAV bar is
`absolute inset-x-0 top-0`, overlaying the page's first section. Which routes those are
lives in `darkNavRoutes` in `app/_lib/routes.ts`, resolved by `navThemeForPath()`.

**Why:** In Figma the dark NAV is a child *of the Hero frame* (`12612:11873` sits at y=0
inside `12405:6947`), so the hero starts at the top of the page and the bar floats over it.
Rendered in normal flow it produced a white band above the hero with invisible white links.

This also amends **D017**, which called the NAV theme "a static per-page prop". `Nav` is
rendered by `app/[locale]/layout.tsx`, so a page cannot pass it one — props do not flow from
a child to its layout. The route table expresses the same decision where the layout can
reach it: still static per page, still not scroll-driven. The `theme` prop remains and still
wins when passed, which is what `/styleguide` uses to show both variants.

**How to apply:** A later page phase whose hero shows the dark NAV adds its route key to
`darkNavRoutes` — it does not add a prop to the page.

## D037 — The Intro heading gradient is written literally, not tokenized

**Decision:** The Intro heading's three-stop green gradient is a literal in
`HomeIntro.tsx` (two constants, one per breakpoint — the frames use different angles).

**Why:** Only the first stop (`rgb(8,196,84)`) is a design token
(`--color-brand-primary-green`). The mid and end greens exist solely inside this gradient and
have no Figma variable behind them. Promoting them to `@theme` would invent tokens the design
system does not have, which is the failure mode the "never eyedrop a value" rule exists to
prevent — the rule targets re-deriving token values, not transcribing a one-off decoration.

**How to apply:** If a second section ever uses the same ramp, tokenize it then. Until then a
named constant beside its consumer is the honest representation.

## D038 — The ZH Intro heading wraps naturally at the designed Chinese scale

**Decision:** Under `/zh` the Intro heading renders `根植本土，前進世界。` at the desktop-Chinese
`Display/H2` token and wraps on its own. The Intro section is simply shorter in `zh` than in
`en`. Nothing is scaled up to fill the block the design drew.

**Why:** The matrix line is nine characters against the English line's fifty-five, and the TC
frames still draw older, longer Chinese copy — so no frame exists for the final string
(D005/D032). User decision 2026-08-02, chosen over enlarging the type to occupy the designed
1118×472 area, which would mean inventing a size outside the token set.

**How to apply:** The overlapping Intro image is positioned against the *heading block*
(`bottom-[-10px]`), not a fixed section offset, so it follows the shorter heading up instead of
detaching from it. Any later section pairing a display heading with an overlapping element in
both locales needs the same treatment — anchor to the text, not to the canvas.

## D039 — The floating desktop `MENU` square is not built

**Decision:** `12423:8613` (desktop EN) / `0:504` (desktop TC) — a 75×75 green square reading
`MENU`, sitting at the Hero/Intro boundary top-right, outside the Hero frame — is **not
implemented**. Deferred to the Polish phase.

**Why:** Its position implies a scroll-driven desktop nav, but the panel it would open has no
verified design: Phase 3 established that the desktop expanded-menu frame (`12612:8541`) is a
stray documentation duplicate with no real trigger. Building the trigger alone ships a control
that opens nothing; wiring it to the mobile overlay would contradict D017/D036 and stretch a
393px design across 1440px. User decision 2026-08-02.

**How to apply:** These nodes exist and are deliberate omissions — a later phase should not
rediscover them as a defect, nor implement them without first resolving what the desktop menu
panel actually looks like.

## D040 — One layout breakpoint at 1024px; placed compositions scale, flow sections reflow

**Decision:** **Supersedes D034.** Every breakpoint is 1024px — tokens (D009), NAV (D021), and
section layout. `--breakpoint-desktop` and `tokens-mobile-type` are deleted.

Sections split into two kinds:

| Kind | Behaviour | Example |
| :--- | :--- | :--- |
| **Placed canvas** | Keeps its drawn 1440×960 geometry, scaled uniformly to the available width via `.canvas-1440` | Home hero |
| **Flow** | Reflows normally, as any responsive section does | Home intro, card grids, article bodies |

**Why:** D034 put the layout switch at 1440px while tokens and NAV switched at 1024px, and the
1024–1440 band is where they collided — the desktop NAV rendered over a stacked hero whose
headline starts at y=86. That band also sent a large share of real desktop traffic to the mobile
layout: 1366×768 and 1280×800 are common, and **a 1440px screen with a visible scrollbar reports
a ~1425px viewport**, so the design's own width fell back to mobile. 1440 is a good width to
design at and a bad width to branch at.

Uniform canvas scaling is *not* the per-element fluid sizing rejected on 2026-08-02. Every
coordinate stays exactly as Figma draws it and only the scale factor varies, so there is no
drift and nothing to verify against a frame that does not exist. At ≥1440px the scale is exactly
1 and the rendering is unchanged. User decision 2026-08-03.

**How to apply:**

- Use `.canvas-1440` **only** for genuinely placed compositions. Scaling a flow section would
  shrink body copy below its designed size.
- A positioned child of a flow section cannot keep a fixed pixel offset — it must carry the
  frame's proportion. The intro image is `left-[50.903%]` (733/1440), not `left-[733px]`, which
  at 1024px would land at 71.6% and slide off the heading. Same for the heading's right margin
  (`16.042%` = 231/1440). Vertical rhythm and text-column widths stay in px.
- **The scale must go through a custom property.** Written inline as
  `transform: scale(calc(100cqw / 1440px))` the declaration is silently dropped by Lightning CSS
  at build — it never reaches the browser and the canvas renders full-size and clipped. This
  cost a debugging cycle; the workaround is commented in `globals.css`.

**Accepted costs:** below 1440px a flow section has no frame, so the intro heading reflows to
more lines than the design draws (7 at 1024px vs 4 at 1440px) and the section grows taller. The
hero is scaled while the intro is not, so their relative proportions shift slightly between
1024px and 1440px. Canvas scaling also reduces the effect of user font-size preferences within
that section — browser zoom still works correctly, which is why it is confined to the hero and
must never be applied page-wide.

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

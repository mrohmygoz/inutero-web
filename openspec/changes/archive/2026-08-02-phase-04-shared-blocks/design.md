# Phase 4 — Design

## Table of Contents

- [Context](#context)
- [Goals / Non-Goals](#goals--non-goals)
- [Decisions](#decisions)
  - [D-A — MDX toolchain: `@next/mdx` with dynamic imports](#d-a--mdx-toolchain-nextmdx-with-dynamic-imports)
  - [D-B — Frontmatter is a named MDX export, validated by a hand-rolled typed guard](#d-b--frontmatter-is-a-named-mdx-export-validated-by-a-hand-rolled-typed-guard)
  - [D-C — Content parity is enforced by one build-time manifest module](#d-c--content-parity-is-enforced-by-one-build-time-manifest-module)
  - [D-D — `Cms` is a component that supplies an element map, not a global `mdx-components.tsx`](#d-d--cms-is-a-component-that-supplies-an-element-map-not-a-global-mdx-componentstsx)
  - [D-E — Detail pages get a deliberately unstyled wrapper this phase](#d-e--detail-pages-get-a-deliberately-unstyled-wrapper-this-phase)
  - [D-F — `NewsletterSignup` is presentational unless given an `action`](#d-f--newslettersignup-is-presentational-unless-given-an-action)
  - [D-G — Mobile appearances are surveyed, not derived from the desktop block](#d-g--mobile-appearances-are-surveyed-not-derived-from-the-desktop-block)
- [Figma Survey Plan](#figma-survey-plan)
- [Risks / Trade-offs](#risks--trade-offs)
- [Open Questions](#open-questions)

## Context

See `proposal.md` — Why. Three constraints shape everything below.

**No content infrastructure exists yet.** There is no `content/` directory, no MDX dependency,
and `next.config.ts` carries nothing but the root redirect. This phase adds the first runtime
dependencies since Phase 1.

**The detail routes are currently lying.** Both `[slug]/page.tsx` files hardcode
`PLACEHOLDER_SLUG = "placeholder"` and 404 everything else (D020). `dynamicParams = false` is
already set on the locale layout, so the 404 behavior this phase must preserve is already in
place — only the *source* of the parameter list changes.

**Mobile `COMP` has no counterpart for any of the three new components.** `design-inventory.md`
lists `UniversalCTA`, `NewsletterSignup`, `Article`, and `CMS` under Shared Components —
Desktop only. The mobile `COMP` section (`12219:1582`) contains primitives and page-level
compositions, nothing matching these. Their 393px appearance exists only inside mobile page
frames.

## Goals / Non-Goals

**Goals:**

- A content pipeline that fails loudly and specifically at build time, per D002 and D010.
- Three shared blocks that page phases 5–15 can compose without re-deriving anything.
- Enough sample content to prove every element the `CMS` renderer styles.

**Non-Goals (design-level, beyond the proposal's scope list):**

- No content indexing, tag filtering, sorting, pagination, or "related posts" query. The News
  and Portfolio *listing* pages are Phases 10 and 13; this phase gives them a manifest to read
  but builds no listing UI.
- No reading-time calculation, table of contents, heading anchors, or syntax highlighting. None
  appear in the `CMS` Figma node, and adding them now would be inventing design.
- No image optimization strategy for content-embedded images beyond routing them through
  `next/image`. Real content imagery arrives in Phases 11/14.

## Decisions

### D-A — MDX toolchain: `@next/mdx` with dynamic imports

**Decision:** `@next/mdx` (plus `@mdx-js/loader`, `@mdx-js/react`), configured in
`next.config.ts` via `createMDX`. Detail pages load a file with
`await import(...)` against a path containing the locale and slug. Content stays in
`content/`, **outside** `app/`, so `pageExtensions` is left alone — MDX files are modules, not
routes.

**Why:** This is the pattern the vendored Next 16 docs document for exactly this shape
(`node_modules/next/dist/docs/01-app/02-guides/mdx.md` → "Using dynamic imports"), it compiles
at build time with zero runtime MDX cost, and it keeps the static-export-shaped architecture
intact.

**Alternatives considered:**

| Option | Rejected because |
| :--- | :--- |
| `next-mdx-remote/rsc` | Compiles MDX from a string at render time. Correct for content fetched from a CMS; here the files are local and known at build, so it buys nothing and adds a per-render compile. |
| `mdx-bundler` | Requires esbuild at build time and is aimed at content with per-file dependencies. Overkill. |
| MDX files as routes under `app/[locale]/news/` | Violates D001's "every route lives under `[locale]/`" only trivially, but forces content into the app tree, duplicates every file per locale as a route folder, and gives up `generateStaticParams`. |

**Turbopack caveat:** remark/rehype plugins must be named as strings, not imported functions
(same doc, "Using Plugins with Turbopack"). All plugins this phase needs take serializable
options, so this is a syntax constraint, not a blocker.

### D-B — Frontmatter is a named MDX export, validated by a hand-rolled typed guard

**Decision:** YAML frontmatter in the MDX source, surfaced as a named export via
`remark-frontmatter` + `remark-mdx-frontmatter`. Validation is a hand-written type guard in
`app/_lib/content/`, not a schema library.

**Why:** The frontmatter lives in the file once and is readable both as YAML by a human and as a
typed export by TypeScript. A schema library (`zod`, `valibot`) would be the reflexive choice,
but D010 already set this project's precedent — hand-rolled typed dictionaries over a library —
for a materially harder problem (i18n parity). Three required fields on two content types does
not justify a dependency, and the guard's failure message can name the file and field more
precisely than a generic schema error.

**Alternative considered:** `gray-matter` read via `fs`. Simpler to enumerate with, but it means
parsing every file twice — once by `gray-matter` for metadata, once by the MDX compiler for the
body — and creates two code paths that can disagree about what a file contains.

### D-C — Content parity is enforced by one build-time manifest module

**Decision:** A single module in `app/_lib/content/` scans the content directories with
`node:fs`, builds a per-type manifest of `{ slug, locale, frontmatter }`, and throws on the
first violation it finds: a slug present in one locale only, or frontmatter failing D-B's guard.
Every consumer — `generateStaticParams`, `generateMetadata`, the page body, and the future
listing pages — reads that manifest. No route file scans the filesystem itself.

**Why:** D002 requires a missing translation to fail *loudly at build time*. If parity were
checked inside `generateStaticParams`, a missing `zh` file would produce a smaller route list —
a silently narrower site, not a failure. Centralizing it means the check runs once and every
consumer inherits it.

**Consequence:** `generateStaticParams` is where this throws in practice, so a parity violation
surfaces as a build error naming the slug and the absent locale. That is the intended and
only failure mode.

### D-D — `Cms` is a component that supplies an element map, not a global `mdx-components.tsx`

**Decision:** Build `app/_components/Cms.tsx` exporting both a `<Cms>` wrapper (the body
container: max-width, vertical rhythm, locale class) and the element map it passes to the MDX
content via `MDXProvider`. Do **not** add a root `mdx-components.tsx`.

**Why:** A root `mdx-components.tsx` is global — it would style MDX anywhere in the app, including
any future MDX used for something that is not an article body. The `CMS` Figma node
(`12610:7361`) is a *specific* design for a long-form article body, not a site-wide markdown
theme. Scoping it to a component keeps that honest and makes the styleguide specimen trivial:
render `<Cms>` around sample markup.

**Element coverage** is whatever `12610:7361` actually defines, established by the survey below —
not a guessed list. Elements the design does not cover fall back to inheriting the body
container's type and width (spec: "Raw markup in content does not escape the renderer").

### D-E — Detail pages get a deliberately unstyled wrapper this phase

**Decision:** `news/[slug]/page.tsx` and `portfolio/[slug]/page.tsx` render the frontmatter title
and the `<Cms>`-wrapped body inside a plain centered container. No hero, no meta row, no share
rail, no related posts.

**Why:** News Details is `6448px` tall and slated to split across phases (14, possibly 14a/14b);
Portfolio Details is Phase 11. Building any of that chrome now is the exact "start the next
phase because it seems obvious" failure the phase rule exists to prevent. The verification
target for this phase is "the pipeline works and the body is styled", not "the page matches
Figma" — and it must be reported that way.

**How to apply:** Phases 11 and 14 replace this wrapper wholesale. Nothing in it should be
treated as design-matching, and the wrapper should be visually plain enough that no reviewer
mistakes it for one.

### D-F — `NewsletterSignup` is presentational unless given an `action`

**Decision:** `NewsletterSignup` accepts an optional `action` prop. Without it, the block renders
its field and button as inert markup (button `type="button"`, no handler, no `<form>` submit
target). It stays a server component.

**Why:** No newsletter endpoint exists and none is in scope — the only Route Handler this project
plans is the Phase 15 contact form. A `<form>` with no `action` submits a GET to the current URL
and visibly reloads the page, which is worse than doing nothing. This follows D022's precedent
exactly: the Footer's legal links render as inert text rather than as `<a href="#">`s that
promise a destination that never resolves.

**How to apply:** Whoever wires a real newsletter endpoint passes `action` and, at that point,
decides whether the block needs to become a client component. Until then, do not add a fake
success state.

### D-G — Mobile appearances are surveyed, not derived from the desktop block

**Decision:** For each of `UniversalCTA`, `NewsletterSignup`, and `CMS`, fetch at least two
mobile occurrences from different mobile page frames before writing the 393px layout, per the
D012 method. Reconcile into one responsive component (never two trees), switching at `lg`
(1024px) consistent with D009/D015/D021.

**Why:** D012 was recorded because the desktop `UniversalCTA` button turned out to be locally
drawn rather than an instance, and occurrences disagreed with each other. The same file
structure applies here, with the additional problem that these three have no mobile symbol at
all — so there is nothing to check a single occurrence against.

**Consequence:** If the survey finds the mobile occurrences genuinely disagree with each other
(not just with desktop), stop and ask rather than picking one. Record the answer in
`openspec/DECISIONS.md`.

## Figma Survey Plan

Run `/figma-design-to-code` first, then fetch. Node IDs from `design-inventory.md`.

| Target | Desktop node | Mobile source | What the survey must answer |
| :--- | :--- | :--- | :--- |
| `UniversalCTA` | `12653:5649` — EN `12573:9014`, CN `12653:5650` | Locate ≥2 occurrences in mobile page frames | Background treatment; which `Cta` `tone` it passes (D013); whether EN and CN differ beyond the string |
| `NewsletterSignup` | `12612:8163` | Locate ≥2 occurrences; **also** compare against the block already inside `Footer` (`12573:9181` / mobile `12384:4852`) | Whether the Footer's newsletter block is this same component. If yes, `Footer.tsx` composes it; if no, both stay and the divergence is recorded. Also: does a CN variant exist? |
| `CMS` | `12610:7361` | Locate its occurrence(s) in the mobile News Details frame | Which elements the design actually defines; body max-width; vertical rhythm between element types; image/figure treatment |

Both locales for each: EN and CN/TC frames, not EN with swapped strings.

## Survey Findings

Completed 2026-08-02. Every question the plan posed is answered below.

### Mobile counterparts exist as real symbols

`design-inventory.md` lists these three under Shared Components — *Desktop* only, but all three
do have a mobile definition; they are simply named differently and live inside page frames
rather than mobile `COMP`.

| Block | Desktop | Mobile | 2nd mobile occurrence |
| :--- | :--- | :--- | :--- |
| `UniversalCTA` | `12653:5649` (symbol, EN `12573:9014` / CN `12653:5650`) | `12212:5282` — symbol named **"CTA"**, 393×734, on Home | `12220:2432` (Services), `12368:2429` (TC Home) — instances, identical |
| `NewsletterSignup` | `12612:8163` | `12212:6048` — symbol named **"Section"**, 393×425, on News | `12212:6049` (News Details), `12389:6080` (TC News Details) |
| `CMS` | `12610:7361` | `12211:4514` — frame named **"Article"**, on News Details | `12368:2711` (TC News Details) |

Because both breakpoints resolve to real symbol definitions with agreeing instances, D-G's
"stop and ask if occurrences disagree" trigger did not fire. D012's locally-drawn hazard applies
only to the two raw type sizes noted below.

### Locale handling: only the button labels are translated

The CN/TC variants change **nothing but the button label and, for `NewsletterSignup`, the
heading and description**. Specifically:

- `UniversalCTA` — heading stays English "LET'S MAKE SOME NOISE" in both locales; the
  "General Inquiries" label and the email address stay English. Only the button translates.
- `NewsletterSignup` — heading (`取得我們的最新消息`), description, and button (`訂閱`) all
  translate; the email placeholder stays `youremail@gmail.com`.
- `CMS` — no locale variant. The TC body is structurally identical; only the type scale differs,
  which the existing token cascade already handles.

**Conflict found:** the desktop CN button reads `和我們聊聊` and the mobile TC button reads
`跟我們聊聊`. One string must win under D010's one-key-one-string rule. Taking the mobile TC
form; recorded in `DECISIONS.md`.

**Copy differs by breakpoint, not locale:** desktop says "General / Other Inquiries", mobile says
"General Inquiries". Using the mobile (shorter) string at both breakpoints — the desktop
variant's extra words carry no meaning the short form lacks, and D010 dictionaries are not
breakpoint-aware.

### `UniversalCTA` — reconciliation

| | Mobile (393×734) | Desktop (1440×780) |
| :--- | :--- | :--- |
| Background | Green gradient at 221.6°, plus a 546px radial-gradient circle with an `feTurbulence` noise filter, `mix-blend-darken`, anchored top-left | Green gradient at 195.2°, plus a full-bleed grain PNG |
| Layout | One column, `justify-between`, heading / button / contact stacked | Heading block top-left; button and contact block side-by-side in a row pinned near the bottom |
| Heading | `Display/Jumbo` token (166px) | **Raw 288.058px / 187.238px / -3px** — not any token (desktop Jumbo is 246px, H1 220px). Locally drawn, D012. |
| Button | `Cta` full-width, `tone="dark"` | `Cta` hug-width, `tone="dark"` |
| Contact block | `Display/H6` label + underlined `Chivo Mono` 14px email | Same, `Display/H6` label |

Assets committed: `public/images/universal-cta-grain.png` (desktop), `public/images/universal-cta-glow.svg` (mobile).

### `NewsletterSignup` — reconciliation

| | Mobile | Desktop |
| :--- | :--- | :--- |
| Container | `bg` neutral-darkest, `border-t`/`border-b` white-10, inner `max-w-576`, `px-20 py-26` | Same bg, **no borders**, `px-32 py-64`, inner `max-w-1376` |
| Heading | `Display/H3` white uppercase | `Display/H3` white uppercase |
| Description | `Body/M` white-50, centered | `Body/M` white-50, left |
| Form | Column, `gap-29`, input above button, both full-width, input text centered | Row, `gap-28`, right-aligned `max-w-750`, input flex-1 left-aligned, button hug |
| Button | Green (`brand/primary-green`) with dark text → `Cta tone="green"` | Same |

### `NewsletterSignup` vs. the Footer's newsletter block — **genuinely different**

Answered the D-G survey question: they are not the same component. The Footer block has a small
green `Label/M` heading, no `Display/H3`, and a trailing disclaimer line, and sits as one of three
columns on the Footer's light surface. `NewsletterSignup` is a standalone full-width dark section
with a display heading and no disclaimer. **`Footer.tsx` is left alone structurally.**

One correction is being made to `Footer.tsx` anyway: its newsletter button is `type="submit"`
inside a `<form>` with no `action`, which submits a GET to the current URL and reloads the page.
That is the exact failure D-F exists to prevent, so the Footer button becomes `type="button"` for
consistency with `NewsletterSignup`.

### `CMS` — element coverage

The node defines exactly five body elements. Everything else in it is page chrome.

| Element | Mobile | Desktop |
| :--- | :--- | :--- |
| Paragraph | `Body/L`, neutral-darkest, 32px top gap | Same size, `leading-[27.2px]` |
| Heading (renders as `h2`) | `Display/H5` token (41px) | **Raw 64px / `leading-[0.8]` / `-0.41px`** — not the desktop `Display/H5` token, whose letter-spacing is overridden to -0.78px. Locally drawn, D012. |
| Figure image + caption | image `w-full`; caption `Body/S` at neutral-darkest-40 behind a 2px dark left bar, 12px gap | Same structure; caption at **full** neutral-darkest, not 40% |
| Blockquote | Alumni Sans SemiBold Italic 30px, `leading-[0.87]`, uppercase, behind a 3px `brand/primary-green` left bar, 20px gap | Same at 45px |
| Body container | `max-w-672`, `px-20`, `py-40` | `max-w-967`, `px-32`, `py-92` |

**Not part of `Cms`:** the node also contains a left share rail (4 icons, 353px column) and a
bottom "Share" row above a hairline rule. Neither is an MDX body element, so `Cms.tsx` renders
neither.

**Amended after review (D031):** the user flagged the missing share icons. The **bottom row** was
built as a separate `ShareRow` component composed by `ContentDetail` — it exists at both designed
breakpoints and is self-contained. The **desktop-only left rail** remains unbuilt: it has no 393px
counterpart and occupies a column beside the article, which is the detail page's two-column layout
(Phases 11/14). The row's third glyph is the rail's X rather than the row's own YouTube, since
YouTube has no share endpoint.

**Not defined by the design, therefore derived:** `h1`, `h3`–`h6`, `ul`/`ol`/`li`, `a`, `hr`,
`code`, `table`. Real MDX will produce at least lists and links, so these get minimal
token-derived styling rather than browser defaults (see the `mdx-content` spec's "Raw markup in
content does not escape the renderer" scenario). This is derived, not design-matching.

**Content image aspect:** the two frames crop their sample photo differently (16:9 mobile,
~4:5 desktop). Since real content images have arbitrary dimensions, the renderer uses the image's
intrinsic aspect ratio at both breakpoints rather than forcing either crop. Derived.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| **Dynamic `import()` with two interpolated segments** (`${locale}` and `${slug}`) may not resolve under Turbopack — its context-module support is narrower than webpack's. | Try the two-variable form first. If it fails, fall back to a small generated registry module that eagerly imports every content file into a `Record<locale, Record<slug, Module>>`. Same build-time semantics, no bundler cleverness required. Decide this by trying it, not by guessing. |
| **`remark-mdx-frontmatter` compatibility with Next 16 canary's MDX pipeline.** | It is one of the three options the vendored Next 16 docs name for frontmatter. If it fails against the canary, D-B's alternative (`gray-matter` + `fs`, accepting the double-parse) is the fallback — the manifest module in D-C is the only place that would change. |
| **The three new blocks have no mobile symbol** — highest-probability source of a wrong implementation this phase. | D-G's two-occurrence survey rule, and the standing "stop and ask" instruction if occurrences disagree. |
| **`Cms.tsx` overreach** — styling elements the `CMS` node does not define, which then calcifies as "the design" when Phase 14 copies it. | D-D scopes coverage to what the survey finds. Anything added beyond that is recorded in `DECISIONS.md` as derived, not design-matching. |
| **The plain detail-page wrapper (D-E) reads as an unfinished page at the review gate.** | Say so explicitly in the phase report: the detail-page *design* is Phases 11/14 and was not attempted. A reviewer expecting a finished article page would otherwise read this as a regression. |
| **First new dependencies since Phase 1**, on a Next canary. | Pin exact versions. Confirm `npm run build` (not just `npm run dev`) passes before the gate — the MDX loader is a build-time concern and `dev` can mask a production-build failure. |

## Open Questions

None blocking. The two genuinely deferrable items — whether the Footer's newsletter block is the
same component, and which elements `CMS` defines — are answered by the survey during `/opsx:apply`
and change neither the specs nor the task breakdown, only what the tasks find.

# Phase 4 — Shared blocks

## Why

Phases 1–3 delivered tokens, primitives, and a navigable shell. What is still missing before
any real page can be built is the second tier of shared UI — the full-width blocks that recur
across pages (`UniversalCTA`, `NewsletterSignup`) — and the content pipeline that the two
detail routes are currently faking. `portfolio/[slug]` and `news/[slug]` ship today with a
hardcoded `"placeholder"` slug (D020) precisely because this phase was scheduled to replace it.
Every page phase from 5 onward composes at least one of these; building them per-page would
guarantee drift.

## What Changes

- **`UniversalCTA`** — new shared block. Desktop `12653:5649` (`Property 1=Default`
  `12573:9014`, `Property 1=CN` `12653:5650`). Locale via prop, per D001/D010. Composes the
  existing `Cta` primitive; the tone it passes is determined by the block's own background
  (D013).
- **`NewsletterSignup`** — new shared block. Desktop `12612:8163`. Includes the email input and
  submit control as markup only; **no submit handler, no Route Handler** — the contact form and
  its API route are Phase 15, and no newsletter endpoint exists in scope at all.
- **`Footer`'s static newsletter block** — reconciled against `NewsletterSignup`. If the survey
  shows the Footer block is the same design, `Footer.tsx` composes the new component instead of
  keeping its own copy; if it is a genuinely different design, it is left alone and the
  divergence is recorded. Not assumed either way before the Figma survey.
- **MDX content pipeline** — `content/portfolio/{en,zh}/*.mdx` and `content/news/{en,zh}/*.mdx`,
  read at build time. Typed frontmatter, slug enumeration feeding `generateStaticParams`, and a
  build-time failure when a slug exists in one locale but not the other (D002, D010).
- **`CMS` body renderer** — new shared component. Desktop `12610:7361`. Maps MDX element output
  (headings, paragraphs, lists, blockquote, images, figures) onto the design's typography and
  spacing tokens.
- **`portfolio/[slug]` and `news/[slug]` stubs replaced** — `generateStaticParams` reads the
  content directory instead of returning `PLACEHOLDER_SLUG`; the page renders the MDX body
  through `CMS`. The **surrounding page design** (hero, meta row, related posts, share rail) is
  explicitly *not* built — that is Phase 11 and Phase 14.
- **One sample MDX article per route type, per locale** — four files total, real enough to
  exercise every element the `CMS` renderer styles. These are fixtures for this phase, replaced
  by real copy in Phases 11/14.
- **`/styleguide`** — gains specimens for `UniversalCTA`, `NewsletterSignup`, and `CMS`, in both
  locales, per the existing `design-primitives` contract.
- **No work needed on `Article`.** The phase plan lists "Article card" as a Phase 4 deliverable,
  but it was built mid-Phase-2 at user direction (`Article.tsx`, desktop `12612:7696`, mobile
  occurrence `12220:1670`). This phase verifies it still renders and does not rebuild it.

Mobile has no `COMP` entry for `UniversalCTA`, `NewsletterSignup`, or `CMS` — the mobile
component set is not 1:1 with desktop. Their 393px appearance must be surveyed from mobile page
frames using the D012 method (at least two occurrences, different frames) rather than assumed to
be the desktop block reflowed.

## Capabilities

### New Capabilities

- `mdx-content`: How long-form content enters the site — where the files live, what frontmatter
  they must declare, how slugs become routes, how a missing translation fails the build, and
  what the body renderer guarantees about the rendered output.

### Modified Capabilities

None. `localized-routing`'s existing "Detail route with an unknown slug" scenario already
specifies 404 for any slug not generated at build time — this phase changes *what* gets
generated, not the routing contract. `design-primitives`' requirements (locale as an explicit
input, one component for both breakpoints, styleguide reviewability) apply unchanged to the
three new components.

## Impact

| Area | Change |
| :--- | :--- |
| `app/_components/` | New: `UniversalCTA.tsx`, `NewsletterSignup.tsx`, `Cms.tsx`. Possibly modified: `Footer.tsx`. `INVENTORY.md` updated. |
| `app/_lib/` | New content module (frontmatter types, directory scan, slug/locale-parity checks). |
| `content/` | New top-level directory — four sample MDX files. |
| `app/[locale]/{news,portfolio}/[slug]/page.tsx` | `generateStaticParams` sourced from content; body rendered via `CMS`. Placeholder slug removed. |
| `app/styleguide/` | New specimen section for the three shared blocks. |
| Dependencies | First new runtime dependencies since Phase 1 — an MDX toolchain and a frontmatter parser. Exact packages are a `design.md` decision. |
| `next.config.ts` | Likely gains MDX configuration and a `pageExtensions` change. |
| `openspec/DECISIONS.md` | New entries for the MDX toolchain choice, the frontmatter contract, and any derived mobile behavior for the three blocks. |

**Explicitly out of scope:** the News Details and Portfolio Details page designs, real editorial
copy, a newsletter or contact submit endpoint, and any Phase 5 Home section.

## Verification

The user checks in a browser, at 393px and 1440px, in both locales:

1. `/styleguide` — `UniversalCTA`, `NewsletterSignup`, and `CMS` specimens render and match
   their Figma frames.
2. `/en/news/<sample-slug>` and `/zh/news/<sample-slug>` — the sample article body renders
   through `CMS` with real typography, not browser defaults.
3. `/en/portfolio/<sample-slug>` and its `zh` counterpart — same.
4. `/en/news/does-not-exist` — 404, not an empty shell.
5. `npm run build` fails with a message naming the file when a `zh` counterpart is deleted.

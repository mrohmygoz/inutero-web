## Context

See `proposal.md` — Why. Design-level state that shapes the approach:

- `app/[locale]/layout.tsx` currently renders `<html>`/`<body>` and nothing else. It is the
  only place the shell can live, since D001 forbids routes outside `[locale]/` and D011 removed
  the root layout.
- Ten primitives exist in `app/_components/` (see `INVENTORY.md`). The shell composes tokens
  and, where the design shows one, an existing primitive — it does not introduce new ones.
- Everything shipped so far is a server component. The shell is the first thing on the site
  that needs interactivity (a mobile menu, a locale switcher).
- Two Phase 0 open questions were parked "needed by Phase 3" — NAV light/dark trigger and
  localized slugs. Both are resolved below by user decision (2026-08-01).

## Goals / Non-Goals

**Goals**

- One responsive `Nav` and one responsive `Footer`, not a desktop tree and a mobile tree.
- One route table that nav links, footer links, the locale switcher, stub titles, and
  `hreflang` alternates all read from.
- Stub routes cheap enough that phases 7–15 delete them without ceremony.

**Non-Goals**

- Any scroll-, intersection-, or motion-driven behavior. See D-A.
- A reusable page-layout abstraction. Nine pages with wildly different section structures do
  not yet justify one; the shell is `layout.tsx` and that is enough.
- Full metadata. This phase emits title + canonical + `hreflang` only; Phase F owns OG images,
  descriptions, and the sitemap.

## Decisions

### D-A — NAV theme is a static per-page prop, not a scroll behavior

`Nav` takes `theme: 'light' | 'dark'` (default `'light'`). Pages that sit under a full-bleed
hero pass `'dark'`. Nothing watches scroll position.

The design ships `Desktop NAV` (`12653:5366`) and `Desktop NAV/DARK` (`12653:5259`) as two
component definitions, with no transition, no intermediate state, and no scroll annotation
anywhere in the file. D007 already established that the dark NAV is a per-component variant
rather than a theme system.

**Alternatives considered:** scroll-triggered switching via `IntersectionObserver` (rejected —
the trigger point is not in the design, so it would be invented, unverifiable against Figma,
and would make `Nav` a client component for a behavior nobody specified); inferring per-page
from the hero frames during implementation (rejected — the frames show a static state, so this
collapses into this decision anyway, after spending MCP calls to find that out).

**Consequence:** the prop plumbing exists from Phase 3, so a page phase that needs the dark nav
passes it rather than modifying `Nav`. If a real scroll spec ever appears, it replaces the
prop's *source*, not the component.

### D-B — One typed route table in `app/_lib/routes.ts`

A `routes` array of `{ key, path, label: Record<Locale, string> }`, plus helpers to build a
localized href and to swap the locale of a given path. `openspec/reference/routes.md` stays the
human source of truth; `routes.ts` is its machine-readable transcription, and the two are
checked against each other in this phase's tasks.

Display names come from the route table rather than the i18n dictionaries. They are structural
labels used in three places (nav, footer, page title) and duplicating them into `en.ts`/`zh.ts`
would create two places for the same string to drift. Prose copy still lives in the
dictionaries per D010.

**Alternatives considered:** hardcoding links in `Nav` and `Footer` (rejected — the footer and
nav link sets overlap but are not identical, so the same path would appear twice); a filesystem
scan of `app/[locale]/` (rejected — no ordering, no labels, and it cannot distinguish a route
from a colocated `_components` folder).

### D-C — `Nav` is a client component; `Footer` stays a server component

`Nav` needs `usePathname` for the locale switcher and `useState` for the mobile menu. Rather
than a server `Nav` wrapping two client islands, the whole component is `'use client'` and
receives its labels as serializable props from the server layout. Dictionary access and locale
resolution stay on the server.

The nav is a few hundred bytes of markup with no data dependency; the JS cost of shipping it
whole is smaller than the complexity cost of splitting one visual element across three files.
`Footer` has no interactivity and stays a server component.

**Alternatives considered:** server `Nav` + `<LocaleSwitcher>` and `<MobileMenu>` islands
(rejected — the mobile expanded state re-renders the entire nav bar, so the island would be the
whole component); a CSS-only checkbox menu (rejected — worse accessibility than a button with
`aria-expanded`, and the locale switcher still needs the pathname).

### D-D — Detail-route stubs use a placeholder slug until the MDX pipeline lands

`portfolio/[slug]` and `news/[slug]` ship with a `generateStaticParams` returning a single
hardcoded placeholder slug per locale. `dynamicParams = false` is already set on the locale
layout and applies to the subtree, so every other slug 404s — which is the behavior the spec
requires and which Phase 4 preserves when it swaps the hardcoded list for a content scan.

**Alternatives considered:** omitting the dynamic routes from this phase (rejected — the route
shape is exactly what "the shell is navigable" is meant to prove, and the 404-on-unknown-slug
behavior is easier to verify now than retrofit); building the MDX pipeline here (rejected —
that is Phase 4, and folding it in violates the one-phase rule).

### D-E — The nav collapses to its mobile menu at 1024px

The designed frames are 393px and 1440px; the collapse point between them is not a design
value. Reuse `lg` / 1024px, matching D009 (token mode switch) and D015 (button width switch).

This is the third derivation to land on the same width, which is the point — one collapse
boundary for type scale, button width, and nav layout means a page never renders desktop
navigation above mobile type or vice versa. Falls under D005; recorded, not invented silently.

### D-F — Stub pages share one throwaway `PagePlaceholder`

Eight near-identical stubs go through a single `app/[locale]/_components/PagePlaceholder.tsx`
taking the route key and locale. It is deliberately **not** placed in `app/_components/` and
**not** registered in `INVENTORY.md` — it is scaffolding that phases 7–15 delete, and putting
it in the shared inventory would invite a later phase to build on it.

Metadata is likewise generated by one helper (`app/_lib/metadata.ts`) reading the route table,
so eight `generateMetadata` exports are eight one-line calls rather than eight copies of the
`alternates` block.

## Derived Sources

Findings from the Phase 3 Figma fetch (2026-08-01), recorded so later phases don't re-fetch.

- **Mobile NAV has a real `Property 1=Light|Dark` variant** (`12219:1100`), resolving the Phase
  0 open question — both breakpoints support the dark theme, not just desktop.
- **The dark NAV is genuinely used in the design**, not just a defined-but-unused variant: the
  Home desktop frame (`12405:6998`) places a `Desktop NAV/DARK` instance (`12612:11873`)
  directly over the Hero. This is the evidence D-A's per-page `theme="dark"` prop exists to
  carry (task 2.7) — page phases building a hero should check their frame for this pattern.
- **The desktop "expanded menu" frame (`12612:8541`) is not a real desktop interaction.** It
  renders as a 1440×960 full-screen green overlay, structurally identical to the mobile
  expanded menu, but the compact `Desktop NAV`/`Desktop NAV/DARK` definitions show all six
  links inline with no hamburger trigger — there is nothing in the desktop UI that would ever
  open this overlay. Treated as a stray documentation duplicate of the mobile state, not built.
  If a later phase finds a real desktop trigger for it, that reopens this finding.
- **The mobile expanded menu** (`10270:2118` EN / `12368:2386` TC) is a full-screen green
  overlay: logo, 7 links (Home + the 6 routes, "Home" set in an italic accent style distinct
  from the rest), a `CLOSE`/`返回` button top-right, and a footer with social icons + a locale
  toggle bar. Built as-is.
- **Footer is three content groups, not just route links** (surveyed via mobile `12384:4852`,
  which conveniently carries both `Default` and `TC` in one node, and desktop `12573:9181`):
  1. A **Services** column (Artist Management, International Booking & Tour Planning, PR &
     Marketing, Event Production) — these are Services-page subsections, not entries in
     `routes.md`. No anchors exist yet (Services page is Phase 8/9). Decision: link all four to
     the `/services` route as a whole-page destination for this phase; a later phase can upgrade
     to in-page anchors once the Services sections exist. Recorded as D-G below.
  2. An **"In Utero"** page-links column. Figma's own label text disagrees with itself here —
     desktop calls the first link "Our Story", mobile default calls it "About"; desktop's last
     link is "Contacts", mobile matches. Per D004, canonical labels win over either frame:
     "Our Story" and "Contact Us".
  3. A **Newsletter** block (label, email input, "Sign up" CTA, fine print). Static markup this
     phase per the proposal's Open Questions — no submit handler, `NewsletterSignup` real
     component is Phase 4.
  - Below that: social icons (Facebook/Instagram/X/YouTube — same four as the mobile expanded
    menu), a legal-links row (Privacy Policy, Terms of Service, Cookies Settings — no target
    pages exist; rendered as inert placeholders per D-G), and a copyright line.
  - EN and TC are the same structure end to end, confirmed from the single dual-property mobile
    node — no TC-specific layout divergence, unlike Featured Artists. Desktop TC screenshot
    (`12635:16558`) confirms the same for the desktop layout.

### D-G — Footer's non-route content is scoped down, not omitted

Services sub-links all point at `/services` (not per-section anchors); legal links
(`Privacy Policy`/`Terms of Service`/`Cookies Settings`) render as inert `<span>`s, not `<a>`s,
since no page or anchor exists yet for any of them.

**Why:** These three legal pages and the Services page's own anchor structure are out of this
phase's scope (Services content is Phase 8/9; legal pages were never in the 9-route table in
`routes.md` at all). Rendering the Services group as real, working links to the whole page is
more useful than omitting a visible section of the Figma footer; rendering the legal links as
dead `<a href="#">`s would silently promise a destination that never resolves, which is worse
than a plain label. Add real routes for legal pages only if the user decides they're in scope —
not assumed here.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| The mobile NAV has an expanded-menu frame (`10270:2118`) and so does desktop (`12612:8541`) — the desktop one may be a menu overlay rather than a large-screen equivalent, which would change what the 1440px nav is | Fetch both expanded frames before implementing, not after. If desktop turns out to have an overlay menu at 1440px, it is in scope for this phase (it is part of NAV) — flag it in the task notes rather than silently shipping only the collapsed bar. |
| Desktop NAV occurrences may disagree with the `COMP` definition, as they did for every Phase 2 primitive (D012) | Survey at least two page-frame occurrences of NAV and Footer before settling on values. Budgeted as its own task. |
| The Footer TC variant is a separate component variant (`12635:16558`), so it may differ structurally, not just in copy | Fetch the TC variant explicitly; do not render the Default variant with swapped strings. Same rule already applied per-page. |
| Nav shipped as a client component appears on all nine pages, so any later bloat is site-wide | Keep it prop-driven and free of data access. If it grows, revisit D-C rather than adding a second client boundary inside it. |
| `PagePlaceholder` calcifies and a page phase builds on top of it | Named as throwaway here, excluded from `INVENTORY.md`, and each page phase's first act is to replace its route's stub. |
| Locking the route table (D003) closes the localized-slug option in practice | Confirmed with the user for this phase specifically, not assumed from D003. |

## Open Questions

| Question | Why it can wait |
| :--- | :--- |
| Which pages pass `theme="dark"` to `Nav` | Each page phase decides from its own hero frame. Phase 3 only ships the prop and the light default; `/styleguide` demonstrates both. |
| Footer newsletter field, if the Footer frame contains one | If present, it renders as static markup this phase — `NewsletterSignup` (`12612:8163`) and any submit target are Phase 4/15. |

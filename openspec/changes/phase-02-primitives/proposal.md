## Why

Phase 1 landed the token layer, the `[locale]` skeleton, and `/styleguide`. Nothing consumes
those tokens yet. Every page phase (5–15) composes the same handful of small parts — a CTA
button, a tag, a title group, a card shell — and if each page phase builds its own, the site
ends up with four incompatible buttons and the token layer becomes decorative.

Phase 2 builds those parts once, renders every variant on `/styleguide`, and registers them in
`INVENTORY.md` so later phases compose rather than re-invent.

## What Changes

- **New shared components** in `app/_components/`, each responsive (393px + 1440px) and each
  taking locale as a prop rather than duplicating per locale:
  - `Cta` — primary button, `Default` + `TC` variants
  - `SecondaryCta` — secondary button, `Default` + `TC` variants
  - `Tag` — `Default` + `Active` variants
  - `TitleGroup` — eyebrow + heading cluster
  - `TaglineWrapper` — vertical rotated tagline rule
  - `ProjectCard`, `ArtistCard`, `TeamCard`, `ServiceCard`, `Article` — the five card shells
- **`/styleguide` gains a Primitives section** rendering every component × every variant ×
  both locales, so the phase is reviewable in a browser with no real page built.
- **`app/_components/INVENTORY.md`** gets its first ten entries.
- **`openspec/DECISIONS.md`** gains the decisions this phase is forced to make — principally
  which desktop instance was treated as canonical for each primitive, and the interaction
  states the design does not specify.
- Copy rendered by the styleguide specimens is literal sample text in the page, **not** added
  to `app/_lib/i18n/{en,zh}.ts` — D010 says dictionaries carry real page copy only.

### Figma nodes in scope

Primitives exist as component definitions **only on the mobile canvas**; the desktop `COMP`
section (`12612:8830`) contains no primitives at all, only composed blocks. The desktop
appearance of the six mobile primitives must therefore be read from *instances* inside desktop
page frames. That is the defining constraint of this phase — see `design.md`.

| Component | Mobile definition | Desktop definition |
| :--- | :--- | :--- |
| CTA | `12368:4718` → `10270:2104` / `12368:4719` | none — derive from instance |
| Secondary CTA | `12368:4721` → `12220:2656` / `12368:4722` | none — derive from instance |
| Tag | `12219:1180` → `12219:1164` / `12219:1183`, symbol `10274:2297` | none — derive from instance |
| Title Group | `12219:946` | none — derive from instance |
| Tagline Wrapper | `10270:2179` | none — derive from instance |
| Project card | `10274:2306` | none — derive from instance |
| Artist Card | none — derive from instance | `12592:6786` |
| TeamCard | none — derive from instance | `12610:6405` |
| ServiceCard | none — derive from instance | `12600:7460` |
| Article | mobile occurrence `12220:1670` (News page) | `12612:7696` |

**`Article` added mid-phase (2026-08-01), at the user's direction, after a follow-up audit of
every repeating visual unit in the file turned it up as the one genuinely structured repeating
card (title/tag/date/image) left unbuilt.** Originally scoped out under the assumption that it
required the MDX pipeline; revisited and shipped as a presentational shell instead — same
pattern already established for `ProjectCard` and `ServiceCard` in this same phase (props in,
no MDX or route knowledge, D-C). The real MDX/`CMS` pairing for rendering actual article bodies
remains Phase 4 work; this phase only ships the card shell for a title/excerpt/date/tag/image
teaser, which is exactly what `ProjectCard` already established as an acceptable pattern.

### Explicitly out of scope

| Node | Why |
| :--- | :--- |
| `NAV` `12219:1100`, `12653:5366`, `12653:5259`; `Footer` `12384:4852`, `12635:16158` | Phase 3 |
| `UniversalCTA` `12653:5649`, `NewsletterSignup` `12612:8163`, `CMS` `12610:7361` | Phase 4 — `CMS` is the long-form article *body* renderer that pairs with MDX; `Article` (now in scope) is only the short teaser card, a different node |
| `Tab` `10275:2552`, `Services` `10275:2617`, `Service` `12220:2665`, `Mast` `10275:3101` | Section-level compositions, not primitives — they belong to their page phases |
| `ProjectDetailPage` gallery tiles (Portfolio Details, no dedicated node — plain `<img>` repeated 4× with no other structure) | Not a card — no title/tags/metadata, not registered as a Figma component, belongs to Phase 11's MDX gallery content |

`ServiceCard` is in scope as the user directed, with a caveat: at 1440×647 it is a full-bleed
band rather than a card. This phase ships **the card shell only** — no Services page layout,
no accordion behavior.

## Capabilities

### New Capabilities

- `design-primitives`: The contract later phases rely on — that a fixed set of shared
  primitives exists, that each renders correctly in both locales and at both designed
  breakpoints, that components read design tokens rather than literal values, and that
  `/styleguide` remains a complete regression surface for every primitive variant.

### Modified Capabilities

_None._ `localized-routing` is unchanged — this phase adds no routes and does not alter locale
resolution.

## Impact

| Area | Change |
| :--- | :--- |
| `app/_components/` | Nine new component files (first shared components in the project) |
| `app/_components/INVENTORY.md` | Empty table → nine entries |
| `app/styleguide/page.tsx` | New Primitives section; likely extracted into `app/styleguide/_components/` as the page grows |
| `app/globals.css` | Possible additions to `@theme` only if a primitive consumes a token not yet mapped. No new raw values. |
| `openspec/DECISIONS.md` | New entries for canonical-instance choices and undesigned interaction states |
| Routes | None added or changed |
| Dependencies | None added |

## Verification

The user opens `/styleguide` at 393px and 1440px and confirms every component and every
variant is present in both the English and the `lang="zh"` sections, then compares against the
mobile `COMP` frame (`12219:1582`) and the desktop instances cited in `design.md`.

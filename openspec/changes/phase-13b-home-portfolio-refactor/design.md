## Context

`HomeFeaturedProjects.tsx` (`app/[locale]/_components/HomeFeaturedProjects.tsx`) currently reads
its three cards entirely from `home.ts`'s `featuredProjects.cards`, each a fully-authored object
(`slug`, `dateLabel`, `title`, `description`, `tags: {id, label}[]`, `image`). Every field except
`slug` already exists verbatim in `content/portfolio/{locale}/{slug}.mdx` frontmatter (`dateLabel`,
`title`, `excerpt`, `services`, `image`) — Phase 11 added `slug` specifically so `href` could be
built without a title-matching lookup, but left the rest hand-copied "out of scope for this phase"
(`roadmap.md` → Inherited Work). `getManifest("portfolio")` (`app/_lib/content/index.ts`) is
already the load-bearing source of truth for `/[locale]/portfolio` and its detail routes, with
build-time content-parity enforcement (`ContentParityError`) baked in.

## Goals / Non-Goals

**Goals:**
- One authored copy of each project fact (title, date, image, tags, excerpt), in
  `content/portfolio/`, for every consumer including Home.
- `home.ts` states only what's Home-specific: which slugs appear, in what order.
- Preserve the exact rendered output for the three currently-featured projects, except the one
  identified label-drift fix.

**Non-Goals:**
- No change to `ProjectCard`, the scatter/rotation layout, or section chrome copy
  (`eyebrow`/`heading`/`cta`).
- No change to `/[locale]/portfolio` or portfolio detail pages — they already read the manifest.
- No generalized "featured" flag inside portfolio frontmatter (e.g. `featured: true`) — see
  Decisions for why the slug list stays in `home.ts`.

## Decisions

**The slug list stays in `home.ts`, not a `featured: boolean` frontmatter field on portfolio
entries.** A frontmatter flag can express *whether* a project is featured but not *in what order*
it appears in Home's fixed three-card scatter (each position has its own hard-coded offset/
rotation/width in `HomeFeaturedProjects.tsx` — it is not a generic N-card grid). An ordered array
in `home.ts` expresses both facts in one place and keeps portfolio frontmatter describing only the
project itself, not which other page chooses to surface it — consistent with `content/` being
content, and `home.ts` being this page's presentation config. This is what the user asked for
directly.

**Resolution happens inside `HomeFeaturedProjects.tsx`, not `page.tsx`.** Unlike
`NewsGrid`/`PortfolioGrid` (client components needing manifest data pushed down as props from a
server `page.tsx`), `HomeFeaturedProjects` is itself a server component with no client state — it
already owns its own dictionary read. Converting it to an `async function` and calling
`getManifest("portfolio")` directly keeps all of this section's data-shaping in one file, and
`page.tsx` (which composes five sibling sections) stays a plain list of `<Section locale={locale}
/>` calls with no new plumbing.

**Missing slug throws, matching D002.** `home.ts`'s slug list is resolved the same way
`getEntry`/`getManifest` already resolve any other slug — `.find()` against the fetched
`ContentEntry[]`, and a plain descriptive `Error` (not `ContentParityError`, which is specifically
about EN/ZH parity) if a configured slug has no matching manifest entry for that locale. No
fallback card, no silent drop — a stale slug in `home.ts` (e.g. after a portfolio entry is
renamed) is a build break, not a quietly-shrinking Home page.

**Tag labels resolve through `portfolio.filter.tags[serviceId]`, the dictionary
`PortfolioGrid.tsx` already uses** — not a new lookup table. This is the fix for the "Tour
Planning"/"Global Touring" drift: there is now exactly one place that maps a `ServiceId` to its
display label for Portfolio-sourced tags, and Home inherits it by construction instead of by
copy-paste discipline.

**`tagsFor` in `HomeFeaturedProjects.tsx` changes shape but keeps `serviceTagColor` unchanged** —
color is still fixed per service identity (D089), only the label source moves from
`home.ts`'s per-card `label` string to `portfolio.filter.tags`.

## Risks / Trade-offs

[The EN "Tour Planning" label was possibly an intentional Home-specific shorter phrasing rather
than pure drift] → Checked against `content-matrix.md`: no row gives Home's cards their own tag
label text distinct from the Portfolio filter labels — the matrix's only per-tag label authority
is the Portfolio/Artists filter row ("Global Touring"). Treating it as drift, not a deliberate
variant, is consistent with the matrix outranking hand-authored component copy (D032). Flag this
specific visible change clearly at the review gate.

[`HomeFeaturedProjects` becoming `async` changes it from a synchronous to an async Server
Component] → No behavioral risk — Next.js Server Components support `async function` components
natively (already the pattern in every `page.tsx` on this site); this is a type signature change,
not an architecture change.

[A future edit to `home.ts`'s slug array with a typo’d slug silently breaks the Home build] →
Mitigated by design, not left as a risk: the resolution throws loudly (see Decisions), so this
surfaces at `npm run dev`/`next build`, not in production.

## Migration Plan

Single-commit refactor: update `home.ts` (both locales) and `HomeFeaturedProjects.tsx` together —
they must land atomically since the type shrinks. No content or route migration. Rollback is
reverting the commit.

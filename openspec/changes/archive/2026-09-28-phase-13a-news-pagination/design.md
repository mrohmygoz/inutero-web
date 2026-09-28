## Context

Phase 13 built `NewsGrid` (`app/[locale]/news/_components/NewsGrid.tsx`) as an unpaginated,
client-side-filtered list, explicitly leaving pagination and the newsletter band to this phase
(see the header comment in that file). `Pagination` and `NewsletterSignup` already exist and are
proven on Portfolio and in `/styleguide` respectively — this phase is their reuse, not their
design. The Top News banner is the one genuinely new UI surface, and the one place this phase
must make a call the design doesn't: which article is "featured."

`content-matrix.md` (2026-09-28 update) confirms the banner's purpose and node IDs but shows the
four frames disagreeing on content — EN (both breakpoints) references a story matching none of
the 16 real articles (a placeholder later retired, D098), Mobile TC references the real
`2026-05-13-in-utero-huan-huan-community-tour` story, and Desktop TC is empty. See `proposal.md`
for the resolution.

## Goals / Non-Goals

**Goals:**
- Reuse `Pagination` and `NewsletterSignup` with zero component changes — this phase is a new
  consumer, not new component design.
- Make the featured article for the Top News banner a build-time config value, not a derivation
  or a hardcoded frame transcription, so it can be changed by editing one field.
- Keep `featuredSlug` resolution failures loud (thrown at build time), matching every other
  manifest-lookup contract in the codebase (D002).

**Non-Goals:**
- No admin UI or CMS for picking the featured article — it's a source file edit, same tier of
  change as adding a new MDX entry.
- No "auto-pick newest" fallback logic. A missing or invalid `featuredSlug` is a build error, not
  a silent default — this phase treats it exactly like a broken content-matrix cross-reference.
- Does not touch News Details (`[slug]/page.tsx`) or the grid's filter mechanism, both already
  shipped.
- Desktop TC frame content stays unresolved in Figma — this phase supplies TC copy for the
  banner itself (label/date format) but does not wait on Figma populating that one frame, since
  the `featuredSlug` config makes the frame's own (empty) content irrelevant to what ships.

## Decisions

**Pagination integration mirrors `PortfolioGrid` verbatim.** Same page-size derivation pattern
(Figma gives no page-size guidance for News either — no grid/pagination prototype was found in
the Phase 13 reaction sweep), same reset-to-page-1-on-filter-change behavior, same `Math.ceil`
math. Page size: reuse `PAGE_SIZE = 9` — arbitrary but now consistent site-wide, and unlike
Portfolio's 3-project set, News's 16 articles make the paginator reachable (2 pages) without a
temporary size override, so this phase's own gate can verify page 2 exists and both `Prev`/`Next`
buttons behave.

**`featuredSlug` lives in `app/_lib/i18n/{en,zh}/news.ts`, not `routes.ts` or a new file.**
`news.ts` already holds every other piece of this page's copy; a lone slug field there is
consistent with how `home.ts`'s existing `featuredProjects.cards[].slug` fields work (Phase 11,
and the pattern Phase 13b generalizes for Home's other card fields). Rejected: a new
`content/news/{locale}/_meta.json` — over-engineered for one string, and inconsistent with the
project's "no runtime config files" posture.

**Resolution happens in `page.tsx`, alongside the existing `getManifest("news")` call** — look up
`news.featuredSlug` in the already-fetched manifest array (`entries.find(e => e.slug === slug)`),
not a second `getEntry` call. Throws (a plain `Error`, matching `ContentParityError`'s "loud
build-time failure" contract, not that class itself — this isn't a locale-parity violation) if
the slug isn't found in that locale's manifest, naming the configured slug and the locale.

**Top News banner excludes its own featured article from the grid below it? No — it stays in
both.** Figma's grid section (`12220:1669` etc.) already reads `待補`/superseded per
`content-matrix.md`, so there's no drawn precedent for de-duplication, and hiding an article from
the grid just because it's featured would make "which articles exist" depend on banner state —
more surprising than a harmless duplicate.

**Banner tag reuses `newsFilters`/`newsTagColor`, not a new tag styling.** The featured article's
existing `tags` frontmatter (already validated, already typed as `NewsFilterId[]`) drives the
chip; no new tag copy or color mapping needed. Figma's chip shows a single tag despite some
articles carrying two (D099) — first tag in the array wins, matching how `Article`'s card already
handles a single primary color when multi-tagged (see `newsTagColor` usage in `NewsGrid.tsx`).

## Risks / Trade-offs

[Desktop TC banner frame is empty in Figma, so its exact banner layout is extrapolated from
Desktop EN + Mobile TC rather than measured directly] → Flag as Close tier (not Exact) for the TC
desktop banner specifically; re-verify against Figma if that frame is ever populated.

[`featuredSlug` is per-locale, so EN and TC could in principle feature different articles] →
Intentional flexibility, not a bug, but this phase configures the same slug
(`2026-05-13-in-utero-huan-huan-community-tour`) in both — it exists in both locales' manifests
(content parity is enforced by `listSlugs`) and TC's own frame already features it.

[16-article pagination reaching page 2 changes NewsGrid's previously-verified page-1-only visual
state] → Re-verify page 1 unchanged, then explicitly screenshot page 2 at both breakpoints/both
locales — this is new visible surface, not a passthrough.

## Migration Plan

Additive only — no existing route, component API, or content contract changes shape. Rollback is
reverting the phase's commits; no data migration involved.

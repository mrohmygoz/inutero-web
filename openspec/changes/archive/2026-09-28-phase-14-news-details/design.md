## Context

See proposal.md - Why/What Changes. Node IDs (from `design-inventory.md`): desktop EN
`12612:8828`, desktop TC `12635:20097`, mobile EN `12211:4467`, mobile TC `12368:2669`.
Desktop height 6448px — the tallest page in the file, flagged "likely splits" in the
roadmap, but nearly all of that height is components this project already built for
Portfolio Details (`ShareRail`, `Cms`) and News (`Article`, `NewsletterSignup`, `Tag`).
The only genuinely new surface is the hero + breadcrumb + meta treatment and the
related-posts selection logic.

`ContentEntry.frontmatter` for `news` already carries `tags: NewsFilterId[]`, `image`,
`date`/`dateLabel`, `excerpt` (confirmed against `app/_lib/content/frontmatter.ts`). One
field does need to change: `heroImage` currently exists but `parseOptionalPortfolioString`
forbids it on `news` (throws if present). Portfolio's own hero already reads
`frontmatter.heroImage || frontmatter.image`; News's hero needs the same fallback, so
`heroImage` must become valid-and-optional on both content types rather than
portfolio-only.

## Goals / Non-Goals

**Goals:**
- Ship the designed News Details page at both breakpoints, both locales, matching
  Portfolio Details' fidelity tier (page uses `Cms`/`ShareRail`/`ShareRow` — Close tier,
  not Exact; NAV/Footer/UniversalCTA are the only Exact-tier surfaces per CLAUDE.md).
- Reuse existing components verbatim wherever the design permits it (`ShareRail`, `Cms`,
  `ShareRow`, `Article`, `NewsletterSignup`, `Tag`) rather than building parallel ones.
- Retire `ContentDetail.tsx` once News no longer needs it.

**Non-Goals:**
- No new frontmatter fields — `heroImage` already exists, this phase only widens which
  content types may set it. No other content model change.
- No change to `PortfolioDetail`'s own visual output — only its `ShareRail` import path
  moves.
- Not building a generic "detail page" abstraction over Portfolio and News. The two
  differ in hero shape (image + tag chip vs. Portfolio's square-image + role meta-bar)
  and footer (related-posts grid vs. prev/next), same precedent as `ProjectCard`'s
  `variant` split — reuse the pieces, not the page shell.

## Decisions

**`NewsDetail` is a new page-local component, not a `PortfolioDetail` variant.** The two
detail pages share sub-components (`ShareRail`, `Cms`, `ShareRow`) but differ in hero
composition (Portfolio: square image + role/client/date meta bar; News: full-bleed image +
tag chip, closer to `NewsTopStory`'s hero pattern) and footer (Portfolio: prev/next by slug
order; News: related posts + newsletter band). A shared page-shell component would need as
many branches as it saves — same call made for `ProjectCard` vs. a hypothetical unified
card (INVENTORY: "two page-level designs, never an `lg:` switch").

**Promote `ShareRail` to `app/_components/`.** INVENTORY already flags this: "Promote to
a shared component if News Details reuses it verbatim." It does — same four targets, same
desktop-only/sticky treatment. Move `[locale]/portfolio/[slug]/_components/ShareRail.tsx`
→ `app/_components/ShareRail.tsx`, update `PortfolioDetail.tsx`'s import, add the
INVENTORY row, remove the old one.

**Related posts: derived selection, no design reaction found.** A reaction sweep of all
four News Details frames (mirroring Phase 10's Portfolio sweep, D083–D085) is required
before implementation; if none exists (expected, following that precedent), selection is:
articles sharing at least one tag with the current entry, most-recent first, excluding
the current slug, capped at the frame's drawn card count (read off `get_design_context`,
not assumed) with recency-only fallback when too few share a tag. Record as a DECISIONS.md
entry once measured — this design doc fixes the *rule*, not the *count*, since the count
is a Figma-frame fact this doc must not guess.

**`ContentDetail.tsx` deletion is conditional, not automatic.** Delete it only if News is
its last consumer after this phase (Portfolio Details already moved off it in Phase 11).
Grep for other importers before removing — if none, delete; if the placeholder note turns
out to still be referenced somewhere undiscovered, leave it and flag in the phase report
rather than silently keeping dead code out of caution.

**Tag chip on the hero uses `Tag` (solid variant), matching `Article`/`NewsGrid`'s existing
pattern**, not a bespoke chip — News entries can carry multiple tags (D099), so the hero
renders the chip row the same way `Article` does when more than one applies.

**`heroImage` becomes valid on `news`, reusing Portfolio's exact contract** (optional
string, path under `public/`, falls back to `image` when absent) rather than inventing a
News-specific field or a differently-named one. `parseOptionalPortfolioString` in
`frontmatter.ts` is renamed/generalized to allow both types rather than forked into a
near-duplicate function — the "forbidden on news" branch is deleted for this field only;
`client`/`dateLabel` keep their existing portfolio-only behavior untouched. No article is
required to set it: absent `heroImage` on an existing news entry continues to render its
listing `image` as the hero, so the 16 real articles need no frontmatter edits to stay
correct — a hero-photo edit becomes optional content polish, not a migration.

## Risks / Trade-offs

- [6448px is the tallest page in the file] → Nearly all of it is reused components at
  known heights (Cms body is content-driven, not fixed); only the hero needs true Figma
  measurement. If it still warrants a two-part split, do the hero+breadcrumb pass first,
  verify, then related-posts+newsletter — both sub-phases stay within this one change/session
  since neither introduces new components on its own after `ShareRail`'s promotion.
- [Related posts has no confirmed design reaction] → Mirrors already-accepted precedent
  (Portfolio's D083–D085 derivation). Record the derivation in DECISIONS.md the same way.
- [`ShareRail` promotion touches Portfolio Details, a page already shipped and approved] →
  Import-path-only change, no visual/behavioral diff. Re-verify Portfolio Details in the
  browser after the move as a regression check, not a re-review.

## Open Questions

None — the related-posts card count and any reaction/prototype findings are measured
during implementation (not deferrable *design* decisions; they're Figma facts this doc
can't state without a live MCP call), and get written into DECISIONS.md at that point.

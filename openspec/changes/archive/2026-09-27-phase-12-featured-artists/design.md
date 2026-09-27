# Phase 12 — Featured Artists: Design

## Table of Contents

- [Context](#context)
- [Goals / Non-Goals](#goals--non-goals)
- [Decisions](#decisions)
- [Risks / Trade-offs](#risks--trade-offs)
- [Open Questions](#open-questions)

## Context

See `proposal.md` → *Why*. Two things shape the approach beyond what Portfolio (Phase 10)
already solved:

1. **`ArtistCard` exists but has zero consumers.** Phase 3 built it against a single occurrence
   survey and flagged it "genuinely responsive" after an earlier hardcoded-desktop mistake was
   caught in review. This phase is the first real check of that claim against 8 real records.
2. **The filter/empty-state pattern is not new here.** Portfolio already derived it (D083,
   D085) for the same five service-line tags. Re-deriving it for Artists risks a second,
   silently-different implementation of the same interaction — the actual design work for this
   phase is confirming reuse, not inventing behaviour.

## Goals / Non-Goals

**Goals:**

- `ArtistCard`'s first real consumer, verified against actual bio lengths and photo aspect
  ratios rather than the Figma sample.
- One filter implementation shared in spirit with Portfolio's (same tag ids from
  `serviceAnchors`, same single-select/`All`-default/empty-state behaviour) — extracted to a
  shared piece only if the second occurrence proves it is truly identical, not assumed.
- Artist records living in their own typed module (`app/_lib/artists.ts`), following the
  `team.ts` precedent (Phase 7) rather than MDX — no artist has a detail route.

**Non-Goals:**

- A shared `<FilterableGrid>` abstraction spanning Portfolio and Artists. Two consumers is
  the threshold `SectionHeader` (D057) and `Eyebrow` (D055) both used before generalizing;
  this phase checks whether Artists' grid is actually identical to Portfolio's, and only
  extracts if it is — not speculatively.
- Real English bios. They do not exist in the matrix; AI-generated placeholders ship, flagged
  non-final (proposal.md → Content).
- Any artist detail page or route.

## Decisions

### D-A: Artist data lives in `app/_lib/artists.ts`, not MDX

**Chosen:** A typed array, one object per artist (`name`, `bioEn`, `bioZh`, `services`,
`photo`), following `team.ts`'s shape.

**Alternative rejected:** MDX per artist, mirroring `content/portfolio/`. Rejected because no
artist has a detail route — D002's rationale for MDX ("a detail page with a live route")
does not apply. `team.ts` is the closer precedent: fixed roster, no per-record page, plain
bios.

### D-B: The filter reuses Portfolio's tag ids and copy line verbatim

**Chosen:** Read `serviceAnchors` from `routes.ts` for the five tag ids/labels, and reuse
Portfolio's empty-state line pattern (own localized string, same mechanism).

**Alternative rejected:** A second independent tag list for Artists. The matrix's Featured
Artists filter tags are byte-identical to Portfolio's (`全選／藝人經紀／巡演規劃／行銷宣傳／活動製作`)
— inventing a second source for the same five strings is the exact drift D077 closed for the
Footer's service links.

### D-C: `ArtistCard` ships as-is; any gap found is a finding, not a silent fix

**Chosen:** Treat Phase 3's "genuinely responsive" note as a claim to verify, not re-derive.
If the 8 real bios/photos reveal a real defect (e.g. a bio that overflows the 65px clamp,
or an aspect ratio the component doesn't handle), record it as a decision here and in
`DECISIONS.md` rather than quietly patching around it in the page.

## Risks / Trade-offs

- **[Risk]** 8 real bios may not fit `ArtistCard`'s existing clamp assumptions (Phase 3 only
  validated against Figma's sample text). → **Mitigation:** verify all 8 in the browser at
  both breakpoints before marking done; adjust the clamp value in `ArtistCard.tsx` if needed,
  recorded as a decision, not silently.
- **[Risk]** English bios are AI-generated and could read as over-confident or drift from the
  Chinese meaning. → **Mitigation:** flag them in `content-matrix.md` exactly as Portfolio's
  English project copy is flagged — visibly non-final, easy to find and replace later.
- **[Risk]** Mobile EN (5115px) vs. mobile TC (3416px) height gap for this page is unusually
  large — larger than any other page phase has seen. → **Mitigation:** fetch both mobile
  frames explicitly during implementation rather than assuming one derives from the other;
  a ~1700px gap likely means a genuine structural difference (e.g. card count per row, or a
  reflow), not just shorter copy.

## Open Questions

None — the filter/empty-state approach is settled by reuse (D-B), and the data-shape question
is settled by the `team.ts` precedent (D-A). Any real per-card defect `ArtistCard` reveals
(D-C) gets resolved during implementation and recorded, not deferred.

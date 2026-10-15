## Context

See proposal.md for motivation. Key constraint this design has to work around: **the
canonical Figma file (`zSq5F5v3UrVAdIjuSipe3H`) draws no version of this interaction.** The
Services section's photo slot (node `12210:2383`, inside `12210:2346`) is a single empty
frame with no children and no per-item image variants, confirmed via `get_metadata`. No
`ON_HOVER` reaction exists anywhere in that section's node tree. So unlike every other phase
in this project, there is no drawn frame to pixel-match — this phase implements a behavior
the user specified directly, pointing at two non-canonical references:

1. A Figma **prototype** link (`node-id=12405-6998`) on the same file, as the behavioral spec.
2. A **Figma Make** file (`fileKey myqsxGwnrcNHEdsE2SFZXk`) whose `src/app/App.tsx` is a full
   working reference implementation of the hover/crossfade mechanic, including the four
   candidate images (`imgSvc1`–`imgSvc4`).

This is the same category of gap as D106 (NAV active-route styling — "no dedicated Figma
variant found within budget, built from the user's own spec").

## Goals / Non-Goals

**Goals:**
- Desktop-only hover changes the Services background photo per row, falling back to the open
  row when the pointer is not over the accordion.
- Reuse the Figma Make reference's state model (`openIdx` / `hoverIdx` / `displayIdx = hoverIdx
  ?? openIdx`) and crossfade mechanic (opacity, 500ms ease) rather than inventing a new one,
  since it is the only concrete spec that exists for this behavior.
- Ship with four real photos, one per service, sourced from the Figma Make file's own asset
  set — not AI-generated placeholders, not a single repeated image.

**Non-Goals:**
- Mobile/tablet hover. Below `lg:` (1024px) nothing changes — no pointer-hover concept exists
  on touch, and the user explicitly scoped this to "desktop mode".
- Recoloring or re-curating the four images beyond what's needed to ship them (see Open
  Questions — duotone consistency is flagged, not silently resolved here).
- Any change to click/open behavior, accordion panel mechanics, copy, or i18n.

## Decisions

**State model**: add `hoverIndex: number | null` alongside the existing `openIndex` in
`HomeServices.tsx`, scoped to the desktop branch only (the `hidden lg:block` subtree). Compute
`displayIndex = hoverIndex ?? openIndex`. This mirrors the Make reference's
`svcHoverIdx`/`svcOpenIdx`/`svcDisplayIdx` exactly — no reason to diverge from the only spec
that exists.

**Why not drive this off `:hover` in CSS alone**: the fallback-to-open-row behavior (Non-Goals
aside, this *is* a goal) requires knowing in JS whether any row is currently hovered, so the
background can fall back correctly when the pointer leaves — a pure-CSS `:hover` selector per
row can't express "none of these four are hovered, show the open one instead" without either
JS state or four `:not(:hover)` siblings coordinating, which is more fragile than one `onMouse
Enter`/`onMouseLeave` pair per row already next to the existing `onClick`.

**Image rendering**: replace the single `<Image>` with four, absolutely stacked (same
positioning box the current single image uses), each `opacity: displayIndex === i ? 1 : 0` with
a 500ms ease transition — matching the Make reference's cross-fade, not the mount/unmount
pattern this file already uses for the accordion open/close glyph cross-fade (that pattern
swaps 2 fixed states; this is N images keyed by index, closer to a simple opacity map).

**Image sourcing**: the four photos are pulled verbatim from the Figma Make file's asset set
(`imgSvc1`→Artist Management, `imgSvc2`→Booking & Tour, `imgSvc3`→PR & Marketing,
`imgSvc4`→Event Production), per explicit user instruction ("use what figma make uses"). These
are real client event photography already duotone-treated, not AI-generated — verified by
inspection during this session. The item→image pairing is kept exactly as the Make file wrote
it; no re-curation.

**Alternatives considered**: hand-picking 4 different photos from the project's own
`public/images/` (portfolio/news/artists), same precedent as phase 16b's substitute-image
call. Rejected once the user confirmed the Make file's own images should be reused directly —
no need to re-curate when a matching real asset set already exists.

## Risks / Trade-offs

- **The four images are not color-consistent with each other** (teal/green, blue, purple,
  orange duotones — see Open Questions) and the green one is close to, but not identical to,
  the current `services.jpg` treatment. → Flagged as an explicit open question rather than
  silently normalized; shipping as-is is the simpler default if the user doesn't ask for
  recoloring.
- **No drawn Figma frame to verify against** — fidelity here is "does it match the Make
  reference's behavior" not "does it match a screenshot". → Verification in tasks.md is
  behavioral (hover each row, confirm crossfade + fallback), not pixel comparison.
- **Scratch-downloaded image copies from this session may be compressed/resized** by the MCP
  resource pipeline, not the Make file's original bytes. → tasks.md re-fetches at full
  resolution during apply rather than reusing the session's thumbnail copies.

## Open Questions

- Should the four images be recolored into one consistent duotone (matching the current
  `services.jpg` treatment) before shipping, or is shipping them in their original, varied
  color treatments (as the Make file has them) acceptable for this phase? Deferred to the
  user at apply time — does not change the interaction model or task breakdown either way.

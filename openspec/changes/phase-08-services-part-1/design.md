# Phase 8 — Design

## Table of Contents

- [Context](#context)
- [Goals / Non-Goals](#goals--non-goals)
- [Decisions](#decisions)
- [Risks / Trade-offs](#risks--trade-offs)
- [Open Questions](#open-questions)

## Context

See `proposal.md` → *Why*. Three things about this phase's starting state shape the approach:

1. **`ServiceCard` has never had a real consumer.** It shipped in Phase 2 and was corrected
   during the Phase 3 review against fresh Figma output, but every check since has been against
   `/styleguide`'s synthetic sample. This phase is the first time the real copy — four
   descriptions of very different lengths, twelve feature rows, four photographs — runs through
   it. The Phase 7 precedent is `TeamCard`: real content was allowed to clamp and truncate inside
   the card's own fixed box rather than the box being reshaped to fit.
2. **The desktop card is full-bleed.** Each of the four desktop instances is 1440×647 at x=0 —
   the card is the section, not an item in a grid. Mobile is the same: four 393-wide cards stacked
   with no gutter and no gap. So `ServicesList` is a plain vertical stack at both designed
   breakpoints, which makes the tablet question much smaller than it was for the Home project-card
   row or the Our Story team scroller.
3. **The page ends mid-design at the end of this phase.** Hero → cards → Footer, with the FAQ and
   the green CTA missing. That is the agreed seam, not a defect, and the review gate has to be
   told so plainly.

## Goals / Non-Goals

**Goals:**

- The hero and the four cards at 393px and 1440px in both locales, to the **Close** fidelity tier
  (≤4px drift). Neither section is on the Exact list.
- Prove `ServiceCard` survives real content without being reshaped, or record precisely what it
  needed if it did not.
- Leave Phase 9 a clean seam: `page.tsx` composes sections in order, so Phase 9 appends two lines.

**Non-Goals:**

- Re-designing `ServiceCard`. A prop may be added; the card's own layout is not up for
  renegotiation this phase.
- Anchor `id`s on the four sections. See `proposal.md` → *Explicitly out of scope*.
- Any FAQ or accordion behavior, including the disclosure primitive Phase 9 will need.

## Decisions

### D-A — `ServicesList` is a dumb stack; the four services are data

The section component maps `dict.services.items` over `ServiceCard` and adds nothing but vertical
rhythm. The copy lives in `app/_lib/i18n/{en,zh}/services.ts` as a typed array, following the
Phase 7b module split with an explicit `typeof enServices` annotation on the `zh` module (D060).

*Alternative considered:* four hand-written `<ServiceCard>` calls with inline strings, as the
Home services summary did. Rejected — that section has four short cards; this one has four
descriptions plus twelve feature rows per locale, which is a table, and a table read from a
dictionary is the only version a translator can check against the matrix.

### D-B — Tablet (768–1439px) resolves by snapping at the `lg` breakpoint, with no intermediate layout

`ServiceCard` already carries its own `lg:` switch between the mobile and desktop trees (D059's
two-subtree pattern). `ServicesList` stacks at every width. So there is genuinely nothing to
interpolate: below 1024px every viewport gets the mobile card at full width; at and above, the
desktop card at full width. The hero follows the same rule.

This is a **derived** behavior with no Figma reference, and it is being recorded rather than
silently invented, per CLAUDE.md → *Responsive*. It is also the trivial case the rule exempts
from stopping to ask: no grid changes column count, no scroller changes axis. Phase F audits it.

### D-C — The service card CTA target is `/[locale]/contact`

`ServiceCard` requires `ctaHref`, the Figma frames draw the button, and neither the design nor
the content matrix says where it goes. Every plausible destination is the contact page: there are
no per-service detail routes in `routes.md`, and Phase 9's FAQ answer #5 explicitly tells readers
to use the Contact section. All four cards therefore point at `localizedHref("contact", locale)`.

The **label** is not decided here — it is drawn in the frames and will be read from
`get_design_context` at apply time, in both locales, like any other string the matrix omits.

*Alternative considered:* making `ctaHref` optional and dropping the button. Rejected — the
button is in the design at both breakpoints, and the phase would be shipping less than the frame.

### D-D — The hero photograph is `next/image` with explicit dimensions, not a CSS background

Desktop is a 1440×690 block, mobile 393×310 — a real photograph at a real aspect ratio, which is
exactly what `next/image` optimizes and what a `background-image` would not. Consistent with
`AboutHero` from Phase 7. The two breakpoints may or may not be the same asset; the export at
apply time decides that, and if they differ both are exported rather than one being upscaled.

### D-E — Content that overflows `ServiceCard` clamps; the card does not grow

Following the Phase 7 `TeamCard` precedent. If a real description or feature row exceeds the box
the design draws, it clamps or truncates inside the box. Two exceptions where the card *must*
grow instead, because the Figma frames themselves show it growing:

- The four mobile cards are already four different heights (955 / 871 / 931 / 895px) — mobile
  height is content-driven in the design, so the mobile card must not be height-fixed.
- The desktop card is a fixed 647px in all four instances **and in both locales**, so desktop is
  the constrained one.

If TC copy cannot be made to fit 647px at desktop without a type-size change, that is a finding to
report at the gate, not to solve by quietly resizing the card.

### D-F — `services` joins `darkNavRoutes` rather than the page passing a prop

Mechanical, already settled by D052 — `Nav` renders in `[locale]/layout.tsx`, above the page, so a
page cannot hand it a theme. Noted only because it is the one edit this phase makes to a shared
file.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| `ServiceCard` was only ever verified against a synthetic sample; real copy may break its layout | Verify each of the four cards individually at both breakpoints and both locales, not one sample card. If a prop is genuinely needed, add it and update `INVENTORY.md` — but treat a card-layout rewrite as a scope signal and report it. |
| TC descriptions and feature rows are a different type scale and may overflow the fixed 647px desktop card | D-E — clamp, and if clamping loses meaning, report at the gate rather than resizing. |
| The page visibly ends at the Footer with no CTA, and a reviewer may read that as a bug | Stated in `proposal.md` → *User verifies* and repeated in the phase's hand-off report. |
| Figma text layer names on this page are stale copy from News and Portfolio | Resolved in `proposal.md` → *Copy conflicts*; the matrix is the source, and live text is still re-read via `get_design_context` rather than trusted from a layer name. |
| Five service photographs is the largest asset export any phase has done | Export into `public/images/services/` with `download_assets`, check the resulting file sizes, and use `next/image` throughout so Vercel serves optimized variants. |

## Open Questions

| Question | Safe to defer because |
| :--- | :--- |
| Should the Footer's five Services sub-links eventually deep-link to anchors on this page? | It changes `Footer.tsx`, not this phase's sections, and it cannot be answered until Phase 9 has built the remaining section. Raise it at the Phase 9 gate. |

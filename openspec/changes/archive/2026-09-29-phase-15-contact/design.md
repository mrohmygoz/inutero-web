## Context

Contact is the shortest page in the file — 1734px desktop (`design-inventory.md`), well
under the ~5000px split threshold. It has no dynamic route, no MDX, no filter/pagination
mechanics — the only genuinely open question is the form's submit target, which
`design-inventory.md` and `roadmap.md` both flag as unresolved going into this phase. See
`proposal.md` for full scope.

## Goals / Non-Goals

**Goals:**
- Render the Contact page visually complete at 393px and 1440px, both locales, from
  `content-matrix.md` copy and the four Figma frames.
- Reuse existing primitives (`Eyebrow`, `NewsletterSignup`) rather than inventing new ones
  where the design doesn't require it.

**Non-Goals:**
- No working form submission. No Route Handler, no `action`, no client-side validation
  beyond whatever HTML5 attributes the inert markup naturally carries.
- No legal pages behind the department email links (they are `mailto:` links, not routes).

## Decisions

**Form ships inert, submit target deferred — user decision, 2026-09-29.** `design-inventory.md`
and `roadmap.md` both carried this as an open question ("Route Handler that emails, or a
third-party form service?"). Asked directly; the answer was to ship the view only and defer
the decision. This follows the precedent already set by `NewsletterSignup` (D029) and the
Footer newsletter block: inert markup, no `<form>` element, no `type="submit"` button, so
there is no live defect (a formless GET reload) shipped in its place.

**How to apply:** whoever wires the real submit target later picks Route Handler vs.
third-party service *then* — this phase does not narrow that choice, it just doesn't build
either. Recorded in `openspec/DECISIONS.md` as the next decision number, and the "Still Open"
row in `roadmap.md` is updated to point at whichever future phase claims it (likely Phase F,
per that file's own convention for undated follow-ups) rather than closed outright.

**Department contact rows render as `mailto:` links, not a routed contact-picker.** The
matrix gives four fixed department emails (`content-matrix.md` → Contact). This is the
simplest structure consistent with the frames and needs no new component.

**Tablet (768–1439px) band:** the four frames give no tablet reference (D005 applies as
always). Given the page's content is a single-column stack at both designed widths (no grid
that needs a 3-up→2-up derivation), the mobile stacked layout is expected to hold up to
1024px and the desktop layout engage at `lg` (1024px), consistent with every prior phase's
default derivation (D009/D015/D021). This will be confirmed against the actual frame
geometry during implementation; if the derivation turns out non-trivial, implementation
stops and asks per D005 rather than deciding silently here.

## Risks / Trade-offs

- **Reviewer may expect a working form.** Mitigated by being explicit in the phase report and
  in `roadmap.md`/`DECISIONS.md` that submission is intentionally not built.
- **Podcast icon remains a placeholder glyph** (per D032 conflict #2) — inherited, not
  reintroduced by this phase.

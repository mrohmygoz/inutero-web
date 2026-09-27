# Phase 9 — Services part 2: design

## Context

See `proposal.md` → *Why*. The relevant state this design has to work against:

- `ServicesHero` and `ServicesList` already own the page down to y=4050 (desktop EN). Both
  sections this phase adds append below them; neither existing section is touched except for
  anchor `id`s.
- `UniversalCTA` is built, verified, and already has a Home call site. This phase is a second
  call site, not a second implementation.
- **The site already has one accordion.** `HomeServices` (Phase 6, D041) implements
  one-open-at-a-time with a `grid-template-rows: 0fr → 1fr` transition, `inert` closed panels,
  and a cross-fade between two exported icon SVGs. That prior art constrains this design more
  than the Figma frames do.
- Phase 8's `page.tsx` carries a comment naming this phase's two nodes and their order. It is
  removed as part of the work, not left to rot.

## Goals / Non-Goals

**Goals:**

- The FAQ reads and behaves as the frames draw it, at both designed breakpoints and in both
  locales, without inventing a second accordion mechanism.
- The Footer's Services links become useful, with the anchor targets living where the sections
  are rather than in a lookup table.
- Every choice Figma does not make is recorded here and mirrored into `DECISIONS.md`.

**Non-Goals:**

- A general-purpose `Accordion` component. See D-B.
- Any motion design beyond matching what D041 already established.
- Deciding the FAQ's sixth answer. It is the client's to supply.

## Decisions

### D-A — The FAQ is an interactive accordion; the frames say so, the timing is inherited

**Decision:** Five rows, exactly one open, row 1 open on load. Each row header is a real
`<button>` with `aria-expanded` / `aria-controls`; the panel is the promoted `AccordionPanel`.
Open/close reuses D041's 300ms ease-out.

The frames settle the *behaviour* on their own, in all four: row 1 renders an answer paragraph
and a `×` glyph, rows 2–5 render no paragraph and a `+` glyph. That is a single-open accordion
drawn in its default state, not five static rows.

They do **not** settle the *timing*. Rather than derive a second one, this reuses the duration
and easing D041 measured off the Home component set's `SMART_ANIMATE` reactions — one accordion
motion for the whole site is the right answer even if these frames carried a different number.

**Phase 6's lesson applies and is a task, not an assumption:** D041 was initially wrong because
the first sweep only checked `get_motion_context` and the frame roots, missing reactions that
lived on the component set. This phase sweeps `node.reactions` on the FAQ nodes **before**
building, and if they specify something other than 300ms ease-out, the frames win and this
decision is amended.

*Alternative considered:* static rows with all five answers visible. Rejected — it contradicts
four frames and would make the desktop section roughly three times its drawn height.

### D-B — Only the panel mechanics are promoted; the two accordions share no design

**Decision:** `AccordionPanel` — the headless `grid-rows-[0fr]`/`grid-rows-[1fr]` wrapper with
its `inert`, `role="region"` and `aria-labelledby` wiring — moves to `app/_components/` and gains
an `INVENTORY.md` entry. `HomeServices` imports it instead of defining it. Nothing else moves:
not `AccordionIcon`, not the open/closed row borders, not the `openIndex` state, not the
triggers.

D041 pre-committed that a second consumer with a verified design is the bar for promoting this.
The bar is met, but the audit of *what* to promote finds the overlap is narrow:

| Aspect | `HomeServices` | Services FAQ |
| :--- | :--- | :--- |
| Surface | Dark (`basic-accent`) | Light |
| Icon side | Left of the label | Right, at the row's far edge |
| Icon colour | Neon `+` and `×` | Black `+`, green `×` |
| Label type | Display, uppercase | Body |
| Row rules | Variable-weight borders, open row heavier | Uniform hairline |
| Desktop layout | Accordion in a right-hand column under a heading | Two-column split, heading beside the rows |
| Panel mechanics | `grid-rows` 0fr→1fr, inert, 300ms ease-out | Identical |

One row of that table is shared. Promoting the whole component would need tone, icon-position,
type-scale and border-weight props to make two call sites fit — which is precisely the
`TitleGroup` failure mode D055 and D057 warn about. Promoting nothing would duplicate ~20 lines
of a11y-sensitive wiring that is easy to get subtly wrong twice.

*Alternatives considered and rejected:* a full shared `Accordion` (four props, two consumers);
keeping `ServicesFaq` entirely page-local (follows D057's numeric gate, but D057 was about a
*visual* shell with nine candidate sites, and this is a11y wiring with a pre-committed promotion
clause).

### D-C — Five FAQ items ship; the sixth is omitted, not placeheld

**Decision:** `services.faq.items` has five entries in both locale modules. No sixth row, no
`待補` string in the UI.

The matrix's sixth row is unwritten copy, and Figma draws five rows. Rendering a visible
placeholder would ship obviously-unfinished text to a marketing site and add a row the design
does not have. Adding the sixth later is a data append with no layout consequence, which is why
deferring costs nothing.

The obligation stays where it already lives — `content-matrix.md`'s outstanding-copy table — and
is **not** added to the roadmap's Inherited Work, which is for work with a known owning phase.
This one is blocked on the client, not on a phase.

### D-D — The service anchors are English ids on the cards; the Footer links to them

**Decision:** `ServicesList` gives each card an `id` matching the service line, in English in
both locales (`artist-management`, `international-booking`, `pr-marketing`,
`event-production`) — the same rule `routes.md` applies to slugs. `Footer.tsx` repoints its four
Services sub-links from `/services` to `/{locale}/services#{id}`.

The ids are derived from the existing `serviceLabelKeys` in `Footer.tsx` rather than invented
separately, so the two lists cannot drift.

**One thing to verify rather than assume:** `Nav` on this page is `absolute inset-x-0 top-0`, not
`fixed` or `sticky` (D052), so an anchor target should not land under it. If it does at either
breakpoint, the fix is `scroll-margin-top` on the card equal to the reserved NAV height D070
already names — not a change to `Nav`.

*Alternative considered:* leaving the links whole-page (D-G's status quo). Rejected by the user
at this gate; the page is now complete, which was the stated precondition.

### D-E — The FAQ icons are new exports, not the Home SVGs recoloured

**Decision:** Export this section's two glyphs from the FAQ frames with `download_assets` into
`public/icons/`, under names that distinguish them from the Home pair.

`accordion-open.svg` and `accordion-close.svg` are both hardcoded `#38FF88` — correct on Home's
dark surface, wrong here, where the frames draw a **black** `+` and a **green** `×`. `currentColor`
is not a way out: the two glyphs are different colours *in the same row set*, so one `text-*`
class cannot serve both.

D041's finding still holds and is not re-litigated: the `+` and `×` are different shapes, not one
glyph rotated, so both are exported and cross-faded rather than one being rotated 45°.

### D-F — Tablet snaps at `lg`, consistent with D072

**Decision:** Below 1024px the FAQ uses the mobile tree; at and above it, the desktop tree.
Nothing in between.

This is **Derived (D005)** and is the trivial case the "stop and ask" rule exempts: the only
structural difference between the two designs is a two-column split becoming a stack, which is
what `lg:` is for. It matches the call D072 already made for the rest of this page, so the whole
page behaves one way across the band rather than two.

`UniversalCTA` is untouched here — it already has its own responsive treatment.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| The `node.reactions` sweep finds timing that contradicts D041, after the build assumed it | Sweep **first** (task 1), before writing the component. If it contradicts, amend D-A and record the correction in `DECISIONS.md` — the frames win. |
| Promoting `AccordionPanel` regresses Home, whose accordion is already approved | The promotion must be a pure move: identical props, identical classes. Re-verify Home at both breakpoints and both locales after the move, not just Services. A visual diff on Home is a failure, not an improvement. |
| TC answers are a different type scale and the open row may not match the drawn 660.68px desktop / 793.25px mobile | Measure both locales against their own frame, never EN against TC. Per D-E of Phase 8, content clamps inside a fixed box — but here the FAQ panel height is content-driven in the design, so a mismatch is a spacing bug to fix, not copy to clamp. |
| The Figma EN question text is stale — desktop rows 3 and 4 are near-duplicates and row 4 is a question the sheet deleted | Already resolved: the matrix is the source (D032). The mobile TC frame independently renders the matrix's five TC questions verbatim, which corroborates the final set. Do not reconcile against the EN layer names. |
| Anchor links change `Footer.tsx`, which every page renders | The change is four `href` strings. Verify the Footer still renders correctly on a page that is *not* Services — an anchor into another route must navigate, not just scroll. |
| Adding a fifth-plus link to the mobile menu would invalidate Phase 7c's clamp minima | Not triggered: this phase adds no entry to `routes.ts`'s `routes` array. Stated so the next phase that does touch it inherits the obligation cleanly (roadmap → Inherited Work). |

## Open Questions

| Question | Safe to defer because |
| :--- | :--- |
| Does the FAQ section need its own anchor `id` for a future "jump to FAQ" link? | Nothing links to it today, and adding an `id` later is a one-line change with no layout effect. |
| Should the open FAQ row scroll into view when it is opened near the fold? | Not drawn, not prototyped, and the panels are short. Phase F's a11y pass is the right place to judge it against the rest of the site's motion. |

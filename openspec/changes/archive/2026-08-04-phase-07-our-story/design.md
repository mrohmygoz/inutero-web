## Context

See `proposal.md` — *Why*. Four sections onto an existing route.

Three things make this more than straightforward implementation:

1. **The delivered team roster does not match the drawn one.** Figma draws 5 identical Lorem
   ipsum cards at desktop and 2 + a five-dot indicator at mobile. The client delivered nine real
   members. The card component exists; the collection around it does not, and neither breakpoint's
   drawn arrangement tells us what nine cards do.
2. **The desktop hero frame reports no children.** `get_metadata` on `12573:6372` returns a bare
   1440×960 frame, yet the render clearly shows a headline, an eyebrow, and a body block. Either
   the frame is flattened or its subtree is suppressed in metadata. This must be resolved with
   `get_design_context` before the hero is built — not guessed at from the screenshot.
3. **Two matrix rows are being overridden**, one in each direction. D032 makes the matrix
   authoritative for copy; this phase departs from it for the hero headline and follows it against
   Figma for the Intro body. Both need recording so a later phase does not "fix" either back.

`TeamCard`, `TitleGroup`, `UniversalCTA`, `Nav`, and `Footer` all exist. This phase composes them
and adds no shared component.

## Goals / Non-Goals

**Goals:**

- One responsive tree per section, not a desktop copy and a mobile copy, except where the two
  Figma frames genuinely disagree in structure (the Intro's image position; the team row's
  indicator).
- The team roster is data, not markup — one typed table drives both locales and both breakpoints,
  so the count is free to change again when the client sends a tenth photo.
- Every departure from the design or the matrix is recorded in `openspec/DECISIONS.md` and
  reported as derived, never as design-matching.

**Non-Goals:**

- Changing `TeamCard`'s visual design. If the real bios do not fit its drawn box, the box wins and
  the text truncates or clamps — a redesign is not this phase.
- Any interaction the design does not draw beyond the team row's paging.
- Reconciling the Intro's removed paragraph with the hero's grown one. They are separate calls.

## Decisions

### D-A — The team roster is a typed table in `app/_lib/i18n`, not parsed filenames

The delivered files encode `{name} / {job title} / {short description}` in their names, using
inconsistent separators (`／` full-width slash on some, ` : ` on others), mixed extensions
(`.jpg`, `.JPG`, `.jpeg`, `.JPEG`), and CJK characters throughout.

**Decision:** rename each file to an ASCII slug and hand-transcribe its three fields into a typed
`TeamMember[]` beside the other i18n content. Each member carries a Latin name, a Chinese name, an
English title, a Chinese title, and the Chinese description.

**Why not parse at build time:** a filename is not a schema. The separators already disagree
across nine files, CJK in a URL path is percent-encoded by `next/image` and unreadable in devtools,
and a typo in a filename would become a silent content bug rather than a type error. Transcribing
once costs minutes and gives the compiler something to check.

**Locale handling** (user decision, see proposal): EN renders the Latin name, the English title,
and the Chinese description **verbatim** — descriptions were never written in English. Where a
member has no English title (`冬季限定`), the Chinese title renders in both locales. There is
precedent for locale-invariant strings on this site (D030, `UniversalCTA`).

### D-B — The team row is a scroll-snap carousel at both breakpoints; the dots are mobile-only

Both frames already overflow: desktop's fifth card starts at x=1264 and runs past the 1440px edge;
mobile shows two of a wider row. Nine members make the overflow unavoidable rather than incidental.

**Decision:** one horizontally scrollable, scroll-snapped row at every width. The mobile frame's
five-dot indicator becomes **one dot per member** — Figma drew five dots against a five-card
desktop roster, which reads as per-member, not per-page — and the dots track scroll position. The
desktop frame draws no indicator, so none renders above the mobile breakpoint.

This is the only reason `AboutTeam` is a client component. The dots observe the scrolled row; the
row itself is native scrolling, not a JS-driven track.

**Alternative rejected:** a paged carousel with prev/next controls. Nothing in either frame draws
one, and native scroll-snap keeps the section usable with a trackpad, a touch drag, and a keyboard
without shipping an interaction the design never specified.

**Derived (D005):** the scroll-snap behaviour, the dot count at nine members, and the dot's active
state. No frame shows a second scroll position.

### D-C — The hero body grows; the hero height is derived

The matrix's founder story is roughly four times the text Figma sets in the hero's body block. The
block is bottom-right in both locales at desktop and below the headline at mobile.

**Decision:** keep the block's position, alignment, and type treatment from Figma; let its height
grow with the real copy, and let the hero section grow with it rather than clipping or scrolling
the text. The drawn 960px / 665px heights become minimums, not fixed values.

**Alternative rejected:** shrinking the type to fit 960px. That would break the type scale for one
block on one page, and the scale is token-driven.

### D-D — `AboutIntro` ships heading, body paragraph, and photograph, as drawn (matrix override)

The matrix marks the Intro body `REMOVE`, citing node `12212:6370` — but that ID resolves to the
whole `Intro` instance, not a paragraph, and `get_design_context` on the live desktop (`12573:6107`)
and mobile (`12212:6370`) frames shows the exact paragraph still drawn in full, word-for-word
against the matrix's own transcription of the text it thought was being dropped. The annotation is
either mis-cited or stale against the current file.

**Decision (reversed from the original draft, user confirmed 2026-08-03):** build the paragraph as
drawn, in both locales. Desktop keeps its two-column arrangement (heading full-width on top; text
bottom-left, photo bottom-right); mobile stacks photo → paragraph, per the mobile frame's own
order. No column collapses.

**Why:** live design context is stronger evidence than a node ID that does not resolve to the
claimed element. This is a correction of the initial proposal, not a new derivation — the section
matches Figma at both breakpoints, full stop.

### D-E — `AboutHowWeWork` is static, despite the `ServicesAccordion` layer name

`12610:6264` is named `ServicesAccordion` and its children are named `Button`, but all three
points render open, there is no variant set, and no icon affordance is drawn. The name is a copy of
the Home section's layer tree, not a specification.

**Decision:** static 3-up at desktop, static stack at mobile. Before building, confirm with a
`reactions` check on the three `Button` nodes — Phase 6's addendum established that
`get_motion_context` alone is not sufficient evidence of "no interaction", and that lesson is the
reason this check is a task line rather than an assumption.

### D-F — Tablet (768–1439px) is derived, per section

| Section | 768–1439px |
| :--- | :--- |
| Hero | Desktop arrangement, fluid. The headline is the only risk — it is set very large and must be allowed to wrap rather than overflow. |
| Intro | Desktop's side-by-side text/photo holds down to the point the photo would drop below its drawn width, then stacks to the mobile arrangement (photo above text) at the existing `lg` boundary. |
| How We Work | 3-up collapses to the mobile stack at `lg`, not to a 2-up. A 2-up leaves an orphan third point. |
| Team | Unchanged — the row scrolls at every width, so it needs no breakpoint rule. The dots appear below `lg`. |

`lg` (1024px) is the existing site-wide collapse boundary (D-E in `phase-03-shell`). No new
breakpoint is introduced.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| The desktop hero frame returns no children, so its internals are unknown at proposal time. If it is a flattened raster, the headline cannot be live text. | Resolve with `get_design_context` **before** writing `AboutHero`; the mobile hero (`12212:6345`) is a real subtree and gives the same lockup. If desktop is flattened, build from the mobile structure at desktop scale and record it. |
| Nine real bios of uneven length in a fixed-width 284px card will not all fill it evenly. | `TeamCard` is fixed-width by design (INVENTORY). Clamp the description and accept ragged card content; do not re-open the card's design this phase. |
| Overriding the matrix on the hero headline sets a precedent that could erode D032. | The override is narrow, recorded with its evidence (both TC frames), and stated as an exception rather than a new rule. |
| The delivered photos are up to 4.6MB and unoptimised. | Serve through `next/image`; do not hand-optimise. If the largest still hurts, note it for the polish phase rather than re-encoding assets mid-phase. |
| `AboutTeam` becoming a client component pulls the roster data into the client bundle. | The roster is nine short records — acceptable. Keep the section boundary tight so the rest of the page stays server-rendered. |

## Open Questions

- Whether a tenth-plus member arrives before launch. The typed table absorbs it without a code
  change, so this does not block the phase.
- Whether the mobile dots should page rather than track per-member once the roster grows past
  nine. Revisit if it does.

# Phase 5 — Design

## Context

See `proposal.md` — Why. What shapes the approach here is that Home's Hero is the first section
in the deck that is not a flow layout. Desktop draws three photographs at overlapping absolute
positions with four display words threaded between and around them; mobile draws one full-bleed
photo with the words on top and the green copy panel stacked beneath. The two frames share copy
and nothing else. The Intro is milder but has the same shape of problem: a display heading with
an image overlapping its lower-right corner on desktop, and a clean stack on mobile.

Three prior decisions constrain this phase. D009 switches the token set from mobile to desktop
at 1024px. D021 collapses the NAV to the mobile menu at 1024px. D005 says behavior between
768px and 1439px is derived and must be asked about, not invented. D032 makes
`content-matrix.md` the copy source over the Figma text layers.

## Goals / Non-Goals

**Goals:**

- Both designed breakpoints of both sections, both locales, matching their frames.
- A layout strategy for the collage that is honest about which parts have a design behind them.
- Real exported photography, so the approval gate is a review of the actual page.

**Non-Goals:**

- Any shared component. Both sections have exactly one consumer.
- Scroll-linked or entrance motion. The frames are static; motion is Derived tier and nothing
  in the design specifies it.
- Making Home's remaining three sections render. Phase 6 owns them.

## Decisions

### D-A — Hero and Intro are page-local, not shared components

They live in `app/[locale]/_components/`, not `app/_components/`, and get no `INVENTORY.md`
entry. Each has one consumer and no variant surface beyond locale, which the page already has
from route params.

**Alternative considered:** promoting them to `app/_components/` "for consistency" with the
shared blocks. Rejected on the `TaglineWrapper` precedent — a Phase 2 primitive that was
extracted, found to have a single consumer, and deleted again in Phase 3. `INVENTORY.md`
earns its keep by listing things a later phase would otherwise rebuild; a Home-only hero is
not that.

### D-B — The mobile layout holds until 1440px; the desktop collage engages only at 1440px+

Resolved with the user. The desktop Hero is positioned against a fixed 1440px canvas and does
not interpolate: shrinking it changes which photo covers which word. Rather than invent an
in-between composition, the stacked layout runs from 393px to 1439px and the collage engages at
`min-width: 1440px`.

**Alternatives considered:** switching at 1024px and scaling the collage in relative units
(rejected — the overlaps and the headline's negative space become unverifiable against any
frame, which is exactly the "reporting derived behavior as matching the design" failure CLAUDE.md
forbids); rendering a fixed centered 1440px canvas below 1440px (rejected — introduces
horizontal overflow).

**The consequence must be built for, not discovered.** Between 1024px and 1440px the page runs
the *mobile* layout under the *desktop* token set (D009) and the *desktop* NAV bar (D021). The
stacked layout therefore cannot be built against 393px-derived fixed pixel widths — it must be
fluid, so the same tree survives a 1280px viewport at desktop type sizes. This is a real
verification target, not a footnote; see Risks.

### D-C — The desktop collage is absolutely positioned inside one aspect-locked container

At 1440px+ the hero is a single relatively-positioned block whose height comes from the frame,
with the photos and headline words placed against it. Trying to express the composition as
flex/grid would mean reverse-engineering an intent the design does not have — the words and
photos are placed, not flowed. Stacking order (which photo sits above which word) is read from
the Figma layer order and pinned explicitly rather than left to source order.

The mobile tree stays a normal flow column. These are two sibling subtrees under one component,
not one tree repositioned — the same treatment `ServiceCard` and `UniversalCTA` already use.

### D-D — The ZH Intro heading wraps naturally at the designed type size

Resolved with the user. `根植本土，前進世界。` is nine characters against the English line's
fifty-five, and the TC frame still draws older, longer Chinese copy — so no frame exists for the
final string. The heading keeps the desktop-Chinese display token from `design-tokens.md` and
wraps on its own; the Intro section gets shorter in `zh` than in `en`. Nothing is scaled up to
fill the designed block, because that would mean inventing a type size outside the token set.

The overlapping Intro image is positioned relative to the heading block, not to a hardcoded
offset, so it follows the shorter Chinese heading instead of detaching from it.

### D-E — The floating desktop `MENU` square is not built

Resolved with the user. `12423:8613` (EN) / `0:504` (TC) sits outside the Hero frame at the
Hero/Intro boundary and implies a scroll-driven desktop nav. It is not built, because the panel
it would open has no verified design — Phase 3 established that the desktop expanded-menu frame
is a stray documentation duplicate. Building the trigger alone would ship a control that opens
nothing; wiring it to the 393px mobile overlay would contradict D017 and stretch a mobile design
across a 1440px viewport. Deferred to the Polish phase.

### D-F — Copy comes from the matrix; the two divergences are deliberate

Per D032 the hero body reads `…international touring and promotion`, not the frame's
`…live production`, and the ZH Intro heading is the matrix line. The hero headline stays English
in both locales — this is not a missing translation, it is what the TC frame draws and what the
matrix marks `keep EN`, so it is a literal in the dictionary for both locales rather than a
fallback. The Phase 1 `home.placeholder` key is deleted, not left orphaned.

### D-G — Photography is exported, not placeholdered

`download_assets` pulls the three desktop hero photos, the mobile hero photo, and the Intro
image into `public/`. Rendered through `next/image` with explicit intrinsic dimensions. The
desktop hero photos are decorative composition elements and take empty `alt`; the Intro image is
likewise decorative. If an asset cannot be exported, that is reported as blocked — a
placeholder rectangle in a phase whose whole output is a visual review is a false completion.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| **1024–1440px runs the mobile layout at desktop token sizes with the desktop NAV** (D-B × D-009 × D-021). A stacked hero built to 393px fixed widths will look broken on a laptop — the most common real viewport. | The stacked subtree is built fluid, not fixed-width. Self-verification adds **1280px** to the required screenshot matrix alongside 393px and 1440px, in both locales. This is a check for tolerable, not for matching — no frame exists at 1280px. |
| The Hero headline sits over photography at mobile; contrast depends on the exported photo. | Verify the white and green display words against the real asset once exported, not against the Figma render. If contrast fails, record it rather than silently adding a scrim the design does not have. |
| The `zh` Intro section becomes materially shorter than `en` (D-D), changing the page's rhythm between locales. | Accepted and intended — it follows from the matrix copy. Screenshot both locales at both breakpoints so the difference is reviewed at the gate, not discovered later. |
| Absolute positioning in the desktop collage (D-C) is brittle against future token changes. | Position against the section container and the token set, not against literal 1440-canvas coordinates copied from `get_design_context`. Any value that has a token uses the token. |
| The desktop hero's `image 30` overflows its 960px frame by ~8px in Figma. | Clip at the section boundary. Do not extend the section height to accommodate it — that is a Figma artifact, not a design intent. |
| Home ends abruptly after the Intro until Phase 6. | Stated in the proposal and to be restated at the gate. Not a defect to be "fixed" by pulling Phase 6 work forward. |

## Open Questions

None blocking. The three questions this phase raised — the tablet band, the ZH heading, and the
`MENU` square — were resolved with the user before implementation and are recorded above as
D-B, D-D, and D-E. All three are mirrored into `openspec/DECISIONS.md` as a task line.

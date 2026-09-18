# Phase 07c — Design Notes

## Table of Contents

- [D-A: The dynamic viewport is the actual constraint](#d-a-the-dynamic-viewport-is-the-actual-constraint)
- [D-B: Only the two large blocks shrink](#d-b-only-the-two-large-blocks-shrink)
- [D-C: The logo block is binary, and the media query is the right tool](#d-c-the-logo-block-is-binary-and-the-media-query-is-the-right-tool)
- [D-D: The floor is 553px and it is the clamp minimum](#d-d-the-floor-is-553px-and-it-is-the-clamp-minimum)
- [D-E: Why not one uniform scale](#d-e-why-not-one-uniform-scale)
- [Measured baseline](#measured-baseline)
- [Risks](#risks)

## D-A: The dynamic viewport is the actual constraint

The menu is `fixed inset-0`, which sizes to the **layout** viewport. On a phone with browser
chrome showing, the visible area is smaller — roughly 553px on an iPhone SE whose layout
viewport reports 667px. So the device-height table is optimistic everywhere, by the height of
the URL bar and toolbar.

This has a consequence that shaped the rest of these notes: **`@media (max-height: …)` reads
the same layout viewport that `vh` does.** There is no `dvh` media feature, and a media query
cannot read a custom property. So no media query can detect "the visible area is currently
553px" — on the SE it would report 667 and never fire.

Anything that must respond to the *visible* area therefore has to be a `dvh`-based length in
the style layer, not a query.

```
   LAYOUT VIEWPORT              VISIBLE (dvh)
   ═══════════════              ═════════════
   what @media sees             what the user sees
   what 100vh sees              what 100dvh sees

   ┌──────────────┐  667        ┌──────────────┐
   │ ▓▓ URL bar ▓▓│             │ ▓▓ URL bar ▓▓│  ← chrome
   │              │             ├──────────────┤
   │              │             │              │  553
   │    menu      │             │    menu      │
   │              │             │              │
   │              │             ├──────────────┤
   │              │             │ ▓▓ toolbar ▓▓│  ← chrome
   └──────────────┘             └──────────────┘

   A max-height query fires on 667 and misses the 114px that matter.
```

The container moves to `h-dvh`, matching the precedent `d6d2ab3` set for the hero sections.

## D-B: Only the two large blocks shrink

Measured composition of the 838px EN box:

| Block | px | Share | Shrinks? |
| :--- | ---: | ---: | :--- |
| Seven links | 474.3 | 57% | **yes** |
| Logo block (logo 115 + `mt` 10.19 + nav `mt` 56) | 181.2 | 22% | **yes, binary** |
| Footer (social 72 + gap 2 + locale bar 54) | 128 | 15% | no |
| Close row (`pt` 25.81 + button 29) | 54.8 | 7% | no |

The bottom two rows are 182px combined, and the argument for leaving them alone is not that
they are small — it is that they are **already at or below comfortable tap-target sizes**. The
close button is a 29px target today; the social icons are 37.4px. Both already sit below the
44px minimum that WCAG 2.5.8 and Apple's HIG use.

Shrinking them further to save the links would make the weakest targets in the menu worse in
order to protect the strongest. The links are 68px — the only block with real slack in it.

**Decision:** the close row, social row and locale bar keep their current fixed px values at
every viewport height. They are not clamped, not scaled, not touched.

## D-C: The logo block is binary, and the media query is the right tool

The `LogoMark` in the open menu is **not a link** — it is a bare `<LogoMark />`, decorative,
with no wayfinding role. The close button is the way out and the page behind carries the logo.
It is the only element in the menu with zero interactive function, which is what makes it the
first thing to drop rather than the last.

Removing it is worth ~18px per link against merely shrinking it. At the 553px floor:

| Logo treatment | Fixed cost | Left for 7 links | Per link |
| :--- | ---: | ---: | ---: |
| Full 115px | 283 | 270 | 38.6 — below the tap floor |
| Shrunk to 60px | 226 | 327 | 46.7 — works, zero slack |
| **Absent** | 183 | 370 | **52.8 — comfortable** |

**Binary, not continuous.** A logo that scales smoothly passes through sizes (20px, 30px)
where it reads as a rendering bug rather than a design. Full size or gone.

**The trigger is a `max-height` media query, and D-A's limitation is a feature here.** The
query cannot see the URL bar collapsing — which is exactly what stops the logo popping in and
out while the user scrolls. It keys off device class, which is the stable property this
decision actually wants. A `dvh`-driven collapse would flicker.

**The threshold is `max-height: 666px`** — chosen as a preference, not derived from the
arithmetic. Layout-viewport heights, which is what the query sees (D-A):

| Device | Layout viewport | ≈ usable with chrome | Mark |
| :--- | ---: | ---: | :--- |
| Landscape / split-screen | ≤666 | — | **dropped** |
| iPhone SE 2/3, iPhone 8 | 375×667 | 553 | kept — scrolls |
| Galaxy S8 / S9 | 360×740 | 626 | kept — scrolls |
| Pixel 5 / 6a class | 360×800 | 686 | kept — scrolls |
| iPhone 13 mini | 375×812 | 698 | kept |
| iPhone 12/13/14 | 390×844 | 730 | kept |
| iPhone 14/15 Pro | 393×852 | 738 | kept |
| Pixel 7 / 8 | 412×915 | 801 | kept |

With the mark present the menu needs about **673px** of visible height: 303 fixed (29 close row
+ 90 mark + 56 gap + 128 footer) plus 370.3 of links at the clamp minimum. A threshold derived
from that number alone lands near 820, in the dead band between 812 and 844, and drops the mark
on everything from the 13 mini down.

666 deliberately refuses that trade. It keeps the mark on every mainstream phone and removes it
only on genuinely short viewports. **The cost is that short portrait phones scroll instead:** an
SE has 553px visible against ~673 needed, so about 120px sits below the fold and
`overflow-y-auto` carries it. Brand presence over a scroll-free fit — a user decision, recorded
in D064.

Measured side effect: EN at 740px of visible height needs 741.4 and overflows by **1px**.

## D-D: The floor is 553px and it is the clamp minimum

553px is the iPhone SE's usable height with Safari chrome — the smallest viewport the menu
must fit without scrolling. Below it, the container scrolls, and that is the documented
degradation rather than a failure.

Two candidate floors were considered and the simpler one won:

| | Derived floor | **Chosen: 553** |
| :--- | :--- | :--- |
| How it is set | Per-element minimums at 44px each; floor falls out of the arithmetic (~466px) | One anchor; link minimum sized to land at it |
| Numbers to maintain | ~15 (min/max/expression × 5 elements) | 3 (logo cutoff, link min, link max) |
| Links at the floor | 44 — at the limit | 52.8 — comfortable |
| Risk | Floor and minimums drift apart across phases | Cannot drift — they are the same value |

**Decision:** 553, expressed once. The link clamp's minimum *is* the floor. A future phase
reading `clamp(52.8px, …, 68px)` can see the whole intent inline without cross-referencing a
second number.

**Anything shorter than 553** — landscape phones, older Androids — scrolls. The container
keeps `overflow-y-auto` as the safety net.

Whether the clamp bounds live as `@theme` tokens or inline arbitrary values is an
implementation call. CLAUDE.md forbids ad-hoc values in components, but these are responsive
bounds derived from measurement rather than design tokens from Figma, and there is no Figma
variable behind them. Prefer inline with a comment naming the measurement; promote to tokens
only if a second component needs them.

## D-E: Why not one uniform scale

A single `--menu-scale` multiplier, or a `transform: scale()` on the whole content, is
genuinely one number and makes it impossible for the proportions to drift. It was the leading
candidate until the tap-target measurement came in.

At the 553px floor the uniform scale is 553/838 = **0.66**. Applied to everything:

| Element | Today | Uniform scale 0.66 | Two-knob plan |
| :--- | ---: | ---: | ---: |
| Link box | 68 | 45 | 52.8 |
| Close button | **29** | **19** | 29 |
| Social icon | **37.4** | **25** | 37.4 |

It regresses the two elements that were already below 44px, to buy less headroom for the one
that had plenty. **Rejected.** The proportional-fidelity argument is real but it is protecting
the wrong thing — the menu's proportions are not load-bearing the way its tap targets are.

`transform: scale()` carries two further costs worth recording so this is not revisited:
fractional scale factors soften text rendering, and the locale bar's full-bleed background
needs width compensation to stay edge-to-edge.

## Measured baseline

Taken against the running dev server at 393px wide, before any change. Re-measure rather than
trusting these if the link list changes — Phase 8 adds nothing to `navRoutes`, but a later
phase might.

| | EN | ZH |
| :--- | ---: | ---: |
| Total content height | 838 | 773 |
| Seven links | 474.3 | 409 |
| Per link | ~67.6 (Home 69.7) | ~58 |
| Link font size | 78px (Home 81px italic) | 38px |
| Minimum viewport with no overflow | 838 | 773 |

EN's Home link is special-cased to 81px italic where the other six are `text-display-h3`. That
emphasis is deliberate and must survive the clamp — it needs its own bound, not the shared one,
or it flattens into the list.

## Risks

| Risk | Mitigation |
| :--- | :--- |
| **A link wraps at 375px.** Every measurement here was taken at the 393px design width. The SE is 375. `Contact Us` or a longer ZH label wrapping takes a link from 53px to ~106px and the budget is gone instantly — this, not the height arithmetic, is the likely failure. | 375×553 is a required verification size in both locales, listed in the proposal. Check the longest label in each, not a representative one. |
| **The media-query threshold is wrong for some device.** It must fire on the SE and not on 393×852, and there is a range of phones between. | Picking it is an explicit task against a device list, not a guess during implementation. |
| **`h-dvh` behaves differently across iOS/Android browsers** and cannot be reproduced in headless Chrome. | Verify on a real device before the phase is called done. Headless verification catches the arithmetic, not the chrome behaviour. |
| Changing anything at full height. | 393×852 must be pixel-identical; the clamp maxima are today's values precisely so that it is. Screenshot-diff it, as Phase 07b did. |
| Body scroll lock breaks scroll position on close. | Restore, do not reset — the user returns to where they were. |

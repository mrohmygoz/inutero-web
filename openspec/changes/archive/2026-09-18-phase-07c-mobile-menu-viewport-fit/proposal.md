# Phase 07c — Mobile menu fits the viewport

## Why

The open mobile menu is a **fixed 838px box** (EN; 773px in ZH). Nothing in it responds to
viewport height, so it fits exactly one class of device and silently becomes a scroller on
everything else. Measured at 393px wide against the running site:

| Viewport height | 667 | 740 | 780 | 812 | 852 | 932 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| EN overflow | 171 | 98 | 58 | 26 | 0 | 0 |
| ZH overflow | 106 | 33 | 18 | 0 | 0 | 0 |

`mt-auto` on the footer means the composition only ever *looks* right at ≥838px, and
`overflow-y-auto` on the container is what hides the failure — on an iPhone SE roughly a
third of the menu, including the locale switcher, sits below the fold with no affordance
saying so.

The real target is worse than the device list suggests. `fixed inset-0` sizes to the layout
viewport, so with browser chrome showing, usable height on an SE is about **553px**, not 667.
Against 838px of content that is a 34% reduction — it cannot be trimmed out of padding.

Phase 7 already fixed this class of bug for the heroes (`d6d2ab3`, "fill the viewport instead
of a fixed 665px", which moved them to `min-h-dvh`). The nav overlay was missed by that pass.
This phase finishes it, before Phase 8 adds Services to the menu's link list.

## What Changes

**Two knobs. Everything else in the menu keeps its current fixed px values, untouched.**

The seven links are 57% of the box and the logo block another 22%. Those two are the whole
problem. The close row, social row and locale bar total 182px and are already at or below
comfortable tap-target sizes — shrinking them would regress the weakest targets in the menu to
save the strongest (D-B).

| Knob | Behaviour |
| :--- | :--- |
| **Logo block** — `LogoMark` + its `mt-[10.19px]` + the nav's `mt-[56px]`, treated as one collapsible unit | Present at full size, or absent. 181px in one move (D-C). |
| **Link box** — vertical padding and font size | `clamp()`, maximum = today's value, minimum lands at the 553px floor (D-D). |

At 553px with the logo block gone: `54.8` close + `128` footer = 183px fixed, leaving 370px
for seven links — **52.8px each**, comfortably above the 44px tap-target minimum.

**The floor is 553px, and the menu scrolls below it.** The link clamp's minimum *is* the
floor, so there is one number, not two that can drift apart (D-D).

**Container moves to `h-dvh`** so it tracks the visible viewport rather than the layout
viewport, matching what `d6d2ab3` did for the heroes.

**Body scroll lock while the menu is open.** Currently absent — the page behind scrolls under
the overlay. Masked today by the overlay's own `overflow-y-auto`; once the overlay stops
scrolling on normal devices it becomes the only scroll surface, and the bug gets more visible,
not less.

**Not in scope.** The desktop nav and the collapsed mobile bar — both unchanged.

**Amended during implementation.** This section originally required the rendered output at
≥838px to be **pixel-identical** to today, and that was met: 393×852 diffed byte-identically in
both locales. The user then asked for the menu's vertical composition to change — close row
pinned top, footer pinned bottom, mark and links centred in the slack between (D065) — which
moves the mark and links at every height above the menu's natural one. The pixel-identity
criterion no longer applies and is recorded here as superseded rather than quietly dropped.

## Capabilities

### New Capabilities

None. This is responsive behaviour on an existing presentational component. `config.yaml` is
explicit that visual appearance is not a spec.

### Modified Capabilities

None. `skip_specs: true` is set in `.openspec.yaml`.

## Impact

| Area | Effect |
| :--- | :--- |
| `app/_components/Nav.tsx` | Mobile menu overlay only — container sizing, logo block, link boxes, scroll lock |
| `app/globals.css` | Possibly a `@theme` entry if the clamp bounds are expressed as tokens (D-D) |
| `openspec/DECISIONS.md` | Dropping the logo is Derived (D005) and needs an entry; so does the floor |
| `openspec/reference/roadmap.md` | New 7c row |
| Rendered output at ≥838px | Changed, by later user decision — see D065. The clamps alone left it byte-identical; the centring did not. |

## Verification

The user verifies in a browser. Because the failure only appears at short heights, the
viewport sizes matter more than usual:

| Width × height | What it is | Expect |
| :--- | :--- | :--- |
| 393 × 852 | iPhone 14/15 Pro | Logo present, nothing clipped. (Was "identical to today" — superseded by D065.) |
| 393 × 740 | mid-size, chrome showing | Everything visible, logo present or absent |
| **375 × 553** | **iPhone SE with Safari chrome** | Everything visible, no scroll, logo absent |
| 393 × 553 | design width at the floor | Same |
| 375 × 480 | below the floor | Scrolls — accepted degradation |

**Both locales at every size.** ZH links are 38px against EN's 78px, so the two have
genuinely different budgets and one cannot be tuned from the other.

**375px width is not optional.** Every measurement in this proposal was taken at the 393px
design width; the SE is 375. Eighteen pixels narrower is enough for `Contact Us` or a longer
ZH label to wrap, and a wrapped link goes from 53px to ~106px — that, not the height
arithmetic, is what would blow this budget.

# Phase 6 — Design

## Context

See `proposal.md` → Why. Three things about the current codebase shape this phase:

1. **D040 split sections into two kinds.** Placed compositions (the Home hero) keep their drawn
   1440×960 geometry and scale uniformly inside `.canvas-1440`; flow sections reflow. Every
   later page phase is built against that rule, and this is the first phase to apply it to a
   section that is neither purely placed nor purely flowed.
2. **`ProjectCard` already exists** (`app/_components/ProjectCard.tsx`) as a presentational
   shell with `title` / `dateLabel` / `description` / `tags` / `image?` / `href?` / `className`.
   Home's Featured Projects is one of its two declared consumers.
3. **Nothing on the site is interactive except `Nav`.** The accordion is the second client
   component, and the first one whose interaction the Figma file does not draw.

Figma still shows Lorem ipsum for both the four service descriptions and the three project
blurbs. `openspec/reference/content-matrix.md` supplies the real copy and outranks the text
layers (D032) — so the *drawn* block heights are not a target to hit.

## Goals / Non-Goals

**Goals**

- Close Home at both breakpoints in both locales, with no seam between the Phase 5 sections and
  these three.
- Reuse `ProjectCard` and `UniversalCTA` unchanged, proving the Phase 2/4 shells hold up on a
  real page.
- Establish how a section that mixes flow content with placed overlays is expressed, since
  Services, Portfolio, and Featured Artists all repeat the pattern.

**Non-Goals**

- Generalizing `.canvas-1440` into a reusable scaling primitive. See the first decision.
- Any motion design. The accordion opens and closes; whether it animates, and how, is Polish.
- Making `ProjectCard` aware of routes or MDX. It stays presentational (D-C).

## Decisions

### These two sections reflow; they do not go into a scaling canvas

`.canvas-1440` hardcodes `aspect-ratio: 1440 / 960` and freezes its child at 1440×960. Neither
section fits that mould, and the reason is not just the different height:

| Section | Desktop EN | Desktop TC |
| :--- | ---: | ---: |
| Services | 1535px | 1377px |
| Featured Projects | 1114px | 1114px |

Services is **158px shorter in Chinese** — the heading and the open accordion item both shrink
at the Chinese type scale. A fixed-aspect canvas would either letterbox the Chinese frame or
scale the whole section down to fit it. The section's height is content-driven, which is D040's
own definition of a flow section.

The placed-looking parts are handled inside the flow container instead: the accordion overlays
the photograph via a relatively-positioned wrapper with percentage offsets, and the three
project cards are absolutely positioned as percentages of the 1376px content container, in a
wrapper whose height is set by the tallest card. Percentages, not fixed px — the Phase 5
addendum already established that a fixed offset lands in the wrong place once the container
narrows.

**Alternative considered:** parameterize `.canvas-1440` with a `--canvas-aspect` custom property
and use it here. Rejected — it would lock the Chinese layout to the English frame's proportions,
which is exactly the failure D038 was written to prevent.

### The accordion is interactive, one item open at a time

Decided by the user at proposal time. Figma draws exactly one state (item 1 open with its body
copy, items 2–4 collapsed, each with a 36px icon), so the interaction is **derived** under D005
and must be reported as such, not as matching the design.

- `HomeServices` is `'use client'` and holds a single `openIndex` number. Item 1 is open on load,
  matching the drawn state.
- Each item header is a real `<button>` with `aria-expanded` and `aria-controls`; the panel is
  the described region. Collapsed panels are removed from the tree rather than hidden with CSS —
  there is no animation to preserve, and it keeps collapsed copy out of the accessibility tree.
- The icon's second state is not drawn either. It rotates; the drawn glyph is the closed form.

**Alternative considered:** a `<details>`/`<summary>` pair, which needs no client component.
Rejected — "one open at a time" requires coordinating siblings in JS anyway, and `<summary>`
brings default marker and focus styling that would have to be fought at every breakpoint.

The Services *page* (Phase 8–9) has its own accordion and its own frames. This one is not
promoted to `app/_components/` — a second consumer with a verified design is the bar for that,
and Phase 8 has not been read. It stays page-local, consistent with D033.

### The card scatter lives in wrappers, not in `ProjectCard`

Each of the three cards sits in its own positioning wrapper. The Figma bounding boxes are wider
than the card itself (desktop ~424 / 366 / 363 against `ProjectCard`'s 325px; mobile ~376 / 368 /
364 against 353px) and carry fractional coordinates — the signature of a rotated node, not a
wider card. So rotation and offset are wrapper concerns and `ProjectCard` is composed unchanged.

If a card turns out to need something the shell does not expose, the fix is a prop on
`ProjectCard` plus an `INVENTORY.md` update — never a second card component on Home.

### Where Home's summary links point

Neither target fully exists yet, and D-G's precedent (link to the whole page when the anchor
does not exist) applies to both:

| Element | Target | Why |
| :--- | :--- | :--- |
| `full services list` CTA | `/[locale]/services` | The page exists as a stub; Phases 8–9 fill it. |
| Accordion item headers | Not links | They are disclosure buttons. Making them navigate would fight the open/close interaction. |
| `VIEW ALL PROJECTS` CTA | `/[locale]/portfolio` | Same as above. |
| Project cards (`href`) | `/[locale]/portfolio` | No slugs exist until Phase 11. Pointing every card at a route that 404s is worse than pointing at the index; `ProjectCard`'s `href` is optional, but three unclickable cards read as broken. Phase 11 replaces these with real slugs. |

### The mobile hero cycle implements the prototype's values verbatim

The `Mast` variant set carries real prototype reactions. Read off the nodes via the Plugin API
(`node.reactions`), every one of the five is identical in shape:

| Field | Value |
| :--- | :--- |
| Trigger | `AFTER_TIMEOUT`, `timeout: 0.8` |
| Action | `CHANGE_TO` the next variant, wrapping `Variant5` → `Default` |
| Transition | `DISSOLVE` |
| Easing | `LINEAR` |
| Duration | `0.2` |

So: 0.8s hold, 0.2s linear cross-dissolve, 1.0s per photo, 5.0s round trip. Implement these
numbers. They are noticeably faster than a conventional hero carousel and that is the design's
choice, not an oversight — the effect is closer to a flicker through a contact sheet than to a
slideshow.

**`get_motion_context` is not the tool for this.** It returns timeline keyframe animations and
came back empty on the variant set, on the `Mast` instance, and on the whole mobile Home frame.
Prototype reactions are a separate data channel reachable only through the Plugin API. Any later
phase asking "does this have motion?" must check `node.reactions`, not just
`get_motion_context` — the empty result nearly got this shipped as a still image a second time.

**Implementation shape.** All five photos render stacked in the same 665px box, each an
absolutely-positioned `next/image` with `opacity` driven by the active index; the headline and
scrim sit above them and never move. A CSS transition of `200ms linear` on opacity reproduces
`DISSOLVE`/`LINEAR`/`0.2`. Photo 1 keeps `priority`; the other four load normally — a 0.8s first
hold is enough lead time and four extra `priority` images would fight the LCP the hero exists to
win. `HomeHero` becomes `'use client'` for the interval; the desktop collage is untouched.

**`prefers-reduced-motion` is the one undesigned part.** Under it, the cycle does not run and
photo 1 renders alone. A 5Hz-ish full-viewport dissolve is exactly what that media query exists
to suppress, and no Figma frame can express the preference.

**Alternative considered:** CSS `@keyframes` with staggered `animation-delay` on the five layers
and no JavaScript. Genuinely tempting — it would keep `HomeHero` a server component. Rejected
because the five delays have to stay in sync with a 5s cycle length that is stated in three
places, and reduced-motion then needs a second full set of rules. The interval is four lines.

### Copy comes from the matrix, so drawn block heights are not a target

The four service descriptions and three project blurbs are Lorem ipsum in Figma. The matrix's
real copy differs in length in both locales — the Chinese service summaries in particular are
much shorter than the English. Sections are built to reflow around the real strings; a section
that ends up shorter or taller than its frame because the copy is real is **correct**, and the
Close-tier comparison is on composition and spacing rhythm, not total height. Same reasoning as
D038.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| The accordion's open item changes the section height, shifting everything below it as the user clicks. | Accept it — the design gives no fixed-height container. Verify the page does not jump the scroll position when an item above the viewport closes. |
| `ProjectCard`'s 353/325px fixed widths may not match what the Home occurrences actually need once `get_design_context` returns real values. | Task 1.5 checks this explicitly before any card is placed. If they differ, the resolution is a prop, and `INVENTORY.md` is updated in the same phase. |
| The three exported card images are placeholders in all but name — Phase 11 replaces them. | Stated in the proposal and at the gate. The alternative (neutral rectangles) makes the section unreviewable, which is the greater cost. |
| Absolute-positioned cards at percentage offsets will overlap or collide somewhere between 1024px and 1440px, where no frame exists. | Verified at 1024/1280/1440 as part of task 7. If the scatter cannot survive the band, the cards fall back to the flow order — recorded as a decision, not silently. |
| `UniversalCTA` has only ever rendered on `/styleguide`, inside a constrained container. It is a full-bleed section. | Placed outside any page padding and checked for horizontal overflow at every test width, both locales. |

## Findings for other phases — do not act on these here

Sweeping the desktop Home frame for prototype reactions surfaced two things outside this phase's
scope. Recorded so they are not rediscovered as defects, and **not implemented here**.

### D039 rests on a premise the prototype contradicts

The floating desktop `MENU` square `12423:8613` carries a real reaction: `ON_CLICK` →
`OVERLAY` to **`12612:8541`**, transition `MOVE_IN` from `BOTTOM`, easing `EASE_OUT`, duration
`0.5`. D039 deferred the square because "the panel it would open has no verified design — Phase 3
found the desktop expanded-menu frame to be a stray documentation duplicate." The prototype names
that exact frame as the overlay target, which is evidence the Phase 3 reading was wrong rather
than evidence the design is incomplete.

This does not change Phase 6. It should be settled before the Polish phase re-litigates it, and
the right move is to revisit D039 with the reaction data in hand — a separate change, since it
touches `Nav` and every page that renders it.

### The Home project cards point at Portfolio Details, not the index

All three card containers (`12210:2404`, `12210:2423`, `12210:2438`) navigate to `12612:8706`
— Portfolio Details. This phase still links them to `/[locale]/portfolio`, because no slug
exists to link to until Phase 11 and a route that 404s is worse. **Phase 11 should repoint them
at the real detail routes**; the prototype confirms that is the intent, so it is a deferral, not
a design question.

The remaining reactions match what this phase already planned: `full services list`
(`12358:2025`) → Services, `VIEW ALL PROJECTS` (`12358:2031`) → Portfolio.

## Open Questions

None. The two questions this phase could not answer for itself — accordion interactivity and
card imagery — were put to the user before this document was written. The hero cycle's timing
looked like a third, but the prototype specifies it exactly; only `prefers-reduced-motion`
remained, and it is decided above.

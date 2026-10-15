## Context

See proposal.md for motivation (D039/D045). `Nav.tsx` today has exactly one piece of
interactive state, `menuOpen`, which drives the mobile (`lg:hidden`) overlay only — its
Escape-key listener and body-scroll-lock `useEffect`s are keyed off that same boolean and
already written to be theme/breakpoint-agnostic. The desktop top bar is static markup with no
client state of its own.

Three references exist for this phase, none of them the canonical Figma file at a node the
project has fetched yet:
1. The floating trigger's own node ids, named in D039 (`12423:8613` EN / `0:504` TC) — size
   and color already known (75×75, brand green) from that decision's own text.
2. The overlay's node ids, named in D045 (`12612:8541` desktop EN / `12635:12923` desktop
   TC) — not yet fetched by any phase. Exact desktop overlay typography/spacing is deferred
   to apply time, same as every other phase's Figma-sourced values.
3. The Figma Make reference (`fileKey myqsxGwnrcNHEdsE2SFZXk`) and two user screenshots,
   which supply the only data this design can lean on today: the trigger is visibly `fixed`
   through a scroll position mid-page (not just within the hero), and the opened overlay is
   full-bleed brand green with a centered link column, `CLOSE` top-right, and a social row —
   no visible locale control in the screenshot, but the user asked for one anyway for parity
   with the mobile overlay.

## Goals / Non-Goals

**Goals:**
- Desktop-only (`lg:`, ≥1024px). Mobile/tablet unaffected.
- Entirely contained inside `Nav.tsx` — no other component or page file changes.
- Share `menuOpen` and its existing Escape/scroll-lock effects between the mobile and new
  desktop overlay branches, rather than introducing parallel state.

**Non-Goals:**
- Per-page "end of first section" sentinels. Considered (D045's own note anticipated this:
  "touches Nav and every page that renders it") and rejected by the user in favor of a single
  scroll-distance constant local to `Nav.tsx` — see Decisions.
- Re-deriving the inline top bar's scroll behavior. It stays exactly as it is today.
- Matching the real Figma overlay frame's logo treatment, if it has one — the user has
  explicitly asked for no logo in the desktop overlay regardless of what that frame shows.

## Decisions

**Visibility trigger: a single scroll-distance threshold in `Nav.tsx`, not per-page
sentinels.** Not every page even shares a wrapper element (`portfolio/page.tsx` and
`contact/page.tsx` return a bare fragment, no `<main>`), so there is no existing DOM hook for
"end of first section" today, and first-section heights vary widely across the 9 routes
(Services' hero alone is 1334px). A per-page sentinel would be the accurate approach but
widens this phase to 9+ files. The user chose the fixed-threshold alternative instead, scoped
entirely to `Nav.tsx`: `showFixedTrigger` becomes true once `window.scrollY` passes a
threshold derived from `window.innerHeight` (e.g. `~0.8×`, tuned at apply time against the
two reference screenshots — not a literal pixel count, since a ratio travels better across
monitor heights than a constant would), and false again below it, via a scroll listener
(rAF-throttled, the same pattern `HomeServices`/`HeroCursorTrail` already use elsewhere in
this codebase). **Known cost, accepted**: this will fire earlier or later than the literal
bottom of each page's first section — exactly right on pages close to one viewport tall,
early on short headers (Contact), late on tall heroes (Services). Flagged in Risks, not
chased further this phase.

**State: extend `menuOpen`, don't add a second boolean.** The desktop overlay is a second
JSX branch inside the same `{menuOpen && (...)}` block (or a sibling block gated by the same
variable), reusing the existing Escape-key and body-scroll-lock `useEffect`s verbatim. The
only new state is the trigger's own `showFixedTrigger` visibility boolean, which is unrelated
to whether the overlay is open — a visitor can scroll back above the threshold while the menu
is open without that closing it.

**Desktop overlay markup**: a `hidden lg:flex` (or equivalent) sibling to the existing
`lg:hidden` mobile overlay markup, not a merged single tree — the two differ enough
(centered single column vs. mobile's full-width stacked rows; no logo vs. mobile's mark) that
sharing one tree would need as much conditional branching as two trees would, and the mobile
tree's `MENU_LINK_*` clamp constants are explicitly `dvh`-based for mobile viewport-height
safety (D063) — not meaningful at a single fixed 1440px desktop design width. Desktop reuses
`navRoutes`/`routes` for link data, `closeLabel`, `socialPlatforms`, and `swapLocale` — all
already imported — no new data source.

**Trigger markup**: `hidden lg:block fixed` positioned element, visibility driven by
`showFixedTrigger`, `aria-expanded`/`aria-controls` mirroring the existing mobile toggle
button's pattern. Toggles the same `menuOpen` state the mobile button does (set, not just
open — clicking it while already open via some other path would close it, consistent with
the mobile button's existing toggle behavior).

**z-index**: the trigger and desktop overlay need to sit above the dark-theme absolute NAV
bar (`z-40`) and above all page content; matching the mobile overlay's existing `z-50` is the
simplest correct choice — no new stacking context introduced.

**Alternatives considered**: a per-page IntersectionObserver sentinel (rejected above, user
decision); reusing the mobile overlay's `dvh`-clamped typography unchanged for desktop
(rejected — those constants are explicitly tuned for mobile viewport-height safety per D063
and have no reason to apply at a fixed desktop width; the real desktop values come from the
Figma overlay frame at apply time).

## Risks / Trade-offs

- **Scroll-threshold heuristic won't track the literal end of the first section** on pages
  far from one-viewport-tall. → Accepted per the user's own choice of mechanism over per-page
  sentinels; worth a visual spot-check per route during apply-time verification rather than a
  blocking concern.
- **No-logo overlay may visibly diverge from the real Figma overlay frame once fetched.** →
  Flagged for its own decision line (D123) if the frame does carry a logo; the user's
  instruction stands regardless.
- **Sharing `menuOpen` across two differently-shaped overlay branches** risks one branch's
  markup leaking into the other if the `lg:`/breakpoint gating is wrong. → Both branches gate
  on Tailwind's `lg:` prefix exactly like the existing mobile-vs-desktop top-bar split
  already does in this file; no new breakpoint mechanism introduced.

## Open Questions

- Exact scroll-threshold ratio/constant — deferred to apply time, tuned against the two
  reference screenshots and spot-checked across routes; doesn't change the approach, spec, or
  task breakdown.
- Whether the real Figma overlay frame (`12612:8541`/`12635:12923`) includes a logo —
  deferred to apply time's first fetch of that node; if so, record as an explicit divergence
  in D123 rather than silently matching or ignoring it.

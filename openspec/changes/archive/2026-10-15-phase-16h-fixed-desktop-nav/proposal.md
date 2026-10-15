## Why

On desktop, `Nav.tsx`'s top bar is `relative` (light pages) or `absolute` over the hero
(dark pages) — never `fixed`. Once a visitor scrolls past the hero on any of the 9 routes,
there is currently no navigation affordance left on screen at all. D039 deferred a floating
desktop `MENU` trigger for exactly this gap, on the premise that its overlay target
(`12612:8541` desktop EN / `12635:12923` desktop TC) was a stray documentation duplicate with
no real trigger. D045 later found that premise wrong — the square carries a real
`ON_CLICK` → `OVERLAY` prototype reaction naming that exact frame as its target — and flagged
a revisit "before Phase F" as its own change, since it touches `Nav.tsx`. The user has now
supplied a Figma Make reference (`fileKey myqsxGwnrcNHEdsE2SFZXk`, same file phases 16f/16g
were built from) and two screenshots showing the intended fixed trigger and opened overlay,
making this that revisit.

## What Changes

- A new `lg:`-only (desktop) fixed-position `MENU` trigger — a 75×75 green square, reviving
  D039's node (`12423:8613` EN / `0:504` TC) — appears once the page has scrolled past a
  threshold and hides again near the top. The existing inline top bar (logo, 6 links, locale
  pill) is untouched; this is purely additive.
- A new desktop branch of the existing full-screen overlay, opened by the fixed trigger and
  sharing `Nav.tsx`'s existing `menuOpen` state, Escape-key handler, and body scroll-lock —
  the same machinery the mobile menu already uses, not a second independent overlay.
- Desktop overlay content: `CLOSE` button top-right, all 7 links (Home + the existing 6
  `navRoutes`) centered as a single column, locale switcher and social-icon row carried over
  from the mobile overlay. **No logo** — an explicit, user-confirmed divergence from whatever
  the real Figma overlay frame shows, to be fetched and reconciled at apply time.
- **BREAKING**: none — purely additive at `lg:`, no existing markup removed or restructured.

## Capabilities

### New Capabilities
- `fixed-desktop-nav`: a scroll-triggered fixed navigation entry point for desktop, giving
  visitors a way back into the nav after scrolling past the hero.

### Modified Capabilities
(none — no existing spec covers `Nav.tsx`; the inline top bar and mobile menu are unchanged)

## Impact

- `app/_components/Nav.tsx` — the only code file touched. New fixed-trigger markup/state and
  a new desktop branch inside the existing overlay block.
- `app/_components/INVENTORY.md` — update the `Nav` row to record the new trigger/overlay
  behavior and node IDs.
- `openspec/DECISIONS.md` — at apply time, record D123: supersedes D039 (contradicted by
  D045's prototype find), the scroll-threshold-over-per-page-sentinel choice, and the
  no-logo divergence if the real Figma overlay frame turns out to include one.
- `openspec/reference/roadmap.md` — add the phase-16h row on completion.
- No new dependency, no route change, no content/data change.

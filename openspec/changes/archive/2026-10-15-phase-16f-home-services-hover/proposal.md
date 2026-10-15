## Why

HomeServices (`app/[locale]/_components/HomeServices.tsx`) desktop layout shows one static
photo behind the accordion regardless of which service row is open or hovered. The user wants
the background photo to respond to mouse hover on desktop, so each of the four service rows
gets its own photo while the visitor's cursor is over it — matching an interaction the user
specified via a Figma prototype and a reference implementation in a Figma Make file.

## What Changes

- Desktop only (`lg:` / ≥1024px). Mobile is unchanged — it has no hover concept and keeps
  today's single-image-follows-open-item behavior.
- Each of the four service rows (Artist Management, International Booking & Tour Planning,
  PR & Marketing, Event Production) gets its own background photo, sourced from the Figma Make
  file's own asset set (real photography, not placeholders — see design.md).
- `onMouseEnter`/`onMouseLeave` added to each desktop accordion row, driving a new hover-index
  state independent of the existing click-driven `openIndex`.
- The displayed background resolves hover-if-present, else falls back to the open row's photo
  — so the photo always shows something even when the mouse is off the accordion entirely.
- All four images are stacked and cross-faded via `opacity` over 500ms ease, replacing the
  current single static `<Image>`.
- Click-to-open accordion behavior, copy, and i18n are unchanged.

## Capabilities

### New Capabilities
- `home-services-hover`: desktop-only hover interaction on the Home page's Services accordion
  that swaps the background photo per row, independent of the row's open/closed state.

### Modified Capabilities
(none — the existing accordion open/close behavior is unchanged)

## Impact

- `app/[locale]/_components/HomeServices.tsx` — desktop branch only; new hover state, new
  per-item image stack replacing the single `<Image>`.
- `public/images/home/` — four new photo assets exported from the Figma Make file's asset set
  (`imgSvc1`–`imgSvc4`), alongside the existing `services.jpg` (which mobile keeps using).
- `openspec/DECISIONS.md` — records this as a derived/user-specified interaction (no canonical
  Figma reaction data exists for it) and the open question on duotone consistency across the
  four images.
- `openspec/reference/roadmap.md` — phase 16f row added.
- No change to `app/_components/INVENTORY.md` — `HomeServices` remains page-local, not promoted
  (D033/D040 still hold).

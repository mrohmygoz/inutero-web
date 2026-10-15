## Purpose

Gives the Home page's desktop Services accordion a hover-reactive background photo, so each
service row previews its own image while the visitor's cursor is over it, independent of which
row is currently open.

## ADDED Requirements

### Requirement: Desktop hover sets the displayed background photo

On viewports ≥1024px, while the pointer is over a Services accordion row, the system SHALL
display that row's photo as the section background, replacing whatever was shown before.

#### Scenario: Hovering a closed row shows its photo

- **WHEN** the pointer enters a closed accordion row on desktop
- **THEN** that row's photo becomes the visible background within the 500ms cross-fade

#### Scenario: Hovering a different row swaps the photo again

- **WHEN** the pointer moves from one accordion row directly to another
- **THEN** the background cross-fades from the first row's photo to the second row's photo

### Requirement: Background falls back to the open row when not hovering

When the pointer is not over any accordion row, the system SHALL display the currently
open (click-selected) row's photo as the background.

#### Scenario: Pointer leaves the accordion entirely

- **WHEN** the pointer moves off all four accordion rows
- **THEN** the background shows the photo of whichever row is currently open

#### Scenario: Hover state does not change which row is open

- **WHEN** the pointer hovers a row that is not the open row
- **THEN** the accordion's open/closed state and panel content are unchanged — only the
  background photo responds to hover

### Requirement: Hover-driven background is desktop-only

Below 1024px, the background photo SHALL NOT respond to pointer hover; it SHALL continue to
track only the open row, matching the existing mobile behavior.

#### Scenario: Mobile viewport ignores hover

- **WHEN** the viewport is below 1024px (including on devices that report pointer hover, e.g.
  a touchscreen laptop)
- **THEN** the background photo changes only when a row is opened by tap/click, never on hover

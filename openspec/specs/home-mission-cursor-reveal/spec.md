# home-mission-cursor-reveal Specification

## Purpose

Gives the Home page's desktop Mission/Intro section a cursor-reactive photo reveal, so moving
the pointer across the section fades in the Mission photo at the pointer position, independent
of the heading's line count, instead of the photo sitting at a fixed position that can overlap
the heading text.

## Requirements

### Requirement: The pointer entering the section reveals the photo at its position

While the pointer is within the desktop Mission/Intro section, the system SHALL display the
Mission photo at the pointer's position, fading in from hidden.

#### Scenario: Pointer enters the section

- **WHEN** the pointer moves into the desktop Mission/Intro section
- **THEN** the Mission photo fades in, positioned at the pointer

#### Scenario: Pointer leaves the section

- **WHEN** the pointer moves outside the desktop Mission/Intro section's bounds
- **THEN** the Mission photo fades out and is hidden until the pointer re-enters

### Requirement: The photo follows the pointer, clamped to the section's bounds

While visible, the photo SHALL track the pointer's position, never rendering past the edges
of the section it belongs to.

#### Scenario: Pointer moves near a section edge

- **WHEN** the pointer is close enough to the section's edge that the photo's natural
  position would extend past that edge
- **THEN** the photo's position is clamped so it remains fully within the section

#### Scenario: Pointer moves within the section

- **WHEN** the pointer moves while already inside the section
- **THEN** the photo's position updates to follow it

### Requirement: Photo position persists across scroll

If the pointer has not moved but the page scrolls, the photo SHALL re-evaluate its visibility
and position against the pointer's last known viewport coordinates, matching the Home Hero's
existing cursor-trail behavior under scroll.

#### Scenario: Scrolling while the pointer is stationary

- **WHEN** the page is scrolled while the last known pointer position is still within the
  Mission/Intro section's bounds
- **THEN** the photo remains visible and repositions to track that pointer position relative
  to the section

#### Scenario: Scrolling moves the section out from under the pointer

- **WHEN** the page is scrolled such that the last known pointer position is no longer within
  the Mission/Intro section's bounds
- **THEN** the photo fades out

### Requirement: Cursor reveal is desktop-only

Below 1024px, the pointer SHALL NOT control the photo's visibility or position; the mobile
Mission/Intro layout's existing static photo placement is unaffected.

#### Scenario: Mobile viewport ignores pointer movement

- **WHEN** the viewport is below 1024px (including a touchscreen device that reports pointer
  events)
- **THEN** the Mission photo renders at its existing static mobile position, unaffected by
  any pointer activity

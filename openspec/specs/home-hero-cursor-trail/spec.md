# home-hero-cursor-trail Specification

## Purpose

Gives the Home page's desktop Hero section a cursor-reactive image trail, so moving the
pointer across the hero spawns a sequence of portrait photos that follow it, independent of
the existing collage, headline, and CTA content.

## Requirements

### Requirement: Moving the cursor spawns a trailing photo

While the pointer is within the desktop Hero section and has moved at least 85px since the
last spawn, the system SHALL mount a portrait photo centered on the current pointer position.

#### Scenario: First movement spawns a photo

- **WHEN** the pointer enters the desktop Hero section and moves at least 85px
- **THEN** a portrait photo appears centered on the pointer, fading and scaling in

#### Scenario: Small movements do not spawn additional photos

- **WHEN** the pointer moves less than 85px from the position of the last spawned photo
- **THEN** no new photo is spawned

#### Scenario: Scrolling re-spawns at the last known pointer position

- **WHEN** the page is scrolled while the last known pointer position is still within the
  Hero section's bounds
- **THEN** the spawn check re-runs against that position as if the pointer had moved there

### Requirement: Only one trailing photo is visible at a time

Spawning a new photo SHALL fade out the previously visible photo rather than accumulating
multiple photos on screen simultaneously.

#### Scenario: A new photo replaces the previous one

- **WHEN** a new photo spawns while a previous one is still visible
- **THEN** the previous photo begins fading out immediately and is removed once its fade-out
  finishes, while the new photo fades in

### Requirement: Trail photos cycle through the hero's existing photo set

Each spawned photo SHALL be the next photo in round-robin order from the Home hero's existing
5-photo set, independent of which photo the mobile Mast is currently cycling through.

#### Scenario: Consecutive spawns show different photos

- **WHEN** two photos are spawned one after another
- **THEN** they show different photos from the 5-photo set, advancing in a fixed cyclical
  order

### Requirement: Cursor trail is desktop-only

Below 1024px, the pointer SHALL NOT spawn trailing photos; the mobile Hero's existing
auto-cycling behavior is unaffected.

#### Scenario: Mobile viewport ignores pointer movement

- **WHEN** the viewport is below 1024px (including a touchscreen device that reports
  pointer events)
- **THEN** no trailing photo is ever spawned, and the mobile Mast's automatic photo cycle is
  unchanged

### Requirement: Reduced-motion preference suppresses the trail

When the user's `prefers-reduced-motion` setting is set to reduce, the system SHALL NOT spawn
or animate trailing photos.

#### Scenario: Reduced motion is enabled

- **WHEN** the visitor has `prefers-reduced-motion: reduce` set and moves the pointer across
  the desktop Hero
- **THEN** no trailing photo is spawned

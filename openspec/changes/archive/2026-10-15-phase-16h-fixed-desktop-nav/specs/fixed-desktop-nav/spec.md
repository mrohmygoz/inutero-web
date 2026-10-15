## Purpose

Gives desktop visitors a way back into site navigation after scrolling past the hero, where
the existing top bar has already scrolled out of view, via a fixed trigger that opens a
full-screen link overlay.

## ADDED Requirements

### Requirement: A fixed navigation trigger appears after scrolling past the hero

On viewports at or above the desktop breakpoint, once the visitor has scrolled past a
threshold distance from the top of the page, the system SHALL display a fixed-position
trigger that remains on screen regardless of further scrolling.

#### Scenario: Scrolling down reveals the trigger

- **WHEN** a desktop visitor scrolls past the threshold distance from the top of any page
- **THEN** the fixed navigation trigger becomes visible and stays fixed in place as the
  visitor continues scrolling

#### Scenario: Scrolling back up hides the trigger

- **WHEN** a desktop visitor who has scrolled past the threshold scrolls back above it
- **THEN** the fixed navigation trigger is no longer visible

#### Scenario: Trigger does not appear below the desktop breakpoint

- **WHEN** the viewport is below the desktop breakpoint
- **THEN** the fixed navigation trigger never appears, regardless of scroll position

### Requirement: Activating the trigger opens a full-screen navigation overlay

Activating the fixed trigger SHALL open a full-screen overlay listing every primary site
route, independent of the visitor's current scroll position.

#### Scenario: Opening the overlay

- **WHEN** a desktop visitor activates the fixed trigger
- **THEN** a full-screen overlay opens showing a link to every primary route (Home and the
  existing primary navigation routes)

#### Scenario: Overlay includes locale switching

- **WHEN** the desktop overlay is open
- **THEN** a control to switch the page's locale is present and functions the same as the
  existing locale switcher elsewhere in the navigation

### Requirement: The desktop overlay closes the same ways the existing mobile overlay does

The desktop overlay SHALL support the same dismissal paths already available on the mobile
navigation overlay: an explicit close control and the Escape key.

#### Scenario: Closing via the close control

- **WHEN** a desktop visitor activates the overlay's close control
- **THEN** the overlay closes and the underlying page becomes visible and scrollable again

#### Scenario: Closing via Escape

- **WHEN** the desktop overlay is open and the visitor presses Escape
- **THEN** the overlay closes

### Requirement: The desktop overlay locks background scroll while open

While the desktop overlay is open, the system SHALL prevent the page behind it from
scrolling, and SHALL restore the visitor's prior scroll position when it closes.

#### Scenario: Background does not scroll while the overlay is open

- **WHEN** the desktop overlay is open
- **THEN** attempting to scroll does not move the page behind the overlay

#### Scenario: Scroll position is restored on close

- **WHEN** the desktop overlay closes
- **THEN** the page returns to the same scroll position it was at before the overlay opened

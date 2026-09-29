## ADDED Requirements

### Requirement: Site-wide navigation indicates the active route

The site-wide navigation SHALL visually distinguish the link corresponding to the currently
active route from the other route links, on both the desktop and the mobile navigation
layouts, in both locales.

#### Scenario: Desktop navigation marks the active route

- **WHEN** a visitor on `/en/services` (or its `/zh` equivalent) views the desktop navigation
- **THEN** the "Services" link is rendered with a distinct visual treatment from the other
  route links
- **AND** no other route link carries that treatment

#### Scenario: Mobile navigation marks the active route

- **WHEN** a visitor on `/en/artists` (or its `/zh` equivalent) opens the mobile navigation
  menu
- **THEN** the "Artists" link is rendered with a distinct visual treatment from the other
  route links
- **AND** no other route link carries that treatment

#### Scenario: A detail page under a route is treated as that route

- **WHEN** a visitor views the navigation on `/en/portfolio/some-project` (a page nested
  under the Portfolio route but not itself a linked route)
- **THEN** the "Portfolio" link is marked as active, matching the section the page belongs to

#### Scenario: No route is active on a page outside the route table

- **WHEN** a visitor views the navigation on a page with no matching route segment (e.g.
  `/styleguide`)
- **THEN** no route link is marked as active

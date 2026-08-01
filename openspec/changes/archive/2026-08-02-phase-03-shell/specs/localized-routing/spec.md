## ADDED Requirements

### Requirement: The full route table resolves under both locales

Every route in `openspec/reference/routes.md` SHALL resolve under both the `en` and the `zh`
prefix. Route slugs SHALL be identical in both locales — the locale prefix is the only part of
the path that varies.

#### Scenario: Every static route resolves in both locales

- **WHEN** any of `/about`, `/services`, `/portfolio`, `/artists`, `/news`, `/contact` is
  requested under either locale prefix
- **THEN** the page renders with HTTP 200 in the requested locale

#### Scenario: Slugs are not translated

- **WHEN** a Chinese page URL is constructed for a route
- **THEN** the path segment after `/zh` matches the English one exactly (for example
  `/zh/about`, not a transliterated or translated segment)

### Requirement: Unknown paths under a valid locale 404

A path with a valid locale prefix but no matching route SHALL return 404. It SHALL NOT render
the site shell with an empty body, and SHALL NOT redirect to the locale home page.

#### Scenario: Nonexistent page under a valid locale

- **WHEN** a visitor requests `/en/nonexistent` or `/zh/nonexistent`
- **THEN** the site responds with 404 Not Found

#### Scenario: Detail route with an unknown slug

- **WHEN** a visitor requests a `portfolio/[slug]` or `news/[slug]` path whose slug was not
  generated at build time
- **THEN** the site responds with 404 Not Found rather than rendering an empty detail page

### Requirement: Every page offers its cross-locale counterpart

Every page SHALL expose a control that navigates to the same page in the other locale. The
current path SHALL be preserved across the switch — switching locale SHALL NOT return the
visitor to the home page.

#### Scenario: Switching locale from a non-home page

- **WHEN** a visitor on `/en/portfolio` activates the locale switcher
- **THEN** the browser navigates to `/zh/portfolio`

#### Scenario: Switching back

- **WHEN** a visitor on `/zh/news` activates the locale switcher
- **THEN** the browser navigates to `/en/news`

### Requirement: Every page declares its locale alternates

Every page SHALL emit a canonical URL for itself and `hreflang` alternates naming both locale
variants of that same page. Alternates SHALL point at the corresponding page, not at the
locale home page.

#### Scenario: A subpage declares alternates

- **WHEN** the document head of `/en/services` is inspected
- **THEN** it contains a canonical link for `/en/services`
- **AND** `hreflang` alternates for `/en/services` and `/zh/services`

### Requirement: Site-wide navigation is present on every page

Every page SHALL render the site header and the site footer. Their route links SHALL be
generated from one shared route table rather than declared per page, so a route added or
renamed in one place cannot leave a stale link elsewhere.

#### Scenario: Navigation links stay within the active locale

- **WHEN** a visitor on any `/zh` page activates a header or footer route link
- **THEN** the destination path carries the `/zh` prefix

#### Scenario: No navigation link 404s

- **WHEN** every link rendered by the header and the footer is requested in turn, in both
  locales
- **THEN** each responds with HTTP 200

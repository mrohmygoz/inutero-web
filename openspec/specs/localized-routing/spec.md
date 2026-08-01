## Purpose

Defines how an incoming URL resolves to one of the site's two locales, how the resolved locale
is exposed to the page and to CSS, and how an incomplete translation is surfaced. Every route
on the site sits behind this behavior, so it is fixed here once rather than per page.

## Requirements

### Requirement: Supported locales

The site SHALL support exactly two locales, `en` and `zh` (Traditional Chinese). Every page
SHALL be reachable under an explicit locale prefix, and no page SHALL be reachable without one.

#### Scenario: Both locale prefixes resolve

- **WHEN** a visitor requests `/en` or `/zh`
- **THEN** the corresponding localized page renders with HTTP 200

#### Scenario: No unprefixed duplicate exists

- **WHEN** a page path is requested without a locale prefix (for example `/about`)
- **THEN** the site SHALL NOT serve page content at that URL

### Requirement: Bare root redirects to the default locale

The site SHALL redirect `/` to `/en`. The redirect SHALL be temporary, not permanent, so the
default locale can change later without stale client-side caches.

#### Scenario: Visitor lands on the bare root

- **WHEN** a visitor requests `/`
- **THEN** the site responds with a redirect to `/en`
- **AND** the redirect is not marked permanent

### Requirement: Unknown locale segments are rejected

A locale segment that is neither `en` nor `zh` SHALL produce a 404. It SHALL NOT fall back to
the default locale, and it SHALL NOT render a partially localized page.

#### Scenario: Unsupported locale requested

- **WHEN** a visitor requests `/fr` or `/en-US`
- **THEN** the site responds with 404 Not Found

### Requirement: Both locales are generated at build time

Both locales SHALL be pre-rendered statically. No locale resolution SHALL depend on request
headers, cookies, or client-side state.

#### Scenario: Build produces both locales

- **WHEN** the production build runs
- **THEN** static output exists for both the `en` and `zh` variants of every static route

#### Scenario: Locale is not inferred from the request

- **WHEN** a visitor with an `Accept-Language: zh-TW` header requests `/en`
- **THEN** the English page is served unchanged

### Requirement: Resolved locale is exposed via the document language

The rendered document SHALL carry a `lang` attribute matching the resolved locale. Locale-
dependent styling — in particular the Chinese type scale — SHALL key off that attribute rather
than off any runtime state.

#### Scenario: Chinese page declares its language

- **WHEN** a visitor requests any `/zh` route
- **THEN** the document root carries `lang="zh"`
- **AND** the Chinese type scale is applied

#### Scenario: English page declares its language

- **WHEN** a visitor requests any `/en` route
- **THEN** the document root carries `lang="en"`

### Requirement: Missing translations fail the build

Localized copy SHALL be complete for both locales. A key present for one locale and absent for
the other SHALL fail the build or type-check. The site SHALL NOT render text from the other
locale in its place, and SHALL NOT render an empty string or a raw key.

#### Scenario: A translation key is missing

- **WHEN** a key exists in the English dictionary but not in the Chinese one
- **THEN** the build or type-check fails with an error naming the missing key

#### Scenario: No silent cross-locale fallback

- **WHEN** the Chinese page renders
- **THEN** no English string is substituted for a missing Chinese one

### Requirement: The styleguide route is excluded from indexing

`/styleguide` is an internal review surface. It SHALL be served in the application, SHALL be
excluded from search indexing, and SHALL be excluded from the sitemap. It is the only route
permitted to sit outside the locale segment.

#### Scenario: Styleguide is reachable but not indexable

- **WHEN** `/styleguide` is requested
- **THEN** the page renders with HTTP 200
- **AND** the response instructs crawlers not to index it

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

## Purpose

Defines how an incoming URL resolves to one of the site's two locales, how the resolved locale
is exposed to the page and to CSS, and how an incomplete translation is surfaced. Every route
on the site sits behind this behavior, so it is fixed here once rather than per page.

## ADDED Requirements

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

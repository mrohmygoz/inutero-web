## Purpose

Defines how long-form editorial content — portfolio project narratives and news articles —
enters the site: where the files live, what each must declare, how a file becomes a route in
both locales, and how an incomplete or malformed content set fails the build rather than
degrading silently at runtime. Visual treatment of the rendered body is not specified here; the
Figma `CMS` component is its source of truth.

## ADDED Requirements

### Requirement: Content lives in the repository and is read at build time

Long-form content SHALL be authored as MDX files committed to the repository, organized by
content type and then by locale. No content SHALL be fetched at request time, and no external
content service SHALL be contacted during a build or a request.

#### Scenario: Content is resolved during the build

- **WHEN** the production build runs
- **THEN** every content file is read from the repository and its route pre-rendered
- **AND** no network request is issued to obtain content

#### Scenario: Content is not readable from the public URL space

- **WHEN** a visitor requests the path of a content source file directly
- **THEN** the site responds with 404 rather than serving the raw MDX

### Requirement: A content file's basename is its slug

Each content file's filename, minus its extension, SHALL be the slug used in the URL. A slug
SHALL NOT be declared in frontmatter, so that a file cannot disagree with the route it produces.

#### Scenario: File maps to a route

- **WHEN** a news article file named `example-story.mdx` exists in the English content directory
- **THEN** `/en/news/example-story` is generated

#### Scenario: Same slug in both locales

- **WHEN** a slug exists under both locale directories for a content type
- **THEN** both `/en/<type>/<slug>` and `/zh/<type>/<slug>` are generated
- **AND** each renders the body authored in its own locale's file

### Requirement: Every content file declares typed frontmatter

Each content file SHALL declare frontmatter containing at minimum a title, a publication date,
and an excerpt. Frontmatter SHALL be validated at build time; a file missing a required field,
or declaring a field of the wrong type, SHALL fail the build with a message naming the file and
the offending field.

#### Scenario: Required field missing

- **WHEN** a content file omits a required frontmatter field
- **THEN** the build fails
- **AND** the failure message names both the file path and the missing field

#### Scenario: Field of the wrong type

- **WHEN** a content file declares a frontmatter field with a value of the wrong type
- **THEN** the build fails rather than coercing the value

### Requirement: Missing translations fail the build

A slug present under one locale but absent under the other, for the same content type, SHALL
fail the build. Content SHALL NEVER fall back to the other locale, and a missing translation
SHALL NOT produce a 404 at request time in place of a build failure.

#### Scenario: Slug exists in only one locale

- **WHEN** a content file exists in the English directory with no counterpart of the same slug
  in the Chinese directory
- **THEN** the build fails
- **AND** the failure message names the slug, the content type, and the locale that lacks it

#### Scenario: No silent fallback

- **WHEN** a Chinese content route is rendered
- **THEN** its body originates from the Chinese file only, never from the English file

### Requirement: Detail routes are generated from the content set

The `portfolio/[slug]` and `news/[slug]` routes SHALL enumerate their build-time parameters from
the content directories. No slug SHALL be hardcoded in route code.

#### Scenario: Adding a file adds a route

- **WHEN** a new content file is added to both locale directories and the site is rebuilt
- **THEN** the corresponding route exists in both locales with no change to route code

#### Scenario: Unknown slug still 404s

- **WHEN** a visitor requests a detail path whose slug has no content file
- **THEN** the site responds with 404 Not Found

### Requirement: The rendered body is styled by the site's own type system

MDX body output SHALL be rendered through the site's shared body renderer, which maps document
elements to the site's typography and spacing tokens. No content element SHALL render with
browser default styling, and the renderer SHALL apply the locale-appropriate type scale.

#### Scenario: Body elements are styled

- **WHEN** an article body containing headings, paragraphs, lists, a blockquote, and an image is
  rendered
- **THEN** each element carries the site's designed typography and spacing rather than the
  browser default

#### Scenario: Chinese bodies use the Chinese type scale

- **WHEN** a Chinese content route is rendered
- **THEN** its body displays the Chinese type scale, not the English one

#### Scenario: Raw markup in content does not escape the renderer

- **WHEN** a content file contains an element the renderer does not map
- **THEN** it still renders within the body container's width and spacing constraints

## Purpose

Defines the behavior every shared UI primitive on the site must exhibit — how it receives its
locale, how it behaves across the two designed breakpoints, and how it stays reviewable on
`/styleguide`. Visual appearance is not specified here; the Figma file is its source of truth.
This contract exists so the page phases that follow compose primitives rather than re-deriving
them, and so a primitive cannot regress unnoticed.

## ADDED Requirements

### Requirement: Locale is an explicit input to a primitive

A primitive that renders locale-dependent content or applies a locale-dependent style SHALL
receive the locale as an explicit input from its caller. It SHALL NOT read the locale from
client-side state, from a browser API, or from a request header.

#### Scenario: The same primitive renders both locales on one page

- **WHEN** two instances of the same primitive are rendered on a single page, one given `en`
  and one given `zh`
- **THEN** each renders its own locale's content and type treatment independently of the other

#### Scenario: No client-side locale lookup

- **WHEN** a primitive renders
- **THEN** its output does not depend on any value read at runtime in the browser

### Requirement: One primitive serves both designed breakpoints

Each primitive SHALL be a single component whose layout adapts responsively between the 393px
and 1440px designs. A primitive SHALL NOT be implemented as two separate components, and SHALL
NOT render its content twice with one copy hidden per breakpoint.

#### Scenario: Content appears once in the document

- **WHEN** a primitive is rendered and the document is inspected
- **THEN** its text content appears exactly once, regardless of viewport width

#### Scenario: Layout adapts without a reload

- **WHEN** the viewport is resized from 393px to 1440px
- **THEN** the primitive adopts its desktop layout without a page reload or a re-fetch

### Requirement: Primitives render without client-side JavaScript

A primitive whose design specifies no interactive behavior SHALL render its full content
during server rendering and SHALL require no client-side JavaScript to display correctly.

#### Scenario: JavaScript is unavailable

- **WHEN** a page containing non-interactive primitives is loaded with JavaScript disabled
- **THEN** every primitive's content and layout render as they do with JavaScript enabled

### Requirement: Every primitive variant is reviewable on the styleguide

`/styleguide` SHALL render every shared primitive, in every variant the design defines for it,
in both locales. A primitive added to `app/_components/` without a corresponding styleguide
specimen SHALL be treated as incomplete.

#### Scenario: A newly added primitive is reviewable

- **WHEN** a shared primitive is added in any phase
- **THEN** `/styleguide` renders at least one specimen of it per designed variant, per locale

#### Scenario: Chinese specimens carry the Chinese type scale

- **WHEN** the Chinese specimens on `/styleguide` are rendered
- **THEN** they sit within an element declaring `lang="zh"`
- **AND** they display the Chinese type scale rather than the English one

#### Scenario: The styleguide stays out of the index

- **WHEN** `/styleguide` is extended with primitive specimens
- **THEN** it continues to instruct crawlers not to index it and remains absent from the sitemap

### Requirement: A primitive's designed states are distinguishable

Where the design defines more than one state for a primitive — for example a tag's default and
active states — each state SHALL be selectable by the caller and SHALL be visually distinct
from the others.

#### Scenario: Both tag states render

- **WHEN** a tag is rendered in its default state and again in its active state
- **THEN** the two render differently from one another
- **AND** the state is determined by the caller, not by user interaction alone

# email-signup-validation Specification

## Purpose

Gives the site's two newsletter email fields (`NewsletterSignup`, `Footer`) client-side
format validation and a success confirmation on submit. A syntactically valid email is sent
to the site's own `/api/newsletter` endpoint for persistence, per the
`newsletter-signup-storage` capability.

## Requirements

### Requirement: Invalid email format is rejected visibly
When the user submits the newsletter signup field with a value that is not a valid email
format, the system SHALL NOT proceed to the success confirmation, and SHALL visibly mark the
field as invalid until the user corrects it.

#### Scenario: Empty field submitted
- **WHEN** the user clicks the signup button with the email field empty
- **THEN** the field's placeholder text and bottom border render in the error color
- **AND** no success confirmation appears

#### Scenario: Malformed email submitted
- **WHEN** the user clicks the signup button with a value lacking an `@` or a domain
  (e.g. `foo`, `foo@`, `foo@bar`)
- **THEN** the field's placeholder text and bottom border render in the error color
- **AND** no success confirmation appears

#### Scenario: Error state clears on retry
- **WHEN** the field is in the error state and the user edits the value and resubmits a
  valid email
- **THEN** the error color is removed and the success confirmation appears

### Requirement: Valid email shows a success confirmation and is persisted
When the user submits the newsletter signup field with a syntactically valid email address,
the system SHALL send that email for persistence (per the `newsletter-signup-storage`
capability) and SHALL show a success confirmation once persistence is accepted.

#### Scenario: Valid email submitted
- **WHEN** the user clicks the signup button with a syntactically valid email
  (e.g. `person@example.com`)
- **THEN** the email is sent to the signup storage endpoint
- **AND** on success, a success confirmation modal opens, confirming the signup
- **AND** the email field is cleared once the confirmation is dismissed

#### Scenario: Success confirmation is dismissible
- **WHEN** the success confirmation modal is open
- **THEN** the user can close it via a close control, the Escape key, or clicking outside it
- **AND** closing it by any method returns the field to its empty, default state

#### Scenario: Persistence request fails
- **WHEN** the user submits a syntactically valid email and the persistence request fails
  (network error, rate limit, server error)
- **THEN** the success confirmation modal does NOT open
- **AND** the field does NOT silently clear as if the signup succeeded

### Requirement: No email is transmitted or stored beyond the signup capability
The newsletter signup fields SHALL perform format validation client-side. A syntactically
valid email SHALL be transmitted only to the site's own signup storage endpoint, and SHALL
NOT be sent to any third-party service or logged anywhere beyond that endpoint's own
persistence (per `newsletter-signup-storage`).

#### Scenario: Valid submission triggers exactly one request, to the site's own endpoint
- **WHEN** a valid email is submitted on either newsletter field
- **THEN** exactly one HTTP request carrying the email value is made
- **AND** that request targets the site's own `/api/newsletter` endpoint, not a third party

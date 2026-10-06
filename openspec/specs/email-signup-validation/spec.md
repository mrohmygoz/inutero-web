# email-signup-validation Specification

## Purpose

Gives the site's two newsletter email fields (`NewsletterSignup`, `Footer`) client-side
format validation and a success confirmation on submit, since no signup backend exists or
is planned.

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

### Requirement: Valid email shows a success confirmation
When the user submits the newsletter signup field with a syntactically valid email address,
the system SHALL show a success confirmation and SHALL NOT transmit the email to any backend
or endpoint.

#### Scenario: Valid email submitted
- **WHEN** the user clicks the signup button with a syntactically valid email
  (e.g. `person@example.com`)
- **THEN** a success confirmation modal opens, confirming the signup
- **AND** the email field is cleared once the confirmation is dismissed

#### Scenario: Success confirmation is dismissible
- **WHEN** the success confirmation modal is open
- **THEN** the user can close it via a close control, the Escape key, or clicking outside it
- **AND** closing it by any method returns the field to its empty, default state

### Requirement: No email is ever transmitted or stored
The newsletter signup fields SHALL perform validation and confirmation entirely client-side.
No submitted email SHALL be sent to a server, logged, or persisted by this capability.

#### Scenario: Valid submission triggers no network request
- **WHEN** a valid email is submitted on either newsletter field
- **THEN** no HTTP request carrying the email value is made

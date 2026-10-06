## Purpose

Persists validated newsletter signups (timestamp + email) so the list of signups can be
retrieved later, while deduplicating repeat signups and protecting the store from bursts.

## ADDED Requirements

### Requirement: A valid signup is persisted exactly once per email
When a syntactically valid, not-yet-seen email is submitted, the system SHALL persist a
record containing the email and the signup timestamp, keyed so that a later signup with the
same email (case-insensitively) does not create a second record.

#### Scenario: First signup for an email
- **WHEN** a syntactically valid email that has never signed up before is submitted
- **THEN** a record containing that email and the current timestamp is persisted
- **AND** the signup is reported to the caller as successful

#### Scenario: Repeat signup for the same email
- **WHEN** a syntactically valid email that has already signed up is submitted again
  (regardless of letter case)
- **THEN** no new record is persisted and the existing record's timestamp is unchanged
- **AND** the signup is still reported to the caller as successful, identically to a first
  signup (the response does not reveal whether the email was already present)

### Requirement: Accepted writes are globally rate-limited
The system SHALL accept at most one new signup write per second, across all callers and
requests, regardless of source.

#### Scenario: Two new signups within the same second
- **WHEN** two submissions for two different, previously-unseen emails arrive less than one
  second apart
- **THEN** at most one of them is persisted as a new record within that one-second window
- **AND** the other is rejected or deferred, not silently dropped as if it succeeded

#### Scenario: Repeat signup does not consume rate-limit budget
- **WHEN** a submission is for an email that already has a persisted record
- **THEN** the no-op outcome does not count against the one-write-per-second budget

### Requirement: Stored signup records are not publicly readable
The system SHALL store signup records such that the email and timestamp are not retrievable
by an unauthenticated third party guessing or enumerating storage locations.

#### Scenario: Record location does not reveal the email in plain form
- **WHEN** a signup record is persisted
- **THEN** its storage location/identifier does not contain the plaintext email address

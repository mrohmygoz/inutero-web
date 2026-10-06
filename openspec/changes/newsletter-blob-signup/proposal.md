## Why

The newsletter fields (`NewsletterSignup`, `Footer`) currently validate format client-side
and discard every email on success (Phase 16d, D029/D105/D116: no backend existed or was
planned). The client now wants real signups captured — timestamp + email — so the list can
be acted on later (export, outreach, etc.), without standing up a database.

## What Changes

- New `POST /api/newsletter` Route Handler: validates the email, rate-limits globally to 1
  accepted write/second, and persists `{ email, timestamp }` to Vercel Blob.
- Blob storage shape: one private blob per signup at `newsletter/<sha256(lowercased
  email)>.json`. The hash keys the pathname so an existence check (`head()`) is O(1) and
  doubles as dedup — resubmitting an already-signed-up email is a no-op that still reports
  success (no enumeration signal).
- Global rate limiting requires a small external counter store (Vercel KV or Upstash) since
  Route Handlers are stateless across invocations/regions — this is a new infra dependency
  beyond Blob alone.
- New shared `useNewsletterSignup()` hook replacing the duplicated local
  validate/invalid/success state in `NewsletterSignup.tsx` and `Footer.tsx`. Both keep their
  own markup; only the submit behavior (validate → POST → modal) is shared.
- **BREAKING** (behavioral, not API): the existing `email-signup-validation` spec's
  "No email is ever transmitted or stored" requirement no longer holds — this change
  supersedes it with a delta.

## Capabilities

### New Capabilities
- `newsletter-signup-storage`: persisting validated newsletter signups (timestamp + email)
  to Vercel Blob, with dedup-by-pathname and a global rate limit on accepted writes.

### Modified Capabilities
- `email-signup-validation`: the "No email is ever transmitted or stored" requirement is
  replaced — a syntactically valid email now IS transmitted to `/api/newsletter` and stored,
  subject to the new capability's dedup/rate-limit rules. Client-side format validation and
  the success-modal UX are unchanged.

## Impact

- New: `app/api/newsletter/route.ts`, `app/_components/useNewsletterSignup.ts` (or similar).
- Modified: `app/_components/NewsletterSignup.tsx`, `app/_components/Footer.tsx`.
- New dependencies: `@vercel/blob`, a KV/rate-limit client (e.g. `@vercel/kv` or
  `@upstash/ratelimit` + `@upstash/redis`).
- New infra to provision: a private Vercel Blob store, a Vercel KV (or Upstash Redis)
  instance, both via Vercel env vars per CLAUDE.md's existing secrets convention.
- Open items to verify during apply (not design decisions, fact-checks): whether Private
  Blob access is available on the current Vercel plan; KV/Upstash is being provisioned
  fresh (confirmed not already provisioned).

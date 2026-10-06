## Context

See `proposal.md` → Why. The relevant existing code: `app/_components/NewsletterSignup.tsx`
and `app/_components/Footer.tsx` each hold their own local `email`/`invalid`/`success` state
and call `isValidEmail` from `app/_components/emailValidation.ts` before opening
`EmailSignupSuccessModal`. Neither transmits anything today (Phase 16d, D116).

## Goals / Non-Goals

**Goals**: persist validated signups durably; dedupe by email; protect the store from bursts
with a hard global cap; keep both call sites' existing markup/validation/modal UX unchanged.

**Non-Goals**: an admin UI or export tooling for reading the signup list back out (out of
scope — a follow-up can add a small script against the Blob API); unsubscribe flow; email
verification/confirmation (double opt-in); anything beyond the two existing signup fields.

## Decisions

### Storage: Vercel Blob, one private blob per signup, pathname = `sha256(lowercased email)`
Considered and rejected during exploration:
- **Single shared JSON/NDJSON file, appended per signup**: every write is read-entire-file +
  rewrite-entire-file. Blob has no locking/transactions, so concurrent signups race; and a
  growing single file has no natural dedup index. Rejected for both reasons.
- **Timestamp-named blob + list-and-scan dedup**: keeps chronological pathnames but every
  signup must list the whole `newsletter/` prefix and parse each blob's content to check for
  a duplicate — O(n) per signup, degrading as the list grows, and paginated past 1000 blobs.
- **Google Sheets** (via a service account): human-reviewable directly in the Sheets UI, but
  adds a Google Cloud credential to manage on top of Vercel's own, and dedup is still a
  linear column scan — no efficiency win over Blob's list-and-scan fallback. User declined
  in favor of staying inside Vercel's own credential surface.

Chosen shape wins because the existence check for dedup is a single `head()` on a
deterministic pathname — O(1), no listing, no scanning — and the hash keeps the pathname
itself from leaking the plaintext email even though Blob pathnames are otherwise guessable.
**Private** access (not Blob's public default) is required so an unauthenticated party
can't enumerate `newsletter/` or fetch a blob's content by guessing/obtaining a pathname;
public-with-hash was the fallback if Private access turns out unavailable on the current
plan (verify during apply — see Open Questions in proposal's Impact section, now resolved
to "verify, don't redesign around it").

Blob content: `{ "email": string, "timestamp": string (ISO 8601) }`. Email is also stored in
the content (not just hashed into the pathname) since the hash is one-way — reading the
list back out needs the plaintext.

### Rate limiting: global 1-accepted-write/second via Vercel's first-party Redis
Route Handlers are stateless serverless functions with no memory shared across invocations
or regions, so an in-process counter cannot enforce a *global* limit — confirmed with the
user, who wants global (not per-IP) scope. The limiter needs one small external store to
hold "timestamp of the last accepted write"; an atomic compare-and-set (or a short TTL key)
against that timestamp decides whether the current request may proceed to the Blob write.

Provisioned store: Vercel's first-party "Redis — Official Redis for Vercel" integration,
which exposes a standard TCP connection string as `REDIS_URL` — not the older REST-based
`@vercel/kv` API (`KV_REST_API_URL`/`KV_REST_API_TOKEN`). This means the client library is
`ioredis` (or `redis`), connecting over TCP, which only works in Next.js's **Node.js
runtime** — `app/api/newsletter/route.ts` must not set `export const runtime = "edge"`.
A simple `SET key value PX 1000 NX` (atomic set-if-not-exists with a 1000ms expiry) against
a single fixed key (e.g. `newsletter:ratelimit`) implements the limiter: succeeds → request
may proceed to the dedup/write step; fails (key already set) → reject with 429.

Rate limiting only gates *new* writes — a repeat signup for an already-stored email is a
no-op (per `newsletter-signup-storage`'s requirement) and does not consume the budget, since
it never reaches the write step.

### Shared client behavior: `useNewsletterSignup()` hook
Both components keep their distinct markup (confirmed distinct designs, Phase 4 survey) but
had identical behavior duplicated: validate → setInvalid/setSuccess → modal. The new
behavior (validate → POST `/api/newsletter` → setInvalid/setSuccess based on response) is
the same duplication risk doubled, so it moves into one hook consumed by both components.
The hook owns `email`, `invalid`, `success`, `submitting` state and a `handleSubmit`/
`handleDismiss` pair; each component still renders its own JSX against that state.

## Risks / Trade-offs

- **[Risk]** Dedup check + Blob write is two round trips (`head()` then `put()`), not
  atomic — a very unlikely race between two concurrent first-time signups for the *same*
  email could both pass the `head()` check before either `put()`s. → **Mitigation**: `put()`
  with Blob's `addRandomSuffix: false` (deterministic pathname) means the second write
  simply overwrites the first with a near-identical payload (same email, slightly different
  timestamp) rather than creating a duplicate — worst case is a few-millisecond timestamp
  drift, not a duplicate record. Acceptable given signup traffic is not expected to be high
  enough to hit this window in practice.
- **[Risk]** No way to read the signup list back out yet (no export UI). → **Mitigation**:
  explicitly a non-goal; `list({ prefix: "newsletter/" })` + fetch is enough for an ad hoc
  script when needed, and a real export tool can be a later change if demand shows up.
- **[Risk]** New infra (Blob store + KV/Upstash) means new env vars / new things that can be
  misconfigured in production vs. local dev. → **Mitigation**: tasks.md includes verifying
  both are provisioned and env vars set in the Vercel dashboard before considering the phase
  done, consistent with CLAUDE.md's existing secrets convention.

## Migration Plan

No existing data to migrate — this is new storage. Rollback is simply reverting the Route
Handler and hook changes; the two components' validation/modal UX is unaffected since the
hook preserves that contract exactly (per the modified spec's unchanged scenarios).

## 1. Infra provisioning

- [x] 1.1 Verify Private Blob access is available on the current Vercel plan — confirmed
      available and provisioned as Private.
- [x] 1.2 Provision a Vercel Blob store (private) for this project — done; env vars
      (`BLOB_READ_WRITE_TOKEN`, `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY`) connected to
      Production/Preview/Development.
- [x] 1.3 Provision Vercel's first-party Redis ("Redis — Official Redis for Vercel") for the
      rate-limit counter — done; connected, exposes `REDIS_URL`.
- [x] 1.4 Add `@vercel/blob` and `ioredis` to `package.json` via `npm install` (TCP
      connection string means `ioredis`/`redis`, not `@vercel/kv`'s REST client).
- [x] 1.5 Run `vercel env pull .env.local` so local dev has `BLOB_READ_WRITE_TOKEN` and
      `REDIS_URL` available.

## 2. Route Handler

- [x] 2.1 Create `app/api/newsletter/route.ts` with a `POST` handler.
- [x] 2.2 Validate the request body's email with the existing `isValidEmail` (reuse from
      `app/_components/emailValidation.ts`); reject malformed input with a 4xx response.
- [x] 2.3 Implement the global rate limit via `ioredis` against `REDIS_URL`: atomic
      `SET newsletter:ratelimit 1 PX 1000 NX` — success proceeds, failure (key already set)
      responds 429. Repeat-signup no-ops must NOT consume this budget (check dedup before
      checking rate limit).
- [x] 2.4 Compute the pathname `newsletter/<sha256(lowercased email)>.json` and `head()` it.
- [x] 2.5 If the blob exists: respond success without writing (dedup no-op).
- [x] 2.6 If the blob does not exist: `put()` `{ email, timestamp }` with `addRandomSuffix:
      false` and the plan-appropriate access mode from 1.1, then respond success.
- [x] 2.7 On any unhandled error, respond failure (5xx) — never report success without
      either confirming a dedup hit or completing the write.

## 3. Shared client hook

- [x] 3.1 Create `useNewsletterSignup()` (e.g. `app/_components/useNewsletterSignup.ts`)
      owning `email`, `invalid`, `success`, `submitting` state.
- [x] 3.2 `handleSubmit`: validate client-side first (unchanged UX, immediate feedback) →
      POST to `/api/newsletter` → `success` on 2xx, `invalid` on failure (4xx/5xx/network
      error) — a failed persistence request must not open the success modal.
- [x] 3.3 `handleDismiss`: unchanged from current behavior (clear email, reset state).

## 4. Wire up both call sites

- [x] 4.1 Refactor `NewsletterSignup.tsx` to consume `useNewsletterSignup()` instead of its
      local state; markup unchanged.
- [x] 4.2 Refactor `Footer.tsx`'s newsletter block to consume the same hook; markup
      unchanged.

## 5. Specs housekeeping

- [x] 5.1 Confirm `openspec/changes/newsletter-blob-signup/specs/email-signup-validation/
      spec.md` and `specs/newsletter-signup-storage/spec.md` match the implemented behavior
      exactly (dedup-is-silent-success, failure-keeps-modal-closed, single own-endpoint
      request).

## 6. Verification

- [x] 6.1 Manual test: submit a new email → 2xx, blob exists at the expected pathname with
      correct content, success modal opens.
- [x] 6.2 Manual test: resubmit the same email (same and different letter case) → 2xx,
      success modal opens identically, no second blob/overwrite with a materially different
      timestamp.
- [x] 6.3 Manual test: fire two new-email submissions within 1 second → confirm only one is
      accepted as a new write.
- [x] 6.4 Manual test: simulate a persistence failure (e.g. temporarily bad env var) →
      confirm the success modal does NOT open and the field is not silently cleared.
- [ ] 6.5 Run both signup fields at 393px and 1440px, in `/en` and `/zh`, confirming no
      visual regression (markup unchanged) — both breakpoints and locales per project
      convention.
- [x] 6.6 `npm run lint` and `npx tsc --noEmit` pass.

## 7. Documentation

- [x] 7.1 Update `app/_components/INVENTORY.md` with the new `useNewsletterSignup` hook.
- [x] 7.2 Append a decision to `openspec/DECISIONS.md` recording the storage shape, the
      Blob-vs-Sheets choice, and the rate-limit scope (global vs. per-IP), per this
      session's exploration.
- [x] 7.3 Update `openspec/reference/roadmap.md` to record this change (it sits outside the
      numbered Figma-phase sequence — a backend addition, not a UI phase — note that
      explicitly so it isn't mistaken for "Phase 17").

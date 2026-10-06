## Why

`NewsletterSignup` (News, News Details) and `Footer`'s own newsletter block both render an
email field and a submit button that are currently inert markup (D029) — no `<form>`, no
`action`, no feedback of any kind. The client wants the fields to actually respond: reject an
invalid email visibly, and confirm a valid one with a success notification. No signup
endpoint exists or is planned (D029/D105 stand — this phase adds no Route Handler), so the
behavior is entirely client-side: format validation plus a client-side success confirmation.

## What Changes

- `NewsletterSignup.tsx` and `Footer.tsx`'s newsletter block both become client components
  with submit handling (**BREAKING** for `NewsletterSignup`'s existing `action` prop contract
  — see Impact).
- On submit, the email is validated against a simple format check (not the native HTML5
  `type="email"` bubble, which can't be restyled to match the brand).
  - **Invalid:** the field's placeholder text and bottom border switch to
    `--color-brand-accent-orange` (no red token exists in the design system; reusing the
    existing orange accent avoids inventing one — Decision D114). No submission occurs.
  - **Valid:** a new shared `EmailSignupSuccessModal` component opens — a centered, small
    modal dialog confirming the signup, dismissible via close button, Escape, or backdrop
    click. The field resets on dismiss. Still no data is sent or stored anywhere.
- New EN/ZH copy strings for the success modal's heading/body/close label (flagged
  non-final, same precedent as other AI-authored copy in this project).
- `app/_components/INVENTORY.md` gains an entry for `EmailSignupSuccessModal`.

## Capabilities

### New Capabilities
- `email-signup-validation`: client-side email format validation and success-confirmation
  behavior for the site's two newsletter signup fields (`NewsletterSignup`, `Footer`).

### Modified Capabilities
(none — no existing spec covers signup behavior; this is wholly new)

## Impact

- `app/_components/NewsletterSignup.tsx` — becomes a client component; its `action` prop
  (previously a submit URL enabling a real `<form>`) is replaced by the new validate/confirm
  behavior, since no endpoint exists to pass as `action` anyway. **BREAKING** for any future
  caller that expected the old `action` prop to do a real submission — none exists today
  (grep confirms every call site omits `action`).
- `app/_components/Footer.tsx` — its newsletter block (currently a non-`<form>` div per D029)
  gains the same handler; `Footer` becomes a client component. It composes the same
  validation logic as `NewsletterSignup` but keeps its own markup (D029's "different design"
  finding still holds — this phase changes behavior, not visual structure).
- New file: `app/_components/EmailSignupSuccessModal.tsx`, used by both.
- `app/_lib/i18n/{en,zh}/common.ts` and/or `newsletter.ts`/`contact.ts`-style dictionary —
  new copy keys for the success modal.
- `openspec/DECISIONS.md` — new entry D114 (error color reuse) and D115 (modal pattern,
  client-component conversion rationale).
- No new dependencies, no new routes, no backend.

## 1. Shared success modal

- [x] 1.1 Build `app/_components/EmailSignupSuccessModal.tsx` — centered overlay, dim
      backdrop, `role="alertdialog"`, focus trap, closes on Escape/backdrop click/close
      button.
- [x] 1.2 Add EN/ZH copy for the modal (heading/body/close label) to the i18n dictionaries,
      flagged non-final.
- [x] 1.3 Add `/styleguide` specimen for the modal's open state.

## 2. Validation logic

- [x] 2.1 Add the shared email-format validation check (used by both components).
- [x] 2.2 Add the invalid/error visual state (placeholder + bottom border →
      `--color-brand-accent-orange`) to `/styleguide`'s `NewsletterSignup` specimen.

## 3. `NewsletterSignup` wiring

- [x] 3.1 Convert `NewsletterSignup.tsx` to a client component; remove the unused `action`
      prop and the dead `<form action>` branch.
- [x] 3.2 Wire submit handler: invalid → error state; valid → open
      `EmailSignupSuccessModal`, clear field on dismiss.
- [x] 3.3 Update `app/_components/INVENTORY.md` for `NewsletterSignup`'s new behavior and
      the new `EmailSignupSuccessModal` entry.

## 4. `Footer` wiring

- [x] 4.1 Convert `Footer.tsx` to a client component.
- [x] 4.2 Wire the same validation + success-modal behavior into Footer's own newsletter
      markup (keep its distinct visual structure per D029).
- [x] 4.3 Update `app/_components/INVENTORY.md`'s `Footer` entry.

## 5. Verification

- [x] 5.1 `npm run lint` and `npx tsc --noEmit`.
- [x] 5.2 Playwright: both fields, both breakpoints (393px/1440px), both locales — empty
      submit, malformed submit, valid submit, modal dismiss via all three methods.
- [x] 5.3 Confirm via network tab / `read_network_requests` that no request fires on valid
      submission.
- [x] 5.4 Append D114–D116 to `openspec/DECISIONS.md`.
- [x] 5.5 Tick Phase 16d in `openspec/reference/roadmap.md`.

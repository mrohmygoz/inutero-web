## Why

Phase 15 is next in the roadmap (`openspec/reference/roadmap.md`) — the last content page
before Phase F polish. It builds `/[locale]/contact`, the final stub route still rendering
`PagePlaceholder`.

## What Changes

- Build `/[locale]/contact` at both breakpoints (393px, 1440px) and both locales (`en`, `zh`),
  covering Figma nodes: Desktop EN `12612:8829`, Desktop TC `12635:12930`, Mobile EN
  `12212:5283`, Mobile TC `12368:2766` (`design-inventory.md`).
- Header (tagline `GET IN TOUCH` / eyebrow, heading `CONTACT US` / 聯絡我們, body copy) —
  copy from `content-matrix.md` → Contact.
- Four department contact rows (Business Inquiries, Artist Management, PR & Marketing,
  General Inquiries), each an email — using the matrix's corrected `bonnie@inuteromusic.com`
  for PR & Marketing (Figma's `ray@inuteromusic.com` is stale).
- "Follow us" social row (Facebook, Instagram, YouTube, Podcast — same four destinations as
  the Footer, per D032 conflict #2).
- `NewsletterSignup` band, reused verbatim (no `action`, per D029 — no endpoint exists).
- Contact form fields render as **inert view markup only** — no `<form>` element, no submit
  handler, no Route Handler. **User decision, 2026-09-29**: Phase 15 ships the visual form
  only; wiring a real submit target (Route Handler + email provider, vs. a third-party form
  service) is deferred to a later phase. This resolves the open question in
  `design-inventory.md` / `roadmap.md` — see Decisions.
- Update `openspec/reference/roadmap.md`: tick Phase 15, record the form-wiring deferral.
- Update `app/_components/INVENTORY.md` if any new shared component is extracted.
- Append the form-deferral decision to `openspec/DECISIONS.md`.

## Capabilities

No spec-level behavior changes. This phase renders a static page from already-established
patterns (locale routing, shared components, content-matrix copy) — it introduces no new
capability and modifies no existing capability's requirements. `skip_specs: true` is set in
`.openspec.yaml`.

## Impact

- New: `app/[locale]/contact/page.tsx`, page-local `_components/` (hero/header, contact rows,
  social row, inert form view).
- Possibly extends `app/_lib/i18n/{en,zh}/contact.ts` copy dictionaries (D010 pattern).
- Reuses `NewsletterSignup`, `Eyebrow`, and any existing form-field primitives — no new shared
  component expected unless a genuinely new pattern (e.g. a text input/textarea shell) is
  needed, in which case it lands in `app/_components/` with an `INVENTORY.md` entry.
- No Route Handler, no new dependency, no environment variable.

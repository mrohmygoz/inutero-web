## Context

See proposal.md - Why. Both newsletter fields are currently server components rendering
inert markup (D029). No Figma frame specifies invalid/valid states for either field — the
user explicitly asked for this to be designed, not derived from a reaction. There is no
error/red token in the design system and no modal/dialog/toast component anywhere in the
codebase.

## Goals / Non-Goals

**Goals:**
- Give both newsletter fields real client-side validation and a success confirmation.
- Keep the behavior and its visual language consistent across both fields, even though they
  keep separate markup (per D029's "different designs" finding).
- Introduce the smallest new surface area: no new token unless nothing existing fits, no
  new dependency.

**Non-Goals:**
- No backend submission, storage, or logging of the email (D029/D105 still hold).
- No change to either field's valid-state visual design — only the invalid and
  post-success states are new.
- No tablet-specific behavior beyond what naturally falls out of each field's existing
  responsive layout (neither field has breakpoint-specific validation behavior to derive).

## Decisions

**D114 — Error color reuses `--color-brand-accent-orange`, no new token added.**
The design system has zero red/error tokens (confirmed against design-tokens.md and
globals.css — only green/neon/orange/yellow brand accents exist). Introducing a new color
token for a single interaction state, sourced from nowhere in Figma, risks looking more
"official" than it is. Reusing the existing orange accent signals "alert" using a color
already load-bearing elsewhere in the brand, and keeps `/styleguide`'s token list honest —
no entry gets added for a color Figma never specified. Alternative considered: add
`--color-basic-error` (e.g. `#ef4444`) — rejected as inventing a token with no design
provenance, for a one-off case.

**D115 — Success confirmation is a new shared `EmailSignupSuccessModal`, not a toast.**
User chose "small pop-up window" explicitly. Built as a centered overlay with a dim
backdrop, `role="alertdialog"`, focus trap, and Escape/backdrop/close-button dismissal — the
accessible baseline for any first modal in a codebase that has never had one. Shared by both
`NewsletterSignup` and `Footer` rather than duplicated, since the confirmation copy and
behavior are identical regardless of which field triggered it.

**D116 — Both newsletter components convert from server to client components.**
D029's "inert markup, no `<form>`, no `action`" reasoning assumed no interactivity was
possible without a backend. That premise no longer holds: validation and the success modal
are real interactivity that requires client state (`"use client"`), even with zero network
calls. `NewsletterSignup`'s `action` prop is removed rather than kept dead — no call site
ever passed one (confirmed by grep), and keeping an unused escape hatch for a submission
path that still doesn't exist would be a half-finished abstraction.

**Validation regex.** A pragmatic format check (`^[^\s@]+@[^\s@]+\.[^\s@]+$`), not full
RFC 5322 and not the browser's native `type="email"` constraint validation API (which
can't be restyled to use the brand's error color — browser-native validation bubbles are
unstyleable). Sufficient for a marketing-site signup field; no account creation or email
delivery depends on this being exhaustive.

## Risks / Trade-offs

- [Risk] First modal in the codebase — no existing focus-trap/portal pattern to follow →
  Mitigation: keep it minimal (no portal needed; fixed-position overlay within the existing
  DOM tree is sufficient for a site with no other overlapping overlays), and document the
  pattern in `INVENTORY.md` so the next modal (if any) reuses it instead of inventing again.
- [Risk] Converting `Footer` to a client component changes its render boundary (it's used in
  every page's layout) → Mitigation: the rest of `Footer`'s content (static links) has no
  server-only data dependency, so the conversion has no behavioral side effect beyond adding
  the hydration needed for the newsletter block itself.
- [Risk] Orange as both the error color and an existing CTA/brand accent could read as
  ambiguous if used elsewhere nearby → Mitigation: confirmed orange is not otherwise used in
  either newsletter field's existing valid-state design, so there's no local collision.

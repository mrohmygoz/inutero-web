## 1. Figma context

- [x] 1.1 `/figma-design-to-code` skill, then fetch `get_design_context` + `get_screenshot`
      for all four Contact frames: Desktop EN `12612:8829`, Desktop TC `12635:12930`, Mobile
      EN `12212:5283`, Mobile TC `12368:2766`.
- [x] 1.2 Fetch `get_metadata` for the NAV instance on this page and confirm light vs. dark
      theme (add `contact` to `darkNavRoutes` only if the frame instances the dark NAV).

  **Scope correction found during 1.1** (full `get_metadata` dump of all four frames, not a
  sparse response): the Contact node has no form fields at all — header, four department
  `mailto:` rows, "Follow us", then the global `Footer` instance (which has its own
  newsletter block). `design-inventory.md`'s "the design shows the form" note and this
  file's original 3.4/3.6 were stale. User decision, 2026-09-29: build only what the frame
  contains — see `DECISIONS.md` and tasks 3.4/3.6 below (superseded, not built).

## 2. Copy

- [x] 2.1 Add `contact` entries to `app/_lib/i18n/en.ts` and `app/_lib/i18n/zh.ts` from
      `content-matrix.md` → Contact: tagline, heading, header body, four department
      labels/emails (PR & Marketing uses `bonnie@inuteromusic.com`, not Figma's stale
      `ray@inuteromusic.com`), "Follow us" label.

  Implemented as `app/_lib/i18n/{en,zh}/contact.ts` — the dictionary is already split
  per-domain (not single `en.ts`/`zh.ts` files); wired into each locale's `index.ts`.

- [x] 2.2 Confirm `tsc --noEmit` catches any key present in one dictionary but not the other
      (D010's fail-loudly contract).

## 3. Page structure

- [x] 3.1 Create `app/[locale]/contact/page.tsx` with `generateMetadata` (locale-aware
      title/description, `alternates.languages` for both locales, per CLAUDE.md → Metadata).
- [x] 3.2 Build the header (eyebrow via `Eyebrow`, heading, body) at both breakpoints, both
      locales, matching the fetched frames.
- [x] 3.3 Build the four department rows (label + `mailto:` link) as a page-local component.
- [x] 3.4 ~~Build the inert contact form view~~ — **not built**: no form exists in any of the
      four fetched frames (see 1.1 correction). Nothing to render.
- [x] 3.5 Build the "Follow us" social row, reusing the Footer's four destination URLs
      (Facebook, Instagram, YouTube, Podcast placeholder icon per D032 conflict #2).
- [x] 3.6 ~~Place `NewsletterSignup` at the page bottom~~ — **not built**: no separate
      NewsletterSignup band exists in the frame; the page ends at the global `Footer`
      (rendered by `[locale]/layout.tsx`), which already carries its own newsletter block.

## 4. Verification

- [x] 4.1 `next-devtools-mcp`: confirm no framework errors/warnings on `/en/contact` and
      `/zh/contact`. — `get_errors` returned `{"configErrors":[],"sessionErrors":[]}`.
- [x] 4.2 `playwright-cli` screenshots at 393px and 1440px, both locales; compare side-by-side
      against the Figma screenshots from step 1.1. Confirm no `<form>`/submit affordance is
      wired (matches the deliberate inert-view decision). — done via `agent-browser`
      (project's available browser-automation CLI); all four combinations match.
- [x] 4.3 `npm run lint` and `npx tsc --noEmit` both pass.

## 5. Documentation

- [x] 5.1 Append the form-deferral decision (D-next) to `openspec/DECISIONS.md`.
- [x] 5.2 Tick Phase 15 in `openspec/reference/roadmap.md`; update the "Still Open" table to
      point the form-submit-target question at the phase that will resolve it (record as an
      Inherited Work row if no phase is assigned yet).
- [x] 5.3 Add an `INVENTORY.md` entry for any new shared component (only if one is extracted
      to `app/_components/` rather than kept page-local). — none extracted; `ContactHeader`/
      `ContactDetails` stay page-local (single consumer). `Footer.tsx`'s `socialPlatforms`
      was exported (not newly created) so Contact can reuse it without duplicating the URLs.

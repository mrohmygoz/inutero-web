## 1. Figma context

- [x] 1.1 Fetch the desktop overlay frame (`12612:8541` EN / `12635:12923` TC) via Figma MCP
      — first real fetch of this node now that D045 confirms it's the correct target. Note
      whether it includes a logo (feeds task 4.2).
- [x] 1.2 Re-confirm the trigger's own measurements (`12423:8613` EN / `0:504` TC) against
      D039's recorded 75×75 green square, rather than re-deriving from memory.

## 2. Fixed trigger

- [x] 2.1 Add `showFixedTrigger` state to `Nav.tsx`, toggled by a rAF-throttled scroll
      listener against a `window.innerHeight`-derived threshold (see design.md → Decisions).
- [x] 2.2 Render the fixed trigger: `hidden lg:block fixed` positioned, visible only when
      `showFixedTrigger` is true, styled per the fetched Figma values from 1.2.
      `aria-expanded`/`aria-controls` mirroring the existing mobile toggle button's pattern.
      Toggles the shared `menuOpen` state on click.
- [x] 2.3 Confirm z-index places the trigger above the dark-theme absolute NAV bar and all
      page content (match the existing mobile overlay's `z-50`).

## 3. Desktop overlay

- [x] 3.1 Add a `hidden lg:flex` desktop branch to the existing `{menuOpen && (...)}` overlay
      block, sibling to the mobile `lg:hidden` tree — not merged into it (see design.md →
      Decisions).
- [x] 3.2 Render `CLOSE` top-right, reusing the existing `closeLabel` and close-button
      pattern from the mobile overlay.
- [x] 3.3 Render all 7 links (Home + `navRoutes`) as a single centered column, using the
      typography/spacing values fetched in 1.1 — no logo (explicit, per proposal.md).
- [x] 3.4 Render the locale switcher (reusing `swapLocale`) and social-icon row (reusing
      `socialPlatforms`), carried over from the mobile overlay markup.
- [x] 3.5 Confirm the existing Escape-key and body-scroll-lock `useEffect`s apply to the
      desktop branch unchanged (they key off `menuOpen`, not the breakpoint — verify, don't
      duplicate).

## 4. Decisions & docs

- [x] 4.1 Record decision D123 in `openspec/DECISIONS.md`: supersedes D039 (contradicted by
      D045's prototype find), the scroll-threshold-over-per-page-sentinel choice and why, and
      the final scroll-threshold value chosen.
- [x] 4.2 If the frame fetched in task 1.1 includes a logo, add an addendum to D123 recording
      the no-logo divergence as deliberate, not a gap.
- [x] 4.3 Update the `Nav` row in `app/_components/INVENTORY.md` with the new trigger/overlay
      node IDs and behavior.
- [x] 4.4 Append the phase-16h row to `openspec/reference/roadmap.md`'s phase table and tick
      it once done.

## 5. Verification

- [x] 5.1 At 1440px, both `/en` and `/zh`, on at least Home, Services, and Contact (shortest
      first section) and Services or Portfolio (tallest): scroll down and confirm the fixed
      trigger appears at roughly the intended point and disappears when scrolling back up.
- [x] 5.2 At 1440px, both locales: open the overlay via the fixed trigger, confirm all 7
      links navigate correctly, locale switch works, social icons link out, and Escape/close
      button both dismiss it with background scroll restored to the prior position.
- [x] 5.3 At 393px, both locales: confirm the existing mobile menu button and overlay are
      completely unchanged — no fixed trigger ever renders.
- [x] 5.4 Confirm the fixed trigger and open overlay both render above the dark-theme hero
      NAV bar and any page content with no stacking/clipping issues, including scrolled deep
      into the Footer.
- [x] 5.5 `npm run lint`
- [x] 5.6 `npx tsc --noEmit`

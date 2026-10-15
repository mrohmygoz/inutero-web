## 1. Assets

- [x] 1.1 Re-fetch the four images from the Figma Make file (`fileKey myqsxGwnrcNHEdsE2SFZXk`)
      at full resolution via the Figma MCP resource reads — do not reuse this session's scratch
      copies, which may be compressed/resized by the resource pipeline:
      - `src/imports/Services-1/8d0be1a1a70dc8b6053e1c955f5a7908f5b3dcab.png` → Artist Management
      - `src/imports/Services-1/bd3f92116fb1f522b1f4e8528042282e46a63612.png` → International
        Booking & Tour Planning
      - `src/imports/Services-1/bfbe2082e28a1e11ad7db053f47a33b0a140a0e4.png` → PR & Marketing
      - `src/imports/Services-1/2c6bb7d5797349a059fbc2d30ae20190bd2ab10c.png` → Event Production
- [x] 1.2 Export them into `public/images/home/` following the project's asset naming
      convention (e.g. `services-artist-management.jpg`, `services-booking-tour.jpg`,
      `services-pr-marketing.jpg`, `services-event-production.jpg`), optimized/converted the
      same way `services.jpg` was. Leave `services.jpg` in place — mobile still uses it.
      **Superseded**: the user found these four images are the same photos already exported
      to `public/images/services/service-0{1..4}-*.jpg` by an earlier phase (Services page's
      `ServicesList`). Re-exporting under `public/images/home/` duplicated existing assets;
      the duplicates were deleted and `HomeServices.tsx` points at `public/images/services/`
      instead.

## 2. Component changes

- [x] 2.1 In `app/[locale]/_components/HomeServices.tsx`, add `hoverIndex` state
      (`number | null`) scoped to the component; compute `displayIndex = hoverIndex ??
      openIndex`.
- [x] 2.2 In the desktop branch (`hidden lg:block`) only, add `onMouseEnter`/`onMouseLeave` to
      each accordion row (alongside the existing `onClick`) to set/clear `hoverIndex`. Do not
      touch the mobile branch (`lg:hidden`) — it keeps its existing single-`services.jpg`,
      `openIndex`-only behavior unchanged.
- [x] 2.3 Replace the desktop branch's single `<Image>` photo with four, absolutely positioned
      in the same box the current image uses, each `style={{ opacity: displayIndex === i ? 1 :
      0, transition: "opacity 500ms ease" }}` (respect `motion-reduce` per this file's existing
      convention on the accordion icon cross-fade).
- [x] 2.4 Verify `displayIndex` falls back to `openIndex` correctly when the pointer leaves the
      accordion entirely (not just moves between rows). Verified by code inspection
      (`onMouseLeave` sets `hoverIndex(null)`, so `displayIndex = hoverIndex ?? openIndex`
      resolves to `openIndex` unconditionally) — no interactive browser was available this
      session to confirm at runtime; see 4.1.

## 3. Decisions & docs

- [x] 3.1 Resolve design.md's open question with the user (recolor the four images into one
      consistent duotone, or ship as-is) before final visual sign-off; record the answer in
      `openspec/DECISIONS.md` alongside the "no canonical Figma reaction data — built from the
      user's own spec, citing the proto link and the Figma Make reference" decision.
- [x] 3.2 Append the phase-16f row to `openspec/reference/roadmap.md`'s phase table and tick it
      once done.
- [x] 3.3 Confirm no `app/_components/INVENTORY.md` update is needed — `HomeServices` stays
      page-local (D033/D040 unchanged by this phase).

## 4. Verification

- [ ] 4.1 At 1440px, both `/en` and `/zh`: hover each of the four accordion rows and confirm
      the background cross-fades to that row's photo; move the pointer off the accordion and
      confirm it falls back to the open row's photo; click a different row open and re-confirm
      the fallback target changed accordingly.
- [ ] 4.2 At 393px, both `/en` and `/zh`: confirm the Services section is pixel-for-pixel
      unchanged from before this phase (still single `services.jpg`, `openIndex`-only).
- [x] 4.3 `npm run lint`
- [x] 4.4 `npx tsc --noEmit`

## 1. Design context

- [x] 1.1 `/figma-design-to-code`, then fetch `get_design_context` + `get_screenshot` for the
      Gallery nodes at all four frames: desktop `12573:7449` (EN), desktop TC counterpart,
      mobile `12211:3462` (EN), mobile TC counterpart. Look up any TC node IDs not already
      recorded in `design-inventory.md`.
- [x] 1.2 Confirm from the fetched metadata whether the section is a fixed grid or a
      scroller, and its real spacing/sizing tokens (do not eyedrop — cross-reference
      `design-tokens.md`).

## 2. Content layer

- [x] 2.1 Add an optional `gallery: string[]` field to `Frontmatter`
      (`app/_lib/content/frontmatter.ts`) — portfolio-only, same optional-but-typed shape as
      `heroImage` (absent or `[]` is valid; forbidden on news, matching the other
      portfolio-only fields).
- [x] 2.2 Add `getBodyImages`/equivalent to `app/_lib/content/index.ts`: read the raw `.mdx`
      source for a given `(type, locale, slug)`, regex-match markdown image syntax outside the
      frontmatter block, in document order.
- [x] 2.3 In `getEntry`, combine `heroImage ?? image` → body images (order) → `gallery`
      entries, deduplicating by `src` across all three; expose as `ContentEntry.galleryImages:
      { src: string; alt: string }[]` (empty `alt` for bare `gallery` paths).
- [x] 2.4 Verify actual counts for the three real projects match design.md's expectation
      (`bottoms-up` low count, the other two higher, none using `gallery` yet) by logging or a
      quick script — confirms the parser and combination logic work before wiring into UI.

## 3. Gallery component

- [x] 3.1 Build `app/[locale]/portfolio/[slug]/_components/Gallery.tsx` — page-local, takes
      `images: { src: string; alt: string }[]` — rendering both breakpoints per the fetched
      Figma metadata (task 1), as a wrapping grid or scroller that handles an open-ended count
      (no fixed 4-cell assumption, no padding).
- [x] 3.2 Wire `Gallery` into `PortfolioDetail.tsx`, positioned per the Figma frame (after the
      CMS body / prev-next footer — confirm exact position from the fetched node's parent
      order rather than assuming). Skip rendering the section entirely if `galleryImages` is
      empty (shouldn't happen given every project has at least a hero image, but keep the
      guard rather than rendering an empty shell).
- [x] 3.3 Remove the stale "Gallery section is not built" comment block in
      `PortfolioDetail.tsx` (lines ~13-17) now that it is.

## 4. Verification

- [x] 4.1 `npm run dev`; screenshot all three portfolio detail pages (`bottoms-up`,
      `hotpot-band-show`, `inner-voices-of-that-day`) at 393px and 1440px, in `/en` and `/zh`.
- [x] 4.2 Compare against the Figma screenshots from task 1 — Close tier (all sections other
      than NAV/Hero/CTA/Footer/typography).
- [x] 4.3 Use `next-devtools-mcp` to confirm no framework errors/warnings on any of the six
      page/breakpoint combinations touched.

## 5. Housekeeping

- [x] 5.1 Update `app/_components/INVENTORY.md` if `Gallery` is promoted or documented
      page-local (follow the same pattern as `ShareRail`'s entry).
- [x] 5.2 Append decision D091 to `openspec/DECISIONS.md`: gallery images combine each
      project's body/hero photos with a new optional `gallery` frontmatter field for images
      beyond the article body, no min/max count enforced, superseding D090's "not built"
      clause while keeping its no-fabrication reasoning intact.
- [x] 5.3 Update `openspec/reference/roadmap.md`: mark Phase 11's Gallery gap resolved by
      11a; add the 11a row/change id.
- [x] 5.4 Run `npm run lint` and `npx tsc --noEmit`; fix anything they surface.

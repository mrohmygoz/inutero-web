# Phase 6 — Tasks

## 1. Design context

- [x] 1.1 Invoke `/figma-design-to-code` before any `get_design_context` call (mandatory
      prerequisite).
- [x] 1.2 Fetch `get_design_context` for the four Services frames — desktop EN `12210:2346`,
      desktop TC `0:268`, mobile EN `10275:2585`, mobile TC `12368:4727`. File key
      `zSq5F5v3UrVAdIjuSipe3H`.
- [x] 1.3 Fetch `get_design_context` for the four Featured Projects frames — desktop EN
      `12210:2392`, desktop TC `0:313`, mobile EN `10275:3132`, mobile TC `12368:2418`.
- [x] 1.4 Fetch `get_screenshot` for the same eight nodes and keep them for the side-by-side
      comparison in task 8.
- [x] 1.5 Compare the three Home project card occurrences (mobile `10274:2308`, `10274:2322`,
      `10274:2456`; TC `12368:2421`, `12368:2423`, `12368:2426`) against `ProjectCard`'s current
      353px/325px shell. Confirm the wider Figma bounding boxes are rotation, not a wider card.
      If the shell genuinely differs, resolve it with a prop and note it for task 6.3.
- [x] 1.6 Confirm every color, size, and spacing value in the design context maps to a token in
      `openspec/reference/design-tokens.md`. If a token is missing from `@theme` in
      `app/globals.css`, add it from that file — never eyedrop from a screenshot.
- [x] 1.7 Confirm the `UniversalCTA` instances on Home (`12612:11943`, `0:373`, `12212:5282`,
      `12368:2429`) match the built component. If they diverge, stop and report before changing
      a shared component that six other pages depend on.

## 2. Assets

- [x] 2.1 Export the Services photograph with `download_assets` into `public/` (mobile
      `12368:4729` / `12368:4729`'s EN counterpart `0:4`; desktop image container `12210:2383`).
- [x] 2.2 Export the three Featured Projects card images into `public/`.
- [x] 2.3 If any export fails, stop and report it as blocked. Do not substitute a placeholder
      rectangle (D-G).

## 3. Copy

- [x] 3.1 Add the Services section strings (`Services` eyebrow, heading, `full services list`
      button) to `app/_lib/i18n` for `en` and `zh` from `openspec/reference/content-matrix.md`
      → Home, not from the Figma text layers (D032).
- [x] 3.2 Add the four service summary items (title + description, both locales) from
      content-matrix → "Home — services summary cards (4)". Figma shows Lorem ipsum for the
      descriptions; the matrix supplies the real copy.
- [x] 3.3 Add the Featured Projects strings (`PORTFOLIO` eyebrow — `keep EN`,
      `FEATURED PROJECTS` / `代表案例` heading, `VIEW ALL PROJECTS` / `完整案例` button).
- [x] 3.4 Add the three project card entries (title, date label, description, tags) from
      content-matrix → "Home — featured project cards (3)", both locales.
- [x] 3.5 Confirm the `keep EN` rows ship the English string under `/zh` as literals in both
      dictionaries — not as a fallback, so "fail loudly on missing translation" is unaffected.

## 4. HomeServices

- [x] 4.1 Create `app/[locale]/_components/HomeServices.tsx` as a `'use client'` component with
      the mobile subtree: rotated `Services` eyebrow (the inline treatment `TitleGroup`
      established — not a new component), heading, photograph, the four-item accordion
      overlaying the photograph's lower portion, and the `full services list` `Cta` pointing at
      `/[locale]/services`.
- [x] 4.2 Implement the accordion: single `openIndex` state, item 1 open on load, one open at a
      time. Headers are `<button>` with `aria-expanded` + `aria-controls`; collapsed panels are
      unmounted, not CSS-hidden. **Corrected during apply:** the plan assumed one glyph that
      rotates, but Figma draws *both* — a green `×` on the open row and a green `+` on closed
      rows — so the toggle swaps the two exported SVGs instead.
- [x] 4.3 Render `HomeServices` from `app/[locale]/page.tsx` below `HomeIntro`. Site must be
      runnable at this point.
- [x] 4.4 Add the desktop arrangement under `lg:` — full-width heading, 620×767 image on the
      right, 900px accordion floated over it, CTA below. Build it as a flow section with
      percentage-based overlay offsets, **not** inside `.canvas-1440` (see design.md).
- [x] 4.5 Verify `zh`: the section is genuinely shorter (desktop TC is 1377px against EN's
      1535px) because the Chinese type scale and copy are shorter — nothing is scaled up to fill
      the English frame's height (D038).

## 5. HomeFeaturedProjects

- [x] 5.1 Create `app/[locale]/_components/HomeFeaturedProjects.tsx` (server component) with the
      mobile subtree: rotated `Portfolio` eyebrow + `FEATURED PROJECTS` heading, three
      `ProjectCard`s in per-card positioning wrappers carrying the offset and rotation, and the
      `VIEW ALL PROJECTS` `Cta`.
- [x] 5.2 Compose `ProjectCard` unchanged — scatter and rotation live in the wrappers (design.md).
      Pass `href="/[locale]/portfolio"` on all three; no slugs exist until Phase 11.
- [x] 5.3 Render it below `HomeServices`. Site must be runnable.
- [x] 5.4 Add the desktop arrangement under `lg:` — three cards absolutely positioned as
      percentages of the 1376px content container, wrapper height set by the tallest card,
      centered CTA below.
- [x] 5.5 Verify `zh` — the Chinese blurbs are shorter, so cards shrink; confirm the scatter
      still reads as designed and no card collides with a neighbour.

## 6. Page composition and documentation

- [x] 6.1 Render `UniversalCTA` on `app/[locale]/page.tsx` below `HomeFeaturedProjects`, outside
      any page padding (it is full-bleed). Remove the stale Phase 5 boundary comment. Home is now
      hero → intro → services → featured projects → CTA → footer.
- [x] 6.2 Append this phase's decisions to `openspec/DECISIONS.md`, continuing from D040 and
      updating its ToC: the accordion interaction model (derived, one open at a time), these
      sections reflowing rather than entering `.canvas-1440`, where the Home summary links point
      given `/services` has no anchors and no portfolio slugs exist, and the mobile hero cycle
      (designed values from the prototype; only `prefers-reduced-motion` is derived).
- [x] 6.4 Record the two cross-phase findings from design.md → "Findings for other phases" in
      `openspec/DECISIONS.md` as notes against D039 and for Phase 11 — the desktop `MENU` square
      has a real `ON_CLICK → OVERLAY 12612:8541` reaction that contradicts D039's premise, and
      the Home project cards are prototyped to Portfolio Details, not the index. **Do not act on
      either in this phase.**
- [x] 6.3 `app/_components/INVENTORY.md` — update `ProjectCard`'s row only if task 1.5 forced a
      prop change. No new shared component is introduced; `HomeServices` stays page-local (D033).

## 7. Mobile hero photo cycle

Folded in on the user's direction — a Phase 5 omission, not new scope. Desktop is untouched.

- [x] 7.1 Confirm the prototype reaction values on the five `Mast` variants (`10275:3093`,
      `10275:3102`, `10275:3109`, `10275:3115`, `10275:3121`) via `use_figma` reading
      `node.reactions` — `AFTER_TIMEOUT 0.8s` → `CHANGE_TO` next → `DISSOLVE` / `LINEAR` /
      `0.2s`, wrapping variant 5 → default. `get_motion_context` does **not** report these.
- [x] 7.2 Confirm the TC mobile `Mast` instance `12368:2414` carries the same reaction. If it
      diverges, the TC hero gets its own timing — do not assume parity.
- [x] 7.3 Export the four missing photographs (variants 2–5) with `download_assets` into
      `public/images/home/`. Variant 1 is already shipped as `hero-1.jpg`; name the set
      consistently and update the existing reference if renaming.
- [x] 7.4 Convert `HomeHero` to `'use client'` and stack all five photos in the existing 665px
      mobile box, absolutely positioned, opacity driven by an active index on an 800ms interval
      with a `200ms linear` opacity transition. Headline, scrim, and green panel must not move.
- [x] 7.5 Photo 1 keeps `priority`; the other four load without it.
- [x] 7.6 Under `prefers-reduced-motion: reduce` the cycle does not start and photo 1 renders
      alone (design.md — the one undesigned part of this feature).
- [x] 7.7 Confirm the desktop collage is unaffected — still a server-rendered static composition
      at `lg:` and up, with no interval running.
- [x] 7.8 Verify the cycle in the browser at 393px in **both** locales, and confirm it does not
      cause layout shift or fight the `next/image` loader on first paint.

## 8. Verification

- [x] 8.1 `next-devtools-mcp` — check the running app for framework errors and warnings on `/en`
      and `/zh`. A `'use client'` section inside a server page is the likely source of any new
      hydration warning.
- [x] 8.2 Playwright screenshots at **393px, 1024px, 1280px, and 1440px** × `/en` and `/zh` —
      eight shots. 1024/1280 are the derived band; they are a check for tolerable, not matching.
- [x] 8.3 Compare the 393px and 1440px shots side-by-side against the task 1.4 Figma
      screenshots, per-section. Both sections are **Close** tier (≤4px drift); `UniversalCTA` is
      **Exact** tier and must still match after being placed on a real page.
- [x] 8.4 Exercise the accordion in the browser at both breakpoints and both locales: each item
      opens, the previous closes, item 1 is open on load, keyboard focus reaches every header
      and Enter/Space toggles it.
- [x] 8.5 Confirm no horizontal scroll at any of the four widths in either locale — particularly
      around the rotated card wrappers and the full-bleed `UniversalCTA`.
- [x] 8.6 Confirm the exported imagery renders through `next/image` and the section reads
      correctly with the real assets, not the Figma render.
- [x] 8.7 Scroll the full page in both locales and confirm the Phase 5 → Phase 6 seam has no gap,
      overlap, or doubled spacing.
- [x] 8.8 `npm run lint` and `npx tsc --noEmit` both clean.
- [x] 8.9 Report honestly at the gate: state that the accordion interaction and the 1024–1440
      band are derived with no Figma reference, that the hero cycle's timing is *not* derived
      (it is the prototype's own values) while its reduced-motion behavior is, that the three
      card images are Figma exports that Phase 11 replaces, and name anything skipped, blocked,
      or only partly done.

## 9. Addendum — prototype motion and card corrections (post-gate, 2026-08-03)

- [x] 9.1 Sweep the whole mobile Home frame with `node.reactions` (not just `get_motion_context`
      and the frame roots) and record what it finds — D046.
- [x] 9.2 Animate the Services accordion to the designed `SMART_ANIMATE / EASE_OUT / 0.3s`:
      `grid-template-rows` 0fr→1fr, panels mounted and `inert` while closed, `+`/`×` cross-faded.
- [x] 9.3 Correct D041 in place — the interaction is designed, not Derived.
- [x] 9.4 Build the Featured Projects scroll stack from the user's prototype recordings: sticky
      heading, cards pinned at one offset with rising z-index. Use `overflow-x-clip`, never
      `overflow-hidden`, which would kill `sticky`.
- [x] 9.5 Fix `ProjectCard` to one order at every width, matching Home's own desktop card
      `12210:2404` rather than the Portfolio page's `12610:6812`.
- [x] 9.6 Replace the card image's fixed height with `aspect-[333/445]` so it scales with the
      caller's width instead of cropping the posters.
- [x] 9.7 Set both Featured Projects CTAs to `tone="green"`.
- [x] 9.8 Preserve the user's hand-tuned card spacing across the restructure.
- [x] 9.9 Append D046 and D047; update `ProjectCard`'s INVENTORY row with the Portfolio
      divergence so Phase 10 does not rediscover it.
- [x] 9.10 Re-verify at 393/1024/1440 × both locales: no horizontal overflow, accordion animating,
      cards stacking, desktop row unchanged. `npm run lint` and `npx tsc --noEmit` clean.

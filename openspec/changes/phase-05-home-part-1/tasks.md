# Phase 5 — Tasks

## 1. Design context

- [x] 1.1 Invoke `/figma-design-to-code` before any Figma MCP call (mandatory prerequisite).
- [x] 1.2 Resolve the mobile TC child node IDs for Hero and Intro from the mobile TC Home frame
      `12368:2413` (`get_metadata`). The other seven node IDs are already known: desktop EN Hero
      `12405:6947` / Intro `12405:6419`; desktop TC Hero `0:187` / Intro `0:254`; mobile EN Mast
      `10275:3094`, green panel `12217:911`, Intro `12212:6318`.
- [x] 1.3 Fetch `get_design_context` for all four Hero frames (desktop EN/TC, mobile EN/TC) and
      all four Intro frames. File key `zSq5F5v3UrVAdIjuSipe3H`.
- [x] 1.4 Fetch `get_screenshot` for the same eight nodes and keep them for side-by-side
      comparison during verification.
- [x] 1.5 Confirm every color, size, and spacing value seen in the design context maps to a token
      in `openspec/reference/design-tokens.md`. If a token is missing from `@theme` in
      `app/globals.css`, add it from that file — never eyedrop from a screenshot.

## 2. Assets

- [x] 2.1 Export the three desktop hero photographs (`image 29`, `image 30`, `image 31`) with
      `download_assets` into `public/`.
- [x] 2.2 Export the mobile hero's full-bleed photograph into `public/`.
- [x] 2.3 Export the Intro image (`image 21`, desktop `12405:6432`) into `public/`.
- [x] 2.4 If any export fails, stop and report it as blocked. Do not substitute a placeholder
      rectangle (D-G).

## 3. Copy

- [x] 3.1 Add the Home hero strings (headline words, body, both button labels, `scroll down`
      label) to `app/_lib/i18n` for `en` and `zh`, transcribed from
      `openspec/reference/content-matrix.md` → Home, not from the Figma text layers (D032/D-F).
- [x] 3.2 Add the Intro strings (`Mission` eyebrow, headline, body, `Our story` button) for both
      locales from the same source.
- [x] 3.3 Confirm the two deliberate divergences from the frames are in place: hero body ends
      `…international touring and promotion`; ZH intro headline is `根植本土，前進世界。`.
- [x] 3.4 Set the hero headline as an English literal in **both** locale dictionaries (`keep EN`)
      — not as a fallback, so the "fail loudly on missing translation" rule is unaffected.
- [x] 3.5 Delete the now-unused Phase 1 `home.placeholder` key and its `zh` counterpart.

## 4. HomeHero

- [x] 4.1 Create `app/[locale]/_components/HomeHero.tsx` with the mobile subtree only: full-bleed
      photo, the four display words overlaid alternating white/green, the green copy panel
      stacked beneath with body + `Cta` + underlined text link, and the rotated `scroll down`
      label. Build it **fluid, not to 393px fixed widths** (D-B).
- [x] 4.2 Render it from `app/[locale]/page.tsx` in place of the placeholder body, and pass
      `theme="dark"` to `Nav` (D017 — both desktop Home frames instance `Desktop NAV/DARK`).
      Site must be runnable at this point.
- [x] 4.3 Add the desktop subtree as a sibling under `min-width: 1440px` (D-B, D-C): one
      relatively-positioned block, three absolutely-placed photographs, four placed display
      words, and the green panel floated over the bottom-left. Pin stacking order explicitly
      from the Figma layer order.
- [x] 4.4 Clip `image 30`'s ~8px overflow at the section boundary rather than growing the section.
- [x] 4.5 Verify the hero renders correctly in `zh` — headline stays English, body and buttons
      are Chinese, and the Chinese type scale does not break the panel.

## 5. HomeIntro

- [x] 5.1 Create `app/[locale]/_components/HomeIntro.tsx` with the mobile subtree: eyebrow tag
      (green dot + rotated `Mission`, reusing the inline treatment `TitleGroup` established, not
      a new component), the display heading with its per-line green tint ramp, the image, then
      body + `Our story` `Cta`. Fluid widths.
- [x] 5.2 Render it below `HomeHero` on the Home page.
- [x] 5.3 Add the desktop subtree under `min-width: 1440px`: heading block top-left, image
      overlapping its lower right, body + CTA anchored bottom-right.
- [x] 5.4 Position the overlapping image relative to the heading block, so it follows the shorter
      Chinese heading rather than detaching from it (D-D).
- [x] 5.5 Verify the `zh` heading wraps naturally at the designed Chinese display token and the
      section simply becomes shorter — nothing scaled up to fill the designed block (D-D).

## 6. Documentation

- [x] 6.1 Append D-A (page-local sections), D-B (mobile layout holds to 1440px), D-D (ZH Intro
      heading natural wrap), and D-E (floating desktop `MENU` square deferred) to
      `openspec/DECISIONS.md`, continuing the D0NN numbering and updating its ToC.
- [x] 6.2 Note in the D-E entry that `12423:8613` / `0:504` exist and imply a scroll-driven
      desktop nav, so a later phase does not rediscover them as a defect.
- [x] 6.3 `app/_components/INVENTORY.md` — confirm no entry is needed (no shared component is
      introduced) and leave it unchanged. If any part of the Hero or Intro ends up promoted to
      `app/_components/`, add its entry here instead.

## 7. Verification

- [x] 7.1 `next-devtools-mcp` — check the running app for framework errors and warnings on `/en`
      and `/zh`.
- [x] 7.2 Playwright screenshots at **393px, 1280px, and 1440px** × `/en` and `/zh` — six shots.
      1280px is the D-B risk check (mobile layout under the desktop token set and desktop NAV);
      it is a check for tolerable, not for matching, since no frame exists there.
- [x] 7.3 Compare the 393px and 1440px shots side-by-side against the task 1.4 Figma screenshots,
      per-section. Hero is **Exact** tier (Home hero is named in CLAUDE.md); Intro is **Close**
      tier, ≤4px drift.
- [x] 7.4 Confirm no horizontal scroll at any of the three widths in either locale.
- [x] 7.5 Confirm the exported photography renders through `next/image` and the display words
      remain legible against the real assets, not the Figma render.
- [x] 7.6 `npm run lint` and `npx tsc --noEmit` both clean.
- [x] 7.7 Report honestly at the gate: state that Home ends after the Intro until Phase 6, and
      name anything skipped, blocked, or only partly done.

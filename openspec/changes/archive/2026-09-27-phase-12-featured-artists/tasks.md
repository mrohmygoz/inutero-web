## 1. Figma design context

- [x] 1.1 Run `/figma-design-to-code`, then fetch `get_design_context` + `get_screenshot` for
      all four Featured Artists frames (desktop EN `12612:8774`, desktop TC `12635:12928`,
      mobile EN `12211:3608`, mobile TC `12368:2593`).
- [x] 1.2 `get_metadata` sweep confirming header, filter row, and card grid node IDs on all
      four frames (proposal.md's table has header nodes unresolved — fill them in).
- [x] 1.3 Confirm whether this page's header instances a dark NAV; if so, add `artists` to
      `darkNavRoutes` in `app/_lib/routes.ts`. **Found: no dark NAV** — both desktop and
      mobile frames instance the plain `Desktop NAV`/`NAV` (light), not the `/DARK` variant.
      `artists` stays out of `darkNavRoutes`.
- [x] 1.4 Diff mobile EN (5115px) against mobile TC (3416px) specifically — this gap is larger
      than any prior page phase. Identify what actually differs (card count per row, section
      order, or reflow) before building either. **Found:** the gap is entirely the card grid's
      drawn slot count — mobile EN draws 12 sample card slots (2538px grid), mobile TC draws
      only 4 (830px grid). Same header/filter/CTA/Footer structure otherwise. Not a real layout
      difference to reconcile — both locales render the same 8 real artists in one 2-column
      grid, so this doesn't carry into the implementation.

## 2. Artist data

- [x] 2.1 Create `app/_lib/artists.ts` with the 8 real artists from `content-matrix.md` →
      Featured Artists (name, `bioZh`, `services` as `serviceAnchors` ids, `photo`).
- [x] 2.2 Write AI-generated English bios for all 8, translating the supplied Chinese — mark
      them in a code comment as non-final, matching Portfolio's precedent for its English
      project copy.
- [x] 2.3 `download_assets` the 8 press photos into `public/images/artists/`, matched to their
      artist by filename. **Found: only 4 of 8 are resolvable.** The desktop card grid
      (`12591:6196`) cycles exactly 4 real photos across its 12 drawn slots — Panai, Huan Huan,
      Come on! BayBay!, and Elephant Gym, matched to their name via the text override rendered
      in the same card instance as each image constant. The other 4 artists (Bugs of Phonon,
      JPBS, Flesh Juicer, Zhaolin) have no photo anywhere in the file. `ArtistCard`'s `image`
      prop was made optional (see 4.2) and the neutral placeholder covers the gap, per the
      proposal's own allowance.

## 3. Components

- [x] 3.1 Build `app/[locale]/artists/_components/ArtistsHero.tsx` — eyebrow (`OUR PARTNERS`
      / keep EN) + heading (`FEATURED ARTISTS` / 合作藝人), no description paragraph.
- [x] 3.2 Build `app/[locale]/artists/_components/ArtistsGrid.tsx` (`'use client'`) — filter
      row using `serviceAnchors` ids/labels, single-select with `All` default, grid of
      `ArtistCard`s, empty-state line when a tag matches nothing.
- [x] 3.3 Add `app/_lib/i18n/{en,zh}/artists.ts` — eyebrow, heading, filter label, empty-state
      copy.
- [x] 3.4 Wire `app/[locale]/artists/page.tsx`: header → grid → `UniversalCTA`, replacing
      `PagePlaceholder`.

## 4. ArtistCard verification

- [x] 4.1 Render all 8 real bios/photos through `ArtistCard` at 393px and 1440px; check the
      65px bio clamp and photo aspect ratio against real (non-Lorem-ipsum) content.
- [x] 4.2 If a real defect surfaces (overflow, wrong aspect handling), fix `ArtistCard.tsx` and
      record the finding as a decision — do not patch around it in the page. **Two real defects
      found and fixed:** (1) `image` was required — 4 of 8 real artists have no resolvable
      photo, so it was made optional with a placeholder block, mirroring `ProjectCard`'s
      pattern. (2) The placeholder was tinted `--opacity-white-10` (copied from `ProjectCard`,
      built for a dark card surface) — invisible against this page's white background. Retinted
      to `--opacity-neutral-darkest-10` for `ArtistCard`'s only (light) page. Both recorded in
      DECISIONS.md.

## 5. Verification

- [x] 5.1 `next-devtools-mcp` check for framework errors/warnings on `/en/artists` and
      `/zh/artists`. **Clean** — `get_errors` returned no config or session errors on either
      route.
- [x] 5.2 `playwright-cli` screenshots at 393px and 1440px, both locales; compare against the
      Figma screenshots from task 1.1. **Done via `agent-browser`** (no `playwright-cli`/
      `chromium-cli` binary installed in this environment). All four combinations match the
      design's structure: light header, 2-up mobile / 3-up desktop grid, filter rail (see 6.2
      for its one deliberate color deviation), and the CTA + Footer below.
- [x] 5.3 Verify filter interaction in the browser: each tag narrows correctly, `All` restores
      all 8. **Verified** — clicking "Artist Management" narrowed the grid to exactly the 4
      matching artists (Elephant Gym, Huan Huan, Panai, Come on! BayBay!); "All" restored all 8.
      **Empty-state line not reachable with the real 8-artist roster** — all four service tags
      have at least one match (unlike Portfolio, where "Artist Management" has zero) — so the
      empty-state branch was verified by code inspection only (identical mechanism to
      Portfolio's, which does exercise it).
- [x] 5.4 `npm run lint` and `npx tsc --noEmit`. **Both clean** — 0 lint errors (1 pre-existing,
      unrelated warning in `AboutHero.tsx`); 0 type errors.

- [x] 6.1 Update `app/_components/INVENTORY.md` — `ArtistCard`'s first real consumer, any
      change made in task 4.2.
- [x] 6.2 Append new decisions to `openspec/DECISIONS.md` (filter reuse, data-shape choice,
      any `ArtistCard` fix, AI-placeholder English bios). Added D092–D094.
- [x] 6.3 Update `openspec/reference/roadmap.md` — tick Phase 12; update the Assets and
      "client still owes" rows for Featured Artists.
- [x] 6.4 Update `openspec/reference/content-matrix.md` — mark the 8 artists supplied; keep
      English bios flagged non-final.

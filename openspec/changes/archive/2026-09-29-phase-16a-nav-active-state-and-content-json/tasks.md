## 1. Figma verification

- [x] 1.1 `/figma-design-to-code`, then fetch desktop NAV (`12653:5366` light / `12653:5259`
      dark) and mobile menu overlay (`10270:2118` EN / `12368:2386` TC) node context, looking
      specifically for the active-link variant/state on each.
- [x] 1.2 Confirm the active-link color tokens: desktop → `--color-brand-primary-green`
      (green), mobile → italic + `--color-basic-accent` (black), against what Figma actually
      shows. Update proposal.md/design.md if the fetched values differ from what was assumed.
      **Finding:** the standalone `Desktop NAV` component (`12653:5366`) only exposes
      `Property 1=EN|CN` variants — no separate "active" state, and the per-page composed
      frames assemble their NAV bar outside the page symbol's own node tree, so it can't be
      isolated cheaply via MCP. Proceeding with the user-specified treatment (desktop green /
      mobile italic+black) as a derived-but-user-confirmed decision — recorded in
      DECISIONS.md.

## 2. Active-route navigation

- [x] 2.1 Add `activeRouteForPath(pathname): RouteKey | undefined` to `app/_lib/routes.ts`,
      mirroring `navThemeForPath`'s segment-matching.
- [x] 2.2 In `Nav.tsx`'s desktop link loop, apply the active-route color treatment when
      `route.key === activeRoute`, on top of the existing `tone.text` class.
- [x] 2.3 In `Nav.tsx`'s mobile menu link loop (including the separately-rendered "Home"
      link), apply italic + black when `route.key === activeRoute`.
- [x] 2.4 Verify the treatment fires for detail pages nested under a route (e.g.
      `/en/portfolio/some-project` marks "Portfolio" active) and not on pages outside the
      route table entirely (`/styleguide`).

## 3. Artists content to JSON

- [x] 3.1 Create `content/artists.json` containing the `artists` array's data (no code, no
      comments).
- [x] 3.2 Update `app/_lib/artists.ts` to import the array from `content/artists.json` and
      type it as `Artist[]`, keeping the `Artist` type, provenance comments, and all helper
      logic in place.
- [x] 3.3 Confirm `tsconfig.json` has `"resolveJsonModule": true` (add if missing). Already
      present at tsconfig.json:12.

## 4. Team content to JSON

- [x] 4.1 Create `content/team.json` containing the `teamMembers` array's data.
- [x] 4.2 Update `app/_lib/team.ts` to import the array from `content/team.json` and type it
      as `TeamMember[]`, keeping `TeamMember`, provenance comments, `imageExtensions`,
      `teamMemberImageSrc`, and `teamMemberDisplay` in place.

## 5. Verification

- [x] 5.1 `npm run dev`; verified via rendered HTML (Chrome extension unavailable this
      session — see report) that the active link differs from the rest on `/en/services`,
      `/en/portfolio/<detail>` (marks "Portfolio"), and that `/styleguide` marks nothing.
- [x] 5.2 Confirm `/artists` and `/about` pages render identically to before (data now from
      JSON) — verified both return 200 and contain expected roster content
      ("Bugs of Phonon", "Cofounder").
- [x] 5.3 `npm run lint` and `npx tsc --noEmit`. Both clean (lint: 1 pre-existing unrelated
      warning in `AboutHero.tsx`).
- [x] 5.4 Update `app/_components/INVENTORY.md` only if `Nav.tsx`'s documented behavior
      needs amending; otherwise note in the report that no entry changed. No entry changed —
      `Nav.tsx`'s INVENTORY entry describes structure, not per-route styling detail.
- [x] 5.5 Append any resolved ambiguity to `openspec/DECISIONS.md`.
- [x] 5.6 Update `openspec/reference/roadmap.md` — add/tick Phase 16a's row.

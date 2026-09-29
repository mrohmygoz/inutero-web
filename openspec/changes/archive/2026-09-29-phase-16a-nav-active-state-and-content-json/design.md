## Context

`Nav.tsx` already computes `resolvedTheme` from `usePathname()` via `navThemeForPath` in
`routes.ts`. Active-route detection follows the same shape: derive the current `RouteKey`
from the pathname and compare it against each rendered link's own key.

`artists.ts` and `team.ts` are hand-authored typed arrays (see proposal.md - Impact). Moving
their data to JSON is a pure data-location change; the modules keep their existing exported
type and helper functions so every call site is untouched.

## Goals / Non-Goals

**Goals:**
- Active-route styling works identically across `en`/`zh` and both NAV themes (`light`/`dark`).
- `artists.ts`/`team.ts` remain the only import path consumers use — no call site changes.

**Non-Goals:**
- No CMS or runtime content editing. JSON is still checked into the repo and read at build
  time, same as the MDX content it sits alongside.
- No change to `Artist`/`TeamMember` shape or to derived helpers
  (`teamMemberImageSrc`, `teamMemberDisplay`, `artist` service filtering).

## Decisions

**Active-route detection reuses the `RouteKey` matching already in `routes.ts`.** Add a
`activeRouteForPath(pathname): RouteKey | undefined` helper next to `navThemeForPath`, same
segment-matching logic. `Nav.tsx` compares each mapped `route.key` against this value rather
than re-deriving it per link element.

**Alternative considered:** comparing `href === pathname` directly in `Nav.tsx`. Rejected —
duplicates the locale-stripping logic `navThemeForPath` already has, and would drift if the
segment-matching rule changes.

**JSON files hold plain data only, typed at the import site.** `content/artists.json` and
`content/team.json` are untyped JSON; `artists.ts`/`team.ts` import them and assert/cast to
the existing `Artist[]`/`TeamMember[]` types (TypeScript's `resolveJsonModule`, already
implied by other JSON imports in the toolchain — verify `tsconfig.json` has
`"resolveJsonModule": true`, add it if missing). Comment blocks explaining sourcing
provenance (photo mapping, EN-bio-is-AI-generated caveat, etc.) stay in the `.ts` files
above the import, not duplicated into JSON.

**Alternative considered:** keep `imageExtensions`/`teamMemberImageSrc` derivation in JSON
too. Rejected — that mapping is presentation logic (file extension lookup), not roster data;
moving it would blur the "content vs. code" boundary the proposal is drawing.

## Risks / Trade-offs

- [Active-route match uses route *segment*, not full pathname] → a locale-only root path
  (`/en`) must resolve to `home`, matching the existing `navThemeForPath` behavior — reuse,
  don't reimplement, to avoid divergence.
- [JSON loses inline TS comments explaining data provenance] → keep those comments in
  `artists.ts`/`team.ts` immediately above the import; do not delete them.

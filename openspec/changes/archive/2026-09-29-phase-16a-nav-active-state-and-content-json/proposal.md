## Why

The site is functionally complete through Phase 15. Two post-review gaps remain: the NAV
never indicates which page is currently active (Figma draws this state on both desktop and
mobile, but it was never built), and the Artists/Team rosters are hardcoded TypeScript
modules rather than data files, making them harder for a non-engineer to update later.

## What Changes

- Desktop NAV: the active route's link renders in `--color-brand-primary-green` instead of
  the theme's default link color, on both light and dark NAV themes.
- Mobile NAV (open menu): the active route's link renders italic and in
  `--color-basic-accent` (black) instead of the default bold/background color.
- `app/_lib/artists.ts` keeps its exported `Artist` type and helper functions, but the
  `artists` array itself is now imported from a new `content/artists.json` data file instead
  of being defined inline.
- `app/_lib/team.ts` keeps its exported `TeamMember` type and helper functions, but the
  `teamMembers` array is now imported from a new `content/team.json` data file instead of
  being defined inline.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `localized-routing`: adds a requirement that the site-wide NAV visually marks the link for
  the currently active route, with distinct treatments for the desktop and mobile NAV.

## Impact

- `app/_components/Nav.tsx` — desktop and mobile link rendering gains active-route styling
  driven by `usePathname()`.
- `app/_lib/routes.ts` — may gain a small helper to resolve the active `RouteKey` from a
  pathname (mirrors the existing `navThemeForPath`).
- `app/_lib/artists.ts`, `app/_lib/team.ts` — data moves out to JSON; call sites
  (`app/[locale]/artists/page.tsx`, `app/[locale]/about/**`) are unaffected since the module's
  exported shape does not change.
- New files: `content/artists.json`, `content/team.json`.
- No route, URL, or visible content changes beyond the NAV styling.

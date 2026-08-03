# Phase 7 — Our Story (`/[locale]/about`)

## Why

Home reached 100% in Phase 6. `/en/about` and `/zh/about` still render `PagePlaceholder` — the
route exists (Phase 3) and NAV, Footer, and `UniversalCTA` all point at it, so it is the most
visible remaining stub. Our Story is 4727px at desktop, under the ~5000px split threshold, so it
ships as a single phase.

It is also the first page whose real content the client has actually delivered: nine team
photographs landed in `public/images/about/` during proposal, replacing the Lorem ipsum the
matrix recorded as `待補`.

## What Changes

Page frames: desktop EN `12612:8545` / TC `12635:12924`; mobile EN `12210:2817` / TC
`12368:2432`. Four sections, then the two shell blocks that already exist.

- **`AboutHero`** — new page-local section. Desktop `12573:6372` (1440×960); mobile `12212:6345`
  / TC `12368:2433` (393×665). Full-bleed photograph under a dark scrim, dark NAV, rotated
  eyebrow at the left edge, an oversized headline, and a body block set low-right. The headline is
  **FROM TAIWAN TO THE WORLD.** / **立足台灣 走向世界**.
- **`AboutIntro`** — new page-local section. Desktop `12573:6107` (1440×792.5); mobile
  `12212:6370` (393×1092) / TC `12368:2435` (393×971). Rotated `Mission` eyebrow, the green
  two-line display heading, a body paragraph, and a 464×380 photograph — text+photo side by side
  at desktop, photo above text at mobile. **The body paragraph is built** — see *Copy conflicts
  resolved* below; `content-matrix.md`'s `REMOVE` annotation turned out to cite the wrong node and
  is overridden by the live design.
- **`AboutHowWeWork`** — new page-local section. Desktop `12610:6253` (1440×635); mobile
  `12219:948` (393×929.6) / TC `12368:2436` (393×712.6). Dark full-bleed band, rotated `Approach`
  eyebrow, `How We Work` / `我們的堅持` heading, then the three points from the matrix as a 3-up
  row at desktop and a stack at mobile. Despite the Figma layer name `ServicesAccordion`
  (`12610:6264`), **this is not an accordion** — all three points are open, static text. Do not
  reuse the Home `HomeServices` interaction here.
- **`AboutTeam`** — new page-local section. Desktop `12573:6174` (1440×886.5); mobile
  `12210:2881` (393×752) / TC `12368:2437` (393×690). Rotated `Team` eyebrow, `The People Behind`
  / `認識我們的團隊` heading, and a horizontally-overflowing row of `TeamCard`s (desktop draws 5 at
  284px wide, running past the 1440px edge at x=1264; mobile draws 2 plus a five-dot indicator).
  Composes the existing shared **`TeamCard`** (`app/_components/TeamCard.tsx`) — no new shared
  component.
- **Real team roster — 9 members, replacing the design's placeholders.** Every card in Figma is
  Lorem ipsum labelled `MENG`. The client delivered `public/images/about/*.{jpg,JPG,jpeg,JPEG}`,
  whose filenames encode `{name} / {job title} / {short description}`. Those nine become the
  roster. The files are renamed to ASCII slugs and the metadata is lifted into a typed table
  rather than parsed from filenames at runtime. **The design's card count (5 desktop / 2 mobile)
  is a drawn sample, not a constraint** — the matrix already says the count may change.
- **`app/[locale]/about/page.tsx`** — stops rendering `PagePlaceholder` and renders
  `AboutHero` → `AboutIntro` → `AboutHowWeWork` → `AboutTeam` → `UniversalCTA` (desktop instance
  `12612:8543`, mobile `12212:5520` / `12389:5622`). NAV takes `theme="dark"`, as the hero frame
  shows the dark instance.
- **Our Story copy for both locales** — from `openspec/reference/content-matrix.md` → *Our Story*
  (D032), into `app/_lib/i18n`.
- **Section photography** — the hero photograph and the Intro's 464×380 image exported from Figma
  with `download_assets` into `public/`. No placeholder rectangles.
- **`openspec/DECISIONS.md`** — this phase's derived and conflict-resolving calls, continuing
  from D048.

### Copy conflicts resolved at proposal time (user decisions, 2026-08-03)

| Conflict | Resolution |
| :--- | :--- |
| Matrix gives the hero heading as "Real artists. Real stories." — identical to its own Intro row — while both Figma locales draw **FROM TAIWAN TO THE WORLD.** / **立足台灣 走向世界** | **Figma wins for the hero headline.** The matrix row is a transcription slip; its Intro row already carries "Real artists. Real stories." and the TC frames confirm the two headings are different. This is a deliberate, recorded exception to D032. |
| Matrix's hero body is a two-paragraph founder story; Figma draws a short 3–4 line summary block | **Matrix wins for the hero body.** The block grows to fit; the resulting hero height is **derived**, not design-matching. |
| Team cards: EN name/title exist in the filenames, descriptions are Chinese-only, and one title (`冬季限定`) has no English | EN cards render the Latin name, the English title, and the **Chinese description verbatim**, falling back to the Chinese title where no English exists. Nothing invented, nothing blank. |
| Matrix marks the Intro body paragraph `REMOVE`, citing node `12212:6370` — but that ID is the whole Intro instance, not a paragraph, and `get_design_context` shows the exact paragraph still drawn in full (real English, not Lorem ipsum) in both live desktop and mobile frames | **Figma wins.** The matrix's node citation was wrong and the annotation is stale against the current file — the paragraph is built as drawn, in both locales. |

### Explicitly out of scope

- **The Credits section is deferred** (user decision). The matrix marks it `新增段落` — it exists
  in no Figma frame, and two of its three lines are still `待補` (the Web Development English name
  and the entire Web Design credit). It moves to the polish phase.
- The Intro body paragraph — removed by the matrix, transcribed there only so it can be
  recognised. Not built, this phase or any later one.
- The floating desktop `MENU` square (`12612:11836`) — still deferred per D039.
- `/services`, `/portfolio`, `/artists`, `/news`, `/contact` — untouched. `TeamCard` is composed
  as-is; it is touched only if the real roster needs a prop it does not have.

## Capabilities

### New Capabilities

None. This phase implements four sections of a finished design onto a route that already exists.
It adds no route, no build-time contract, and no behavior a spec would describe —
`localized-routing` already covers `/en/about` and `/zh/about` resolving, and `design-primitives`
already covers `TeamCard`, `TitleGroup`, and `UniversalCTA`. The team carousel's paging is
section-local UI state, not a system requirement.

### Modified Capabilities

None. `skip_specs: true` is set in this change's `.openspec.yaml` accordingly, per the guidance
to prefer opting out over inventing a requirement to satisfy validation.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/about/page.tsx` | `PagePlaceholder` replaced by four sections + `UniversalCTA`; NAV set to `theme="dark"` |
| `app/[locale]/about/_components/AboutHero.tsx` | New — server component |
| `app/[locale]/about/_components/AboutIntro.tsx` | New — server component |
| `app/[locale]/about/_components/AboutHowWeWork.tsx` | New — server component |
| `app/[locale]/about/_components/AboutTeam.tsx` | New — `'use client'` if the carousel needs state (see design.md) |
| `app/_lib/i18n` | Our Story strings for `en` and `zh`, plus the 9-member team table |
| `public/images/about/` | 9 delivered photos renamed to ASCII slugs |
| `public/` | Hero photograph + Intro photograph exported from Figma |
| `app/_components/TeamCard.tsx` | Composed as-is; touched only if the real roster needs a prop it lacks |
| `app/_components/INVENTORY.md` | `TeamCard`'s row updated with its first real consumer; no new shared component |
| `app/globals.css` | Only if a token in `design-tokens.md` is not yet wired into `@theme` |
| `openspec/DECISIONS.md` | Appended, continuing from D048 |

No dependency changes. No API routes. Nothing is removed except the `PagePlaceholder` call.

**User verifies:** `/en/about` and `/zh/about` at 393px and 1440px — the page runs hero → intro →
how we work → team → green CTA → footer with no gap and no placeholder; nine real team members
appear with their photographs; the team row scrolls or pages at both breakpoints; the Intro shows
its heading and photo with no body paragraph.

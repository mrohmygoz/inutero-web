# Phase 8 — Services part 1: hero + the four service cards (`/[locale]/services`)

## Why

Our Story shipped in Phase 7. `/en/services` and `/zh/services` still render `PagePlaceholder`,
and it is now the most-linked stub on the site — NAV, the Footer's whole Services sub-link group
(five links, all pointing at `/services` per D-G), and the Home page's services summary cards all
land there.

Services is **6260px** at desktop (6358px in TC), the second-tallest page in the file and well
over the ~5000px split threshold. The roadmap already splits it: this phase builds the header and
the four service cards (首圖, 服務部分); Phase 9 builds the FAQ and the CTA (常見問題部分, 行動呼籲).

## What Changes

Page frames: desktop EN `12612:8668` / TC `12635:12925`; mobile EN `12220:2064` / TC `12368:2814`.
The desktop frame's own child frames give the split its seam — this phase takes everything above
`Section` `12573:6686`.

| Section | Desktop EN | Mobile EN | This phase |
| :--- | :--- | :--- | :--- |
| Header (首圖) | `12573:6453` — 1440×1334 (TC 1528) | `12220:2065` — 393×825 | ✅ |
| Four service cards (服務部分) | `12600:7551` "Frame 60" — 1440×2716 | `12220:2696` / `2666` / `2786` / `2816` | ✅ |
| FAQ (常見問題部分) | `12573:6686` — 1440×757 | `12220:2269` | ❌ Phase 9 |
| UniversalCTA (行動呼籲) | `12573:9015` | `12220:2432` | ❌ Phase 9 |
| Footer | `12573:9182` | `12220:2433` | Already shipped (Phase 3) |

- **`ServicesHero`** — new page-local section. Desktop `12573:6453`; mobile `12220:2065`. A dark
  NAV, a rotated `Services` eyebrow at the left edge, the two-line display heading, a body line,
  then a full-bleed photograph (desktop `12573:6477`, 1440×690; mobile `image 36` `12220:2587`,
  393×310). Copy comes from `content-matrix.md` → Services:
  **Modern Strategy. Rooted in Culture.** / **以真實故事為基石，用新時代手法創造影響力。**
  See *Copy conflicts* below — the Figma text layers on this section are stale.
- **`ServicesList`** — new page-local section. Renders the four services as four instances of the
  existing shared **`ServiceCard`** (`app/_components/ServiceCard.tsx`, shipped Phase 2, corrected
  in Phase 3, still with zero real consumers). Desktop draws each card full-bleed at 1440×647 with
  a 64px lead-in; mobile stacks four cards of differing heights (955 / 871 / 931 / 895px) with no
  gap. No new shared component — `ServiceCard` is composed as-is unless the real copy needs a prop
  it does not have.
- **Services copy for both locales** — the four services (each: numbered title, description, three
  feature rows) and the header block, from `content-matrix.md` → Services (D032), into a new
  `app/_lib/i18n/{en,zh}/services.ts` following the Phase 7b module split and its explicit
  `typeof enServices` annotation (D060). The FAQ copy is **not** transcribed this phase.
- **Four service photographs + the hero photograph** exported from Figma with `download_assets`
  into `public/images/services/`. `ServiceCard` takes a required `image` — no placeholders in a
  phase that is meant to be reviewed.
- **`app/_lib/routes.ts`** — `services` joins `darkNavRoutes`. Both desktop frames instance
  `Desktop NAV/DARK`, the same reason `home` and `about` are already in that table (D052).
- **`app/[locale]/services/page.tsx`** — stops rendering `PagePlaceholder`, renders
  `ServicesHero` → `ServicesList`. It deliberately ends there: the FAQ and the green CTA arrive in
  Phase 9, so the page runs hero → cards → Footer at the end of this phase.
- **`openspec/DECISIONS.md`** — this phase's derived and conflict-resolving calls, continuing
  from D065.

### Copy conflicts resolved at proposal time

| Conflict | Resolution |
| :--- | :--- |
| The desktop hero body text layer is named `Updates on artists, collaborations, and what we're…` — that is **News** copy. The mobile one is named `A selection of projects connecting artists, audien…` — that is **Portfolio** copy. | **The matrix wins**, per D032, and this is the ordinary case rather than an exception: the body is *We provide integrated support across the full lifecycle of music projects.* / *除了創作，其他音樂發展路上的大小難事，讓子皿幫你通通搞定。* The Figma layers are leftovers from a duplicated page frame. The **live text content** will still be confirmed with `get_design_context` at apply time — a Figma layer *name* is a stale snapshot of its first string, not its current one. |
| The TC desktop frame is an **instance** of the EN frame, so every layer name inside it still reads English (`Modern Strategy.`, `Do you work with artists outside of Taiwan?`). | Layer names are worthless in TC. Take TC strings from the matrix and TC **geometry** from `get_design_context` on `12635:12925` — the heading alone grows 316px → 510px, pushing the header from 1334px to 1528px. |
| The eyebrow labels `SERVICES` and `FAQS` are marked `keep EN` in the matrix. | The `Services` eyebrow stays English in both locales. (`FAQS` is Phase 9's.) |

### Explicitly out of scope

- **The FAQ section and its accordion behavior**, in both breakpoints and locales. Phase 9. The
  matrix's `REMOVE` instruction for Figma FAQ Q3 and the `待補` sixth question are Phase 9's
  problem, not this phase's — the FAQ copy is not even transcribed into `i18n` here.
- **`UniversalCTA` on this page.** It exists and works; wiring it in is Phase 9's task, alongside
  the FAQ it sits below.
- **Anchor targets for the Footer's five Services sub-links.** D-G made them all point at
  `/services` as a whole page because no anchors existed. This phase builds four of the five
  sections they name but does **not** add `id`s or repoint the Footer — that is a Footer change
  and needs its own decision.
- **The floating desktop `MENU` square** `12612:11840` — still deferred per D039/D045, which the
  roadmap schedules before Phase F.
- `/portfolio`, `/artists`, `/news`, `/contact` — untouched.

### Inherited work claimed

| Owed by | Item | Disposition |
| :--- | :--- | :--- |
| Phase 8 | Re-measure the mobile menu's clamp minima (D062, D063) | **Verify, do not re-measure.** This phase adds nothing to `routes.ts`'s `routes` array — `services` already has a NAV link, and joining `darkNavRoutes` is a theme table, not a link. The seven-link count that the 553px floor is sized for is unchanged, so the arithmetic holds. The task is to confirm that in the browser and tick the roadmap row, not to redo the measurement. |

## Capabilities

### New Capabilities

None. This phase implements two sections of a finished design onto a route that already exists.
It adds no route, no build-time contract, and no behavior a spec would describe —
`localized-routing` already covers `/en/services` and `/zh/services` resolving, and
`design-primitives` already covers `ServiceCard`, `SecondaryCta`, and `Eyebrow`.

### Modified Capabilities

None. `skip_specs: true` is set in this change's `.openspec.yaml` accordingly, per the guidance to
prefer opting out over inventing a requirement to satisfy validation.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/services/page.tsx` | `PagePlaceholder` replaced by `ServicesHero` + `ServicesList` |
| `app/[locale]/services/_components/ServicesHero.tsx` | New — server component |
| `app/[locale]/services/_components/ServicesList.tsx` | New — server component |
| `app/_lib/i18n/{en,zh}/services.ts` | New — header block + the four services; registered in each locale's `index.ts` |
| `app/_lib/routes.ts` | `services` added to `darkNavRoutes` |
| `public/images/services/` | New — 1 hero photograph + 4 service card photographs, exported from Figma |
| `app/_components/ServiceCard.tsx` | Composed as-is; touched only if the real copy needs a prop it lacks |
| `app/_components/INVENTORY.md` | `ServiceCard`'s and `Eyebrow`'s rows updated with their first/new real consumers; no new shared component |
| `app/globals.css` | Only if a token in `design-tokens.md` is not yet wired into `@theme` |
| `openspec/reference/roadmap.md` | Phase 8 ticked; the Phase 8 Inherited Work row resolved |
| `openspec/DECISIONS.md` | Appended, continuing from D065 |

No dependency changes. No API routes. Nothing removed except the `PagePlaceholder` call.

**User verifies:** `/en/services` and `/zh/services` at 393px and 1440px — the page opens on a
dark NAV over the hero photograph with the correct heading and body (not News or Portfolio copy),
then runs four service cards numbered 01–04 with real photographs, real feature rows, and a
working secondary CTA on each, and then ends at the Footer. The FAQ and green CTA are absent by
design; that gap is Phase 9.

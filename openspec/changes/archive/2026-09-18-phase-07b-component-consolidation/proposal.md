# Phase 07b — Component Consolidation

## Why

The shared component built to own section headers — `TitleGroup` — has **no consumer outside
the styleguide**. Every real page hand-rolled its own instead: nine copies of the same
rotated dot-plus-label eyebrow across seven files, five of them byte-identical but for a
text color and a `translate-y-*` nudge. Phases 8–15 add seven more pages, every one of which
starts with an eyebrow, so the copy count roughly doubles if this is not fixed first.

The i18n dictionaries have the same shape of problem ahead of them: `en.ts` is 224 lines
covering **two of nine pages**, mirrored by hand in a 237-line `zh.ts`. Splitting them costs
an hour now and grows expensive with every page phase.

Doing this at the Phase 7/8 boundary means Phases 8–15 build on consolidated primitives
rather than adding to the pile. Doing it after Phase 15 means touching nine pages instead of
two.

## What Changes

**Ship `app/_components/Eyebrow.tsx`** — the green square plus rotated uppercase label. Three
props: `label`, `tone`, and `className` for the caller's reserved box and nudge. The caller
keeps ownership of the box because the box genuinely differs per site (`h-[99px] w-[17px]`
in most section headers, `h-[88px] w-[18px]` in the Home hero, absolutely positioned in the
Home services gutter).

Replaces the five named local `Eyebrow` functions and the four inline copies:

| Site | File | Form today |
| :--- | :--- | :--- |
| Home intro | `app/[locale]/_components/HomeIntro.tsx:29` | local `function Eyebrow` |
| Home featured projects | `app/[locale]/_components/HomeFeaturedProjects.tsx:32` | local `function Eyebrow` |
| Our Story intro | `app/[locale]/about/_components/AboutIntro.tsx:18` | local `function Eyebrow` |
| Our Story team | `app/[locale]/about/_components/AboutTeam.tsx:18` | local `function Eyebrow` |
| Our Story how-we-work | `app/[locale]/about/_components/AboutHowWeWork.tsx:10` | local `function Eyebrow` |
| Home services ×2 | `app/[locale]/_components/HomeServices.tsx:125,219` | inline |
| Our Story hero ×2 | `app/[locale]/about/_components/AboutHero.tsx:40,74` | inline |

**BREAKING (internal): delete `app/_components/TitleGroup.tsx`.** It has one importer,
`app/styleguide/_components/PrimitiveSpecimens.tsx`, and no page uses it. Its desktop branch
is a Phase-2 derived approximation of a symbol that does not exist at 1440px in Figma, which
is precisely why no page could adopt it. Its styleguide specimen is replaced by an `Eyebrow`
specimen. Its `INVENTORY.md` row is removed.

**Audit for `SectionHeader`, then decide.** `AboutHowWeWork:33`, `AboutHero:39`, and
`TitleGroup`'s mobile branch independently arrived at the identical shell — `flex w-full
items-start gap-[5px] pr-[15px]`, a `h-[99px] w-[17px]` eyebrow box, and a `pt-[20px]`
heading. Three independent arrivals at the same numbers is a pattern. But `HomeServices`
positions its eyebrow absolutely and `HomeIntro`/`HomeFeaturedProjects` use different box
heights, so the fit is not universal. **Build it only if the audit finds five or more of the
nine sites fit unchanged** — below that it is `TitleGroup`'s mistake repeated, and the phase
ships `Eyebrow` alone and says so.

**Split the i18n dictionaries per page** — `app/_lib/i18n/{en,zh}/{home,about,common}.ts`
composed by `index.ts`, preserving the existing `getDictionary(locale)` signature so no
component changes. While there: `satisfies Record<Locale, typeof en>` catches *missing* `zh`
keys but the shorthand `{ en, zh }` is not a fresh object literal, so **extra** `zh` keys
pass silently. An explicit `const zh: typeof en` annotation closes that gap and makes
CLAUDE.md's "missing translation fails loudly at build time" fully true.

**Not in scope.** The `lg:hidden` / `hidden lg:*` sibling-tree pattern in eight components is
deliberate (D040 and the `ServiceCard` header comment both explain why the two breakpoints
are different DOM, not a reflow). It is not duplication and is not touched — `design.md`
records this so a future session does not "helpfully" merge them.

## Capabilities

### New Capabilities

None. This is a refactor of presentational components. `Eyebrow` renders the same markup the
nine copies render today; `config.yaml` is explicit that visual appearance is not a spec.

### Modified Capabilities

None. `design-primitives` describes primitive behavior and gains no new requirement — an
eyebrow has no states, no interaction, and no locale variance beyond the string. `skip_specs:
true` is set in `.openspec.yaml`.

## Impact

| Area | Effect |
| :--- | :--- |
| `app/_components/Eyebrow.tsx` | **New** |
| `app/_components/TitleGroup.tsx` | **Deleted** |
| `app/_components/SectionHeader.tsx` | **New, conditional** on the audit in task 2.1 |
| `app/[locale]/_components/` | `HomeIntro`, `HomeFeaturedProjects`, `HomeServices` — local copies removed |
| `app/[locale]/about/_components/` | `AboutIntro`, `AboutTeam`, `AboutHowWeWork`, `AboutHero` — local copies removed |
| `app/styleguide/_components/PrimitiveSpecimens.tsx` | `TitleGroup` specimen replaced with `Eyebrow` |
| `app/_lib/i18n/` | Split into per-page modules; `getDictionary` signature unchanged |
| `app/_components/INVENTORY.md` | `TitleGroup` row removed; `Eyebrow` (and `SectionHeader`, if built) added |
| `openspec/DECISIONS.md` | New decision on where the eyebrow abstraction sits and why `TitleGroup` was wrong |
| Rendered output | **Must be pixel-identical.** Any visual difference is a bug in this phase, not an improvement. |

## Verification

This is the first phase whose success criterion is that **nothing changes visually**.

The user verifies in a browser at **393px and 1440px** in **both locales**:

1. `/en` and `/zh` — hero, intro, featured projects, services. Every eyebrow sits where it sat.
2. `/en/about` and `/zh/about` — hero, intro, how-we-work, team. Same.
3. `/styleguide` — the `TitleGroup` specimen is gone, an `Eyebrow` specimen is in its place.

Before/after screenshots at all four viewport-locale combinations are a task, not a
courtesy — a 2px eyebrow shift across nine sites is exactly the kind of regression that
survives a casual look.

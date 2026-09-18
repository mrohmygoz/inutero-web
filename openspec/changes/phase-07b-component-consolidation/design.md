# Phase 07b — Design Notes

## Table of Contents

- [D-A: Why `TitleGroup` failed, and what shape replaces it](#d-a-why-titlegroup-failed-and-what-shape-replaces-it)
- [D-B: `tone` collapses four token names to two rendered colors](#d-b-tone-collapses-four-token-names-to-two-rendered-colors)
- [D-C: `SectionHeader` is conditional on an audit](#d-c-sectionheader-is-conditional-on-an-audit)
- [D-D: `ServiceCard`'s numbered tag stays inline](#d-d-servicecards-numbered-tag-stays-inline)
- [D-E: The two-subtree pattern is not duplication](#d-e-the-two-subtree-pattern-is-not-duplication)
- [D-F: i18n split preserves the public signature](#d-f-i18n-split-preserves-the-public-signature)
- [Audit results (task 2)](#audit-results-task-2)
- [Risks](#risks)

## D-A: Why `TitleGroup` failed, and what shape replaces it

**The history matters, because the same mistake is available again.** Phase 2 built
`TitleGroup` from the Figma mobile symbol `12219:946`. Phase 3 then discovered no
corresponding symbol exists at 1440px — real desktop pages compose the eyebrow and heading
inline, per-page — so the desktop branch became "a derived approximation", in the component's
own words. At the same time, Phase 3 **deleted** `TaglineWrapper`, the standalone eyebrow
primitive, "for having a single consumer".

Both calls were locally reasonable and jointly wrong. The composite survived with a guessed
desktop half that no page could adopt; the genuinely reusable atom was deleted just before it
acquired nine consumers.

```
   WRONG SHAPE (Phase 2)              RIGHT SHAPE (this phase)
   ══════════════════════             ════════════════════════

   TitleGroup                         Eyebrow
   ├─ eyebrow box   (fixed 99x17)     └─ green square + rotated label
   ├─ heading       (h1 | h2)            props: label, tone, className
   ├─ description   (optional)           caller owns the box
   └─ 2 breakpoint copies
                                      SectionHeader  (conditional, D-C)
   0 consumers                        ├─ <Eyebrow/>
   9 hand-rolled copies instead       └─ heading slot
```

**The rule this phase applies:** share the atom, not the composition. The eyebrow's *content*
(a 7px green square, `gap-[10px]`, an uppercase `text-label-m` label, `rotate-90`) is identical
at all nine sites. Its *container* is not — the reserved box is `h-[99px] w-[17px]` in most
section headers, `h-[88px] w-[18px]` in the Home hero, `h-[50px] w-[17px]` with the opposite
rotation in `ServiceCard`, and absolutely positioned in the Home services gutter. The box
belongs to the caller.

**Why a reserved box at all**, rather than rotating in place: `ServiceCard`'s header comment
records this the hard way — rotating from `transform-origin: top left` without a reserved box
pushes the visual footprint outside the element's flex-allocated space, and a parent's
`overflow-hidden` then clips it away entirely. That was found by inspecting a screenshot where
the tag was fully invisible. `Eyebrow` must not re-introduce it, and the `className` prop is
how the caller keeps supplying a real box.

## D-B: `tone` collapses four token names to two rendered colors

The nine copies use four different color classes, but `globals.css` resolves them to two
values:

| Class used today | Resolves to | Sites |
| :--- | :--- | :--- |
| `text-(--color-basic-accent)` | `#131417` | Home intro, Home featured projects |
| `text-(--color-basic-text-primary)` | `#131417` | Our Story intro, Our Story team |
| `text-(--color-basic-background)` | `#ffffff` | Home services ×2 |
| `text-white` | `#ffffff` | Our Story how-we-work, Our Story hero ×2 |

`--color-basic-accent` and `--color-basic-text-primary` are both `--primitive-neutral-darkest`;
`--color-basic-background` is `--primitive-white`. **Two tones, four names** — the drift is in
which name each phase happened to reach for, not in the design.

**Decision.** `tone: 'dark' | 'light'`, defaulting to `'dark'`, following the precedent
`TitleGroup`, `Cta`, `SecondaryCta` and `ArtistCard` already set (D013): `dark` →
`--color-basic-accent`, `light` → `--color-basic-background`. `text-white` is replaced by the
token; it is a raw value, which CLAUDE.md forbids in components.

**This is a rendered no-op** — every substitution above produces the identical computed color.
That is required: this phase changes no pixels (see Risks).

## D-C: `SectionHeader` is conditional on an audit

Three sites independently arrived at the same header shell — `flex w-full items-start
gap-[5px] pr-[15px]`, a `h-[99px] w-[17px]` eyebrow box, and a heading with `pt-[20px]`
(`AboutHowWeWork:33`, `AboutHero:39`, `TitleGroup`'s mobile branch). That is a real pattern,
not a coincidence: it is the Figma mobile section-header geometry, reached three times without
a shared component.

But it is not universal, and `TitleGroup` is what over-generalizing here produces.

**The gate:** audit all nine sites first. Build `SectionHeader` only if **five or more fit
unchanged** — no extra wrapper, no negative margin to undo its padding, no prop invented for a
single caller. Below five, ship `Eyebrow` alone and record in `DECISIONS.md` that the header
shell was examined and rejected, with the count. A future phase then has the evidence instead
of re-running the audit.

If it is built, the heading is a `children` slot, not a `heading: string` + `headingSize` prop
pair. Heading size, tag (`h1`/`h2`/`p`), gradient fills, and per-locale scale all vary per
page — that prop pair is the second reason `TitleGroup` could not be adopted.

## D-D: `ServiceCard`'s numbered tag stays inline

`ServiceCard:97` renders the same green-square-plus-rotated-label shape, but rotates the
**opposite direction** — the component's header comment confirms this was verified in both
breakpoint exports and is "a genuine per-instance difference, not a mistake to reconcile by
sharing a primitive".

It is also not an eyebrow: it is a numbered index badge on a card, and its label is `"01"`,
not a section name. Folding it into `Eyebrow` would need a `direction` prop existing for one
caller — the same over-generalization as D-C, at smaller scale.

**Decision:** leave it inline. Record it, so a later phase does not "finish the job".

The `Footer:61` rotated label and `HomeHero:101,202` scroll label are likewise **not**
eyebrows — both are rotated text with no green square. Out of scope, untouched.

## D-E: The two-subtree pattern is not duplication

Eight components ship a `lg:hidden` tree beside a `hidden lg:*` tree. It reads as copy-paste
and is not: D040 establishes that placed compositions and flow sections behave differently
across the 1024px switch, and `ServiceCard`'s comment documents a concrete case where the two
breakpoints put the same content in *different flex containers entirely*, so no single
repositioned element can express both.

**Decision: out of scope, deliberately.** Recorded here and in `DECISIONS.md` so a future
session — or an agent asked to "reduce duplication" — does not merge them and silently break a
breakpoint. This phase's diff must not remove a single `lg:hidden` pair.

## D-F: i18n split preserves the public signature

`en.ts` covers two of nine pages in 224 lines. Seven page phases remain.

```
  NOW                            AFTER
  ───                            ─────
  _lib/i18n/                     _lib/i18n/
  ├── en.ts     (224)            ├── en/
  ├── zh.ts     (237)            │   ├── home.ts
  └── index.ts  (16)             │   ├── about.ts
                                 │   └── common.ts      (common, nav,
   2 of 9 pages                  ├── zh/                 universalCta, share,
                                 │   └── (mirror)        newsletter, footer)
                                 └── index.ts  — getDictionary() unchanged
```

`getDictionary(locale)` keeps its signature and return shape, so **no component changes**.
That is what makes this safe to bundle with the eyebrow work: the two touch disjoint files.

**The type gap this also closes.** `index.ts` uses `satisfies Record<Locale, typeof en>`. That
catches a missing `zh` key, but `{ en, zh }` is shorthand, not a fresh object literal, so
excess-property checking does not apply and **extra or misspelled `zh` keys pass silently** —
a misspelled key reads as one addition plus one omission, and only the omission is caught.
CLAUDE.md promises missing translations "fail loudly at build time"; today that is half true.
An explicit `const zh: typeof en = {...}` annotation in each `zh/*.ts` module makes it true in
both directions.

## Audit results (task 2)

Nine eyebrow sites, thirteen call sites (five local `Eyebrow` functions serve two breakpoints
each except `AboutIntro`'s, which serves none). `AboutIntro:18` is **dead code** — the function
is defined, ESLint already flags it as unused, and the section renders no eyebrow at all.

| # | Site | Reserved box | Positioning | Nudge | Tone | Wrapper around it | Heading |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `HomeIntro` mobile | `h-[92px] w-[17px] shrink-0` | in-flow | `translate-y-2` | dark (`basic-accent`) | `flex w-full items-start gap-[5px] pr-[15px]` | `h2` `text-display-h2`, inside a `w-[346px] ... pt-[20px]` column |
| 2 | `HomeIntro` desktop | `h-[97px] w-[27px] shrink-0 py-[15px]` | in-flow | `lg:translate-y-0` | dark | `relative flex items-start pr-[16.042%] pl-[32px]` (also parents an absolute image) | `h2` `text-display-h2` `flex-1`, no `pt` |
| 3 | `HomeFeaturedProjects` mobile | `h-[106px] w-[17px]` | **absolute** `top-1` | `translate-y-2` | dark | sticky header, heading is a sibling not a flex row | `h2` `ml-[32px] w-[346px]` |
| 4 | `HomeFeaturedProjects` desktop | `h-[112px] w-[27px] shrink-0` | in-flow | `lg:translate-y-0` | dark | `flex items-start` (no `gap`, no `pr`) | `h2` `flex-1` |
| 5 | `HomeServices` mobile | `h-[99px] w-[17px]` | **absolute** `top-0 left-0` | — (inner `pl-[25px]`) | light (`basic-background`) | left gutter, heading is a sibling with `ml-[32px]` | `h2` |
| 6 | `HomeServices` desktop | `h-[74px]` inside `w-[27px] shrink-0 py-[15px]` | in-flow, **two nested boxes** | — | light | `flex items-start`, heading inside a `flex-1` column with `gap-[80px]` | `h2` |
| 7 | `AboutIntro` | — | — | — | dark (`basic-text-primary`) | — | **no call site — dead code** |
| 8 | `AboutTeam` mobile | `h-[99px] w-[17px] shrink-0` | in-flow | `translate-y-[-2px]` | dark | `flex w-full items-start gap-[5px] pr-[15px]` | `h2` `flex-1 pt-[20px]` |
| 9 | `AboutTeam` desktop | `h-[77px] w-[27px] shrink-0` | in-flow | `lg:translate-y-[-12px]` | dark | `flex items-start gap-[5px]` | `h2` `flex-1`, no `pt` |
| 10 | `AboutHowWeWork` mobile | `h-[99px] w-[17px] shrink-0` | in-flow | `translate-y-3` | light (`text-white`) | `flex w-full items-start gap-[5px] pr-[15px]` | `h2` `flex-1 pt-[20px]` |
| 11 | `AboutHowWeWork` desktop | `h-[74px] w-[27px] shrink-0` | in-flow | `lg:translate-y-1` | light | `flex items-start gap-[5px]` | heading inside a `flex-1` column with `gap-[80px]` |
| 12 | `AboutHero` mobile | `h-[99px] w-[17px] shrink-0` | in-flow | `translate-y-4` | light | `flex w-full items-start gap-[5px] pt-[74px] pr-[15px]` | `h1`, inside a `flex-1 flex-col justify-center pt-[20px]` column |
| 13 | `AboutHero` desktop | `h-[64px] w-[17px] shrink-0` **`items-start`** | in-flow, `mt-12` | — | light | `relative flex items-start px-[32px] py-[68px] mt-24` | `h1` `flex-1` |

### `SectionHeader` gate (D-C): **failed — 2 of 9**

Only `AboutTeam` and `AboutHowWeWork` present the candidate shell (`flex w-full items-start
gap-[5px] pr-[15px]` + `h-[99px] w-[17px]` box + `pt-[20px]` heading) unchanged at mobile, and
even those two diverge at desktop — different box heights (`77px` vs `74px`), different nudges,
and `AboutHowWeWork` puts its heading inside a nested `gap-[80px]` column. Of the rest:
`AboutHero` needs `pt-[74px]` added to the shell and a heading column; `HomeIntro` has a
different box height plus a heading column; `HomeFeaturedProjects` and `HomeServices` are not a
flex row at all at mobile (absolutely positioned eyebrow, heading as a sibling).

Two of nine is well below the five-of-nine gate. **`SectionHeader` is not built.** Task group 4
is skipped. Making it fit would require a box-size prop, a nudge prop, a wrapper-padding prop
and an optional heading column — i.e. `TitleGroup` again.

### Alignment is caller-owned

`AboutHero` desktop uses `items-start`; every other site uses `items-center`. Rather than
resolve that with a prop or rely on Tailwind's class-conflict ordering, `Eyebrow`'s root carries
**only** the caller's `className`. The shared markup is the rotated square-plus-label content,
exactly as task 3.1 specifies. Each call site therefore keeps its box classes verbatim, which is
also what makes this phase's no-pixel-change requirement checkable by inspection.

### `HomeServices` mobile `pl-[25px]` — measured, not reasoned

That padding sits on the flex row **inside** the `rotate-90` wrapper, so it is not a class that
moves to the caller's box unchanged. The arithmetic says it should: pre-rotation it widens the
rotated element by 25px while leaving its centre fixed, shifting the content's centre by +12.5px
along the pre-rotation x axis, which `rotate-90` maps to +12.5px downward. That was implemented
as `translate-y-[12.5px]` on the caller's box and **screenshot-diffed against the baseline**.

The vertical position came back exact. The horizontal position did not: the rotated element's
pre-rotation width changes by 25px, its layout box's left edge lands on a different device-pixel
boundary, and the 7px green square's antialiasing shifts about half a pixel across — 28 pixels
differing at delta 98, in both locales, against a run-to-run noise floor of delta 2. Restoring
the inset dropped both pages back to the noise floor, which attributes the difference to this
substitution alone and confirms the other twelve call sites are exact.

So the inset stays inside the rotation, behind a `gutterInset` prop (D061). That is a prop
existing for one caller, which D-C's gate exists to prevent — but the gate is about generalizing
a *layout shell* on speculation, and this is the opposite: reproducing one site's existing markup
because the phase's success criterion is that nothing moves. A rasterization-dependent magic
offset is the worse trade; it would also drift differently at other device pixel ratios.
User-confirmed 2026-09-18.

## Risks

| Risk | Mitigation |
| :--- | :--- |
| **A 1–2px shift across nine sites.** The nudges (`translate-y-2`, `-translate-y-[12px]`, `translate-y-3`) are per-site and easy to drop while consolidating. | Before/after screenshots at 393px and 1440px × `/en` and `/zh`, for `/`, `/about` and `/styleguide` — a task, not a courtesy. Each nudge moves verbatim into the caller's `className`. |
| **Scope creep into `SectionHeader`.** The pull to generalize is exactly what produced `TitleGroup`. | The five-of-nine gate in D-C, decided by an audit written down before any code. |
| **This phase has no visible output**, so "looks fine" is a weak gate. | The proposal states it plainly: any visual difference is a bug in this phase, not an improvement. Screenshot diffing, not eyeballing. |
| **Deleting `TitleGroup` loses its Figma archaeology** — the comment block records that `12220:1079` and `12405:6424` are mobile-frame instances, not desktop ones. | That finding moves into the `DECISIONS.md` entry for this phase before the file is deleted. It cost a phase to learn. |
| Bundling two unrelated refactors (eyebrow + i18n) in one phase. | They touch disjoint files and neither changes rendered output. If the eyebrow audit overruns, the i18n split drops to its own change rather than being rushed. |

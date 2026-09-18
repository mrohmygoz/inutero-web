## 1. Baseline before touching anything

- [ ] 1.1 Run `npm run dev` and capture reference screenshots with `playwright-cli` at **393px and 1440px** for `/en`, `/zh`, `/en/about`, `/zh/about`, `/styleguide` — 10 shots. These are the before-set; every later comparison is against them.
- [ ] 1.2 Confirm `npm run lint` and `npx tsc --noEmit` pass on the untouched tree, so any failure later is provably this phase's.

## 2. Audit — decide `SectionHeader` before writing it

- [ ] 2.1 Read all nine eyebrow sites and tabulate, per site: reserved-box size, positioning (in-flow vs. absolute), nudge, tone, heading tag, heading size, and the wrapper classes around it. Sites: `HomeIntro:29`, `HomeFeaturedProjects:32`, `HomeServices:125`, `HomeServices:219`, `AboutIntro:18`, `AboutTeam:18`, `AboutHowWeWork:10`, `AboutHero:40`, `AboutHero:74`.
- [ ] 2.2 Apply the D-C gate: count how many fit a single `SectionHeader` shell **unchanged** — no extra wrapper, no negative margin undoing its padding, no prop invented for one caller. Five or more → build it in task 4. Fewer → do not, and record the count.
- [ ] 2.3 Write the audit table into `design.md` under a new "Audit results" heading, with the decision and the count. This is the evidence a later phase needs so it does not re-run the audit.

## 3. Ship `Eyebrow`, retire `TitleGroup`

- [ ] 3.1 Create `app/_components/Eyebrow.tsx`: props `label: string`, `tone?: 'dark' | 'light'` (default `'dark'`), `className?: string`. Markup is the shared inner content only — 7px green square, `gap-[10px]`, `rotate-90`, uppercase `text-label-m` label. The caller's `className` supplies the reserved box (D-A: rotating without a reserved box gets clipped by an ancestor's `overflow-hidden`).
- [ ] 3.2 Map `tone` per D-B: `dark` → `text-(--color-basic-accent)`, `light` → `text-(--color-basic-background)`. Both are rendered no-ops against every class in use today; `text-white` is replaced by the token per CLAUDE.md's no-raw-values rule.
- [ ] 3.3 Replace the five named local `Eyebrow` functions with the shared one — `HomeIntro`, `HomeFeaturedProjects`, `AboutIntro`, `AboutTeam`, `AboutHowWeWork`. Move each site's box size and `translate-y-*` nudge verbatim into the caller's `className`. Delete the local function.
- [ ] 3.4 Replace the four inline copies — `HomeServices:125` and `:219`, `AboutHero:40` and `:74`. `HomeServices` keeps its `absolute top-0 left-0` gutter positioning and its `pl-[25px]`; those stay on the caller.
- [ ] 3.5 Grep for `rotate-90` and confirm only the intended survivors remain: `ServiceCard:97` (D-D), `Footer:61`, `HomeHero:101` and `:202` (both rotated text with no green square — not eyebrows), plus `Eyebrow.tsx` itself.
- [ ] 3.6 Before deleting `TitleGroup.tsx`, copy its Figma archaeology into the `DECISIONS.md` draft for task 6.1 — specifically that `12220:1079` and `12405:6424` are 393px mobile-frame instances, not desktop ones, and that no shared Title Group symbol exists at 1440px. That finding cost a phase to learn.
- [ ] 3.7 Delete `app/_components/TitleGroup.tsx`.
- [ ] 3.8 Replace the `TitleGroup` specimen in `app/styleguide/_components/PrimitiveSpecimens.tsx` with an `Eyebrow` specimen showing both tones — `light` on a dark swatch so it is actually visible.
- [ ] 3.9 Verify nothing still imports `TitleGroup` (`npx tsc --noEmit` catches it; grep as well).

## 4. `SectionHeader` — only if task 2.2 passed the gate

- [ ] 4.1 Skip this whole group if the audit counted fewer than five. Say so explicitly in the final report rather than leaving it silently unchecked.
- [ ] 4.2 Create `app/_components/SectionHeader.tsx` composing `Eyebrow`. The heading is a `children` slot, **not** a `heading: string` + `headingSize` prop pair (D-C — that pair is a second reason `TitleGroup` went unused).
- [ ] 4.3 Migrate only the sites the audit found fit unchanged. Leave the rest composing `Eyebrow` directly; a partial fit is not a fit.

## 5. Split the i18n dictionaries

- [ ] 5.1 Split `app/_lib/i18n/en.ts` into `en/home.ts`, `en/about.ts`, `en/common.ts` (carrying `common`, `nav`, `universalCta`, `share`, `newsletter`, `footer`), re-exported by `en/index.ts` in the existing key order.
- [ ] 5.2 Mirror the split for `zh.ts`, annotating each module explicitly — `const home: typeof enHome = {...}` — so extra and misspelled keys fail at build time, not just missing ones (D-F).
- [ ] 5.3 Keep `getDictionary(locale)`'s signature and return shape identical. No component may need editing for this task; if one does, the split is wrong.
- [ ] 5.4 Prove the type gap is closed: temporarily add a bogus key to a `zh` module, confirm `npx tsc --noEmit` fails, then remove it.

## 6. Documentation

- [ ] 6.1 Append to `openspec/DECISIONS.md`: where the eyebrow abstraction sits and why the composite was the wrong cut (D-A), the four-names/two-tones collapse (D-B), the `SectionHeader` audit outcome with its count (D-C), `ServiceCard`'s tag staying inline (D-D), the two-subtree pattern being deliberate and out of scope (D-E), and the `TitleGroup` Figma archaeology from task 3.6.
- [ ] 6.2 Update `app/_components/INVENTORY.md`: remove the `TitleGroup` row, add `Eyebrow` (and `SectionHeader` if built) with consumers and Figma node references.
- [ ] 6.3 If `openspec/reference/roadmap.md` exists from Phase 07a, tick Phase 07b and note anything deferred.

## 7. Verify

- [ ] 7.1 Re-capture all 10 screenshots from task 1.1 and compare against the baseline. **Any visible difference is a bug in this phase, not an improvement** — investigate before proceeding, do not accept it as a tidier result.
- [ ] 7.2 Check `next-devtools-mcp` for framework errors or warnings on `/`, `/about`, `/styleguide`.
- [ ] 7.3 Confirm the diff removes no `lg:hidden` / `hidden lg:*` pair (D-E).
- [ ] 7.4 Run `npm run lint` and `npx tsc --noEmit`.
- [ ] 7.5 Run `npx openspec validate phase-07b-component-consolidation`.
- [ ] 7.6 Report plainly: how many eyebrow sites were consolidated, whether `SectionHeader` was built and the audit count behind that call, and any site left un-migrated with the reason.

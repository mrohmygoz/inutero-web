# Phase 9 — Services part 2: tasks

## 1. Fetch the design before writing anything

- [x] 1.1 `get_design_context` on all four FAQ frames — desktop EN `12573:6686`, desktop TC `I12635:12925;12573:6686`, mobile EN `12220:2269`, mobile TC `12368:2828` — requesting a screenshot with each. TC is not EN with swapped strings.
- [x] 1.2 Sweep `node.reactions` on the FAQ nodes and their row/icon children, deep — not just the frame roots, and not `get_motion_context` alone. This is the exact sweep that was skipped in Phase 6 and made D041 wrong on the first pass. Record what it returns, including "nothing".
- [x] 1.3 If 1.2 contradicts D-A's inherited 300ms ease-out, amend `design.md` → D-A and note the correction before building. If it returns nothing, D-A stands as written.
- [x] 1.4 `get_design_context` on the two CTA instances (desktop `12573:9015`, mobile `12220:2432`) only far enough to confirm `UniversalCTA` is placed unmodified — same variant, same spacing above and below. If the Services instance differs from the Home one, stop and report rather than adding a prop.
- [x] 1.5 Export the two FAQ glyphs with `download_assets` into `public/icons/` under names distinct from the Home pair (D-E). Confirm each file is non-empty and that the `+` is black and the `×` green, matching the frames.

## 2. Copy

- [x] 2.1 Add the `faq` block to `app/_lib/i18n/en/services.ts` — eyebrow, heading, and five `{ question, answer }` pairs, transcribed whole from `content-matrix.md` → *Services — FAQ*, Final EN column.
- [x] 2.2 Mirror it into `app/_lib/i18n/zh/services.ts`, Final ZH column, keeping the explicit `typeof enServices` annotation intact so an extra or misspelled key fails `tsc`.
- [x] 2.3 Comment both modules with why the Figma question text is not the source: the matrix replaces the set entirely, Figma's Q3 is `直接刪掉`, and the desktop EN frame's rows 3–4 are near-duplicates (D032). Note the omitted sixth item and where its obligation lives (D-C).
- [x] 2.4 Character-level spot-check the two longest ZH answers against the matrix, not a gist check.

## 3. Promote the accordion panel

- [x] 3.1 Create `app/_components/AccordionPanel.tsx` by moving `HomeServices`'s panel wrapper verbatim — same props, same classes, same `inert` / `role="region"` / `aria-labelledby` wiring. No new props.
- [x] 3.2 Update `HomeServices.tsx` to import it and delete the local copy. `AccordionIcon` stays page-local.
- [x] 3.3 Re-verify Home at 393px and 1440px in both locales. A visual difference on Home means the move was not pure — fix it before continuing (design.md → Risks).

## 4. Build the FAQ section

- [x] 4.1 Create `app/[locale]/services/_components/ServicesFaq.tsx` as `'use client'` with a single `openIndex` state, item 0 open on load, one open at a time. Header a real `<button>` with `aria-expanded` / `aria-controls`; panel the promoted `AccordionPanel`.
- [x] 4.2 Build the icon cross-fade from the 1.5 exports, stacked and opacity-swapped over the same duration as the panel, with `motion-reduce` dropping the transition — the D041 treatment, not a rotation.
- [x] 4.3 Build the mobile tree (393px): stacked heading above the rows, `Eyebrow` composed directly per D057, row rules as the frames draw them.
- [x] 4.4 Build the desktop tree (1440px): two-column split, heading column left, rows right. Both columns' widths and offsets from `get_design_context`, never from this document.
- [x] 4.5 Verify each locale's section height against its own frame — EN against EN, TC against TC. Close tier: stop at ≤4px drift.

## 5. Place the CTA and finish the page

- [x] 5.1 Render `UniversalCTA` below `ServicesFaq` in `app/[locale]/services/page.tsx` and delete the Phase 8 placeholder comment.
- [x] 5.2 Confirm the page's total height tracks the frames in all four combinations (desktop EN 6260 / TC 6358, mobile EN 7575 / TC 6903), and that nothing regressed above the FAQ.

## 6. Footer anchors

- [x] 6.1 Add an `id` per card in `ServicesList.tsx`, derived from the existing `serviceLabelKeys` order so the two lists cannot drift (D-D). English ids in both locales.
- [x] 6.2 Repoint the four Services sub-links in `Footer.tsx` at `/{locale}/services#{id}`.
- [x] 6.3 Verify from the Services page itself (scrolls) and from a different route (navigates, then scrolls), at both breakpoints. If a card lands under the NAV, add `scroll-margin-top` on the card — do not change `Nav` (D-D).

## 7. Verification

- [x] 7.1 `next-devtools-mcp`: no framework errors or warnings on `/en/services` and `/zh/services`.
- [x] 7.2 Playwright screenshots of the FAQ and CTA at 393px and 1440px, in both locales — four frames each — compared side-by-side against the Figma screenshots from task 1.
- [x] 7.3 Exercise the accordion in a real browser: open each of the five rows in turn, confirm only one is ever open, the panel animates, and closed panels are out of tab order.
- [x] 7.4 Keyboard pass: tab to each header, activate with Enter and Space, confirm `aria-expanded` flips.
- [x] 7.5 Check 768 / 1023 / 1024px for horizontal overflow, confirming the `lg` snap behaves as D-F says and matching what D072 recorded for the rest of the page.
- [x] 7.6 `npm run lint` and `npx tsc --noEmit`, both clean.

## 8. Documentation

- [x] 8.1 Add the `AccordionPanel` entry to `app/_components/INVENTORY.md`, and update the `Footer` row (sub-links now anchored, superseding D-G for this column) and the `UniversalCTA` row (Services is now a real second consumer).
- [x] 8.2 Append D-A through D-F to `openspec/DECISIONS.md` with the next free numbers, each with its **How to apply** line. Include anything task 1.2's sweep corrected.
- [x] 8.3 Tick Phase 9 in `openspec/reference/roadmap.md`, and close the "Phase 9 — Repoint the Footer's five Services sub-links" Inherited Work row, noting it was **four** links, not five.
- [x] 8.4 Report honestly at the gate: anything skipped, only partly done, or off the frames — including the omitted sixth FAQ item and its `待補` status.

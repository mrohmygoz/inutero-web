## 1. Promote the roadmap

- [x] 1.1 Create `openspec/reference/roadmap.md` from the Phase Plan table in `openspec/changes/archive/2026-08-01-bootstrap-site-build-process/design.md`. Add Status and Change-id columns; mark Phases 0–7 done with their archived directory names. Do **not** copy that file's Risks or Open Questions tables (D-A).
- [x] 1.2 Add an "Inherited work" section to the roadmap carrying the three forward-phase items currently buried in `app/_components/INVENTORY.md`: `ProjectCard` / Portfolio card `12610:6812` reconciliation (Phase 10), and the desktop-only left share rail (Phases 11/14, named in both the `Cms` and `ShareRow` rows).
- [x] 1.3 Confirm the archived `bootstrap-site-build-process/design.md` is byte-for-byte unchanged (`git diff --stat` shows it untouched).
- [x] 1.4 Repoint `CLAUDE.md`'s dead path — "the full phase table is in `openspec/changes/bootstrap-site-build-process/design.md`" — at `openspec/reference/roadmap.md`, and add the roadmap as a row in the "Read These First" table.
- [x] 1.5 Add "update `openspec/reference/roadmap.md`" to the CLAUDE.md "Every phase must" table, alongside the existing INVENTORY.md and DECISIONS.md obligations (D-A — without this it drifts again within two phases).

## 2. Correct the stale facts

- [x] 2.1 Regenerate the `openspec/DECISIONS.md` Table of Contents so D049–D052 are listed. Verify every `## D0xx` heading in the body has exactly one ToC entry and every anchor resolves.
- [x] 2.2 `openspec/reference/content-matrix.md` — the Our Story `REMOVE` row for the intro body paragraph (node `12212:6370`) says the paragraph is not built. It is built, in both locales. Replace the row with the D050 outcome and cite D050.
- [x] 2.3 `openspec/reference/design-inventory.md` § Open Questions — delete the row claiming tokens "can be pulled mechanically via `get_variable_defs`". It contradicts the same file's Design Tokens section, `design-tokens.md`, and `CLAUDE.md`, all of which forbid that tool.
- [x] 2.4 Same table — replace "Desktop/Mobile breakpoint width — **OPEN.** Phase 1 picks it" with the settled answer, citing D009 and D040 (1024px).
- [x] 2.5 Same table — replace "Is Mochiy Pop One intended for Traditional Chinese? **OPEN — ask the designer**" with the waived-confirmation outcome recorded in `design-tokens.md` § Known Problems, citing D008.
- [x] 2.6 Same table — replace "NAV light/dark switch trigger — Unverified per page" with the settled answer, citing D017 and D052 (`darkNavRoutes`).
- [x] 2.7 Re-read the whole Open Questions table after 2.3–2.6 and delete any remaining row already answered elsewhere. It is Phase-0 residue; the surviving rows should be genuinely open only (D-D).
- [x] 2.8 `app/_components/INVENTORY.md` — correct the `TitleGroup` row. Its "Used on: Every section/page header with an eyebrow + heading" is false; the only importer is `app/styleguide/_components/PrimitiveSpecimens.tsx`. State the real usage and note that Phase 07b removes it. Do not delete the row — 07b does that.

## 3. Decisions needing the user (do not guess)

- [x] 3.1 `specs/` scope — confirm option A, B, or C from design.md § D-B with the user. Recommendation is A (pages are not capabilities).
- [x] 3.2 Append the chosen `specs/` scope to `openspec/DECISIONS.md` as D053, including what Phases 15 and F are still expected to spec.
- [x] 3.3 Footer "Contacts" vs NAV "Contact Us" — read `app/_components/Footer.tsx` and Figma frame `12573:9181` to establish which label actually renders, then resolve per design.md § D-C.
- [x] 3.4 Apply the 3.3 outcome: either delete the obsolete paragraph from `openspec/reference/routes.md`, or move it to `DECISIONS.md` as D054 and remove it from `routes.md`. One fact, one home.

## 4. Verify

- [x] 4.1 `git diff --stat` — confirm no file under `app/`, `content/`, or the build config is modified except `app/_components/INVENTORY.md`.
- [x] 4.2 Grep the repo for the old path `changes/bootstrap-site-build-process` and confirm no live document still points at it (the archived directory's own name is expected to differ).
- [x] 4.3 Run `npm run lint` and `npx tsc --noEmit` — both must pass. Nothing should have changed, which is the point: this phase must be provably code-neutral.
- [x] 4.4 Read `openspec/reference/design-inventory.md`, `content-matrix.md`, and `routes.md` end to end once, checking each remaining claim against `DECISIONS.md`. Report any further drift found rather than fixing it silently — it may belong to a later phase.
- [x] 4.5 Run `npx openspec validate phase-07a-openspec-hygiene`.
- [x] 4.6 Report plainly which of the ten corrections landed and which (if any) were left for the user, per tasks 3.1 and 3.3.

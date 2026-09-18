# Phase 07a — OpenSpec Hygiene

## Why

Seven phases in, the documents every phase is instructed to read before planning have
drifted from what the code actually does. Eight facts across three reference files are now
wrong or self-contradictory, and the forward-looking phase roadmap — the one document that
tells a session what Phase 8 even is — lives inside an **archived** change at a path
`CLAUDE.md` no longer points to. Phase 8 would start by reading a dead link and four stale
answers to already-settled questions.

This is docs-only work with no code risk, and it is cheapest to do now, at a phase boundary,
before eight more page phases append to the drift.

## What Changes

**Correct eight verified stale facts:**

| # | File | Correction |
| :--- | :--- | :--- |
| 1 | `openspec/DECISIONS.md` | Table of Contents stops at D048; D049–D052 exist in the body, unlinked |
| 2 | `openspec/reference/content-matrix.md` | The Our Story intro body paragraph is marked `REMOVE` / "not built" — D050 overrode this and it ships in both locales |
| 3 | `openspec/reference/design-inventory.md` | Open Questions says tokens "can be pulled mechanically via `get_variable_defs`", contradicting the same file's Design Tokens section, `design-tokens.md`, and `CLAUDE.md` |
| 4 | `openspec/reference/design-inventory.md` | "Desktop/Mobile breakpoint width — **OPEN.** Phase 1 picks it" — settled by D009/D040 at 1024px |
| 5 | `openspec/reference/design-inventory.md` | "Is Mochiy Pop One intended for TC? **OPEN — ask the designer**" — `design-tokens.md` records that confirmation was waived under D008 |
| 6 | `openspec/reference/design-inventory.md` | "NAV light/dark switch trigger — Unverified per page" — settled by D017, then D052 |
| 7 | `openspec/reference/routes.md` | The Footer "Contacts" vs NAV "Contact Us" drift has been "unresolved" for five phases — resolve it or record it as accepted |
| 8 | `app/_components/INVENTORY.md` | `TitleGroup` is listed as used on "every section/page header"; it has no consumer outside the styleguide |

**Promote the phase roadmap out of the archive.** The Phase Plan table lives in
`openspec/changes/archive/2026-08-01-bootstrap-site-build-process/design.md`, which is
append-only history, yet it describes the future and explicitly says "the phase list is a
plan, not a contract". It moves to a live `openspec/reference/roadmap.md`, and `CLAUDE.md`'s
dead path is repointed at it. The archived copy is left untouched.

**Pull forward-phase work out of component notes.** Three `INVENTORY.md` rows carry
instructions for later phases (`ProjectCard` — "Phase 10 must reconcile `12610:6812` with a
variant prop"; `Cms` and `ShareRow` — the desktop-only left share rail is Phase 11/14).
These move to the roadmap, where a phase will actually find them.

**Settle the `specs/` scope question.** Phases 5, 6 and 7 shipped three full pages and added
no capability spec, so `openspec/specs/` silently stopped tracking reality at Phase 4. The
recommendation is to accept that pages are not capabilities and write it down as a decision,
rather than let it keep drifting. Needs the user's call — see `design.md`.

**No application code is touched.** Component consolidation, including deleting `TitleGroup`,
is Phase 07b.

## Capabilities

### New Capabilities

None. This change corrects documentation and moves a planning document; no behavior changes.

### Modified Capabilities

None. `skip_specs: true` is set in `.openspec.yaml`.

## Impact

| Area | Effect |
| :--- | :--- |
| `openspec/DECISIONS.md` | ToC regenerated; two new decisions appended (roadmap location; `specs/` scope) |
| `openspec/reference/design-inventory.md` | Open Questions table rewritten — it is Phase-0 residue |
| `openspec/reference/content-matrix.md` | One `REMOVE` row corrected |
| `openspec/reference/routes.md` | Footer/NAV drift row resolved |
| `openspec/reference/roadmap.md` | **New file** — the live phase plan |
| `CLAUDE.md` | Dead path repointed; roadmap added to the "Read These First" table |
| `app/_components/INVENTORY.md` | `TitleGroup` row corrected; three forward-phase notes moved out |
| Application code | **None.** No file under `app/`, `content/`, or config is modified except `INVENTORY.md`, which is documentation. |

## Verification

There is nothing to click. The user verifies by reading:

1. `openspec/reference/roadmap.md` exists and lists Phases 8–15 + F.
2. `CLAUDE.md`'s phase-table link resolves.
3. `openspec/reference/design-inventory.md` § Open Questions contains no question already
   answered in `DECISIONS.md`.
4. `git diff --stat` touches no file under `app/` other than `INVENTORY.md`.

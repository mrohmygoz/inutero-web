## Why

The repo is a bare `create-next-app` and CLAUDE.md tells agents *what* to build but not
*how* to sequence it. A Phase 0 read of the Figma file also surfaced two facts CLAUDE.md
does not account for: **the site is bilingual (EN + Traditional Chinese)**, and only two
breakpoints (393px, 1440px) are designed. Both are expensive to retrofit — i18n touches
routing, content, fonts, and metadata — so they must be settled before any page is built.

This change establishes the build process and the shared reference material, so that each
subsequent phase is a small, independently verifiable OpenSpec change rather than an
open-ended "build the website" task.

## What Changes

- **Corrects CLAUDE.md** where Phase 0 proved it wrong or incomplete:
  - Design source of truth gains the actual canvas node IDs and an explicit
    *do-not-implement* list (the `archived` desktop section).
  - **BREAKING (to the stated architecture):** "No CMS — content hardcoded in components"
    is replaced by MDX-backed content for `portfolio/[slug]` and `news/[slug]`.
  - **BREAKING (to the stated architecture):** flat routes are replaced by `app/[locale]/`.
  - "Iterate until pixel-perfect" gains fidelity tiers so it is bounded.
  - Adds the i18n section that was entirely absent.
  - Marks the Figma-variables claim as unverified pending a Phase 1 check.
- **Adds a phased delivery process** to CLAUDE.md: one OpenSpec change per phase, each
  ending in a runnable site and a human approval gate.
- **Adds reference docs** (`openspec/reference/`) holding the design inventory and the
  canonical route table, so CLAUDE.md stays a map rather than growing into a 20KB
  per-session context tax.
- **Adds a decision log** (`openspec/DECISIONS.md`) for choices the design does not make
  for us — chiefly tablet behavior between the two designed breakpoints.

No application code is written by this change.

## Capabilities

### New Capabilities

None. This change is process, documentation, and reference material only — it introduces
no runtime behavior. `.openspec.yaml` sets `skip_specs: true` accordingly.

### Modified Capabilities

None. No specs exist yet; the first behavioral specs arrive with Phase 1.

## Impact

| Area | Effect |
| :--- | :--- |
| `CLAUDE.md` | Rewritten in place — corrections plus a new process section |
| `openspec/reference/design-inventory.md` | New — Figma canvas map, node IDs, component tables, traps |
| `openspec/reference/routes.md` | New — canonical route table, locale strategy, naming-drift resolution |
| `openspec/DECISIONS.md` | New — running log of design decisions not made by Figma |
| Application code | Untouched |
| Downstream phases | All 13–15 subsequent phases depend on the route table and locale decision landed here |

## 1. Design inventory (Phase 0)

- [x] 1.1 Map the Figma file structure — canvases, sections, node IDs
- [x] 1.2 Enumerate all 9 pages × 2 breakpoints × 2 locales with node IDs
- [x] 1.3 Enumerate shared components on both canvases with variant node IDs
- [x] 1.4 Identify do-not-implement regions (`archived`, `ref`, `photo`)
- [x] 1.5 Resolve naming drift between sitemap, desktop, and mobile
- [x] 1.6 Record desktop page heights to drive phase sizing
- [x] 1.7 Verify whether Figma variables exist — **yes.** Partial token set recorded in `design-inventory.md`; Phase 1 sweeps `COMP` for the full set.

## 2. Reference documentation

- [x] 2.1 Write `openspec/reference/design-inventory.md`
- [x] 2.2 Write `openspec/reference/routes.md` with the canonical route table
- [x] 2.3 Write `openspec/DECISIONS.md` seeded with D001–D006

## 3. CLAUDE.md corrections

- [x] 3.1 Replace the design source-of-truth link with canvas node IDs + do-not-implement list
- [x] 3.2 Add the i18n section (absent entirely)
- [x] 3.3 Correct "no CMS, hardcoded content" → MDX for detail routes
- [x] 3.4 Correct the flat file structure → `app/[locale]/`
- [x] 3.5 Replace "iterate until pixel-perfect" with fidelity tiers
- [x] 3.6 Mark the Figma-variables claim as unverified pending Phase 1
- [x] 3.7 Add the responsive section: only 393px and 1440px are designed
- [x] 3.8 Add the phased delivery process + approval gate
- [x] 3.9 Add pointers to the reference docs, `DECISIONS.md`, and `INVENTORY.md`

## 4. Handoff

- [x] 4.1 User reviewed CLAUDE.md and the reference docs (2026-08-01)
- [x] 4.2 Phase-1-blocking questions resolved (D007 no theme, D008 fonts). Remaining
      non-blocking questions carried into their phases: NAV light/dark trigger (Phase 3),
      localized slugs (Phase 3), contact form target (Phase 15), Desktop/Mobile breakpoint
      width (Phase 1)
- [ ] 4.3 Commit, archive this change, then `/clear` and open Phase 1

## 5. Figma MCP quota — RESOLVED 2026-08-01

- [x] 5.1 Resolved by copying the design file into "Test Team" (upgraded to Pro, Full seat)
      rather than buying a seat on the team owning the original. New file key:
      **`zSq5F5v3UrVAdIjuSipe3H`**. Quota is now 200/day, 15/min.
- [x] 5.2 Confirmed — `whoami` reports Full seat on tier `pro`; read calls succeed.
- [x] 5.3 Verified node IDs are identical between the original and the copy, so every ID
      recorded in `design-inventory.md` remains valid. No re-mapping needed.

## 6. Token extraction

- [x] 6.1 Extract all 124 variables across all collections and modes via `use_figma`
      (Plugin API) → `openspec/reference/design-tokens.md`
- [x] 6.2 Document why `get_variable_defs` is unsuitable for token extraction
- [x] 6.3 Font problems resolved — use the variables as-is; see D008 in `DECISIONS.md`
- [x] 6.4 Designer confirmation waived by user decision; `Mochiy Pop One` used as declared

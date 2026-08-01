# Shared Component Inventory

**Read this before building any component.** If what you need is already here, use it —
do not re-implement. If it's genuinely new, add an entry here as part of the phase that
introduces it (this is a task line in every phase's `tasks.md`, not a courtesy).

Reconcile mobile and desktop Figma component sets into one responsive React component;
handle locale variants via props, not duplicate components.

| Component | File | Used on | Figma node(s) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Cta | `Cta.tsx` | Every page with a primary action | Mobile `12368:4718`; desktop occurrences `12573:9014`, `12405:6975`, `12358:2031` | Polymorphic `<a>`/`<button>`. `tone: 'dark' \| 'green'` (default `'dark'`) — desktop occurrences split between the two; see `openspec/DECISIONS.md`. Fill-width below 1024px, hug-width above. |
| SecondaryCta | `SecondaryCta.tsx` | Services, any outline CTA | Mobile `12368:4721`; nested in `ServiceCard` `I12220:2696;12220:2660` | Same shape as `Cta`, shares `_buttonStyles.ts`. `tone: 'dark' \| 'light'` (default `'dark'`) for light vs. dark surfaces. |
| Tag | `Tag.tsx` | Portfolio/Artists filters, Project card chips | Outline: `12219:1180`; solid chip: `10274:2297` | Two variants under one name (per proposal scope): `variant="outline"` with `state: 'default' \| 'active'` (white-on-dark, matches Figma's white/opacity-20 tokens); `variant="solid"` with `color: 'neon' \| 'yellow' \| 'orange'`. |
| TitleGroup | `TitleGroup.tsx` | Every section/page header with an eyebrow + heading | Mobile `12219:946`; desktop `12220:1079` (header), `12405:6424` (Home Hero) | `tone: 'dark' \| 'light'` (default `'dark'`), `headingSize: 'h1' \| 'h2'` (default `'h2'`). Home Hero's gradient heading fill is a page-level `className` override, not built in — see D-A in `design.md`. |
| TaglineWrapper | `TaglineWrapper.tsx` | Nested inside `TitleGroup` and `ServiceCard`; usable standalone | `10270:2179` | Always renders rotated 90° — no horizontal occurrence exists in the design. `tone: 'dark' \| 'light'` (default `'dark'`). |
| ProjectCard | `ProjectCard.tsx` | Portfolio grid, Home "Featured Projects" | Mobile `10274:2306`; desktop occurrence `12610:6812` | Presentational shell (D-C) — no MDX/route knowledge. Fixed 353px mobile / 325px desktop width. `image` is optional; renders a neutral placeholder when absent (real project imagery is Phase 11 MDX content). |
| ArtistCard | `ArtistCard.tsx` | Featured Artists | Desktop `12592:6786`; mobile occurrence `12220:1114` | Presentational shell. Fixed 320px width (desktop-defined, scales via the mobile grid in the page phase). Social links are generic (`iconSrc`/`label`/`href`) — Figma names every icon "Link", no platform baked in. |
| TeamCard | `TeamCard.tsx` | Our Story | Desktop `12610:6405`; mobile occurrence `12217:886` | Presentational shell. Fixed 284px width at both breakpoints. |
| ServiceCard | `ServiceCard.tsx` | Services | Desktop `12600:7460`; mobile occurrence `12220:2696` | **Shell only** — no Services page grid, accordion, or section padding (D-C). Responsive: side-by-side split ≥1024px, stacked below. Composes `TaglineWrapper` and `SecondaryCta`. |
| Article | `Article.tsx` | News, News Details "Related posts" | Desktop `12612:7696`; mobile occurrence `12220:1670` | Added mid-Phase-2, user-directed (see proposal.md). Presentational shell (D-C) — no MDX/route knowledge; the `CMS` long-form body renderer is still Phase 4. Composes `Tag` (solid variant). Desktop splits side-by-side, mobile stacks with the image last. |

Shared button sizing/state classes live in `_buttonStyles.ts` (not itself a component —
imported by `Cta` and `SecondaryCta` so the fill→hug width switch and focus/hover treatment
stay in one place, per D-D/D-F in `openspec/changes/phase-02-primitives/design.md`).

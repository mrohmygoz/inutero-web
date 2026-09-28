## 1. Figma context

- [x] 1.1 `/figma-design-to-code`, then `get_design_context` + `get_screenshot` for all four
      News Details frames: desktop EN `12612:8828`, desktop TC `12635:20097`, mobile EN
      `12211:4467`, mobile TC `12368:2669`.
- [x] 1.2 `get_metadata` sweep for `node.reactions` across all four frames — confirm whether
      any prototype exists on the related-posts cards or hero (expected: none, per
      Portfolio's D083–D085 precedent). Record the finding either way.
- [x] 1.3 Read the related-posts section's drawn card count and layout (grid vs. row) off
      the desktop and mobile frames — this fixes design.md's derived-selection cap.

## 2. `ShareRail` promotion

- [x] 2.1 Move `app/[locale]/portfolio/[slug]/_components/ShareRail.tsx` to
      `app/_components/ShareRail.tsx`.
- [x] 2.2 Update `PortfolioDetail.tsx`'s import path. No prop or behavior change.
- [x] 2.3 Re-verify Portfolio Details in the browser (393px + 1440px, `/en` + `/zh`) as a
      regression check on the move.

## 3. `NewsDetail` component — breadcrumb + hero

- [x] 3.1 In `app/_lib/content/frontmatter.ts`, make `heroImage` valid-and-optional on
      `news` (not just `portfolio`) — same contract, path under `public/`, falls back to
      `image` when absent. Update the field's doc comment to say "both content types."
      No existing `.mdx` file needs an edit; verify no news entry currently sets
      `heroImage` (would have thrown before this task) so this is purely additive.
- [x] 3.2 Create `app/[locale]/news/[slug]/_components/NewsDetail.tsx`.
- [x] 3.3 Build the `NEWS > {title}` breadcrumb, following `PortfolioDetail`'s breadcrumb
      pattern (dark accent bar, NAV-height reservation if `news` is in `darkNavRoutes` —
      confirm against `routes.ts` first).
- [x] 3.4 Build the hero: full-bleed image using `frontmatter.heroImage || frontmatter.image`
      (same read `PortfolioDetail` does), title, date, tag chip row (`Tag`, solid variant,
      supports News's multi-tag `tags` array per D099) — desktop and mobile as two real
      layouts per the frames, not one repositioned tree.
- [x] 3.5 Wire `app/[locale]/news/[slug]/page.tsx` to render `NewsDetail` instead of
      `ContentDetail`.
- [x] 3.6 Compose `ShareRail` (desktop, sticky) + `Cms` + `ShareRow` below the hero, same
      arrangement as `PortfolioDetail`.
- [x] 3.7 Verify hero + breadcrumb + body at 393px/1440px, `/en`/`/zh` against the Figma
      screenshots before continuing — do not proceed to related posts on an unverified hero.

## 4. Related posts + newsletter footer

- [x] 4.1 Implement related-post selection per design.md's derived rule (shared-tag match,
      most-recent first, excludes current slug, capped at the count found in task 1.3,
      recency-only fallback) as a small helper alongside `getEntry`/`getManifest` usage in
      the page or component — not inside `app/_lib/content/index.ts` unless it's genuinely
      content-layer logic.
- [x] 4.2 Render the related posts using `Article` (its documented second consumer per
      INVENTORY) at both breakpoints.
- [x] 4.3 Place `NewsletterSignup` as the closing band (its second real page consumer).
- [x] 4.4 Verify the full page end-to-end at 393px/1440px, `/en`/`/zh` against all four
      Figma screenshots, including a slug with 0, 1, and multiple shared-tag matches if the
      current 16-article set provides those cases.

## 5. Cleanup

- [x] 5.1 Grep for other importers of `ContentDetail`; if none remain, delete
      `app/[locale]/_components/ContentDetail.tsx`. If one remains, leave it and note why in
      the phase report.
- [x] 5.2 Update `app/_components/INVENTORY.md`: move `ShareRail`'s entry out of the
      page-local Portfolio Details row into the shared table with both consumers noted;
      update `Article` and `NewsletterSignup` entries with their real News Details
      consumer facts (replacing "promote if reused" language).
- [x] 5.3 Append any new decisions to `openspec/DECISIONS.md` (related-posts selection rule
      and measured count; any tablet-band derivation the hero/related-posts sections need).
- [x] 5.4 Update `openspec/reference/roadmap.md`: tick Phase 14, record the `ContentDetail`
      retirement and the `ShareRail` promotion under Inherited Work if anything remains
      owed (e.g. INVENTORY's own note that promotion was conditional on this phase).

## 6. Checks

- [x] 6.1 `npm run lint`
- [x] 6.2 `npx tsc --noEmit`
- [x] 6.3 `next-devtools-mcp` check for framework errors/warnings on `/en/news/[slug]` and
      `/zh/news/[slug]` in the running dev server.

# Phase 10 — Portfolio

## Why

`/[locale]/portfolio` is still a `PagePlaceholder`. It is the last unbuilt page the NAV links
to that has a complete Figma design at both breakpoints, and it is the entry point to Phase
11's detail pages — which already exist as a working route (`app/[locale]/portfolio/[slug]`,
Phase 4) with one seeded MDX entry and no listing pointing at them.

It also closes the Inherited Work row the roadmap has carried since Phase 6: the Portfolio
page's card `12610:6812` is image-first and genuinely a different design from Home's
`ProjectCard`, and reconciling it with a variant prop is owed by this phase.

## What Changes

### Sections built

- **Header** — dark NAV over a full-bleed hero band: a rotated `Portfolio` eyebrow with its
  TagDot and the `ALL PROJECTS` / `過往專案` display heading. The description paragraph Figma
  draws (`12219:1066`, `12210:3075`) is **removed** — the matrix's `直接刪除段落`.
- **Filter + grid** — a two-column desktop split (filter rail left at x=32, 320px wide; grid
  right at x=384, 1024px, 3-up) and a stack at mobile (filter row, then a single column).
- **Pagination** — the row below the grid (desktop `1 2 3 … 10` + `Next`; mobile
  `Pagination (V3)` `12341:1980` / `12368:2478`).
- **Closing CTA** — the existing `UniversalCTA` (Phase 4), its third real consumer. Placed,
  not modified.

### Content

**Three projects ship, not five or eleven** (user decision, this gate). The matrix marks all
Portfolio card copy `待補`; the only real project records in the deck are the three on the
Project Details tab. Figma's slot counts are drawn samples — 11 at desktop, 5 at mobile, and
they disagree with each other, so neither is a count.

The three become MDX entries under `content/portfolio/{en,zh}/`, joining the one Phase 4
already seeded:

| Project | Slug | 職責 → filter tags |
| :--- | :--- | :--- |
| Vol.3 彼日的心內話 | `inner-voices-of-that-day` *(renamed from `huan-huan-free-tour`)* | 行銷宣傳／巡演規劃／活動製作 |
| Vol.2 一起喝酒的朋友 | new | 行銷宣傳／巡演規劃／活動製作 |
| Vol.1 鍋 Band Show | new | 行銷宣傳／活動製作 |

The sheet supplies Chinese only. English is AI-generated placeholder per the matrix's
`可以先用AI製作中文內容提供中文版形示意` allowance, inverted — **treat the English as not
final copy** and keep the rows in the matrix's outstanding-copy table. Article bodies stay
Phase 11's.

### Derived behaviour — no Figma prototype exists for any of it

| Behaviour | What ships | Why it is derived |
| :--- | :--- | :--- |
| Filter | Client-side, one tag active at a time, `All` default. Tag ids reuse `serviceAnchors` from `routes.ts` so the five filter names and the four service lines cannot drift. | Figma draws the tag row in one state only. |
| Empty state | `藝人經紀 / Artist Management` matches none of the three projects. A short localized "no projects in this category yet" line renders in the grid area. | Figma draws no empty state. |
| Pagination | A real paginator, page size taken from the drawn grid. **The row renders only when there is more than one page** — with three projects it will not appear at the gate. | Figma draws page 10 of a 10-page set that does not exist. |

### Shared-file edits

- **`ProjectCard` gains `variant`.** `"home"` (default) keeps today's order — tags → title →
  date → image → description. `"portfolio"` is image-first, per `12610:6812`. A prop, never an
  `lg:` switch (INVENTORY.md; roadmap → Inherited Work).
- **Frontmatter gains `services`.** `parseFrontmatter` validates it for `portfolio` entries
  only — news has no service lines. Values must be `serviceAnchors` ids; an unknown id fails
  the build, matching D002's "fail loudly" rule.
- **`portfolio` joins `darkNavRoutes`.** The desktop frames instance `Desktop NAV/DARK`. This
  touches the theme table, not the `routes` array, so the Phase 7c mobile-menu clamp minima
  (sized for exactly seven links) are unaffected — same situation Phase 8 verified.

### Explicitly not in scope

- Phase 11. No detail-page work, no article bodies, no real project imagery — cards keep
  `ProjectCard`'s neutral placeholder, and the desktop left share rail stays unbuilt.
- The floating desktop `MENU` square (`12612:11844`) that appears on this frame too. D045
  already owns it and says it needs its own change.
- Any change to `UniversalCTA`, `Tag`, `Eyebrow`, or `Footer`.

## Figma nodes

Sourced from `openspec/reference/design-inventory.md` and confirmed by a `get_metadata`
sweep of all four frames.

| Section | Desktop EN | Desktop TC | Mobile EN | Mobile TC |
| :--- | :--- | :--- | :--- | :--- |
| Page frame | `12612:8704` | `12635:12926` | `12210:3063` | `12368:2453` |
| Header | `12573:6910` | `I12635:12926;12573:6910` | `12210:3066` | `12368:2455` |
| Filter rail | `12573:6926` | `I12635:12926;12573:6926` | `12210:3084` | `12368:2458` |
| Grid | `12573:6947` | `I12635:12926;12573:6947` | `12210:3102` | `12368:2472` |
| Pagination | `12573:7129` | `I12635:12926;12573:7129` | `12341:1980` | `12368:2478` |
| Card (image-first) | `12610:6812` | `I12635:12926;12610:6812` | `12219:1187` | `12368:2473` |
| CTA | `12573:9384` | `I12635:12926;12573:9384` | `12212:5609` | `12389:5931` |

Drawn heights the build is measured against:

| Section | Desktop EN | Desktop TC | Mobile EN | Mobile TC |
| :--- | ---: | ---: | ---: | ---: |
| Page total | 4707.80px | 4557.80px | 5433.03px | 5396.03px |
| Header | 590px | 444px | 179px *(+64 NAV)* | 149px *(+64 NAV)* |
| Section (filter+grid+pagination) | 2664.40px | 2660.40px | 3159.03px | 3152.03px |
| CTA | 780px | 780px | 734px | 734px |

Card heights are **not** fixed — the drawn instances vary row to row (desktop EN 624.47px vs
565.47px; TC 540.47 / 588.47 / 658.47), which is copy length, not a design variant. Treat the
card as content-driven, the precedent D066 set for `ServiceCard`.

Two things the sweep found that the references did not record:

1. **The desktop and mobile card counts disagree** — 11 vs 5. Neither is a project count.
2. **The mobile TC filter label is `專案種類`, not a translation of `Filter`.** Desktop TC's
   label node is also 46px wide against EN's 43px. Confirm both with `get_design_context`
   before transcribing; do not assume the mobile string carries to desktop.

## Capabilities

### New Capabilities

None. This is UI implementation against a finished design; `skip_specs: true` is set in
`.openspec.yaml`, consistent with every page phase since Phase 5. The filter and paginator are
derived interaction, recorded in `DECISIONS.md` rather than as spec requirements.

### Modified Capabilities

None.

## Impact

| Area | Change |
| :--- | :--- |
| `app/[locale]/portfolio/page.tsx` | Replaces `PagePlaceholder`; reads the portfolio manifest and renders header → grid → CTA |
| `app/[locale]/portfolio/_components/PortfolioHero.tsx` | New — eyebrow, TagDot, display heading |
| `app/[locale]/portfolio/_components/PortfolioGrid.tsx` | New, `'use client'` — filter state, grid, empty state, paginator |
| `app/[locale]/portfolio/_components/Pagination.tsx` | New — the numbered row; auto-hides below two pages |
| `app/_components/ProjectCard.tsx` | New `variant` prop; image-first ordering for `"portfolio"` |
| `app/_lib/content/frontmatter.ts` | `services` field, validated for `portfolio` against `serviceAnchors` |
| `app/_lib/routes.ts` | `portfolio` added to `darkNavRoutes` |
| `app/_lib/i18n/{en,zh}/portfolio.ts` | New — eyebrow, heading, filter label, five tag labels, empty-state line, pagination labels |
| `content/portfolio/{en,zh}/*.mdx` | Two new projects; `services` added to all three |
| `app/_components/INVENTORY.md` | `ProjectCard` variant note; `Pagination` entry |
| `openspec/DECISIONS.md` | D080+ for the decisions above |
| `openspec/reference/roadmap.md` | Tick Phase 10; close the `ProjectCard` variant row; record what Phase 11/F inherits |
| `openspec/reference/content-matrix.md` | Mark the three projects supplied; keep the English as non-final |

No new dependencies. No route changes. No token changes expected — a value
`design-tokens.md` does not carry is a finding to report, not a token to invent.

## User verifies

At `/en/portfolio` and `/zh/portfolio`, 393px and 1440px:

1. The page opens on the dark NAV over the `ALL PROJECTS` / `過往專案` header, with no
   description paragraph beneath it.
2. Three project cards render image-first — a different order from Home's cards, which are
   unchanged at `/en` and `/zh`.
3. Clicking `Global Touring / 巡演規劃` narrows the grid to two cards; clicking
   `Artist Management / 藝人經紀` shows the empty-state line; `All / 全選` restores all three.
4. No pagination row appears — there is one page.
5. Clicking a card lands on its detail page at `/[locale]/portfolio/[slug]`.
6. The green CTA block sits between the grid and the Footer.

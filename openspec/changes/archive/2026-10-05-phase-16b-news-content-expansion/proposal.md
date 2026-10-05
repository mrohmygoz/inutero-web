## Why

The client supplied 25 more press releases under `web_ref/news_add/` (dated 2026-05-26 through
2026-09-24) that are not yet on the site. Phase 13/13a built the News listing, filtering, and
pagination mechanism and seeded it with 16 real articles; this phase is pure content — using
that already-built mechanism (`mdx-content` spec, unchanged) to add the remaining backlog. No
route, component, or filter taxonomy changes.

## What Changes

- Add 25 new paired MDX entries under `content/news/en/` and `content/news/zh/`, one per
  `web_ref/news_add/` folder, following the `YYYY-MM-DD-slug.mdx` convention (D100).
- ZH body text is the client's original press-release copy (from each folder's `.docx`),
  carried over verbatim/lightly cleaned, per Phase 13 precedent.
- EN body text is AI-translated from the ZH source, flagged non-final per Phase 13 precedent
  (`FOR REVIEW` note in `design.md`, not in content — matches how Phase 13's EN bodies were
  handled).
- Each article is tagged with one or more `newsFilters` ids (`events`, `artists-works`,
  `global-touring`, `about-in-utero`) per its actual subject matter — no change to the
  taxonomy itself (D099 already allows multi-tag).
- Each article gets a hero image (+ optional gallery) exported to
  `public/images/news/<slug>/`. Folders that ship real photos use those; folders that ship only
  a placeholder caption (`稿照（提供：…）`) with no actual image file get a substitute image
  hand-picked from existing site photography that fits the subject (festival/concert/artist
  photography already in `public/images/`), per explore-mode decision.
- `openspec/reference/roadmap.md` gains a `16b` row; `content-matrix.md`'s News section is
  extended with the new entries if that table enumerates articles by slug (check during
  implementation — Phase 13's note suggests it does).

## Capabilities

No spec-level requirement changes. This phase populates content through the mechanism
`mdx-content` already specifies (file-based slugs, typed frontmatter, build-time
locale-completeness checks, MDX body rendering) — it does not add, remove, or alter any of
those requirements. `skip_specs: true` is set in `.openspec.yaml`.

## Impact

- `content/news/en/*.mdx`, `content/news/zh/*.mdx` — 25 new files each (50 total).
- `public/images/news/<slug>/` — new image directories, one per article.
- `openspec/reference/roadmap.md` — new `16b` phase row.
- `openspec/reference/content-matrix.md` — News section updated if it enumerates articles.
- No changes to `app/`, `app/_lib/routes.ts`, or any shared component. The News listing,
  filter, pagination, and detail page mechanism (Phases 13/13a/14) render the new content
  automatically — nothing there is touched.

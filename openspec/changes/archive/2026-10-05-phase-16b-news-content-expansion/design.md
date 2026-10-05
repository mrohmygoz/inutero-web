## Context

See proposal.md for motivation. `mdx-content` already specifies the mechanism this phase
fills: slug-from-filename, typed frontmatter, build-time locale-completeness, MDX body
rendering. `app/_lib/routes.ts`'s `newsFilters` already defines the four tag ids. Phase 13
established the precedent this phase follows for translation, dating, and slugging — this
document only covers where this batch's 25 articles are non-uniform enough to need an explicit
rule.

## Goals / Non-Goals

**Goals:**
- A consistent, repeatable rule per article for: slug, date, tags, hero/gallery images, EN
  translation fidelity.
- Every one of the 25 `web_ref/news_add/` folders becomes one slug, present in both locales.

**Non-Goals:**
- No component, route, or filter-taxonomy change — confirmed in scope check against
  `app/_lib/routes.ts`, `app/[locale]/news/`.
- No re-translation or re-tagging of the existing 16 articles from Phase 13/13a.
- No attempt to source photography the client didn't supply beyond what's needed to fill a
  placeholder-only folder (see Decision: Substitute images).

## Decisions

**Slug and date.** Each folder name is `YYMMDD <ZH headline>` (e.g. `260526 日本樂壇超新星
kiyu…`). The 6-digit prefix becomes the frontmatter `date` (`2026-05-26`), and the slug is
`YYYY-MM-DD-<kebab-case-english-gist>`, matching the `YYYY-MM-DD-slug.mdx` convention Phase 13
retrofitted (D100). The English gist is derived from the article's subject (artist/event name +
action), not a transliteration of the Chinese headline — consistent with existing slugs like
`2026-04-16-adan-lonely-goldfish-concert`.

**ZH body: verbatim from the `.docx`, cleaned of press-kit boilerplate only.** Each `.docx` is
read as the ZH article source. Carried over as the body, same as Phase 13 (D099's precedent:
"ZH bodies are the client's original press-release text verbatim"). "Cleaned" is limited to
removing wire-boilerplate not meant for the site (e.g. a trailing 聯絡窗口/media-contact block,
if present) — no rewriting of the client's actual sentences.

**EN body: AI-translated, flagged non-final.** Same as Phase 13 (D099's precedent). Translation
aims for natural English press-release register, not a literal word-for-word rendering —
matching the tone of the existing 16 EN articles (e.g. `2026-04-10-organik-festival-2026-full-lineup.mdx`).
Flagged non-final in this design doc, not in the shipped content (Phase 13 did not add an
in-content flag either).

**Tags: assign per newsFilters, multi-tag allowed.** Using the same four-id taxonomy Phase 13
used, multiple tags per article where genuinely applicable (D099 precedent — 5 of 16 existing
articles are two-tagged). Rough read of this batch by folder name: most are
`events` (festival lineups, tour announcements, concert recaps — 火球祭, 呼聲 VOICES, 滅火器 tour
dates) or `artists-works` (new singles/albums — 大象體操, 溫蒂漫步, Awkward, R.fu). A couple read
as both (e.g. an artist's own concert announcement is both a work and an event). None of this
batch reads as `about-in-utero` or `global-touring` by subject matter — final assignment happens
per-article at implementation, not pre-decided here, since several folders need the `.docx` read
to disambiguate (e.g. whether a piece is primarily about a release or about the show promoting
it).

**Hero/gallery images: real photos where supplied, substitutes where not.** ~9 of the 25 folders
contain only a placeholder caption text (`稿照（提供：…）`) as a bare filename with no actual
image file — no usable asset. Per explore-mode decision, these get a substitute image hand-picked
from existing site photography (`public/images/news/`, `public/images/artists/`,
`public/images/portfolio/`) matching the article's genre (festival stage photo for a festival
lineup piece, concert photo for a concert recap, etc.) rather than the site's generic
placeholder. This is a readability/completeness trade-off the client can swap out later — not a
claim that the substitute photo depicts the actual event.

**Image export path.** Real photos get renamed from their Chinese descriptive filenames to
`<slug>-hero.jpg` / `<slug>-<n>.jpg` under `public/images/news/<slug>/`, following the existing
convention (e.g. `organik-festival-2026-full-lineup-hero.jpg`). `.mp4` assets present in one
folder (260719) are out of scope — MDX body/gallery only handles images, same as every existing
article; the videos are not referenced.

## Risks / Trade-offs

- **Substitute images could mislead a reader into thinking a stock photo depicts the specific
  event.** Mitigation: pick genuinely generic/brand photography (stage wide shots, artist
  portraits already used elsewhere on the site) rather than another article's event-specific
  photo, and keep a record in `tasks.md` of which articles got a substitute vs. a real photo so
  the client can replace them later.
- **AI translation quality for press-release-register Mandarin (band names, festival jargon)
  may need client review.** Same risk Phase 13 already carries for its 16 articles; not new to
  this phase.
- **25 articles in one phase is a lot of manual judgment calls (tags, image picks, translation
  tone) with no second reviewer until the human gate.** Mitigation: tasks.md tracks per-article
  checklist items so partial completion is visible and reviewable, not an all-or-nothing diff.

## Open Questions

None — tag/image/translation approach is decided above; any true per-article ambiguity (e.g.
disambiguating a borderline tag) is resolved during implementation using the `.docx` text itself,
not deferred.

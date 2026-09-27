## Context

`PortfolioDetail` (`app/[locale]/portfolio/[slug]/_components/PortfolioDetail.tsx`) currently
renders: breadcrumb → hero + meta → `ShareRail` + `Cms` body → `ShareRow` → prev/next footer.
It stops short of the Figma frame's bottom Gallery section (desktop `12573:7449`, mobile
`12211:3462`) — see proposal.md and D090 for why.

Content is MDX (`content/portfolio/{en,zh}/*.mdx`), loaded through `app/_lib/content/index.ts`'s
`getEntry`/`getManifest`, which dynamic-imports each file as a compiled module and exposes only
`frontmatter` (validated, `app/_lib/content/frontmatter.ts`) and `Body` (the compiled MDX
component). There is no existing structured list of the images a body embeds — they exist only
as `![alt](src "title")` markdown inside the raw `.mdx` source.

## Goals / Non-Goals

**Goals:**
- Build the Gallery section at both breakpoints, sourced from images that are part of each
  project's real supplied content — either already in the article body, or supplied
  separately for the gallery specifically.
- Handle a variable, potentially large image count per project without padding, repeating, or
  fabricating.
- Let a project show more images in its gallery than what reads well inline in its article,
  without duplicating an image's authored `alt`/caption data.

**Non-Goals:**
- No change to `Cms`, `ShareRow`, `ShareRail`, or the prev/next footer's own logic.
- No attempt to make the Gallery section look identical at every image count — Figma draws a
  4-image sample; the real range starts below 4 and may run well past it (see Decisions).
- No gallery-specific asset pipeline beyond what already exports Figma photography into
  `public/` — this only adds a place in frontmatter to list already-exported paths.

## Decisions

**Gallery images come from two sources, combined: body-derived + a new `gallery` frontmatter
field.** `getEntry` already reads each `.mdx` file through a dynamic `import()` that yields
only the compiled `Body` and `frontmatter` exports — not the raw markdown, and not a list of
images the body embeds.

1. A new helper (`app/_lib/content/index.ts`, e.g. `getBodyImages`) reads the same file's raw
   text with `readFileSync` (Node fs is already a build-time dependency here — no new runtime
   fetching) and regex-matches markdown image syntax `![alt](src "title")` outside the
   frontmatter block, in document order.
2. A new optional `gallery: string[]` frontmatter field (`frontmatter.ts`, portfolio-only,
   same optional-but-typed shape as `heroImage` — absent or `[]` is valid, forbidden on news)
   names additional image paths under `public/` that are not part of the article body at all.
   This is for photos the client supplied beyond what reads well inline — the gallery is not
   capped at what the article happens to embed.
3. `getEntry` combines: `heroImage` (falling back to `image`) → body images in document order
   → `gallery` entries, deduplicating by `src` across all three sources. The combined list
   becomes a new `ContentEntry.galleryImages: { src: string; alt: string }[]` field (`alt`
   from the markdown source where available, empty string for bare `gallery` paths — decorative
   images, matching how other repeated photography on this site is treated).

*Why not derive everything from the body alone* (the originally proposed approach): it caps
the gallery at what the article's own prose accommodates. The user wants room for "a lot of
images beyond the content images" — a fixed relationship between article length and gallery
size doesn't hold once a project has, say, 10 supplied event photos and a 3-paragraph body.

*Why not a `gallery` field alone, dropping body-derivation*: rejected — it would force
re-listing images the body already displays if a project's gallery is meant to include them,
duplicating the same path in two places. Combining both means an author only adds `gallery`
entries for the genuinely extra photos.

**Render however many images a project ends up with — no minimum, no maximum, no padding.**
Today's three projects: `bottoms-up` has 1 body image; the other two have 3 each. None yet use
`gallery`. The layout must handle anywhere from ~2 images up to a much larger supplied set
without assuming Figma's 4-slot sample is a hard cap. Fetch the real Figma node metadata for
both breakpoints during `/opsx:apply` to get the grid/spacing spec, and design it as a
wrapping grid or scroller that extends past 4 rather than one hard-coded for exactly 4.

**This supersedes D090's "not built" clause, not its reasoning about fabrication.** D090 ruled
out two things: reusing body photos as gallery filler, and inventing placeholder images. This
design does the first on purpose where no `gallery` field is supplied (the images are real,
already part of the project's own supplied content) and adds a second, explicit path for
photos the client supplies beyond the body — never fabricated or stock imagery either way.
Record a new decision (D091) making this distinction explicit, since a future phase re-reading
D090 alone would wrongly conclude the section still shouldn't be built.

## Risks / Trade-offs

- **Regex-parsing markdown for body images is coupled to `Cms`'s own image syntax.** If a
  future body ever embeds an image any other way (e.g. raw `<img>` or an MDX component), this
  parser won't see it. Mitigated by scope: today's three bodies only use markdown image
  syntax, and `Cms`'s five designed elements are the only supported body constructs (per its
  own inventory entry).
- **`gallery` paths are not validated against `public/` at build time** (matching `image`/
  `heroImage`'s existing treatment — none of those verify the file exists either). A typo'd
  path silently 404s the image rather than failing the build. Accepted, consistent with the
  existing fields; not introduced fresh by this change.
- **Visually thin galleries where neither source supplies much.** `bottoms-up` may show as
  few as 2 images against Figma's 4-image sample until/unless a `gallery` list is added — a
  `Close`-tier section, not `Exact`, so this is an accepted gap rather than a mismatch to
  chase.
- **No upper bound means the layout must be genuinely open-ended**, not a fixed 4-cell grid.
  Slightly more implementation work up front; the alternative (a capped grid) would silently
  drop images the moment a project supplies more than the cap.

## Open Questions

None — the image count and duplication behavior are fully determined by existing content; no
further product decision is needed before implementation.

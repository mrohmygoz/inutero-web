# Phase 4 — Tasks

Order keeps the site runnable at every group boundary. Groups 1–4 (content pipeline) and
groups 5–7 (shared blocks) are independent of each other; the pipeline goes first because the
detail routes currently rely on a placeholder that must be removed cleanly.

## 1. Figma survey

- [x] 1.1 Invoke `/figma-design-to-code` (mandatory prerequisite before any `get_design_context` call)
- [x] 1.2 Fetch `UniversalCTA` desktop: `12653:5649`, EN `12573:9014`, CN `12653:5650` — design context + screenshot
- [x] 1.3 Fetch `NewsletterSignup` desktop `12612:8163` and `CMS` desktop `12610:7361` — design context + screenshot
- [x] 1.4 Locate ≥2 mobile occurrences of each of the three blocks in mobile page frames (D-G / D012 method); if occurrences disagree with each other, stop and ask
- [x] 1.5 Compare `NewsletterSignup` against the newsletter block already inside `Footer` (desktop `12573:9181`, mobile `12384:4852`) — answer the D-G survey question: same component or genuinely different?
- [x] 1.6 Record the survey findings (element coverage for `CMS`, `Cta` tone for `UniversalCTA`, CN variant existence) in `design.md` under a "Survey Findings" section before writing any component code

## 2. MDX toolchain

- [x] 2.1 Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter` — exact pinned versions, `npm` only
- [x] 2.2 Wire `createMDX` into `next.config.ts` with the frontmatter plugins named as **strings** (Turbopack constraint, D-A); leave `pageExtensions` untouched — content is modules, not routes
- [x] 2.3 Add the `mdx` type declaration so `import(...)` of an `.mdx` file type-checks under `strict` — satisfied by the pinned `@types/mdx`, which supplies the `*.mdx` ambient module (default export). The `frontmatter` named export is deliberately left untyped and validated by the D-B guard instead: a compile-time type there would assert a shape TypeScript cannot check, since MDX authors can write any YAML.
- [x] 2.4 Verify `npm run dev` and `npm run build` both still pass with the toolchain added and no content yet

## 3. Content module

- [x] 3.1 Create `content/portfolio/{en,zh}/` and `content/news/{en,zh}/`
- [x] 3.2 Define the frontmatter type and hand-rolled type guard in `app/_lib/content/` (D-B) — required fields per the `mdx-content` spec, failure message naming file + field
- [x] 3.3 Build the manifest module (D-C): `node:fs` directory scan, per-type `{ slug, locale, frontmatter }`, throwing on a parity violation naming the slug and the absent locale
- [x] 3.4 Add a unit-level sanity check that the manifest throws for a one-locale slug and for bad frontmatter — a temporary fixture is fine, remove it after
- [x] 3.5 Write four sample MDX files (news × en/zh, portfolio × en/zh) exercising every element the 1.6 survey found `CMS` defines

## 4. Detail routes

- [x] 4.1 Replace `PLACEHOLDER_SLUG` in `app/[locale]/news/[slug]/page.tsx` — `generateStaticParams` reads the manifest; `generateMetadata` uses real frontmatter title + `hreflang` alternates for the actual slug
- [x] 4.2 Same for `app/[locale]/portfolio/[slug]/page.tsx`
- [x] 4.3 Load the body via dynamic `import()` (D-A) — the two-variable path (`${locale}`/`${slug}`, content type baked in statically) **works under Turbopack**; the eager-registry fallback from the risk table was not needed
- [x] 4.4 Confirm an unknown slug still 404s under both locales (`dynamicParams = false` is already set on the locale layout)
- [x] 4.5 Remove `PagePlaceholder` usage from both detail routes; leave it in place for the remaining stub pages

## 5. `Cms` body renderer

- [x] 5.1 Build `app/_components/Cms.tsx` — wrapper + element map passed as a `components` prop, scoped to the component. **D-D amended:** `@next/mdx` hard-requires a root `mdx-components.tsx`, so one exists but returns `{}`; `MDXProvider` was rejected because it is React context and would have forced `use client` onto every article body
- [x] 5.2 Map only the elements the survey found; unmapped elements inherit the container's width and type (spec scenario "Raw markup in content does not escape the renderer")
- [x] 5.3 Verify the Chinese type scale applies inside the body on `/zh` routes
- [x] 5.4 Wrap the detail-route bodies in `<Cms>` behind the deliberately plain wrapper (D-E) — title + body, no hero, no meta row, no related posts

## 6. `UniversalCTA`

- [x] 6.1 Build `app/_components/UniversalCTA.tsx` — one responsive component, `lg` (1024px) switch per D009/D015/D021, locale via prop per D001/D010
- [x] 6.2 Compose the existing `Cta` primitive, passing the `tone` the survey established (D013) — do not re-implement the button
- [x] 6.3 Add its copy keys to **both** `en.ts` and `zh.ts` in the same change (D010)

## 7. `NewsletterSignup`

- [x] 7.1 Build `app/_components/NewsletterSignup.tsx` — server component, optional `action` prop, inert markup without it (D-F). No fake success state.
- [x] 7.2 Act on the 1.5 finding — the blocks are **genuinely different**, so `Footer.tsx` was not refactored to compose `NewsletterSignup`; divergence recorded as D029. One correction applied anyway: the Footer's newsletter button was `type="submit"` in an action-less `<form>` (a live page-reload defect), now `type="button"`
- [x] 7.3 Add its copy keys to both `en.ts` and `zh.ts`

## 8. Styleguide

- [x] 8.1 Add a shared-blocks specimen section covering `UniversalCTA`, `NewsletterSignup`, and `Cms`, in both locales — Chinese specimens carry both `lang="zh"` and `data-locale="zh"` (D016)
- [x] 8.2 Confirm the existing `Article` specimen still renders (Phase 2 component, not rebuilt this phase)

## 9. Documentation

- [x] 9.1 Add entries for `UniversalCTA`, `NewsletterSignup`, and `Cms` to `app/_components/INVENTORY.md`; update the `Footer` and `Article` rows if 7.2 changed them
- [x] 9.2 Append this phase's decisions to `openspec/DECISIONS.md` (D024+): MDX toolchain, frontmatter contract, `Cms` scoping, plain detail wrapper, `NewsletterSignup` inertness, and any derived mobile behavior the survey forced

## 10. Verification

- [x] 10.1 `npm run lint` and `npx tsc --noEmit` both clean
- [x] 10.2 `npm run build` passes — not just `dev` (the MDX loader is a build-time concern)
- [x] 10.3 Delete a `zh` sample file, confirm the build fails naming the slug and locale, restore it
- [x] 10.4 `next-devtools-mcp` — no framework errors or warnings in the running app
- [x] 10.5 Playwright screenshots at **393px and 1440px**, in **both `/en` and `/zh`**: `/styleguide` shared-blocks section, `/[locale]/news/<slug>`, `/[locale]/portfolio/<slug>`
- [x] 10.6 Compare the `/styleguide` screenshots side-by-side against the Figma frames from group 1; iterate to the fidelity tier (Exact for `UniversalCTA`, Close for the rest)
- [x] 10.7 Confirm `/en/news/does-not-exist` returns 404, not an empty shell
- [x] 10.8 Write the phase report — state plainly that the detail-page *design* (Phases 11/14) was not attempted and the wrapper is intentionally plain (D-E), plus anything skipped or only partly done

## 12. Post-review addition — article share row

- [x] 12.1 Re-fetch and download the share icon assets; identify the glyphs (link, LinkedIn, YouTube/X, Facebook) rather than assuming they match the Footer's set
- [x] 12.2 Build `app/_components/ShareRow.tsx` — client component, URL via `useSyncExternalStore`, composed by `ContentDetail` not `Cms`
- [x] 12.3 Add `share` copy keys to both `en.ts` and `zh.ts`
- [x] 12.4 Add a `ShareRow` specimen to the styleguide, both locales
- [x] 12.5 Record D031 (row built, rail not, YouTube→X swap) and add the INVENTORY entry
- [x] 12.6 Verify: lint, tsc, build, real share hrefs resolve in both locales, screenshots at 393px and 1440px

## 11. Gate

- [x] 11.1 Stop. Hand to the user for browser review. **Do not begin Phase 5.**

## 1. Asset export

- [x] 1.1 For each of the 8 built projects, pick a cover image (`public/images/projects/<slug>.jpg`) and a hero image (`public/images/content/<slug>-hero.jpg`) from the client's source photos (or, for 臥軌的火車, from the downloaded `mtv_photos/`), optimizing/resizing to match existing Portfolio asset dimensions.
- [x] 1.2 For FIREBALL Fest., World Music Festival, GIMA, and SXSW (the 4 with real multi-photo folders), pick a curated `gallery` subset (3–6 images each, not the full folder) and export to `public/images/content/`.
- [x] 1.3 For GIMA and 臥軌的火車 specifically, if `web_ref/`'s own photos are too thin for a given slot, fall back to the Dropbox links in the Project Details sheet (design.md Context) before settling for fewer images.

## 2. Content — FIREBALL Fest. 火球祭

- [x] 2.1 Write `content/portfolio/zh/2025-11-22-fireball-fest.mdx`, condensing the two Day 1/Day 2 `.docx` press releases into one body (wire boilerplate trimmed, per Phase 13/16b precedent). Frontmatter (client, tags, excerpt) per design.md D1–D3.
- [x] 2.2 Write the EN counterpart: `excerpt` is the sheet's official EN copy verbatim (D3); body is AI-translated from ZH, flagged non-final.

## 3. Content — 2024 World Music Festival @ Taiwan

- [x] 3.1 Write `content/portfolio/zh/2024-10-11-world-music-festival-taiwan.mdx`, condensing the 3 `.docx` sources (press advisory + 2 press releases).
- [x] 3.2 Write the EN counterpart (sheet excerpt verbatim + AI-translated body).

## 4. Content — Golden Indie Music Awards (GIMA)

- [x] 4.1 Write `content/portfolio/zh/2022-11-05-golden-indie-music-awards.mdx` per design.md D5 (no press-release source, confirmed by the sheet — body from official excerpt + photo/folder context). Flag to user as thinner than other entries.
- [x] 4.2 Write the EN counterpart.

## 5. Content — Organik Festival

- [x] 5.1 Write `content/portfolio/zh/2026-04-24-organik-festival.mdx`, condensing the 2 lineup-announcement `.docx` sources.
- [x] 5.2 Write the EN counterpart.

## 6. Content — Our Song (咱的歌)

- [x] 6.1 Write `content/portfolio/zh/2026-05-12-our-song.mdx`, condensing the kickoff press-conference `.docx` and the follow-up human-interest `.docx`.
- [x] 6.2 Write the EN counterpart.

## 7. Content — Taiwan Beats Showcase @ SXSW

- [x] 7.1 Write `content/portfolio/zh/2026-03-26-taiwan-beats-showcase-sxsw.mdx` from the single `.docx` source.
- [x] 7.2 Write the EN counterpart.

## 8. Content — Elephant Gym's 10th-anniversary World Tour (Europe & Mongolia)

- [x] 8.1 Write `content/portfolio/zh/2024-06-xx-elephant-gym-europe-mongolia-tour.mdx` from the `.docx` source, resolving the placeholder day in the slug/date to a real one if the Dropbox press release (design.md Context) has it; otherwise keep the placeholder and flag it non-final.
- [x] 8.2 Write the EN counterpart.

## 9. Content — 臥軌的火車：台灣巡迴【昨日重現】 (Railway Suicide Train)

- [x] 9.1 Write `content/portfolio/zh/2024-09-03-railway-suicide-train-yesterday-once-more.mdx`, condensing the MTV article's ZH body (not the client folder, which has no text). Use the downloaded `mtv_photos/` for cover/hero.
- [x] 9.2 Write the EN counterpart.

## 10. Home hero reorder

- [x] 10.1 Update `featuredProjects.cards` in `app/_lib/i18n/en/home.ts` and `app/_lib/i18n/zh/home.ts` to `["2025-11-22-fireball-fest", "2022-11-05-golden-indie-music-awards", "2026-05-08-inner-voices-of-that-day"]` (design.md D4).

## 11. Housekeeping

- [x] 11.1 Append design.md's D1–D5 to `openspec/DECISIONS.md`.
- [x] 11.2 Update `openspec/reference/roadmap.md`: tick Phase 16c, noting the Project Details sheet as a source and the Elephant Gym placeholder date as open.
- [x] 11.3 Run `npm run lint` and `npx tsc --noEmit`; fix any frontmatter/YAML issues (watch for the Phase 16b colon-in-string gotcha).

## 12. Verification

- [x] 12.1 `npm run dev`; visually check `/en/portfolio` and `/zh/portfolio` grids include all 8 new cards at 393px and 1440px.
- [x] 12.2 Open each of the 8 new `/[locale]/portfolio/[slug]` detail pages in both locales at both breakpoints; confirm hero/gallery images render and body text is complete (no truncated condensation).
- [x] 12.3 Confirm Home's featured-project section shows FIREBALL → GIMA → 彼日的心內話 in that order, both locales, both breakpoints.

## Why

The client's `web_ref/portfolios_add/` backlog has 8 more real projects beyond the 3 Portfolio
currently ships (Phase 10/11). One of the 8 (臥軌的火車：昨日重現, "Railway Suicide Train Yesterday
Once More") shipped only a cover image with no body material in the client's folder — but the
user supplied an external source, MTV音樂頻道's 2024-08-10 article
(https://www.mtv.com.tw/news/newsdetail/11084), which has a full press write-up and tour dates.
All 8 projects get built this phase. ZH bodies are condensed from the client's `.docx` press
releases (7 projects) or the MTV article (臥軌的火車), following the Phase 13/16b precedent of
AI-translating EN from ZH source and flagging it non-final. The client's own "Project Details"
tab in the content-matrix Google Sheet (`1DMrnb5xxDZoMlt1TxX372Z_BvMn__0-vtYqwMSWLRv0`,
gid `67798789`) turned out to already have official client/date/role/excerpt facts for all 8 —
this is authoritative over anything inferred from the `.docx`/photo folders and resolves what
would otherwise have been several flagged-non-final guesses (see design.md).
Home's `featuredProjects.cards` also gets repointed per explicit client-communicated priority:
火球祭 (FIREBALL Fest.) → 金音獎 (GIMA) → 母親節緩巡 (the existing 彼日的心內話 / Inner Voices of
That Day entry), replacing the current three-card selection.

## What Changes

- Add 8 new paired MDX entries under `content/portfolio/{en,zh}/`, sourced from
  `web_ref/portfolios_add/` (7 projects) and the MTV article above (1 project):
  - FIREBALL Fest. 火球祭 (client: 夥球擊; 2025-11-22/23, 樂天桃園棒球場)
  - 2024 World Music Festival @ Taiwan (世界音樂節@臺灣; client: 風潮音樂; 2024-10-11 to 10-13)
  - Golden Indie Music Awards／金音獎 (GIMA) (client: 必應創造; 2022-11-05 awards photography —
    the sheet itself confirms there is no press-release text, photos are the primary material;
    body is condensed from the sheet's official excerpt, flagged thin)
  - Organik Festival (client: Smoke Machine; 2026-04-24 to 04-26, 半島秘境)
  - Our Song／咱的歌 (公視台語台 台語囡仔歌創作徵選; client: 公視台語台; 2026-05-12 kickoff press
    conference)
  - Taiwan Beats Showcase @ SXSW (client: Young Team Productions; 2026 SXSW, 六組臺灣音樂人)
  - Europe and Mongolia Tour of Elephant Gym's 10th-anniversary World Tour (大象體操《世界
    World》; client: 大象體操; the sheet confirms the leg happened in 2024, but no exact day for
    any of its 11 stops — slug/date uses a flagged-non-final placeholder within 2024)
  - 臥軌的火車：2024台灣巡迴【昨日重現 Yesterday Once More】(Railway Suicide Train; client: 臥軌的
    火車; tour dates 2024-09-03 to 09-10 across Taipei/Kaohsiung/Taichung), body sourced from the
    MTV article, not the client folder
- ZH bodies are condensed from the client's `.docx` press releases, or (臥軌的火車 only) the MTV
  article, same precedent as Phase 13/16b — wire-service boilerplate trimmed, substance kept.
  EN bodies are AI-translated from ZH, flagged non-final per standing convention.
- Each entry gets `services` tags mapped directly from the sheet's own 職責 (role) field onto the
  4-tag taxonomy already defined in `app/_lib/routes.ts` (`artist-management`,
  `international-booking`, `pr-marketing`, `event-production` — see design.md D2). None of the 8
  carries `artist-management`; all 8 are booking/PR/production engagements per the client's own
  record, not full management.
- Each entry's `excerpt` (EN + ZH) is the sheet's own official copy, used verbatim rather than
  AI-translated (design.md D3) — only the longer body text is AI-translated from ZH to EN.
- Photography exported to `public/images/projects/` (cover) and `public/images/content/`
  (hero/gallery), reusing the Phase 11a `gallery` frontmatter field for multi-image projects
  (FIREBALL, World Music Festival, GIMA, SXSW all ship multiple real photos).
- `home.ts`'s `featuredProjects.cards` (both `en` and `zh` dictionaries) is reordered to
  `["<fireball-slug>", "<gima-slug>", "2026-05-08-inner-voices-of-that-day"]`, dropping
  `2025-11-08-bottoms-up` and `2024-09-04-hotpot-band-show` from the Home hero selection (both
  remain live, linkable Portfolio entries — only the Home card slot changes, per D103's existing
  mechanism).
- `openspec/reference/roadmap.md` ticked for Phase 16c.

## Capabilities

Pure content addition plus a config reorder — no new route, component, or taxonomy, and no
spec-level behavior changes (same shape as Phase 16b). `skip_specs: true` is set in
`.openspec.yaml`.

### New Capabilities
(none — see above)

### Modified Capabilities
(none — see above)

## Impact

- `content/portfolio/en/*.mdx`, `content/portfolio/zh/*.mdx` — 8 new paired files
- `public/images/projects/`, `public/images/content/` — new exported photography
- `app/_lib/i18n/en/home.ts`, `app/_lib/i18n/zh/home.ts` — `featuredProjects.cards` reorder
- `openspec/reference/roadmap.md` — phase ticked
- No component, route, or type changes. `app/[locale]/portfolio` and `[slug]` render the new
  entries through the existing MDX manifest with zero code changes.

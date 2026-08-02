# Phase 4 addendum — Design

## Table of Contents

- [Context](#context)
- [Goals / Non-Goals](#goals--non-goals)
- [Decisions](#decisions)
  - [D-A — Transcribe into the repo rather than read the sheet at build time](#d-a--transcribe-into-the-repo-rather-than-read-the-sheet-at-build-time)
  - [D-B — The matrix outranks Figma for copy; Figma keeps layout](#d-b--the-matrix-outranks-figma-for-copy-figma-keeps-layout)
  - [D-C — Only shipped strings move into the dictionaries now](#d-c--only-shipped-strings-move-into-the-dictionaries-now)
  - [D-D — 待補 rows are recorded as gaps, not as empty strings](#d-d--待補-rows-are-recorded-as-gaps-not-as-empty-strings)
  - [D-E — Conflicts are raised, not resolved by the implementer](#d-e--conflicts-are-raised-not-resolved-by-the-implementer)
- [Risks / Trade-offs](#risks--trade-offs)

## Context

See `proposal.md` — Why. Three things shape the approach.

**The sheet is 10 tabs and mostly forward-looking.** One tab per page plus a Global tab and an
instructions tab. Measured against the code that exists today, the actionable delta is small:
three Footer strings and four social URLs. Measured against the code that *will* exist, it is
the entire copy deck for Phases 5–15.

**Its columns encode intent, not just text.** `目前英文內容（Figma現有文字）` is what Figma shows —
explicitly described in the instructions tab as provisional. `欲更改英文` and `欲更改中文` are the
final copy. A blank `欲更改英文` means "the Figma English is fine", not "no English". `（保留英文）`
in the Chinese column means "deliberately untranslated". `（待補）` means "not written yet". A
transcription that flattens these into plain strings loses the difference between *approved as-is*
and *nobody has written this*.

**Some rows are instructions rather than copy.** `直接刪除段落` ("delete this paragraph"),
`直接拿掉` ("remove"), and `新增段落` ("new section" — the Our Story credits block) change the
layout, not just the words. Those must survive transcription or a later phase will build a
section the client asked to remove.

## Goals / Non-Goals

**Goals:**

- A Phase 5–15 implementer can build a page's copy from the repo without opening the sheet.
- The three wrong strings shipping today are corrected.
- The distinction between *approved*, *keep English*, and *not yet written* survives.

**Non-Goals:**

- No build-time or runtime integration with Google Sheets.
- No dictionary keys for components that do not exist.
- No rewriting of the sheet, and no filling in of `（待補）` rows with invented copy.
- No change to `routes.ts` English labels. The sheet's Footer tab shows "About" and "Contacts"
  where the repo has "Our Story" and "Contact Us", but the `欲更改英文` column is blank for that
  row — meaning no change was requested, and D004 already resolved that naming drift against
  `routes.md`.

## Decisions

### D-A — Transcribe into the repo rather than read the sheet at build time

**Decision:** `openspec/reference/content-matrix.md`, hand-transcribed, versioned in git. No API
integration.

**Why:** The architecture is a static build with no runtime fetching (CLAUDE.md), and the sheet
is a human deliverable revised in bursts, not a live data source. Reading it at build time would
make builds depend on a Google account's auth state and on a document the build cannot pin. A
transcription is diffable, reviewable, and survives the sheet being edited mid-phase — and when
it drifts, git shows exactly what changed.

**Consequence to accept:** the transcription can go stale. Mitigated by recording the sheet's
`modifiedTime` (2026-07-31) at the top of the doc, so a later phase can tell in one call whether
it has been revised since.

### D-B — The matrix outranks Figma for copy; Figma keeps layout

**Decision:** Where the sheet and the Figma text layers disagree about *what a string says*, the
sheet wins. Figma remains the source of truth for everything else — layout, spacing, type scale,
component structure, and which strings exist at all.

**Why:** The sheet's own instructions tab states the Figma English is provisional placeholder
text. But the sheet says nothing about layout, and its `目前英文內容` column is explicitly kept
"僅供參考版型與語氣長度" — for judging layout and tone length. The two sources are complementary,
not competing, and the split has to be written down before a phase hits a case where the sheet's
longer copy breaks a designed line-break.

**How to apply:** When the sheet's final copy is materially longer or shorter than the Figma
string it replaces (the Home hero drops from four lines to two), the layout consequence is a
**derived** decision under D005 — the design has no frame for the new copy. Stop and ask rather
than silently reflowing a designed lockup.

### D-C — Only shipped strings move into the dictionaries now

**Decision:** `en.ts`/`zh.ts` gain nothing this change. Only three existing Footer values are
corrected. Copy for unbuilt pages stays in the reference doc.

**Why:** D010 types `zh` against `typeof en`, so every key added must exist in both locales — and
every key needs a component that consumes it. Adding a `home.hero.headline` key now means guessing
the shape of a component Phase 5 has not designed (is the headline one string or two lines? the
sheet's new copy is two words on two lines where Figma had four). The reference doc carries the
copy without forcing that guess.

### D-D — 待補 rows are recorded as gaps, not as empty strings

**Decision:** The transcription marks every `（待補）` row explicitly, in a per-page "Not yet
supplied" list. It never renders them as blank cells.

**Why:** A blank cell in a transcription reads as "no copy needed". These rows mean the opposite —
copy is required and the client owes it. Phases 10–14 in particular are heavily affected: the
Portfolio project cards, the Artists cards, and the News article list are all `（待補）`, which means
those phases will need real content before they can ship anything but a shell. Better to surface
that now than to discover it at the start of Phase 10.

### D-E — Conflicts are raised, not resolved by the implementer

**Decision:** The two conflicts found (service #4's Chinese name; the social platform set) are
documented in the reference doc and reported to the user rather than silently picked. Service #4
was resolved by the user on 2026-08-02 as `活動製作`; the social set is still open.

**Why:** Both are client-facing content decisions, not implementation details. Service #4 is a
service line's public name; the social set determines which of the company's channels the site
links to. Guessing either is the kind of "reasonable default" that ships as fact and is never
revisited. Both block only one string each, so the rest of the change proceeds regardless.

**How to apply:** Service #4 ships as `活動製作` — the user's answer, matching the sheet's majority
form. This is now the one name for that service line across the whole site, so Phases 6 (Home
services summary), 9 (Services page), and 10 (Portfolio filter tags) use it too rather than
re-reading the Footer tab's outlier. For the socials, wire the
three platforms the sheet supplies URLs for and leave X as-is pending a URL — do not invent one,
and do not add a Podcast icon that has no asset.

## Risks / Trade-offs

| Risk | Mitigation |
| :--- | :--- |
| **The transcription drifts from the sheet** and a later phase builds from stale copy. | Record the sheet's `modifiedTime` and file ID at the top of the doc. Any phase using it re-checks metadata first — one MCP call. |
| **Transcription errors in Chinese copy**, which are hard to spot on review. | Transcribe verbatim from the sheet's own text rather than retyping; do not "improve" punctuation or spacing. Long-form passages are quoted whole rather than summarized. |
| **The sheet contains links to the forbidden Figma file** (`7uC2EQp61AsMp8ebZQcI7w` — view seat, 6 calls/month, CLAUDE.md says never use it). An agent following a link from the transcription burns the quota. | The reference doc strips the Figma URLs and keeps only the node IDs, which are identical between the two files. A note explains why. |
| **Scope creep into Phases 5–15.** The sheet is full of finished copy that is tempting to apply. | D-C draws the line at "strings a shipped component already renders". The reference doc is a brief for later phases, not a work queue for this one. |
| **Asset links (Dropbox) in the sheet** point at photography and press releases the site will need. | Recorded in the reference doc as a per-page asset list. Downloading them is Phase 11/12/14 work, not this change's. |

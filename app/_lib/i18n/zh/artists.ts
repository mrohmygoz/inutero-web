import type enArtists from "../en/artists";

// Typed against the matching `en` module (D010, Phase 07b D-F).
// See en/artists.ts for the copy-source rationale.
const artists: typeof enArtists = {
  hero: {
    eyebrow: "Our Partners", // matrix: `keep EN`
    headingLines: ["合作藝人"],
  },
  filter: {
    // TC frame draws 專案種類, same as Portfolio's TC filter label — not a
    // translation of "Filter" (confirmed by the mobile TC metadata sweep).
    label: "專案種類",
    all: "全選",
    tags: {
      "artist-management": "藝人經紀",
      "international-booking": "巡演規劃",
      "pr-marketing": "行銷宣傳",
      "event-production": "活動製作",
    },
    empty: "此分類目前尚無藝人。",
  },
};

export default artists;

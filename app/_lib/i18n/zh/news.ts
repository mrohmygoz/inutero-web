import type enNews from "../en/news";

// Typed against the matching `en` module (D010, Phase 07b D-F).
// See en/news.ts for the copy-source rationale.
const news: typeof enNews = {
  header: {
    eyebrow: "Journal", // matrix: `keep EN`
    headingLines: ["子皿超音波"],
    body: "所有音樂作品新訊、活動分享、以及子皿團隊日誌，等你來探索。",
  },
  filter: {
    label: "Filter", // TC frame draws the English word itself — matrix is silent
    all: "全選",
    tags: {
      "artists-works": "音樂新訊",
      "global-touring": "活動消息",
      events: "國際曝光",
      "about-in-utero": "子皿營運日誌",
    },
    empty: "此分類目前尚無文章。",
  },
  pagination: {
    next: "Next", // matrix: `keep EN`
    label: "News pages",
    page: "Page",
  },
  featuredSlug: "2026-05-13-in-utero-huan-huan-community-tour",
};

export default news;

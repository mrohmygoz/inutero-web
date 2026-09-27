import type enPortfolio from "../en/portfolio";

// Typed against the matching `en` module (D010, Phase 07b D-F).
// See en/portfolio.ts for the copy-source rationale.
//
// The filter label is genuinely different, not a translation: both TC frames
// draw 專案種類 where the EN frames draw "Filter".
const portfolio: typeof enPortfolio = {
  hero: {
    eyebrow: "Portfolio", // matrix: `keep EN`
    headingLines: ["過往專案"],
  },
  filter: {
    label: "專案種類",
    all: "全選",
    tags: {
      "artist-management": "藝人經紀",
      "international-booking": "巡演規劃",
      "pr-marketing": "行銷宣傳",
      "event-production": "活動製作",
    },
    empty: "此分類目前尚無專案。",
  },
  pagination: {
    next: "下一頁",
    label: "專案分頁",
    page: "第",
  },
  // Breadcrumb uses 過往案例 — the NAV link label from routes.ts (content matrix's
  // own breadcrumb row), not this page's 過往專案 heading override above.
  detail: {
    breadcrumb: "過往案例",
    metaClient: "合作夥伴",
    metaDate: "時間",
    metaRole: "職責",
    prev: "上一個專案",
    next: "下一個專案",
  },
};

export default portfolio;

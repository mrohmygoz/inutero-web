import type enHome from "../en/home";

// Typed against the matching `en` module, explicitly annotated rather than
// only `satisfies`-checked at the index, so an extra or misspelled key is a
// `tsc --noEmit` error too — not just a missing one (D010, Phase 07b D-F).
const home: typeof enHome = {
  title: "首頁",
  metaDescription:
    "扎根於台灣獨立音樂環境茁壯的文化品牌，與來自世界傑出的音樂人攜手，用新世代手法創造影響力，用音樂打破文化疆界。",
  hero: {
    // `keep EN` in the matrix, and the TC frames (0:191-0:194) draw the same four
    // English words. These are literals in both dictionaries, NOT a fallback —
    // the "fail loudly on a missing translation" rule (D010) is unaffected.
    headlineWord1: "Creative",
    headlineWord2: "Souls",
    headlineWord3: "Global",
    headlineWord4: "Visions",
    body: "扎根於台灣獨立音樂環境茁壯的文化品牌，與來自世界傑出的音樂人攜手，用新世代手法創造影響力，用音樂打破文化疆界。",
    ctaPrimary: "過往案例",
    ctaSecondary: "跟我們聊聊",
    // English in the TC frames too — not an untranslated string.
    scrollLabel: "scroll down",
  },
  intro: {
    eyebrow: "Mission",
    // MATRIX OVERRIDE: the TC frames still draw the older, longer line
    // (讓台灣的音樂市場與國際接軌，創造更大的聲浪。). The matrix wins (D032), so no
    // frame exists for this lockup — it wraps naturally at the designed Chinese
    // display token rather than being scaled up to fill the designed block (D-D).
    // The `\n` is a deliberate break after the comma (user decision 2026-08-03),
    // honoured by `whitespace-pre-line` on the heading. It overrides D038's
    // "wraps naturally" for this one string; `en` has no newline, so the English
    // heading still wraps on its own.
    headline: "根植本土，\n前進世界。",
    bodyParagraphs: [
      "在分眾市場林立、聽眾追求私人化敘事的時代，真誠的創作成為每個人播放器中最親密的語言。無論風格與人氣，子皿期望所有音樂故事能找到契合它的聽眾，創造文化共鳴，同時帶來經濟價值。",
    ],
    cta: "關於子皿",
  },
  // MATRIX OVERRIDE throughout this block (D032). The TC frames draw a different
  // wording for the headline and for three of the four item titles; the matrix
  // wins, so no frame exists for these exact strings. They are shorter than what
  // the frames draw, so the section simply becomes shorter — nothing is scaled up
  // to fill the designed block (same reasoning as D038).
  //   headline  frame: 全方位助力，讓你的音樂連結世界。
  //   item 1    frame: 藝人經紀整合   / item 2 frame: 海內外巡演規劃
  //   item 4    frame: 演出活動製作   / item 3 matches.
  services: {
    // `keep EN` in the matrix — the TC frame draws the English word too.
    eyebrow: "Services",
    headline: "全方位助力，成為你最堅實的音樂發展夥伴",
    cta: "完整服務項目",
    items: [
      {
        title: "藝人經紀",
        description:
          "全方位助推藝人發展。從長期規劃、形象經營、演出接洽、到合約發行等繁瑣細節。",
      },
      {
        title: "巡演規劃",
        description:
          "串連長年累積的海外資源，統籌音樂人國內外巡迴演出與海外音樂活動。",
      },
      {
        title: "行銷宣傳",
        description:
          "量身打造行銷與公關策略，精準瞄準分眾市場，結合時下行銷趨勢說好故事。",
      },
      {
        title: "活動製作",
        description:
          "從專場演出到創意音樂策展，包辦企劃發想、預算規劃、統籌協調及現場執行。",
      },
    ],
  },
  // See en.ts for the card-slot rationale. Card 3 replaces Figma's
  // 臥軌的火車：台灣巡迴【昨日重現】 with the matrix's Vol.3 (D032).
  //
  // The card tags ARE translated here — the TC frames draw 藝人經紀 / 巡演規劃 /
  // 行銷宣傳, matching the service item titles. The section eyebrow is not: the
  // matrix marks `PORTFOLIO` as `keep EN`.
  featuredProjects: {
    eyebrow: "Portfolio",
    heading: "代表案例",
    cta: "完整案例",
    cards: [
      {
        dateLabel: "2025.11 子皿 In Utero Present Vol.2",
        title: "一起喝酒的朋友",
        description:
          "集結雷擎 L8ching、張淦勛 Giyu Tjuljaviya、宋楚琳，將日常相遇與音樂節奏化為巡迴演出。",
        tags: ["藝人經紀", "巡演規劃", "行銷宣傳"],
        image: "/images/projects/bottoms-up.jpg",
      },
      {
        dateLabel: "2024.09 子皿 In Utero Present Vol.1",
        title: "鍋 Band Show",
        description:
          "於詹記西門大世界舉辦，結合的復古餐廳秀概念，帶聽眾一邊看表演、一邊大啖美味麻辣火鍋。",
        tags: ["巡演規劃", "行銷宣傳"],
        image: "/images/projects/hotpot-band-show.jpg",
      },
      {
        dateLabel: "2026.05 子皿 In Utero Present Vol.3",
        title: "彼日的心內話",
        description:
          "攜手緩緩 Huan Huan 先後走訪台北市中山老人住宅暨服務中心、彰化花壇安耆日照中心，以及彰化北斗有冊店，在母親節前後為長輩與在地社區帶來一場場跨世代的音樂相聚。",
        tags: ["巡演規劃", "行銷宣傳"],
        image: "/images/projects/inner-voices-of-that-day.jpg",
      },
    ],
  },
};

export default home;

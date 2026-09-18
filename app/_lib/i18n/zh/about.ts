import type enAbout from "../en/about";

// Typed against the matching `en` module, explicitly annotated rather than
// only `satisfies`-checked at the index, so an extra or misspelled key is a
// `tsc --noEmit` error too — not just a missing one (D010, Phase 07b D-F).
// See en/about.ts for sourcing notes.
const about: typeof enAbout = {
  title: "關於子皿",
  metaDescription:
    "子皿有限公司於 2017 年由顧孟儒與伍孟軒共同創立，逐步成長為全方位的音樂品牌，將台灣獨立音樂場景連結至全球觀眾。",
  hero: {
    eyebrow: "Our Story", // English in the TC frame too (I12368:2433;...;10270:2095).
    // Figma's own drawn headline (立足台灣，走向世界). Two lines at desktop, per
    // the TC screenshot; no comma between them there, unlike the mobile frame's
    // single wrapped string with a comma — a trivial (Close-tier) reflow
    // difference, not a wording change.
    headlineLine1: "立足台灣，",
    headlineLine2: "",
    headlineLine3: "走向世界。",
    headlineLine4: "",
    // MATRIX OVERRIDE (see en.ts): the matrix's founder story, not Figma's own
    // (shorter) TC hero body.
    bodyParagraphs: [
      "子皿有限公司（In Utero Ltd.）在 2017 成立，由在倫敦相遇的兩個台灣女生顧孟儒（Meng）與伍孟軒（May）一起創辦，兩人都是台灣音樂場景資深的幕後推手。秉持對創作音樂的熱愛與堅持，希望擔任音樂人創作以外所有事務的堅實夥伴，共同面對音樂經營路上的種種困難。",
      "創辦近十年，子皿逐步成長為全方位的音樂品牌以及文化策展單位，除了擔任火球祭、金音創作獎等大型音樂活動背後的助燃劑，也與眾多獨立音樂人與廠牌深度合作，見證長期合作的夥伴大象體操成功的《世界World》十週年巡迴，象徵從台灣出發的獨立樂團，也在國際市場累積具份量的商業影響力。子皿希望整合音樂產業中除了製作外的所有資源，提供不同階段的音樂人合適的服務，讓所有期待被聽見的音樂人邁向系統化經營，繼續讓真實的故事被更多人聽見。",
    ],
  },
  intro: {
    eyebrow: "Our Philosophy", // keep EN — matches the TC frame's own label.
    headlineLine1: "回歸創作本質，",
    headlineLine2: "訴說真實故事",
    // Figma's own TC body (12368:2435) draws TWO paragraphs here, where the EN
    // frame draws one — same asymmetry pattern as Home's Intro (see en.ts
    // comment there). Both are built as their own frame draws.
    bodyParagraphs: [
      "我們深信真誠創作的音樂具備跨越疆界的文化能量，因此子皿致力於成為全方位的音樂服務品牌，不盲從趨勢，不套用公式，運用長期累積的國際資源，將台灣充滿能量的音樂文化與全球產業機會接軌。不只擔任推手，更期待成為一位開路者，建立雙向的國際橋樑，讓創作者的故事與現場能量在世界的舞台上產生最真實的共振。",
    ],
  },
  // MATRIX OVERRIDE: the TC frame draws different wording for all three
  // titles/descriptions (e.g. "創作者為本視角" vs the matrix's "以創作者為本").
  // The matrix wins per D032 — same precedent as Services/Home.
  howWeWork: {
    eyebrow: "Our Approach", // keep EN — matches the TC frame.
    heading: "我們的堅持",
    points: [
      {
        title: "以創作者為本",
        description:
          "子皿長期與不同風格的藝術家相處，每次決策皆以創作者想表達的內涵為重，確保每個行動都能成為一次發聲的機會。",
      },
      {
        title: "國際化連結",
        description:
          "透過子皿長期經營的國際資源，接軌全球旺盛的現場演出市場，將台灣獨立音樂帶入亞洲音樂版圖，實現真正的文化輸出。",
      },
      {
        title: "化創意為行動",
        description:
          "子皿擅長整合企劃概念、社群趨勢與市場動向，將天馬行空的創意轉化為結構完整、精準到位的專案規劃。",
      },
    ],
  },
  team: {
    eyebrow: "Our Team", // keep EN — matches the TC frame.
    heading: "認識我們的團隊",
  },
};

export default about;

import type enCommon from "../en/common";

// Typed against the matching `en` module, explicitly annotated rather than
// only `satisfies`-checked at the index, so an extra or misspelled key is a
// `tsc --noEmit` error too — not just a missing one (D010, Phase 07b D-F).
const common: typeof enCommon = {
  common: {
    siteName: "子皿股份有限公司",
  },
  nav: {
    menuClose: "返回",
  },
  // Heading and inquiries label stay English — the CN (12653:5650) and TC (12368:2429)
  // frames both render them in English. Only the button translates.
  // The two frames disagree on the button: desktop CN says 和我們聊聊, mobile TC says
  // 跟我們聊聊. One key holds one string (D010), so the mobile TC form wins.
  universalCta: {
    headingLine1: "Let's make",
    headingLine2: "Some noise",
    button: "跟我們聊聊",
    inquiriesLabel: "General Inquiries",
  },
  share: {
    label: "Share",
    copied: "已複製",
    copyLink: "複製此頁連結",
    linkedin: "分享至 LinkedIn",
    x: "分享至 X",
    facebook: "分享至 Facebook",
  },
  newsletter: {
    heading: "取得我們的最新消息",
    description: "最新作品、音樂活動、創意專案，通通打包分享到你的信箱。",
    placeholder: "youremail@gmail.com",
    button: "訂閱",
  },
  // Copy below follows openspec/reference/content-matrix.md (the client's copy deck),
  // which outranks the Figma text layers for wording (D032).
  footer: {
    // CONFLICT #3 — left as English pending a decision. The matrix's Footer tab gives
    // 服務項目 with no （保留英文） marker, but the TC Footer frame (12635:16558) renders
    // this label as "SERVICES" in English, matching the "IN UTERO" label beside it that
    // the matrix *does* mark 保留英文. Shipping the Chinese also rotates CJK glyphs onto
    // their side (VerticalLabel uses rotate-90, correct for Latin, wrong for CJK — that
    // needs writing-mode: vertical-rl + text-orientation: upright instead).
    servicesHeading: "Services",
    artistManagement: "藝人經紀",
    internationalTourPlanning: "巡演規劃",
    prMarketing: "行銷宣傳",
    // The site-wide name for this service line. The matrix contradicted itself —
    // its Footer tab said 演出製作, its Home/Services/Portfolio tabs said 活動製作.
    // User decision 2026-08-02: 活動製作 everywhere. Phases 6, 9 and 10 render the
    // same string; do not re-derive it from the Footer tab's outlier.
    eventProduction: "活動製作",
    pagesHeading: "In Utero",
    newsletterLabel: "加入子皿電子報，取得音樂新訊",
    newsletterPlaceholder: "youremail@gmail.com",
    newsletterCta: "訂閱",
    newsletterDisclaimer: "點擊訂閱，即代表您同意我們的服務條款與隱私權政策。",
    privacyPolicy: "隱私權政策",
    termsOfService: "服務條款",
    cookiesSettings: "快取設定",
    copyright: "© 2026 In Utero. All rights reserved.",
  },
};

export default common;

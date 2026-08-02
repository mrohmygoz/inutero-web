import type en from "./en";

// Typed against `en` so a missing key is a `tsc --noEmit` error, not a
// silent runtime fallback (D010).
const zh: typeof en = {
  home: {
    title: "首頁",
    placeholder: "子皿股份有限公司 — 中文版本建置中。",
  },
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
  footer: {
    servicesHeading: "Services",
    artistManagement: "藝人經紀整合",
    internationalTourPlanning: "海內外巡演規劃",
    prMarketing: "行銷宣傳",
    eventProduction: "演出活動製作",
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

export default zh;

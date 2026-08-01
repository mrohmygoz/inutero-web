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

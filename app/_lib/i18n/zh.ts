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
};

export default zh;

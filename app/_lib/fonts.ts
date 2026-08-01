import {
  Alumni_Sans,
  Bodoni_Moda_SC,
  Chivo_Mono,
  Mochiy_Pop_One,
  Noto_Serif_TC,
} from "next/font/google";

const alumniSans = Alumni_Sans({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodoniModaSC = Bodoni_Moda_SC({
  variable: "--font-accent-latin",
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  display: "swap",
});

// Mochiy Pop One ships only Latin + Regular on Google Fonts; there is no
// CJK-covering subset registered, so preload must stay off (D008). The
// unrestricted stylesheet still carries the CJK glyph ranges.
const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-display-cjk",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
});

// Noto Serif TC has no italic and no preloadable subset in this Next
// version's Google Fonts metadata; omitting `subsets` and disabling preload
// still serves the full glyph range, just without a preload hint (D008).
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-accent-cjk",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  alumniSans.variable,
  chivoMono.variable,
  bodoniModaSC.variable,
  mochiyPopOne.variable,
  notoSerifTC.variable,
].join(" ");

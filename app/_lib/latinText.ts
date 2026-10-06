// D119/D120: the Chinese display scale (html[lang="zh"] in globals.css) drops
// font-weight to 400 for several heading levels. The CJK face (Mochiy Pop
// One) only ships one static weight, so that's a no-op for real Chinese
// glyphs — but the Latin face (Alumni Sans) is also only loaded at one
// static weight (700, see fonts.ts), so requesting 400 against it reads as
// visibly thinner than the surrounding Chinese text. Used wherever a
// zh-locale heading can contain an untranslated Latin proper noun (a title,
// an artist name) embedded in otherwise-Chinese copy.
const CJK_PATTERN =
  /[　-〿぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿＀-￯]/;

export type TextRun = { text: string; latin: boolean };

export function splitLatinRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  let current = "";
  let currentIsLatin: boolean | null = null;

  for (const char of text) {
    const charIsLatin = !CJK_PATTERN.test(char);
    if (currentIsLatin === null || charIsLatin === currentIsLatin) {
      current += char;
      currentIsLatin = charIsLatin;
    } else {
      runs.push({ text: current, latin: currentIsLatin });
      current = char;
      currentIsLatin = charIsLatin;
    }
  }
  if (current) runs.push({ text: current, latin: currentIsLatin! });

  return runs;
}

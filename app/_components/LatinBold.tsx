import { splitLatinRuns } from "../_lib/latinText";

// Matches the text-display-<mobile> lg:text-display-<desktop> pair the
// caller's own heading className uses — see the .tokens-run-*-latin classes
// in globals.css (D120). Add a pair here only when a title actually uses it.
const RUN_CLASS = {
  "h4-h3": "tokens-run-h4-h3-latin",
  "h5-h4": "tokens-run-h5-h4-latin",
  h2: "tokens-run-h2-latin",
} as const;

// English characters must render at the English px size for their heading
// level everywhere — a word embedded mid-sentence in a Chinese headline is
// not exempt (D120). Wraps each Latin run in a mixed-script string with a
// class pinning font-size/line-height/letter-spacing/weight to the English
// values, so it renders exactly as it would in a pure-English heading
// rather than inheriting the (smaller, lighter) ambient Chinese scale. A
// no-op for English copy and for pure-Chinese runs.
export default function LatinBold({
  text,
  level,
}: {
  text: string;
  level: keyof typeof RUN_CLASS;
}) {
  return (
    <>
      {splitLatinRuns(text).map((run, i) =>
        run.latin ? (
          <span key={i} className={RUN_CLASS[level]}>
            {run.text}
          </span>
        ) : (
          run.text
        )
      )}
    </>
  );
}

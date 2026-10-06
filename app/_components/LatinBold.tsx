import { splitLatinRuns } from "../_lib/latinText";

// Wraps Latin runs in a mixed-script Chinese heading at the actual weight
// the Latin face is loaded at (see latinText.ts) so an embedded English
// title/name doesn't read thinner than the surrounding Chinese. A no-op in
// English copy and for pure-Chinese runs — only Latin runs get the inline
// style, which wins over the ambient zh font-weight token regardless of
// cascade order.
export default function LatinBold({ text }: { text: string }) {
  return (
    <>
      {splitLatinRuns(text).map((run, i) =>
        run.latin ? (
          <span key={i} style={{ fontWeight: 700 }}>
            {run.text}
          </span>
        ) : (
          run.text
        )
      )}
    </>
  );
}

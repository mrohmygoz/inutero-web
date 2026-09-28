"use client";

// Source: desktop 12573:7129, mobile `Pagination (V3)` 12341:1980 / 12368:2478.
//
// Presentational and controlled — the caller owns the page index. Renders
// nothing below two pages: Figma draws page 1 of 10, which is sample data in the
// same way the card's "Bottom's Up" is, and an inert single-page row would be a
// state the design never draws.
//
// The reaction sweep found NO prototype on any of these buttons, on any of the
// four frames. Every behaviour below is derived.
//
// `tone` (Phase 13a): Portfolio's section is dark (`--color-basic-accent`), so
// inactive numbers/`Next` render in `--color-basic-background` (white). News's
// pagination node (`12612:7790`) sits on a light section and draws inactive
// items in dark gray instead — confirmed via Figma, not assumed. The active
// cell (dark fill, neon number) is identical in both, so only the inactive/
// rule colors switch.

type PaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  labels: { next: string; label: string; page: string };
  /** Section polarity. Defaults to "dark" — Portfolio's existing look, unchanged. */
  tone?: "dark" | "light";
};

/**
 * Figma draws `1 2 3 … 10` — first three, ellipsis, last. Generalised to keep
 * the current page visible: first, last, and the current page's neighbours,
 * with an ellipsis wherever the run breaks.
 */
function pageItems(page: number, pageCount: number): (number | "gap")[] {
  const keep = new Set([1, pageCount, page - 1, page, page + 1]);
  if (page <= 3) [2, 3].forEach((n) => keep.add(n));
  if (page >= pageCount - 2) [pageCount - 1, pageCount - 2].forEach((n) => keep.add(n));

  const items: (number | "gap")[] = [];
  let previous = 0;
  for (let n = 1; n <= pageCount; n += 1) {
    if (!keep.has(n)) continue;
    if (n - previous > 1) items.push("gap");
    items.push(n);
    previous = n;
  }
  return items;
}

const cellClassName =
  "flex size-[32px] shrink-0 items-center justify-center font-display text-display-h7 uppercase";

export default function Pagination({ page, pageCount, onChange, labels, tone = "dark" }: PaginationProps) {
  if (pageCount < 2) return null;

  const inactiveText = tone === "dark" ? "text-(--color-basic-background)" : "text-(--opacity-neutral-darkest-60)";
  const activeBorder = tone === "dark" ? "lg:border-[0.542px] lg:border-(--color-basic-background)" : "";

  return (
    <nav
      aria-label={labels.label}
      // The border and the row's lead-in; the desktop frame keeps both at full
      // opacity where mobile softens the rule to white/15. Light tone (News)
      // uses the same rule as its own filter rail instead (`opacity-neutral-
      // darkest-20` mobile, `basic-accent` desktop — a dark line on a light bg).
      className={
        tone === "dark"
          ? "flex w-full items-center justify-between border-t-[0.542px] border-(--opacity-white-15) pt-[20px] lg:border-(--color-basic-background) lg:pt-[20.5px]"
          : "flex w-full items-center justify-between border-t-[0.542px] border-(--opacity-neutral-darkest-20) pt-[20px] lg:border-(--color-basic-accent) lg:pt-[20.5px]"
      }
    >
      {/* The frame's empty left slot, which balances `Next` on the right. */}
      <div className="h-0 w-[40px] shrink-0" />

      <div className="flex items-center">
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <span
              key={`gap-${index}`}
              aria-hidden
              className={`font-body text-body-s flex size-[32px] shrink-0 items-center justify-center ${inactiveText}`}
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-current={item === page ? "page" : undefined}
              aria-label={`${labels.page} ${item}`}
              className={
                item === page
                  ? `${cellClassName} bg-(--color-basic-accent) text-(--color-brand-accent-neon) ${activeBorder}`
                  : `${cellClassName} ${inactiveText}`
              }
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        // Derived: the frame draws `Next` in one state only, on page 1 of 10.
        disabled={page >= pageCount}
        className={`font-display text-display-h7 shrink-0 px-[4px] uppercase disabled:opacity-40 ${inactiveText}`}
      >
        {labels.next}
      </button>
    </nav>
  );
}

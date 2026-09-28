import type { Locale } from "../../../_lib/i18n";

// Extracted from `news/page.tsx` (Phase 13a) when News Details (Phase 14)
// became a second consumer. English reads as a full date ("June 12, 2026" —
// `Article.tsx`'s uppercase class renders "JUNE 12, 2026"); Chinese keeps the
// client's own dot-numeric press-release convention ("2026.06.12"). Built
// from the ISO string's own components, not `Date`/`toLocaleDateString` —
// parsing "2026-06-12" through `Date` and reformatting risks a UTC/local
// timezone off-by-one-day shift.
const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatNewsDateLabel(isoDate: string, locale: Locale): string {
  if (locale !== "en") return isoDate.replace(/-/g, ".");
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${EN_MONTHS[month - 1]} ${day}, ${year}`;
}

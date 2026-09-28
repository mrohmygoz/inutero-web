import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import { getManifest } from "../../_lib/content";
import NewsHeader from "./_components/NewsHeader";
import NewsGrid, { type NewsArticleSummary } from "./_components/NewsGrid";

// English reads as a full date ("June 12, 2026" — Article.tsx's uppercase
// class renders "JUNE 12, 2026"); Chinese keeps the client's own dot-numeric
// press-release convention ("2026.06.12"). Built from the ISO string's own
// components, not `Date`/`toLocaleDateString` — parsing "2026-06-12" through
// `Date` and reformatting risks a UTC/local timezone off-by-one-day shift.
const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function formatNewsDateLabel(isoDate: string, locale: Locale): string {
  if (locale !== "en") return isoDate.replace(/-/g, ".");
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${EN_MONTHS[month - 1]} ${day}, ${year}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("news", locale);
}

export default async function NewsPage({ params }: PageProps<"/[locale]/news">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { news } = getDictionary(locale);

  // Build time, not runtime — same contract as Portfolio (D-A there).
  const articles: NewsArticleSummary[] = (await getManifest("news"))
    .filter((entry) => entry.locale === locale)
    // Newest first, same derivation as Portfolio: no sort control exists, and
    // a news index with no order reads chronologically.
    .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
    .map(({ slug, frontmatter }) => ({
      slug,
      title: frontmatter.title,
      // No authored per-locale date label on news (unlike Portfolio's
      // `dateLabel`) — derived from the ISO date, format per locale (see
      // `formatNewsDateLabel` above): "June 12, 2026" in English,
      // "2026.06.12" in Chinese, matching the client's own press-release
      // date convention.
      dateLabel: formatNewsDateLabel(frontmatter.date, locale),
      image: frontmatter.image,
      tags: [...frontmatter.tags],
    }));

  return (
    <>
      <NewsHeader locale={locale} />
      <NewsGrid locale={locale} articles={articles} filter={news.filter} />
    </>
  );
}

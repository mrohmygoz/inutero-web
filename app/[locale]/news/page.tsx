import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import { getManifest } from "../../_lib/content";
import NewsHeader from "./_components/NewsHeader";
import NewsGrid, { type NewsArticleSummary } from "./_components/NewsGrid";
import NewsTopStory from "./_components/NewsTopStory";
import NewsletterSignup from "../../_components/NewsletterSignup";
import { newsTagColor } from "./_components/tagColors";
import { formatNewsDateLabel } from "./_lib/formatNewsDateLabel";

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
  const manifest = (await getManifest("news")).filter((entry) => entry.locale === locale);

  const articles: NewsArticleSummary[] = manifest
    // Newest first, same derivation as Portfolio: no sort control exists, and
    // a news index with no order reads chronologically.
    .slice()
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

  // Top News banner (Phase 13a): resolved from the already-fetched manifest,
  // not a second content lookup. Loud, not silent, on a bad config — matches
  // every other manifest cross-reference contract in the codebase (D002).
  const featured = manifest.find((entry) => entry.slug === news.featuredSlug);
  if (!featured) {
    throw new Error(
      `News featuredSlug "${news.featuredSlug}" not found in the "${locale}" news manifest.`
    );
  }
  const featuredTag = featured.frontmatter.tags[0];

  return (
    <>
      <NewsHeader locale={locale} />
      <NewsTopStory
        href={`/${locale}/news/${featured.slug}`}
        title={featured.frontmatter.title}
        dateLabel={formatNewsDateLabel(featured.frontmatter.date, locale)}
        image={{ src: featured.frontmatter.image, alt: featured.frontmatter.title }}
        tag={{ label: news.filter.tags[featuredTag], color: newsTagColor[featuredTag] }}
      />
      <NewsGrid locale={locale} articles={articles} filter={news.filter} pagination={news.pagination} />
      <NewsletterSignup locale={locale} />
    </>
  );
}

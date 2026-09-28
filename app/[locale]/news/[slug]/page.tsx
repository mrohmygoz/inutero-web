import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntry, getManifest, type ContentEntry } from "../../../_lib/content";
import { getDictionary, isLocale } from "../../../_lib/i18n";
import NewsDetail, { type RelatedPost } from "./_components/NewsDetail";

// Phase 4 replaced Phase 3's hardcoded PLACEHOLDER_SLUG (D020) with the content
// manifest. `getManifest` is what turns a missing translation or malformed frontmatter
// into a build failure: it runs before any route is emitted (D-C). `dynamicParams = false`
// on [locale]/layout.tsx still 404s every slug not listed here.
export async function generateStaticParams() {
  const entries = await getManifest("news");
  return entries.map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = await getEntry("news", locale, slug);
  if (!entry) notFound();

  const dict = getDictionary(locale);
  return {
    title: `${entry.frontmatter.title} — ${dict.common.siteName}`,
    description: entry.frontmatter.excerpt,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: {
        en: `/en/news/${slug}`,
        zh: `/zh/news/${slug}`,
      },
    },
  };
}

// Related-posts selection (design.md, Phase 14 — no design reaction to confirm
// one): articles sharing at least one tag with the current entry, most-recent
// first, excluding the current slug, capped at 3 (the count both News Details
// frames draw — DECISIONS.md), falling back to recency-only when fewer than 3
// share a tag.
const RELATED_COUNT = 3;

function selectRelated(manifest: ContentEntry[], current: ContentEntry): RelatedPost[] {
  const others = manifest
    .filter((e) => e.locale === current.locale && e.slug !== current.slug)
    .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));

  const currentTags = new Set(current.frontmatter.tags);
  const tagged = others.filter((e) => e.frontmatter.tags.some((tag) => currentTags.has(tag)));
  const rest = others.filter((e) => !tagged.includes(e));

  return [...tagged, ...rest].slice(0, RELATED_COUNT).map((e) => ({
    slug: e.slug,
    title: e.frontmatter.title,
    date: e.frontmatter.date,
    image: e.frontmatter.image,
    tags: [...e.frontmatter.tags],
  }));
}

export default async function NewsDetailPage({ params }: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = await getEntry("news", locale, slug);
  if (!entry) notFound();

  const manifest = await getManifest("news");
  const related = selectRelated(manifest, entry);

  return <NewsDetail locale={locale} entry={entry} related={related} />;
}

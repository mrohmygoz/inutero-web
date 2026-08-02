import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntry, getManifest } from "../../../_lib/content";
import { getDictionary, isLocale } from "../../../_lib/i18n";
import ContentDetail from "../../_components/ContentDetail";

// Phase 4 replaced Phase 3's hardcoded PLACEHOLDER_SLUG (D020) with the content
// manifest. `getManifest` is what turns a missing translation or malformed frontmatter
// into a build failure: it runs before any route is emitted (D-C). `dynamicParams = false`
// on [locale]/layout.tsx still 404s every slug not listed here.
export async function generateStaticParams() {
  const entries = await getManifest("portfolio");
  return entries.map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = await getEntry("portfolio", locale, slug);
  if (!entry) notFound();

  const dict = getDictionary(locale);
  return {
    title: `${entry.frontmatter.title} — ${dict.common.siteName}`,
    description: entry.frontmatter.excerpt,
    alternates: {
      canonical: `/${locale}/portfolio/${slug}`,
      languages: {
        en: `/en/portfolio/${slug}`,
        zh: `/zh/portfolio/${slug}`,
      },
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = await getEntry("portfolio", locale, slug);
  if (!entry) notFound();

  return <ContentDetail entry={entry} />;
}

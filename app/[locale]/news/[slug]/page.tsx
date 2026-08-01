import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, locales } from "../../../_lib/i18n";
import { getRoute } from "../../../_lib/routes";
import PagePlaceholder from "../../_components/PagePlaceholder";

// D-D: placeholder slug until Phase 4's MDX pipeline supplies real content.
const PLACEHOLDER_SLUG = "placeholder";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, slug: PLACEHOLDER_SLUG }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || slug !== PLACEHOLDER_SLUG) notFound();

  const dict = getDictionary(locale);
  const { label } = getRoute("news");
  return {
    title: `${label[locale]} — ${dict.common.siteName}`,
    alternates: {
      canonical: `/${locale}/news/${PLACEHOLDER_SLUG}`,
      languages: {
        en: `/en/news/${PLACEHOLDER_SLUG}`,
        zh: `/zh/news/${PLACEHOLDER_SLUG}`,
      },
    },
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || slug !== PLACEHOLDER_SLUG) notFound();
  return <PagePlaceholder routeKey="news" locale={locale} />;
}

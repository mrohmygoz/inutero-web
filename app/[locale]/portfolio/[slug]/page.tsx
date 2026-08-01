import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, locales } from "../../../_lib/i18n";
import { getRoute } from "../../../_lib/routes";
import PagePlaceholder from "../../_components/PagePlaceholder";

// D-D: placeholder slug until Phase 4's MDX pipeline supplies real content.
// dynamicParams = false (inherited from [locale]/layout.tsx) 404s every
// other slug — that behavior is what this route exists to prove this phase.
const PLACEHOLDER_SLUG = "placeholder";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, slug: PLACEHOLDER_SLUG }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || slug !== PLACEHOLDER_SLUG) notFound();

  const dict = getDictionary(locale);
  const { label } = getRoute("portfolio");
  return {
    title: `${label[locale]} — ${dict.common.siteName}`,
    alternates: {
      canonical: `/${locale}/portfolio/${PLACEHOLDER_SLUG}`,
      languages: {
        en: `/en/portfolio/${PLACEHOLDER_SLUG}`,
        zh: `/zh/portfolio/${PLACEHOLDER_SLUG}`,
      },
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || slug !== PLACEHOLDER_SLUG) notFound();
  return <PagePlaceholder routeKey="portfolio" locale={locale} />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";
import { buildRouteMetadata } from "../../_lib/metadata";
import { getManifest } from "../../_lib/content";
import UniversalCTA from "../../_components/UniversalCTA";
import PortfolioHero from "./_components/PortfolioHero";
import PortfolioGrid, { type PortfolioProject } from "./_components/PortfolioGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("portfolio", locale);
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { portfolio } = getDictionary(locale);

  // Build time, not runtime. Only serialisable rows cross into the client grid —
  // never `Body`, which is a component (design.md D-A).
  const projects: PortfolioProject[] = (await getManifest("portfolio"))
    .filter((entry) => entry.locale === locale)
    // Newest first. Derived — the drawn card order is sample data, and a project
    // index with no sort control reads chronologically.
    .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
    .map(({ slug, frontmatter }) => ({
      slug,
      title: frontmatter.title,
      dateLabel: frontmatter.dateLabel,
      excerpt: frontmatter.excerpt,
      image: frontmatter.image,
      services: frontmatter.services,
    }));

  return (
    <>
      <PortfolioHero locale={locale} />
      <PortfolioGrid
        locale={locale}
        projects={projects}
        filter={portfolio.filter}
        pagination={portfolio.pagination}
      />
      <UniversalCTA locale={locale} href={localizedHref("contact", locale)} />
    </>
  );
}

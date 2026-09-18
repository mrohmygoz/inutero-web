import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import ServicesHero from "./_components/ServicesHero";
import ServicesList from "./_components/ServicesList";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("services", locale);
}

// Phase 8 builds the header and the four service cards only. The FAQ section
// (12573:6686 / 12220:2269) and UniversalCTA (12573:9015 / 12220:2432) are
// Phase 9 and append here, in that order, below ServicesList.
export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <ServicesHero locale={locale} />
      <ServicesList locale={locale} />
    </main>
  );
}

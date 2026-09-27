import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";
import { buildRouteMetadata } from "../../_lib/metadata";
import ServicesHero from "./_components/ServicesHero";
import ServicesList from "./_components/ServicesList";
import ServicesFaq from "./_components/ServicesFaq";
import UniversalCTA from "../../_components/UniversalCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("services", locale);
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <ServicesHero locale={locale} />
      <ServicesList locale={locale} />
      <ServicesFaq locale={locale} />
      {/* Same instance Home places — component set 12653:5649, Default at
          desktop EN and CN at desktop TC, symbol 12212:5282 at mobile.
          Verified unmodified against Home's, so no prop was added. */}
      <UniversalCTA locale={locale} href={localizedHref("contact", locale)} />
    </main>
  );
}

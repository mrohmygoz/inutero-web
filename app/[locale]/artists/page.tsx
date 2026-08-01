import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import PagePlaceholder from "../_components/PagePlaceholder";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/artists">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("artists", locale);
}

export default async function ArtistsPage({ params }: PageProps<"/[locale]/artists">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PagePlaceholder routeKey="artists" locale={locale} />;
}

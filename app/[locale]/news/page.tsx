import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import PagePlaceholder from "../_components/PagePlaceholder";

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
  return <PagePlaceholder routeKey="news" locale={locale} />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";
import { buildRouteMetadata } from "../../_lib/metadata";
import { artists } from "../../_lib/artists";
import UniversalCTA from "../../_components/UniversalCTA";
import ArtistsHero from "./_components/ArtistsHero";
import ArtistsGrid from "./_components/ArtistsGrid";

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

  const { filter } = getDictionary(locale).artists;

  return (
    <>
      <ArtistsHero locale={locale} />
      <ArtistsGrid locale={locale} artists={artists} filter={filter} />
      <UniversalCTA locale={locale} href={localizedHref("contact", locale)} />
    </>
  );
}

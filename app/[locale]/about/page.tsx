import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import { localizedHref } from "../../_lib/routes";
import UniversalCTA from "../../_components/UniversalCTA";
import AboutHero from "./_components/AboutHero";
import AboutIntro from "./_components/AboutIntro";
import AboutHowWeWork from "./_components/AboutHowWeWork";
import AboutTeam from "./_components/AboutTeam";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("about", locale);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <AboutHero locale={locale} />
      <AboutIntro locale={locale} />
      <AboutHowWeWork locale={locale} />
      <AboutTeam locale={locale} />
      <UniversalCTA locale={locale} href={localizedHref("contact", locale)} />
    </main>
  );
}

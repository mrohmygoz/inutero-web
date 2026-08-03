import { notFound } from "next/navigation";
import { isLocale } from "../_lib/i18n";
import { localizedHref } from "../_lib/routes";
import HomeHero from "./_components/HomeHero";
import HomeIntro from "./_components/HomeIntro";
import HomeServices from "./_components/HomeServices";
import HomeFeaturedProjects from "./_components/HomeFeaturedProjects";
import UniversalCTA from "../_components/UniversalCTA";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <HomeHero locale={locale} />
      <HomeIntro locale={locale} />
      <HomeServices locale={locale} />
      <HomeFeaturedProjects locale={locale} />
      {/* Full-bleed — deliberately outside any page padding. The prototype wires
          this button to Contact (I12612:11943;12573:6408 → 12612:8829). */}
      <UniversalCTA locale={locale} href={localizedHref("contact", locale)} />
    </main>
  );
}

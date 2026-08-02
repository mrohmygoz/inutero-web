import { notFound } from "next/navigation";
import { isLocale } from "../_lib/i18n";
import HomeHero from "./_components/HomeHero";
import HomeIntro from "./_components/HomeIntro";

// Phase 5 builds the top half of Home only — the hero and the intro (Mission).
// Services (12210:2346), Featured Projects (12210:2392) and the UniversalCTA
// block are Phase 6, so the page currently ends at the intro and falls into the
// Footer. That is the phase boundary, not a missing section.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <HomeHero locale={locale} />
      <HomeIntro locale={locale} />
    </main>
  );
}

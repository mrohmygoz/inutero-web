import Image from "next/image";
import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:6372 (960px, TC 0:222 desktop); mobile Hero
// 12212:6345 (665px, TC 12368:2433). Page-local, single consumer (D-A).
// `get_metadata` reported the desktop frame childless — resolved with
// `get_design_context`, which returned live text, not a flattened raster.
//
// The body block grows with the real (matrix) copy rather than clipping at
// the drawn 960px/665px heights — those become minimums (D-C in design.md).
// Two sibling subtrees (D-F), switching at `lg` per the site-wide convention.
export default function AboutHero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).about;

  const body = hero.bodyParagraphs.map((paragraph) => (
    <p key={paragraph} className="font-body text-body-l text-white/90">
      {paragraph}
    </p>
  ));

  const mobileHeroTextDisplay = locale === "zh" ? "text-display-h1" : "text-display-h2";

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-dvh w-full overflow-hidden bg-(--color-basic-accent) lg:hidden">
        <div aria-hidden className="absolute inset-0">
          <Image src="/images/about/about-hero.png" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Headline and body both stay in normal flow (only the photo is
            absolute) so a long body — grown per D-C — pushes down rather
            than overlapping the headline. */}
        <div className="relative flex min-h-dvh flex-col justify-between">
          <div className="flex w-full items-start gap-[5px] pt-[74px] pr-[15px]">
            <Eyebrow
              label={hero.eyebrow}
              tone="light"
              className="flex h-[99px] w-[17px] shrink-0 items-center justify-center translate-y-4"
            />
            <div className="flex flex-1 flex-col justify-center pt-[20px]">
              <h1 className={`font-display ${mobileHeroTextDisplay} w-full text-white uppercase`}>
                <span className="block">{hero.headlineLine1}</span>
                <span className="block">{hero.headlineLine2}</span>
                <span className="block">{hero.headlineLine3}</span>
                <span className="block">{hero.headlineLine4}</span>
              </h1>
            </div>
          </div>

          {/* <div className="flex flex-col items-start px-5 py-[30px]">{body}</div> */}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Collage — 1440px design, reflowing from 1024px up (D040)          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative hidden min-h-[960px] w-full overflow-hidden bg-(--color-basic-accent) lg:block">
        <div aria-hidden className="absolute inset-0">
          <Image src="/images/about/about-hero.png" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative flex items-start px-[32px] py-[68px] mt-24">
          <Eyebrow
            label={hero.eyebrow}
            tone="light"
            className="flex h-[64px] w-[17px] shrink-0 items-start justify-center mt-12"
          />
          <h1 className="font-display text-display-h1 min-w-px flex-1 text-white uppercase">
            <span className="block">{hero.headlineLine1} {hero.headlineLine2}</span>
            <span className="block">{hero.headlineLine3} {hero.headlineLine4}</span>
          </h1>
        </div>

        {/* <div className="relative mt-8 flex justify-end px-[32px] pb-[64px]">
          <div className="flex w-[380px] flex-col items-start gap-4">{body}</div>
        </div> */}
      </section>
    </>
  );
}

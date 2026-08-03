import Image from "next/image";
import Cta from "../../_components/Cta";
import { getDictionary, type Locale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";

// Source: desktop Intro 12405:6419 (TC 0:254); mobile Intro 12212:6318 (TC
// 12368:2416). Page-local, not shared: one consumer (D-A).
//
// Two sibling subtrees (D-C), switching at `lg:` (1024px, D040). The intro is a
// FLOW section, not a placed canvas — it reflows rather than scaling, so it does
// not use `canvas-1440`. Desktop puts the heading top-left with the image
// overlapping its lower right and the body/CTA anchored bottom-right; mobile is
// a plain column. The mobile TC frame confirmed the same tree as mobile EN —
// its shorter height is text reflow (Display/H2 is 43px in Chinese vs 87px in
// English), not a different layout.
//
// The heading is a gradient-filled display line. Only the first stop is a token
// (--color-brand-primary-green); the mid and end greens exist solely in this
// gradient and have no variable behind them, so they are written literally here
// rather than invented as tokens. The two frames use different angles.
const HEADING_GRADIENT_DESKTOP =
  "linear-gradient(192.00409032294647deg, rgb(8, 196, 84) 21.759%, rgb(82, 200, 80) 53.972%, rgb(39, 166, 90) 88.215%)";
const HEADING_GRADIENT_MOBILE =
  "linear-gradient(210.43759505737597deg, rgb(8, 196, 84) 16.127%, rgb(82, 200, 80) 54.764%, rgb(39, 166, 90) 95.835%)";

// Green dot + rotated label. Built inline rather than as a component: the
// standalone `TaglineWrapper` primitive was removed after Phase 3 for having a
// single consumer, and `TitleGroup` carries the same treatment inline.
function Eyebrow({ label, className }: { label: string; className: string }) {
  return (
    <div className={`flex items-center justify-center ${className} lg:translate-y-0 translate-y-2`}>
      <div className="rotate-90">
        <div className="flex items-center gap-[10px]">
          <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
          <p className="font-body text-label-m text-center whitespace-nowrap uppercase text-(--color-basic-accent)">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomeIntro({ locale }: { locale: Locale }) {
  const { intro } = getDictionary(locale).home;
  const aboutHref = localizedHref("about", locale);

  const body = intro.bodyParagraphs.map((paragraph) => (
    <p key={paragraph} className="font-body text-body-l text-(--color-basic-accent)">
      {paragraph}
    </p>
  ));

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-[41px] bg-(--color-basic-background) pt-[30px] pb-[60px] lg:hidden">
        <div className="flex w-full items-start gap-[5px] pr-[15px]">
          <Eyebrow label={intro.eyebrow} className="h-[92px] w-[17px] shrink-0" />
          <div className="flex w-[346px] max-w-full flex-col justify-center pt-[20px]">
            <h2
              className="font-display text-display-h2 w-full bg-clip-text whitespace-pre-line uppercase text-transparent"
              style={{ backgroundImage: HEADING_GRADIENT_MOBILE }}
            >
              {intro.headline}
            </h2>
          </div>
        </div>

        <div className="flex w-[363px] max-w-[calc(100%-30px)] flex-col items-start gap-[24px]">
          <div className="relative h-[314px] w-full">
            <Image
              src="/images/home/intro.jpg"
              alt=""
              fill
              sizes="(max-width: 393px) 100vw, 363px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">{body}</div>
          <Cta href={aboutHref} tone="green" className="w-full">
            {intro.cta}
          </Cta>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)          */}
      {/* ---------------------------------------------------------------- */}
      <section className="hidden bg-(--color-basic-background) lg:block">
        <div className="mx-auto w-full max-w-[1440px] pt-[138px] pb-[68px]">
          {/* The heading block is the positioning context for the image, so a
              shorter Chinese heading pulls the image up with it instead of
              leaving it stranded mid-section (D-D). */}
          {/* The right margin is width-dependent, so like the image below it
              keeps the frame's proportion (231/1440) rather than a fixed px
              value that would squeeze the heading column as the page narrows.
              The left gutter stays 32px — it is the page gutter the NAV uses. */}
          <div className="relative flex items-start pr-[16.042%] pl-[32px]">
            <Eyebrow label={intro.eyebrow} className="h-[97px] w-[27px] shrink-0 py-[15px]" />
            <h2
              className="font-display text-display-h2 min-w-px flex-1 bg-clip-text whitespace-pre-line uppercase text-transparent"
              style={{ backgroundImage: HEADING_GRADIENT_DESKTOP }}
            >
              {intro.headline}
            </h2>

            {/* image 21 (12405:6432) — inverted against the heading via a white
                fill in difference mode, exactly as the frame composites it.
                This element is *positioned*, so unlike the rest of this section
                it cannot keep a fixed offset once the container narrows: 733px
                is 50.9% of the 1440px frame but 71.6% of a 1024px one, which
                would slide it off the heading. Expressed as the frame's own
                proportion instead (D040). */}
            <div className="absolute bottom-[-10px] left-[50.903%] h-[193px] w-[243px] mix-blend-difference">
              <div aria-hidden className="absolute inset-0">
                <Image
                  src="/images/home/intro.jpg"
                  alt=""
                  fill
                  sizes="243px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white mix-blend-difference" />
              </div>
            </div>
          </div>

          <div className="mt-[98px] flex justify-end pr-[32px]">
            <div className="flex w-[418px] flex-col items-start gap-[20px]">
              <div className="flex flex-col pt-[20px]">{body}</div>
              <Cta href={aboutHref} tone="green">
                {intro.cta}
              </Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

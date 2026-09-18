import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Section 12610:6253 (635px); mobile Section 12219:948 (929.6px,
// TC 12368:2436, 712.6px). Page-local, single consumer (D-A).
//
// Despite the Figma layer name `ServicesAccordion` (12610:6264) and its
// `Button` children, this is static — all three points render open with no
// variant set, icon affordance, or reaction on any Button node. Not the same
// interaction as Home's `HomeServices` accordion (D-E in design.md).
export default function AboutHowWeWork({ locale }: { locale: Locale }) {
  const { howWeWork } = getDictionary(locale).about;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-start bg-(--color-basic-accent) py-[25px] lg:hidden">
        <div className="flex w-full items-start gap-[5px] pr-[15px]">
          <Eyebrow
            label={howWeWork.eyebrow}
            tone="light"
            className="flex h-[99px] w-[17px] shrink-0 items-center justify-center translate-y-3 lg:translate-y-1"
          />
          <h2 className="font-display text-display-h2 w-full flex-1 pt-[20px] text-white uppercase">
            {howWeWork.heading}
          </h2>
        </div>

        <div className="w-full max-w-[576px] py-[28px] pr-[15px] pl-[27px]">
          <div className="flex flex-col gap-[40px]">
            {howWeWork.points.map((point) => (
              <div key={point.title} className="border-t border-white/20 pt-[28px]">
                <p className="font-display text-display-h4 text-(--color-brand-accent-neon) uppercase">
                  {point.title}
                </p>
                <p className="font-body text-body-m mt-3 text-white/80">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)          */}
      {/* ---------------------------------------------------------------- */}
      <section className="hidden bg-(--color-basic-accent) px-[32px] py-[64px] lg:block">
        <div className="flex items-start gap-[5px]">
          <Eyebrow
            label={howWeWork.eyebrow}
            tone="light"
            className="flex h-[74px] w-[27px] shrink-0 items-center justify-center translate-y-3 lg:translate-y-1"
          />
          <div className="flex min-w-px flex-1 flex-col items-end justify-center gap-[80px]">
            <h2 className="font-display text-display-h2 w-full text-white uppercase">{howWeWork.heading}</h2>

            <div className="flex w-full items-start gap-[32px]">
              {howWeWork.points.map((point) => (
                <div key={point.title} className="min-w-px flex-1 border-t border-white/20 pt-[40px]">
                  <p className="font-display text-display-h4 text-(--color-brand-accent-neon) uppercase">
                    {point.title}
                  </p>
                  <p className="font-body text-body-l mt-4 pr-2 text-white">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

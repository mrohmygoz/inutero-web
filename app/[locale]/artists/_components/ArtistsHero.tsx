import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Header 12591:6171 (EN) / I12635:12928;12591:6171 (TC);
// mobile Title Group 12220:1079 (EN) / 12368:2596 (TC).
//
// Unlike Portfolio's dark header, this one is light — white background, dark
// text (both frames draw `basic/background` bg with `basic/border` text,
// confirmed by the design.md sweep). No dark NAV instance on any of the four
// frames, so `artists` does not join `darkNavRoutes`.
//
// No body paragraph — the matrix marks the borrowed description `直接刪除`,
// and both frames keep it `hidden`, same as Portfolio's header.
export default function ArtistsHero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).artists;

  return (
    <section className="w-full bg-(--color-basic-background)">
      <div className="flex items-start gap-[5px] pr-[15px] lg:gap-0 lg:px-[32px] lg:py-[68px]">
        {/* Two instances, not one responsive box — same reasoning as
            PortfolioHero (D061): the mobile Tagline Wrapper carries a
            pre-rotation inset the desktop Container does not. */}
        <Eyebrow
          label={hero.eyebrow}
          tone="dark"
          gutterInset
          className="flex h-[99px] w-[17px] shrink-0 items-center justify-center lg:hidden translate-y-3"
        />
        <Eyebrow
          label={hero.eyebrow}
          tone="dark"
          className="hidden h-[112px] w-[27px] shrink-0 items-start justify-center py-[15px] lg:flex lg:translate-y-11"
        />
        <div className="flex min-w-px flex-1 flex-col items-start pt-[20px] lg:pt-0">
          <h1 className="font-display text-display-h1 w-full text-(--color-basic-accent) uppercase">
            {hero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}

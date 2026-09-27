import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Header 12573:6910 (EN) / I12635:12926;12573:6910 (TC);
// mobile Title Group 12219:1066 (EN) / 12368:2456 (TC).
//
// No body paragraph and no photograph — this header is the eyebrow rail and the
// heading, nothing else. The matrix marks the description `直接刪除段落`, and
// neither frame draws one any more, so there was nothing to delete.
//
// Frame heights: desktop 590px EN / 444px TC, mobile 179px EN / 149px TC, each
// including the NAV above it.
export default function PortfolioHero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).portfolio;

  return (
    // Figma stacks the dark NAV and the heading block inside one Header frame
    // (138px desktop, 64px mobile), so this section reserves that height rather
    // than letting the absolutely-positioned NAV overlay it (D070).
    <section className="w-full bg-(--color-basic-accent) pt-[64px] lg:pt-[138px]">
      <div className="flex items-start gap-[5px] pr-[15px] lg:gap-0 lg:px-[32px] lg:py-[68px]">
        {/* Two instances, not one responsive box — the mobile Tagline Wrapper
            carries the 25px pre-rotation inset and the desktop Container does
            not, and that inset has no `lg:` form (D061). */}
        <Eyebrow
          label={hero.eyebrow}
          tone="light"
          gutterInset
          className="flex h-[99px] w-[17px] shrink-0 items-center justify-center lg:hidden"
        />
        <Eyebrow
          label={hero.eyebrow}
          tone="light"
          className="hidden h-[112px] w-[27px] shrink-0 items-start justify-center py-[15px] lg:flex"
        />
        <div className="flex min-w-px flex-1 flex-col items-start pt-[20px] lg:pt-0">
          <h1 className="font-display text-display-h1 w-full text-(--color-basic-background) uppercase">
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

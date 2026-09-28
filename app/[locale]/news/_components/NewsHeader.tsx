import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Header 12612:8808 -> 12611:7588 (EN) / I12635:12929;12611:7588
// (TC); mobile Header 12211:4003 -> 12220:1633 (EN) / 12368:2630 -> 12368:2632
// (TC). Light header (white bg, dark text, light NAV) — `news` is not in
// `darkNavRoutes`, and NAV renders in normal flow, so unlike PortfolioHero
// this section does not need to reserve the NAV's height itself.
//
// The heading is a literal 113px/79.1px-leading/-1.13px-tracking size — every
// one of the four frames (mobile/desktop x EN/TC) reports the same numbers,
// which is the *mobile* Display/H1 mode's value, not the responsive
// `text-display-h1` token (220px at desktop, 62px mobile ZH). Transcribed
// literally rather than tokenized, matching D030/D037's precedent for a
// locally-drawn size with no token behind it (recorded in DECISIONS.md).
//
// Unlike Portfolio/Artists, this header carries a body paragraph below the
// heading (content-matrix.md "Header body" row) — the one structural
// difference from those two headers' eyebrow+heading-only shape.
export default function NewsHeader({ locale }: { locale: Locale }) {
  const { header } = getDictionary(locale).news;

  return (
    <section className="w-full bg-(--color-basic-background)">
      {/* `pb-[25px]` (Phase 13a): mobile header frame (12220:1633) is 214px
          tall against a 25px-shorter content block — the Top News banner
          that now follows needs this reserved, or the two sections collide. */}
      <div className="flex items-start gap-[5px] pr-[15px] pb-[25px] lg:gap-0 lg:px-[32px] lg:py-[68px]">
        <Eyebrow
          label={header.eyebrow}
          tone="dark"
          gutterInset
          className="flex h-[99px] w-[17px] shrink-0 items-center justify-center lg:hidden"
        />
        <Eyebrow
          label={header.eyebrow}
          tone="dark"
          className="hidden h-[112px] w-[27px] shrink-0 items-start justify-center py-[15px] lg:flex lg:translate-y-5"
        />
        <div className="flex min-w-px flex-1 flex-col items-start gap-[20px] pt-[20px] lg:pt-0">
          <h1 className="font-display w-full text-[113px] leading-[79.1px] tracking-[-1.13px] font-bold text-(--color-basic-accent) uppercase">
            {header.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="font-body text-body-l text-(--color-basic-text-primary)">{header.body}</p>
        </div>
      </div>
    </section>
  );
}

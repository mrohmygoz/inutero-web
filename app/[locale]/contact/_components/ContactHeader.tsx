import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Header 12573:8295 (NAV 12573:10519 + Container 12573:10603);
// mobile Header 12220:1997 (NAV 12220:2008 + Title Group 12220:1998 +
// Container 12220:1999). Dark NAV overlays the page (Nav.tsx, `dark` theme is
// `absolute`), so this section reserves the NAV's own height in flow, same
// derivation as ServicesHero (D070).
//
// Desktop keeps the body paragraph in the same column as the heading; mobile
// breaks it into its own block below — same two-shape split as
// NewsHeader/ServicesHero, not a single responsive tree.
export default function ContactHeader({ locale }: { locale: Locale }) {
  const { header } = getDictionary(locale).contact;

  return (
    <section className="w-full bg-(--color-basic-accent) pt-[64px] lg:pt-[138px]">
      <div className="flex items-start gap-[5px] pr-[15px] lg:gap-0 lg:px-[32px] lg:py-[68px] lg:pr-[32px]">
        <Eyebrow
          label={header.eyebrow}
          tone="light"
          gutterInset
          className="flex h-[99px] w-[17px] shrink-0 items-center justify-center lg:hidden"
        />
        <Eyebrow
          label={header.eyebrow}
          tone="light"
          className="hidden h-[134px] w-[27px] shrink-0 items-center justify-center py-[15px] lg:flex"
        />
        <div className="flex min-w-px flex-1 flex-col items-start gap-[20px] pt-[20px] lg:pt-0">
          <h1 className="font-display text-[113px] leading-[79.1px] tracking-[-1.13px] font-bold text-(--color-basic-background) uppercase">
            {header.heading}
          </h1>
          <p className="font-body text-body-l hidden text-(--color-basic-background) lg:block">
            {header.body}
          </p>
        </div>
      </div>

      <div className="max-w-[576px] py-[25px] pr-[16px] pl-[29px] lg:hidden">
        <p className="font-body text-body-l w-[354px] text-(--color-basic-background)">
          {header.body}
        </p>
      </div>
    </section>
  );
}

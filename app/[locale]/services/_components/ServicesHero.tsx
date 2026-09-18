import Image from "next/image";
import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Header 12573:6453 (1440x1334 EN, 1528 TC — the heading grows,
// the frame follows); mobile Header 12220:2611 (EN) / 12368:2817 (TC), with the
// photograph as a sibling rounded-rectangle below it.
//
// Both breakpoints are the same three blocks in the same order — eyebrow+heading
// row, body paragraph, full-bleed photograph — so this is one tree with `lg:`
// overrides, not the two-subtree pattern (D059) the hero's siblings need.
//
// Desktop and mobile share ONE source photograph (verified: both frames resolve
// to the same 1567x1045 raw image), so there is a single asset, not a pair.
export default function ServicesHero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).services;

  return (
    // The dark NAV is `absolute inset-x-0 top-0` — it overlays the page rather
    // than sitting above it, which is right for Home and Our Story because both
    // open on a full-bleed photograph. This header does not: Figma stacks the
    // NAV and the heading block inside one dark Header frame (NAV 138px at
    // desktop, 64px at mobile), so the height it would have occupied is
    // reserved here instead (D070).
    <section className="w-full bg-(--color-basic-accent) pt-[64px] lg:pt-[138px]">
      <div className="flex items-start gap-[5px] pr-[15px] lg:gap-0 lg:px-[32px] lg:py-[68px] lg:pr-[32px]">
        {/* Two instances, not one responsive box: the mobile Tagline Wrapper
            carries the 25px pre-rotation inset (`gutterInset`) and the desktop
            Container does not, and that inset is a boolean with no `lg:` form
            by design (D061). Expressed as one element the label lands ~12px
            off at one breakpoint or the other. */}
        <Eyebrow
          label={hero.eyebrow}
          tone="light"
          gutterInset
          className="flex h-[99px] w-[17px] shrink-0 items-center justify-center lg:hidden"
        />
        <Eyebrow
          label={hero.eyebrow}
          tone="light"
          className="hidden h-[105px] w-[27px] shrink-0 items-start justify-center py-[15px] lg:flex lg:translate-y-8"
        />
        <div className="flex min-w-px flex-1 flex-col items-start gap-[30px] pt-[20px] lg:pt-0">
          <h1
            // Display/H1 at BOTH breakpoints and both locales. The mobile Title
            // Group's token reads "Display/H2" in Figma's export, but that name
            // is resolved in the Desktop English mode, not the mobile one — the
            // frame's own geometry (337px for four lines) is 79.1px of leading,
            // which is Display/H1 in the mobile ramp. `AboutHero`'s locale
            // switch does not apply here (D071).
            className="font-display text-display-h1 w-full text-(--color-basic-background) uppercase"
          >
            {hero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {/* Desktop keeps the body inside the heading column; mobile breaks it
              out into its own padded block below (next sibling). */}
          <p className="font-body text-body-l hidden text-(--color-basic-background) lg:block">
            {hero.body}
          </p>
        </div>
      </div>

      <div className="max-w-[576px] py-[20px] pr-[16px] pl-[20px] lg:hidden">
        {/* The width is pinned at Figma's own 354px text box rather than left
            to fill the block: below ~350px this line wraps to three rather than
            two, which is what the frame draws. The block's padding has since
            been hand-tuned away from Figma's 29/20/25, so the hero now measures
            814px at mobile EN against the frame's 825px. */}
        <p className="font-body text-body-l w-[354px] pt-[16px] text-(--color-basic-background)">
          {hero.body}
        </p>
      </div>

      <div className="relative h-[310px] w-full overflow-hidden lg:h-[690px]">
        <Image
          src="/images/services/services-hero.jpg"
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

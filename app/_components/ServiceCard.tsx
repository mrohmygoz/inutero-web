import Image from "next/image";
import SecondaryCta from "./SecondaryCta";

// Source: desktop symbol 12600:7460 / mobile occurrence "Service" 12220:2696 —
// re-verified against fresh Figma output; the two breakpoints are NOT a plain
// flex-col/flex-row reflow of one shell:
//   - `description` overlays the IMAGE panel at desktop (white text, bottom of
//     the title column via justify-between) but sits BELOW the image, on the
//     dark panel, at mobile — it never appears in both places at once, so this
//     renders as two `hidden`/`lg:hidden` copies rather than one repositioned
//     element (the two live in different flex containers entirely).
//   - Feature rows are side-by-side (fixed 118px title + flex-1 description) at
//     MOBILE and STACKED (full-width title, description below) at desktop. The
//     Phase 3 note claiming both breakpoints were side-by-side was wrong, and
//     survived until Phase 8 gave the card its first real consumer (D069).
//   - Feature row divider: translucent white (`--opacity-white-15`) at mobile,
//     solid white at desktop.
//   - The numbered tag rotates the OPPOSITE direction from the eyebrow tag in
//     `TitleGroup` (`rotate(90deg)` clockwise here, vs. that one's fixed
//     -90deg) — confirmed in both breakpoint exports, so this is a genuine
//     per-instance difference, not a mistake to reconcile by sharing a
//     primitive. Built inline here, reusing the same fixed-size wrapper-box
//     technique (h-[50px] w-[17px], content centered inside) rather than
//     rotating from `transform-origin: top left` directly —
//     rotating without a reserved box shifts the visual footprint outside
//     the element's own flex-allocated space, which the image panel's
//     `overflow-hidden` then clips away entirely (found by inspecting a
//     screenshot where the tag was fully invisible, not just misaligned).
//   - The mobile content overlay has padding on the BOTTOM and RIGHT only
//     (`pb-[20px] pr-[15px]`, no top/left) — the tag+title sit flush at the
//     photo's top-left corner. Desktop keeps uniform `p-8` padding on all
//     sides. Previously this used `p-5` (all sides) uniformly, which inset
//     the content away from the corner at mobile.
//   - The tag's own box top-aligns with the title (both get a `pt-5` offset
//     from the row's top) rather than being vertically centered in its
//     reserved box — Figma gives the pre-rotation tag a `padding-left: 25`
//     that becomes a ~20px top offset once rotated, landing it level with
//     the title's own `padding-top: 20`; centering instead left the tag
//     sitting visibly above the title.
//   - The photo bleeds through the outer wrapper's RIGHT padding at mobile
//     (Figma's photo row is ~378px inside a 393px card with 15px padding on
//     BOTH sides — 393 − 15 ≈ 378, i.e. only the left inset applies). Fixed
//     with `mr-[-15px]` on the photo row, canceling just the right side of
//     the outer wrapper's padding; the content overlay's own `pr-[15px]`
//     still keeps the tag/title text clear of that now-extended edge.
//   - The mobile description/features panel had a stray `p-8` (32px on all
//     sides) that isn't in the mobile spec at all — it added extra
//     horizontal inset beyond the outer wrapper's own 15px, so the
//     description text didn't line up with the tag above it. Mobile now
//     only gets vertical spacing; `p-8` applies at `lg:` only.
//   - The tag+title content is TOP-anchored within the photo at both
//     breakpoints (`align-items: flex-start` in both exports) — previously
//     this used `items-end` on the image container, bottom-anchoring the
//     content and leaving a large empty gap above the title that doesn't
//     exist in the design. Mobile photo height is 227px, not 300px.
//   - The whole card sits inside its OWN inset padding, which is intrinsic to
//     this component (confirmed in both breakpoint exports, not page-section
//     padding a caller adds — corrects the original Phase 2 "no padding"
//     read). Mobile: `px-[15px] py-[30px]` on a wrapper that is ALSO the
//     card's dark background (unifying photo + content into one dark block,
//     photo inset at the top). Desktop: `p-8` (32px) on a transparent
//     wrapper — the photo and dark panel sit side by side inside it, each
//     keeping their own background.
// Shell only: no Services page grid, no accordion open/close behavior.
export type ServiceCardFeature = {
  title: string;
  description: string;
};

export default function ServiceCard({
  index,
  title,
  description,
  features,
  ctaLabel,
  ctaHref,
  image,
  className,
}: {
  index: string;
  title: string;
  description: string;
  features: readonly ServiceCardFeature[];
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <div
      className={`bg-(--color-basic-accent) px-[15px] py-[30px] lg:bg-transparent lg:p-8 ${className ?? ""}`.trim()}
    >
      <div className="flex w-full flex-col items-stretch lg:flex-row">
        <div className="relative mr-[-15px] flex h-[227px] w-[calc(100%+15px)] shrink-0 items-start overflow-hidden lg:mr-0 lg:h-auto lg:w-auto lg:min-h-[520px] lg:flex-1">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
          <div className="relative z-10 flex w-full items-start gap-1 pr-[15px] pb-[20px] lg:h-full lg:p-8">
            <div className="flex h-[50px] w-[17px] shrink-0 items-start justify-center pt-[33px] lg:pt-0">
              <div className="flex rotate-90 items-center gap-[10px] whitespace-nowrap lg:gap-[8px]">
                <span className="size-[6px] shrink-0 bg-(--color-brand-primary-green)" />
                <span className="font-body text-label-m font-normal uppercase text-(--color-basic-background)">
                  {index}
                </span>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 lg:h-full lg:justify-between">
              <p className="font-display text-display-h3 [word-break:break-word] pt-5 font-bold uppercase text-(--color-basic-background) lg:pt-0">
                {title}
              </p>
              <p className="hidden font-body text-[15px] leading-[23.25px] text-(--color-basic-background) lg:block">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start bg-(--color-basic-accent) pt-[46px] lg:w-[656px] lg:shrink-0 lg:p-8">
          <p className="font-body text-body-l text-(--color-basic-background) lg:hidden">{description}</p>
          {/* Mobile: 30px from the description, then the list's own 24px lead-in
              (mobile Container gap-30 + List pt-24). Desktop has no description
              in this panel, so the list starts flush against the p-8. */}
          <div className="mt-[30px] flex w-full flex-col items-stretch gap-4 pt-[24px] lg:mt-0 lg:gap-0 lg:pt-0">
            {features.map((feature) => (
              // Feature rows are side-by-side at MOBILE (fixed 118px title +
              // flex-1 description, 12px gap) and STACKED at desktop (h7 title
              // full-width, description below it with an 8px lead-in). The
              // earlier "side-by-side at both breakpoints" read was wrong —
              // desktop 12573:6500 is a `flex-col` and its screenshot shows the
              // green title on its own line (D069).
              <div
                key={feature.title}
                className="flex items-start gap-3 border-t border-(--opacity-white-15) pt-[10px] lg:flex-col lg:gap-0 lg:border-(--color-basic-background) lg:py-[20px]"
              >
                <p className="font-display text-display-h7 w-[118px] shrink-0 font-bold uppercase text-(--color-brand-primary-green) lg:w-full">
                  {feature.title}
                </p>
                <p className="font-body text-body-xs flex-1 text-(--color-basic-background) lg:w-full lg:flex-none lg:pt-[8px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <SecondaryCta href={ctaHref} tone="light" className="mt-[32px] self-center lg:self-start">
            {ctaLabel}
          </SecondaryCta>
        </div>
      </div>
    </div>
  );
}

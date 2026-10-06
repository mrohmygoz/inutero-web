import Image from "next/image";
import LatinBold from "../../../_components/LatinBold";
import Tag, { type TagColor } from "../../../_components/Tag";

// Source: desktop 12573:7967/7968 (identical layout on both EN and TC — TC's
// override node is empty, so its layout is extrapolated from EN, design.md
// Risks); mobile EN 12211:4017; mobile TC 12368:2637 (same layout as mobile
// EN, longer TC headline). Full-bleed photo, one tag chip, a large headline,
// and a date, over a bottom-anchored dark gradient (from black/80 to
// transparent going up).
//
// Content is entirely config-driven (`featuredSlug`, page.tsx) — none of the
// four frames' own sample text ships (design.md, DECISIONS.md D102).
export default function NewsTopStory({
  href,
  title,
  dateLabel,
  image,
  tag,
}: {
  href: string;
  title: string;
  dateLabel: string;
  image: { src: string; alt: string };
  tag: { label: string; color: TagColor };
}) {
  return (
    <a
      href={href}
      className="relative block h-[369px] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) lg:h-[810px] lg:border-b-[1.572px] lg:border-(--color-basic-border)"
    >
      <Image src={image.src} alt={image.alt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-[7px] bg-gradient-to-t from-black/80 to-transparent p-[20px] lg:gap-0 lg:px-[32px] lg:pt-[20px] lg:pb-[64px]">
        <Tag variant="solid" color={tag.color}>
          {tag.label}
        </Tag>
        {/* Desktop: the tag's own Figma wrapper is 38.25px tall against a
            17px chip — a ~20px gap baked into the wrapper's leftover height,
            not the flex `gap`, which is 0 for this pair at desktop (12573:7971
            metadata: tag wrapper y=20 h=38.25, heading starts at y=58.25). */}
        <p className="font-display text-display-h4 lg:text-display-h3 w-[354px] max-w-full font-bold text-white uppercase lg:mt-[20px] lg:w-full lg:max-w-[1020px]">
          <LatinBold text={title} />
        </p>
        <p className="font-body text-body-s text-white lg:pt-[8px]">{dateLabel}</p>
      </div>
    </a>
  );
}

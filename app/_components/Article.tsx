import Image from "next/image";
import Tag, { type TagColor } from "./Tag";

// Source: mobile occurrence 12220:1670 (News page) / desktop definition
// 12612:7696 — re-verified directly against fresh Figma output, since the two
// breakpoints are NOT just a flex-col/flex-row reflow of identical markup:
//   - Mobile: `border-t` + `pt-21` sit on the OUTERMOST wrapper (around both
//     the text block and the image, stacked column).
//   - Desktop: `border-t` + `pt-21` sit on the TEXT COLUMN specifically (a
//     `self-stretch flex-1` sibling of the image, `align-items: flex-start`
//     on the row) — the divider does NOT run under the image. Getting this
//     wrong (border on the outer row at desktop) stretches the line under
//     the image gap, which is a real, visible difference from Figma.
//   - Desktop additionally wraps the title in its own
//     `items-center justify-center pb-[20px]` block; mobile has no such
//     wrapper (title sits directly in the flex-col, no extra padding).
// Presentational shell only (D-C) — no MDX/route knowledge. The CMS long-form
// article body renderer that pairs with real article content is Phase 4; this
// component is only the title/tag/date/image teaser card.
export default function Article({
  title,
  tag,
  tagColor,
  dateLabel,
  image,
  href,
  className,
}: {
  title: string;
  tag: string;
  tagColor: TagColor;
  dateLabel: string;
  image?: { src: string; alt: string };
  href?: string;
  className?: string;
}) {
  const content = (
    <div
      className={`flex w-full flex-col items-start gap-[15px] lg:flex-row lg:items-start lg:gap-8 ${className ?? ""}`.trim()}
    >
      <div className="flex w-full flex-1 flex-col items-start justify-between gap-3 border-t border-(--opacity-neutral-darkest-15) pt-[21px] lg:self-stretch">
        <div className="flex w-full items-center justify-between">
          <Tag variant="solid" color={tagColor}>
            {tag}
          </Tag>
          <p className="font-body text-label-s font-normal uppercase text-(--opacity-neutral-darkest-40)">
            {dateLabel}
          </p>
        </div>
        <div className="flex w-full flex-col items-start lg:items-center lg:justify-center lg:pb-[20px]">
          <p className="font-display text-display-h5 lg:text-display-h4 w-full [word-break:break-word] font-bold uppercase text-(--color-basic-text-primary)">
            {title}
          </p>
        </div>
      </div>
      <div className="relative h-[309px] w-full shrink-0 overflow-hidden lg:h-[350px] lg:w-[419px]">
        {image ? <Image src={image.src} alt={image.alt} fill className="object-cover" /> : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
      >
        {content}
      </a>
    );
  }

  return content;
}

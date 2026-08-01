import Image from "next/image";
import Tag, { type TagColor } from "./Tag";

// Source: mobile occurrence 12220:1670 (News page — stacked column: tag+date row,
// Display/H5 title, then a full-width image below, border-top divider). Desktop
// definition 12612:7696 (horizontal split: text column flex-1 with border-top on
// the left, fixed 419x350 image on the right, Display/H4 title). No conflict —
// same content model, ordinary responsive reflow: desktop splits side-by-side,
// mobile stacks with the image last (design.md Derived Sources). Added mid-phase
// at the user's direction after a follow-up audit of every repeating visual unit
// in the file — see proposal.md's "Article added mid-phase" note.
//
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
      className={`flex w-full flex-col items-start gap-[15px] border-t border-(--opacity-neutral-darkest-15) pt-[21px] lg:flex-row lg:items-stretch lg:gap-8 ${className ?? ""}`.trim()}
    >
      <div className="flex w-full flex-1 flex-col items-start justify-between gap-3">
        <div className="flex w-full items-center justify-between">
          <Tag variant="solid" color={tagColor}>
            {tag}
          </Tag>
          <p className="font-body text-label-s font-normal uppercase text-(--opacity-neutral-darkest-40)">
            {dateLabel}
          </p>
        </div>
        <p className="font-display text-display-h5 lg:text-display-h4 w-full [word-break:break-word] font-bold uppercase text-(--color-basic-text-primary)">
          {title}
        </p>
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

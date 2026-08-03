import type { ReactNode } from "react";
import Image from "next/image";
import Tag, { type TagColor } from "./Tag";

// Source: mobile symbol 10274:2306 (353px wide, single column). Desktop occurrence
// 12610:6812 (Portfolio grid, 325px wide, 3-up) — same content model and tokens,
// only the fixed width differs per breakpoint (D-E; no style conflict, see design.md
// Derived Sources). Presentational shell only (D-C) — caller supplies content and,
// for a real project image, a `next/image`-compatible src; otherwise a neutral
// placeholder block renders in its place.
export type ProjectCardTag = {
  label: string;
  color: TagColor;
};

export default function ProjectCard({
  title,
  dateLabel,
  description,
  tags,
  image,
  href,
  className,
}: {
  title: string;
  dateLabel: string;
  description: string;
  tags: ProjectCardTag[];
  image?: { src: string; alt: string };
  href?: string;
  className?: string;
}) {
  const content: ReactNode = (
    <div
      className={`inline-flex w-full flex-col items-start gap-[15px] overflow-hidden bg-(--color-basic-accent) px-[10px] py-[13px] outline outline-[0.54px] outline-offset-[-0.54px] outline-(--opacity-white-10) lg:gap-0 lg:p-0 ${className ?? ""}`.trim()}
    >
      {/* The two breakpoints order these three blocks differently, and it is the
          ONLY structural difference between them — so the image is reordered with
          flex `order` rather than shipping two card trees:

            mobile  10274:2306 : tags+title+date -> image -> description
            desktop 12610:6812 : image -> tags+title+date -> description

          Corrected in Phase 6: the card previously used the desktop order at both
          breakpoints, which put the photograph above the tags on mobile. */}

      {/* Image */}
      <div className="relative order-2 h-[445px] w-full shrink-0 bg-(--opacity-white-10) lg:order-1 lg:h-96">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            // The card is `w-full`, so this covers every current occurrence:
            // ~400px at the widest (Home's first desktop card), 353px of a 393px
            // viewport at mobile. Without it next/image warns and ships the
            // full-resolution source.
            sizes="(min-width: 1024px) 400px, 90vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Tags + title + date. On mobile these are one block above the image
          (Frame 27, gap-[10px]); on desktop they sit below it. */}
      <div className="order-1 flex w-full flex-col items-start gap-[10px] lg:order-2 lg:gap-4 lg:px-3 lg:pt-5">
        <div className="flex flex-wrap items-start gap-[5px]">
          {tags.map((tag) => (
            <Tag key={tag.label} variant="solid" color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>

        <div className="flex w-full flex-col items-start">
          <p className="w-full font-['Bodoni_Moda_SC'] text-4xl leading-9 font-bold tracking-tight text-(--primitive-white) uppercase">
            {title}
          </p>
          <p className="line-clamp-1 w-full font-['Chivo_Mono'] text-xs leading-4 font-normal text-(--primitive-white)">
            {dateLabel}
          </p>
        </div>
      </div>

      {/* Description — last at both breakpoints. */}
      <div className="order-3 w-full lg:px-3 lg:pt-2 lg:pb-5">
        <p className="w-full font-['Chivo_Mono'] text-xs leading-5 font-normal text-(--opacity-white-60)">
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)">
        {content}
      </a>
    );
  }

  return content;
}

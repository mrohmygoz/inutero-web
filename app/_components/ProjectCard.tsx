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
      className={`inline-flex w-full flex-col items-start overflow-hidden bg-(--color-basic-accent) outline outline-[0.54px] outline-offset-[-0.54px] outline-(--opacity-white-10) ${className ?? ""}`.trim()}
    >
      {/* Image — full-bleed at top */}
      <div className="relative h-96 w-full shrink-0 bg-(--opacity-white-10)">
        {image ? (
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        ) : null}
      </div>

      {/* Content section */}
      <div className="flex w-full flex-col items-start gap-4 px-3 py-5">
        {/* Tags */}
        <div className="flex flex-wrap items-start gap-[5px]">
          {tags.map((tag) => (
            <Tag key={tag.label} variant="solid" color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>

        {/* Title + date + description */}
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-start">
            <p className="w-full font-['Bodoni_Moda_SC'] text-4xl font-bold uppercase leading-9 tracking-tight text-(--primitive-white)">
              {title}
            </p>
            <p className="w-full font-['Chivo_Mono'] text-xs font-normal leading-4 text-(--primitive-white) line-clamp-1">
              {dateLabel}
            </p>
          </div>
          <div className="w-full pt-2">
            <p className="w-full font-['Chivo_Mono'] text-xs font-normal leading-5 text-(--opacity-white-60)">
              {description}
            </p>
          </div>
        </div>
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

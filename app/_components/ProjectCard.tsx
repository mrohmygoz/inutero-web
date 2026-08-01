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
      className={`flex w-[353px] flex-col items-start gap-[15px] bg-(--color-basic-accent) px-[10px] py-[13px] lg:w-[325px] ${className ?? ""}`.trim()}
    >
      <div className="flex w-full flex-col items-start gap-[10px]">
        <div className="flex flex-wrap items-start gap-[5px]">
          {tags.map((tag) => (
            <Tag key={tag.label} variant="solid" color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>
        <p className="font-style-accent-display font-accent text-accent-display w-full [word-break:break-word] font-bold uppercase text-(--color-basic-background)">
          {title}
        </p>
        <p className="font-body text-body-xs w-full text-(--color-basic-background)">
          {dateLabel}
        </p>
      </div>
      <div className="relative h-[445px] w-full shrink-0 overflow-hidden bg-(--opacity-white-10)">
        {image ? (
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        ) : null}
      </div>
      <p className="font-body text-body-s w-full text-(--opacity-white-60)">
        {description}
      </p>
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

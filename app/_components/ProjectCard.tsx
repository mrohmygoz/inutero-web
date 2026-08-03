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
      className={`inline-flex w-full flex-col items-start gap-[15px] overflow-hidden bg-(--color-basic-accent) px-[10px] py-[13px] outline outline-[0.54px] outline-offset-[-0.54px] outline-(--opacity-white-10) ${className ?? ""}`.trim()}
    >
      {/* ONE order at both breakpoints: tags -> title -> date -> image ->
          description. Mobile `10274:2306` and Home's desktop cards
          (`12210:2404` — tags y=11, title/date y=59, image y=131, description
          y=625) agree; the card is simply larger at 1440px.

          Corrected twice in Phase 6. It first shipped image-first at both
          breakpoints, then briefly image-first at desktop only — both wrong,
          because the "desktop card" both readings used, `12610:6812`, is the
          PORTFOLIO PAGE's card, not Home's. That one really is image-first and
          is a genuinely different design; reconciling it is Phase 10's problem,
          and it will need a variant prop rather than a breakpoint switch. */}

      {/* Tags + title + date — `Frame 27`, gap-[10px]. */}
      <div className="flex w-full flex-col items-start gap-[10px]">
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

      {/* Image. An ASPECT RATIO, not a fixed height: the card's width varies by
          consumer (353px at mobile, ~400/353px across Home's desktop scatter),
          and a fixed height made the box progressively squarer than the frame's
          as the card widened, so `object-cover` cropped the posters — heavily at
          desktop, where 384px against a ~400px card was near-square.

          333/445 is the frame's own box (353px card less its 10px padding,
          445px tall). Posters are 0.71–0.80, so this still crops slightly —
          that is the design's own intent, since Figma fills the box rather than
          fitting to it. */}
      <div className="relative aspect-[333/445] w-full shrink-0 bg-(--opacity-white-10)">
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

      {/* Description */}
      <div className="w-full">
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

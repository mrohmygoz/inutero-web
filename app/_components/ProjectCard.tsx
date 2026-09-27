import type { ReactNode } from "react";
import Image from "next/image";
import Tag, { type TagColor } from "./Tag";

// Two page-level designs behind one component, selected by `variant` — never an
// `lg:` switch, because the split is per-page, not per-breakpoint.
//
//   `home`      mobile symbol 10274:2306, Home's desktop scatter 12210:2404.
//               tags -> title -> date -> image -> description, image inset
//               inside the card's own padding.
//   `portfolio` Portfolio grid card, desktop 12610:6812 / mobile 12219:1187.
//               image -> tags -> title -> date -> description, image full-bleed
//               to the card edge at a fixed height, content in its own padded
//               block below.
//
// The two Portfolio nodes are structurally identical and differ only in the
// width the caller sets (325.33px in the desktop 3-up, 363px at mobile), so the
// portfolio variant is one non-responsive tree.
//
// Phase 10 amended the earlier reading that these differ only in child order.
// They also differ in the card-vs-content padding split and in the image box
// (fixed 352.386px full-bleed vs `aspect-[333/445]` inset). Type deltas between
// them are <=1px and are deliberately not reconciled.
//
// Presentational shell only (D-C) — caller supplies content and, for a real
// project image, a `next/image`-compatible src; otherwise a neutral placeholder
// block renders in its place.
export type ProjectCardTag = {
  label: string;
  color: TagColor;
};

export type ProjectCardVariant = "home" | "portfolio";

export default function ProjectCard({
  title,
  dateLabel,
  description,
  tags,
  image,
  href,
  variant = "home",
  priority = false,
  className,
}: {
  title: string;
  dateLabel: string;
  description: string;
  tags: ProjectCardTag[];
  image?: { src: string; alt: string };
  href?: string;
  variant?: ProjectCardVariant;
  /** Set on the first card of a grid — it is the LCP image. */
  priority?: boolean;
  className?: string;
}) {
  const content: ReactNode =
    variant === "portfolio" ? (
      <PortfolioCard
        title={title}
        dateLabel={dateLabel}
        description={description}
        tags={tags}
        image={image}
        priority={priority}
        className={className}
      />
    ) : (
      <div
        className={`inline-flex w-full flex-col items-start gap-[15px] overflow-hidden bg-(--color-basic-accent) px-[10px] py-[13px] outline outline-[0.54px] outline-offset-[-0.54px] outline-(--opacity-white-10) ${className ?? ""}`.trim()}
      >
        {/* ONE order at both breakpoints: tags -> title -> date -> image ->
          description. Mobile `10274:2306` and Home's desktop cards
          (`12210:2404` — tags y=11, title/date y=59, image y=131, description
          y=625) agree; the card is simply larger at 1440px. */}

        {/* Tags + title + date — `Frame 27`. The frame's own gap is 10px; the
          14px/24px here and the date's `mt-2` are the user's hand-tuning, kept
          across the restructure rather than reverted to the drawn values. */}
        <div className="flex w-full flex-col items-start gap-[14px] lg:gap-6">
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
            <p className="mt-2 line-clamp-1 w-full font-['Chivo_Mono'] text-xs leading-4 font-normal text-(--primitive-white)">
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
      <a
        href={href}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
      >
        {content}
      </a>
    );
  }

  return content;
}

// Desktop 12610:6812 / mobile 12219:1187 — identical trees, so no `lg:` here.
// The card is `w-full`; the caller sets the width, as with the home variant.
function PortfolioCard({
  title,
  dateLabel,
  description,
  tags,
  image,
  priority,
  className,
}: {
  title: string;
  dateLabel: string;
  description: string;
  tags: ProjectCardTag[];
  image?: { src: string; alt: string };
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-start overflow-clip border-[0.542px] border-(--opacity-white-10) bg-(--color-basic-accent) p-[0.542px] ${className ?? ""}`.trim()}
    >
      {/* A FIXED height, not an aspect ratio — unlike the home variant. The
          frame draws 352.386px on both the 325.33px desktop card and the 363px
          mobile one, so the box does not scale with the card's width. */}
      <div className="relative h-[352.386px] w-full shrink-0 bg-(--opacity-white-10)">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 326px, 90vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex w-full flex-col items-start gap-[16px] px-[12px] py-[20px]">
        <div className="flex flex-wrap items-start gap-[5px]">
          {tags.map((tag) => (
            <Tag key={tag.label} variant="solid" color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>

        <div className="flex w-full flex-col items-start">
          <p className="font-accent text-accent-display w-full text-(--color-basic-background) uppercase">
            {title}
          </p>
          <p className="font-body text-body-xs w-full truncate text-(--color-basic-background)">
            {dateLabel}
          </p>
          {/* The description's own 8px lead-in, inside the block rather than a
              gap — the frame nests it in a `Paragraph` with `pt-[8px]`. */}
          <p className="font-body text-body-s w-full pt-[8px] text-(--opacity-white-60)">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

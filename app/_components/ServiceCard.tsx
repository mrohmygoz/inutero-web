import Image from "next/image";
import TaglineWrapper from "./TaglineWrapper";
import SecondaryCta from "./SecondaryCta";

// Source: desktop symbol 12600:7460 (1440×647 — a full-bleed band, not a card; D-C
// scope boundary). Mobile occurrence "Service" 12220:2696 has the same content model
// (numbered tagline + title over an image, description, feature list, Secondary CTA)
// but stacks instead of splitting side-by-side — ordinary responsive reflow of one
// shell, not two designs (design.md Derived Sources). Shell only: no Services page
// grid, no accordion open/close behavior, no section-level padding (D-C).
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
    <div className={`flex w-full flex-col items-stretch lg:flex-row ${className ?? ""}`.trim()}>
      <div className="relative flex h-[300px] w-full shrink-0 items-end overflow-hidden lg:h-auto lg:min-h-[520px] lg:flex-1">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        <div className="relative z-10 flex w-full items-start gap-4 p-5 pb-7 lg:p-8">
          <TaglineWrapper label={index} tone="light" />
          <p className="font-display text-display-h3 min-w-0 flex-1 [word-break:break-word] pt-5 font-bold uppercase text-(--color-basic-background)">
            {title}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-8 bg-(--color-basic-accent) p-8 lg:w-[656px] lg:shrink-0">
        <p className="font-body text-body-l text-(--color-basic-background)">{description}</p>
        <div className="flex w-full flex-col items-stretch">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 border-t border-(--opacity-white-15) py-[11px] lg:flex-row"
            >
              <p className="font-display text-display-h7 w-[118px] shrink-0 font-bold uppercase text-(--color-brand-primary-green)">
                {feature.title}
              </p>
              <p className="font-body text-body-xs flex-1 text-(--color-basic-background)">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <SecondaryCta href={ctaHref} tone="light" className="self-center">
          {ctaLabel}
        </SecondaryCta>
      </div>
    </div>
  );
}

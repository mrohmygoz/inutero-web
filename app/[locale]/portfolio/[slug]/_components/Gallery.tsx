import Image from "next/image";

// Source: desktop `Section` 12573:7443 / `Container` 12573:7449, mobile `Section`
// 12368:2568 (TC instances share the same layout — text override only, per
// design-inventory.md's "instances of the EN symbols" note). Both frames draw a
// fixed 4-image sample whose combined width exceeds the section's own container
// (desktop: four 912–913px cards + 16px gaps inside a 1440px section; mobile: four
// 314px cards + 6px gaps inside a 393px section) — a horizontal scroller, not a
// fixed grid, per design.md's open-ended-count decision.
export default function Gallery({
  images,
  label,
}: {
  images: { src: string; alt: string }[];
  label: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="border-b border-(--color-basic-border) px-5 pt-6 pb-10 lg:px-8 lg:pt-5 lg:pb-8">
      <div className="mb-[17px] flex items-center gap-2 lg:mb-[40px]">
        <div aria-hidden className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
        <p className="font-body text-label-m text-(--color-basic-text-primary) uppercase">
          {label}
        </p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto lg:gap-4">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="relative aspect-square w-[314px] shrink-0 lg:aspect-[912/668] lg:w-[912px]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 912px, 314px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

// Source: desktop symbol 12592:6786 (320×550). Mobile occurrence 12220:1114
// (176.5×403, 2-up grid on Featured Artists) — same structure at a smaller fixed
// width, no style conflict (design.md Derived Sources). Presentational shell only
// (D-C): caller supplies image, copy, and social links; no platform knowledge baked
// in — Figma names every social icon "Link" generically, so this component does too.
export type ArtistCardSocialLink = {
  href: string;
  iconSrc: string;
  label: string;
};

export default function ArtistCard({
  name,
  genre,
  bio,
  image,
  socialLinks,
  className,
}: {
  name: string;
  genre: string;
  bio: string;
  image: { src: string; alt: string };
  socialLinks: ArtistCardSocialLink[];
  className?: string;
}) {
  return (
    <div className={`flex w-[320px] flex-col items-start gap-[10px] ${className ?? ""}`.trim()}>
      <div className="relative h-[363px] w-full shrink-0">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-1 flex-col items-start justify-between gap-6">
        <div className="flex w-full flex-col items-start gap-[6px]">
          <p className="font-display text-display-h5 w-full [word-break:break-word] font-bold uppercase text-(--color-basic-border)">
            {name}
          </p>
          <p className="font-body text-label-m font-normal uppercase text-(--color-brand-primary-green)">
            {genre}
          </p>
          <p className="font-body text-body-xs h-[65px] w-full overflow-hidden text-(--color-basic-border)">
            {bio}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="flex size-8 items-center justify-center border-[0.5px] border-(--opacity-neutral-darkest-20) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
            >
              <span className="relative block size-[17px]">
                <Image src={link.iconSrc} alt="" fill className="object-contain" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

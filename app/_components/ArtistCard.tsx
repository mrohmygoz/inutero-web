import Image from "next/image";

// Source: desktop symbol 12592:6786 (320×550) / mobile occurrence 12220:1114 —
// re-verified against fresh Figma output; this is a genuinely responsive card,
// not one fixed layout used at both sizes (the previous version was hardcoded
// to the desktop's 320×550 dimensions unconditionally):
//   - Card: fixed 320×550 at desktop; fills its grid cell (w-full, no fixed
//     height) at mobile.
//   - Image: 363px tall at desktop, 193px at mobile.
//   - Content block: auto-height at both breakpoints (Phase 12 amendment —
//     was `flex-1`/fixed-200px against Figma's short Lorem-ipsum sample;
//     real bios are longer and full-length, unclamped, per user decision, so
//     the block now grows with its content instead of a fixed box).
//   - Name/genre/bio gap: 6px at desktop, 4px at mobile. Genre also carries
//     its own `pt-[4px]` at both breakpoints, on top of that gap.
//   - Bio: solid `--color-basic-border` at desktop; translucent
//     `--opacity-neutral-darkest-60` at mobile. **Unclamped at both
//     breakpoints** (Phase 12 — shows the full bio, never truncated).
//   - Social link border: solid `--color-basic-border` at desktop;
//     translucent `--opacity-neutral-darkest-20` at mobile.
// Presentational shell only (D-C): caller supplies image, copy, and social
// links; no platform knowledge baked in — Figma names every social icon
// "Link" generically, so this component does too.
//
// `image` is optional (Phase 12) — 4 of the 8 real artists have no photo
// resolvable from the Figma file. A neutral placeholder block renders in its
// place, the same fallback `ProjectCard` uses for a missing project poster —
// but tinted `--opacity-neutral-darkest-10`, not `ProjectCard`'s
// `--opacity-white-10`: this card's only page (Artists) has a light surface,
// where a white-on-white tint would be invisible.
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
  image?: { src: string; alt: string };
  socialLinks: ArtistCardSocialLink[];
  className?: string;
}) {
  return (
    <div className={`flex w-full flex-col items-start gap-[10px] lg:w-[320px] ${className ?? ""}`.trim()}>
      <div className="relative h-[193px] w-full shrink-0 bg-(--opacity-neutral-darkest-10) lg:h-[363px]">
        {image ? <Image src={image.src} alt={image.alt} fill className="object-cover" /> : null}
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-[16px] lg:flex-1">
        <div className="flex w-full flex-col items-start gap-[4px] lg:gap-[6px]">
          <p className="font-display text-display-h5 w-full [word-break:break-word] font-bold uppercase text-(--color-basic-border)">
            {name}
          </p>
          <p className="font-body text-label-m pt-1 font-normal uppercase text-(--color-brand-primary-green)">
            {genre}
          </p>
          <p className="font-body text-body-xs w-full text-(--opacity-neutral-darkest-60) lg:text-(--color-basic-border)">
            {bio}
          </p>
        </div>
        <div className="flex w-full items-center justify-start gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="flex size-8 items-center justify-center border-[0.5px] border-(--opacity-neutral-darkest-20) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) lg:border-(--color-basic-border)"
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

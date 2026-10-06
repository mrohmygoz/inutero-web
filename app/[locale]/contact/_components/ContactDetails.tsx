import { socialPlatforms } from "../../../_lib/socialPlatforms";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:8313 (Container 12573:8314, right-aligned at
// 688.15px within the 1440px frame); mobile Section 12212:5296 (Sidebar
// 12212:5298, full-width within a 576px-capped, 20px-padded Container).
//
// Both breakpoints stack the same four department rows (label + `mailto:`)
// then "Follow us" — one tree with `lg:` overrides, not two subtrees. The one
// real breakpoint difference: mobile's row dividers and "Follow us" label
// render at reduced white opacity (15%/40%) where desktop uses solid white —
// confirmed per-node in the fetched frames, not a rounding artifact.
//
// No inert contact form and no NewsletterSignup band here — neither exists in
// this Figma node at any of the four fetched frames (see ContactHeader's
// sibling `page.tsx` and DECISIONS.md for the corrected scope). The global
// Footer that follows this section already carries its own newsletter block.
export default function ContactDetails({ locale }: { locale: Locale }) {
  const { departments, followUs } = getDictionary(locale).contact;

  return (
    <section className="w-full bg-(--color-basic-accent)">
      <div className="flex flex-col items-end px-[20px] pb-[32px] lg:px-[32px] lg:pb-[64px]">
        <div className="w-full lg:max-w-[688px]">
          {departments.map((department) => (
            <div
              key={department.email}
              className="flex flex-col gap-[8px] border-t border-(--opacity-white-15) pt-[20px] pb-[12px] lg:border-(--color-basic-background)"
            >
              <p className="font-display text-display-h5 font-bold text-(--color-basic-background) uppercase">
                {department.label}
              </p>
              <a
                href={`mailto:${department.email}`}
                className="font-body text-body-m text-(--color-brand-primary-green) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
              >
                {department.email}
              </a>
            </div>
          ))}

          <div className="flex flex-col gap-[24px] border-t border-(--opacity-white-15) pt-[24px] lg:border-(--color-basic-background)">
            <p className="font-body text-label-m text-(--opacity-white-40) uppercase lg:text-(--color-basic-background)">
              {followUs}
            </p>
            <div className="flex items-center gap-[32px]">
              {socialPlatforms.map(({ key: platform, icon, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="relative block size-[37px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
                >
                  <span
                    className="absolute inset-0 bg-(--color-brand-primary-green)"
                    style={{
                      maskImage: `url(${icon})`,
                      WebkitMaskImage: `url(${icon})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

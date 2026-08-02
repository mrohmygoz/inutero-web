import type { Locale } from "../_lib/i18n";
import { getDictionary } from "../_lib/i18n";
import { localizedHref, routes, type RouteKey } from "../_lib/routes";
import Logo from "./Logo";

// Source: desktop Footer Default 12573:9181 / TC 12635:16558; mobile
// 12384:4852 (carries both Default/TC in one node — same content both
// breakpoints, but the LAYOUT genuinely differs, re-verified against fresh
// Figma output rather than assumed:
//   - Outer padding: mobile px-[10px] py-[20px]; desktop px-[64px] py-[64px]
//     (not the site's usual --spacing-page-padding token at mobile — Figma's
//     footer uses its own smaller horizontal value).
//   - Logo: centered on mobile (`items-center` column); left-aligned on
//     desktop (plain block, no centering).
//   - Vertical rhythm: mobile groups Services+In-Utero with a 20px gap
//     between them, then a LARGER 48px gap before the Newsletter block;
//     desktop flattens all three into one row with a uniform 32px gap.
//   - Newsletter label + email placeholder: centered on mobile (confirmed
//     twice in the Figma export); left-aligned on desktop (visual
//     correction from the user, overriding a stray text-align:center left
//     in desktop's own generated snippet).
//
// Three content groups (design.md Derived Sources): a Services sub-links
// column (not in routes.md — all four link to the whole /services route per
// D-G, since no in-page anchors exist until Phase 8/9 builds that page), an
// "In Utero" page-links column (routes.ts labels), and a static newsletter
// block (no submit handler — NewsletterSignup is Phase 4). Legal links
// (Privacy Policy / Terms of Service / Cookies Settings) render as inert
// text per D-G — no page exists for any of them yet.
const footerPageRoutes: RouteKey[] = ["about", "portfolio", "artists", "news", "contact"];

const serviceLabelKeys = [
  "artistManagement",
  "internationalTourPlanning",
  "prMarketing",
  "eventProduction",
] as const;

const legalKeys = ["privacyPolicy", "termsOfService", "cookiesSettings"] as const;

const socialPlatforms = ["facebook", "instagram", "x", "youtube"] as const;

function VerticalLabel({ children }: { children: string }) {
  return (
    <div className="flex w-[21px] shrink-0 items-center justify-center py-[10px]">
      <span className="font-body text-label-m w-[73px] rotate-90 text-center whitespace-nowrap text-(--color-brand-primary-green) uppercase translate-y-6 lg:translate-y-1">
        {children}
      </span>
    </div>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.footer;

  return (
    <footer className="w-full">
      <div className="bg-(--color-basic-background) px-[10px] py-[20px] lg:px-8 lg:py-16">
        <div className="flex justify-center py-[30px] lg:justify-start">
          <Logo className="aspect-[115/107] h-[107px] text-(--color-brand-primary-green)" />
        </div>
        <div className="flex flex-col gap-[48px] lg:flex-row lg:gap-8 lg:items-start">
          <div className="flex flex-col gap-[20px] lg:contents">
            <div className="flex items-start gap-4 lg:flex-1">
              <VerticalLabel>{f.servicesHeading}</VerticalLabel>
              <div className="flex flex-1 flex-col">
                {serviceLabelKeys.map((key, i) => (
                  <a
                    key={key}
                    href={localizedHref("services", locale)}
                    className={`font-display text-display-h5 border-(--color-basic-accent) py-2 font-bold text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${i < serviceLabelKeys.length - 1 ? "border-b" : ""}`}
                  >
                    {f[key]}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 lg:flex-1">
              <VerticalLabel>{f.pagesHeading}</VerticalLabel>
              <div className="flex flex-1 flex-col">
                {footerPageRoutes.map((key, i) => {
                  const route = routes.find((r) => r.key === key)!;
                  return (
                    <a
                      key={key}
                      href={localizedHref(key, locale)}
                      className={`font-display text-display-h5 border-(--color-basic-accent) py-2 font-bold text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${i < footerPageRoutes.length - 1 ? "border-b" : ""}`}
                    >
                      {route.label[locale]}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:pt-10">
            <p className="font-body text-label-m text-center text-(--color-brand-primary-green) uppercase lg:text-left">
              {f.newsletterLabel}
            </p>
            {/* Not a <form>: there is no newsletter endpoint, and a <form> with no
                action GETs the current URL and visibly reloads the page. Inert markup
                instead, matching NewsletterSignup (D-F) and the same reasoning D022
                applied to the legal links below. The Footer block stays its own design —
                the Phase 4 survey confirmed it is not the NewsletterSignup component. */}
            <div className="flex flex-col gap-7">
              <label className="border-b border-(--color-basic-accent) py-3">
                <span className="sr-only">{f.newsletterPlaceholder}</span>
                <input
                  type="email"
                  placeholder={f.newsletterPlaceholder}
                  className="w-full bg-transparent text-center font-body text-body-s text-(--color-basic-text-secondary) outline-none lg:text-left"
                />
              </label>
              <button
                type="button"
                className="bg-(--color-brand-primary-green) py-[17px] font-body text-label-m text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
              >
                {f.newsletterCta}
              </button>
            </div>
            <p className="font-body text-body-s text-(--color-basic-text-secondary)">
              {f.newsletterDisclaimer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 bg-(--color-basic-accent) px-5 py-10 lg:flex-row lg:justify-between lg:px-8">
        <div className="flex gap-8">
          {socialPlatforms.map((platform) => (
            <a
              key={platform}
              href="#"
              aria-label={platform}
              className="relative block size-[37px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
            >
              <span
                className="absolute inset-0 bg-(--color-brand-primary-green)"
                style={{
                  maskImage: `url(/icons/social-brand/${platform}.svg)`,
                  WebkitMaskImage: `url(/icons/social-brand/${platform}.svg)`,
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

        <div className="flex flex-col items-center gap-6 lg:flex-row">
          {legalKeys.map((key) => (
            <span
              key={key}
              className="border-b border-(--color-brand-primary-green) font-body text-label-m text-(--color-brand-primary-green) uppercase"
            >
              {f[key]}
            </span>
          ))}
        </div>

        <p className="font-body text-body-s text-(--opacity-white-60)">{f.copyright}</p>
      </div>
    </footer>
  );
}

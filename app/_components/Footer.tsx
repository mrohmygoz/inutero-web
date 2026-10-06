"use client";

import type { Locale } from "../_lib/i18n";
import { getDictionary } from "../_lib/i18n";
import {
  localizedHref,
  routes,
  serviceAnchorHref,
  serviceAnchors,
  type RouteKey,
} from "../_lib/routes";
import { socialPlatforms } from "../_lib/socialPlatforms";
import EmailSignupSuccessModal from "./EmailSignupSuccessModal";
import Logo from "./Logo";
import { useNewsletterSignup } from "./useNewsletterSignup";

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

// Labels and anchor targets both come from `serviceAnchors` so they cannot
// drift from the four sections `ServicesList` renders (D-D). Phase 9 repointed
// these from the whole /services route, which is what D-G left them at while
// the page had no sections to link into.

const legalKeys = ["privacyPolicy", "termsOfService", "cookiesSettings"] as const;

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

  const { email, setEmail, invalid, success, handleSubmit, handleDismiss } =
    useNewsletterSignup();

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
                {serviceAnchors.map(({ labelKey, id }, i) => (
                  <a
                    key={labelKey}
                    href={serviceAnchorHref(id, locale)}
                    className={`font-display text-display-h5 border-(--color-basic-accent) py-2 font-bold text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${i < serviceAnchors.length - 1 ? "border-b" : ""}`}
                  >
                    {f[labelKey]}
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
            {/* Not a <form>: a <form> with no action GETs the current URL and visibly
                reloads the page. Submission goes through useNewsletterSignup() ->
                POST /api/newsletter instead — same hook NewsletterSignup.tsx uses; the
                Footer block stays its own design (Phase 4 survey). */}
            <div className="flex flex-col gap-7">
              <label
                className={`border-b py-3 ${
                  invalid ? "border-(--color-brand-accent-orange)" : "border-(--color-basic-accent)"
                }`}
              >
                <span className="sr-only">{f.newsletterPlaceholder}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={f.newsletterPlaceholder}
                  className={`w-full bg-transparent text-center font-body text-body-s outline-none lg:text-left ${
                    invalid
                      ? "text-(--color-brand-accent-orange) placeholder:text-(--color-brand-accent-orange)"
                      : "text-(--color-basic-text-secondary)"
                  }`}
                />
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer bg-(--color-brand-primary-green) py-[17px] font-body text-label-m text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
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

      <EmailSignupSuccessModal locale={locale} open={success} onClose={handleDismiss} />
    </footer>
  );
}

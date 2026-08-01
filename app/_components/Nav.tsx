"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../_lib/i18n";
import { localizedHref, routes, swapLocale, type RouteKey } from "../_lib/routes";
import Logo from "./Logo";

// Source: Desktop NAV 12653:5366 (light) / Desktop NAV/DARK 12653:5259 (dark),
// EN 12573:10177/12573:10140, CN 12653:5367/12653:5260. Mobile NAV 12219:1100
// carries both Light/Dark as a real component property. Expanded/menu overlay:
// mobile 10270:2118 (EN) / 12368:2386 (TC); the desktop expanded frame
// (12612:8541) is a stray documentation duplicate with no real trigger in the
// compact desktop bar — not built (see design.md Derived Sources).
//
// theme is a static per-page prop (D-A) — no scroll-driven switching. Client
// component (D-C) for the locale switcher and mobile menu state; nav collapses
// to the mobile menu below 1024px (D-E).
export type NavTheme = "light" | "dark";

const navRoutes: RouteKey[] = ["about", "services", "portfolio", "artists", "news", "contact"];

const themeClassName: Record<NavTheme, { border: string; text: string; localePill: string }> = {
  light: {
    border: "border-(--color-basic-accent)",
    text: "text-(--color-basic-accent)",
    localePill: "bg-(--color-basic-accent) text-(--color-basic-background)",
  },
  dark: {
    border: "border-(--color-basic-background)",
    text: "text-(--color-basic-background)",
    localePill: "bg-(--color-basic-background) text-(--color-basic-accent)",
  },
};

export default function Nav({ locale, theme = "light" }: { locale: Locale; theme?: NavTheme }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const otherLocaleLabel = locale === "en" ? "繁中" : "EN";
  const closeLabel = locale === "en" ? "Close" : "返回";
  const tone = themeClassName[theme];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <div
        className={`flex items-center justify-between border-b-[0.542px] px-3 py-[10px] lg:justify-start lg:border-b-0 lg:px-8 lg:pt-[30px] lg:pb-[10px] ${tone.border}`}
      >
        <a href={localizedHref("home", locale)} aria-label="In Utero" className="block shrink-0">
          <Logo className={`aspect-[97/89] h-12 lg:h-[89px] ${tone.text}`} />
        </a>

        {/* Desktop only. The pt-10/pb-48 wrapper reproduces the exact Figma
            vertical rhythm (12653:5366) — it's what makes the links row's
            border-bottom cross through the logo mark rather than sit below
            it, since this whole group is centered against the 89px-tall logo
            box but is itself taller once its own padding is included. */}
        <div className="hidden flex-1 items-center justify-end gap-[23px] pt-[10px] pb-[48px] lg:flex">
          <nav
            aria-label="Primary"
            className={`flex flex-1 items-end justify-end gap-6 border-b-3 pr-[13px] pb-[6px] pl-[13px] ${tone.border}`}
          >
            {navRoutes.map((key) => {
              const route = routes.find((r) => r.key === key)!;
              return (
                <a
                  key={key}
                  href={localizedHref(key, locale)}
                  className={`font-display text-display-h6 py-[6px] font-bold whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${tone.text}`}
                >
                  {route.label[locale]}
                </a>
              );
            })}
          </nav>
          <a
            href={swapLocale(pathname, otherLocale)}
            className={`inline-flex shrink-0 self-stretch items-center justify-center px-[11px] font-body text-label-m uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${tone.localePill}`}
          >
            {otherLocaleLabel}
          </a>
        </div>

        {/* Mobile only — outline-style locale pill (matches mobile NAV
            12219:1100, not the desktop solid-fill pill) + menu trigger. */}
        <div className="flex items-stretch gap-2 lg:hidden">
          <a
            href={swapLocale(pathname, otherLocale)}
            className={`inline-flex items-center justify-center border-[0.542px] px-[12.5px] font-body text-label-m uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${tone.border} ${tone.text}`}
          >
            {otherLocaleLabel}
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-[33px] items-center justify-center bg-(--color-brand-accent-neon) px-5 py-[9px] font-body text-label-m font-normal text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
          >
            {menuOpen ? closeLabel : "menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="nav-mobile-menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-(--color-brand-primary-green) lg:hidden"
        >
          <div className="flex items-center justify-end px-3 pt-[26px]">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center bg-(--color-basic-background) px-5 py-[9px] font-body text-label-m text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
            >
              {closeLabel}
            </button>
          </div>

          <Logo className="mx-auto mt-8 aspect-[97/89] h-[115px] shrink-0 text-(--color-basic-background)" />

          <nav aria-label="Mobile" className="flex flex-1 flex-col items-center pt-6">
            <a
              href={localizedHref("home", locale)}
              onClick={() => setMenuOpen(false)}
              className="font-display w-full border-b border-(--color-basic-background) px-[13px] py-[6px] text-center text-[54px] leading-[0.7] font-bold tracking-[-0.54px] text-(--color-basic-accent) italic uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
            >
              {locale === "en" ? "Home" : "首頁"}
            </a>
            {navRoutes.map((key) => {
              const route = routes.find((r) => r.key === key)!;
              return (
                <a
                  key={key}
                  href={localizedHref(key, locale)}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-display-h3 w-full border-b border-(--color-basic-background) px-[13px] py-[6px] text-center font-bold text-(--color-basic-background) uppercase last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
                >
                  {route.label[locale]}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col items-center gap-6 py-8">
            <div className="flex gap-8">
              {(["facebook", "instagram", "x", "youtube"] as const).map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  className="relative block size-[37px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
                >
                  <span
                    className="absolute inset-0 bg-(--color-basic-accent)"
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
            <a
              href={swapLocale(pathname, otherLocale)}
              className="w-full bg-(--color-basic-accent) py-[15px] text-center font-body text-body-l text-(--color-basic-background)"
            >
              {locale === "en" ? "繁體中文" : "English"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../_lib/i18n";
import { localizedHref, routes, swapLocale, type RouteKey } from "../_lib/routes";
import Logo from "./Logo";
import LogoMark from "./LogoMark";

// Source: Desktop NAV 12653:5366 (light) / Desktop NAV/DARK 12653:5259 (dark),
// EN 12573:10177/12573:10140, CN 12653:5367/12653:5260. Mobile NAV 12219:1100
// carries both Light/Dark as a real component property (light symbol
// 12212:6237). Expanded/menu overlay: mobile 10270:2118 (EN) / 12368:2386 (TC);
// the desktop expanded frame (12612:8541) is a stray documentation duplicate
// with no real trigger in the compact desktop bar — not built (see design.md
// Derived Sources).
//
// The two breakpoints use *different logo lockups*, which is deliberate in the
// design, not drift: desktop is the 97x89 `Logo` including the "IN UTERO"
// wordmark; mobile is the 48x48 square `LogoMark` (wordmark-less seal) paired
// with a 225px rule that runs off the left edge through the mark.
//
// theme is a static per-page prop (D-A) — no scroll-driven switching. Client
// component (D-C) for the locale switcher and mobile menu state; nav collapses
// to the mobile menu below 1024px (D-E).
export type NavTheme = "light" | "dark";

const navRoutes: RouteKey[] = ["about", "services", "portfolio", "artists", "news", "contact"];

const themeClassName: Record<
  NavTheme,
  { border: string; text: string; mark: string; localePill: string; localeOutline: string }
> = {
  light: {
    border: "border-(--color-basic-accent)",
    text: "text-(--color-basic-accent)",
    // Mobile light: mark + rule are brand green, not black (12212:6237).
    mark: "text-(--color-brand-primary-green)",
    localePill: "bg-(--color-basic-accent) border-(--color-basic-accent) text-(--color-basic-background)",
    localeOutline: "border-(--opacity-neutral-darkest-20) text-(--color-basic-accent)",
  },
  dark: {
    border: "border-(--color-basic-background)",
    text: "text-(--color-basic-background)",
    mark: "text-(--color-basic-background)",
    localePill: "bg-(--color-basic-background) border-(--color-basic-background) text-(--color-basic-accent)",
    localeOutline: "border-(--color-basic-background) text-(--color-basic-background)",
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
      {/* Mobile bar is a fixed 64px row (12212:6237); desktop drops the bottom
          hairline and grows to fit the 89px logo box. */}
      <div
        className={`relative flex h-16 items-center justify-between border-b-[0.542px] px-3 lg:h-auto lg:justify-start lg:border-b-0 lg:px-8 lg:pt-[30px] lg:pb-[10px] ${tone.border}`}
      >
        <a
          href={localizedHref("home", locale)}
          aria-label="In Utero"
          className="relative z-10 block shrink-0 lg:-mr-[10px]"
        >
          <LogoMark className={`size-12 lg:hidden ${tone.mark}`} />
          <Logo className={`hidden aspect-[97/89] h-[89px] lg:block ${tone.text}`} />
        </a>

        {/* Mobile rule (Line 1, 12563:4300): crosses the mark at y=31 and runs
            flush off the left edge. Figma draws it to a fixed 225px; here it's
            a flex item that grows to meet the locale pill instead, so the bar
            stays balanced at widths other than the designed 393px. It sits
            after the mark in source order and the negative left margin (48px
            mark + the 12px px-3 gutter) pulls it back under the mark to x=0. */}
        <span
          aria-hidden
          className={`pointer-events-none relative mt-[31px] mr-8 -ml-[60px] h-[2px] flex-1 self-start bg-current lg:hidden ${tone.mark}`}
        />

        {/* Desktop only. The pt-10/pb-48 wrapper reproduces the exact Figma
            vertical rhythm (12653:5366) — it's what makes the links row's
            border-bottom cross through the logo mark rather than sit below
            it, since this whole group is centered against the 89px-tall logo
            box but is itself taller once its own padding is included. */}
        <div className="hidden flex-1 items-center justify-end gap-[23px] pt-[10px] pb-[48px] lg:flex">
          <nav
            aria-label="Primary"
            className={`flex flex-1 items-end justify-end gap-6 border-b-3 px-[13px] pb-[6px] ${tone.border}`}
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
            className={`font-body text-body-l inline-flex shrink-0 items-center justify-center border px-[11px] py-[7px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${tone.localePill}`}
          >
            {otherLocaleLabel}
          </a>
        </div>

        {/* Mobile only — outline-style locale pill (matches mobile NAV
            12219:1100, not the desktop solid-fill pill) + menu trigger.
            Both sit in a 33px-tall row ending 12px from the right edge. */}
        <div className="relative z-10 flex h-[33px] items-stretch gap-2 lg:hidden">
          <a
            href={swapLocale(pathname, otherLocale)}
            className={`font-body text-label-m inline-flex items-center justify-center border-[0.542px] px-[12.542px] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${tone.localeOutline}`}
          >
            {otherLocaleLabel}
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="font-body text-label-m inline-flex items-center justify-center bg-(--color-brand-accent-neon) px-5 font-normal text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
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
          {/* CLOSE is flush to the right edge in both locales — no gutter
              (10270:2154 ends at x=393.8, 12368:2402 at x=393). */}
          <div className="flex shrink-0 justify-end pt-[25.81px]">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setMenuOpen(false)}
              className="font-body text-label-m inline-flex items-center justify-center bg-(--color-basic-background) px-5 py-[9px] text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
            >
              {closeLabel}
            </button>
          </div>

          <LogoMark className="mx-auto mt-[10.19px] size-[115px] shrink-0 text-(--color-basic-background)" />

          <nav aria-label="Mobile" className="mt-[56px] flex flex-col">
            <a
              href={localizedHref("home", locale)}
              onClick={() => setMenuOpen(false)}
              className={`font-display w-full border-b border-(--color-basic-background) px-[13px] py-[6px] text-center font-bold text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                locale === "en"
                  ? "text-[81px] leading-[0.7] tracking-[-0.81px] italic"
                  : "text-display-h3"
              }`}
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

          <div className="mt-auto shrink-0">
            <div className="flex h-[72px] items-center justify-center gap-8">
              {(["facebook", "instagram", "x", "youtube"] as const).map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  className="relative block size-[37.4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
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
              className="font-body text-body-l mt-[2px] block w-full bg-(--color-basic-accent) py-[15px] text-center text-(--color-basic-background)"
            >
              {locale === "en" ? "繁體中文" : "English"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

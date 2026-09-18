"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../_lib/i18n";
import {
  localizedHref,
  navThemeForPath,
  routes,
  swapLocale,
  type RouteKey,
} from "../_lib/routes";
import Logo from "./Logo";
import LogoMark from "./LogoMark";

// Figma: desktop NAV 12653:5366 / DARK 12653:5259, mobile NAV 12219:1100,
// menu overlay 10270:2118 (EN) / 12368:2386 (TC). Desktop 12612:8541 is a stray
// duplicate with no trigger — not built (design.md Derived Sources).
// The differing desktop/mobile logo lockups are deliberate, not drift.
export type NavTheme = "light" | "dark";

const navRoutes: RouteKey[] = ["about", "services", "portfolio", "artists", "news", "contact"];

// Affine ramps through (553dvh -> min, 838dvh -> max): the menu's natural height
// down to an iPhone SE's usable height. Measurements, not tokens — see D063.
// ZH needs no font ramp; its 38px box already fits at the floor.
const MENU_LINK_PADDING_Y = "clamp(3px, 1.05dvh - 2.8px, 6px)";
const MENU_LINK_FONT_SIZE_EN = "clamp(65.4px, 4.4dvh + 41.1px, 78px)";
// `--text-display-h3--line-height` is an absolute 54.6px, not a ratio — this is
// what shrinks the box; the font ramp alone would not.
const MENU_LINK_LINE_HEIGHT_EN = "clamp(45.8px, 3.09dvh + 28.7px, 54.6px)";
// Home's 81px italic emphasis needs its own ramp or it flattens into the list.
const MENU_HOME_FONT_SIZE_EN = "clamp(67.9px, 4.6dvh + 42.4px, 81px)";
// Layout viewport, not dvh, on purpose: a media query cannot see the URL bar
// collapse, so the logo can't pop in and out mid-scroll (D064).
const MENU_LOGO_HIDDEN = "[@media(max-height:666px)]:hidden";

const themeClassName: Record<
  NavTheme,
  { border: string; text: string; mark: string; localePill: string; localeOutline: string }
> = {
  light: {
    border: "border-(--color-basic-accent)",
    text: "text-(--color-basic-accent)",
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

export default function Nav({ locale, theme }: { locale: Locale; theme?: NavTheme }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Explicit prop wins (the styleguide passes both); otherwise the route table.
  const resolvedTheme: NavTheme = theme ?? navThemeForPath(pathname);
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const otherLocaleLabel = locale === "en" ? "繁中" : "EN";
  const closeLabel = locale === "en" ? "Close" : "返回";
  const tone = themeClassName[resolvedTheme];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Pin the page behind; cleanup covers every exit path and restores position.
  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Dark-nav pages draw the bar inside the hero frame, so it overlays
          rather than pushes down; light pages keep it in flow. */}
      <div
        className={`flex h-16 items-center justify-between border-b-[0.542px] px-3 lg:h-auto lg:justify-start lg:border-b-0 lg:px-8 lg:pt-[30px] lg:pb-[10px] ${
          resolvedTheme === "dark" ? "absolute inset-x-0 top-0 z-40" : "relative"
        } ${tone.border}`}
      >
        <a
          href={localizedHref("home", locale)}
          aria-label="In Utero"
          className="relative z-10 block shrink-0 lg:-mr-[10px]"
        >
          <LogoMark className={`size-12 lg:hidden ${tone.mark}`} />
          <Logo className={`hidden aspect-[97/89] h-[89px] lg:block ${tone.text}`} />
        </a>

        {/* -ml-[60px] = 48px mark + 12px gutter, pulling the rule back to x=0.
            Figma fixes it at 225px; flex-1 keeps it balanced off 393px. */}
        <span
          aria-hidden
          className={`pointer-events-none relative mt-[31px] mr-8 -ml-[60px] h-[2px] flex-1 self-start bg-current lg:hidden ${tone.mark}`}
        />

        {/* The asymmetric padding is what crosses the links' border through the
            logo mark rather than sitting it below (12653:5366). */}
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

        {/* Mobile's locale pill is outline, not the desktop solid fill. */}
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
          // h-dvh tracks the visible viewport; overflow-y-auto is the
          // below-553px safety net, not dead code (D063).
          className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col overflow-y-auto bg-(--color-brand-primary-green) lg:hidden"
        >
          {/* Flush right in both locales — no gutter. */}
          <div className="flex shrink-0 justify-end">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setMenuOpen(false)}
              className="font-body text-label-m inline-flex items-center justify-center bg-(--color-basic-background) px-5 py-[9px] text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
            >
              {closeLabel}
            </button>
          </div>

          {/* my-auto splits the slack evenly, centring this between the pinned
              close row and footer. Diverges from Figma by request (D065). */}
          <div className="my-auto shrink-0">
            {/* Decorative, so it is the first thing to drop. mb lives here, not
                on the nav, so the gap leaves with it. */}
            <div className={`shrink-0 ${MENU_LOGO_HIDDEN}`}>
              <LogoMark className="mx-auto size-[100px] text-(--color-basic-background)" />
            </div>

            <nav aria-label="Mobile" className="flex flex-col">
              <a
                href={localizedHref("home", locale)}
                onClick={() => setMenuOpen(false)}
                style={{
                  paddingBlock: MENU_LINK_PADDING_Y,
                  ...(locale === "en" ? { fontSize: MENU_HOME_FONT_SIZE_EN } : null),
                }}
                className={`font-display w-full border-b border-(--color-basic-background) px-[13px] text-center font-bold text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                  locale === "en" ? "leading-[0.7] tracking-[-0.81px] italic" : "text-display-h3"
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
                    style={{
                      paddingBlock: MENU_LINK_PADDING_Y,
                      ...(locale === "en"
                        ? {
                            fontSize: MENU_LINK_FONT_SIZE_EN,
                            lineHeight: MENU_LINK_LINE_HEIGHT_EN,
                          }
                        : null),
                    }}
                    className="font-display text-display-h3 w-full border-b border-(--color-basic-background) px-[13px] text-center font-bold text-(--color-basic-background) uppercase last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
                  >
                    {route.label[locale]}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* No mt-auto — it would split the slack three ways. */}
          <div className="shrink-0">
            <div className="flex h-[56px] items-center justify-center gap-5">
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

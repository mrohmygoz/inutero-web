"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../_lib/i18n";
import {
  activeRouteForPath,
  localizedHref,
  navThemeForPath,
  routes,
  swapLocale,
  type RouteKey,
} from "../_lib/routes";
import Logo from "./Logo";
import LogoMark from "./LogoMark";
import { socialPlatforms } from "../_lib/socialPlatforms";

// Figma: desktop NAV 12653:5366 / DARK 12653:5259, mobile NAV 12219:1100,
// menu overlay 10270:2118 (EN) / 12368:2386 (TC). The differing desktop/mobile
// logo lockups are deliberate, not drift.
//
// Desktop fixed MENU trigger 12423:8613 (EN) / 0:504 (TC), opening the desktop
// overlay 12612:8541 (EN) / 12635:12923 (TC) — D045 confirmed the prototype
// reaction D039 doubted is real; phase-16h builds both (D123). The overlay's
// real Figma frame right-aligns its links and carries a logo; this build
// centers the links and omits the logo, a deliberate divergence (D123).
export type NavTheme = "light" | "dark";

// Scroll fraction of viewport height past which the fixed desktop trigger
// appears — a single threshold local to this file, not a per-page sentinel
// (D123). Matches the Make reference's own `pastHero` check
// (`scrollY >= innerHeight`, App.tsx) exactly, not an approximation.
const FIXED_TRIGGER_SCROLL_THRESHOLD = 1;

// Desktop overlay link typography is a bespoke measurement on the Figma
// frame, not the Display/H3 token (120/84/-1.2 EN, 78/90/-0.78 TC) — see
// D123. Literal per-locale values, matching the mobile MENU_* constants'
// own precedent of measurements-not-tokens (D063).
const DESKTOP_MENU_LINK_STYLE_EN = {
  fontSize: "100px",
  lineHeight: "70px",
  letterSpacing: "-0.81px",
};
const DESKTOP_MENU_LINK_STYLE_ZH = {
  fontSize: "54px",
  lineHeight: "66px",
  letterSpacing: "-0.78px",
};

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
  const [showFixedTrigger, setShowFixedTrigger] = useState(false);
  // Explicit prop wins (the styleguide passes both); otherwise the route table.
  const resolvedTheme: NavTheme = theme ?? navThemeForPath(pathname);
  const activeRoute = activeRouteForPath(pathname);
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

  // rAF-throttled, matching the pattern this codebase already uses for
  // scroll/pointer-driven effects (HeroCursorTrail).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setShowFixedTrigger(
        window.scrollY > window.innerHeight * FIXED_TRIGGER_SCROLL_THRESHOLD,
      );
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              const isActive = key === activeRoute;
              return (
                <a
                  key={key}
                  href={localizedHref(key, locale)}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-display text-display-h6 py-[6px] whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                    isActive ? "text-(--color-brand-primary-green)" : tone.text
                  }`}
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

      {/* Always mounted, not conditionally rendered — the Make reference
          (App.tsx's desktopMenuBtn) animates opacity/transform in on scroll
          rather than mounting on threshold-cross (D123). */}
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="nav-desktop-menu"
        aria-hidden={!showFixedTrigger}
        tabIndex={showFixedTrigger ? 0 : -1}
        onClick={() => setMenuOpen((open) => !open)}
        style={{
          opacity: showFixedTrigger ? 1 : 0,
          pointerEvents: showFixedTrigger ? "auto" : "none",
          transform: showFixedTrigger ? "translateY(0)" : "translateY(-12px)",
        }}
        className="font-body text-label-m fixed top-[30px] right-[30px] z-50 hidden size-[75px] items-center justify-center bg-(--color-brand-accent-neon) font-normal text-(--color-basic-accent) uppercase transition-all duration-300 lg:flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
      >
        menu
      </button>

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

          {/* flex-1 + centered content fills the slack between the pinned
              close row and footer. Diverges from Figma by request (D065). */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <nav aria-label="Mobile" className="flex w-full flex-col">
              <a
                href={localizedHref("home", locale)}
                aria-current={activeRoute === "home" ? "page" : undefined}
                style={{
                  paddingBlock: MENU_LINK_PADDING_Y,
                  ...(locale === "en" ? { fontSize: MENU_HOME_FONT_SIZE_EN } : null),
                }}
                className={`font-display w-full border-b border-(--color-basic-background) px-[13px] text-center uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                  activeRoute === "home"
                    ? "italic text-(--color-basic-accent)"
                    : "text-(--color-basic-background)"
                } ${
                  locale === "en"
                    ? "font-bold leading-[0.7] tracking-[-0.81px]"
                    : "text-display-h3"
                }`}
              >
                {locale === "en" ? "Home" : "首頁"}
              </a>
              {navRoutes.map((key) => {
                const route = routes.find((r) => r.key === key)!;
                const isActive = key === activeRoute;
                return (
                  <a
                    key={key}
                    href={localizedHref(key, locale)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      paddingBlock: MENU_LINK_PADDING_Y,
                      ...(locale === "en"
                        ? {
                            fontSize: MENU_LINK_FONT_SIZE_EN,
                            lineHeight: MENU_LINK_LINE_HEIGHT_EN,
                          }
                        : null),
                    }}
                    className={`font-display text-display-h3 w-full border-b border-(--color-basic-background) px-[13px] text-center uppercase last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                      isActive ? "italic text-(--color-basic-accent)" : "text-(--color-basic-background)"
                    }`}
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
              {socialPlatforms.map(({ key: platform, icon, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="relative block size-[37.4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
                >
                  <span
                    className="absolute inset-0 bg-(--color-basic-accent)"
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
            <a
              href={swapLocale(pathname, otherLocale)}
              className="font-body text-body-l mt-[2px] block w-full bg-(--color-basic-accent) py-[15px] text-center text-(--color-basic-background)"
            >
              {locale === "en" ? "繁體中文" : "English"}
            </a>
          </div>
        </div>
      )}

      {/* Sibling tree to the mobile overlay above, not a merged one — the
          two differ enough (centered column vs. stacked full-width rows; no
          logo vs. mobile's mark) that sharing a tree would need as much
          branching as two trees would (D123). Reuses menuOpen and its
          Escape/scroll-lock effects verbatim. */}
      {menuOpen && (
        <div
          id="nav-desktop-menu"
          className="fixed inset-0 z-50 hidden flex-col overflow-y-auto bg-(--color-brand-primary-green) lg:flex"
        >
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setMenuOpen(false)}
            className="font-body text-label-m absolute top-[26px] right-[15px] inline-flex items-center justify-center bg-(--color-basic-background) px-5 py-[9px] text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
          >
            {closeLabel}
          </button>

          <div className="flex flex-1 flex-col items-center justify-center">
            <nav aria-label="Primary (expanded)" className="flex w-full flex-col items-center">
              <a
                href={localizedHref("home", locale)}
                aria-current={activeRoute === "home" ? "page" : undefined}
                style={locale === "en" ? DESKTOP_MENU_LINK_STYLE_EN : DESKTOP_MENU_LINK_STYLE_ZH}
                className={`font-display w-full border-b border-(--color-basic-background) px-8 pt-[6px] pb-[7px] text-center uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                  activeRoute === "home"
                    ? "italic text-(--color-basic-accent)"
                    : "text-(--color-basic-background)"
                }`}
              >
                {locale === "en" ? "Home" : "首頁"}
              </a>
              {navRoutes.map((key) => {
                const route = routes.find((r) => r.key === key)!;
                const isActive = key === activeRoute;
                return (
                  <a
                    key={key}
                    href={localizedHref(key, locale)}
                    aria-current={isActive ? "page" : undefined}
                    style={locale === "en" ? DESKTOP_MENU_LINK_STYLE_EN : DESKTOP_MENU_LINK_STYLE_ZH}
                    className={`font-display w-full border-b border-(--color-basic-background) px-8 pt-[6px] pb-[7px] text-center uppercase last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
                      isActive ? "italic text-(--color-basic-accent)" : "text-(--color-basic-background)"
                    }`}
                  >
                    {route.label[locale]}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="shrink-0 pb-8">
            <div className="flex h-[56px] items-center justify-center gap-5">
              {socialPlatforms.map(({ key: platform, icon, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="relative block size-[37.4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-background)"
                >
                  <span
                    className="absolute inset-0 bg-(--color-basic-accent)"
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

import type { Locale } from "./i18n";

// Transcribed from openspec/reference/routes.md — the canonical route table.
// Display names follow D004 (canonical naming resolves sitemap/desktop/mobile drift).
export type RouteKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "artists"
  | "news"
  | "contact";

type RouteDef = {
  key: RouteKey;
  /** Path segment after the locale prefix. Empty string for home. */
  segment: string;
  /**
   * The NAV/Footer *link* label — not necessarily the page's own name. These
   * diverge on `/artists`, where the design labels every link "Artists" but
   * names the page "Featured Artists" (D004 amendment).
   */
  label: Record<Locale, string>;
};

export const routes: readonly RouteDef[] = [
  { key: "home", segment: "", label: { en: "Home", zh: "首頁" } },
  { key: "about", segment: "about", label: { en: "Our Story", zh: "關於子皿" } },
  { key: "services", segment: "services", label: { en: "Services", zh: "服務項目" } },
  { key: "portfolio", segment: "portfolio", label: { en: "Portfolio", zh: "過往案例" } },
  { key: "artists", segment: "artists", label: { en: "Artists", zh: "合作藝人" } },
  { key: "news", segment: "news", label: { en: "News", zh: "子皿超音波" } },
  { key: "contact", segment: "contact", label: { en: "Contact Us", zh: "聯絡我們" } },
] as const;

/**
 * Routes whose frames instance `Desktop NAV/DARK` rather than the light NAV —
 * i.e. pages that open on a full-bleed dark hero. Home is the first (12612:11873
 * in 12405:6947); later page phases add their own keys here.
 *
 * D017 called this "a static per-page prop", but `Nav` is rendered by
 * `[locale]/layout.tsx`, so a page cannot pass it one — props do not flow from
 * a child to its layout. This table is the same decision expressed where the
 * layout can actually reach it: still static per page, still not scroll-driven.
 */
const darkNavRoutes: readonly RouteKey[] = ["home", "about"];

/** Resolves the NAV theme for a pathname, e.g. "/zh" -> "dark", "/en/news" -> "light". */
export function navThemeForPath(pathname: string): "light" | "dark" {
  const segment = pathname.split("/")[2] ?? "";
  const route = routes.find((r) => r.segment === segment);
  return route && darkNavRoutes.includes(route.key) ? "dark" : "light";
}

export function getRoute(key: RouteKey): RouteDef {
  const route = routes.find((r) => r.key === key);
  if (!route) throw new Error(`Unknown route key: ${key}`);
  return route;
}

/** Builds a locale-prefixed href for a route, e.g. ("services", "zh") -> "/zh/services". */
export function localizedHref(key: RouteKey, locale: Locale): string {
  const { segment } = getRoute(key);
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

/**
 * Swaps the locale segment of a path while preserving the rest, e.g.
 * ("/en/portfolio", "zh") -> "/zh/portfolio". Assumes `pathname` already
 * starts with a valid locale prefix (true for every route under `[locale]/`).
 */
export function swapLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the locale
  segments[1] = targetLocale;
  return segments.join("/") || "/";
}

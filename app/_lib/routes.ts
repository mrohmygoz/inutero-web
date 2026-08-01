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
  label: Record<Locale, string>;
};

export const routes: readonly RouteDef[] = [
  { key: "home", segment: "", label: { en: "Home", zh: "首頁" } },
  { key: "about", segment: "about", label: { en: "Our Story", zh: "關於子皿" } },
  { key: "services", segment: "services", label: { en: "Services", zh: "服務項目" } },
  { key: "portfolio", segment: "portfolio", label: { en: "Portfolio", zh: "過往案例" } },
  { key: "artists", segment: "artists", label: { en: "Featured Artists", zh: "合作藝人" } },
  { key: "news", segment: "news", label: { en: "News", zh: "子皿超音波" } },
  { key: "contact", segment: "contact", label: { en: "Contact Us", zh: "聯絡我們" } },
] as const;

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

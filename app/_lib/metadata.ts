import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { getDictionary } from "./i18n";
import { getRoute, localizedHref, type RouteKey } from "./routes";

/**
 * Builds title + canonical + hreflang alternates for a static route, both
 * locales. Detail routes ([slug]) build their own metadata since their
 * title comes from content, not the route table.
 */
export function buildRouteMetadata(key: RouteKey, locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const { label } = getRoute(key);

  return {
    title: `${label[locale]} — ${dict.common.siteName}`,
    alternates: {
      canonical: localizedHref(key, locale),
      languages: {
        en: localizedHref(key, "en"),
        zh: localizedHref(key, "zh"),
      },
    },
  };
}

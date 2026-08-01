import { getRoute, type RouteKey } from "../../_lib/routes";
import type { Locale } from "../../_lib/i18n";

// Throwaway scaffolding (D-F, phase-03-shell) — deliberately not in
// app/_components/ or INVENTORY.md. Each page phase (7-15) deletes its
// route's usage of this when it ships the real page body.
export default function PagePlaceholder({
  routeKey,
  locale,
}: {
  routeKey: RouteKey;
  locale: Locale;
}) {
  const { label } = getRoute(routeKey);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-(--spacing-page-padding) py-(--spacing-page-padding) text-center">
      <h1 className="font-display text-display-h2">{label[locale]}</h1>
      <p className="font-body text-body-m text-(--color-basic-text-secondary)">
        {locale === "zh" ? "此頁面正在建置中。" : "This page is under construction."}
      </p>
    </main>
  );
}

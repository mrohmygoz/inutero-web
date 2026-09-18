import ServiceCard from "../../../_components/ServiceCard";
import { getDictionary, type Locale } from "../../../_lib/i18n";
import { localizedHref } from "../../../_lib/routes";

// Source: desktop "Frame 60" 12600:7551 — four full-bleed 1440x647 ServiceCard
// instances with a 64px lead-in; mobile 12220:2696 / 2666 / 2786 / 2816, four
// full-width cards stacked with no gap. The card IS the section at both
// breakpoints, so this component is a stack and nothing else (D-A); everything
// visual lives in the shared ServiceCard.
//
// The photographs are the one thing that is neither copy nor layout, so they
// live here rather than in the locale dictionaries — the same four images serve
// both locales and duplicating the paths across en/zh would let them drift.
const images = [
  "/images/services/service-01-artist-management.jpg",
  "/images/services/service-02-booking-touring.jpg",
  "/images/services/service-03-pr-marketing.jpg",
  "/images/services/service-04-event-production.jpg",
];

export default function ServicesList({ locale }: { locale: Locale }) {
  const { items, ctaLabel } = getDictionary(locale).services;

  return (
    <section className="w-full bg-(--color-basic-accent) lg:pt-[64px]">
      {items.map((service, i) => (
        <ServiceCard
          key={service.index}
          index={service.index}
          title={service.title}
          description={service.description}
          features={service.features}
          ctaLabel={ctaLabel}
          ctaHref={localizedHref("portfolio", locale)}
          image={{ src: images[i], alt: service.imageAlt }}
        />
      ))}
    </section>
  );
}

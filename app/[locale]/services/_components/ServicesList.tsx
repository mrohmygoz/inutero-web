import ServiceCard from "../../../_components/ServiceCard";
import { getDictionary, type Locale } from "../../../_lib/i18n";
import { localizedHref, serviceAnchors } from "../../../_lib/routes";

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
  const { items } = getDictionary(locale).services;

  return (
    <section className="w-full bg-(--color-basic-accent) lg:pt-[64px]">
      {items.map((service, i) => (
        // The anchor target is a wrapper, not a ServiceCard prop — the card is
        // a shared component and this is page routing, not card design.
        // scroll-mt clears the dark NAV, which is absolute at the top of the
        // page and would otherwise cover a card scrolled to (D-D).
        <div
          key={service.index}
          id={serviceAnchors[i].id}
          className="scroll-mt-[64px] lg:scroll-mt-[138px]"
        >
          <ServiceCard
            index={service.index}
            title={service.title}
            description={service.description}
            features={service.features}
            ctaLabel={service.ctaLabel}
            ctaHref={localizedHref(service.ctaHref, locale)}
            image={{ src: images[i], alt: service.imageAlt }}
          />
        </div>
      ))}
    </section>
  );
}

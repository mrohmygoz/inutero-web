"use client";

import { useMemo, useState } from "react";
import ArtistCard from "../../../_components/ArtistCard";
import { serviceAnchors } from "../../../_lib/routes";
import type { ServiceId } from "../../../_lib/content";
import { artistDisplay, type Artist } from "../../../_lib/artists";
import type { Locale } from "../../../_lib/i18n";

// Source: desktop Section 12591:6180 (filter rail 12591:6181 at x=32 w=319,
// grid 12612:7838 at x=383 w=1025, 3-up with 24px gutters — the same
// geometry as Portfolio's); mobile Section 12211:3621 (filter 12220:1052,
// 2-column grid 12220:1192, both inside a 15px gutter).
//
// The filter tag ids/labels and the single-select/All-default/empty-state
// mechanism are reused verbatim from Portfolio (design.md D-B) — the matrix's
// five tags for this page are byte-identical to Portfolio's, and a reaction
// sweep of all four Artists frames found no prototype on any filter tag,
// same finding as Portfolio's (D083).
//
// No paginator: 8 real artists is under any page size Portfolio derived, and
// Figma's own Pagination instance on this page is sample chrome for its
// drawn 16-slot grid, not a real second page.
export default function ArtistsGrid({
  locale,
  artists,
  filter,
}: {
  locale: Locale;
  artists: Artist[];
  filter: {
    label: string;
    all: string;
    tags: Record<ServiceId, string>;
    empty: string;
  };
}) {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);

  const visible = useMemo(
    () =>
      activeService === null
        ? artists
        : artists.filter((artist) => artist.services.includes(activeService)),
    [artists, activeService]
  );

  return (
    <section className="w-full bg-(--color-basic-background) px-[15px] pt-[30px] pb-[30px] lg:flex lg:items-start lg:gap-[32px] lg:px-[32px] lg:py-[64px]">
      <div className="w-full border-t-[0.542px] border-(--opacity-neutral-darkest-20) pt-[20.5px] pb-[30px] lg:w-[320px] lg:shrink-0 lg:border-(--color-basic-accent) lg:pb-0">
        <p className="font-body text-label-m text-(--opacity-neutral-darkest-50) uppercase lg:text-(--color-basic-accent)">
          {filter.label}
        </p>

        <div role="group" aria-label={filter.label} className="flex flex-wrap gap-x-[5px] gap-y-[8px] pt-[16px]">
          <FilterTag label={filter.all} active={activeService === null} onSelect={() => setActiveService(null)} />
          {serviceAnchors.map((service) => (
            <FilterTag
              key={service.id}
              label={filter.tags[service.id]}
              active={activeService === service.id}
              onSelect={() => setActiveService(service.id)}
            />
          ))}
        </div>
      </div>

      <div className="min-w-px lg:flex-1">
        <div aria-live="polite" className="grid grid-cols-2 gap-x-[13px] gap-y-[24px] lg:grid-cols-3 lg:gap-[24px]">
          {visible.map((artist) => {
            const display = artistDisplay(artist, locale);
            return (
              <ArtistCard
                key={artist.slug}
                name={display.name}
                genre={artist.services.map((service) => filter.tags[service]).join(" / ")}
                bio={display.bio}
                image={artist.photo ? { src: artist.photo, alt: display.name } : undefined}
                socialLinks={[]}
              />
            );
          })}

          {visible.length === 0 ? (
            <p className="font-body text-body-s py-[40px] text-(--opacity-neutral-darkest-60) col-span-2 lg:col-span-3">
              {filter.empty}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Not `Tag` — that component's outline variant is white-on-dark (built for
// Portfolio's dark filter rail). This page's filter rail is light (white bg,
// dark text/border, confirmed by the design.md sweep of both breakpoints),
// the opposite polarity. Reusing `Tag` as-is would render invisible white
// text on a white background. Proposal scope excludes changing `Tag` itself,
// so the light-surface chip is built locally rather than adding a tone prop
// speculatively for a single caller (recorded in DECISIONS.md).
function FilterTag({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`inline-flex items-center justify-center whitespace-nowrap border-[0.5px] border-solid px-[12.5px] py-[6.5px] font-body text-label-m font-normal uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green) ${
        active
          ? "border-(--color-basic-accent) bg-(--color-basic-accent) text-(--color-basic-background)"
          : "border-(--opacity-neutral-darkest-20) text-(--color-basic-accent)"
      }`}
    >
      {label}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import ProjectCard, { type ProjectCardTag } from "../../../_components/ProjectCard";
import Pagination from "../../../_components/Pagination";
import Tag from "../../../_components/Tag";
import { serviceAnchors } from "../../../_lib/routes";
import type { ServiceId } from "../../../_lib/content";
import type { Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:6925 (filter rail 12573:6926 at x=32 w=320, grid
// 12573:6947 at x=384 w=1024, 3-up with 24px gutters); mobile Section 12210:3077
// (filter 12210:3084, single-column grid 12210:3102, both inside a 15px gutter).
//
// The only `'use client'` boundary on the page: the active filter and the page
// index drive the cards, the empty state and the paginator alike, so splitting
// them would mean lifting the same two pieces of state into a third wrapper.
//
// EVERY interaction here is derived. A `node.reactions` sweep of all four page
// frames found reactions on exactly three things — the NAV, the Footer, and the
// grid container (ON_CLICK -> Portfolio Details, which is why the cards link).
// Not one filter tag or pagination button carries a prototype.

export type PortfolioProject = {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  image: string;
  services: readonly ServiceId[];
};

type FilterCopy = {
  label: string;
  all: string;
  tags: Record<ServiceId, string>;
  empty: string;
};

// Figma colours the three card tags neon / yellow / orange in order.
const tagColors = ["neon", "yellow", "orange"] as const;

// Derived. Figma's two grids disagree — 11 slots at desktop, 5 at mobile — so
// neither is a page size the design states. Nine is three full desktop rows.
const PAGE_SIZE = 9;

export default function PortfolioGrid({
  locale,
  projects,
  filter,
  pagination,
}: {
  locale: Locale;
  projects: PortfolioProject[];
  filter: FilterCopy;
  pagination: { next: string; label: string; page: string };
}) {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () =>
      activeService === null
        ? projects
        : projects.filter((project) => project.services.includes(activeService)),
    [projects, activeService]
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function select(service: ServiceId | null) {
    setActiveService(service);
    setPage(1);
  }

  return (
    <section className="w-full bg-(--color-basic-accent) px-[15px] pt-[30px] pb-[30px] lg:flex lg:items-start lg:gap-[32px] lg:px-[32px] lg:py-[64px]">
      {/* Filter rail. Mobile softens the rule and the label to white/20 and
          white/50; desktop keeps both at full opacity. */}
      <div className="w-full border-t-[0.542px] border-(--opacity-white-20) pt-[20.5px] pb-[30px] lg:w-[320px] lg:shrink-0 lg:border-(--color-basic-background) lg:pb-0">
        <p className="font-body text-label-m text-(--opacity-white-50) uppercase lg:text-(--color-basic-background)">
          {filter.label}
        </p>

        <div role="group" aria-label={filter.label} className="flex flex-wrap gap-x-[5px] gap-y-[8px] pt-[16px]">
          <FilterTag
            label={filter.all}
            active={activeService === null}
            onSelect={() => select(null)}
          />
          {serviceAnchors.map((service) => (
            <FilterTag
              key={service.id}
              label={filter.tags[service.id]}
              active={activeService === service.id}
              onSelect={() => select(service.id)}
            />
          ))}
        </div>
      </div>

      <div className="min-w-px lg:flex-1">
        {/* Announced rather than animated: the grid re-renders on a filter
            change, it does not transition. D041's 300ms is a disclosure timing
            and does not carry over. */}
        <div aria-live="polite" className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
          {pageItems.map((project, index) => (
            <ProjectCard
              key={project.slug}
              variant="portfolio"
              priority={index === 0}
              href={`/${locale}/portfolio/${project.slug}`}
              title={project.title}
              dateLabel={project.dateLabel}
              description={project.excerpt}
              image={{ src: project.image, alt: project.title }}
              tags={project.services.map(
                (service, index): ProjectCardTag => ({
                  label: filter.tags[service],
                  color: tagColors[index % tagColors.length],
                })
              )}
            />
          ))}

          {pageItems.length === 0 ? (
            // Derived — Figma draws no empty state, and one filter (Artist
            // Management) matches no project in the supplied set.
            <p className="font-body text-body-s py-[40px] text-(--opacity-white-60) lg:col-span-3">
              {filter.empty}
            </p>
          ) : null}
        </div>

        <div className="pt-[20px] lg:pt-[32px]">
          <Pagination
            page={page}
            pageCount={pageCount}
            onChange={setPage}
            labels={pagination}
          />
        </div>
      </div>
    </section>
  );
}

// `Tag`'s outline states are the design's own: the mobile frame draws the
// selected chip with a full-opacity white border and the rest at white/20
// (12219:1183 vs 12219:1164, transcribed in Phase 2). The desktop frame draws
// every chip in the selected state, so mobile is the one that carries the pair.
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
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
    >
      <Tag state={active ? "active" : "default"}>{label}</Tag>
    </button>
  );
}

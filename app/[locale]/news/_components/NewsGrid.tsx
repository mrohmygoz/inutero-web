"use client";

import { useMemo, useState } from "react";
import Article from "../../../_components/Article";
import type { TagColor } from "../../../_components/Tag";
import { newsFilters } from "../../../_lib/routes";
import type { NewsFilterId } from "../../../_lib/content";
import type { Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:7983 (filter rail 12611:7639 at x=32 w=290,
// article list 12612:7807 at x=386 w=1022, single-column stack of full-width
// `Article` rows — not a multi-up grid, matching the component's own
// side-by-side/stacked shape); mobile Container 12220:1646 (filter
// 12220:1647, article list 12211:4040, both inside a 15px gutter).
//
// Pagination and the featured-banner section above the filter (design.md
// Non-Goals; the empty 12573:7967/12211:4017 nodes) are Phase 13a's and are
// not rendered here — the grid ships every matching article unpaginated.
//
// The filter mechanism is Portfolio's, reused verbatim (design.md D-B):
// single-select, `All` default, client-side, no URL sync. Only the tag ids/
// labels (`newsFilters` in routes.ts) are page-owned. A `node.reactions`
// sweep of all four News frames found no prototype on the tag row, same
// finding as Portfolio (D083) and Artists (D094).
export type NewsArticleSummary = {
  slug: string;
  title: string;
  dateLabel: string;
  image: string;
  tags: NewsFilterId[];
};

type FilterCopy = {
  label: string;
  all: string;
  tags: Record<NewsFilterId, string>;
  empty: string;
};

// Fixed per tag, not per position — same reasoning as `serviceTagColor`
// (D089): a tag paints the same accent color on every card. Four real tags,
// four accent colors in `Tag`'s solid palette — one each, no reuse.
const newsTagColor: Record<NewsFilterId, TagColor> = {
  "artists-works": "neon",
  "global-touring": "yellow",
  events: "orange",
  "about-in-utero": "green",
};

export default function NewsGrid({
  locale,
  articles,
  filter,
}: {
  locale: Locale;
  articles: NewsArticleSummary[];
  filter: FilterCopy;
}) {
  const [activeTag, setActiveTag] = useState<NewsFilterId | null>(null);

  const visible = useMemo(
    () =>
      activeTag === null ? articles : articles.filter((article) => article.tags.includes(activeTag)),
    [articles, activeTag]
  );

  return (
    <section className="w-full bg-(--color-basic-background) px-[15px] pt-[40px] pb-[30px] lg:flex lg:items-start lg:gap-[32px] lg:px-[32px] lg:py-[64px]">
      <div className="w-full border-t-[0.542px] border-(--opacity-neutral-darkest-20) pt-[20.5px] pb-[30px] lg:w-[290px] lg:shrink-0 lg:border-(--color-basic-accent) lg:pb-0">
        <p className="font-body text-label-m text-(--opacity-neutral-darkest-50) uppercase lg:text-(--color-basic-accent)">
          {filter.label}
        </p>

        <div role="group" aria-label={filter.label} className="flex flex-wrap gap-x-[5px] gap-y-[8px] pt-[16px]">
          <FilterTag label={filter.all} active={activeTag === null} onSelect={() => setActiveTag(null)} />
          {newsFilters.map((tag) => (
            <FilterTag
              key={tag.id}
              label={filter.tags[tag.id]}
              active={activeTag === tag.id}
              onSelect={() => setActiveTag(tag.id)}
            />
          ))}
        </div>
      </div>

      <div className="min-w-px lg:flex-1">
        <div aria-live="polite" className="flex flex-col gap-[30px] lg:gap-[32px]">
          {visible.map((article) => (
            <Article
              key={article.slug}
              href={`/${locale}/news/${article.slug}`}
              title={article.title}
              tags={article.tags.map((tag) => ({ label: filter.tags[tag], color: newsTagColor[tag] }))}
              dateLabel={article.dateLabel}
              image={{ src: article.image, alt: article.title }}
            />
          ))}

          {visible.length === 0 ? (
            // Derived — Figma draws no empty state; Portfolio/Artists precedent
            // (D085). Does not trigger with the real 14-article set (design.md
            // Risks), kept as a guard.
            <p className="font-body text-body-s py-[40px] text-(--opacity-neutral-darkest-60)">{filter.empty}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Not `Tag` — this filter rail is light-polarity (white bg, dark text/border),
// the same reasoning Artists recorded for its own local chip (D093): `Tag`'s
// outline variant is white-on-dark, built for Portfolio's dark rail, and
// would render invisible white text here.
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

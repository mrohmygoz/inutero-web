import Image from "next/image";
import Cms from "../../../../_components/Cms";
import ShareRow from "../../../../_components/ShareRow";
import ShareRail from "../../../../_components/ShareRail";
import Gallery from "./Gallery";
import type { ContentEntry } from "../../../../_lib/content";
import { getDictionary, type Locale } from "../../../../_lib/i18n";
import { localizedHref } from "../../../../_lib/routes";
import LatinBold from "../../../../_components/LatinBold";

// Source: desktop `Portfolio Details` 12612:8706, mobile `Project Details` 12211:3371
// (TC 12635:12927 / 12368:2481). Replaces `ContentDetail` for this route (design.md D-E).
//
// Scope, per design.md/content-matrix.md ("Project Details" row): breadcrumb, meta row
// (Client / Date / Role — Link is never rendered, no project supplies one), the MDX body,
// a Gallery section (Phase 11a — see Gallery.tsx and DECISIONS.md D091), and a
// prev/next footer.
//
// Role reuses the same `services` frontmatter Portfolio's grid/filter already renders
// (design.md: 職責 = `services`, already captured by Phase 10) — joined into one string
// here since the meta row has one slot, not a tag row.
export type PortfolioNeighbor = { slug: string; title: string };

export default function PortfolioDetail({
  locale,
  entry,
  prev,
  next,
}: {
  locale: Locale;
  entry: ContentEntry;
  prev: PortfolioNeighbor;
  next: PortfolioNeighbor;
}) {
  const dict = getDictionary(locale);
  const { detail } = dict.portfolio;
  const { frontmatter } = entry;
  const role = frontmatter.services.map((id) => dict.portfolio.filter.tags[id]).join(" / ");
  const portfolioHref = localizedHref("portfolio", locale);

  const heroImage = frontmatter.heroImage || frontmatter.image;

  const metaFields = [
    frontmatter.client ? { label: detail.metaClient, value: frontmatter.client } : null,
    frontmatter.dateLabel ? { label: detail.metaDate, value: frontmatter.dateLabel } : null,
    role ? { label: detail.metaRole, value: role } : null,
  ].filter((field): field is { label: string; value: string } => field !== null);

  return (
    <article>
      {/* Breadcrumb — 12573:7322 (desktop) / 12219:1448 (mobile). Underlined "Portfolio"
          crumb + chevron + this project's title, on the dark accent bar under NAV.
          `pt-[64px] lg:pt-[138px]` reserves NAV's own height: `portfolio` is a
          `darkNavRoutes` route (routes.ts), so `Nav` renders `absolute` over the page's
          first section rather than in flow (D070) — the same reservation `PortfolioHero`
          makes for the index page. Without it NAV overlaps this bar instead of sitting
          above it. */}
      <div className="bg-(--color-basic-accent) px-4 pt-[75px] pb-[11px] lg:px-8 lg:pt-[149px] lg:pb-[11px]">
        <div className="flex items-center gap-1.5">
          <a
            href={portfolioHref}
            className="font-body text-label-s border-b border-(--color-brand-primary-green) pb-[1.5px] text-(--color-brand-primary-green) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
          >
            {detail.breadcrumb}
          </a>
          <span aria-hidden className="text-(--opacity-white-40)">
            /
          </span>
          <p className="font-body text-label-s text-(--color-basic-background) uppercase">
            {frontmatter.title}
          </p>
        </div>
      </div>

      {/* Hero — 12610:7288/7329 (desktop) / 12219:1346 (mobile). `heroImage` when the
          project supplies one (a real photo distinct from its listing poster); falls
          back to `image` for any project that doesn't.

          Desktop and mobile are genuinely different boxes, not one repositioned tree
          (matches Figma: mobile's `Hero` is full-bleed behind a black 16px border;
          desktop's is a right-aligned square at x=739 of 1440, per `12610:7288`'s own
          metadata — not full-bleed, confirmed by re-reading node geometry after the
          first pass wrongly went full-bleed). */}
      <div className="relative bg-(--color-basic-accent) lg:h-[714px]">
        {/* One real heading landmark (HomeHero's pattern) — the two visual titles below
            are aria-hidden duplicates styled per breakpoint. */}
        <h1 className="sr-only">{frontmatter.title}</h1>

        {/* Mobile — full-bleed image inside the black border, title at its bottom. */}
        <div className="relative h-[431px] border-[16px] border-(--color-basic-accent) lg:hidden">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="393px"
              className="object-cover"
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-(--opacity-neutral-darkest-10) to-black/70"
          />
          <div
            aria-hidden
            className="absolute bottom-0 flex w-full flex-col items-center px-5 pb-8"
          >
            <p className="font-accent text-accent-display w-full text-(--color-basic-background) uppercase">
              {frontmatter.title}
            </p>
          </div>
        </div>

        {/* Desktop — square image pinned to the right edge (x=739 of 1440 in the frame,
            ~34px from the right — close enough to the section's own 32px padding that
            `right-8` is used rather than a one-off value). */}
        <div className="hidden overflow-hidden lg:absolute lg:inset-y-0 lg:right-8 lg:block lg:aspect-square">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="714px"
              className="object-cover"
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-(--opacity-neutral-darkest-10) to-black/70"
          />
        </div>

        {/* Desktop-only title + excerpt, bottom-left on the section's own dark
            background (not on the image — the two only share a ~100px band). */}
        <div
          aria-hidden
          className="absolute bottom-[137px] left-[30px] hidden w-[803px] flex-col items-start gap-[30px] lg:flex"
        >
          <p className="font-display text-display-h2 w-full text-(--color-basic-background) uppercase">
            <LatinBold text={frontmatter.title} level="h2" />
          </p>
          <p className="font-body text-body-l max-w-[570px] text-(--color-basic-background)">
            {frontmatter.excerpt}
          </p>
        </div>

        {/* Mobile excerpt + meta card — green panel below the hero image. */}
        <div className="flex flex-col items-center bg-(--color-brand-primary-green) px-[15px] py-[35px] lg:hidden">
          <p className="font-body text-body-l w-full max-w-[362px] text-right text-(--color-basic-accent)">
            {frontmatter.excerpt}
          </p>
          {metaFields.length > 0 ? (
            <div className="mt-8 grid w-full max-w-[362px] grid-cols-2 gap-x-8 gap-y-6 border-t border-(--color-basic-accent) pt-6">
              {metaFields.map((field) => (
                <div key={field.label}>
                  <p className="font-body text-label-m text-(--color-basic-accent) uppercase">
                    {field.label}
                  </p>
                  <p className="font-body text-body-m mt-0.5 text-(--color-basic-accent)">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Desktop meta bar — 12610:7297, full-width green strip under the hero. */}
        {metaFields.length > 0 ? (
          <div className="absolute bottom-0 left-0 hidden w-full max-w-[841px] items-start bg-(--color-brand-primary-green) px-8 py-7 lg:flex">
            <div className="flex flex-1 items-start gap-[10px]">
              {metaFields.map((field) => (
                <div key={field.label} className="flex-1">
                  <p className="font-body text-label-m text-(--color-basic-accent) uppercase">
                    {field.label}
                  </p>
                  <p className="font-body text-body-m text-(--color-basic-accent)">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* CMS body + desktop-only left share rail — 12612:8705. Bottom padding here
          mirrors ShareRow's own top gap (40px mobile / 64px desktop) so the border-b
          doesn't sit flush against the last paragraph. */}
      <div className="border-b border-(--color-basic-border) pb-10 lg:flex lg:items-start lg:pb-16">
        <ShareRail
          title={frontmatter.title}
          copyLinkLabel={dict.share.copyLink}
          linkedinLabel={dict.share.linkedin}
          xLabel={dict.share.x}
          facebookLabel={dict.share.facebook}
          className="hidden lg:sticky lg:top-24 lg:mt-[92px] lg:ml-8 lg:flex lg:shrink-0"
        />
        <Cms body={entry.Body} className="lg:flex-1" />
      </div>
      <ShareRow locale={locale} title={frontmatter.title} />

      <Gallery images={entry.galleryImages} label={detail.gallery} />

      <PortfolioPagination locale={locale} prev={prev} next={next} labels={detail} />
    </article>
  );
}

// Prev/next footer — mobile `12211:3496` draws a single "Back to portfolio" link plus a
// sample "1 / 12" counter; the desktop frame draws neither (no node, no reaction — see
// design.md's pagination decision). Built as a small page-local control rather than a
// reuse of `Pagination` (D084's contract is page index + count, not project identity):
// order follows the content manifest's own slug order, wrapping at both ends since three
// items with no wrap would strand the first/last project on one direction for no design
// reason.
function PortfolioPagination({
  locale,
  prev,
  next,
  labels,
}: {
  locale: Locale;
  prev: PortfolioNeighbor;
  next: PortfolioNeighbor;
  labels: { prev: string; next: string };
}) {
  const hrefFor = (slug: string) => `${localizedHref("portfolio", locale)}/${slug}`;

  return (
    <nav
      aria-label={`${labels.prev} / ${labels.next}`}
      className="flex items-stretch justify-between border-b border-(--opacity-neutral-darkest-15) px-5 py-6 lg:px-8 lg:py-8"
    >
      <a
        href={hrefFor(prev.slug)}
        className="font-body text-label-m flex max-w-[45%] flex-col items-start gap-1 text-(--color-basic-text-primary) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
      >
        <span aria-hidden>←</span>
        <span className="truncate">{prev.title}</span>
        <span className="text-(--opacity-neutral-darkest-40)">{labels.prev}</span>
      </a>
      <a
        href={hrefFor(next.slug)}
        className="font-body text-label-m flex max-w-[45%] flex-col items-end gap-1 text-right text-(--color-basic-text-primary) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
      >
        <span aria-hidden>→</span>
        <span className="truncate">{next.title}</span>
        <span className="text-(--opacity-neutral-darkest-40)">{labels.next}</span>
      </a>
    </nav>
  );
}

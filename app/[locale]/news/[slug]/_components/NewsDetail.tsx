import Image from "next/image";
import Cms from "../../../../_components/Cms";
import ShareRail from "../../../../_components/ShareRail";
import ShareRow from "../../../../_components/ShareRow";
import Tag from "../../../../_components/Tag";
import Article from "../../../../_components/Article";
import NewsletterSignup from "../../../../_components/NewsletterSignup";
import type { ContentEntry, NewsFilterId } from "../../../../_lib/content";
import { getDictionary, type Locale } from "../../../../_lib/i18n";
import { localizedHref } from "../../../../_lib/routes";
import { newsTagColor } from "../../_components/tagColors";
import { formatNewsDateLabel } from "../../_lib/formatNewsDateLabel";

export type RelatedPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  tags: NewsFilterId[];
};

// Source: desktop `News Details` 12612:8828, mobile 12211:4467 (TC 12635:20097 /
// 12368:2669 — same structure, longer strings). Replaces `ContentDetail` for this
// route (design.md, proposal.md). A `node.reactions` sweep of all four frames found
// no prototype on the hero or the related-posts cards, same finding as Portfolio's
// D083–D085.
//
// Not a `PortfolioDetail` variant (design.md Decisions) — the hero is full-bleed
// image + tag chip (no square-image/meta-bar split) and the footer is related
// posts + newsletter, not prev/next.
export default function NewsDetail({
  locale,
  entry,
  related,
}: {
  locale: Locale;
  entry: ContentEntry;
  related: RelatedPost[];
}) {
  const dict = getDictionary(locale);
  const { detail, filter } = dict.news;
  const { frontmatter } = entry;
  const newsHref = localizedHref("news", locale);

  const heroImage = frontmatter.heroImage || frontmatter.image;
  const dateLabel = formatNewsDateLabel(frontmatter.date, locale);
  const tags = frontmatter.tags.map((id) => ({
    label: filter.tags[id],
    color: newsTagColor[id],
  }));

  return (
    <article>
      {/* Breadcrumb — 12573:8525/8526 (desktop) / 12220:1828 (mobile). `news` is not
          a `darkNavRoutes` route (routes.ts), so `Nav` renders in flow here — no NAV
          height reservation needed (unlike Portfolio's `darkNavRoutes` bar).

          Genuinely different polarity per breakpoint, not a copy of Portfolio's dark
          bar (Portfolio is a `darkNavRoutes` page; News is not): mobile's own
          Container (`12220:1828`) sets a dark `neutral-darkest` background, but
          desktop's (`12573:8526`) carries no background of its own and inherits the
          white `Header` (`12573:8525`) behind it, with black (not white-on-dark)
          slash/title text — light, matching the light desktop NAV above it. */}
      <div className="flex items-center gap-1.5 bg-(--color-basic-accent) px-2.5 py-1.75 lg:bg-(--color-basic-background) lg:px-8 lg:py-2">
        <a
          href={newsHref}
          className="font-body text-label-s border-b border-(--color-brand-primary-green) pb-[1.5px] text-(--color-brand-primary-green) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
        >
          {detail.breadcrumb}
        </a>
        <span aria-hidden className="text-(--opacity-white-50) lg:text-(--color-basic-accent)">
          /
        </span>
        <p className="font-body text-body-s truncate text-(--opacity-white-50) lg:text-(--color-basic-accent)">
          {frontmatter.title}
        </p>
      </div>

      {/* Hero — 12220:1838 (mobile) / 12612:7916 (desktop). Full-bleed image, a
          bottom-anchored dark gradient, one solid tag-chip row (multi-tag per
          D099), title, date. */}
      <div className="relative h-[369px] w-full overflow-hidden lg:h-[810px] lg:border-b-[1.572px] lg:border-(--color-basic-border)">
        <h1 className="sr-only">{frontmatter.title}</h1>
        {heroImage ? (
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : null}
        <div aria-hidden className="absolute inset-0 bg-black/30" />
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-start justify-end gap-[7px] bg-gradient-to-t from-black/80 to-transparent p-5 lg:gap-0 lg:px-8 lg:pt-5 lg:pb-16"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((t) => (
              <Tag key={t.label} variant="solid" color={t.color}>
                {t.label}
              </Tag>
            ))}
          </div>
          <p className="font-display text-display-h4 lg:text-display-h3 w-[354px] max-w-full font-bold text-white uppercase lg:mt-5 lg:w-full lg:max-w-[1020px]">
            {frontmatter.title}
          </p>
          <p className="font-body text-body-s text-white lg:pt-2">{dateLabel}</p>
        </div>
      </div>

      {/* CMS body + desktop-only left share rail — 12612:7853. `ShareRow` shares
          `Cms`'s own flex-1 column (rather than sitting outside the row as a
          third sibling) so its `mx-auto` centers against the same available
          width `Cms` sees — otherwise, with `ShareRail` claiming space to its
          left, `ShareRow` would center 92px further left than the article body
          above it at desktop. `ShareRow` also sits above this block's closing
          rule, not below it — the bottom-of-section black rule (`12612:8414`'s
          own `Container:margin` wrapper) closes after the share row. */}
      <div className="border-b border-(--color-basic-border) lg:flex lg:items-start">
        <ShareRail
          title={frontmatter.title}
          copyLinkLabel={dict.share.copyLink}
          linkedinLabel={dict.share.linkedin}
          xLabel={dict.share.x}
          facebookLabel={dict.share.facebook}
          className="hidden lg:sticky lg:top-24 lg:mt-[92px] lg:ml-8 lg:flex lg:shrink-0"
        />
        <div className="lg:flex-1">
          <Cms body={entry.Body} />
          <ShareRow locale={locale} title={frontmatter.title} />
        </div>
      </div>

      <RelatedPosts locale={locale} posts={related} labels={detail} filterTags={filter.tags} />

      <NewsletterSignup locale={locale} />
    </article>
  );
}

// Related posts — 12612:8192 (desktop) / 12220:1912 (mobile). Three `Article`
// cards stacked (not a grid, at either breakpoint — confirmed against both
// frames' own metadata), plus a "View all post" CTA to the News index.
// Selection rule (design.md): shared-tag match, most-recent first, excludes
// current slug, capped at 3 (the count both frames draw), recency-only
// fallback when fewer than 3 share a tag — computed by the caller (`page.tsx`).
function RelatedPosts({
  locale,
  posts,
  labels,
  filterTags,
}: {
  locale: Locale;
  posts: RelatedPost[];
  labels: { relatedTagline: string; relatedHeading: string; relatedButton: string };
  filterTags: Record<NewsFilterId, string>;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-(--color-basic-background) py-[30px] lg:py-16">
      <div className="flex items-start gap-[5px] px-[15px] pr-[15px] lg:gap-0 lg:px-8">
        <div className="flex h-[99px] w-[17px] items-center justify-center lg:h-[134px] lg:w-[27px]">
          <div className="flex items-center gap-2.5 rotate-90 lg:translate-y-[-10px] translate-y-2">
            <span aria-hidden className="size-1.75 bg-(--color-brand-primary-green)" />
            <p className="font-body text-label-m whitespace-nowrap text-(--color-basic-accent) uppercase">
              {labels.relatedTagline}
            </p>
          </div>
        </div>
        <p className="font-display text-display-h2 flex-1 font-bold text-(--color-basic-accent) uppercase">
          {labels.relatedHeading}
        </p>
      </div>

      <div className="flex flex-col items-start gap-[30px] px-[15px] pt-[30px] lg:items-end lg:px-8 lg:pt-[60px]">
        <div className="flex w-full flex-col items-start gap-[30px] lg:max-w-[1200px] lg:items-end lg:gap-8">
          {posts.map((post) => (
            <Article
              key={post.slug}
              href={`${localizedHref("news", locale)}/${post.slug}`}
              title={post.title}
              tags={post.tags.map((id) => ({ label: filterTags[id], color: newsTagColor[id] }))}
              dateLabel={formatNewsDateLabel(post.date, locale)}
              image={{ src: post.image, alt: post.title }}
            />
          ))}
        </div>

        <a
          href={localizedHref("news", locale)}
          className="font-body text-label-m flex h-[45px] w-fit items-center justify-center bg-(--color-brand-primary-green) px-11 text-center text-(--color-basic-accent) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
        >
          {labels.relatedButton}
        </a>
      </div>
    </section>
  );
}

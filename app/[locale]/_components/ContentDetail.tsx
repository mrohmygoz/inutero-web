import Cms from "../../_components/Cms";
import ShareRow from "../../_components/ShareRow";
import type { ContentEntry } from "../../_lib/content";

/**
 * Deliberately plain wrapper for an MDX-backed detail page (D-E).
 *
 * This is NOT the designed detail page. Phase 11 replaced it for `portfolio/[slug]` with
 * `PortfolioDetail`, which supplies the hero, meta row, share rail, and pagination footer.
 * `news/[slug]` still renders through here until Phase 14 (6448px tall) builds its own
 * detail component the same way — deleting this now would break that route.
 *
 * Like `PagePlaceholder`, this is throwaway scaffolding — colocated under `[locale]/`,
 * not in `app/_components/` or INVENTORY.md.
 */
export default function ContentDetail({ entry }: { entry: ContentEntry }) {
  return (
    <article>
      <header className="mx-auto w-full max-w-[672px] px-5 pt-10 lg:max-w-[1031px] lg:px-8 lg:pt-[92px]">
        <h1 className="font-display text-display-h4 font-bold text-(--color-basic-text-primary) uppercase">
          {entry.frontmatter.title}
        </h1>
        <p className="font-body text-body-s mt-4 text-(--opacity-neutral-darkest-40)">
          <time dateTime={entry.frontmatter.date}>{entry.frontmatter.date}</time>
        </p>
      </header>
      <Cms body={entry.Body} />
      <ShareRow locale={entry.locale} title={entry.frontmatter.title} />
    </article>
  );
}

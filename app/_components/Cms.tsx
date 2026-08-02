import { Children, isValidElement, type ComponentType, type ImgHTMLAttributes, type ReactNode } from "react";

// Source: desktop CMS 12610:7361; mobile occurrence 12211:4514 (News Details),
// second occurrence 12368:2711 (TC News Details).
//
// Scope (D-D): this is the article-body treatment only. The Figma node also contains a
// left share rail and a bottom share row — both are News-Details / Portfolio-Details page
// chrome, not MDX body elements, and belong to Phases 14 and 11 under D-E. Neither is
// built here.
//
// The design defines exactly five body elements: paragraph, heading, figure image,
// figure caption, and blockquote. Everything below the DERIVED marker has no Figma
// reference and is styled from the site's own tokens so real content does not fall back
// to browser defaults — see openspec/DECISIONS.md.

const bodyText = "font-body text-body-l text-(--color-basic-text-primary) lg:leading-[27.2px]";

// --- Designed elements -----------------------------------------------------------

// Markdown wraps a lone image in a paragraph, which would put <figure>/<figcaption>
// inside <p> — invalid HTML and a hydration error. A paragraph whose only child is the
// figure renders as the figure itself.
function Paragraph({ children }: { children?: ReactNode }) {
  const only = Children.count(children) === 1 ? Children.toArray(children)[0] : null;
  if (isValidElement(only) && only.type === Figure) return only;

  return <p className={`${bodyText} mt-8`}>{children}</p>;
}

// Display/H5 token at mobile (41px). Desktop is a locally-drawn 64px, NOT the desktop
// Display/H5 token — that token's letter-spacing is overridden to -0.78px while this
// heading uses -0.41px. D012: drawn per occurrence, so it is transcribed literally.
function Heading({ children }: { children?: ReactNode }) {
  return (
    <h2 className="font-display text-display-h5 mt-8 font-bold text-(--color-basic-text-primary) uppercase lg:text-[64px] lg:leading-[0.8] lg:tracking-[-0.41px]">
      {children}
    </h2>
  );
}

// Markdown's `title` becomes the caption: ![alt](/src "caption"). `alt` stays real alt
// text rather than being reused as the caption, so a screen reader is not told the same
// sentence twice.
function Figure({ src, alt, title }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <figure className="mt-16 lg:mt-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image needs intrinsic
          width/height, which markdown image syntax cannot carry. Phases 11/14 can swap in
          an explicit <Figure> MDX component once real content lands. */}
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} className="h-auto w-full" loading="lazy" />
      {title ? (
        <figcaption className="mt-3 flex items-stretch gap-3">
          <span aria-hidden className="w-[2px] shrink-0 bg-(--color-basic-border)" />
          <span className="font-body text-body-s text-(--opacity-neutral-darkest-40) lg:text-(--color-basic-text-primary)">
            {title}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

// Alumni Sans SemiBold Italic in the design. fonts.ts loads Alumni Sans at 700 only
// (D023's accepted consequence), so `font-semibold` resolves to the loaded 700 face.
function Blockquote({ children }: { children?: ReactNode }) {
  // Markdown puts the quote text in a nested paragraph. Left alone, that paragraph's
  // Body/L mapping would override the quote's display type, silently rendering a 45px
  // display quote at 16px body size. Unwrap to the paragraph's own children instead.
  const unwrapped = Children.map(children, (child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Paragraph
      ? child.props.children
      : child
  );

  return (
    <blockquote className="my-9 flex items-stretch gap-5 lg:mt-14 lg:mb-6">
      <span aria-hidden className="w-[3px] shrink-0 bg-(--color-brand-primary-green)" />
      <div className="font-display text-[30px] leading-[0.87] font-semibold tracking-[-0.3px] text-(--color-basic-text-primary) italic uppercase lg:text-[45px]">
        {unwrapped}
      </div>
    </blockquote>
  );
}

// --- DERIVED: no Figma reference ---------------------------------------------------

const components = {
  p: Paragraph,
  h2: Heading,
  img: Figure,
  blockquote: Blockquote,

  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-display text-display-h4 mt-8 font-bold text-(--color-basic-text-primary) uppercase">
      {children}
    </h1>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-display text-display-h6 mt-8 font-bold text-(--color-basic-text-primary) uppercase">
      {children}
    </h3>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className={`${bodyText} mt-8 list-disc pl-6`}>{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className={`${bodyText} mt-8 list-decimal pl-6`}>{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="mt-2">{children}</li>,
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="mt-8 border-t border-(--opacity-neutral-darkest-15)" />,
};

export type CmsProps = {
  /** The compiled MDX default export from `app/_lib/content`. */
  body: ComponentType<{ components?: typeof components }>;
  className?: string;
};

export default function Cms({ body: Body, className }: CmsProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[672px] px-5 py-10 lg:max-w-[1031px] lg:px-8 lg:py-[92px] ${
        className ?? ""
      }`.trim()}
    >
      {/* Rhythm exceptions the design sets: a paragraph directly after a heading closes to
          20px, and the first element in the body carries no top margin. */}
      <div className="[&_h2+p]:mt-5 [&>*:first-child]:mt-0">
        <Body components={components} />
      </div>
    </div>
  );
}

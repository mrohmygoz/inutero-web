import type { MDXComponents } from "mdx/types";

/**
 * Deliberately empty (D-D, amended).
 *
 * `@next/mdx` requires this file to exist — the App Router integration does not work
 * without it — so the design decision "no global element map" is expressed by returning
 * nothing rather than by omitting the file.
 *
 * The article-body treatment lives in `app/_components/Cms.tsx` and is passed to the
 * compiled body as a `components` prop, which the MDX runtime spreads *after* this map:
 *
 *   { ...defaults, ...useMDXComponents(), ...props.components }
 *
 * So `<Cms>` always wins, and MDX rendered anywhere else stays unstyled. That matters
 * because the Figma `CMS` node (12610:7361) is an article-body design, not a site-wide
 * markdown theme — a global map here would silently apply it to any future MDX.
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}

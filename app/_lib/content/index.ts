import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { locales, type Locale } from "../i18n";
import { parseFrontmatter, type Frontmatter } from "./frontmatter";

/**
 * The one build-time source of truth for MDX content (D-C).
 *
 * Every consumer — `generateStaticParams`, `generateMetadata`, the page body, and
 * the listing pages Phases 10/13 will add — reads the manifest built here. No route
 * file scans the filesystem itself, because a per-route scan would turn a missing
 * translation into a *smaller route list* (a silently narrower site) instead of the
 * loud build failure D002 requires.
 */

export const contentTypes = ["news", "portfolio"] as const;
export type ContentType = (typeof contentTypes)[number];

export type ContentEntry = {
  type: ContentType;
  locale: Locale;
  slug: string;
  frontmatter: Frontmatter;
  /** The compiled MDX body. Render it inside `<Cms>`, never bare. */
  Body: ComponentType;
  /**
   * Hero + body + `gallery` frontmatter images, combined and deduplicated by `src`,
   * in that order. Empty `alt` for bare `gallery` paths (decorative). Portfolio-only
   * in practice — news entries just get whatever their body embeds.
   */
  galleryImages: { src: string; alt: string }[];
};

export class ContentParityError extends Error {
  constructor(type: ContentType, slug: string, missingLocale: Locale, presentLocale: Locale) {
    super(
      `Missing translation: content/${type}/${presentLocale}/${slug}.mdx exists but ` +
        `content/${type}/${missingLocale}/${slug}.mdx does not. Every slug must exist in ` +
        `both locales — content never falls back to the other locale (D002).`
    );
    this.name = "ContentParityError";
  }
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Filenames minus `.mdx`, sorted. The basename IS the slug — never frontmatter. */
function readSlugs(type: ContentType, locale: Locale): string[] {
  const dir = path.join(CONTENT_ROOT, type, locale);
  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    // A missing directory is an empty locale, which the parity check below reports
    // in terms of the specific slug that lacks a counterpart.
    return [];
  }
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -".mdx".length))
    .sort();
}

/**
 * Slugs for a content type, verified to exist in every locale. Throws naming the
 * slug, the type, and the locale that lacks it.
 */
export function listSlugs(type: ContentType): string[] {
  const byLocale = new Map(locales.map((locale) => [locale, new Set(readSlugs(type, locale))]));

  for (const present of locales) {
    for (const slug of byLocale.get(present)!) {
      for (const missing of locales) {
        if (!byLocale.get(missing)!.has(slug)) {
          throw new ContentParityError(type, slug, missing, present);
        }
      }
    }
  }

  return [...byLocale.get(locales[0])!].sort();
}

// Dynamic import with the content type baked in statically, leaving only the locale
// and slug interpolated — see D-A and the risk table. The bundler turns each of these
// into a context module over its directory.
const loaders: Record<ContentType, (locale: Locale, slug: string) => Promise<unknown>> = {
  news: (locale, slug) => import(`../../../content/news/${locale}/${slug}.mdx`),
  portfolio: (locale, slug) => import(`../../../content/portfolio/${locale}/${slug}.mdx`),
};

const MDX_IMAGE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

/**
 * Images embedded in an `.mdx` file's body (markdown `![alt](src "title")` syntax),
 * in document order. Reads the raw source directly — `getEntry`'s dynamic `import()`
 * only yields the compiled `Body` and `frontmatter` exports, not the markdown text.
 */
function getBodyImages(type: ContentType, locale: Locale, slug: string): { src: string; alt: string }[] {
  const file = path.join(CONTENT_ROOT, type, locale, `${slug}.mdx`);
  const raw = readFileSync(file, "utf-8");
  const body = raw.startsWith("---") ? raw.slice(raw.indexOf("---", 3) + 3) : raw;

  return [...body.matchAll(MDX_IMAGE)].map((match) => ({ src: match[2], alt: match[1] }));
}

/**
 * Loads one entry and validates its frontmatter. Returns `null` only when the file
 * does not exist — the caller turns that into a 404. A file that exists but is
 * malformed throws, because that is an authoring error, not a missing page.
 */
export async function getEntry(
  type: ContentType,
  locale: Locale,
  slug: string
): Promise<ContentEntry | null> {
  if (!listSlugs(type).includes(slug)) return null;

  const mod = (await loaders[type](locale, slug)) as {
    default: ComponentType;
    frontmatter?: unknown;
  };

  const file = `content/${type}/${locale}/${slug}.mdx`;
  const frontmatter = parseFrontmatter(mod.frontmatter, file, type);

  const heroSrc = frontmatter.heroImage || frontmatter.image;
  const sources = [
    ...(heroSrc ? [{ src: heroSrc, alt: "" }] : []),
    ...getBodyImages(type, locale, slug),
    ...frontmatter.gallery.map((src) => ({ src, alt: "" })),
  ];
  const seen = new Set<string>();
  const galleryImages = sources.filter(({ src }) => {
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  });

  return {
    type,
    locale,
    slug,
    frontmatter,
    Body: mod.default,
    galleryImages,
  };
}

/**
 * Every entry of a type, in both locales, with parity and frontmatter both verified.
 * Calling this from `generateStaticParams` is what makes a violation a build failure:
 * it runs before any route is emitted.
 */
export async function getManifest(type: ContentType): Promise<ContentEntry[]> {
  const slugs = listSlugs(type);
  const entries = await Promise.all(
    slugs.flatMap((slug) =>
      locales.map(async (locale) => {
        const entry = await getEntry(type, locale, slug);
        if (!entry) throw new ContentParityError(type, slug, locale, locale);
        return entry;
      })
    )
  );
  return entries;
}

export {
  parseFrontmatter,
  FrontmatterError,
  type Frontmatter,
  type ServiceId,
} from "./frontmatter";

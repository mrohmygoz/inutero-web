/**
 * Frontmatter contract for MDX content (D-B).
 *
 * Validation is a hand-written guard rather than a schema library, matching the
 * precedent D010 set for the i18n dictionaries: three required fields on two
 * content types does not justify a dependency, and a hand-rolled check can name
 * the exact file and field in its failure message.
 *
 * The `frontmatter` export an MDX module produces is genuinely `unknown` — an
 * author can write any YAML — so it is validated here rather than asserted with
 * a `.d.ts` declaration that TypeScript could never actually check.
 */

import { newsFilters, serviceAnchors } from "../routes";

export type ServiceId = (typeof serviceAnchors)[number]["id"];
export type NewsFilterId = (typeof newsFilters)[number]["id"];

const serviceIds: readonly string[] = serviceAnchors.map((a) => a.id);
const newsFilterIds: readonly string[] = newsFilters.map((f) => f.id);

export type Frontmatter = {
  /** Headline shown in listings, page metadata, and the detail page. */
  title: string;
  /** ISO 8601 date (YYYY-MM-DD). Parsed to verify it is a real date. */
  date: string;
  /** Short summary for listings and meta descriptions. */
  excerpt: string;
  /**
   * Service lines this project belongs to — the Portfolio filter's axis.
   * Required and non-empty on `portfolio`, forbidden on `news`, where it is
   * always `[]`. Ids come from `serviceAnchors` so the filter row and the
   * Services page cannot drift apart (Phase 10, D-B).
   */
  services: readonly ServiceId[];
  /**
   * News filter tags — the News listing's filter axis (Phase 13, design.md
   * D-A). Required and non-empty on `news`, forbidden on `portfolio`. An
   * article may carry more than one tag when it genuinely spans categories
   * (e.g. an overseas showcase recap is both Global Touring and Events) —
   * amended from design.md D-B's original one-tag-per-article rule, per user
   * feedback during review (see DECISIONS.md). `newsFilters` in `routes.ts`
   * is the id source, kept independent from `services` above.
   */
  tags: readonly NewsFilterId[];
  /**
   * The card's short date line, e.g. "2025.11 In Utero Present Vol.2". Authored
   * per locale rather than derived from `date`: the series half is translated
   * ("子皿 In Utero Present Vol.2") and the two cannot be composed from one ISO
   * string. Portfolio only; `""` on news.
   */
  dateLabel: string;
  /**
   * Listing-card poster, a path under `public/`. Required on both content
   * types (Phase 13 extended this from portfolio-only, since News's grid
   * needs a real photo per article too — design.md D-D).
   */
  image: string;
  /**
   * Collaborating artists/partners (合作夥伴), shown in the detail page's meta
   * row. Portfolio only, forbidden on news — but unlike `dateLabel`/`image`/
   * `services`, allowed to be `""`: the supplied data omits it for one of the
   * three real projects, and forcing a value would fabricate content (D090).
   */
  client: string;
  /**
   * Detail-page hero background, a path under `public/`. Optional on both
   * content types — falls back to `image` (the listing poster) when absent,
   * which is what every entry did before this field existed. Lets an article
   * or project use a real supplied photo for its hero distinct from its
   * listing-card poster (Phase 14 widened this from portfolio-only to also
   * allow `news`).
   */
  heroImage: string;
  /**
   * Additional gallery photos, paths under `public/`, beyond what the article body
   * already embeds — for projects with more supplied photography than reads well
   * inline. Portfolio only; `[]` on news and when absent.
   */
  gallery: readonly string[];
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export class FrontmatterError extends Error {
  constructor(file: string, field: string, problem: string) {
    super(`Invalid frontmatter in ${file}: field "${field}" ${problem}.`);
    this.name = "FrontmatterError";
  }
}

/**
 * Validates a raw `frontmatter` export. Throws naming the file and the offending
 * field — a missing or mistyped field must fail the build, never be coerced.
 */
export function parseFrontmatter(
  raw: unknown,
  file: string,
  type: "news" | "portfolio",
): Frontmatter {
  if (typeof raw !== "object" || raw === null) {
    throw new FrontmatterError(
      file,
      "(root)",
      "is missing — the file declares no frontmatter block",
    );
  }

  const record = raw as Record<string, unknown>;

  for (const field of ["title", "date", "excerpt"] as const) {
    const value = record[field];
    if (value === undefined) {
      throw new FrontmatterError(file, field, "is required but missing");
    }
    if (typeof value !== "string") {
      throw new FrontmatterError(
        file,
        field,
        `must be a string, got ${typeof value}`,
      );
    }
    if (value.trim() === "") {
      throw new FrontmatterError(file, field, "must not be empty");
    }
  }

  const date = record.date as string;
  if (!ISO_DATE.test(date) || Number.isNaN(Date.parse(date))) {
    throw new FrontmatterError(
      file,
      "date",
      `must be an ISO date (YYYY-MM-DD), got "${date}"`,
    );
  }

  return {
    title: record.title as string,
    date,
    excerpt: record.excerpt as string,
    services: parseServices(record.services, file, type),
    tags: parseTags(record.tags, file, type),
    dateLabel: parsePortfolioString(record.dateLabel, "dateLabel", file, type),
    image: parseRequiredString(record.image, "image", file),
    client: parseOptionalPortfolioString(record.client, "client", file, type),
    heroImage: parseOptionalString(record.heroImage, "heroImage", file),
    gallery: parseGallery(record.gallery, file, type),
  };
}

/** Optional list of image paths. Absent or `[]` on portfolio; forbidden on news. */
function parseGallery(
  raw: unknown,
  file: string,
  type: "news" | "portfolio",
): readonly string[] {
  if (type === "news") {
    if (raw !== undefined) {
      throw new FrontmatterError(file, "gallery", "is only valid on portfolio entries");
    }
    return [];
  }

  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.some((value) => typeof value !== "string")) {
    throw new FrontmatterError(file, "gallery", "must be a list of image path strings");
  }
  return raw as string[];
}

/** Required and non-empty on both content types. */
function parseRequiredString(raw: unknown, field: string, file: string): string {
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new FrontmatterError(file, field, "is required and must be a non-empty string");
  }
  return raw;
}

/** Required non-empty list on news (each a `newsFilters` id), forbidden on portfolio. */
function parseTags(
  raw: unknown,
  file: string,
  type: "news" | "portfolio",
): readonly NewsFilterId[] {
  if (type === "portfolio") {
    if (raw !== undefined) {
      throw new FrontmatterError(file, "tags", "is only valid on news entries");
    }
    return [];
  }

  if (!Array.isArray(raw) || raw.length === 0) {
    throw new FrontmatterError(file, "tags", "must be a non-empty list of news filter ids");
  }

  for (const value of raw) {
    if (typeof value !== "string" || !newsFilterIds.includes(value)) {
      throw new FrontmatterError(
        file,
        "tags",
        `contains ${JSON.stringify(value)}, which is not a known news filter id (${newsFilterIds.join(", ")})`,
      );
    }
  }

  return raw as NewsFilterId[];
}

/** Required and non-empty on portfolio, forbidden on news. */
function parsePortfolioString(
  raw: unknown,
  field: string,
  file: string,
  type: "news" | "portfolio",
): string {
  if (type === "news") {
    if (raw !== undefined) {
      throw new FrontmatterError(
        file,
        field,
        "is only valid on portfolio entries",
      );
    }
    return "";
  }
  if (raw === undefined) {
    throw new FrontmatterError(file, field, "is required but missing");
  }
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new FrontmatterError(file, field, "must be a non-empty string");
  }
  return raw;
}

/** Optional on both content types — absent yields `""`. */
function parseOptionalString(raw: unknown, field: string, file: string): string {
  if (raw === undefined) return "";
  if (typeof raw !== "string") {
    throw new FrontmatterError(file, field, `must be a string, got ${typeof raw}`);
  }
  return raw;
}

/**
 * Allowed absent (`undefined`) or empty on portfolio — the one field in the
 * contract that is optional-but-typed rather than required-but-typed, since
 * the supplied data has no value for one of the three real projects. Still
 * forbidden (must be absent) on news, matching the other portfolio-only
 * fields.
 */
function parseOptionalPortfolioString(
  raw: unknown,
  field: string,
  file: string,
  type: "news" | "portfolio",
): string {
  if (type === "news") {
    if (raw !== undefined) {
      throw new FrontmatterError(
        file,
        field,
        "is only valid on portfolio entries",
      );
    }
    return "";
  }
  if (raw === undefined) return "";
  if (typeof raw !== "string") {
    throw new FrontmatterError(file, field, `must be a string, got ${typeof raw}`);
  }
  return raw;
}

function parseServices(
  raw: unknown,
  file: string,
  type: "news" | "portfolio",
): readonly ServiceId[] {
  if (type === "news") {
    if (raw !== undefined) {
      throw new FrontmatterError(
        file,
        "services",
        "is only valid on portfolio entries",
      );
    }
    return [];
  }

  if (raw === undefined) {
    throw new FrontmatterError(file, "services", "is required but missing");
  }
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new FrontmatterError(
      file,
      "services",
      "must be a non-empty list of service ids",
    );
  }

  for (const value of raw) {
    if (typeof value !== "string" || !serviceIds.includes(value)) {
      throw new FrontmatterError(
        file,
        "services",
        `contains "${String(value)}", which is not a known service id (${serviceIds.join(", ")})`,
      );
    }
  }

  return raw as ServiceId[];
}

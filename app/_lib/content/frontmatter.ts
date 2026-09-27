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

import { serviceAnchors } from "../routes";

export type ServiceId = (typeof serviceAnchors)[number]["id"];

const serviceIds: readonly string[] = serviceAnchors.map((a) => a.id);

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
   * The card's short date line, e.g. "2025.11 In Utero Present Vol.2". Authored
   * per locale rather than derived from `date`: the series half is translated
   * ("子皿 In Utero Present Vol.2") and the two cannot be composed from one ISO
   * string. Portfolio only; `""` on news.
   */
  dateLabel: string;
  /** Listing-card poster, a path under `public/`. Portfolio only; `""` on news. */
  image: string;
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
    dateLabel: parsePortfolioString(record.dateLabel, "dateLabel", file, type),
    image: parsePortfolioString(record.image, "image", file, type),
  };
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

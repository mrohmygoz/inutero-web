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

export type Frontmatter = {
  /** Headline shown in listings, page metadata, and the detail page. */
  title: string;
  /** ISO 8601 date (YYYY-MM-DD). Parsed to verify it is a real date. */
  date: string;
  /** Short summary for listings and meta descriptions. */
  excerpt: string;
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
export function parseFrontmatter(raw: unknown, file: string): Frontmatter {
  if (typeof raw !== "object" || raw === null) {
    throw new FrontmatterError(file, "(root)", "is missing — the file declares no frontmatter block");
  }

  const record = raw as Record<string, unknown>;

  for (const field of ["title", "date", "excerpt"] as const) {
    const value = record[field];
    if (value === undefined) {
      throw new FrontmatterError(file, field, "is required but missing");
    }
    if (typeof value !== "string") {
      throw new FrontmatterError(file, field, `must be a string, got ${typeof value}`);
    }
    if (value.trim() === "") {
      throw new FrontmatterError(file, field, "must not be empty");
    }
  }

  const date = record.date as string;
  if (!ISO_DATE.test(date) || Number.isNaN(Date.parse(date))) {
    throw new FrontmatterError(file, "date", `must be an ISO date (YYYY-MM-DD), got "${date}"`);
  }

  return {
    title: record.title as string,
    date,
    excerpt: record.excerpt as string,
  };
}

import Cta from "./Cta";
import { getDictionary, type Locale } from "../_lib/i18n";

// Source: desktop NewsletterSignup 12612:8163; mobile symbol 12212:6048 ("Section",
// 393x425, News), instanced on News Details (12212:6049) and TC News Details (12389:6080).
//
// This is NOT the newsletter block inside Footer.tsx. The survey (design.md → Survey
// Findings) established they are genuinely different designs: the Footer block has a small
// green Label/M heading plus a disclaimer line and sits as one of three columns on a light
// surface; this is a standalone full-width dark section with a Display/H3 heading and no
// disclaimer. Footer.tsx keeps its own.
//
// D-F: with no `action`, the field and button render as inert markup — the button is
// `type="button"` and there is no form submit target. No newsletter endpoint exists and
// none is in scope (the one planned Route Handler is Phase 15's contact form). A <form>
// with no action would GET the current URL and visibly reload the page, which is worse
// than doing nothing; the same reasoning D022 applied to the Footer's legal links.

export default function NewsletterSignup({
  locale,
  action,
}: {
  locale: Locale;
  /** Submit target. Omit for the inert presentational block. */
  action?: string;
}) {
  const t = getDictionary(locale).newsletter;

  const field = (
    <label className="flex w-full flex-1 items-center border-b border-(--color-basic-foreground) py-3">
      <span className="sr-only">{t.placeholder}</span>
      <input
        type="email"
        name="email"
        placeholder={t.placeholder}
        className="font-body text-body-s w-full bg-transparent text-center text-(--opacity-white-50) outline-none lg:text-left"
      />
    </label>
  );

  const submit = (
    <Cta tone="green" {...(action ? { type: "submit" as const } : {})}>
      {t.button}
    </Cta>
  );

  return (
    <section className="w-full border-y border-(--opacity-white-10) bg-(--color-basic-accent) lg:border-y-0">
      <div className="mx-auto w-full max-w-[576px] px-5 py-[26px] lg:max-w-none lg:px-8 lg:py-16">
        <div className="lg:flex lg:flex-col lg:items-end lg:gap-16">
          <div className="w-full">
            <h2 className="font-display text-display-h3 font-bold text-(--color-basic-foreground) uppercase">
              {t.heading}
            </h2>
            <p className="font-body text-body-m mt-4 text-(--opacity-white-50) lg:mt-6">
              {t.description}
            </p>
          </div>

          {action ? (
            <form
              action={action}
              className="mt-[30px] flex w-full flex-col gap-[29px] lg:mt-0 lg:max-w-[750px] lg:flex-row lg:items-start lg:gap-7"
            >
              {field}
              {submit}
            </form>
          ) : (
            <div className="mt-[30px] flex w-full flex-col gap-[29px] lg:mt-0 lg:max-w-[750px] lg:flex-row lg:items-start lg:gap-7">
              {field}
              {submit}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

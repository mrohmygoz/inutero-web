import Cta from "./Cta";
import { getDictionary, type Locale } from "../_lib/i18n";

// Source: desktop UniversalCTA 12653:5649 (EN 12573:9014 / CN 12653:5650);
// mobile symbol 12212:5282 ("CTA", 393x734, Home), instanced on Services (12220:2432)
// and TC Home (12368:2429). One responsive component, `lg` switch per D009/D021.
//
// Two structural differences between the breakpoints, so this is genuinely responsive
// rather than one layout that reflows:
//   - Mobile stacks heading / button / contact in a `justify-between` column; desktop
//     puts the heading top-left and pairs button + contact in a row near the bottom.
//   - Backgrounds differ: a radial noise circle in `mix-blend-darken` at mobile vs. a
//     full-bleed grain PNG at desktop, and the gradients run at different angles.
//
// The heading and the "General Inquiries" label stay English in BOTH locales — that is
// what the CN/TC frames show, not an untranslated string (Survey Findings in design.md).

const CONTACT_EMAIL = "contact@inuteromusic.com";

export default function UniversalCTA({ locale, href }: { locale: Locale; href: string }) {
  const t = getDictionary(locale).universalCta;

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(221.64deg,#08c454_16.127%,#52c850_54.764%,#27a65a_95.835%)] lg:bg-[linear-gradient(195.16deg,#08c454_23.243%,#52c850_53.763%,#27a65a_86.206%)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative background
          textures, sized by CSS rather than by intrinsic dimensions. */}
      <img
        src="/images/universal-cta-glow.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-[107px] -left-[5px] size-[546px] mix-blend-darken lg:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/universal-cta-grain.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden size-full object-cover lg:block"
      />

      {/* Mobile: 393x734 with a 617px column inset 12px/62px. */}
      <div className="relative flex h-[734px] flex-col justify-between px-3 pt-[62px] pb-[55px] lg:hidden">
        {/* Mobile lets Display/Jumbo wrap naturally across four lines. */}
        <h2 className="font-display text-display-jumbo font-bold text-(--color-basic-accent) uppercase">
          {t.headingLine1} {t.headingLine2}
        </h2>
        <Cta href={href} tone="dark">
          {t.button}
        </Cta>
        <div>
          <p className="font-display text-display-h6 font-bold text-(--color-basic-text-primary) uppercase">
            {t.inquiriesLabel}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-body text-body-m text-(--color-basic-text-primary) underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* Desktop: 1440x780. The heading size (288px/187.238px/-3px) is locally drawn —
          no token carries it (desktop Jumbo is 246px, H1 220px). D012. */}
      <div className="relative hidden h-[780px] px-8 pt-[68px] lg:block">
        {/* Desktop draws the two lines as separate text nodes, each nowrap — it is a
            deliberate two-line lockup, not a wrap that happens to break there. */}
        <h2 className="font-display text-[288px] leading-[187.238px] font-bold tracking-[-3px] text-(--color-basic-accent) uppercase">
          <span className="block whitespace-nowrap">{t.headingLine1}</span>
          <span className="block whitespace-nowrap">{t.headingLine2}</span>
        </h2>
        <div className="absolute top-[667px] left-8 flex items-center gap-[34px]">
          <Cta href={href} tone="dark">
            {t.button}
          </Cta>
          <div>
            <p className="font-display text-display-h6 font-bold text-(--color-basic-text-primary) uppercase">
              {t.inquiriesLabel}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-body-m text-(--color-basic-text-primary) underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

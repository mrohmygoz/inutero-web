import Cta from "../../_components/Cta";
import { getDictionary, type Locale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";
import HeroCursorTrail from "./HeroCursorTrail";
import MastPhotoCycle from "./MastPhotoCycle";

// Source: desktop Hero 12405:6947 (TC 0:187); mobile is two nodes — Mast
// 10275:3094 + the green copy panel `Component 1` 12217:911 (TC 12368:2414 /
// 12368:2415). Page-local, not a shared component: one consumer, no variant
// surface beyond locale (D-A).
//
// Two sibling subtrees, not one repositioned tree (D-C) — the desktop frame is
// a placed collage and the mobile frame is a flow column; they share copy and
// nothing else. The stacked subtree runs below 1024px; the collage engages at
// `lg:` and is uniformly scaled to the viewport by `canvas-1440` (D040), so its
// drawn geometry is preserved at every width rather than re-derived.
//
// The headline is four staggered words alternating white / accent-neon, each
// `mix-blend-hard-light` at 96% opacity over the photography.
//
// `scroll down` stays English in both locales — the TC frames draw it that way
// (I12368:2415;10275:3143), so it is a literal in both dictionaries.

// The four words are English in both locales, so they pin the Latin display
// sizes rather than inheriting the Chinese scale (see globals.css).
const HEADLINE_MOBILE =
  "tokens-headline-h1-latin font-display text-display-h1 absolute mix-blend-hard-light opacity-96 uppercase whitespace-nowrap";
const HEADLINE_DESKTOP =
  "tokens-headline-jumbo-latin font-display text-display-jumbo mix-blend-hard-light opacity-96 uppercase whitespace-nowrap";

export default function HomeHero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).home;
  const workHref = localizedHref("portfolio", locale);
  const contactHref = localizedHref("contact", locale);

  const scrollLabel = (
    <span className="font-body text-body-xs bg-(--color-basic-background) px-1 text-center whitespace-nowrap text-(--color-basic-accent)">
      {hero.scrollLabel}
    </span>
  );

  const secondaryLink = (
    <a
      href={contactHref}
      className="font-body text-label-m border-b border-(--color-basic-background) text-center uppercase text-(--color-basic-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-basic-accent)"
    >
      {hero.ctaSecondary}
    </a>
  );

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="lg:hidden">
        {/* Mast 10275:3094 — 665px tall, full-bleed photo under a 30% scrim.
            The photo is not a still: the Mast is a five-variant set wired to a
            timed dissolve in the prototype. See MastPhotoCycle. */}
        <div className="relative min-h-135 w-full overflow-hidden bg-(--color-basic-accent)">
          <MastPhotoCycle />
          <div aria-hidden className="absolute inset-0 bg-black/30" />

          <h1 className="sr-only">
            {`${hero.headlineWord1} ${hero.headlineWord2}, ${hero.headlineWord3} ${hero.headlineWord4}`}
          </h1>
          <p
            aria-hidden
            className={`${HEADLINE_MOBILE}  top-[86px] left-[10px] text-(--color-basic-background)`}
          >
            {hero.headlineWord1}
          </p>
          <p
            aria-hidden
            className={`${HEADLINE_MOBILE}  top-[159px] left-[10px] text-(--color-brand-accent-neon)`}
          >
            {hero.headlineWord2}
          </p>
          {/* Bottom-anchored (not top-[483px]/top-[559px] against the old
              665px frame) so the pair still sits flush to the bottom edge now
              that the box grows to min-h-dvh — the gap between them and the
              distance to the box's bottom edge match the original 665px
              frame's spacing. */}
          <p
            aria-hidden
            className={`${HEADLINE_MOBILE}  bottom-[108px] left-[10px] text-(--color-basic-background)`}
          >
            {hero.headlineWord3}
          </p>
          <p
            aria-hidden
            className={`${HEADLINE_MOBILE}  bottom-[32px] right-[10px] text-(--color-brand-accent-neon)`}
          >
            {hero.headlineWord4}
          </p>
        </div>

        {/* Green copy panel 12217:911 — the scroll label overlaps its left edge */}
        <div className="relative flex items-start justify-center bg-(--color-brand-primary-green) py-[35px]">
          <div className="absolute top-[25px] left-0 flex h-[88px] w-[18px] items-center justify-center">
            <div className="rotate-90">{scrollLabel}</div>
          </div>

          <div className="flex w-[calc(100%-31px)] max-w-[362px] flex-col items-end gap-[28px]">
            <p className="font-body text-body-l w-[301px] max-w-full text-(--color-basic-accent)">
              {hero.body}
            </p>
            <div className="flex w-full flex-col items-center gap-[21px]">
              <Cta href={workHref} tone="dark">
                {hero.ctaPrimary}
              </Cta>
              {secondaryLink}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Collage — fluid above 1024px, no max-width cap (phase 16i,        */}
      {/* superseding D040's canvas-1440 scale for this section — see       */}
      {/* openspec/DECISIONS.md). Ported from the Figma Make reference      */}
      {/* (fileKey myqsxGwnrcNHEdsE2SFZXk, src/app/HomeHero.tsx): `clamp()`  */}
      {/* headline sizing with `%`-based vertical anchors, fixed-px         */}
      {/* horizontal gutters, and a `min(558px, 42%)`-capped CTA panel.      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative hidden h-screen min-h-[640px] bg-(--color-basic-accent) lg:block">
        <HeroCursorTrail />

        {/* image 29 (12405:6948). Figma stacks an OPAQUE #131417 fill over the
            photo inside a 40%-opacity wrapper, so the result is 40% of the
            section's own background colour — the photo contributes nothing
            visible. Reproduced as that flat rectangle rather than shipping a
            300KB download that renders invisible. Kept at its drawn 1440px
            coordinates: it is invisible, so fluid repositioning has no
            visible effect either way. */}
        <div
          aria-hidden
          className="absolute top-[209px] left-[300px] h-[570px] w-[337px] bg-(--color-basic-accent) opacity-40"
        />

        <h1 className="sr-only">
          {`${hero.headlineWord1} ${hero.headlineWord2}, ${hero.headlineWord3} ${hero.headlineWord4}`}
        </h1>

        <div className="absolute top-[15%] left-[32px]">
          <p aria-hidden className={`${HEADLINE_DESKTOP} text-(--color-basic-background)`}>
            {hero.headlineWord1}
          </p>
          <p aria-hidden className={`${HEADLINE_DESKTOP} text-(--color-brand-accent-neon)`}>
            {hero.headlineWord2}
          </p>
        </div>
        <div className="absolute right-[30px] bottom-[12%] text-right">
          <p aria-hidden className={`${HEADLINE_DESKTOP} text-(--color-basic-background)`}>
            {hero.headlineWord3}
          </p>
          <p aria-hidden className={`${HEADLINE_DESKTOP} text-(--color-brand-accent-neon)`}>
            {hero.headlineWord4}
          </p>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 flex items-center justify-center"
          style={{ left: 16, bottom: "38%", height: 88, width: 18 }}
        >
          <div className="rotate-90">{scrollLabel}</div>
        </div>

        {/* Green panel 12405:6973 — `min(558px, 42%)` per the Make reference,
            so it never grows past its drawn 558px width even on very wide
            viewports. Body/CTA are children (flow, not absolute) so they stay
            correctly placed as the panel's width changes. */}
        <div
          className="absolute bottom-0 left-0 flex flex-col gap-[40px] bg-(--color-brand-primary-green) py-[32px] pr-[37px] pl-[85px]"
          style={{ width: "min(558px, 42%)" }}
        >
          <p className="font-body text-body-l text-(--color-basic-accent)">{hero.body}</p>
          <div className="flex items-center gap-[45px]">
            <Cta href={workHref} tone="dark">
              {hero.ctaPrimary}
            </Cta>
            {secondaryLink}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Cta from "../../_components/Cta";
import Eyebrow from "../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";
import MissionCursorReveal from "./MissionCursorReveal";

// Source: desktop Intro 12405:6419 (TC 0:254); mobile Intro 12212:6318 (TC
// 12368:2416). Page-local, not shared: one consumer (D-A).
//
// Two sibling subtrees (D-C), switching at `lg:` (1024px, D040). The intro is a
// FLOW section, not a placed canvas — it reflows rather than scaling, so it does
// not use `canvas-1440`. Desktop puts the heading top-left with the image
// overlapping its lower right and the body/CTA anchored bottom-right; mobile is
// a plain column. The mobile TC frame confirmed the same tree as mobile EN —
// its shorter height is text reflow (Display/H2 is 43px in Chinese vs 87px in
// English), not a different layout.
//
// The heading is a gradient-filled display line. Only the first stop is a token
// (--color-brand-primary-green); the mid and end greens exist solely in this
// gradient and have no variable behind them, so they are written literally here
// rather than invented as tokens. The two frames use different angles.
const HEADING_GRADIENT_DESKTOP =
  "linear-gradient(192.00409032294647deg, rgb(8, 196, 84) 21.759%, rgb(82, 200, 80) 53.972%, rgb(39, 166, 90) 88.215%)";
const HEADING_GRADIENT_MOBILE =
  "linear-gradient(210.43759505737597deg, rgb(8, 196, 84) 16.127%, rgb(82, 200, 80) 54.764%, rgb(39, 166, 90) 95.835%)";

export default function HomeIntro({ locale }: { locale: Locale }) {
  const { intro } = getDictionary(locale).home;
  const aboutHref = localizedHref("about", locale);
  const sectionRef = useRef<HTMLDivElement>(null);

  const body = intro.bodyParagraphs.map((paragraph) => (
    <p key={paragraph} className="font-body text-body-l text-(--color-basic-accent)">
      {paragraph}
    </p>
  ));

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-[41px] bg-(--color-basic-background) pt-[30px] pb-[60px] lg:hidden">
        <div className="flex w-full items-start gap-[5px] pr-[15px]">
          <Eyebrow
            label={intro.eyebrow}
            className="flex h-[92px] w-[17px] shrink-0 items-center justify-center translate-y-2 lg:translate-y-0"
          />
          <div className="flex w-[346px] max-w-full flex-col justify-center pt-[20px]">
            <h2
              className="font-display text-display-h2 w-full bg-clip-text whitespace-pre-line uppercase text-transparent"
              style={{ backgroundImage: HEADING_GRADIENT_MOBILE }}
            >
              {intro.headline}
            </h2>
          </div>
        </div>

        <div className="flex w-[363px] max-w-[calc(100%-30px)] flex-col items-start gap-[24px]">
          <div className="relative h-[314px] w-full">
            <Image
              src="/images/home/intro.jpg"
              alt=""
              fill
              sizes="(max-width: 393px) 100vw, 363px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">{body}</div>
          <Cta href={aboutHref} tone="green" className="w-full">
            {intro.cta}
          </Cta>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop — reflowing from 1024px up (D040); the heading is fluid    */}
      {/* and the overlap photo is a cursor-follow reveal, not a statically  */}
      {/* anchored overlap — phase 16i, superseding D040's accepted costs    */}
      {/* for this section (see openspec/DECISIONS.md). Ported from the      */}
      {/* Figma Make reference's `missionRef`/`updateMissionImg` (fileKey    */}
      {/* myqsxGwnrcNHEdsE2SFZXk, src/app/App.tsx). No max-width cap — Make's   */}
      {/* own Mission section is uncapped too, and it's safe here because the  */}
      {/* heading is `intro.headlineLines`, hardcoded per-line (one `<p>` each, */}
      {/* matching Make's own `<p>`-per-line heading) rather than one           */}
      {/* auto-wrapping string, so it can never reflow into a different line   */}
      {/* count at any width — the thing that made the cap load-bearing        */}
      {/* before (see openspec/DECISIONS.md D124) no longer applies.           */}
      {/* ---------------------------------------------------------------- */}
      <section
        ref={sectionRef}
        className="relative hidden bg-(--color-basic-background) lg:block"
      >
        <div className="w-full pt-[138px] pb-[68px]">
          {/* The right margin is width-dependent, so like the mobile photo
              above it keeps the frame's proportion (231/1440) rather than a
              fixed px value that would squeeze the heading column as the page
              narrows. The left gutter stays 32px — it is the page gutter the
              NAV uses. */}
          <div className="flex items-start pr-[16.042%] pl-[32px]">
            <Eyebrow
              label={intro.eyebrow}
              className="flex h-[97px] w-[27px] shrink-0 items-center justify-center py-[15px] translate-y-2 lg:translate-y-0"
            />
            <div className="min-w-px flex-1">
              <h2 className="sr-only">{intro.headline}</h2>
              {intro.headlineLines.map((line) => (
                <p
                  key={line}
                  aria-hidden
                  className="home-intro-heading font-display block bg-clip-text whitespace-nowrap uppercase text-transparent"
                  style={{
                    backgroundImage: HEADING_GRADIENT_DESKTOP,
                    fontSize: "var(--intro-h2-size)",
                    lineHeight: "var(--intro-h2-line-height)",
                    letterSpacing: "var(--intro-h2-letter-spacing)",
                    fontWeight: "var(--intro-h2-weight)",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-[98px] flex justify-end pr-[32px]">
            <div className="flex w-[418px] flex-col items-start gap-[20px]">
              <div className="flex flex-col pt-[20px]">{body}</div>
              <Cta href={aboutHref} tone="green">
                {intro.cta}
              </Cta>
            </div>
          </div>
        </div>

        {/* image 21 (12405:6432) — inverted against the heading via a white
            fill in difference mode, exactly as the frame composites it.
            Cursor-follow reveal (phase 16i) instead of a fixed overlap offset:
            it tracks the pointer within the section's own bounds, so it can
            never collide with the heading regardless of its line count. */}
        <MissionCursorReveal sectionRef={sectionRef} />
      </section>
    </>
  );
}

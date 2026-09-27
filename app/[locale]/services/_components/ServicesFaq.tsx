"use client";

import { useState } from "react";
import Image from "next/image";
import AccordionPanel from "../../../_components/AccordionPanel";
import Eyebrow from "../../../_components/Eyebrow";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:6686 (TC I12635:12925;12573:6686); mobile FAQ
// 12220:2269 (TC 12368:2828). Page-local — one consumer (D033).
//
// The accordion behaviour is DESIGNED: all four frames draw row 1 with an answer
// and a green "×" and rows 2-5 with a black "+" and no answer, which is a
// single-open accordion in its default state. A deep node.reactions sweep of all
// four subtrees returned NOTHING — there is no FAQ row component set and no
// prototype anywhere, unlike Home's accordion (D041). So the timing is not drawn
// here; it is inherited from D041 so the site has one accordion motion rather
// than two.
//
// Panel mechanics come from the shared AccordionPanel, promoted out of
// HomeServices for this consumer. Nothing else is shared: this accordion is on a
// LIGHT surface with the icon on the right, body type, uniform hairline rules and
// a two-tone icon pair, against Home's dark surface, left icon, display type and
// variable-weight borders.
//
// Icons are their own exports (faq-open / faq-close), not Home's accordion pair:
// the "+" is #131417 and the "×" is #08C454, where Home's are both neon #38FF88.
// currentColor cannot serve two colours in one row set. As on Home, the glyphs
// are different shapes rather than one rotated 45deg, so they cross-fade.
function FaqIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-full">
      <Image
        src="/icons/faq-open.svg"
        alt=""
        width={36}
        height={36}
        className={`absolute inset-0 block size-full transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src="/icons/faq-close.svg"
        alt=""
        width={36}
        height={36}
        className={`absolute inset-0 block size-full transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

export default function ServicesFaq({ locale }: { locale: Locale }) {
  const { faq } = getDictionary(locale).services;
  const [openIndex, setOpenIndex] = useState(0);

  const heading = (
    <h2 className="font-display text-display-h2 w-full text-(--color-basic-text-primary) uppercase">
      {faq.heading}
    </h2>
  );

  return (
    <section className="w-full bg-(--color-basic-background) lg:flex lg:items-start lg:border-b-[1.572px] lg:border-(--color-basic-border) lg:px-[32px] lg:pt-[64px] lg:pb-[65.572px]">
      {/* ------------------------------------------------------------------ */}
      {/* Header — two genuinely different blocks, not one repositioned tree. */}
      {/* Mobile stacks it above the rows inside a py-[30px] band; desktop     */}
      {/* puts it in the left half of a two-column split (D-F).               */}
      {/* ------------------------------------------------------------------ */}
      <div className="py-[30px] lg:hidden">
        <div className="flex w-full items-start gap-[5px] pr-[15px]">
          {/* 78px, not the `h-[99px]` the export prints. Figma HUGs the
              rotated Tagline Wrapper rather than fixing it: the box is 71px in
              EN and 78px in TC, and 99 is the component default resolved in a
              single mode — the D071 trap. 78 is right for both, because the
              heading column (142px) dominates in EN and the eyebrow (78px)
              dominates in TC, which is exactly what the two frames measure. */}
          <Eyebrow
            label={faq.eyebrow}
            className="flex h-[78px] w-[17px] shrink-0 items-center justify-center"
            gutterInset
          />
          <div className="flex min-w-px flex-1 flex-col items-center justify-center pt-[20px]">
            {heading}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:min-w-px lg:flex-1 lg:items-start">
        <div className="w-[27px] shrink-0 py-[15px]">
          <Eyebrow label={faq.eyebrow} className="flex h-[47px] items-center justify-center" />
        </div>
        {heading}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Rows — ONE tree at both breakpoints. The two designs differ only in  */}
      {/* gap, answer width and answer colour, which lg: expresses cleanly.    */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full max-w-[576px] px-[20px] py-[56px] lg:max-w-none lg:min-w-px lg:flex-1 lg:px-[32px] lg:py-[48px]">
        <div className="pt-[48px] lg:pt-0">
          <div className="w-full border-b-[0.542px] border-(--color-basic-border) lg:border-b-[0.524px]">
            {faq.items.map((item, index) => {
              const open = index === openIndex;
              return (
                <div
                  key={item.question}
                  className="w-full border-t-[0.542px] border-(--color-basic-border) lg:border-t-[0.524px]"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`services-faq-panel-${index}`}
                      id={`services-faq-trigger-${index}`}
                      onClick={() => setOpenIndex(index)}
                      className="flex w-full cursor-pointer items-center gap-[19px] py-[16px] text-left lg:gap-[30px]"
                    >
                      {/* flex-1 against a 36px icon reproduces the frames' own
                          text widths exactly: 298px at 393 and 558px at 1440. */}
                      <span className="font-body text-body-l min-w-px flex-1 text-(--primitive-neutral-darker)">
                        {item.question}
                      </span>
                      <span className="block size-[36px] shrink-0">
                        <FaqIcon open={open} />
                      </span>
                    </button>
                  </h3>
                  <AccordionPanel
                    id={`services-faq-panel-${index}`}
                    labelledBy={`services-faq-trigger-${index}`}
                    open={open}
                  >
                    {/* The answer is narrower than its column at desktop (529 of
                        624) and full-width at mobile, and the two breakpoints
                        genuinely use different colours — 60% black at mobile,
                        solid at desktop. Both are what the frames export. */}
                    <p className="font-body text-body-xs pb-[20px] text-(--opacity-neutral-darkest-60) lg:max-w-[529px] lg:text-(--color-basic-text-primary)">
                      {item.answer}
                    </p>
                  </AccordionPanel>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

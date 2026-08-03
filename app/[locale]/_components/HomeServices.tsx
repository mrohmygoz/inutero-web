"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Cta from "../../_components/Cta";
import { getDictionary, type Locale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";

// Source: desktop Services 12210:2346 (TC I12635:15868;12210:2346); mobile Services
// 10275:2585 (TC 12368:4727). Page-local, not shared: one consumer (D033). The
// Services *page* (Phase 8-9) has its own accordion and its own frames — this is a
// summary and is deliberately not promoted to app/_components/.
//
// A FLOW section, not a placed canvas (D040): desktop is 1535px tall in English and
// 1377px in Chinese, so a fixed-aspect canvas would letterbox one locale or squash
// the other. It reflows instead.
//
// The accordion is INTERACTIVE and its behaviour is DESIGNED, not derived. The mobile
// Services section is a component set (`10275:2617`) with four variants — Default plus
// Variant2/3/4, one per open item — and each item's `Tab` instance carries a prototype
// reaction: ON_CLICK -> CHANGE_TO the sibling variant, transition SMART_ANIMATE,
// easing EASE_OUT, duration 0.3s. Exactly one item is open at a time, and the
// open/close is a 300ms ease-out height animation, not a snap.
//
// Smart-animate is reproduced with a `grid-template-rows: 0fr -> 1fr` transition: it
// animates to the content's natural height without hardcoding one, and the rows below
// slide as the panel grows. Panels stay mounted (so there is something to animate) and
// are `inert` while closed, which keeps their copy out of the a11y tree and tab order.
//
// Figma draws both icon glyphs — a green "×" on the open row, a green "+" on the
// closed ones. They are NOT one glyph rotated (the × sits at inset 33.13%, the + at
// 26.64%), so the two exported SVGs cross-fade over the same 300ms rather than one
// rotating 45°, which would draw the × larger than designed.
//
// The photograph is absolutely positioned behind the accordion. In the frames it sits
// at a fixed offset that does not track the accordion, which drifts 72px between the
// two desktop locales (EN puts it level with the accordion top, TC 72px below it).
// Anchored to the accordion block here instead, so it stays behind the panel in both
// locales — derived, ≤8px from either drawn frame.

// The desktop dot (12561:4180). #00ea17 has no variable behind it — it is not in
// openspec/reference/design-tokens.md — so it is written literally here rather than
// invented as a token, same call as HomeIntro's heading gradient.
const DOT_GREEN = "#00ea17";

// Both glyphs are stacked and cross-faded, so the swap animates over the same 300ms
// as the panel rather than popping.
function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-full">
      <Image
        src="/icons/accordion-open.svg"
        alt=""
        width={36}
        height={36}
        className={`absolute inset-0 block size-full transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src="/icons/accordion-close.svg"
        alt=""
        width={36}
        height={36}
        className={`absolute inset-0 block size-full transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

// The animating panel wrapper, shared by both breakpoints. `grid-template-rows`
// animates to the content's own height; the inner element must clip.
function AccordionPanel({
  id,
  labelledBy,
  open,
  children,
}: {
  id: string;
  labelledBy: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export default function HomeServices({ locale }: { locale: Locale }) {
  const { services } = getDictionary(locale).home;
  const servicesHref = localizedHref("services", locale);
  const [openIndex, setOpenIndex] = useState(0);

  // The photo is decorative: it carries no information the copy does not, and it
  // sits behind text at low contrast.
  const photo = (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <Image
        src="/images/home/services.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 620px, 327px"
        className="max-w-none object-cover"
      />
    </div>
  );

  return (
    <section className="bg-(--color-basic-accent)">
      {/* ------------------------------------------------------------------ */}
      {/* Stacked — 393px design, below 1024px (D040)                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:hidden">
        <div className="relative pt-[25px] pb-[77px]">
          {/* Eyebrow sits in the left gutter, outside the 32px heading inset. */}
          <div className="absolute top-0 left-0 flex h-[99px] w-[17px] items-center justify-center">
            <div className="rotate-90">
              <div className="flex items-center gap-[10px] pl-[25px]">
                <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
                <p className="font-body text-label-m text-center whitespace-nowrap text-(--color-basic-background) uppercase">
                  {services.eyebrow}
                </p>
              </div>
            </div>
          </div>

          {/* 346px is the Figma text box's own width, so it must be the content
              box — pairing it with pl-[32px] under border-box would leave 314px
              and wrap a line early. The 32px inset is a margin. */}
          <h2 className="font-display text-display-h2 ml-[32px] w-[346px] text-(--color-basic-background) uppercase">
            {services.headline}
          </h2>

          {/* Accordion block — the photo is centred behind it. */}
          <div className="relative mx-auto mt-[75px] w-[369px]">
            <div className="absolute top-1/2 left-[20px] h-[468px] w-[327px] -translate-y-1/2">
              {photo}
            </div>

            <div className="relative">
              {services.items.map((item, index) => {
                const open = index === openIndex;
                return (
                  <div
                    key={item.title}
                    className={`border-(--color-basic-background) ${
                      open
                        ? "border-t-[3px] border-b"
                        : index === services.items.length - 1
                          ? "border-t-[0.5px] border-b-[3px]"
                          : "border-t-[0.5px] border-b-[0.5px]"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`home-service-panel-${index}`}
                        id={`home-service-trigger-${index}`}
                        onClick={() => setOpenIndex(index)}
                        className={`flex w-full cursor-pointer items-start py-[20px] text-left ${
                          open ? "justify-between" : "gap-[7px]"
                        }`}
                      >
                        <span className="block size-[36px] shrink-0">
                          <AccordionIcon open={open} />
                        </span>
                        <span
                          className={`font-display text-display-h5 block w-[309px] shrink-0 uppercase ${
                            open
                              ? "text-(--color-brand-accent-neon)"
                              : "text-(--color-basic-background)"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    </h3>
                    <AccordionPanel
                      id={`home-service-panel-${index}`}
                      labelledBy={`home-service-trigger-${index}`}
                      open={open}
                    >
                      <div className="flex justify-end">
                        <p className="font-body text-body-s w-[326px] pb-[20px] text-(--color-basic-background)">
                          {item.description}
                        </p>
                      </div>
                    </AccordionPanel>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-[52px] px-[15px]">
            <Cta href={servicesHref} tone="green" className="w-full">
              {services.cta}
            </Cta>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)            */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden lg:block">
        <div className="mx-auto flex w-full max-w-[1440px] items-start px-[32px] py-[68px]">
          <div className="w-[27px] shrink-0 py-[15px]">
            <div className="flex h-[74px] items-center justify-center">
              <div className="rotate-90">
                <div className="flex items-center gap-[10px]">
                  <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
                  <p className="font-body text-label-m text-center whitespace-nowrap text-(--color-basic-background) uppercase">
                    {services.eyebrow}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-w-px flex-1 flex-col items-end gap-[80px]">
            <h2 className="font-display text-display-h2 w-full text-(--color-basic-background) uppercase">
              {services.headline}
            </h2>

            <div className="relative flex w-full max-w-[900px] flex-col items-start gap-[60px]">
              {/* Photo: level with the accordion top, as the desktop EN frame
                  draws it. 217/900 is the frame's own left offset within the
                  accordion column, kept proportional so it does not slide out
                  from behind the panel as the container narrows. */}
              <div className="absolute top-0 left-[24.111%] h-[767px] w-[620px] max-w-[68.889%]">
                {photo}
              </div>

              {/* Dot 12561:4180. Frame coords (747, 416) against an accordion
                  column that starts at x=508, y=502 — so 239/900 across and 86px
                  above the first rule, sitting in the gap under "REACH." rather
                  than on the rule itself. */}
              <div
                aria-hidden
                className="absolute top-[-86px] left-[26.556%] size-[65px] rounded-[100px] mix-blend-hard-light"
                style={{ backgroundColor: DOT_GREEN }}
              />

              <div className="relative w-full">
                {services.items.map((item, index) => {
                  const open = index === openIndex;
                  const last = index === services.items.length - 1;
                  return (
                    <div
                      key={item.title}
                      className={`w-full border-(--color-basic-background) ${
                        open
                          ? "border-t-2 border-b-2"
                          : last
                            ? "border-b-2"
                            : "border-b"
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`home-service-panel-lg-${index}`}
                          id={`home-service-trigger-lg-${index}`}
                          onClick={() => setOpenIndex(index)}
                          className="flex w-full cursor-pointer items-start gap-[16px] py-[40px] text-left"
                        >
                          <span className="mt-[2px] block size-[36px] shrink-0">
                            <AccordionIcon open={open} />
                          </span>
                          <span
                            className={`font-display text-display-h3 block min-w-px flex-1 uppercase ${
                              open
                                ? "text-(--color-brand-accent-neon)"
                                : "text-(--color-basic-background)"
                            }`}
                          >
                            {item.title}
                          </span>
                        </button>
                      </h3>
                      <AccordionPanel
                        id={`home-service-panel-lg-${index}`}
                        labelledBy={`home-service-trigger-lg-${index}`}
                        open={open}
                      >
                        <div className="pr-[8px] pb-[40px] pl-[52px]">
                          <p className="font-body text-body-l text-(--color-basic-background)">
                            {item.description}
                          </p>
                        </div>
                      </AccordionPanel>
                    </div>
                  );
                })}
              </div>

              <Cta href={servicesHref} tone="green" className="relative">
                {services.cta}
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

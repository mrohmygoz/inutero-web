"use client";

import { useState } from "react";
import Image from "next/image";
import AccordionPanel from "../../_components/AccordionPanel";
import Cta from "../../_components/Cta";
import Eyebrow from "../../_components/Eyebrow";
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
// Smart-animate is reproduced by the shared `AccordionPanel`, promoted out of this
// file in Phase 9 when the Services FAQ became the second consumer (D041). Only the
// panel moved — the icons, borders, type scale and `openIndex` state below are this
// section's own, because the two accordions share mechanics and nothing else.
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

// Desktop-only hover reference: no canonical Figma reaction exists for this (see
// design.md / DECISIONS.md). Same four photos as the Services page's `ServicesList`
// (same Figma Make source images, `imgSvc1`-`imgSvc4`) — reused from
// `public/images/services/` rather than duplicated under `public/images/home/`.
const DESKTOP_HOVER_PHOTOS = [
  "/images/services/service-01-artist-management.jpg",
  "/images/services/service-02-booking-touring.png",
  "/images/services/service-03-pr-marketing.jpg",
  "/images/services/service-04-event-production.jpg",
];

export default function HomeServices({ locale }: { locale: Locale }) {
  const { services } = getDictionary(locale).home;
  const servicesHref = localizedHref("services", locale);
  const [openIndex, setOpenIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const displayIndex = hoverIndex ?? openIndex;

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

  // Desktop-only: four images cross-fade by opacity, keyed to displayIndex
  // (hover-if-present, else the open row) rather than the mobile branch's single
  // static image.
  const desktopPhoto = (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {DESKTOP_HOVER_PHOTOS.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="620px"
          className="max-w-none object-cover transition-opacity duration-500 ease motion-reduce:transition-none"
          style={{ opacity: displayIndex === index ? 1 : 0 }}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-(--color-basic-accent)">
      {/* ------------------------------------------------------------------ */}
      {/* Stacked — 393px design, below 1024px (D040)                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:hidden">
        <div className="relative pt-[25px] pb-[77px]">
          {/* Eyebrow sits in the left gutter, outside the 32px heading inset;
              `gutterInset` is the 25px that inset costs, applied inside the
              rotation where it renders (D061). */}
          <Eyebrow
            label={services.eyebrow}
            tone="light"
            className="absolute top-0 left-0 flex h-[99px] w-[17px] items-center justify-center"
            gutterInset
          />

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
      {/* Desktop — reflowing from 1024px up (D040). No max-width cap — the   */}
      {/* dark background already fills the viewport regardless (color is on  */}
      {/* the outer <section>), and it's safe for the content to be uncapped  */}
      {/* too because the heading is `services.headlineLines`, hardcoded per- */}
      {/* line (one `<p>` each, matching Make's own `<p>`-per-line heading)   */}
      {/* rather than one auto-wrapping string — it can never reflow into a   */}
      {/* different line count at any width (phase 16i; see                  */}
      {/* openspec/DECISIONS.md D124 for the cap-removal history).           */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden lg:block">
        <div className="flex w-full items-start px-[32px] py-[68px]">
          <div className="w-[27px] shrink-0 py-[15px]">
            <Eyebrow
              label={services.eyebrow}
              tone="light"
              className="flex h-[74px] items-center justify-center"
            />
          </div>

          <div className="flex min-w-px flex-1 flex-col items-end gap-[80px]">
            <div className="w-full">
              <h2 className="sr-only">{services.headline}</h2>
              {services.headlineLines.map((line) => (
                <p
                  key={line}
                  aria-hidden
                  className="home-services-heading font-display block text-(--color-basic-background) uppercase whitespace-nowrap"
                  style={{
                    fontSize: "var(--services-h2-size)",
                    lineHeight: "var(--services-h2-line-height)",
                    letterSpacing: "var(--services-h2-letter-spacing)",
                    fontWeight: "var(--services-h2-weight)",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="relative flex w-full max-w-[900px] flex-col items-start gap-[60px]">
              {/* Photo: level with the accordion top, as the desktop EN frame
                  draws it. 217/900 and 620/900 are the frame's own offset and
                  width within the accordion column (D121) — expressed as
                  `clamp()` (phase 16i) rather than bare `%`/`max-width` so the
                  bound reads the same way as Hero's and Mission's, though the
                  900px-capped column means it is pinned at its max across the
                  whole 1024–1440 range in practice. No structural change to
                  the hover/cross-fade logic. */}
              <div
                className="absolute top-0 h-[767px]"
                style={{ left: "clamp(0px, 24.111%, 217px)", width: "clamp(0px, 68.889%, 620px)" }}
              >
                {desktopPhoto}
              </div>

              <div className="relative w-full">
                {services.items.map((item, index) => {
                  const open = index === openIndex;
                  const last = index === services.items.length - 1;
                  return (
                    <div
                      key={item.title}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
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
                            className={`home-services-label font-display block min-w-px flex-1 uppercase ${
                              open
                                ? "text-(--color-brand-accent-neon)"
                                : "text-(--color-basic-background)"
                            }`}
                            style={{
                              fontSize: "var(--services-h3-size)",
                              lineHeight: "var(--services-h3-line-height)",
                              letterSpacing: "var(--services-h3-letter-spacing)",
                              fontWeight: "var(--services-h3-weight)",
                            }}
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

import ProjectCard, { type ProjectCardTag } from "../../_components/ProjectCard";
import Cta from "../../_components/Cta";
import { getDictionary, type Locale } from "../../_lib/i18n";
import { localizedHref } from "../../_lib/routes";

// Source: desktop Featured Projects 12210:2392 (TC I12635:15868;12210:2392); mobile
// 10275:3132 (TC 12368:2418). Page-local, not shared (D033). Server component — no
// state, unlike the sibling HomeServices.
//
// A FLOW section (D040). The three cards are the scatter: each sits in its own
// wrapper that carries the offset and the rotation, so `ProjectCard` is composed
// completely unchanged. Confirmed against the frames — the cards are 353px wide in
// BOTH locales at mobile (matching the shell's own mobile width) and 353px at desktop
// except the first, which is 399.8px. The wider Figma bounding boxes were rotation,
// not a wider card.
//
// Rotations are identical across breakpoints and locales: +1.94° / -1.23° / +0.94°.

// Tag colours are per service type, not per card: the frames give Artist Management
// neon, Tour Planning yellow, PR & Marketing orange, and reuse those on every card.
// Keyed by position in the card's own tag list so the zh labels map without a lookup
// table — every card lists them in the same order.
const TAG_COLORS: ProjectCardTag["color"][] = ["neon", "yellow", "orange"];

function tagsFor(labels: readonly string[]): ProjectCardTag[] {
  // A two-tag card is Tour Planning + PR & Marketing, i.e. the last two colours.
  const offset = TAG_COLORS.length - labels.length;
  return labels.map((label, i) => ({ label, color: TAG_COLORS[i + offset] }));
}

// Green dot + rotated label, inline for the same reason as HomeIntro's.
function Eyebrow({ label, className }: { label: string; className: string }) {
  return (
    <div className={`flex items-center justify-center ${className} lg:translate-y-0 translate-y-2`}>
      <div className="rotate-90">
        <div className="flex items-center gap-[10px]">
          <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
          <p className="font-body text-label-m text-center whitespace-nowrap text-(--color-basic-accent) uppercase">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomeFeaturedProjects({ locale }: { locale: Locale }) {
  const { featuredProjects } = getDictionary(locale).home;
  // Every card points at the portfolio index: no slugs exist until Phase 11. The
  // prototype wires these to Portfolio Details, so Phase 11 repoints them.
  const portfolioHref = localizedHref("portfolio", locale);

  const cards = featuredProjects.cards.map((card) => (
    <ProjectCard
      key={card.title}
      title={card.title}
      dateLabel={card.dateLabel}
      description={card.description}
      tags={tagsFor(card.tags)}
      image={{ src: card.image, alt: "" }}
      href={portfolioHref}
    />
  ));

  return (
    <section className="bg-(--color-basic-background)">
      {/* ------------------------------------------------------------------ */}
      {/* Stacked — 393px design, below 1024px (D040)                         */}
      {/* ------------------------------------------------------------------ */}
      {/* `overflow-x-clip`, never `overflow-hidden`: the rotated cards would
          otherwise widen the page, but `hidden` makes this element a scroll
          container and silently kills the `sticky` stacking below. `clip` does
          not. */}
      <div className="overflow-x-clip lg:hidden">
        <div className="relative pb-[27px]">
          {/* Sticky header. It stays pinned for the whole section while the cards
              stack beneath it — see the stacking note below. It needs its own
              opaque background so cards scroll under it rather than through it. */}
          <div className="sticky top-0 z-10 bg-(--color-basic-background) pt-[25px] pb-[12px]">
            <Eyebrow
              label={featuredProjects.eyebrow}
              className="absolute top-1 h-[106px] w-[17px]"
            />
            {/* 346px is the Figma text box's own width — a margin, not padding. */}
            <h2 className="font-display text-display-h2 ml-[32px] w-[346px] text-(--color-basic-accent) uppercase">
              {featuredProjects.heading}
            </h2>
          </div>

          {/* STACKING CARDS. Every card pins at the same offset with an
              increasing z-index, so each one slides up over the previous rather
              than scrolling past it, and the earlier cards stay visible as
              offset edges behind (their differing rotations are what makes those
              edges peek out).

              This is the one part of the section with no data behind it: the
              Figma file exposes nothing for it — `reactions`, `animations`,
              `animationStyles`, `overflowDirection` and `get_motion_context` all
              come back empty — because it is a prototype scroll behaviour rather
              than node data. Built from the user's prototype recording, so it is
              Derived (D005) and must not be reported as design-matching.

              Left offsets and rotations are the frames' own (x 17/33/16 within
              393px; +1.94/-1.23/+0.94 degrees). The vertical gaps are the frames'
              too — the cards sit 3px and 19px apart, nearly flush, which is what
              makes the next card begin covering the previous almost immediately. */}
          <div className="flex flex-col">
            <div className="sticky top-[132px] z-[1] ml-[17px] w-[353px] rotate-[1.94deg]">
              {cards[0]}
            </div>
            <div className="sticky top-[132px] z-[2] mt-[3px] ml-[33px] w-[353px] rotate-[-1.23deg]">
              {cards[1]}
            </div>
            <div className="sticky top-[132px] z-[3] mt-[19px] ml-[16px] w-[353px] rotate-[0.94deg]">
              {cards[2]}
            </div>
          </div>

          {/* z-index above the cards so the last one stacks behind it, not over. */}
          <div className="relative z-[4] mt-[40px] bg-(--color-basic-background) px-[15px] pt-[27px]">
            <Cta href={portfolioHref} tone="green" className="w-full">
              {featuredProjects.cta}
            </Cta>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)            */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden lg:block">
        <div className="mx-auto w-full max-w-[1440px] px-[32px] py-[68px]">
          <div className="flex items-start">
            <Eyebrow label={featuredProjects.eyebrow} className="h-[112px] w-[27px] shrink-0" />
            <h2 className="font-display text-display-h2 min-w-px flex-1 text-(--color-basic-accent) uppercase">
              {featuredProjects.heading}
            </h2>
          </div>

          {/* Three cards across the 1376px content container. Widths and gutters
              are the frame's own proportions — 91.3 / 399.8 / 44.1 / 353 / 33.2 /
              353 / 101.6 of 1376, which sum to 100% — so the scatter keeps its
              shape as the container narrows. Card 1 is the wide one.

              A ROW, not an absolutely-positioned block with a fixed height: below
              1440px the cards narrow, their copy wraps to more lines, and a fixed
              741px box let them overflow into the CTA at 1024px. Letting the row
              set its own height keeps the vertical offsets as the only placed
              values. */}
          <div className="mt-[84px] flex items-start">
            <div className="mt-[5px] ml-[6.635%] w-[29.055%] rotate-[1.94deg]">{cards[0]}</div>
            <div className="mt-[57px] ml-[3.205%] w-[25.654%] rotate-[-1.23deg]">{cards[1]}</div>
            <div className="mt-[52px] ml-[2.413%] w-[25.654%] rotate-[0.94deg]">{cards[2]}</div>
          </div>

          {/* Green, not dark — 12358:2031 is the green-bg/dark-text occurrence
              that `Cta`'s `tone` prop exists for (see INVENTORY), and the mobile
              CTA 10275:3147 fills #08c454 too. Both were built dark by mistake. */}
          <div className="mt-[40px] flex justify-center">
            <Cta href={portfolioHref} tone="green">
              {featuredProjects.cta}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

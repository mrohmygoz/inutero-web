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
      <div className="lg:hidden">
        <div className="relative pt-[25px] pb-[27px]">
          <Eyebrow label={featuredProjects.eyebrow} className="absolute top-1 h-[106px] w-[17px]" />

          {/* 346px is the Figma text box's own width — a margin, not padding. */}
          <h2 className="font-display text-display-h2 ml-[32px] w-[346px] text-(--color-basic-accent) uppercase">
            {featuredProjects.heading}
          </h2>

          {/* The scatter. Left offsets are the frames' own (17 / 33 / 16 within
              393px); the vertical gaps in the frames are not constant between
              locales because the card heights are content-driven, so a single
              gap is used and the column reflows. */}
          <div className="mt-[40px] flex flex-col gap-[20px] overflow-hidden py-[10px]">
            <div className="w-[353px] rotate-[1.94deg] self-start" style={{ marginLeft: 17 }}>
              {cards[0]}
            </div>
            <div className="w-[353px] rotate-[-1.23deg] self-start" style={{ marginLeft: 33 }}>
              {cards[1]}
            </div>
            <div className="w-[353px] rotate-[0.94deg] self-start" style={{ marginLeft: 16 }}>
              {cards[2]}
            </div>
          </div>

          <div className="mt-[40px] px-[15px]">
            <Cta href={portfolioHref} tone="dark" className="w-full">
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

          <div className="mt-[40px] flex justify-center">
            <Cta href={portfolioHref} tone="dark">
              {featuredProjects.cta}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

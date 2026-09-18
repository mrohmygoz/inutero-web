"use client";

import { useRef, useState, type ReactNode } from "react";
import Eyebrow from "../../../_components/Eyebrow";
import TeamCard from "../../../_components/TeamCard";
import { getDictionary, type Locale } from "../../../_lib/i18n";
import { teamMembers, teamMemberDisplay, teamMemberImageSrc } from "../../../_lib/team";

// Source: desktop Section 12573:6174 (886.5px); mobile Section 12210:2881
// (752px, TC 12368:2437, 690px). Page-local, single consumer (D-A).
//
// Figma draws 5 identical Lorem-ipsum cards at desktop (fifth starting at
// x=1264, already past the 1440px edge) and 2 + a five-dot indicator at
// mobile — both already overflow, and 9 real members make it unavoidable
// rather than incidental. One horizontally scroll-snapped row at every width;
// the mobile five-dot indicator becomes one dot per member, tracking scroll
// position. No frame draws a second scroll position — this is Derived (D005),
// per D-B in design.md.
function TeamScroller({
  className,
  showDots,
  children,
}: {
  className: string;
  showDots: boolean;
  children: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.scrollWidth / teamMembers.length;
    const index = Math.round(el.scrollLeft / step);
    setActive(Math.min(teamMembers.length - 1, Math.max(0, index)));
  }

  return (
    <>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className={`flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      {showDots && (
        <div className="mt-[48px] flex items-center justify-center gap-[7px]">
          {teamMembers.map((member, index) => (
            <div
              key={member.slug}
              className={`size-2 shrink-0 ${
                index === active
                  ? "bg-(--color-basic-text-primary)"
                  : "bg-(--color-basic-text-secondary) opacity-20"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function AboutTeam({ locale }: { locale: Locale }) {
  const { team } = getDictionary(locale).about;

  const cards = teamMembers.map((member) => {
    const display = teamMemberDisplay(member, locale);
    return (
      <TeamCard
        key={member.slug}
        name={display.name}
        role={display.role}
        bio={display.bio}
        image={{ src: teamMemberImageSrc(member), alt: display.name }}
        className="shrink-0 snap-start"
      />
    );
  });

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-start bg-(--color-basic-background) py-[25px] lg:hidden">
        <div className="flex w-full items-start gap-[5px] pr-[15px]">
          <Eyebrow
            label={team.eyebrow}
            className="flex h-[99px] w-[17px] shrink-0 items-center justify-center translate-y-[-2px] lg:translate-y-[-12px]"
          />
          <h2 className="font-display text-display-h2 w-full flex-1 pt-[20px] text-(--color-basic-text-primary) uppercase">
            {team.heading}
          </h2>
        </div>

        <div className="w-full max-w-[576px] px-[15px] py-[20px]">
          <TeamScroller className="gap-[25px] pt-[24px]" showDots>
            {cards}
          </TeamScroller>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)          */}
      {/* ---------------------------------------------------------------- */}
      <section className="hidden border-b border-(--color-basic-accent) bg-(--color-basic-background) px-[32px] py-[64px] lg:block">
        <div className="flex items-start gap-[5px]">
          <Eyebrow
            label={team.eyebrow}
            className="flex h-[77px] w-[27px] shrink-0 items-center justify-center translate-y-[-2px] lg:translate-y-[-12px]"
          />
          <h2 className="font-display text-display-h2 min-w-px flex-1 text-(--color-basic-text-primary) uppercase">
            {team.heading}
          </h2>
        </div>

        <TeamScroller className="mt-[64px] gap-[32px]" showDots={false}>
          {cards}
        </TeamScroller>
      </section>
    </>
  );
}

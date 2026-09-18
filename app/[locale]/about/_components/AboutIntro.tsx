import Image from "next/image";
import { getDictionary, type Locale } from "../../../_lib/i18n";

// Source: desktop Section 12573:6107 (792.5px); mobile Intro 12212:6370 (1092px,
// TC 12368:2435, 971px). Page-local, single consumer (D-A).
//
// The body paragraph IS built — the matrix's `REMOVE` annotation cited the
// whole Intro instance rather than a paragraph node and is overridden by the
// live design, which draws this text in full in both locales (D-D in
// design.md, D050 in DECISIONS.md). The TC frame draws two paragraphs where
// the EN frame draws one; both are built as their own frame shows, same
// asymmetry as Home's Intro.
const HEADING_GRADIENT_DESKTOP =
  "linear-gradient(185.7423069456149deg, rgb(8, 196, 84) 21.759%, rgb(82, 200, 80) 53.972%, rgb(39, 166, 90) 88.215%)";
const HEADING_GRADIENT_MOBILE =
  "linear-gradient(210.43759505737597deg, rgb(8, 196, 84) 16.127%, rgb(82, 200, 80) 54.764%, rgb(39, 166, 90) 95.835%)";

export default function AboutIntro({ locale }: { locale: Locale }) {
  const { intro } = getDictionary(locale).about;

  const body = intro.bodyParagraphs.map((paragraph) => (
    <p key={paragraph} className="font-body text-body-l text-(--color-basic-text-primary)">
      {paragraph}
    </p>
  ));

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Stacked — 393px design, below 1024px (D040)                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-[40px] bg-(--color-basic-background) py-[50px] lg:hidden">
        <div className="flex w-[363px] max-w-[calc(100%-30px)] flex-col items-start gap-[24px]">
          <div className="relative h-[314px] w-full">
            <Image
              src="/images/about/about-intro.png"
              alt=""
              fill
              sizes="(max-width: 393px) 100vw, 363px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">{body}</div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop — 1440px design, reflowing from 1024px up (D040)          */}
      {/* ---------------------------------------------------------------- */}
      <section className="hidden border-b border-(--color-basic-accent) bg-(--color-basic-background) px-[32px] py-[64px] lg:block">
        <div className="flex items-end justify-end gap-[40px]">
          <div className="flex w-[580px] max-w-full flex-col gap-4">{body}</div>
          <div className="relative h-[380px] w-[464px] shrink-0">
            <Image src="/images/about/about-intro.png" alt="" fill sizes="464px" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}

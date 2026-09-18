import type { ReactNode } from "react";
import Cta from "@/app/_components/Cta";
import SecondaryCta from "@/app/_components/SecondaryCta";
import Tag from "@/app/_components/Tag";
import Eyebrow from "@/app/_components/Eyebrow";
import ProjectCard from "@/app/_components/ProjectCard";
import type { Locale } from "@/app/_lib/i18n";

const copy = {
  en: {
    ctaLabel: "View our work",
    ctaAllProjects: "View all projects",
    secondaryLabel: "View our work",
    tagDefault: "Artist Management",
    tagActive: "Tour Planning",
    tagNeon: "Artist Management",
    tagYellow: "Tour Planning",
    tagOrange: "PR & Marketing",
    eyebrow: "Mission",
    heading: "How We Work",
    headerEyebrow: "Featured Artists",
    headerHeading: "Our Artists",
    projectTitle: "Bottom's Up",
    projectDate: "June 2024",
    projectDescription:
      "Full management and international tour strategy for Taiwan's leading indie act.",
  },
  zh: {
    ctaLabel: "過往案例",
    ctaAllProjects: "查看所有專案",
    secondaryLabel: "過往案例",
    // Real category translations from the Featured Artists TC filter row
    // (I12635:12928;12591:6188/6190/6192) — not literal translations of the
    // EN labels, Figma's own TC copy for these categories.
    tagDefault: "藝人經紀",
    tagActive: "巡演規劃",
    tagNeon: "藝人經紀",
    tagYellow: "巡演規劃",
    tagOrange: "行銷宣傳",
    // Both eyebrows are left untranslated in the Figma TC frames themselves
    // (Home Mission section I12635:15868;12405:6430, Featured Artists header
    // I12635:12928;12591:6176) — reproduced as-is rather than inventing a
    // translation Figma doesn't have.
    eyebrow: "Mission",
    heading: "讓台灣的音樂市場與國際接軌，創造更大的聲浪。",
    headerEyebrow: "Featured Artists",
    headerHeading: "合作藝人",
    // Real project title from the Home TC page — note the leading "一" I'd
    // dropped in an earlier pass.
    projectTitle: "一起喝酒的朋友",
    projectDate: "2024 年 6 月",
    // Figma's real description for this project is event-poster-style copy
    // (venue/date/lineup fragments) that doesn't map cleanly onto this card's
    // single-paragraph slot — kept as descriptive placeholder rather than
    // force-fitting a mismatched real fragment.
    projectDescription: "為台灣領先的獨立音樂人提供全方位經紀與國際巡演策略。",
  },
} as const;

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-body text-body-xs text-(--opacity-white-60)">{label}</div>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function PrimitiveSpecimens({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <div className="flex flex-col gap-10">
      <Row label="Cta — tone=dark (default) / tone=green">
        <Cta href="#">{t.ctaLabel}</Cta>
        <Cta href="#" tone="green">
          {t.ctaAllProjects}
        </Cta>
      </Row>

      <Row label="SecondaryCta — tone=dark (default, for light backgrounds)">
        <SecondaryCta href="#">{t.secondaryLabel}</SecondaryCta>
      </Row>

      <Row label="SecondaryCta — tone=light (for dark surfaces, e.g. ServiceCard)">
        <div className="bg-(--color-basic-accent) p-4">
          <SecondaryCta href="#" tone="light">
            {t.secondaryLabel}
          </SecondaryCta>
        </div>
      </Row>

      <Row label="Tag — outline default / active (renders on a dark surface per Figma)">
        <div className="flex flex-wrap items-center gap-4 bg-(--color-basic-accent) p-4">
          <Tag>{t.tagDefault}</Tag>
          <Tag state="active">{t.tagActive}</Tag>
        </div>
      </Row>

      <Row label="Tag — solid neon / yellow / orange">
        <Tag variant="solid" color="neon">
          {t.tagNeon}
        </Tag>
        <Tag variant="solid" color="yellow">
          {t.tagYellow}
        </Tag>
        <Tag variant="solid" color="orange">
          {t.tagOrange}
        </Tag>
      </Row>

      <Row label="Eyebrow — tone=dark (light section)">
        <div className="w-full bg-(--color-basic-background) p-4">
          <Eyebrow
            label={t.headerEyebrow}
            className="flex h-[99px] w-[17px] items-center justify-center"
          />
        </div>
      </Row>

      <Row label="Eyebrow — tone=light (dark section)">
        <div className="w-full bg-(--color-basic-accent) p-4">
          <Eyebrow
            label={t.eyebrow}
            tone="light"
            className="flex h-[99px] w-[17px] items-center justify-center"
          />
        </div>
      </Row>

      <Row label="ProjectCard">
        <ProjectCard
          title={t.projectTitle}
          dateLabel={t.projectDate}
          description={t.projectDescription}
          tags={[
            { label: t.tagNeon, color: "neon" },
            { label: t.tagYellow, color: "yellow" },
            { label: t.tagOrange, color: "orange" },
          ]}
        />
      </Row>
    </div>
  );
}

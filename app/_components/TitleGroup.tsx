// Source: mobile symbol 12219:946 (eyebrow + Display/H2 heading, dark-on-light).
// The "Title Group" component only exists as a Figma symbol at mobile (393px) —
// `12220:1079` (Featured Artists header) and other page occurrences previously
// cited here as "desktop" are actually mobile-frame instances (confirmed via
// get_metadata: width 393). Real desktop pages compose the eyebrow + heading
// inline per-page instead of instancing a shared component (e.g. Home Hero
// 12405:6424), so desktop below is a derived approximation, not a 1:1 port —
// see the per-breakpoint comments below.
//  - tone: Featured Artists header (12220:1079) is dark-on-white (this default);
//    Home Hero (12405:6424) is white-on-dark — same pattern as the button primitives.
//  - headingSize: page headers use Display/H1 (12220:1079); the mobile symbol and
//    Home Hero section titles use Display/H2 — exposed as a prop rather than assumed.
//  - Home Hero's green gradient heading fill is treated as a page-level `className`
//    override, not part of the primitive (D-A "TitleGroup" row).
// The eyebrow tag (green dot + rotated label) is built inline here rather than via
// a shared wrapper — it had exactly one consumer (this component) and one demo
// entry in styleguide, so the extra indirection wasn't earning its keep.
export type TitleGroupTone = "dark" | "light";

const toneClassName: Record<TitleGroupTone, string> = {
  dark: "text-(--color-basic-accent)",
  light: "text-(--color-basic-background)",
};

const headingSizeClassName = {
  h1: "text-display-h1",
  h2: "text-display-h2",
} as const;

export default function TitleGroup({
  eyebrow,
  heading,
  description,
  tone = "dark",
  headingSize = "h2",
  className,
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  tone?: TitleGroupTone;
  headingSize?: keyof typeof headingSizeClassName;
  className?: string;
}) {
  const eyebrowLabelClassName =
    `whitespace-nowrap font-body text-label-m font-normal uppercase ${toneClassName[tone]}`.trim();
  const headingEl = (
    <div
      className={`font-display ${headingSizeClassName[headingSize]} w-full [word-break:break-word] font-bold uppercase ${toneClassName[tone]}`.trim()}
    >
      {heading}
    </div>
  );
  const descriptionEl = description ? (
    <div className={`justify-start ${toneClassName[tone]}`.trim()}>{description}</div>
  ) : null;

  return (
    <>
      {/* Mobile (<1024px): matches Figma mobile "Title Group" symbol (12219:946) —
          fixed h-[99px] w-[17px] eyebrow box with a centered rotate, gap-[5px]
          between columns, pr-[15px] on the whole group. */}
      <div className={`lg:hidden self-stretch p-0 inline-flex justify-start items-start ${className ?? ""}`.trim()}>
        <div className="mt-2 w-[5px] inline-flex flex-col items-start justify-center gap-2.5">
          <div className="flex origin-top-left rotate-90 items-center gap-[10px] whitespace-nowrap">
            <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
            <div className={eyebrowLabelClassName}>{eyebrow}</div>
          </div>
        </div>
        <div className="inline-flex flex-col justify-start items-start gap-5">
          {headingEl}
          {descriptionEl}
        </div>
      </div>

      {/* Desktop (>=1024px): no direct Figma "Title Group" instance exists at 1440 —
          real desktop pages compose eyebrow + heading inline per-page instead
          (see e.g. Our Artist header 12591:6174/12591:6177, Home Hero 12405:6424).
          Kept as the prior derived approximation, unchanged. */}
      <div className={`hidden self-stretch p-0 lg:inline-flex justify-start items-start ${className ?? ""}`.trim()}>
        <div className="mt-2 w-2.5 inline-flex flex-col items-start justify-center gap-2.5">
          <div className="flex origin-top-left rotate-90 items-center gap-[10px] whitespace-nowrap">
            <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
            <div className={eyebrowLabelClassName}>{eyebrow}</div>
          </div>
        </div>
        <div className="inline-flex flex-col justify-start items-start gap-5">
          {headingEl}
          {descriptionEl}
        </div>
      </div>
    </>
  );
}

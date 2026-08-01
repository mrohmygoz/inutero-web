import TaglineWrapper, { type TaglineWrapperTone } from "./TaglineWrapper";

// Source: mobile symbol 12219:946 (eyebrow + Display/H2 heading, dark-on-light).
// Desktop occurrences agree on structure; two divergences observed and resolved
// without re-asking (design.md Derived Sources):
//  - tone: Featured Artists header (12220:1079) is dark-on-white (this default);
//    Home Hero (12405:6424) is white-on-dark — same pattern as the button primitives.
//  - headingSize: page headers use Display/H1 (12220:1079); the mobile symbol and
//    Home Hero section titles use Display/H2 — exposed as a prop rather than assumed.
//  - Home Hero's green gradient heading fill is treated as a page-level `className`
//    override, not part of the primitive (D-A "TitleGroup" row).
export type TitleGroupTone = TaglineWrapperTone;

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
  tone = "dark",
  headingSize = "h2",
  className,
}: {
  eyebrow: string;
  heading: string;
  tone?: TitleGroupTone;
  headingSize?: keyof typeof headingSizeClassName;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-[5px] pr-[15px] ${className ?? ""}`.trim()}>
      <TaglineWrapper label={eyebrow} tone={tone} />
      <div className="flex min-w-px flex-1 flex-col items-center justify-center pt-5">
        <p
          className={`font-display ${headingSizeClassName[headingSize]} w-full [word-break:break-word] font-bold uppercase ${toneClassName[tone]}`}
        >
          {heading}
        </p>
      </div>
    </div>
  );
}

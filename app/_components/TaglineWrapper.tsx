// Source: mobile symbol 10270:2179 (dark text, for light backgrounds — "Mission" on
// Intro). Nested occurrences inside TitleGroup's Home Hero instance and inside
// ServiceCard's numbered index both use white text on a dark surface — the same
// background-adaptation pattern as Cta/SecondaryCta/Tag, applied consistently.
// No horizontal (non-rotated) occurrence was found anywhere surveyed (design.md
// Derived Sources) — this always renders rotated.
export type TaglineWrapperTone = "dark" | "light";

const toneClassName: Record<TaglineWrapperTone, string> = {
  dark: "text-(--color-basic-accent)",
  light: "text-(--color-basic-background)",
};

export default function TaglineWrapper({
  label,
  tone = "dark",
  className,
}: {
  label: string;
  tone?: TaglineWrapperTone;
  className?: string;
}) {
  return (
    <div className={`flex h-[92px] w-[17px] items-center justify-center ${className ?? ""}`.trim()}>
      <div className="flex -rotate-90 items-center gap-[10px] whitespace-nowrap">
        <span className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
        <span
          className={`font-body text-label-m font-normal uppercase ${toneClassName[tone]}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

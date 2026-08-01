import type { ReactNode } from "react";

// Source: mobile Tag frame 12219:1180 (outline chip, Default 12219:1164 / Active
// 12219:1183 — border-opacity-white-20 vs full-opacity white border, both white text)
// and the solid color chip symbol 10274:2297 used inside Project card, which carries
// no border and swaps fill between the three brand accent colors per category.
// Desktop occurrences (Featured Artists filter row 12220:1061–1064) match the mobile
// outline sizing exactly — no conflict (design.md Derived Sources).
export type TagState = "default" | "active";
export type TagColor = "neon" | "yellow" | "orange";

const solidColorClassName: Record<TagColor, string> = {
  neon: "bg-(--color-brand-accent-neon)",
  yellow: "bg-(--color-brand-accent-yellow)",
  orange: "bg-(--color-brand-accent-orange)",
};

const outlineStateClassName: Record<TagState, string> = {
  default: "border-(--opacity-white-20)",
  active: "border-(--color-basic-background)",
};

type TagOutlineProps = {
  children: ReactNode;
  variant?: "outline";
  state?: TagState;
  className?: string;
};

type TagSolidProps = {
  children: ReactNode;
  variant: "solid";
  color: TagColor;
  className?: string;
};

export type TagProps = TagOutlineProps | TagSolidProps;

const baseClassName =
  "inline-flex items-center justify-center whitespace-nowrap px-[12.5px] py-[6.5px] " +
  "font-body text-label-m font-normal uppercase";

export default function Tag(props: TagProps) {
  if (props.variant === "solid") {
    const { children, color, className } = props;
    return (
      <span
        className={`${baseClassName} p-[3px] text-(--color-basic-accent) ${solidColorClassName[color]} ${className ?? ""}`.trim()}
      >
        {children}
      </span>
    );
  }

  const { children, state = "default", className } = props;
  return (
    <span
      className={`${baseClassName} border-[0.5px] border-solid text-(--color-basic-background) ${outlineStateClassName[state]} ${className ?? ""}`.trim()}
    >
      {children}
    </span>
  );
}

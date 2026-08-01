import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { buttonBaseClassName } from "./_buttonStyles";

// Source: mobile CTA 12368:4718 (fill-width 363px, dark bg/white text).
// Desktop occurrences (12573:9014, 12405:6975, 12358:2031) are hug-width and split
// between dark and green fills — see design.md "Derived Sources" for the survey and
// the user's 2026-08-01 decision to expose that split as `tone`.
export type CtaTone = "dark" | "green";

const toneClassName: Record<CtaTone, string> = {
  dark: "bg-(--color-basic-accent) text-(--color-basic-background)",
  green: "bg-(--color-brand-primary-green) text-(--color-basic-accent)",
};

type CtaOwnProps = {
  children: ReactNode;
  tone?: CtaTone;
  className?: string;
};

type CtaLinkProps = CtaOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type CtaButtonProps = CtaOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type CtaProps = CtaLinkProps | CtaButtonProps;

export default function Cta({ children, tone = "dark", className, ...rest }: CtaProps) {
  const classes = `${buttonBaseClassName} ${toneClassName[tone]} ${className ?? ""}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as CtaButtonProps)}>
      {children}
    </button>
  );
}

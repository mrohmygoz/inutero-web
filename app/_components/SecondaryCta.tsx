import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { buttonBaseClassName } from "./_buttonStyles";

// Source: mobile Secondary CTA 12368:4721 (fill-width 363px, dark outline/text —
// for light backgrounds). The nested instance inside ServiceCard (I12220:2696;12220:2660,
// and desktop 12593:7447) is white outline/text on ServiceCard's dark panel — the same
// background-adaptation pattern as Cta's `tone`, applied consistently rather than asked
// twice. See design.md "Derived Sources".
export type SecondaryCtaTone = "dark" | "light";

const toneClassName: Record<SecondaryCtaTone, string> = {
  dark: "border-(--color-basic-accent) text-(--color-basic-accent)",
  light: "border-(--color-basic-background) text-(--color-basic-background)",
};

type SecondaryCtaOwnProps = {
  children: ReactNode;
  tone?: SecondaryCtaTone;
  className?: string;
};

type SecondaryCtaLinkProps = SecondaryCtaOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type SecondaryCtaButtonProps = SecondaryCtaOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type SecondaryCtaProps = SecondaryCtaLinkProps | SecondaryCtaButtonProps;

export default function SecondaryCta({
  children,
  tone = "dark",
  className,
  ...rest
}: SecondaryCtaProps) {
  const classes =
    `${buttonBaseClassName} border-[0.5px] border-solid ${toneClassName[tone]} ${className ?? ""}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as SecondaryCtaButtonProps)}>
      {children}
    </button>
  );
}

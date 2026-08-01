// Shared sizing/state classes for Cta and SecondaryCta — both are the same
// 44px/17px-padded, 45px-tall button shape, only fill differs (D-D).
// Fill-width on mobile, hug-width from 1024px (D-E, matches the D009 token switch).
export const buttonBaseClassName =
  "inline-flex h-[45px] w-full items-center justify-center px-11 py-[17px] " +
  "lg:w-auto font-body text-label-m font-normal uppercase whitespace-nowrap text-center " +
  "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-(--color-brand-primary-green)";

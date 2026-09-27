"use client";

import Image from "next/image";
import { shareIntentHref, shareTargets, useShareUrl } from "../../../../_components/share";

// Source: CMS 12610:7339 — the desktop-only left rail beside the article body,
// owed by Phase 10's roadmap "Inherited Work" row. No 393px counterpart exists
// (`hidden lg:flex`), so unlike `ShareRow` this is not a responsive pair of
// occurrences, just the one.
//
// Same four targets as `ShareRow` (D031) via the shared `./share` module — the
// left rail is the icon set `ShareRow`'s third glyph (X, not YouTube) was
// actually taken from.
//
// Page-local (not `app/_components/`) — Portfolio Details is its only consumer
// today. Promote to a shared component if News Details (Phase 14) reuses it
// verbatim.
export default function ShareRail({
  title,
  copyLinkLabel,
  linkedinLabel,
  xLabel,
  facebookLabel,
  className,
}: {
  title: string;
  copyLinkLabel: string;
  linkedinLabel: string;
  xLabel: string;
  facebookLabel: string;
  className?: string;
}) {
  const url = useShareUrl();
  const labels = { linkedin: linkedinLabel, x: xLabel, facebook: facebookLabel } as const;

  return (
    <div className={`w-fit items-start gap-2 ${className ?? ""}`.trim()}>
      {shareTargets.map(({ key, icon, width, height }) => {
        const href = url ? shareIntentHref(key, url, title) : null;
        const glyph = <Image src={icon} alt="" width={width} height={height} aria-hidden />;
        const boxClassName =
          "flex size-8 shrink-0 items-center justify-center border border-(--opacity-neutral-darkest-20) bg-white " +
          "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 " +
          "focus-visible:outline-(--color-brand-primary-green)";

        if (key === "copy") {
          return (
            <button
              key={key}
              type="button"
              className={boxClassName}
              aria-label={copyLinkLabel}
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
              }}
            >
              {glyph}
            </button>
          );
        }

        return (
          <a
            key={key}
            href={href ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[key]}
            aria-disabled={href ? undefined : true}
            className={boxClassName}
          >
            {glyph}
          </a>
        );
      })}
    </div>
  );
}

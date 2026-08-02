"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import type { Locale } from "../_lib/i18n";
import { getDictionary } from "../_lib/i18n";

// Source: desktop CMS bottom share row 12612:8414/8415/8416; mobile occurrence
// 12211:4535 / 12220:1887. Same structure at both breakpoints — only the top gap
// differs (40px mobile, 64px desktop).
//
// The DESKTOP-ONLY left share rail (12610:7339) is deliberately NOT built: it has no
// 393px counterpart, and it occupies a 353px column beside the body, which is the detail
// page's two-column layout rather than a body element. That belongs to Phases 11/14.
//
// 'use client' because a real share intent needs the page's absolute URL, and the project
// has no configured site origin (no metadataBase anywhere), so it cannot be built at
// render time. Reading location on the client is what makes these links real instead of
// href="#" placeholders — see D022 on not shipping destinations that never resolve.

// The design's two share groups disagree on the third glyph: the bottom row draws
// YouTube, the left rail draws X. YouTube has no share endpoint, so a YouTube icon under
// a "SHARE" label could only ever be dead. Taking the rail's X instead — same node, same
// icon set, and it makes all four targets real. Recorded as D031.
const targets = [
  { key: "copy", icon: "/icons/share/link.svg", width: 16.919, height: 8.595 },
  { key: "linkedin", icon: "/icons/share/linkedin.svg", width: 14.997, height: 15.005 },
  { key: "x", icon: "/icons/share/x.svg", width: 14.997, height: 13.337 },
  { key: "facebook", icon: "/icons/share/facebook.svg", width: 16.673, height: 16.673 },
] as const;

function intentHref(key: string, url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (key) {
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "x":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    default:
      return null;
  }
}

const iconBoxClassName =
  "flex size-8 shrink-0 items-center justify-center border border-(--opacity-neutral-darkest-20) " +
  "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-(--color-brand-primary-green)";

export default function ShareRow({ locale, title }: { locale: Locale; title: string }) {
  const t = getDictionary(locale).share;
  const [copied, setCopied] = useState(false);

  // Reading a browser-only value without an effect-then-setState. The subscribe callback
  // is a no-op because the URL cannot change without a navigation, which remounts this.
  // The server snapshot is "" so the first paint matches and the hrefs fill in on hydration.
  const url = useSyncExternalStore(
    () => () => {},
    () => window.location.href,
    () => ""
  );

  return (
    <div className="mx-auto w-full max-w-[672px] px-5 pt-10 pb-10 lg:max-w-[1031px] lg:px-8 lg:pt-16">
      <div className="flex items-center justify-between border-t border-(--opacity-neutral-darkest-15) px-[15px] pt-[21px] pb-5">
        <p className="font-body text-label-m text-(--opacity-neutral-darkest-40) uppercase">
          {copied ? t.copied : t.label}
        </p>
        <div className="flex items-center gap-2">
          {targets.map(({ key, icon, width, height }) => {
            const href = url ? intentHref(key, url, title) : null;
            const glyph = (
              <Image src={icon} alt="" width={width} height={height} aria-hidden />
            );

            if (key === "copy") {
              return (
                <button
                  key={key}
                  type="button"
                  className={iconBoxClassName}
                  aria-label={t.copyLink}
                  onClick={async () => {
                    await navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
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
                aria-label={t[key as "linkedin" | "x" | "facebook"]}
                aria-disabled={href ? undefined : true}
                className={iconBoxClassName}
              >
                {glyph}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

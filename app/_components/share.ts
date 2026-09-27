"use client";

import { useSyncExternalStore } from "react";

// Extracted from ShareRow (D031) once the Portfolio Details left rail (Phase 11)
// needed the same four targets and the same current-URL read. `useShareUrl` is the
// only stateful piece — reading a browser-only value without an effect-then-setState.
// The subscribe callback is a no-op because the URL cannot change without a
// navigation, which remounts the component tree. The server snapshot is "" so the
// first paint matches and hrefs fill in on hydration.
export function useShareUrl(): string {
  return useSyncExternalStore(
    () => () => {},
    () => window.location.href,
    () => ""
  );
}

export const shareTargets = [
  { key: "copy", icon: "/icons/share/link.svg", width: 16.919, height: 8.595 },
  { key: "linkedin", icon: "/icons/share/linkedin.svg", width: 14.997, height: 15.005 },
  { key: "x", icon: "/icons/share/x.svg", width: 14.997, height: 13.337 },
  { key: "facebook", icon: "/icons/share/facebook.svg", width: 16.673, height: 16.673 },
] as const;

export type ShareTargetKey = (typeof shareTargets)[number]["key"];

/** `null` for the copy-link target, which has no href — it runs a click handler instead. */
export function shareIntentHref(key: ShareTargetKey, url: string, title: string): string | null {
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

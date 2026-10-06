// URLs from openspec/reference/content-matrix.md -> Contact -> social URLs.
//
// The fourth slot is Podcast (Firstory), not X — user decision 2026-08-02 resolving the
// conflict between the matrix (which supplies a Podcast URL and no X URL) and both the TC
// Footer frame 12635:16558 and the committed icon set (which carry X).
//
// ICON TBD: there is no Podcast glyph in the Figma social set, so this slot borrows the
// neutral link/chain glyph from the share icons rather than reusing the X logo, which
// would point a brand mark at the wrong platform. Swap `icon` below when a real asset
// arrives; `social-brand/x.svg` stays committed in case the decision is reversed.
//
// Lives outside Footer.tsx (a "use client" module) because ContactDetails.tsx, a server
// component, also consumes this plain array — importing a named export across that
// client/server boundary isn't guaranteed to survive Turbopack's static prerendering.
export const socialPlatforms = [
  { key: "facebook", icon: "/icons/social-brand/facebook.svg", href: "https://www.facebook.com/inuteromusic" },
  { key: "instagram", icon: "/icons/social-brand/instagram.svg", href: "https://www.instagram.com/inuteromusic_official/" },
  { key: "youtube", icon: "/icons/social-brand/youtube.svg", href: "https://www.youtube.com/channel/UCyKN9UgKnYyPX1AWxQLPo9Q" },
  { key: "podcast", icon: "/icons/share/link.svg", href: "https://cl7z0x1hm09ua01wi2ukt6kjq.firstory.io/" },
] as const;

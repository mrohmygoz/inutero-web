import artistsData from "../../content/artists.json";
import type { ServiceId } from "./content";
import type { Locale } from "./i18n";

// Featured Artists roster (Phase 12). Figma draws 16 card slots
// (12220:1113, 1114, 1147); content-matrix.md → Featured Artists supplies 8
// real artists. Follows the `team.ts` precedent (D-A in design.md): a typed
// array, not MDX, since no artist has a detail route.
//
// English bios are AI-generated from the supplied Chinese — the matrix has
// no English column for this section (`待補` for all 8). Flagged here as
// non-final, same as Portfolio's English project copy precedent (D032).
//
// `photo` — the client's own Dropbox folder supplies one press photo per
// artist (content-matrix.md → Assets), landed in `public/images/artists/`.
// Only 4 of 8 were ever resolvable from the Figma file itself (its desktop
// card grid cycles exactly four real photos across 12 drawn slots); the
// other 4 come from the client's folder directly. `photo` stays optional on
// the type — `ArtistCard`'s neutral placeholder is the fallback if a future
// artist ships without one, not a state any of today's 8 are in.
export type Artist = {
  slug: string;
  nameEn: string;
  nameZh: string;
  bioEn: string;
  bioZh: string;
  services: readonly ServiceId[];
  photo?: string;
};

export const artists: Artist[] = artistsData as Artist[];

export function artistDisplay(artist: Artist, locale: Locale) {
  return {
    name: locale === "en" ? artist.nameEn : artist.nameZh,
    bio: locale === "en" ? artist.bioEn : artist.bioZh,
  };
}

import type { TagColor } from "../../../_components/Tag";
import type { NewsFilterId } from "../../../_lib/content";

// Fixed per tag, not per position — same reasoning as `serviceTagColor`
// (D089): a tag paints the same accent color on every card. Four real tags,
// four accent colors in `Tag`'s solid palette — one each, no reuse. Shared
// between `NewsGrid` and `NewsTopStory` (Phase 13a) so the banner's tag chip
// and the grid's cards never disagree on a tag's color.
export const newsTagColor: Record<NewsFilterId, TagColor> = {
  "artists-works": "neon",
  "global-touring": "yellow",
  events: "orange",
  "about-in-utero": "green",
};

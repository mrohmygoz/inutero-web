// Featured Artists (Phase 12). Desktop 12612:8774, mobile 12211:3608.
//
// Copy is the content matrix (D032), not the Figma text layers — the
// tagline and heading round-trip: Figma's tagline ("FEATURED ARTISTS")
// becomes the heading, and a new tagline ("OUR PARTNERS") is introduced.
// The header description paragraph is `直接刪除` and stays hidden, same as
// Portfolio's header (D-A parity).
//
// Filter tag labels and ids are Portfolio's own (`serviceAnchors` in
// routes.ts) — the matrix's five tags for this page are byte-identical to
// Portfolio's, so this reuses that list rather than inventing a second
// source for the same five strings (design.md D-B).
const artists = {
  hero: {
    eyebrow: "Our Partners",
    headingLines: ["Featured Artists"],
  },
  filter: {
    label: "Filter",
    all: "All",
    tags: {
      "artist-management": "Artist Management",
      "international-booking": "Global Touring",
      "pr-marketing": "PR & Marketing",
      "event-production": "Event Production",
    },
    // Derived — no prototype on any of the four Artists frames (design.md).
    empty: "No artists in this category yet.",
  },
};

export default artists;

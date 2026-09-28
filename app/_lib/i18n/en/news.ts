// News (Phase 13). Desktop 12612:8808, mobile 12211:4003.
//
// Copy is the content matrix (D032), not the Figma text layers — the eyebrow
// swaps NEWS -> JOURNAL, and the filter tag set is News's own taxonomy
// (design.md D-A), not the drawn sample ("Industry / Artists / Tour /
// Company / Events") and not `serviceAnchors`. Tag casing follows the
// matrix's own row exactly ("Artists & works", lowercase w — not title case).
//
// `filter.label` stays "Filter" in both locales: unlike Portfolio/Artists,
// the TC mobile frame (12368:2646) draws the English word "Filter" itself,
// not a translated label, and the matrix has no row for it.
const news = {
  header: {
    eyebrow: "Journal",
    headingLines: ["Tuning in"],
    body: "Updates on artists, collaborations, and what we're building.",
  },
  filter: {
    label: "Filter",
    all: "All",
    tags: {
      "artists-works": "Artists & works",
      "global-touring": "Global Touring",
      events: "Events",
      "about-in-utero": "About In Utero",
    },
    // Derived — Figma draws no empty state, and the reaction sweep found no
    // prototype on any filter tag (Portfolio/Artists precedent).
    empty: "No articles in this category yet.",
  },
  pagination: {
    next: "Next",
    label: "News pages",
    page: "Page",
  },
  // Top News banner (Phase 13a). Desktop 12573:7967/7968, mobile 12211:4017,
  // mobile TC 12368:2637. The four frames disagree on featured content — this
  // is a build-time editorial pick, not a Figma transcription (design.md,
  // DECISIONS.md D102). A slug that doesn't resolve in this locale's manifest
  // fails the build loudly (D002), never a silent fallback.
  featuredSlug: "2026-05-13-in-utero-huan-huan-community-tour",
  // News Details (Phase 14). Desktop 12612:8828, mobile 12211:4467. Copy is
  // content-matrix.md's "News Details" table, not the Figma sample text.
  detail: {
    breadcrumb: "News",
    relatedTagline: "more for you",
    relatedHeading: "Related Posts",
    relatedButton: "View all post",
  },
};

export default news;

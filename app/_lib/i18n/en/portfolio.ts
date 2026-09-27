// Portfolio (Phase 10). Desktop 12612:8704, mobile 12210:3063.
//
// Copy is the content matrix (D032), not the Figma text layers. Three places
// where they disagree, matrix winning each time:
//   - Eyebrow: the mobile Title Group draws "CASE STUDIES". The matrix renames
//     it to PORTFOLIO and marks it `keep EN` for both locales.
//   - Heading: both TC frames draw 過往案例, which is the NAV's link label for
//     this route. The matrix gives 過往專案 for the page heading.
//   - Header description: the matrix marks it `直接刪除段落`. Neither frame
//     actually draws one any more, so there was nothing to remove.
//
// Filter tag labels are the matrix's own row for this page, NOT the Services
// page's service titles — #2 is "Global Touring" here against Services'
// "International Booking & Tour Planning". Only the ids are shared, via
// `serviceAnchors` in routes.ts, so the two lists cannot drift on identity.
const portfolio = {
  hero: {
    eyebrow: "Portfolio",
    // Desktop EN sets one word per line; mobile EN wraps to the same two.
    headingLines: ["All", "projects"],
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
    // Derived — Figma draws no empty state, and the reaction sweep found no
    // prototype on any filter tag.
    empty: "No projects in this category yet.",
  },
  pagination: {
    next: "Next",
    label: "Portfolio pages",
    page: "Page",
  },
  // Portfolio Details (Phase 11). Desktop 12612:8706, mobile 12211:3371.
  // Breadcrumb label is "Portfolio" per the content matrix — the page's NAV
  // link label from routes.ts, not the Portfolio hero's own "All projects"
  // heading text.
  detail: {
    breadcrumb: "Portfolio",
    metaClient: "Client",
    metaDate: "Date",
    metaRole: "Role",
    gallery: "Gallery",
    prev: "Previous project",
    next: "Next project",
  },
};

export default portfolio;

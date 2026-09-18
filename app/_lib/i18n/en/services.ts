// Services (Phase 8, part 1). Desktop 12612:8668, mobile 12220:2064.
//
// Copy is the content matrix (D032), not the Figma text layers. The two
// disagree substantially on this page and the matrix wins every time:
//   - Both hero body text layers are stale copy from other pages (the desktop
//     layer is News's, the mobile layer is Portfolio's). The LIVE text in both
//     frames is already the matrix line below — only the layer names are stale.
//   - Every service description and all twelve feature rows are different text
//     in Figma ("Cross-Border Positioning", "Nurturing authenticity…"). Those
//     are the designer's placeholder pass; the matrix rows are the delivered
//     copy.
//   - The desktop cards draw FOUR feature rows, the fourth a verbatim duplicate
//     of the third. Three is the real count (mobile EN draws three). See D066.
//
// The FAQ copy is deliberately absent — that section is Phase 9.
const services = {
  hero: {
    eyebrow: "Services", // stays English in both locales (matrix: `keep EN`)
    // Two authored segments at both breakpoints: desktop EN sets one per line,
    // mobile EN wraps each. The zh module splits at its comma the same way.
    headingLines: ["Modern Strategy.", "Rooted in Culture."],
    body: "We provide integrated support across the full lifecycle of music projects.",
    imageAlt: "The In Utero team seated among stacked lockers and cabinets",
  },
  // Drawn in Figma, absent from the matrix. "View case studies" / 相關案例 is
  // why these point at Portfolio rather than Contact (D067).
  ctaLabel: "View case studies",
  items: [
    {
      index: "01",
      title: "Artist Management",
      description:
        "Driving comprehensive career development for artists through strategic planning, music distribution, brand partnerships, and long-term vision to cultivate growth and global visibility. We bridge the gap between creative soul and market momentum, serving as a steadfast partner for artists from their foundational branding to the global stage.",
      imageAlt: "A band performing to a seated audience at a community hall",
      features: [
        {
          title: "Career & Distribution Strategy",
          description:
            "Developing global management strategies and music distribution plans to precisely navigate domestic and international markets.",
        },
        {
          title: "Business & Legal Affairs",
          description:
            "Managing complex contracts, copyright administration, and commercial negotiations, allowing creators to focus entirely on their music.",
        },
        {
          title: "Crisis PR & Management",
          description:
            "Monitoring social media dynamics in real time to safeguard artist reputation and manage public relations efficiently.",
        },
      ],
    },
    {
      index: "02",
      title: "International Booking & Tour Planning",
      description:
        "Curating and booking cross-border tours and events—bringing international acts to Taiwan while sending Taiwanese talent abroad to foster global musical exchange. Leveraging sharp market intuition and an extensive overseas network, we act as a two-way bridge connecting Taiwan with the global music scene, flawlessly executing both domestic showcases for international talent and global tours for local acts.",
      imageAlt: "A band mid-set on a wide stage under green wash lighting",
      features: [
        {
          title: "Cross-Border Tour Planning",
          description:
            "Coordinating domestic and international tour routing, booking management, and on-site local execution.",
        },
        {
          title: "International Booking",
          description:
            "Securing placement for exceptional Taiwanese artists at global music festivals, industry showcases, and cross-border collaborations.",
        },
        {
          title: "Global Talent Gateway",
          description:
            "Introducing cutting-edge and emerging acts to Taiwan, opening new horizons for the local live market.",
        },
      ],
    },
    {
      index: "03",
      title: "PR & Marketing",
      description:
        "Delivering integrated PR and marketing strategies, spanning media relations, EPKs, digital advertising, and multilingual campaigns to maximize international reach. Navigating today's fragmented markets, we tell stories in a language that honors the creator's vision, utilizing tailored global PR strategies to push exceptional music beyond traditional boundaries.",
      imageAlt: "A solo guitarist on a small stage beneath a hand-painted BAND SHOW banner",
      features: [
        {
          title: "Global PR & Media Relations",
          description:
            "Crafting media-facing press releases, refined EPKs, and managing press junkets to secure features across local and international outlets.",
        },
        {
          title: "Multilingual Social Campaigning",
          description:
            "Providing culturally attuned content curation, visual adaptation, and cross-border promotion across Chinese, English, and Japanese channels.",
        },
        {
          title: "Precision Digital Advertising",
          description:
            "Combining streaming platform analytics with social marketing to convert promotional resources into global reach and listener retention.",
        },
      ],
    },
    {
      index: "04",
      title: "Event Production",
      description:
        "Providing end-to-end event production services from showcases to large-scale festivals, managing everything from budgeting and logistics to technical production and on-site execution. From intimate listening parties and livehouse showcases to massive festivals, we manifest imaginative concepts into premium live experiences.",
      imageAlt: "Zines and potted plants arranged on a table by a window at an event space",
      features: [
        {
          title: "End-to-End Production Management",
          description:
            "Overseeing budget controls, timelines, administrative compliance, and ticketing operations.",
        },
        {
          title: "Technical Production & Operations",
          description:
            "Partnering closely with professional stage designers, lighting, and sound crews to ensure international-caliber production standards.",
        },
        {
          title: "On-Site Execution",
          description:
            "Ensuring seamless live coordination, rapid crisis management, and clear communication with multinational artist teams to deliver flawless event experiences.",
        },
      ],
    },
  ],
};

export default services;

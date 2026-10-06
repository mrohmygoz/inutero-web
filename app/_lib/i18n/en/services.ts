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
// The FAQ copy was deliberately absent in Phase 8; Phase 9 added it below.
import type { RouteKey } from "../../routes";

const services = {
  hero: {
    eyebrow: "Services", // stays English in both locales (matrix: `keep EN`)
    // Two authored segments at both breakpoints: desktop EN sets one per line,
    // mobile EN wraps each. The zh module splits at its comma the same way.
    headingLines: ["Modern Strategy.", "Rooted in Culture."],
    body: "We provide integrated support across the full lifecycle of music projects.",
    imageAlt: "The In Utero team seated among stacked lockers and cabinets",
  },
  items: [
    {
      index: "01",
      title: "Artist Management",
      // Drawn in Figma, absent from the matrix. "View case studies" / 相關案例
      // is why these point at Portfolio by default (D067) — Artist Management
      // is the one exception, since Artists is its own, more specific case-
      // study page.
      ctaLabel: "View artists",
      ctaHref: "artists" as RouteKey,
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
      ctaLabel: "View case studies",
      ctaHref: "portfolio" as RouteKey,
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
      ctaLabel: "View case studies",
      ctaHref: "portfolio" as RouteKey,
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
      ctaLabel: "View case studies",
      ctaHref: "portfolio" as RouteKey,
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
  // FAQ (Phase 9). Desktop 12573:6686, mobile 12220:2269.
  //
  // The matrix REPLACES the Figma question set wholesale — the client sheet
  // shifted each answer up one row against the Figma question beside it and
  // dropped one, and the sheet's 備註 on Figma's Q3 reads 直接刪掉. Do not
  // reconcile against the Figma text layers or layer names (D032):
  //   - Desktop EN rows 3 and 4 are near-duplicates, and row 4 is a question
  //     the sheet deleted.
  //   - The mobile TC frame is the one that already renders the final five
  //     questions verbatim, which is what corroborates this set.
  //   - The TC answer to Q1 is a longer earlier draft in every frame; the
  //     matrix line below is the delivered copy.
  //
  // FIVE items, not six. The sheet's sixth row is still 待補 and is omitted
  // rather than placeheld, which also matches Figma's five drawn rows. The
  // obligation lives in content-matrix.md's outstanding-copy table — it is
  // blocked on the client, not on a phase.
  faq: {
    eyebrow: "FAQs", // stays English in both locales (matrix: `keep EN`)
    heading: "Common questions", // uppercased in CSS, as every other heading is
    items: [
      {
        question:
          "What makes In Utero different from traditional management or PR agencies?",
        answer:
          "We don't confine ourselves to a single artist or brand; instead, we have built a mature operational ecosystem that allows us to collaborate across various genres and styles, precisely engaging niche markets to create true impact. Most importantly, In Utero approaches the market through the lens of independent music and culture. Commercial success is rarely our sole priority. What we care about most is empowering creators and brands to tell their stories authentically, connecting them with the right audiences, and serving as an ever-accessible strategic partner.",
      },
      {
        question: "Do you work with artists outside of Taiwan?",
        answer:
          "Absolutely. We have collaborated with artists from Hong Kong, Japan, South Korea, Thailand, and beyond. Beyond on-site local execution and press campaigns within Taiwan, our services encompass strategic promotional rollouts across the entire East Asian region. Please feel free to reach out to discuss how we can work together.",
      },
      {
        question: "Can I hire In Utero for a single event or specific project?",
        answer:
          "Yes. We tailor our collaborations to fit each client's specific needs and current developmental stage, which includes phased project-based partnerships. Whether it's production for a single event, a tailored PR campaign for a new release, or routing a specific leg of a tour, we provide precise, professional support where it matters most.",
      },
      {
        question: "Is it still possible to work with you if I have a limited budget?",
        answer:
          "Definitely. Lean budgets simply require a different approach. We can help you audit and streamline your available resources to maximize impact with minimal investment. Please feel free to be direct about your budget and challenges—let's talk and find a viable way to keep your project moving forward.",
      },
      {
        question: "How do we start working with In Utero?",
        answer:
          "Drop us a line anytime! Head over to our Contact section below and reach out to the relevant department (Business, Management, or PR & Marketing). Share a brief overview of your current project, music, or preliminary ideas, and we'll set up a time to chat and find our rhythm together.",
      },
    ],
  },
};

export default services;

// Home copy follows openspec/reference/content-matrix.md → Home, which outranks the
// Figma text layers for wording (D032). Two rows deliberately differ from what the
// frames draw; both are flagged at their key below.
const en = {
  home: {
    title: "Home",
    metaDescription:
      "In Utero Inc. works with artists, brands, and cultural partners to develop meaningful music projects — from management to international touring and promotion.",
    hero: {
      // Four staggered display words, not two lines of text (12405:6951-6954 desktop,
      // I10275:3094;10275:3088-3091 mobile). Alternating white / accent-neon.
      headlineWord1: "Creative",
      headlineWord2: "Souls",
      headlineWord3: "Global",
      headlineWord4: "Visions",
      // MATRIX OVERRIDE: ends "touring and promotion". Both hero frames still draw
      // "touring and live production" — the matrix wins (D032).
      body: "We work with artists, brands, and cultural partners to develop meaningful music projects, from management to international touring and promotion.",
      ctaPrimary: "View our work",
      ctaSecondary: "Work with us",
      // Stays English in the TC frames too (I12368:2415;10275:3143).
      scrollLabel: "scroll down",
    },
    intro: {
      eyebrow: "Mission",
      headline: "Connecting Taiwan's music ecosystem to the global stage.",
      // Two paragraphs on the EN frames, one on the TC frames — hence an array.
      // Matrix says "real experience" (singular); the desktop frame draws
      // "experiences". Matrix wins.
      bodyParagraphs: [
        "We work with artists who create from real experience, not formulas.",
        "We believe music is a cultural language - shaped by where it comes from and where it can go.",
      ],
      // MATRIX OVERRIDE (user decision 2026-08-03): the matrix row reads "Our story"
      // and the Figma frame draws it lowercase, but the page name is "Our Story"
      // everywhere else — `routes.ts`, the NAV, and the Footer all take it from one
      // typed table (D018). `Cta` renders uppercase so this is invisible on screen,
      // but the two spellings sat side by side in the DOM. Do not revert to the
      // matrix's casing. See D048.
      cta: "Our Story",
    },
    // Home's Services summary (12210:2346 desktop, 10275:2585 mobile). A four-item
    // accordion; Figma draws only item 1 open, so only item 1's description appears
    // in the frames. The other three come from the matrix, which supplies all four —
    // an interactive accordion needs a body for every item.
    services: {
      eyebrow: "Services",
      headline: "Your all-in-one partner for global music reach.",
      cta: "full services list",
      items: [
        {
          title: "Artist Management",
          description:
            "Driving comprehensive career development for artists through strategic planning, music distribution, artist branding & identity and long-term vision to cultivate growth and global visibility.",
        },
        {
          title: "International Booking & Tour Planning",
          description:
            "Curating and booking cross-border tours and events. Bringing international acts to Taiwan while sending Taiwanese artists abroad to foster global musical exchange.",
        },
        {
          title: "PR & Marketing",
          description:
            "Delivering integrated PR and marketing strategies, spanning media relations, EPKs, digital advertising, and multilingual campaigns to maximize international reach.",
        },
        {
          title: "Event Production",
          description:
            "Providing end-to-end event production services from showcases to large-scale festivals, managing everything from budgeting and logistics to technical production and on-site execution.",
        },
      ],
    },
    // Featured Projects (12210:2392 desktop, 10275:3132 mobile). The cards come from
    // content-matrix → "Home — featured project cards (3)", which REPLACES Figma's
    // third card: the frames draw "Yesterday Once More" (臥軌的火車), the matrix lists
    // In Utero Present Vol.3. Matrix wins on copy (D032).
    //
    // Figma splits each card into a title and a short date line, so the matrix's
    // single bolded string is split across those two slots rather than dropping the
    // "In Utero Present Vol.N" half.
    featuredProjects: {
      eyebrow: "Portfolio",
      heading: "Featured Projects",
      cta: "View all projects",
      cards: [
        {
          dateLabel: "2025.11 In Utero Present Vol.2",
          title: "Bottoms Up",
          description:
            "Bringing together L8ching, Giyu Tjuljaviya, and Erin Song, this tour transformed everyday encounters and musical rhythms into a shared live experience.",
          tags: ["Artist Management", "Tour Planning", "PR & Marketing"],
          image: "/images/projects/bottoms-up.jpg",
        },
        {
          dateLabel: "2024.09 In Utero Present Vol.1",
          title: "Hotpot Band Show",
          description:
            'Hosted at Chan Chi Hot Pots Lab, Ximen, this event reimagined the classic "dinner show" concept, blending live performances with a hotpot dining experience.',
          tags: ["Tour Planning", "PR & Marketing"],
          image: "/images/projects/hotpot-band-show.jpg",
        },
        {
          dateLabel: "2026.05 In Utero Present Vol.3",
          title: "Inner Voices of That Day",
          description:
            "Partnering with Huan Huan, we brought music directly to local communities, creating warm, cross-generational gatherings for seniors and neighbors alike around Mother's Day.",
          tags: ["Tour Planning", "PR & Marketing"],
          image: "/images/projects/inner-voices-of-that-day.jpg",
        },
      ],
    },
  },
  // Our Story (Phase 7). Desktop 12612:8545, mobile 12210:2817.
  about: {
    title: "Our Story",
    metaDescription:
      "In Utero Inc. was founded in 2017 by Meng Ku and May Wu, and has grown into a full-spectrum music brand connecting Taiwan's independent music scene to a global audience.",
    hero: {
      eyebrow: "Our Story",
      // Figma's own drawn headline (12573:10599/10600, 113px Display/H1), NOT the
      // matrix's "Real artists. Real stories." row — that row duplicates the
      // Intro's heading verbatim and both TC frames confirm the two headings
      // differ, so it reads as a transcription slip. See proposal.md → Copy
      // conflicts resolved, and D049 in openspec/DECISIONS.md.
      headlineLine1: "From",
      headlineLine2: "Taiwan",
      headlineLine3: "to the",
      headlineLine4: "world",
      // MATRIX OVERRIDE: Figma's own EN hero body is a short two-sentence summary
      // ("In Utero is a Taiwan-based music brand..."). The matrix's founder story
      // is used instead (D032 default, reaffirmed as D-C/D049) — the hero grows
      // to fit; its height is derived, not design-matching.
      bodyParagraphs: [
        `In Utero Ltd. was founded in 2017 by Meng Ku and May Wu, two seasoned professionals in Taiwan's independent music scene who first crossed paths in London. Bound by a shared passion for independent music, they teamed up to provide a rock-solid foundation for everything outside the artist's creative process, driven by a clear vision: "From Taiwan to the world."`,
        "Over the years, In Utero has evolved into a full-spectrum music brand and cultural curatorial unit deep within the indie scene. Beyond acting as the driving force behind major events like FIREBALL Fest. and the Golden Indie Music Awards (GIMA), the company works closely with local indie acts while actively boosting the presence of international talent in Taiwan. Our mission centers on the artist's narrative, ensuring real stories are heard by a wider global audience.",
      ],
    },
    intro: {
      eyebrow: "Mission",
      headlineLine1: "Real artists.",
      headlineLine2: "Real stories.",
      // Figma's own body (12573:6127 desktop, 12212:6370 mobile) — the matrix's
      // `REMOVE` annotation cited the wrong node and is overridden; see D-D /
      // D050. One paragraph on the EN frame; the TC frame draws two (see zh.ts).
      bodyParagraphs: [
        `In Utero Ltd. was founded in 2017 by Meng Ku and May Wu, two seasoned professionals in Taiwan's independent music scene who first crossed paths in London. Bound by a shared passion for independent music, they teamed up to provide a rock-solid foundation for everything outside the artist's creative process, driven by a clear vision: "From Taiwan to the world."`,
        "Over the years, In Utero has evolved into a full-spectrum music brand and cultural curatorial unit deep within the indie scene. Beyond acting as the driving force behind major events like FIREBALL Fest. and the Golden Indie Music Awards (GIMA), the company works closely with local indie acts while actively boosting the presence of international talent in Taiwan. Our mission centers on the artist's narrative, ensuring real stories are heard by a wider global audience.",
      ],
    },
    howWeWork: {
      eyebrow: "Approach",
      heading: "How We Work",
      points: [
        {
          title: "Artists-first perspective",
          description:
            "Every decision starts from the artist's voice, ensuring authenticity at every stage.",
        },
        {
          title: "International connection",
          description:
            "We bridge local culture with global opportunities, connecting artists to the right audiences worldwide.",
        },
        {
          title: "Professional execution",
          description:
            "We turn ideas into structured, well-delivered outcomes with clarity and precision.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      heading: "The People Behind",
    },
  },
  common: {
    siteName: "In Utero Inc.",
  },
  nav: {
    menuClose: "Close",
  },
  // UniversalCTA 12653:5649. The heading and the inquiries label are English in BOTH
  // locales — that is what the CN/TC frames show, not a missing translation.
  universalCta: {
    headingLine1: "Let's make",
    headingLine2: "Some noise",
    button: "Work with us",
    inquiriesLabel: "General Inquiries",
  },
  share: {
    label: "Share",
    copied: "Copied",
    copyLink: "Copy link to this page",
    linkedin: "Share on LinkedIn",
    x: "Share on X",
    facebook: "Share on Facebook",
  },
  newsletter: {
    heading: "Stay connected with us",
    description:
      "Get updates on artists, projects, and what we're building — direct to your inbox.",
    placeholder: "youremail@gmail.com",
    button: "Sign up",
  },
  footer: {
    servicesHeading: "Services",
    artistManagement: "Artist Management",
    internationalTourPlanning: "International Booking & Tour Planning",
    prMarketing: "PR & Marketing",
    eventProduction: "Event Production",
    pagesHeading: "In Utero",
    newsletterLabel: "Subscribe to our newsletter",
    newsletterPlaceholder: "youremail@gmail.com",
    newsletterCta: "Sign up",
    newsletterDisclaimer:
      "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiesSettings: "Cookies Settings",
    copyright: "© 2026 In Utero. All rights reserved.",
  },
};

export default en;

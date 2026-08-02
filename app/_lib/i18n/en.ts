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
      cta: "Our story",
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

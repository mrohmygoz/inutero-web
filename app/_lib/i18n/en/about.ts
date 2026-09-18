// Our Story (Phase 7). Desktop 12612:8545, mobile 12210:2817.
const about = {
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
};

export default about;

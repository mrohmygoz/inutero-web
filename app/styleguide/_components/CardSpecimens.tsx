import ArtistCard from "@/app/_components/ArtistCard";
import TeamCard from "@/app/_components/TeamCard";
import ServiceCard from "@/app/_components/ServiceCard";
import Article from "@/app/_components/Article";
import type { Locale } from "@/app/_lib/i18n";

const copy = {
  en: {
    artistName: "Panai",
    artistGenre: "Puyuma and Amis tribes",
    artistBio: "Mi tincidunt elit, id quisque ligula ac diam, amet.",
    teamName: "Meng",
    teamRole: "Founder & Creative Director",
    teamBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    serviceTitle: "Artist Management",
    serviceDescription:
      "Nurturing authenticity, engineering growth. We act as the strategic backbone for artists who have a story to tell.",
    serviceFeatures: [
      {
        title: "Cross-Border Positioning",
        description:
          "Tailored strategies to transition Taiwanese talent into international markets without losing their original \"spirit.\"",
      },
      {
        title: "Long-Term Career Mapping",
        description:
          "We plan beyond the next release — building catalog, profile, and legacy simultaneously.",
      },
    ],
    ctaLabel: "View case studies",
    // Real content from the desktop Article definition (12612:7696).
    articleTag: "Company",
    articleDate: "June 12, 2026 / 5 min read",
    articleTitle: "In Utero Summer 2026 — what we're working on",
  },
  zh: {
    // Real TC content from Featured Artists (I12635:12928;12612:8773;...) —
    // name is just "巴奈" (no bilingual prefix), and the genre line is not a
    // literal translation of the EN copy ("Puyuma and Amis tribes") — Figma's
    // TC uses "原住民歌手" (Indigenous singer) instead, its own phrasing.
    // The bio is real company copy, not a Lorem-ipsum placeholder like the EN card.
    artistName: "巴奈",
    artistGenre: "原住民歌手",
    artistBio: "子皿與來自台灣與世界傑出的創作音樂人、音樂品牌攜手合作。",
    // TeamCard's real TC content wasn't in the frames checked (Our Story page,
    // not fetched this pass) — name and role are unverified guesses; not
    // corrected beyond what was already there.
    teamName: "Meng",
    teamRole: "創辦人暨創意總監",
    teamBio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.",
    // Real ServiceCard TC content from the Services TC page
    // (I12635:12925;12612:8667;...).
    serviceTitle: "藝人經紀整合",
    serviceDescription:
      "全方位驅動藝人職涯發展。從長遠的戰略規劃、音樂發行佈局到藝人形象經營，我們一路並肩同行，將感性的創作靈魂轉化為具備市場推進力的長期戰略，成為藝術家從草創定位走向國際舞台最堅實的後盾。",
    serviceFeatures: [
      {
        title: "全方位驅動藝人職涯發展",
        description:
          "從長遠的戰略規劃、音樂發行佈局到藝人形象經營，我們一路並肩同行，將感性的創作靈魂轉化為具備市場推進力的長期戰略，成為藝術家從草創定位走向國際舞台最堅實的後盾。",
      },
      {
        title: "職涯與發行戰略",
        description: "制定全球經紀策略與音樂發行計畫，精準佈局海內外市場。",
      },
    ],
    ctaLabel: "相關案例",
    // Real content from the News TC page (I12635:12929;12612:8806;...). The
    // date is left untranslated in Figma's own TC frame — same pattern as the
    // eyebrows in D016 — reproduced as-is rather than inventing a translation.
    articleTag: "子皿營運日誌",
    articleDate: "June 12, 2026 / 5 min read",
    articleTitle: "雷擎《春子》新專輯聽歌會活動新聞稿",
  },
} as const;

const socialLinks = [
  { href: "#", iconSrc: "/icons/social/social-1.svg", label: "Link" },
  { href: "#", iconSrc: "/icons/social/social-2.svg", label: "LinkedIn" },
  { href: "#", iconSrc: "/icons/social/social-3.svg", label: "YouTube" },
  { href: "#", iconSrc: "/icons/social/social-4.svg", label: "Facebook" },
];

export default function CardSpecimens({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-start gap-8">
        <ArtistCard
          name={t.artistName}
          genre={t.artistGenre}
          bio={t.artistBio}
          image={{ src: "/images/cards/artist-card.png", alt: t.artistName }}
          socialLinks={socialLinks}
        />
        <TeamCard
          name={t.teamName}
          role={t.teamRole}
          bio={t.teamBio}
          image={{ src: "/images/cards/team-card.png", alt: t.teamName }}
        />
      </div>

      {/* ServiceCard is a full-bleed 1440px band, not a contained element (D-C) —
          break it out of the styleguide's max-w-(--container-large) wrapper so its
          column proportions match the real Figma composition instead of being
          squeezed into a ~1152px content width. */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <ServiceCard
          index="01"
          title={t.serviceTitle}
          description={t.serviceDescription}
          features={t.serviceFeatures}
          ctaLabel={t.ctaLabel}
          ctaHref="#"
          image={{ src: "/images/cards/service-card.png", alt: t.serviceTitle }}
        />
      </div>

      <Article
        title={t.articleTitle}
        tag={t.articleTag}
        tagColor="neon"
        dateLabel={t.articleDate}
        image={{ src: "/images/cards/article-card.png", alt: t.articleTitle }}
        href="#"
      />
    </div>
  );
}

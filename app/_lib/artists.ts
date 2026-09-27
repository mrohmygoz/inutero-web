import type { ServiceId } from "./content";
import type { Locale } from "./i18n";

// Featured Artists roster (Phase 12). Figma draws 16 card slots
// (12220:1113, 1114, 1147); content-matrix.md → Featured Artists supplies 8
// real artists. Follows the `team.ts` precedent (D-A in design.md): a typed
// array, not MDX, since no artist has a detail route.
//
// English bios are AI-generated from the supplied Chinese — the matrix has
// no English column for this section (`待補` for all 8). Flagged here as
// non-final, same as Portfolio's English project copy precedent (D032).
//
// `photo` — the client's own Dropbox folder supplies one press photo per
// artist (content-matrix.md → Assets), landed in `public/images/artists/`.
// Only 4 of 8 were ever resolvable from the Figma file itself (its desktop
// card grid cycles exactly four real photos across 12 drawn slots); the
// other 4 come from the client's folder directly. `photo` stays optional on
// the type — `ArtistCard`'s neutral placeholder is the fallback if a future
// artist ships without one, not a state any of today's 8 are in.
export type Artist = {
  slug: string;
  nameEn: string;
  nameZh: string;
  bioEn: string;
  bioZh: string;
  services: readonly ServiceId[];
  photo?: string;
};

export const artists: Artist[] = [
  {
    slug: "bugs-of-phonon",
    nameEn: "Bugs of Phonon",
    nameZh: "聲子蟲",
    services: ["international-booking", "pr-marketing"],
    bioZh:
      "組成於2008年，一組以吉他、貝斯、鼓、電子聲響的後搖滾樂隊，音樂時而寧靜美好，在美好之中又隱含著風雨欲來的暴戾。",
    // AI-generated, non-final — see comment above.
    bioEn:
      "Formed in 2008, a post-rock band built from guitar, bass, drums, and electronic textures — music that drifts between serene beauty and the storm quietly gathering beneath it.",
    photo: "/images/artists/bugs-of-phonon.jpg",
  },
  {
    slug: "jpbs",
    nameEn: "JPBS",
    nameZh: "JPBS",
    services: ["international-booking"],
    bioZh:
      "來自曼谷的器樂/實驗搖滾樂隊，2023年發表首張專輯《Waiting Room》，以多元的音樂風格，建構神秘而迷人的世界，創造關於生命與死亡的故事。",
    bioEn:
      "An instrumental/experimental rock band from Bangkok. Their 2023 debut album Waiting Room builds a mysterious, captivating world out of eclectic styles — a story about life and death.",
    photo: "/images/artists/jpbs.jpg",
  },
  {
    slug: "elephant-gym",
    nameEn: "Elephant Gym",
    nameZh: "大象體操",
    services: ["artist-management", "international-booking", "pr-marketing", "event-production"],
    bioZh: "成立於高雄，為台灣少見的 Math Rock（數字/數學搖滾）樂團，2024年獲頒金曲獎評審團獎。",
    bioEn:
      "Formed in Kaohsiung, one of Taiwan's rare math rock bands. Winner of the Jury Award at the 2024 Golden Melody Awards.",
    photo: "/images/artists/elephant-gym.jpg",
  },
  {
    slug: "huan-huan",
    nameEn: "Huan Huan",
    nameZh: "緩緩",
    services: ["artist-management", "international-booking", "pr-marketing", "event-production"],
    bioZh:
      "成立於台北的另類流行樂團，歌曲大多不快偏慢，明亮又柔和，像是安靜的朋友，陪你行經每一個日常。",
    bioEn:
      "An alt-pop band from Taipei whose unhurried, bright and gentle songs feel like a quiet friend walking beside you through everyday life.",
    photo: "/images/artists/huan-huan.jpg",
  },
  {
    slug: "panai",
    nameEn: "Panai",
    nameZh: "巴奈",
    services: ["artist-management", "pr-marketing", "event-production"],
    bioZh:
      "身兼歌手、創作者與環境保護者等多重身分，在台灣多項環境運動上，巴奈都選擇挺身而出，以音樂、甚至全副身心的生活，來作出反抗。",
    bioEn:
      "A singer, songwriter, and environmental advocate who has stood at the front of Taiwan's environmental movements, resisting through music and through the way she lives her whole life.",
    photo: "/images/artists/panai.jpg",
  },
  {
    slug: "come-on-baybay",
    nameEn: "Come on! BayBay!",
    nameZh: "來吧！焙焙！",
    services: ["artist-management", "pr-marketing", "event-production"],
    bioZh:
      "「來吧！焙焙！」核心成員為鄭焙隆、鄭焙檍兄妹雙人聲，以另類民謠風格呈現直白而偶有詩意的詞曲。",
    bioEn:
      "Built around siblings Cheng Bei-Long and Cheng Bei-Yi's dual vocals, Come on! BayBay! writes alt-folk songs that are plainspoken and, at times, quietly poetic.",
    photo: "/images/artists/come-on-baybay.jpg",
  },
  {
    slug: "flesh-juicer",
    nameEn: "Flesh Juicer",
    nameZh: "血肉果汁機",
    services: ["pr-marketing"],
    bioZh:
      "創作多以台灣信仰文化為背景，也將嗩吶、五聲音階等傳統元素融合在重金屬音樂之中，帶給聽眾強烈而直入人心的震撼。",
    bioEn:
      "Drawing on Taiwanese folk-religious culture, Flesh Juicer fuses traditional elements like the suona and pentatonic scales into heavy metal, hitting listeners with visceral, unrelenting force.",
    photo: "/images/artists/flesh-juicer.jpg",
  },
  {
    slug: "zhaolin",
    nameEn: "Zhaolin",
    nameZh: "昭霖",
    services: ["pr-marketing"],
    bioZh:
      "昭霖是來自高雄的青年藝術家、台語音樂唱作人。台語是昭霖的第一語言，家族經營的宮廟、鄉間小吃部的卡拉OK與90年代的「新台語歌」都是他重要的養分來源。",
    bioEn:
      "A young artist and Taiwanese-language singer-songwriter from Kaohsiung, for whom Taiwanese is his first language — shaped by his family's temple, rural karaoke bars, and 90s Taiwanese pop.",
    photo: "/images/artists/zhaolin.jpg",
  },
];

export function artistDisplay(artist: Artist, locale: Locale) {
  return {
    name: locale === "en" ? artist.nameEn : artist.nameZh,
    bio: locale === "en" ? artist.bioEn : artist.bioZh,
  };
}

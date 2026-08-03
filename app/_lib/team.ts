import type { Locale } from "./i18n";

// Our Story team roster (Phase 7). Figma draws 5 identical Lorem-ipsum "Meng"
// cards at desktop, 2 + a five-dot indicator at mobile (12573:6174 / 12210:2881)
// — a drawn sample, not a constraint (content-matrix.md already says the count
// may change). The client delivered 9 real photographs into
// public/images/about/, filenames encoding "{name} ／ {job title} ／ {short
// description}". Transcribed here by hand rather than parsed at build time —
// see design.md D-A for why.
//
// Descriptions were only ever written in Chinese; per the user's 2026-08-03
// decision, EN cards render the Latin name, the English title, and the
// Chinese description verbatim. Where no English title exists (`冬季限定`),
// the Chinese title serves both locales.
export type TeamMember = {
  slug: string;
  nameEn: string;
  nameZh: string;
  roleEn?: string;
  roleZh: string;
  description: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "meng",
    nameEn: "Meng",
    nameZh: "小孟",
    roleEn: "Cofounder",
    roleZh: "共同創辦人",
    description: "我聽過我看過你在我身邊隨著星月漫步把心打開",
  },
  {
    slug: "may",
    nameEn: "May",
    nameZh: "孟軒",
    roleEn: "Cofounder",
    roleZh: "共同創辦人",
    description: "tobe媽媽2026",
  },
  {
    slug: "bun",
    nameEn: "Bun",
    nameZh: "晏榕",
    roleEn: "Manager",
    roleZh: "經紀",
    description: "想要在國外開一間天〇茗茶",
  },
  {
    slug: "hanying",
    nameEn: "HanYing",
    nameZh: "涵穎",
    roleEn: "Marketing",
    roleZh: "行銷企劃",
    description: "我的生命三要素：手搖、美食、睡覺",
  },
  {
    slug: "ray",
    nameEn: "Ray",
    nameZh: "鴻濬",
    roleEn: "Marketing",
    roleZh: "行銷企劃",
    description: "自由最高！",
  },
  {
    slug: "bonnie",
    nameEn: "Bonnie",
    nameZh: "寶尼",
    roleEn: "Marketing",
    roleZh: "行銷企劃",
    description: "宅宅 Otaku",
  },
  {
    slug: "chiumei",
    nameEn: "ChiuMei",
    nameZh: "邱梅",
    roleEn: "Assistant",
    roleZh: "行政助理",
    description: "我愛貓咪",
  },
  {
    slug: "sedjam",
    nameEn: "Sedjam",
    nameZh: "小猴",
    roleEn: "Assistant",
    roleZh: "行政助理",
    description: "我是宥心媽媽",
  },
  {
    slug: "si-mamrat",
    nameEn: "Si mamrat",
    nameZh: "江明展",
    // No English title in the source filename — the Chinese title serves both
    // locales (user decision, 2026-08-03).
    roleZh: "冬季限定",
    description: "Hi我是好蒿，我不太會自我介紹。",
  },
];

const imageExtensions: Record<string, string> = {
  meng: "jpg",
  may: "jpg",
  bun: "jpg",
  hanying: "jpg",
  ray: "jpeg",
  bonnie: "jpg",
  chiumei: "jpg",
  sedjam: "jpeg",
  "si-mamrat": "jpg",
};

export function teamMemberImageSrc(member: TeamMember): string {
  return `/images/about/${member.slug}.${imageExtensions[member.slug]}`;
}

export function teamMemberDisplay(member: TeamMember, locale: Locale) {
  return {
    name: locale === "en" ? member.nameEn : member.nameZh,
    role: locale === "en" ? (member.roleEn ?? member.roleZh) : member.roleZh,
    bio: member.description,
  };
}

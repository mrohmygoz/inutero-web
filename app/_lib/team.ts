import teamData from "../../content/team.json";
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
  image: string;
};

export const teamMembers: TeamMember[] = teamData as TeamMember[];

export function teamMemberDisplay(member: TeamMember, locale: Locale) {
  return {
    name: locale === "en" ? member.nameEn : member.nameZh,
    role: locale === "en" ? (member.roleEn ?? member.roleZh) : member.roleZh,
    bio: member.description,
  };
}

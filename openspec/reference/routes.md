# Canonical Route Table

The Figma sitemap, the desktop design, and the mobile design use **three different
names** for some pages. This table is the single source of truth for route slugs and
display names. Do not re-derive naming from frame names.

## Table of Contents

- [Locale Strategy](#locale-strategy)
- [Routes](#routes)
- [Naming Drift Resolved Here](#naming-drift-resolved-here)
- [Shared Sections by Page](#shared-sections-by-page)

## Locale Strategy

| Decision | Value |
| :--- | :--- |
| Locales | `en`, `zh` (Traditional Chinese) |
| Default for first-time visitor | `en` |
| URL shape | Explicit prefix on both: `/en/...` and `/zh/...` |
| Bare `/` | Redirects to `/en` |
| Segment | `app/[locale]/...` |

No implicit-default-locale routing — both locales carry their prefix. This keeps
every page's URL symmetric and avoids the duplicate-content ambiguity that comes
from serving the same page at `/about` and `/en/about`.

## Routes

| Route (en) | Route (zh) | Display name (EN) | Display name (TC) | Dynamic |
| :--- | :--- | :--- | :--- | :--- |
| `/en` | `/zh` | Home | 首頁 | — |
| `/en/about` | `/zh/about` | Our Story | 關於子皿 | — |
| `/en/services` | `/zh/services` | Services | 服務項目 | — |
| `/en/portfolio` | `/zh/portfolio` | Portfolio | 過往案例 | — |
| `/en/portfolio/[slug]` | `/zh/portfolio/[slug]` | Portfolio Details | 專案內容 | MDX |
| `/en/artists` | `/zh/artists` | Featured Artists | 合作藝人 | — |
| `/en/news` | `/zh/news` | News | 子皿超音波 | — |
| `/en/news/[slug]` | `/zh/news/[slug]` | News Details | 文章內容 | MDX |
| `/en/contact` | `/zh/contact` | Contact Us | 聯絡我們 | — |

Slugs stay English in both locales. This is reversible — if localized slugs are
wanted later, that is a routing change, so decide before Phase 3 ships stub routes.

## Naming Drift Resolved Here

| Route | Sitemap said | Desktop said | Mobile said | Canonical |
| :--- | :--- | :--- | :--- | :--- |
| `/about` | 關於子皿 About In Utero | Our Story | Our Stories | **Our Story** |
| `/artists` | 合作藝人 Featured Artists | Our Artist | Featured Artists | **Featured Artists** |
| `/portfolio/[slug]` | 專案內容 Portfolio Details | Portfolio Details | Project Details | **Portfolio Details** |

## Shared Sections by Page

Which pages use which shared component. Build these once in the shell and shared-block
phases; never re-implement per page.

| Component | Used on |
| :--- | :--- |
| NAV | all 9 |
| Footer | all 9 |
| UniversalCTA | `/`, `/about`, `/services`, `/portfolio`, `/portfolio/[slug]`, `/artists` |
| NewsletterSignup | `/news`, `/news/[slug]` |
| Article (card) | `/news`, `/news/[slug]` (related content) |
| CMS (long-form body) | `/news/[slug]` |
| Project card | `/portfolio`, `/` (專案精選) |
| Artist Card | `/artists` |
| ServiceCard | `/services`, `/` (核心服務) |
| TeamCard | `/about` |

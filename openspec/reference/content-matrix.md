# Content Matrix — copy source of truth

Transcription of the client's copy deck, **子皿網站_內容矩陣**.

| Field | Value |
| :--- | :--- |
| Google Sheet ID | `1DMrnb5xxDZoMlt1TxX372Z_BvMn__0-vtYqwMSWLRv0` |
| Owner | `gagatzan@gmail.com` |
| Shared with us | 2026-08-02 |
| Sheet `modifiedTime` at transcription | **2026-07-31T18:43:46Z** |
| Transcribed | 2026-08-02 |

**Before using this doc in a later phase, re-check the sheet in one call** —
`get_file_metadata` with the ID above, `excludeContentSnippets: true`. If `modifiedTime`
is later than the value in the table, the client has revised the deck and this
transcription is stale.

## Table of Contents

- [How to read this](#how-to-read-this)
- [Precedence: this doc vs. Figma](#precedence-this-doc-vs-figma)
- [Open conflicts and resolved decisions](#open-conflicts-and-resolved-decisions)
- [What the client still owes](#what-the-client-still-owes)
- [Global — NAV, Footer, site-wide CTA](#global--nav-footer-site-wide-cta)
- [Home](#home)
- [Our Story](#our-story)
- [Services](#services)
- [Portfolio](#portfolio)
- [Project Details](#project-details)
- [Featured Artists](#featured-artists)
- [News](#news)
- [News Details](#news-details)
- [Contact](#contact)
- [Assets referenced by the sheet](#assets-referenced-by-the-sheet)

## How to read this

The sheet's columns encode intent, not just text. This transcription preserves that.

| Sheet marker | Means | How it appears here |
| :--- | :--- | :--- |
| `目前英文內容（Figma現有文字）` | What the Figma text layer says today. The sheet's own instructions call this *「多數為暫定文案或 Lorem ipsum 占位文字，僅供參考版型與語氣長度」* — mostly provisional, useful only for judging layout and tone length. | Shown as **Figma today** only where it differs from the final copy, so you can spot what changed. |
| `欲更改英文` blank | The Figma English is approved as-is. **Not** "no English". | Final EN = the Figma string. |
| `（保留英文）` in the Chinese column | Deliberately untranslated. Ship the English string under `/zh`. | **`keep EN`** |
| `（待補）` | Not written yet. The client owes this. | **`待補`**, and listed under [What the client still owes](#what-the-client-still-owes). |
| `直接刪除段落` / `直接拿掉` | Delete this element. A layout change, not a copy change. | **`REMOVE`** — flagged in the page's Layout instructions. |
| `新增段落` | New section not present in Figma. | **`NEW`** — flagged in the page's Layout instructions. |

Chinese copy is transcribed verbatim, including the sheet's own punctuation and spacing.
Do not "improve" it.

**The sheet's Figma links are stripped from this doc on purpose.** They point at
`7uC2EQp61AsMp8ebZQcI7w` — the original file that CLAUDE.md forbids (View seat, 6 MCP
calls/month). Node IDs are identical between that file and the working copy
`zSq5F5v3UrVAdIjuSipe3H`, so the node IDs below are safe to use directly.

## Precedence: this doc vs. Figma

| Question | Source of truth |
| :--- | :--- |
| What does a string say? | **This doc.** |
| Which strings exist, and where do they sit? | Figma. |
| Layout, spacing, type scale, component structure | Figma. |

When the final copy is materially longer or shorter than the Figma string it replaces —
the Home hero drops from four lines to two — the layout consequence is **derived** under
D005. No frame exists for the new copy. Stop and ask rather than silently reflowing a
designed lockup.

## Open conflicts and resolved decisions

| # | Issue | Status |
| :--- | :--- | :--- |
| 1 | Service #4's Chinese name: the Footer tab says `演出製作`; Home, Services, and Portfolio all say `活動製作`. | **Resolved 2026-08-02 — `活動製作`.** Site-wide name for this service line. The Footer tab is the outlier; do not reintroduce `演出製作` when transcribing it. |
| 2 | Social platform set: the sheet supplies Facebook, Instagram, YouTube, **Podcast**; the TC Footer frame `12635:16558` and the committed icon set both carry **X**. | **Resolved 2026-08-02 — Podcast replaces X.** The matrix wins over the design frame here, consistent with [precedence](#precedence-this-doc-vs-figma). All four slots now resolve to real destinations. **Icon TBD:** no Podcast glyph exists in the Figma social set, so that slot borrows the neutral link/chain glyph from the share icons rather than reusing the X logo. `social-brand/x.svg` stays committed in case the decision is reversed. |
| 3 | Footer Services column heading: the matrix gives `服務項目` with no `（保留英文）` marker, but the TC Footer frame `12635:16558` renders it as **`SERVICES`** in English — matching the `IN UTERO` label beside it, which the matrix *does* mark `保留英文`. | **Resolved 2026-08-02 — stays English.** Treat the matrix row as an oversight: the adjacent label is explicitly marked, the TC frame renders English, and `VerticalLabel`'s `rotate-90` lays CJK glyphs on their side. This is the one row where the design outranks the matrix, by explicit decision rather than by the general precedence rule. |

## What the client still owes

Rows marked `（待補）`. These are not empty strings — they are missing copy, and the phases
below cannot ship more than a shell without them.

| Page | Missing | Blocks |
| :--- | :--- | :--- |
| Portfolio | All project card content (5 cards) | Phase 10 |
| Project Details | All per-project article bodies and client quotes | Phase 11 |
| Featured Artists | Card content beyond the 8 artists listed below (design has 16 slots) | Phase 12 |
| News | Featured-banner content; all article card copy | Phase 13 |
| News Details | All article bodies; the 3 related-post cards | Phase 14 |
| Our Story | Team member bios (currently Lorem ipsum); 2nd team card | Phase 7 |
| Our Story | Web Design credit name + IG handle (`待補庭嘉露出名稱＆IG`) | Phase 7 |
| Services | One further FAQ answer marked `（待補，向子皿搜集）` | Phase 9 |
| Portfolio / Artists | Filter tag names beyond the 4 given | Phases 10, 12 |

The Chinese columns for Portfolio, Project Details, Artists, News, and News Details cards
carry the note *「可以先用AI製作中文內容提供中文版形示意」* — placeholder Chinese may be
generated to demonstrate layout. Treat anything so generated as **not final copy**.

## Global — NAV, Footer, site-wide CTA

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| NAV — locale switch | `繁中` / `EN` | — | `I12219:1123;12219:1107` |
| NAV — menu button | `menu` | — | `I12219:1123;12219:1109` |
| Footer — column heading 1 | Services | `keep EN` — the matrix says 服務項目, overruled 2026-08-02 (conflict #3) | `10275:2878` |
| Footer — service links (4) | Artist Management / International Booking & Tour Planning / PR & Marketing / Event Production | 藝人經紀／巡演規劃／行銷宣傳／活動製作 | `10275:2881,2883,2885,2887` |
| Footer — column heading 2 | In Utero | `keep EN` | `10275:3082` |
| Footer — page links (5) | About / Portfolio / Artists / News / Contacts | 關於子皿／過往案例／合作藝人／子皿超音波／聯絡我們 | `10275:2892,2894,2896,2898,2900` |
| Footer — newsletter heading | Subscribe to our newsletter | 加入子皿電子報，取得音樂新訊 | `10275:2903` |
| Footer — email placeholder | youremail@gmail.com | `keep EN` | `10275:2945` |
| Footer — subscribe button | Sign up | 訂閱 | `I10275:2941;10268:2054` |
| Footer — terms line | By clicking Sign Up you're confirming that you agree with our Terms and Conditions. | 點擊訂閱，即代表您同意我們的服務條款與隱私權政策。 | `10275:2908` |
| Footer — legal links (3) | Privacy Policy / Terms of Service / Cookies Settings | 隱私權政策／服務條款／快取設定 | `10275:2966,2969,2972` |
| Footer — copyright | © 2026 In Utero. All rights reserved. | `keep EN` | `10275:2959` |
| UniversalCTA — heading | Let's make some noise | `keep EN` | `10275:2799` |
| UniversalCTA — button | Work with us | 跟我們聊聊 | `I10275:2801;10268:2054` |

**Notes.** The Footer service-link row shows `活動製作` per conflict #1, not the sheet's
`演出製作`. The column-heading row is [conflict #3](#open-conflicts-and-resolved-decisions) —
shipped as English for now. The TC Footer frame confirms the matrix genuinely *changes* the
four service-link names: the design draws 藝人經紀整合／海內外巡演規劃／行銷宣傳／演出活動製作,
which is what the repo shipped before this change. The shortened names come from the matrix
and win under [precedence](#precedence-this-doc-vs-figma). The legal-links row carries the sheet note *「另需確認是否已有對應法律頁面」* —
confirm whether legal pages exist; none do, so D022 (inert text, not links) still stands.
The page-links row's `欲更改英文` is blank, so the Figma English is approved — but D004
already resolved that naming drift in favour of `routes.md` ("Our Story", "Contact Us"),
and `routes.ts` is unchanged.

**The sheet independently confirms two D030 judgment calls:** the UniversalCTA heading stays
English in both locales, and the button reads `跟我們聊聊`. Both were picked from conflicting
Figma frames; they are now sourced.

## Home

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Hero — headline | Creative Souls<br>Global Visions | `keep EN` | `10275:3088,3089,3090,3091` |
| Hero — body | We work with artists, brands, and cultural partners to develop meaningful music projects, from management to international touring and promotion. | 扎根於台灣獨立音樂環境茁壯的文化品牌，與來自世界傑出的音樂人攜手，用新世代手法創造影響力，用音樂打破文化疆界。 | — |
| Hero — button 1 | VIEW OUR WORK | 過往案例 | — |
| Hero — button 2 | Work with us | 跟我們聊聊 | — |
| Intro — tagline | Mission | `keep EN` | `10270:2095` |
| Intro — headline | Connecting Taiwan's music ecosystem to the global stage. | 根植本土，前進世界。 | `10270:2097` |
| Intro — body | We work with artists who create from real experience, not formulas.<br>We believe music is a cultural language - shaped by where it comes from and where it can go. | 在分眾市場林立、聽眾追求私人化敘事的時代，真誠的創作成為每個人播放器中最親密的語言。無論風格與人氣，子皿期望所有音樂故事能找到契合它的聽眾，創造文化共鳴，同時帶來經濟價值。 | `10270:2098` |
| Intro — button | Our story | 關於子皿 | `I10270:2105;10268:2054` |
| Services — tagline | Services | `keep EN` | `I10275:2585;10275:2471;10270:2095` |
| Services — headline | Your all-in-one partner for global music reach. | 全方位助力，成為你最堅實的音樂發展夥伴 | `I10275:2585;10275:2474` |
| Services — button | full services list | 完整服務項目 | `I10275:2585;10275:3156` |
| Featured Projects — tagline | PORTFOLIO | `keep EN` | — |
| Featured Projects — heading | FEATURED PROJECTS | 代表案例 | `10374:384` |
| Featured Projects — button | VIEW ALL PROJECTS | 完整案例 | `10275:3147` |

**Hero headline is the biggest layout change in the deck.** Figma draws four lines
("Taiwanese / Music / Global / stage"); the final copy is two ("Creative Souls" /
"Global Visions"). No frame exists for the two-line lockup — derived under D005, so
Phase 5 must stop and ask rather than reflow silently.

### Home — services summary cards (4)

| # | Final EN | Final ZH |
| :--- | :--- | :--- |
| 1 | **ARTIST MANAGEMENT** — Driving comprehensive career development for artists through strategic planning, music distribution, artist branding & identity and long-term vision to cultivate growth and global visibility. | **藝人經紀** — 全方位助推藝人發展。從長期規劃、形象經營、演出接洽、到合約發行等繁瑣細節。 |
| 2 | **INTERNATIONAL BOOKING & TOUR PLANNING** — Curating and booking cross-border tours and events. Bringing international acts to Taiwan while sending Taiwanese artists abroad to foster global musical exchange. | **巡演規劃** — 串連長年累積的海外資源，統籌音樂人國內外巡迴演出與海外音樂活動。 |
| 3 | **PR & MARKETING** — Delivering integrated PR and marketing strategies, spanning media relations, EPKs, digital advertising, and multilingual campaigns to maximize international reach. | **行銷宣傳** — 量身打造行銷與公關策略，精準瞄準分眾市場，結合時下行銷趨勢說好故事。 |
| 4 | **EVENT PRODUCTION** — Providing end-to-end event production services from showcases to large-scale festivals, managing everything from budgeting and logistics to technical production and on-site execution. | **活動製作** — 從專場演出到創意音樂策展，包辦企劃發想、預算規劃、統籌協調及現場執行。 |

Node IDs: `I10275:2585;10275:2546 / 2561 / 2569 / 2576`. Figma today shows Lorem ipsum for
these descriptions — the sheet note says *「說明文字目前為 Lorem ipsum 占位文字，需撰寫實際內容」*,
now satisfied by the copy above.

### Home — featured project cards (3)

| Final EN | Final ZH |
| :--- | :--- |
| **2025.11 In Utero Present Vol.2: Bottoms Up** — Bringing together L8ching, Giyu Tjuljaviya, and Erin Song, this tour transformed everyday encounters and musical rhythms into a shared live experience. | **2025.11 子皿 In Utero Present Vol.2: 一起喝酒的朋友** — 集結雷擎 L8ching、張淦勛 Giyu Tjuljaviya、宋楚琳，將日常相遇與音樂節奏化為巡迴演出。 |
| **2024.09 In Utero Present Vol.1: Hotpot Band Show** — Hosted at Chan Chi Hot Pots Lab, Ximen, this event reimagined the classic "dinner show" concept, blending live performances with a hotpot dining experience. | **2024.09 子皿 In Utero Present Vol.1: 鍋 Band Show** — 於詹記西門大世界舉辦，結合的復古餐廳秀概念，帶聽眾一邊看表演、一邊大啖美味麻辣火鍋。 |
| **2026.05 子皿 In Utero Present Vol.3：Inner Voices of That Day** — Partnering with Huan Huan, we brought music directly to local communities, creating warm, cross-generational gatherings for seniors and neighbors alike around Mother's Day. | **2026.05 子皿 In Utero Present Vol.3：彼日的心內話** — 攜手緩緩 Huan Huan 先後走訪台北市中山老人住宅暨服務中心、彰化花壇安耆日照中心，以及彰化北斗有冊店，在母親節前後為長輩與在地社區帶來一場場跨世代的音樂相聚。 |

Node IDs `10274:2308,2322,2456`. Vol.3 has a poster asset — see
[Assets](#assets-referenced-by-the-sheet).

## Our Story

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Hero — tagline | OUR STORY | `keep EN` | — |
| Hero — heading | Real artists. Real stories. | 堅守創作本質，訴說真實故事 | `12212:6345` |
| Intro — tagline | Our Philosophy | `keep EN` | — |
| Intro — heading | Real artists. Real stories. | 回歸創作本質，訴說真實故事 | — |
| Approach — tagline | Our Approach | `keep EN` | — |
| How We Work — heading | How We Work | 我們的堅持 | `12219:942` |
| Our Team — tagline | Our Team | `keep EN` | — |
| Our Team — heading | The People Behind | 認識我們的團隊 | — |

**Note the two headings differ by one word in Chinese** — Hero is `堅守創作本質`, Intro is
`回歸創作本質`. Both share the English "Real artists. Real stories." That is the sheet's
own wording, transcribed as-is; not a typo to normalize.

### Our Story — hero body

**EN:** In Utero Ltd. was founded in 2017 by Meng Ku and May Wu, two seasoned professionals
in Taiwan's independent music scene who first crossed paths in London. Bound by a shared
passion for independent music, they teamed up to provide a rock-solid foundation for
everything outside the artist's creative process, driven by a clear vision: "From Taiwan to
the world."

Over the years, In Utero has evolved into a full-spectrum music brand and cultural
curatorial unit deep within the indie scene. Beyond acting as the driving force behind major
events like FIREBALL Fest. and the Golden Indie Music Awards (GIMA), the company works
closely with local indie acts while actively boosting the presence of international talent
in Taiwan. Our mission centers on the artist's narrative, ensuring real stories are heard by
a wider global audience.

**ZH:** 子皿有限公司（In Utero Ltd.）在 2017 成立，由在倫敦相遇的兩個台灣女生顧孟儒（Meng）與伍孟軒（May）一起創辦，兩人都是台灣音樂場景資深的幕後推手。秉持對創作音樂的熱愛與堅持，希望擔任音樂人創作以外所有事務的堅實夥伴，共同面對音樂經營路上的種種困難。

創辦近十年，子皿逐步成長為全方位的音樂品牌以及文化策展單位，除了擔任火球祭、金音創作獎等大型音樂活動背後的助燃劑，也與眾多獨立音樂人與廠牌深度合作，見證長期合作的夥伴大象體操成功的《世界World》十週年巡迴，象徵從台灣出發的獨立樂團，也在國際市場累積具份量的商業影響力。子皿希望整合音樂產業中除了製作外的所有資源，提供不同階段的音樂人合適的服務，讓所有期待被聽見的音樂人邁向系統化經營，繼續讓真實的故事被更多人聽見。

### Our Story — How We Work (3 points)

| # | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| 1 | **Artists-first perspective** — Every decision starts from the artist's voice, ensuring authenticity at every stage. | **以創作者為本** — 子皿長期與不同風格的藝術家相處，每次決策皆以創作者想表達的內涵為重，確保每個行動都能成為一次發聲的機會。 | `12210:2850,2852` |
| 2 | **International connection** — We bridge local culture with global opportunities, connecting artists to the right audiences worldwide. | **國際化連結** — 透過子皿長期經營的國際資源，接軌全球旺盛的現場演出市場，將台灣獨立音樂帶入亞洲音樂版圖，實現真正的文化輸出。 | `12210:2861,2863` |
| 3 | **Professional execution** — We turn ideas into structured, well-delivered outcomes with clarity and precision. | **化創意為行動** — 子皿擅長整合企劃概念、社群趨勢與市場動向，將天馬行空的創意轉化為結構完整、精準到位的專案規劃。 | `12210:2872,2874` |

Point 3's English cell in the sheet contains a stray Chinese fragment (`專業級執行`) mixed
into the English column. Treated as an editing artefact and dropped from the English above.

### Our Story — layout instructions

| Instruction | Element | Meaning |
| :--- | :--- | :--- |
| `REMOVE` | Intro body paragraph, node `12212:6370` | Marked `直接拿掉` in **both** the 備註 column and the trailing column. The long "We believe that authentic music carries a cultural energy…" paragraph and its Chinese counterpart are **not** built. |
| `NEW` | Credits section | Marked `新增段落` — a section that does not exist in Figma. Content below. |

The removed Intro paragraph is transcribed here **only** so a later phase can recognise it
and confirm it is the one being dropped — do not build it:
*EN:* "We believe that authentic music carries a cultural energy capable of transcending
borders…" / *ZH:* 「我們深信真誠創作的音樂具備跨越疆界的文化能量…」

### Our Story — Credits (NEW section)

| Element | Final EN | Final ZH |
| :--- | :--- | :--- |
| Heading | Special thanks to | 感謝網站製作夥伴 |
| Body | Credits<br>Photography: Jauchen Wu (@jauchen3)<br>Web Development: ＿＿＿(@brand_new_mrohmygoz)<br>Web Design: ＿＿＿(@待補庭嘉露出名稱＆IG) | Credit:<br>平面攝影：吳昭晨（@jauchen3）<br>網站建構：彭一珍（@brand_new_mrohmygoz）<br>網站設計：＿＿＿(@待補庭嘉露出名稱＆IG) |

Two gaps: the Web Development English name is blank (the Chinese gives 彭一珍), and the Web
Design credit is entirely `待補` pending 庭嘉's preferred name and IG handle.

### Our Story — team cards

Figma has 2 cards (`12217:885`, `12217:886`); the sheet says the count may change. Bios are
still Lorem ipsum — `待補`. The first card is Meng, Founder & Creative Director. The second
card's content was never expanded in the sheet. A Dropbox folder of team assets is linked —
see [Assets](#assets-referenced-by-the-sheet).

## Services

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Header — tagline | SERVICES | `keep EN` | — |
| Header — heading | Modern Strategy. Rooted in Culture. | 以真實故事為基石，用新時代手法創造影響力。 | `12220:2612` |
| Header — body | We provide integrated support across the full lifecycle of music projects. | 除了創作，其他音樂發展路上的大小難事，讓子皿幫你通通搞定。 | `12220:2615` |
| FAQ — tagline | FAQS | `keep EN` | — |
| FAQ — heading | COMMON QUESTIONS | 常見問題 | — |

Service card node IDs: `12220:2696, 2666, 2786, 2816`.

### Services — 01 Artist Management

**EN:** Driving comprehensive career development for artists through strategic planning,
music distribution, brand partnerships, and long-term vision to cultivate growth and global
visibility. We bridge the gap between creative soul and market momentum, serving as a
steadfast partner for artists from their foundational branding to the global stage.

- **Career & Distribution Strategy:** Developing global management strategies and music distribution plans to precisely navigate domestic and international markets.
- **Business & Legal Affairs:** Managing complex contracts, copyright administration, and commercial negotiations, allowing creators to focus entirely on their music.
- **Crisis PR & Management:** Monitoring social media dynamics in real time to safeguard artist reputation and manage public relations efficiently.

**ZH — 01 藝人經紀:** 全方位助推藝人發展。從長期規劃、形象經營、演出接洽、到合約發行等繁瑣細節，子皿與你一路同行，成為音樂人從草創期走向國際舞台的堅實後盾。

- **長期發展策略：** 制定藝人長期發展策略，全球戰略佈局與受眾定位，精準鎖定目標市場。
- **各式行政執行：** 處理演出接洽、合約、發行、版權與各種商業談判，讓音樂人全心創作與演出。
- **藝人形象經營：** 管理藝人在媒體管道的露出形象與人脈資源，協助藝人敏捷應對突發公關事件。

### Services — 02 International Booking & Tour Planning

**EN:** Curating and booking cross-border tours and events—bringing international acts to
Taiwan while sending Taiwanese talent abroad to foster global musical exchange. Leveraging
sharp market intuition and an extensive overseas network, we act as a two-way bridge
connecting Taiwan with the global music scene, flawlessly executing both domestic showcases
for international talent and global tours for local acts.

- **Cross-Border Tour Planning:** Coordinating domestic and international tour routing, booking management, and on-site local execution.
- **International Booking:** Securing placement for exceptional Taiwanese artists at global music festivals, industry showcases, and cross-border collaborations.
- **Global Talent Gateway:** Introducing cutting-edge and emerging acts to Taiwan, opening new horizons for the local live market.

**ZH — 02 巡演規劃:** 透過子皿長年累積的海外資源，統籌音樂人國內外巡迴演出與海外音樂活動，拓展亞洲、乃至歐美地區的聽眾與商業機會，同時協助海外的優秀音樂人進入台灣市場。

- **跨境巡演策劃：** 海內外巡迴演出路線規劃、檔期接洽與落地執行。
- **海外活動對接：** 協助台灣優秀藝人參演海外音樂節、Showcase 與跨國合作專案。
- **國際接軌窗口：** 協助海外具備潛力的音樂人及品牌進行演出規劃，在台灣與亞洲市場收穫聽眾與商業機會。

### Services — 03 PR & Marketing

**EN:** Delivering integrated PR and marketing strategies, spanning media relations, EPKs,
digital advertising, and multilingual campaigns to maximize international reach. Navigating
today's fragmented markets, we tell stories in a language that honors the creator's vision,
utilizing tailored global PR strategies to push exceptional music beyond traditional
boundaries.

- **Global PR & Media Relations:** Crafting media-facing press releases, refined EPKs, and managing press junkets to secure features across local and international outlets.
- **Multilingual Social Campaigning:** Providing culturally attuned content curation, visual adaptation, and cross-border promotion across Chinese, English, and Japanese channels.
- **Precision Digital Advertising:** Combining streaming platform analytics with social marketing to convert promotional resources into global reach and listener retention.

**ZH — 03 行銷宣傳:** 為音樂人量身打造行銷與公關策略，精準瞄準分眾市場，結合時下行銷趨勢，用貼近創作者風格的手法說好故事。

- **媒體公關操作：** 通告接洽（平面採訪、電視電台、新媒體節目等）、發布藝人新聞稿、媒體與專業人士公關關係維護，全面提升音樂人的媒體能見度。
- **社群與廣告投放：** 協助制定社群平台經營方針、發想創意企劃，結合各平台數據規劃精準廣告投放，打造貼近受眾的音樂敘事。
- **海內外宣傳策略：** 整合 KOL 合作、創意行銷企劃、戶外廣告、串流歌單等多元手法，並串聯海外各地區行銷夥伴，將宣傳效益延伸至海外市場。

### Services — 04 Event Production

**EN:** Providing end-to-end event production services from showcases to large-scale
festivals, managing everything from budgeting and logistics to technical production and
on-site execution. From intimate listening parties and livehouse showcases to massive
festivals, we manifest imaginative concepts into premium live experiences.

- **End-to-End Production Management:** Overseeing budget controls, timelines, administrative compliance, and ticketing operations.
- **Technical Production & Operations:** Partnering closely with professional stage designers, lighting, and sound crews to ensure international-caliber production standards.
- **On-Site Execution:** Ensuring seamless live coordination, rapid crisis management, and clear communication with multinational artist teams to deliver flawless event experiences.

**ZH — 04 活動製作:** 統籌各式演出企劃，從專場演出到創意音樂策展，子皿包辦企劃發想、預算規劃、統籌協調及現場執行，將各種奇思妙想變成高規格的現場體驗。

- **演出企劃發想：** 從概念發想到落地執行，打造獨具風格的演出節目與現場體驗。
- **預算與資源統籌：** 規劃演出預算，整合燈光硬體、舞台設計、美術執行、演出場地等長期合作夥伴資源，確保製作品質。
- **現場執行與行政協調：** 統籌行銷曝光、現場藝人接待、流程控管等各式行政細節，確保演出順利落地。

### Services — FAQ

The final question set **replaces** the Figma questions entirely — the sheet shifts each
answer up by one row relative to the Figma question it sits beside, and drops one. Build
from the Final column below, not from the Figma text layers.

| # | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| 1 | **What makes In Utero different from traditional management or PR agencies?**<br>We don't confine ourselves to a single artist or brand; instead, we have built a mature operational ecosystem that allows us to collaborate across various genres and styles, precisely engaging niche markets to create true impact. Most importantly, In Utero approaches the market through the lens of independent music and culture. Commercial success is rarely our sole priority. What we care about most is empowering creators and brands to tell their stories authentically, connecting them with the right audiences, and serving as an ever-accessible strategic partner. | **你們跟一般的經紀或公關公司有什麼不一樣？**<br>子皿不拘泥於跟單一藝人或品牌合作，以成熟的運作模式與多個單位並行合作，精準與不同分眾市場溝通。此外，子皿從文化產業視角切入市場，著重幫助創作者與品牌講好故事，接觸到真正契合的聽眾，並成為一個能夠隨時溝通、相互信賴的戰略夥伴。 | `12220:2282,2287` |
| 2 | **Do you work with artists outside of Taiwan?**<br>Absolutely. We have collaborated with artists from Hong Kong, Japan, South Korea, Thailand, and beyond. Beyond on-site local execution and press campaigns within Taiwan, our services encompass strategic promotional rollouts across the entire East Asian region. Please feel free to reach out to discuss how we can work together. | **你們有跟台灣以外的海外藝人合作嗎？**<br>子皿曾與來自日本、韓國、中國、香港、泰國等地的藝人合作，除了協助在台灣從0到1創造聲量、籌辦演出活動，也協助佈局整個東亞地區的宣傳規劃，歡迎聯繫洽談詳情。 | `12220:2292` |
| 3 | **Can I hire In Utero for a single event or specific project?**<br>Yes. We tailor our collaborations to fit each client's specific needs and current developmental stage, which includes phased project-based partnerships. Whether it's production for a single event, a tailored PR campaign for a new release, or routing a specific leg of a tour, we provide precise, professional support where it matters most. | **我可以只針對單一活動或專案聘請子皿嗎？**<br>可以的。我們會根據客戶需求與發展階段規劃合作項目，也包含階段性的專案合作。無論單場活動合作、發行作品的宣傳規劃、一檔巡演的站點規劃等，我們都能提供最精準的專業支援。 | `12220:2300` |
| 4 | **Is it still possible to work with you if I have a limited budget?**<br>Definitely. Lean budgets simply require a different approach. We can help you audit and streamline your available resources to maximize impact with minimal investment. Please feel free to be direct about your budget and challenges—let's talk and find a viable way to keep your project moving forward. | **如果預算有限，也有機會找你們合作嗎？**<br>當然沒問題，不同成本有不同成本的做法。子皿可以協助你收斂身邊有用的資源，用最小的投入儘可能達到成效，歡迎直接分享你的預算與困難，一起討論如何推進。 | — |
| 5 | **How do we start working with In Utero?**<br>Drop us a line anytime! Head over to our Contact section below and reach out to the relevant department (Business, Management, or PR & Marketing). Share a brief overview of your current project, music, or preliminary ideas, and we'll set up a time to chat and find our rhythm together. | **我們該如何開始與子皿合作？**<br>可以直接點擊下方的聯絡區域，依照需求（商務合作、藝人經紀或行銷宣傳）發信給特定的窗口，並在信中分享想合作的專案、作品或初步想法。 | `12220:2316` |
| 6 | `待補` — the sheet's last FAQ row reads *（待補，向子皿搜集）* | `待補` | — |

### Services — layout instructions

| Instruction | Element | Meaning |
| :--- | :--- | :--- |
| `REMOVE` | Figma FAQ Q3 ("How do you approach international touring?") | The sheet's 備註 for that row reads `直接刪掉`. Figma has 5 FAQ items; the final set is 5 written + 1 `待補`, with the question text entirely rewritten. |

## Portfolio

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Hero — tagline | PORTFOLIO *(was `CASE STUDIES`)* | `keep EN` | — |
| Hero — heading | ALL PROJECTS | 過往專案 | — |
| Filter tags (5) | All / Artist Management / Global Touring / PR & Marketing / Event Production | 全選／藝人經紀／巡演規劃／行銷宣傳／活動製作 | `12210:3091,3092` |

**Note the filter tag names are the service lines**, and #4 is `活動製作` (conflict #1
resolution). The sheet's 備註 says the remaining tag names were never expanded in Figma —
these five are the full set given.

### Portfolio — layout instructions

| Instruction | Element | Meaning |
| :--- | :--- | :--- |
| `REMOVE` | Header description paragraph, nodes `12219:1066`, `12210:3075` | `直接刪除段落` — the "A selection of projects connecting artists, audiences, and culture." line is dropped. |

### Portfolio — project cards

All `待補`. Figma has 5 card slots (`12219:1187, 1258, 1279, 1234, 1300`), expandable. The
sheet's 備註: *「元件未展開，需逐一提供各作品資訊」* — each project's information must be
supplied individually. Three real projects are described on the Project Details tab (below)
and can seed the first three cards.

## Project Details

A **template page** — the sheet notes it must be repeated per project
(*「此為範本頁，需依作品數量重複填寫」*).

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Breadcrumb | Portfolio > *(project name)* | 過往案例 > （專案中文名稱） | `12219:1449,1456` |
| Meta fields | Client / Date / Role / Link | 合作夥伴：／時間：／職責：／連結： | `12219:1505,1510,1515,1520` |
| Article body | `待補` | `待補` | `12211:3445,3452,3454,3460,3461` |
| Pagination | Back to portfolio / 1 / 12 | 回到過往案例 | `12211:3504,3506` |

Figma's breadcrumb and meta values ("Bottom's Up", "June 2024", "Full Management",
"bottomsup.tw") are sample data. The article body is Lorem ipsum including the pull-quote.

### Project Details — the three real projects

The sheet supplies full Chinese meta for three projects. These are the only real project
records in the deck.

**子皿 In Utero Present Vol.2: 一起喝酒的朋友**

| Field | Value |
| :--- | :--- |
| 簡介 | 集結雷擎 L8ching、張淦勛 Giyu Tjuljaviya、宋楚琳，將日常相遇與音樂節奏化為巡迴演出。 |
| 合作夥伴 | 雷擎 L8ching／張淦勛 Giyu Tjuljaviya／宋楚琳 |
| 時間 | 2025/11/08（六）、11/15（六）、11/21（五） |
| 職責 | 行銷宣傳／巡演規劃／活動製作 |

**子皿 In Utero Present Vol.1: 鍋 Band Show**

| Field | Value |
| :--- | :--- |
| 簡介 | 於詹記西門大世界舉辦，結合的復古餐廳秀概念，帶聽眾一邊看表演、一邊大啖美味麻辣火鍋。 |
| 合作夥伴 | 巴奈、滅火器主唱楊大正、大象體操、緩緩 Huan Huan、Mong Tong、昭霖 |
| 時間 | 2024/09/04 |
| 職責 | 行銷宣傳／活動製作 |

**子皿 In Utero Present Vol.3：彼日的心內話**

| Field | Value |
| :--- | :--- |
| 簡介 | 攜手緩緩 Huan Huan 先後走訪台北市中山老人住宅暨服務中心、彰化花壇安耆日照中心，以及彰化北斗有冊店，在母親節前後為長輩與在地社區帶來一場場跨世代的音樂相聚。 |
| 時間 | 2026/05/07 - 2026/05/09 |
| 職責 | 行銷宣傳／巡演規劃／活動製作 |

Each has a press release and photo folder — see [Assets](#assets-referenced-by-the-sheet).

## Featured Artists

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Tagline | OUR PARTNERS *(was `FEATURED ARTISTS`)* | `keep EN` | — |
| Heading | FEATURED ARTISTS *(was `OUR ARTISTS`)* | 合作藝人 | — |
| Filter tags (5) | All / Artist Management / Global Touring / PR & Marketing / Event Production | 全選／藝人經紀／巡演規劃／行銷宣傳／活動製作 | `12220:1059,1061,1062,1063,1064` |

**The tagline and heading swap round-trip:** Figma's tagline becomes the heading and a new
tagline ("OUR PARTNERS") is introduced. Do not assume the Figma text layers map 1:1.

### Featured Artists — layout instructions

| Instruction | Element | Meaning |
| :--- | :--- | :--- |
| `REMOVE` | Header description, nodes `12220:1079`, `12220:1082` | `直接刪除` — the borrowed "A selection of projects connecting artists, audien…" line is dropped rather than rewritten. |

### Featured Artists — the 8 supplied artists

Figma has 16 card slots (`12220:1113, 1114, 1147`); the sheet supplies 8. English card copy
is `待補` for all of them.

| Artist | 服務項目 | 簡介 (ZH) |
| :--- | :--- | :--- |
| 聲子蟲 Bugs of Phonon | 巡演規劃 / 行銷宣傳 | 組成於2008年，一組以吉他、貝斯、鼓、電子聲響的後搖滾樂隊，音樂時而寧靜美好，在美好之中又隱含著風雨欲來的暴戾。 |
| JPBS | 巡演規劃 | 來自曼谷的器樂/實驗搖滾樂隊，2023年發表首張專輯《Waiting Room》，以多元的音樂風格，建構神秘而迷人的世界，創造關於生命與死亡的故事。 |
| 大象體操 Elephant Gym | 藝人經紀 / 巡演規劃 / 行銷宣傳 / 活動製作 | 成立於高雄，為台灣少見的 Math Rock（數字/數學搖滾）樂團，2024年獲頒金曲獎評審團獎。 |
| 緩緩 Huan Huan | 藝人經紀 / 巡演規劃 / 行銷宣傳 / 活動製作 | 成立於台北的另類流行樂團，歌曲大多不快偏慢，明亮又柔和，像是安靜的朋友，陪你行經每一個日常。 |
| 巴奈 Panai | 藝人經紀 / 行銷宣傳 / 活動製作 | 身兼歌手、創作者與環境保護者等多重身分，在台灣多項環境運動上，巴奈都選擇挺身而出，以音樂、甚至全副身心的生活，來作出反抗。 |
| 來吧！焙焙！Come on! BayBay! | 藝人經紀 / 行銷宣傳 / 活動製作 | 「來吧！焙焙！」核心成員為鄭焙隆、鄭焙檍兄妹雙人聲，以另類民謠風格呈現直白而偶有詩意的詞曲。 |
| 血肉果汁機 Flesh Juicer | 行銷宣傳 | 創作多以台灣信仰文化為背景，也將嗩吶、五聲音階等傳統元素融合在重金屬音樂之中，帶給聽眾強烈而直入人心的震撼。 |
| 昭霖 Zhaolin | 行銷宣傳 | 昭霖是來自高雄的青年藝術家、台語音樂唱作人。台語是昭霖的第一語言，家族經營的宮廟、鄉間小吃部的卡拉OK與90年代的「新台語歌」都是他重要的養分來源。 |

Each artist has one press photo — see [Assets](#assets-referenced-by-the-sheet).

## News

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Tagline | JOURNAL *(was `NEWS`)* | `keep EN` | — |
| Heading | TUNING IN | 子皿超音波 | — |
| Header body | Updates on artists, collaborations, and what we're building. | 所有音樂作品新訊、活動分享、以及子皿團隊日誌，等你來探索。 | `12220:1634,1637` |
| Filter tags (5) | All / Artists & works / Global Touring / Events / About In Utero | 全選／音樂新訊／活動消息／國際曝光／子皿營運日誌 | `12220:1653,1655,1656,1657,1658` |
| Pagination | Prev / Next | `keep EN` | `12220:1776,1778` |
| Newsletter — heading | STAY CONNECTED WITH US | 取得我們的最新消息 | `12211:4134` |
| Newsletter — body | Get updates on artists, projects, and what we are building for - direct to your inbox. | 最新作品、音樂活動、創意專案，通通打包分享到你的信箱。 | `12211:4136` |
| Newsletter — button | Sign up | 訂閱 | `12220:2905` |

**The News filter tags are the one tag set that is not the service lines.** Figma shows
`All / Industry / artists / tour / events`; the final set is a different taxonomy in both
languages. Do not reuse the Portfolio/Artists tags here.

The featured banner (`12211:4017`) is `待補` — the sheet notes its purpose was never
confirmed in Figma (*「元件未展開，需在Figma確認用途（可能為精選文章區塊）」*). Article cards
(`12220:1669, 1670, 1680, 1690, 1781, 1782, 1783`) are all `待補`.

### News — 30 real headlines available

The sheet's News Details tab ends with a reference list of 30 real press headlines dated
2025-11-06 through 2026-05-13, under the note *「可參考新聞內容」*. They are headlines only —
no bodies — so they can seed article titles and dates but not article content. The most
recent five:

| Date | Headline |
| :--- | :--- |
| 2026.05.13 | 音樂品牌子皿 In Utero 攜樂團緩緩 Huan Huan 走入日照中心與地方社區推出《彼日的心內話》免費企劃巡迴演出 |
| 2026.05.01 | 雷擎L8ching《春子》新專輯聽歌會活動新聞稿 |
| 2026.04.29 | 昭霖 Zhaolin 相隔一個月再發新專《夢中夢》 與樂團甜吻吻共創延伸夢的篇章 |
| 2026.04.17 | 創作歌手雷擎L8ching 推出鄉村搖滾單曲〈我愛我的生活〉 與音樂老友大合唱慶賀日常美好 |
| 2026.04.16 | aDAN薛詒丹《孤獨金魚：自由的練習》專場 5/3 SUB 登場，特邀 Gummy B 跨刀合作 |

The full 30 are in the sheet's News Details tab. Phase 13/14 should pull them from there
rather than have them re-transcribed here — they are raw material, not approved page copy.

## News Details

A **template page** — repeated per article.

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Breadcrumb | News > *(article title)* | 子皿超音波 > （新聞標題） | `12220:1830,1836` |
| Share row label | Share | `keep EN` | `12220:1884` |
| Article body | `待補` | `待補` | `12211:4516,4518,4524,4526,4528,4534` |
| Related — tagline | more for you *(was `TEAM`)* | `keep EN` | `12220:1913` |
| Related — heading | Related Posts | 相關內容 | — |
| Related — cards (3) | `待補` | `待補` | `12220:1948,1949,1950` |
| Related — button | VIEW ALL POSTS | 所有內容 | — |
| Newsletter | *(same as News)* | *(same as News)* | `12212:6049` |

The share-row row carries the sheet note *「功能性文字，通常不需業主提供」* — functional text,
not client-supplied. This confirms the `Share` label shipped in `ShareRow` is correct, and
that `keep EN` under `/zh` is deliberate.

## Contact

| Element | Final EN | Final ZH | Node ID |
| :--- | :--- | :--- | :--- |
| Tagline | GET IN TOUCH | `keep EN` | — |
| Heading | CONTACT US | 聯絡我們 | — |
| Header body | We work with artists, partners, and press. Tell us who you are and what you're looking for. | 無論是創作者、音樂廠牌、活動品牌、或想洽詢音樂文化相關的專案合作，都歡迎聯繫我們。 | `12220:1998,2001` |
| Follow us | Follow us | 追蹤我們 | `12212:5328` |
| Newsletter | *(same as News)* | *(same as News)* | `12212:6143` |

### Contact — department emails

| Department EN | Department ZH | Email | Node ID |
| :--- | :--- | :--- | :--- |
| Business Inquiries | 商務合作 | `may@inuteromusic.com` | `12212:5305,5307` |
| Artist Management | 藝人經紀 | `jung@inuteromusic.com` | `12212:5311,5313` |
| PR & Marketing | 行銷宣傳 | `bonnie@inuteromusic.com` | `12212:5317,5319` |
| General Inquiries | 客服／其他 | `contact@inuteromusic.com` | `12212:5323,5325` |

**The PR & Marketing address changed**: Figma shows `ray@inuteromusic.com`, the final copy
is `bonnie@inuteromusic.com`. Phase 15 must use the sheet's value.

The General row's English shortens from "General / Other Inquiries" to "General Inquiries" —
which matches the string already shipped in `UniversalCTA` (D030 picked the mobile form).

### Contact — social URLs

| Platform | URL |
| :--- | :--- |
| Facebook | `https://www.facebook.com/inuteromusic` |
| Instagram | `https://www.instagram.com/inuteromusic_official/` |
| YouTube | `https://www.youtube.com/channel/UCyKN9UgKnYyPX1AWxQLPo9Q` |
| Podcast (Firstory) | `https://cl7z0x1hm09ua01wi2ukt6kjq.firstory.io/` |

The sheet's 備註 asks for *「Facebook/Instagram/X/Youtube各平台實際網址」* — four platforms
including X — but supplies Podcast instead of X. Resolved 2026-08-02 in favour of Podcast
([conflict #2](#open-conflicts-and-resolved-decisions)); the Footer now renders these four.
The Podcast icon is a placeholder pending a real asset.

## Assets referenced by the sheet

Dropbox links, recorded for the phases that need them. **Not downloaded** by this change.

| Page | Asset | Phase |
| :--- | :--- | :--- |
| Home / Project Details | Vol.3 poster `2026-_poster.jpg` | 6, 11 |
| Project Details | Vol.2 press release folder + photo folder | 11 |
| Project Details | Vol.1 press release (`Band Show.docx`) + photo folder | 11 |
| Project Details | Vol.3 press release (`In Utero Huan Huan.docx`) + photo folder | 11 |
| Our Story | Team photo folder | 7 |
| Featured Artists | 8 press photos, one per artist | 12 |

The full URLs are in the sheet. They are not copied here because Dropbox share links are
long-lived credentials of a sort — fetch them from the sheet at the point of use.

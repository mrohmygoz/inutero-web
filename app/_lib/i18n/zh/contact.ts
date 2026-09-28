import type enContact from "../en/contact";

// Typed against the matching `en` module (D010, Phase 07b D-F).
// See en/contact.ts for the copy-source rationale.
const contact: typeof enContact = {
  header: {
    eyebrow: "Get in touch", // matrix: `keep EN`
    heading: "聯絡我們",
    body: "無論是創作者、音樂廠牌、活動品牌、或想洽詢音樂文化相關的專案合作，都歡迎聯繫我們。",
  },
  departments: [
    { label: "商務合作", email: "may@inuteromusic.com" },
    { label: "藝人經紀", email: "jung@inuteromusic.com" },
    { label: "行銷宣傳", email: "bonnie@inuteromusic.com" },
    { label: "客服／其他", email: "contact@inuteromusic.com" },
  ],
  followUs: "追蹤我們",
};

export default contact;

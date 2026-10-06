import type enServices from "../en/services";

// Typed against the matching `en` module, explicitly annotated rather than only
// `satisfies`-checked at the index, so an extra or misspelled key is a
// `tsc --noEmit` error too — not just a missing one (D010, Phase 07b D-F).
// See en/services.ts for sourcing notes.
const services: typeof enServices = {
  hero: {
    eyebrow: "Services", // English in the TC frames too (matrix: `keep EN`)
    // MATRIX OVERRIDE: both TC frames draw 以創作故事為基石; the matrix says
    // 以真實故事為基石. D032 default applies — the matrix is the delivered copy
    // and the Figma string is the designer's earlier draft. See D068.
    headingLines: ["以真實故事為基石，", "用新時代手法創造影響力。"],
    body: "除了創作，其他音樂發展路上的大小難事，讓子皿幫你通通搞定。",
    imageAlt: "子皿團隊成員坐在成排的舊櫃子前合影",
  },
  items: [
    {
      index: "01",
      // Figma draws 藝人經紀整合; the matrix says 藝人經紀 (D032).
      title: "藝人經紀",
      // Artist Management points at Artists, not Portfolio — its own, more
      // specific case-study page (see en/services.ts D067 note).
      ctaLabel: "合作藝人",
      ctaHref: "artists",
      description:
        "全方位助推藝人發展。從長期規劃、形象經營、演出接洽、到合約發行等繁瑣細節，子皿與你一路同行，成為音樂人從草創期走向國際舞台的堅實後盾。",
      imageAlt: "樂團在社區活動中心為坐著的觀眾演出",
      features: [
        {
          title: "長期發展策略",
          description: "制定藝人長期發展策略，全球戰略佈局與受眾定位，精準鎖定目標市場。",
        },
        {
          title: "各式行政執行",
          description: "處理演出接洽、合約、發行、版權與各種商業談判，讓音樂人全心創作與演出。",
        },
        {
          title: "藝人形象經營",
          description: "管理藝人在媒體管道的露出形象與人脈資源，協助藝人敏捷應對突發公關事件。",
        },
      ],
    },
    {
      index: "02",
      title: "巡演規劃",
      ctaLabel: "相關案例",
      ctaHref: "portfolio",
      description:
        "透過子皿長年累積的海外資源，統籌音樂人國內外巡迴演出與海外音樂活動，拓展亞洲、乃至歐美地區的聽眾與商業機會，同時協助海外的優秀音樂人進入台灣市場。",
      imageAlt: "樂團在綠色燈光下的寬闊舞台上演出",
      features: [
        {
          title: "跨境巡演策劃",
          description: "海內外巡迴演出路線規劃、檔期接洽與落地執行。",
        },
        {
          title: "海外活動對接",
          description: "協助台灣優秀藝人參演海外音樂節、Showcase 與跨國合作專案。",
        },
        {
          title: "國際接軌窗口",
          description:
            "協助海外具備潛力的音樂人及品牌進行演出規劃，在台灣與亞洲市場收穫聽眾與商業機會。",
        },
      ],
    },
    {
      index: "03",
      title: "行銷宣傳",
      ctaLabel: "相關案例",
      ctaHref: "portfolio",
      description:
        "為音樂人量身打造行銷與公關策略，精準瞄準分眾市場，結合時下行銷趨勢，用貼近創作者風格的手法說好故事。",
      imageAlt: "吉他手在手繪 BAND SHOW 布條下的小舞台獨奏",
      features: [
        {
          title: "媒體公關操作",
          description:
            "通告接洽（平面採訪、電視電台、新媒體節目等）、發布藝人新聞稿、媒體與專業人士公關關係維護，全面提升音樂人的媒體能見度。",
        },
        {
          title: "社群與廣告投放",
          description:
            "協助制定社群平台經營方針、發想創意企劃，結合各平台數據規劃精準廣告投放，打造貼近受眾的音樂敘事。",
        },
        {
          title: "海內外宣傳策略",
          description:
            "整合 KOL 合作、創意行銷企劃、戶外廣告、串流歌單等多元手法，並串聯海外各地區行銷夥伴，將宣傳效益延伸至海外市場。",
        },
      ],
    },
    {
      index: "04",
      title: "活動製作",
      ctaLabel: "相關案例",
      ctaHref: "portfolio",
      description:
        "統籌各式演出企劃，從專場演出到創意音樂策展，子皿包辦企劃發想、預算規劃、統籌協調及現場執行，將各種奇思妙想變成高規格的現場體驗。",
      imageAlt: "活動場地窗邊桌上擺放的刊物與盆栽",
      features: [
        {
          title: "演出企劃發想",
          description: "從概念發想到落地執行，打造獨具風格的演出節目與現場體驗。",
        },
        {
          title: "預算與資源統籌",
          description:
            "規劃演出預算，整合燈光硬體、舞台設計、美術執行、演出場地等長期合作夥伴資源，確保製作品質。",
        },
        {
          title: "現場執行與行政協調",
          description: "統籌行銷曝光、現場藝人接待、流程控管等各式行政細節，確保演出順利落地。",
        },
      ],
    },
  ],
  // See en/services.ts for why the Figma question set is not the source (D032).
  // The TC frames draw an earlier, longer draft of the Q1 answer; the matrix
  // line below is the delivered copy, so this section renders shorter than the
  // 793px the mobile TC frame measures.
  faq: {
    eyebrow: "FAQs", // English in the TC frames too (matrix: `keep EN`)
    heading: "常見問題",
    items: [
      {
        question: "你們跟一般的經紀或公關公司有什麼不一樣？",
        answer:
          "子皿不拘泥於跟單一藝人或品牌合作，以成熟的運作模式與多個單位並行合作，精準與不同分眾市場溝通。此外，子皿從文化產業視角切入市場，著重幫助創作者與品牌講好故事，接觸到真正契合的聽眾，並成為一個能夠隨時溝通、相互信賴的戰略夥伴。",
      },
      {
        question: "你們有跟台灣以外的海外藝人合作嗎？",
        answer:
          "子皿曾與來自日本、韓國、中國、香港、泰國等地的藝人合作，除了協助在台灣從0到1創造聲量、籌辦演出活動，也協助佈局整個東亞地區的宣傳規劃，歡迎聯繫洽談詳情。",
      },
      {
        question: "我可以只針對單一活動或專案聘請子皿嗎？",
        answer:
          "可以的。我們會根據客戶需求與發展階段規劃合作項目，也包含階段性的專案合作。無論單場活動合作、發行作品的宣傳規劃、一檔巡演的站點規劃等，我們都能提供最精準的專業支援。",
      },
      {
        question: "如果預算有限，也有機會找你們合作嗎？",
        answer:
          "當然沒問題，不同成本有不同成本的做法。子皿可以協助你收斂身邊有用的資源，用最小的投入儘可能達到成效，歡迎直接分享你的預算與困難，一起討論如何推進。",
      },
      {
        question: "我們該如何開始與子皿合作？",
        answer:
          "可以直接點擊下方的聯絡區域，依照需求（商務合作、藝人經紀或行銷宣傳）發信給特定的窗口，並在信中分享想合作的專案、作品或初步想法。",
      },
    ],
  },
};

export default services;

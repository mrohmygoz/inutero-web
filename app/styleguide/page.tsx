import type { Metadata } from "next";
import {
  ColorSwatches,
  ContainerRamp,
  FontSpecimens,
  SpacingRamp,
  TextSpecimens,
} from "./_components/TokenSpecimens";
import PrimitiveSpecimens from "./_components/PrimitiveSpecimens";
import CardSpecimens from "./_components/CardSpecimens";

export const metadata: Metadata = {
  title: "Styleguide — In Utero Inc.",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <main className="mx-auto flex max-w-(--container-large) flex-col gap-16 px-(--spacing-page-padding) py-(--spacing-page-padding)">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-h2">Styleguide</h1>
        <p className="font-body text-body-m text-(--color-basic-text-secondary)">
          Internal token gallery — excluded from indexing and the sitemap.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">Color Schemes</h2>
        <ColorSwatches />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">
          Text Styles — English (Mobile ↔ Desktop, resize to compare)
        </h2>
        <TextSpecimens sample="The quick brown fox 0123" />
      </section>

      <section lang="zh" data-locale="zh" className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">
          文字樣式 — 繁體中文（Mobile ↔ Desktop，調整視窗寬度比較）
        </h2>
        <TextSpecimens sample="在子皿裡的快樂時光 0123" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">Spacing</h2>
        <SpacingRamp />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">Containers &amp; Max Widths</h2>
        <ContainerRamp />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-display-h5">Fonts</h2>
        <FontSpecimens />
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="font-display text-display-h5">Primitives</h2>
        <PrimitiveSpecimens />
      </section>

      <section lang="zh" data-locale="zh" className="flex flex-col gap-10">
        <h2 className="font-display text-display-h5">原型元件 — 繁體中文</h2>
        <PrimitiveSpecimens locale="zh" />
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="font-display text-display-h5">Cards</h2>
        <CardSpecimens />
      </section>

      <section lang="zh" data-locale="zh" className="flex flex-col gap-10">
        <h2 className="font-display text-display-h5">卡片元件 — 繁體中文</h2>
        <CardSpecimens locale="zh" />
      </section>
    </main>
  );
}

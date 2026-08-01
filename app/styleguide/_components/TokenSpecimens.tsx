const colorSwatches: { label: string; varName: string }[] = [
  { label: "Basic / Background", varName: "--color-basic-background" },
  { label: "Basic / Foreground", varName: "--color-basic-foreground" },
  { label: "Basic / Text Primary", varName: "--color-basic-text-primary" },
  { label: "Basic / Text Secondary", varName: "--color-basic-text-secondary" },
  { label: "Basic / Border", varName: "--color-basic-border" },
  { label: "Basic / Accent", varName: "--color-basic-accent" },
  { label: "Brand / Primary Green", varName: "--color-brand-primary-green" },
  { label: "Brand / Accent Neon", varName: "--color-brand-accent-neon" },
  { label: "Brand / Accent Orange", varName: "--color-brand-accent-orange" },
  { label: "Brand / Accent Yellow", varName: "--color-brand-accent-yellow" },
];

const textStyles: {
  label: string;
  className: string;
  fontClassName: string;
  accent?: boolean;
}[] = [
  { label: "Display / Jumbo", className: "text-display-jumbo", fontClassName: "font-display" },
  { label: "Display / H1", className: "text-display-h1", fontClassName: "font-display" },
  { label: "Display / H2", className: "text-display-h2", fontClassName: "font-display" },
  { label: "Display / H3", className: "text-display-h3", fontClassName: "font-display" },
  { label: "Display / H4", className: "text-display-h4", fontClassName: "font-display" },
  { label: "Display / H5", className: "text-display-h5", fontClassName: "font-display" },
  { label: "Display / H6", className: "text-display-h6", fontClassName: "font-display" },
  { label: "Display / H7", className: "text-display-h7", fontClassName: "font-display" },
  { label: "Body / L", className: "text-body-l", fontClassName: "font-body" },
  { label: "Body / M", className: "text-body-m", fontClassName: "font-body" },
  { label: "Body / S", className: "text-body-s", fontClassName: "font-body" },
  { label: "Body / XS", className: "text-body-xs", fontClassName: "font-body" },
  { label: "Label / M", className: "text-label-m", fontClassName: "font-body" },
  { label: "Label / S", className: "text-label-s", fontClassName: "font-body" },
  {
    label: "Accent / Display",
    className: "text-accent-display",
    fontClassName: "font-accent",
    accent: true,
  },
];

const spacingTokens: { label: string; varName: string }[] = [
  { label: "Page Padding", varName: "--spacing-page-padding" },
  { label: "Section — Large", varName: "--spacing-section-large" },
  { label: "Section — Medium", varName: "--spacing-section-medium" },
  { label: "Section — Small", varName: "--spacing-section-small" },
];

const containerTokens: { label: string; varName: string }[] = [
  { label: "Container — Large", varName: "--container-large" },
  { label: "Container — Medium", varName: "--container-medium" },
  { label: "Container — Small", varName: "--container-small" },
  { label: "Max Width — XXLarge", varName: "--max-width-xxlarge" },
  { label: "Max Width — XLarge", varName: "--max-width-xlarge" },
  { label: "Max Width — Large", varName: "--max-width-large" },
  { label: "Max Width — Medium", varName: "--max-width-medium" },
  { label: "Max Width — Small", varName: "--max-width-small" },
  { label: "Max Width — XSmall", varName: "--max-width-xsmall" },
  { label: "Max Width — XXSmall", varName: "--max-width-xxsmall" },
];

export function ColorSwatches() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {colorSwatches.map((token) => (
        <div key={token.varName} className="flex flex-col gap-2">
          <div
            className="h-16 w-full rounded border border-(--color-basic-border)"
            style={{ background: `var(${token.varName})` }}
          />
          <div className="text-body-xs font-body">
            <div>{token.label}</div>
            <code className="text-(--color-basic-text-secondary)">
              {token.varName}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TextSpecimens({ sample }: { sample: string }) {
  return (
    <div className="flex flex-col gap-6">
      {textStyles.map((style) => (
        <div key={style.label} className="border-b border-(--color-basic-border)/10 pb-4">
          <div className="text-body-xs font-body text-(--color-basic-text-secondary) mb-1">
            {style.label} — <code>{style.className}</code>
          </div>
          <div
            className={`${style.fontClassName} ${style.className} ${
              style.accent ? "font-style-accent-display" : ""
            }`}
          >
            {sample}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpacingRamp() {
  return (
    <div className="flex flex-col gap-3">
      {spacingTokens.map((token) => (
        <div key={token.varName} className="flex items-center gap-3">
          <div className="w-48 text-body-s font-body shrink-0">
            {token.label} <code>{token.varName}</code>
          </div>
          <div
            className="h-4 bg-(--color-brand-primary-green)"
            style={{ width: `var(${token.varName})` }}
          />
        </div>
      ))}
    </div>
  );
}

export function ContainerRamp() {
  return (
    <div className="flex flex-col gap-2">
      {containerTokens.map((token) => (
        <div key={token.varName} className="flex items-center gap-3">
          <div className="w-56 text-body-s font-body shrink-0">
            {token.label} <code>{token.varName}</code>
          </div>
          <div
            className="h-2 max-w-full bg-(--color-basic-text-secondary)/40"
            style={{ width: `var(${token.varName})` }}
          />
        </div>
      ))}
    </div>
  );
}

export function FontSpecimens() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-1">
        <div className="text-body-xs font-body text-(--color-basic-text-secondary)">
          Alumni Sans — Latin display
        </div>
        <div className="font-display text-display-h4">Ag 0123</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-body-xs font-body text-(--color-basic-text-secondary)">
          Mochiy Pop One — Chinese display
        </div>
        <div lang="zh" className="font-(family-name:--font-display-cjk) text-display-h4">
          在子皿裡 0123
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-body-xs font-body text-(--color-basic-text-secondary)">
          Chivo Mono — body / label, both locales
        </div>
        <div className="font-body text-body-l">
          Ag 0123 · 在子皿裡 0123
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-body-xs font-body text-(--color-basic-text-secondary)">
          Bodoni Moda SC — Latin accent (Bold Italic)
        </div>
        <div className="font-(family-name:--font-accent-latin) font-style-accent-display text-accent-display font-bold">
          Ag 0123
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-body-xs font-body text-(--color-basic-text-secondary)">
          Noto Serif TC — Chinese accent (Bold / Bold Italic)
        </div>
        <div
          lang="zh"
          className="font-(family-name:--font-accent-cjk) font-style-accent-display text-accent-display font-bold"
        >
          在子皿裡 0123
        </div>
      </div>
    </div>
  );
}

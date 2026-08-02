import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

// D-A: content lives in content/, imported as modules — never routed. `pageExtensions`
// is deliberately left at its default so an .mdx file can never become a page and
// escape app/[locale]/ (D001).
//
// Plugins are named as strings, not imported functions: Turbopack passes plugin config
// to Rust and cannot serialize a JS function. Both plugins here take serializable
// options, so this is a syntax constraint rather than a limitation.
// See node_modules/next/dist/docs/01-app/02-guides/mdx.md -> "Using Plugins with Turbopack".
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      // Surfaces YAML frontmatter as a named `frontmatter` export (D-B), so the
      // metadata is authored once and read back through the type guard in
      // app/_lib/content/ rather than parsed a second time.
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    // No `providerImportSource`, and no root mdx-components.tsx (D-D). <Cms> passes its
    // element map straight to the compiled body as a `components` prop, which keeps the
    // whole body a server component — MDXProvider is React context and would have forced
    // 'use client' onto every article. MDX rendered anywhere else stays unstyled, which
    // is the point: the CMS design is an article-body treatment, not a site-wide theme.
  },
});

export default withMDX(nextConfig);

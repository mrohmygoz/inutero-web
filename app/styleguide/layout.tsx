import "../globals.css";
import { fontVariables } from "../_lib/fonts";

// A second, independent root layout (see design.md → "`<html lang>` placement").
// /styleguide sits outside `[locale]` and has no shared ancestor with it, so
// Next.js requires its own <html>/<body> shell rather than reusing the
// locale layout's.
export default function StyleguideLayout({
  children,
}: LayoutProps<"/styleguide">) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

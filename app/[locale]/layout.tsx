import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../_lib/fonts";
import { getDictionary, isLocale, locales, type Locale } from "../_lib/i18n";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Any locale segment outside `locales` (e.g. /fr) 404s rather than rendering
// a partially localized page — this is the primary enforcement mechanism;
// the `isLocale` guard below is a defensive second layer.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return {
    title: dict.common.siteName,
    description: dict.home.placeholder,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale satisfies Locale} className={fontVariables}>
      <body className="min-h-full antialiased">
        <Nav locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}

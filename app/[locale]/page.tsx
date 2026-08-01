import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "../_lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4 px-(--spacing-page-padding) py-(--spacing-page-padding) text-center">
      <h1 className="font-display text-display-h1">{dict.common.siteName}</h1>
      <p className="font-body text-body-l">{dict.home.placeholder}</p>
    </main>
  );
}

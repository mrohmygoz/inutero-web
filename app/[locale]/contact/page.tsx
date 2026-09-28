import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "../../_lib/i18n";
import { buildRouteMetadata } from "../../_lib/metadata";
import ContactHeader from "./_components/ContactHeader";
import ContactDetails from "./_components/ContactDetails";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildRouteMetadata("contact", locale);
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <ContactHeader locale={locale} />
      <ContactDetails locale={locale} />
    </>
  );
}

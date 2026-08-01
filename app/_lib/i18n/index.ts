import en from "./en";
import zh from "./zh";

export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const dictionaries = { en, zh } satisfies Record<Locale, typeof en>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

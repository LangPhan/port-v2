export const i18n = {
  defaultLocale: "en",
  locales: ["en", "vi", "jp", "kr"],
  name: ["English", "Tiếng Việt", "日本語", "한국어"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
// Preserve public routes, use standard language tags in HTML and metadata.
export const languageTags: Record<Locale, string> = {
  en: "en",
  vi: "vi",
  jp: "ja",
  kr: "ko",
};
export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}

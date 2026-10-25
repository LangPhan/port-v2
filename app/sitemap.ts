import type { MetadataRoute } from "next";
import { i18n, languageTags } from "../i18n-config";
import { site } from "../site-config";
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [languageTags[lang], `${site.url}/${lang}`]),
  );
  return i18n.locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    alternates: { languages },
  }));
}

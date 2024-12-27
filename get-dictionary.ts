import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
  kr: () => import("./dictionaries/kr.json").then((module) => module.default), 
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();

import "server-only";
import type { Locale } from "./i18n-config";

export type Dictionary = typeof import("./dictionaries/en.json");
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
  kr: () => import("./dictionaries/kr.json").then((module) => module.default),
};
export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "vi", "jp", "kr"],
  name: ["English", "Tiếng Việt", "日本語", "한국어"],
  idFlag: ["t3NE3BsOAQwq", "2egPD0I7yi4-", "McQbrq9qaQye", "-_RS8ho736Fs"]
} as const;

export type Locale = (typeof i18n)["locales"][number];

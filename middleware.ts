import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, isLocale, languageTags, type Locale } from "./i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Leave files and platform endpoints alone; they are not locale pages.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    /\.[^/]+$/.test(pathname)
  )
    return;
  const segment = pathname.split("/")[1];
  if (isLocale(segment)) return;

  const headers = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers }).languages();
  const supported = Object.values(languageTags);
  let tag = languageTags[i18n.defaultLocale];
  try {
    tag = match(languages, supported, tag);
  } catch {
    /* Invalid Accept-Language: use the default. */
  }
  const locale = i18n.locales.find((item) => languageTags[item] === tag) as
    Locale | undefined;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale ?? i18n.defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}
export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)",
  ],
};

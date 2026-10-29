import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { getDictionary } from "../../get-dictionary";
import { i18n, isLocale, languageTags } from "../../i18n-config";
import { site } from "../../site-config";
import { ThemeProvider } from "./components/theme-provider";
import "pullcord/pullcord.css";
import "./global.css";
import "./components/Desk/fonts.css";
import "./components/Desk/desk.css";

type RouteProps = { params: Promise<{ lang: string }> };
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((locale) => [languageTags[locale], `/${locale}`]),
        ),
        "x-default": `/${i18n.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.name,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale: { en: "en_US", vi: "vi_VN", jp: "ja_JP", kr: "ko_KR" }[lang],
      images: [
        {
          url: `/${lang}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [`/${lang}/opengraph-image`],
    },
    icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
  };
}

export default async function Root({
  children,
  params,
}: RouteProps & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  return (
    <html lang={languageTags[lang]} className="dark" suppressHydrationWarning>
      <body id="top">
        <a className="skip-link" href="#main-content">
          {dictionary.navbar.skip}
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}

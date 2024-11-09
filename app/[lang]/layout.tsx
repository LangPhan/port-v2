import { Inter } from 'next/font/google';
import "./global.css";

import { i18n, type Locale } from "../../i18n-config";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Lang Portfolio V2",
  description: "Welcome to Lang's Portfolio"
};

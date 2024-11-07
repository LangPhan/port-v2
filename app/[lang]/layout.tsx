import "./global.css";

import { i18n, type Locale } from "../../i18n-config";

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
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Lang Portfolio V2",
  description: "Welcome to Lang's Portfolio"
};

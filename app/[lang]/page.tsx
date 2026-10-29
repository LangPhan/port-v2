import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";
import PortfolioDesk from "./components/Desk/portfolio-desk";
import { makePortfolioPages } from "./components/Desk/portfolio-pages";
import { getDeskCopy } from "./components/Desk/desk-copy";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const copy = getDeskCopy(lang);
  return (
    <PortfolioDesk
      lang={lang}
      dictionary={dictionary.navbar}
      copy={copy}
      chapters={makePortfolioPages(dictionary, copy)}
    />
  );
}

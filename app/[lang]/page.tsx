import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import LocaleSwitcher from "./components/locale-switcher";

export default async function IndexPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);


  return (
    <div className="bg-background w-full flex justify-center">
      <LocaleSwitcher />
    </div>
  );
}

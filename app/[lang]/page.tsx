import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Hero from "./components/Hero/Hero";

export default async function IndexPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);


  return (
    <div className="bg-background w-full flex justify-center">
      <Hero />
    </div>
  );
}

import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";
import { Contact } from "./components/Contact/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import Profile from "./components/Profile/Profile";
import Project from "./components/Project/Project";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Hero dictionary={dictionary.hero} />
        <Project dictionary={dictionary.projects} />
        <Profile dictionary={dictionary.profile} />
        <Contact dictionary={dictionary.contact} />
      </main>
      <Footer dictionary={dictionary.footer} />
    </>
  );
}

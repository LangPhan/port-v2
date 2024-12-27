import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import { Contact } from "./components/Contact/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import Profile from "./components/Profile/Profile";
import Project from "./components/Project/Project";
import { SparklesCore } from "./components/ui/sparkles";

export default async function IndexPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="relative bg-background w-full select-none scroll-smooth">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.2}
        />
      </div>
      <Hero dictionary={dictionary.hero} />
      <Profile dictionary={dictionary.profile} />
      <Project dictionary={dictionary.projects} />
      <Contact dictionary={dictionary.contact} />
      <Footer />
    </div>
  );
}

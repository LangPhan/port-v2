import type { Dictionary } from "../../../get-dictionary";
import type { Locale } from "../../../i18n-config";
import LocaleSwitcher from "./locale-switcher";
import Logo from "./Logo";
import ThemePullcord from "./theme-pullcord";

export default function Navbar({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: Dictionary["navbar"];
}) {
  return (
    <header className="site-header">
      <div className="shell header-row">
        <Logo label={dictionary.home} />
        <nav aria-label={dictionary.navigation} className="main-nav">
          <a href="#projects">{dictionary.projects}</a>
          <a href="#profile">{dictionary.about}</a>
          <a href="#contact">{dictionary.contact}</a>
        </nav>
        <div className="header-controls">
          <LocaleSwitcher lang={lang} label={dictionary.language} />
          <ThemePullcord dictionary={dictionary.theme} />
        </div>
      </div>
    </header>
  );
}

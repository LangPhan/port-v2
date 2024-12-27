import { getDictionary } from "get-dictionary"
import { Locale } from "i18n-config"
import LocaleSwitcher from "./locale-switcher"
import Logo from "./Logo"
import { ModeToggle } from "./ui/mode-toggle"

const Navbar = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang)
  return (
    <nav className="container h-14 flex justify-between items-center">
      <Logo brand={dictionary.navbar.brand} />
      <div className="flex gap-2 items-center">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
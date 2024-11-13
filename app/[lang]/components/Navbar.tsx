import LocaleSwitcher from "./locale-switcher"
import Logo from "./Logo"
import { ModeToggle } from "./ui/mode-toggle"

const Navbar = () => {
  return (
    <nav className="container h-14 flex justify-between items-center">
      <Logo />
      <div className="flex gap-2 items-center">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
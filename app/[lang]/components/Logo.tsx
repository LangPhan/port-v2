import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../get-dictionary";
import logoImage from "../../../public/logo.png";
import { generateStaticParams } from "../layout";

const Logo = async () => {
  const [{ lang }] = await generateStaticParams()

  const dictionary = await getDictionary(lang)

  return (
    <Link
      href={""}
      className="flex items-center gap-1">
      <Image src={logoImage} alt="Logo" width={58} height={58} loading="eager" priority />
      <span className="uppercase font-bold ">{dictionary.navbar.brand}</span>
    </Link>

  )
}

export default Logo 
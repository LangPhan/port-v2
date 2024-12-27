import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../public/logo.png";

const Logo = ({ brand }: { brand: string }) => {
  return (
    <Link
      href={""}
      className="flex items-center gap-1">
      <Image src={logoImage} alt="Logo" width={58} height={58} loading="eager" priority />
      <span className="uppercase font-bold ">{brand}</span>
    </Link>

  )
}

export default Logo 
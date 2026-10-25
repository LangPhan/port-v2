import Image from "next/image";
import logo from "../../../public/logo.png";
import { site } from "../../../site-config";

export default function Logo({ label }: { label: string }) {
  return (
    <a href="#top" className="brand" aria-label={`${site.name} — ${label}`}>
      <Image src={logo} alt="" width={40} height={40} sizes="40px" />
      <span>{site.name}</span>
    </a>
  );
}

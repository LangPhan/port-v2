"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/[lang]/components/ui/popover";
import { Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  i18n,
  type Locale,
} from "../../../i18n-config";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (
    locale: Locale
  ) => {
    if (!pathname) return "/";
    const segments =
      pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Languages className="size-6" />
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="w-full p-0 m-0"
        >
          <ul className="w-full">
            {i18n.locales.map(
              (locale) => {
                return (
                  <li
                    key={locale}
                    className="w-full hover:bg-slate-300 px-4"
                  >
                    <Link
                      href={redirectedPathname(
                        locale
                      )}
                      className="flex gap-2 uppercase font-bold"
                    >
                      <Image
                        src={
                          "https://img.icons8.com/?size=100&id=2egPD0I7yi4-&format=png&color=000000"
                        }
                        alt="image"
                        width={20}
                        height={20}
                      />
                      {locale}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </PopoverContent>
      </Popover>

    </div>
  );
}

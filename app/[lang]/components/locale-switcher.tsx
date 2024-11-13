"use client";
import { Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  i18n,
  type Locale,
} from "../../../i18n-config";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.replace("/", "")

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}
            className="p-3"
          >
            <Languages />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-full p-0 m-0"
        >
          {i18n.locales.map(
            (locale, index) => {
              return (
                <DropdownMenuItem
                  key={locale}
                  className={`${locale === currentLocale && "bg-accent"} w-full hover:bg-slate-300 px-4`}
                >
                  <Link
                    href={redirectedPathname(
                      locale
                    )}
                    className="flex gap-2"
                  >
                    <Image
                      src=
                      {`https://img.icons8.com/?size=100&id=${i18n.idFlag[index]}&format=png&color=000000`}

                      alt="image"
                      width={20}
                      height={20}
                    />
                    {i18n.name[index]}
                  </Link>
                </DropdownMenuItem>
              );
            }
          )}
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}

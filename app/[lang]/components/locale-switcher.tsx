"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/[lang]/components/ui/popover";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, type Locale } from "../../../i18n-config";


export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger><Languages className="size-6" /></PopoverTrigger>
        <PopoverContent align="center" className="w-fit">
          <ul>
            {i18n.locales.map((locale) => {
              return (
                <li key={locale}>
                  <Link href={redirectedPathname(locale)}>{locale}</Link>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>

    </div>
  );
}

"use client";
import { Check, ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { i18n, languageTags, type Locale } from "../../../i18n-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LocaleSwitcher({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="language-trigger"
        aria-label={`${label}: ${languageTags[lang].toUpperCase()} (${i18n.name[i18n.locales.indexOf(lang)]})`}
      >
        <Languages size={17} aria-hidden="true" />
        <span>{languageTags[lang].toUpperCase()}</span>
        <ChevronDown size={13} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="language-menu">
        {i18n.locales.map((locale, index) => {
          const segments = pathname.split("/");
          segments[1] = locale;
          return (
            <DropdownMenuItem key={locale} asChild>
              <a
                href={segments.join("/")}
                hrefLang={languageTags[locale]}
                lang={languageTags[locale]}
                aria-current={locale === lang ? "page" : undefined}
                className="language-option"
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  router.push(
                    `${segments.join("/")}${window.location.search}${window.location.hash}`,
                  );
                }}
              >
                {i18n.name[index]}
                {locale === lang && <Check size={16} aria-hidden="true" />}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

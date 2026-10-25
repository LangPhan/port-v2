"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { PullCord } from "pullcord";
import { useEffect, useState } from "react";
import type { Dictionary } from "../../../get-dictionary";

export default function ThemePullcord({
  dictionary,
}: {
  dictionary: Dictionary["navbar"]["theme"];
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const light = mounted && resolvedTheme === "light";

  return (
    <div className="theme-control" data-theme-toggle>
      <span className="theme-indicator" aria-hidden="true">
        {light ? <Sun size={13} /> : <Moon size={13} />}
      </span>
      <PullCord
        noEntrance
        pulled={light}
        ariaLabel={light ? dictionary.dark : dictionary.light}
        onPull={() => {
          if (mounted)
            setTheme((current) => (current === "light" ? "dark" : "light"));
        }}
      />
    </div>
  );
}

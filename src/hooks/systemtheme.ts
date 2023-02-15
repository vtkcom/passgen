import { useState, useEffect } from "react";

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

export function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    prefersColorScheme.matches ? "dark" : "light"
  );

  useEffect(init, []);

  function init() {
    prefersColorScheme.addEventListener("change", onChange);

    return () => prefersColorScheme.removeEventListener("change", onChange);
  }

  function onChange(e: MediaQueryListEvent) {
    const isDarked = e.matches;

    setTheme(isDarked ? "dark" : "light");
  }

  return theme;
}

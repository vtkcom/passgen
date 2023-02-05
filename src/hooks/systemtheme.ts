import { useState, useEffect } from "react";

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(darkModeMediaQuery.matches ? "dark" : "light");

  useEffect(init, []);

  function init() {
    darkModeMediaQuery.addEventListener("change", onChange);

    return () => darkModeMediaQuery.removeEventListener("change", onChange);
  }

  function onChange(e: MediaQueryListEvent) {
    const isDarked = e.matches;

    setTheme(isDarked ? "dark" : "light");
  }

  return theme;
}

export default useSystemTheme;

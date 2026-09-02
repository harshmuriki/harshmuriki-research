import { flushSync } from "react-dom";

type ThemeName = "light" | "dark";

type ThemeSetter = (theme: ThemeName) => void;

interface ViewTransitionDocument extends Document {
  startViewTransition: (callback: () => void) => { ready: Promise<void> };
}

const applyTheme = (nextTheme: ThemeName, setTheme: ThemeSetter): void => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(nextTheme);
  root.style.colorScheme = nextTheme;
  setTheme(nextTheme);
};

const canStartViewTransition = (
  doc: Document
): doc is ViewTransitionDocument =>
  typeof (doc as ViewTransitionDocument).startViewTransition === "function";

export const toggleThemeWithCenterSpread = (
  resolvedTheme: string | undefined,
  setTheme: ThemeSetter
): void => {
  const nextTheme: ThemeName = resolvedTheme === "light" ? "dark" : "light";
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const switchTheme = (): void => {
    flushSync(() => {
      applyTheme(nextTheme, setTheme);
    });
  };

  if (prefersReducedMotion || !canStartViewTransition(document)) {
    switchTheme();
    return;
  }

  document.startViewTransition(switchTheme);
};

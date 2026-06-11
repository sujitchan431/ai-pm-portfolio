// Tiny theme store — light ("day") is the default. The Three.js scene and the
// nav toggle both subscribe here so a switch repaints everything in one frame.
export type Theme = "light" | "dark";

const listeners = new Set<(t: Theme) => void>();

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage unavailable (private mode) — theme still applies for the session
  }
  listeners.forEach((fn) => fn(theme));
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}

export function subscribeTheme(fn: (t: Theme) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

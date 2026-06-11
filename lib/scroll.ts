// Shared scroll state read by the Three.js scene every frame without React re-renders.
import type Lenis from "lenis";

export const scrollState = {
  progress: 0, // 0 → 1 across the full page
  velocity: 0,
};

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

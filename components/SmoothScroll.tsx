"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    if (reduced) {
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => window.removeEventListener("scroll", updateProgress);
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: false,
    });
    setLenis(lenis);
    // Exposed for debugging and E2E tests.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      const limit = lenis.limit || 1;
      scrollState.progress = Math.min(1, Math.max(0, lenis.scroll / limit));
      scrollState.velocity = lenis.velocity;
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import { scrollToSection } from "@/lib/scroll";
import { getTheme, toggleTheme, subscribeTheme, type Theme } from "@/lib/theme";

function ThemeToggle({ theme, className }: { theme: Theme; className?: string }) {
  const isDay = theme === "light";
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full glass hover:border-[var(--border-strong)] transition-colors ${className ?? ""}`}
      aria-label={isDay ? "Switch to night theme" : "Switch to day theme"}
      title={isDay ? "Night mode" : "Day mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDay ? (
            // Sun — day theme active
            <svg className="w-[18px] h-[18px] text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
            </svg>
          ) : (
            // Moon — night theme active
            <svg className="w-[18px] h-[18px] text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    setThemeState(getTheme());
    return subscribeTheme(setThemeState);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Scroll progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />
      <div
        className={`transition-all duration-500 ${
          scrolled ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)]" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-[var(--on-accent)] font-bold text-sm">
              SC
            </span>
            <span className="hidden sm:block text-sm font-medium text-text-2 group-hover:text-text-1 transition-colors">
              {profile.name}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="px-4 py-2 text-[13px] font-medium text-text-3 hover:text-text-1 rounded-full hover:bg-[var(--hover)] transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} />
            <a
              href={profile.resumeUrl}
              download={profile.resumeFilename}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold bg-gradient-to-r from-accent to-accent-2 text-[var(--on-accent)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition-shadow"
            >
              Resume
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full glass"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-4 h-px bg-text-1 transition-transform ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-text-1 transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mx-4 mt-2 rounded-2xl glass-strong overflow-hidden"
          >
            <div className="p-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className="px-4 py-3 text-left text-sm font-medium text-text-2 hover:text-text-1 hover:bg-[var(--hover)] rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={profile.resumeUrl}
                download={profile.resumeFilename}
                className="mt-2 px-4 py-3 text-center text-sm font-semibold rounded-xl bg-gradient-to-r from-accent to-accent-2 text-[var(--on-accent)]"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="Validation"
          align="center"
          title={
            <>
              What people who&apos;ve <span className="text-gradient">worked with me</span> say
            </>
          }
        />

        <Reveal>
          <div
            className="relative glass-strong rounded-3xl p-10 md:p-16 min-h-[320px] flex flex-col justify-between overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-[0.06] blur-3xl bg-gradient-to-br from-accent to-accent-2"
              aria-hidden="true"
            />
            <span className="text-gradient text-6xl font-serif leading-none select-none" aria-hidden="true">
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col justify-between"
              >
                <blockquote className="text-xl md:text-2xl text-text-1 font-light leading-relaxed mt-4">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">
                    {t.role[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text-1">{t.role}</span>
                    <span className="block text-xs text-text-4 mt-0.5">{t.context}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-gradient-to-r from-accent to-accent-2" : "w-4 bg-[var(--track)] hover:bg-[var(--border-strong)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { frameworkSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function Framework() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Living system: auto-advance unless the user has taken control.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % frameworkSteps.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const step = frameworkSteps[active];

  return (
    <section id="framework" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Product Thinking"
          title={
            <>
              A <span className="text-gradient">living system</span>, not a checklist
            </>
          }
          desc="Six phases, one continuous loop. Every phase below is illustrated with a decision from a real shipped product."
        />

        <Reveal>
          {/* Step rail */}
          <div
            className="relative grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-0 mb-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[26px] left-[8.33%] right-[8.33%] h-px bg-white/[0.08]" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-2 origin-left"
                animate={{ scaleX: active / (frameworkSteps.length - 1) }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {frameworkSteps.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={s.name}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className="relative flex flex-col items-center gap-3 py-2 group"
                  aria-pressed={isActive}
                >
                  <span
                    className={`relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center font-mono text-sm transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-br from-accent to-accent-2 text-[#04211d] shadow-[0_0_28px_rgba(34,211,238,0.4)]"
                        : isPast
                          ? "glass text-accent border-accent/30"
                          : "glass text-text-4 group-hover:text-text-2"
                    }`}
                  >
                    {s.num}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-accent/50"
                        animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                      />
                    )}
                  </span>
                  <span
                    className={`text-xs md:text-[13px] font-medium transition-colors duration-300 ${
                      isActive ? "text-text-1" : "text-text-4 group-hover:text-text-3"
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="glass-strong rounded-3xl p-8 md:p-12 min-h-[280px] md:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-8 md:gap-14"
              >
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-4">
                    Phase {step.num} — {step.name}
                  </p>
                  <p className="text-lg md:text-xl text-text-2 leading-relaxed font-light">{step.desc}</p>
                </div>
                <div className="md:border-l md:border-white/[0.07] md:pl-14">
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-text-4 mb-4">In Practice</p>
                  <p className="text-[15px] text-text-3 leading-[1.8]">{step.example}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

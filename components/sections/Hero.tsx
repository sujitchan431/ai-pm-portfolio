"use client";

import { motion } from "framer-motion";
import { profile, heroMetrics } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { scrollToSection } from "@/lib/scroll";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 w-full pt-28 pb-16"
      >
        <motion.div variants={item} className="section-label mb-7">
          AI Product Operating System — {profile.name}
        </motion.div>

        <motion.h1
          variants={item}
          className="heading-tight text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold max-w-5xl"
        >
          Building AI Products That Turn{" "}
          <span className="text-gradient">Complexity</span> Into{" "}
          <span className="text-gradient">Scalable Systems</span>
        </motion.h1>

        <motion.p variants={item} className="mt-7 text-lg md:text-xl text-text-2 font-light tracking-wide">
          Product Manager <span className="text-text-4 mx-1.5">|</span> AI Builder{" "}
          <span className="text-text-4 mx-1.5">|</span> Entrepreneur
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <button onClick={() => scrollToSection("case-studies")} className="btn-primary">
            View Case Studies
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a href={profile.resumeUrl} download={profile.resumeFilename} className="btn-ghost">
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.04]"
        >
          {heroMetrics.map((m) => (
            <div key={m.label} className="bg-[#07090d]/80 px-6 py-7 lg:px-8">
              <div className="text-3xl lg:text-4xl font-semibold text-text-1">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-[11px] lg:text-xs font-medium tracking-[0.14em] uppercase text-text-4">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-text-4 font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

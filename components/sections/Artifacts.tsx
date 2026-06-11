"use client";

import { motion } from "framer-motion";
import { artifacts, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function Artifacts() {
  return (
    <section id="artifacts" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="PM Artifacts"
          title={
            <>
              The <span className="text-gradient">knowledge library</span> behind the products
            </>
          }
          desc="Real working documents — PRDs, experiment docs, prioritization sheets. Happy to walk through any of them live in an interview."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {artifacts.map((artifact, i) => (
            <motion.div
              key={artifact.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-7 flex flex-col hover:border-accent/30 transition-colors duration-500"
            >
              {/* Document icon */}
              <div className="w-10 h-12 rounded-md border border-[var(--border-strong)] bg-[var(--glass)] relative mb-6 flex-shrink-0">
                <div className="absolute top-0 right-0 w-3 h-3 bg-surface border-l border-b border-[var(--border-strong)] rounded-bl-sm" />
                <div className="absolute left-2 right-2 top-4 space-y-1.5">
                  <div className="h-px bg-accent/60 w-full" />
                  <div className="h-px bg-[var(--track)] w-4/5" />
                  <div className="h-px bg-[var(--track)] w-3/5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-text-1">{artifact.title}</h3>
              <p className="mt-2 text-[13px] text-text-3 leading-[1.7] flex-1">{artifact.desc}</p>
              <ul className="mt-5 pt-4 border-t border-[var(--border)] space-y-1.5">
                {artifact.items.map((item) => (
                  <li key={item} className="text-[11px] font-mono text-text-4 truncate">
                    <span className="text-accent/60 mr-1.5">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA card completes the grid */}
          <Reveal delay={0.2}>
            <a
              href={`mailto:${profile.email}?subject=Artifact%20walkthrough%20request`}
              className="glass rounded-2xl p-7 flex flex-col items-start justify-center h-full border-dashed hover:border-accent/40 transition-colors duration-500 group"
            >
              <p className="text-base font-semibold text-text-1 group-hover:text-gradient transition-all">
                Request a walkthrough
              </p>
              <p className="mt-2 text-[13px] text-text-3 leading-[1.7]">
                These are working documents from real products. I&apos;ll screen-share any of them and explain the reasoning.
              </p>
              <span className="mt-5 text-[13px] font-medium text-accent inline-flex items-center gap-1.5">
                Get in touch
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

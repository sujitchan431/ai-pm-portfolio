"use client";

import { motion } from "framer-motion";
import { labItems } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const statusColor: Record<string, string> = {
  Shipped: "text-accent border-accent/30 bg-accent/[0.07]",
  Production: "text-accent-2 border-accent-2/30 bg-accent-2/[0.07]",
  Ongoing: "text-amber-300 border-amber-300/30 bg-amber-300/[0.07]",
};

export default function AILab() {
  return (
    <section id="lab" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="AI Product Lab"
          title={
            <>
              An <span className="text-gradient">innovation lab</span> of working AI systems
            </>
          }
          desc="Not concepts — systems that run. Each card is something built, shipped, and measured."
        />

        <div className="relative">
          {/* Connection lines behind the grid (desktop) */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lab-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <motion.line
              x1="25%" y1="25%" x2="75%" y2="75%"
              stroke="url(#lab-line)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1="75%" y1="25%" x2="25%" y2="75%"
              stroke="url(#lab-line)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3 }}
            />
          </svg>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {labItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`glass rounded-2xl p-7 flex flex-col hover:border-accent/30 transition-colors duration-500 ${
                  i % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <h3 className="text-base font-semibold text-text-1 leading-snug">{item.title}</h3>
                  <span
                    className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${statusColor[item.status] ?? statusColor.Shipped}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[13px] text-text-3 leading-[1.75] flex-1">{item.desc}</p>
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-text-4">
                      {tag}
                      <span className="text-accent/50 ml-1.5 last:hidden">·</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

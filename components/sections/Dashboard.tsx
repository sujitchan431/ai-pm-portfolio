"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { dashboardSkills } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function RadarChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 132;
  const n = dashboardSkills.length;

  const point = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r] as const;
  };

  const polygon = (scale: number) =>
    dashboardSkills.map((_, i) => point(i, maxR * scale).join(",")).join(" ");

  const dataPolygon = dashboardSkills
    .map((s, i) => point(i, (maxR * s.level) / 100).join(","))
    .join(" ");

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[420px] mx-auto" role="img" aria-label="Skill radar chart">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s} points={polygon(s)} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {dashboardSkills.map((_, i) => {
        const [x, y] = point(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}
      {/* Data */}
      <motion.polygon
        points={dataPolygon}
        fill="rgba(45,212,191,0.12)"
        stroke="url(#radar-stroke)"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <defs>
        <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Vertex dots + labels */}
      {dashboardSkills.map((s, i) => {
        const [dx, dy] = point(i, (maxR * s.level) / 100);
        const [lx, ly] = point(i, maxR + 26);
        return (
          <g key={s.name}>
            <motion.circle
              cx={dx}
              cy={dy}
              r="3"
              fill="var(--accent)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.05 }}
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--text-3)]"
              fontSize="10.5"
              fontFamily="var(--font-geist-mono)"
            >
              {s.name.split(" ").map((word, wi, arr) => (
                <tspan key={wi} x={lx} dy={wi === 0 ? `${-(arr.length - 1) * 0.55}em` : "1.1em"}>
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SkillBar({ skill, index }: { skill: (typeof dashboardSkills)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-text-2">{skill.name}</span>
        <span className="flex items-baseline gap-2.5">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-text-4">{skill.tier}</span>
          <span className="metric-num text-xs text-accent">{skill.level}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--track)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Execution Dashboard"
          title={
            <>
              Competency, <span className="text-gradient">instrumented</span>
            </>
          }
          desc="The same way I'd present product health: measured, visualized, and honest about levels."
        />

        <Reveal>
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-2 mb-10 pb-6 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
              <span className="ml-4 font-mono text-xs text-text-4 tracking-wider">
                sujit — product-execution — live
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                {dashboardSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
              <div>
                <RadarChart />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

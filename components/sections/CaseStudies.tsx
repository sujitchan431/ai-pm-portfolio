"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PHASES = ["Problem", "Research", "Insights", "Strategy", "Execution", "Metrics", "Lessons"] as const;

function PhaseBlock({
  id,
  phase,
  children,
}: {
  id: string;
  phase: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} data-phase={phase} className="scroll-mt-32 py-10 first:pt-0 last:pb-0">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6">{phase}</p>
        {children}
      </Reveal>
    </div>
  );
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-4 mb-3">{children}</p>;
}

function CaseStudyBlock({ study }: { study: CaseStudy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<string>("Problem");

  useEffect(() => {
    const blocks = containerRef.current?.querySelectorAll("[data-phase]");
    if (!blocks || blocks.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivePhase((entry.target as HTMLElement).dataset.phase ?? "Problem");
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    blocks.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <article className="relative mb-28 last:mb-0">
      {/* Documentary title card */}
      <Reveal className="mb-14">
        <div className="glass-strong rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-[0.07] blur-3xl bg-gradient-to-br from-accent to-accent-2"
            aria-hidden="true"
          />
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-text-4 mb-5">
            Case Study {study.num} — {study.category}
          </p>
          <h3 className="heading-tight text-4xl md:text-6xl font-semibold">
            <span className="text-gradient">{study.title}</span>
          </h3>
          <p className="mt-5 text-lg md:text-xl text-text-2 font-light max-w-2xl leading-relaxed">{study.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="text-text-3">
              <span className="text-text-4">Role — </span>
              {study.role}
            </span>
            <span className="text-text-3">
              <span className="text-text-4">Timeline — </span>
              {study.timeline}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--grid-line)]">
            {study.heroMetrics.map((m) => (
              <div key={m.label} className="bg-[var(--tile)] px-5 py-5">
                <div className="metric-num text-2xl md:text-3xl font-semibold text-gradient">{m.value}</div>
                <div className="mt-1.5 text-[10px] md:text-[11px] font-medium tracking-[0.12em] uppercase text-text-4">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-14">
        {/* Sticky phase rail */}
        <nav className="hidden lg:block" aria-label={`${study.title} chapters`}>
          <div className="sticky top-32 flex flex-col gap-1">
            {PHASES.map((phase) => {
              const isActive = phase === activePhase;
              return (
                <a
                  key={phase}
                  href={`#${study.id}-${phase.toLowerCase()}`}
                  className={`relative pl-5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? "text-text-1" : "text-text-4 hover:text-text-3"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-px transition-all duration-300 ${
                      isActive ? "h-5 bg-gradient-to-b from-accent to-accent-2" : "h-3 bg-[var(--track)]"
                    }`}
                  />
                  {phase}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Phase content */}
        <div ref={containerRef} className="divide-y divide-[var(--border)]">
          <PhaseBlock id={`${study.id}-problem`} phase="Problem">
            <p className="text-lg md:text-xl text-text-2 leading-relaxed font-light max-w-3xl">
              {study.problem.context}
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {study.problem.painPoints.map((p, i) => (
                <div key={i} className="panel rounded-2xl p-6">
                  <span className="metric-num text-xs text-accent">PAIN-0{i + 1}</span>
                  <p className="mt-3 text-sm text-text-3 leading-[1.75]">{p}</p>
                </div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-research`} phase="Research">
            <p className="text-[15px] text-text-3 leading-[1.8] max-w-3xl">{study.research.approach}</p>
            <blockquote className="mt-8 glass rounded-2xl p-7 border-l-2 border-l-accent">
              <p className="text-lg text-text-1 font-light leading-relaxed">&ldquo;{study.research.quote}&rdquo;</p>
              <footer className="mt-3 text-xs text-text-4 font-mono">— {study.research.quoteAttribution}</footer>
            </blockquote>
            <ul className="mt-8 space-y-3">
              {study.research.findings.map((f, i) => (
                <li key={i} className="flex gap-4 text-sm text-text-3 leading-[1.75]">
                  <span className="metric-num text-accent/70 flex-shrink-0 pt-px">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-insights`} phase="Insights">
            <div className="space-y-4">
              {study.insights.map((insight, i) => (
                <div key={i} className="glass rounded-2xl p-7 hover:border-accent/25 transition-colors duration-500">
                  <p className="text-base md:text-lg text-text-2 leading-relaxed font-light">
                    <span className="text-gradient font-medium">Insight {i + 1} — </span>
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-strategy`} phase="Strategy">
            <p className="text-lg md:text-xl text-text-2 leading-relaxed font-light max-w-3xl">
              {study.strategy.summary}
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-5">
              <div className="panel rounded-2xl p-7">
                <MiniLabel>Product Requirements</MiniLabel>
                <ul className="space-y-2.5">
                  {study.strategy.requirements.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-3 leading-[1.7]">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel rounded-2xl p-7">
                <MiniLabel>Prioritization — {study.strategy.prioritization.name}</MiniLabel>
                <p className="text-sm text-text-3 leading-[1.8]">{study.strategy.prioritization.detail}</p>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {study.strategy.prdHighlights.map((h) => (
                <div key={h.label} className="glass rounded-2xl p-6">
                  <MiniLabel>PRD — {h.label}</MiniLabel>
                  <p className="text-sm text-text-2 leading-[1.7]">{h.text}</p>
                </div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-execution`} phase="Execution">
            <p className="text-[15px] text-text-3 leading-[1.8] max-w-3xl">{study.execution.summary}</p>

            {/* AI architecture pipeline */}
            <div className="mt-10 panel rounded-2xl p-7">
              <MiniLabel>System Architecture</MiniLabel>
              <div className="flex flex-col gap-0">
                {study.execution.architecture.map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="glass rounded-xl px-5 py-3.5 text-sm text-text-2 font-mono flex items-center gap-3">
                      <span className="text-accent text-xs">{String(i + 1).padStart(2, "0")}</span>
                      {node}
                    </div>
                    {i < study.execution.architecture.length - 1 && (
                      <div className="ml-7 h-5 w-px bg-gradient-to-b from-accent/50 to-accent-2/30" aria-hidden="true" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid lg:grid-cols-2 gap-5">
              <div className="panel rounded-2xl p-7">
                <MiniLabel>User Journey</MiniLabel>
                <ol className="space-y-3">
                  {study.execution.userJourney.map((step, i) => (
                    <li key={i} className="flex gap-3.5 text-sm text-text-3 leading-[1.7]">
                      <span className="w-6 h-6 rounded-full glass flex items-center justify-center text-[10px] font-mono text-accent flex-shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col gap-4">
                <MiniLabel>Key Decisions & Trade-offs</MiniLabel>
                {study.execution.decisions.map((d, i) => (
                  <div key={i} className="glass rounded-2xl p-6 flex-1">
                    <p className="text-sm font-semibold text-text-1 leading-snug">{d.decision}</p>
                    <p className="mt-2.5 text-[13px] text-text-3 leading-[1.7]">
                      <span className="text-text-4 font-mono text-[10px] tracking-[0.2em] uppercase mr-2">Trade-off</span>
                      {d.tradeoff}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-metrics`} phase="Metrics">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {study.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-2xl p-6 hover:border-accent/25 transition-colors duration-500"
                >
                  <div className="metric-num text-2xl md:text-3xl font-semibold text-gradient">{m.value}</div>
                  <div className="mt-2 text-xs text-text-3 leading-snug">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock id={`${study.id}-lessons`} phase="Lessons">
            <div className="space-y-5">
              {study.lessons.map((lesson, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="metric-num text-2xl font-semibold text-[var(--faint)] flex-shrink-0 leading-none pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg text-text-2 font-light leading-relaxed">{lesson}</p>
                </div>
              ))}
            </div>
          </PhaseBlock>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[var(--overlay)]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Featured Case Studies"
          title={
            <>
              Products as <span className="text-gradient">documentaries</span> — problem to outcome
            </>
          }
          desc="Full product lifecycle, shown end-to-end: research, strategy, architecture, metrics, and the lessons that survived contact with users."
        />
        {caseStudies.map((study) => (
          <CaseStudyBlock key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}

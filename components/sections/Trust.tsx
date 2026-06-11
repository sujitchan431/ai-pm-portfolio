"use client";

import { trustPillars } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Trust() {
  return (
    <section id="trust" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Credibility"
          title={
            <>
              Operator depth across <span className="text-gradient">every layer</span> of product
            </>
          }
          desc="Founder accountability, production AI systems, and a decade of shipping — not slideware."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.07} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="glass rounded-2xl p-8 h-full group hover:border-accent/30 transition-colors duration-500">
                <div className="text-4xl md:text-5xl font-semibold text-gradient">
                  {pillar.isText ? (
                    <span className="metric-num">{pillar.textValue}</span>
                  ) : (
                    <Counter value={pillar.value} suffix={pillar.suffix} />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-1">{pillar.title}</h3>
                <p className="mt-2.5 text-sm text-text-3 leading-relaxed">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

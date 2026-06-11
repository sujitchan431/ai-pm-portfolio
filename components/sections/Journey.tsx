"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyStages } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

function StageCard({ stage }: { stage: (typeof journeyStages)[0] }) {
  return (
    <div className="journey-card flex-shrink-0 w-[85vw] sm:w-[460px] glass rounded-3xl p-8 md:p-10 flex flex-col">
      <div className="flex items-baseline justify-between mb-8">
        <span className="metric-num text-5xl font-semibold text-white/[0.08]">{stage.stage}</span>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{stage.era}</span>
      </div>
      <h3 className="heading-tight text-3xl font-semibold text-text-1">{stage.role}</h3>
      <p className="mt-2 text-sm font-medium text-text-4">{stage.org}</p>
      <p className="mt-5 text-[15px] text-text-3 leading-[1.8] flex-1">{stage.story}</p>
      <div className="mt-8 pt-6 border-t border-white/[0.07]">
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-text-4 mb-2">Lesson Learned</p>
        <p className="text-[15px] font-medium text-gradient leading-snug">&ldquo;{stage.lesson}&rdquo;</p>
      </div>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="journey" className="relative">
      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36">
        <SectionHeading
          label="The Journey"
          title={
            <>
              From engineering rigor to <span className="text-gradient">AI product leadership</span>
            </>
          }
          desc="Five stages. Each one compounded into the next — and left a lesson that still ships in every product."
        />
      </div>

      {/* Desktop: pinned horizontal scroll. Mobile: vertical stack. */}
      <div ref={sectionRef} className="relative md:h-screen md:flex md:items-center md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-[8vw] py-4 md:py-0 items-stretch max-md:max-w-xl max-md:mx-auto"
        >
          {journeyStages.map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-6 md:gap-8">
              <Reveal delay={0} className="h-full md:h-auto">
                <StageCard stage={stage} />
              </Reveal>
              {i < journeyStages.length - 1 && (
                <div className="hidden md:flex items-center" aria-hidden="true">
                  <div className="w-14 h-px bg-gradient-to-r from-accent/50 to-accent-2/50 relative">
                    <div className="absolute -right-1 -top-[3px] w-[7px] h-[7px] rotate-45 border-t border-r border-accent-2/60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pb-20 md:pb-0" />
    </section>
  );
}

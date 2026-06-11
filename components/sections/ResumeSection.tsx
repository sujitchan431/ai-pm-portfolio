"use client";

import { profile, resumeSnapshot } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function SnapshotColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel rounded-2xl p-7">
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent mb-5">{title}</p>
      {children}
    </div>
  );
}

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Product Leadership Snapshot"
          title={
            <>
              The full picture, <span className="text-gradient">one page deep</span>
            </>
          }
          desc="A decade of building, condensed for the 30-second scan and the 30-minute deep dive."
        />

        <div className="grid lg:grid-cols-[1.1fr_2fr] gap-6">
          {/* Download card */}
          <Reveal>
            <div className="glass-strong rounded-3xl p-9 h-full flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.08] blur-3xl bg-gradient-to-br from-accent to-accent-2"
                aria-hidden="true"
              />
              <div>
                <h3 className="heading-tight text-2xl md:text-3xl font-semibold">
                  Resume — <span className="text-gradient">AI Product Manager</span>
                </h3>
                <p className="mt-4 text-sm text-text-3 leading-[1.8]">
                  Experience, skills, projects, and achievements — formatted for hiring teams. Updated and ATS-friendly.
                </p>
              </div>
              <div className="mt-10">
                <a href={profile.resumeUrl} download={profile.resumeFilename} className="btn-primary w-full sm:w-auto">
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </a>
                <p className="mt-4 text-[11px] font-mono text-text-4">PDF · {profile.resumeFilename}</p>
              </div>
            </div>
          </Reveal>

          {/* Snapshot grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal delay={0.08}>
              <SnapshotColumn title="Experience">
                <ul className="space-y-4">
                  {resumeSnapshot.experience.map((e) => (
                    <li key={e.org}>
                      <p className="text-sm font-semibold text-text-1">{e.role}</p>
                      <p className="text-xs text-text-3 mt-0.5">{e.org}</p>
                      <p className="text-[11px] font-mono text-text-4 mt-0.5">{e.period}</p>
                    </li>
                  ))}
                </ul>
              </SnapshotColumn>
            </Reveal>
            <Reveal delay={0.14}>
              <SnapshotColumn title="Skills">
                <div className="flex flex-wrap gap-2">
                  {resumeSnapshot.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </SnapshotColumn>
            </Reveal>
            <Reveal delay={0.2}>
              <SnapshotColumn title="Projects">
                <ul className="space-y-2.5">
                  {resumeSnapshot.projects.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[13px] text-text-3 leading-snug">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SnapshotColumn>
            </Reveal>
            <Reveal delay={0.26}>
              <SnapshotColumn title="Achievements">
                <ul className="space-y-2.5">
                  {resumeSnapshot.achievements.map((a) => (
                    <li key={a} className="flex gap-2.5 text-[13px] text-text-3 leading-snug">
                      <span className="w-1 h-1 rounded-full bg-accent-2 mt-2 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </SnapshotColumn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { profile } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const links = [
  {
    label: "LinkedIn",
    sub: "sujit-chankhore",
    href: profile.linkedin,
    external: true,
  },
  {
    label: "Email",
    sub: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: "GitHub",
    sub: "sujitchan431",
    href: profile.github,
    external: true,
  },
  {
    label: "Portfolio Assets",
    sub: "Resume · PRDs · Case studies",
    href: profile.resumeUrl,
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <div className="section-label mb-7 justify-center" style={{ display: "inline-flex" }}>
            Contact
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-tight text-4xl md:text-6xl lg:text-7xl font-semibold">
            Let&apos;s Build the Next{" "}
            <span className="text-gradient">AI Product Category</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 text-base md:text-lg text-text-3 max-w-xl mx-auto leading-relaxed">
            Open to Senior AI Product Manager roles, founding PM positions, and conversations about products worth building.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(link.label === "Portfolio Assets" ? { download: profile.resumeFilename } : {})}
                className="glass rounded-2xl p-6 text-left group hover:border-accent/35 hover:-translate-y-1 transition-all duration-400"
              >
                <p className="text-sm font-semibold text-text-1 flex items-center justify-between">
                  {link.label}
                  <svg
                    className="w-3.5 h-3.5 text-text-4 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </p>
                <p className="mt-1.5 text-xs text-text-4 truncate font-mono">{link.sub}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

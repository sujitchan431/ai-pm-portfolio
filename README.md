# Sujit Chankhore — AI Product Manager Portfolio

A scroll-controlled 3D portfolio experience built to feel like moving through an AI Product Operating System — not browsing a resume.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — dark premium theme, glassmorphism design system
- **Three.js + React Three Fiber** — scroll-reactive neural knowledge graph, intelligence core, traveling data packets
- **GSAP ScrollTrigger** — pinned horizontal-scroll journey timeline
- **Framer Motion** — section reveals, counters, cinematic card transitions
- **Lenis** — smooth scrolling synced to GSAP and the 3D camera

## Architecture

```
app/
  layout.tsx          # metadata, Geist fonts
  page.tsx            # assembles all 11 sections
  globals.css         # design tokens + glass/gradient utilities
components/
  SmoothScroll.tsx    # Lenis ↔ GSAP ScrollTrigger ↔ scrollState bridge
  Navigation.tsx      # glass nav, scroll progress bar, mobile menu
  three/NeuralScene.tsx  # fixed WebGL canvas — camera travels a node tunnel as you scroll
  sections/           # Hero, Trust, Journey, Framework, CaseStudies,
                      # AILab, Dashboard, Artifacts, Testimonials,
                      # ResumeSection, Contact
lib/
  data.ts             # single source of truth for ALL site content
  scroll.ts           # shared scroll state read by the 3D scene per frame
```

## Editing content

Everything lives in [lib/data.ts](lib/data.ts) — metrics, journey stages, case studies, lab items, skills, artifacts, testimonials, resume snapshot.

> **Note:** testimonial quotes are role-attributed placeholders. Replace them with real quotes (with permission) before sharing widely.

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Performance notes

- Single WebGL canvas, capped DPR (1.75), additive-blend points/lines — no postprocessing
- Node count drops to 130 on mobile
- `prefers-reduced-motion` disables smooth scroll, camera drift, and node animation
- Three.js scene is dynamically imported client-side only

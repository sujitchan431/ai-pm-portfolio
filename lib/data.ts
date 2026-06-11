// Single source of truth for all site content.
// Facts sourced from Sujit's resume, sujitbuilds.com, and the Listen2RE case study.

export const profile = {
  name: "Sujit Chankhore",
  title: "AI Product Manager",
  headline: "Building AI Products That Turn Complexity Into Scalable Systems",
  subheadline: "Product Manager | AI Builder | Entrepreneur",
  location: "Pune, India",
  email: "sujitchan431@gmail.com",
  linkedin: "https://www.linkedin.com/in/sujit-chankhore/",
  github: "https://github.com/sujitchan431/",
  resumeUrl: "/resume.pdf",
  resumeFilename: "AI-PM-Sujit-Chankhore.pdf",
};

export const heroMetrics = [
  { value: 10, suffix: "+", label: "Years Building Products" },
  { value: 6, suffix: "", label: "Products Launched" },
  { value: 77, suffix: "K+", label: "Users Impacted" },
  { value: 5, suffix: "+", label: "AI Systems Built" },
];

export const trustPillars = [
  {
    value: 10,
    suffix: "+",
    title: "Years of Product Management",
    desc: "End-to-end ownership: discovery, PRDs, roadmaps, launch, iteration — across B2B, B2B2C, and consumer.",
  },
  {
    value: 2,
    suffix: "",
    title: "Companies Founded",
    desc: "Founder & CEO of Zerton Engineering Services and Zerton Education Technologies. P&L-level accountability.",
  },
  {
    value: 5,
    suffix: "+",
    title: "AI Systems in Production",
    desc: "LLM content pipelines, RAG systems, multi-agent orchestration, evaluation frameworks, voice AI.",
  },
  {
    value: 26,
    suffix: "+",
    title: "SaaS Institutions Served",
    desc: "Multi-tenant B2B2C ERP + learning platform rolled out across 26+ engineering institutions, 42K+ users.",
  },
  {
    value: 0,
    suffix: "",
    title: "Education & Foundation",
    desc: "B.E. Mechanical Engineering. Published composites research at L&T. Continuous upskilling in LLM engineering, evals, and agentic systems.",
    isText: true,
    textValue: "B.E.",
  },
];

export const journeyStages = [
  {
    stage: "01",
    era: "2014 — 2015",
    role: "Engineer",
    org: "L&T Heavy Engineering · Research Intern",
    story:
      "Researched fiber-reinforced polymer composites under marine conditions. Published findings on the dynamic failure behavior of GFRP. Learned to instrument a system, stress it, and read the data honestly.",
    lesson: "Systems fail at the interfaces, not the components. Products do too.",
  },
  {
    stage: "02",
    era: "2015 — 2023",
    role: "Startup Founder",
    org: "Zerton Engineering Services · Founder & PM",
    story:
      "Spotted institutions running operations on Excel and WhatsApp. Built a B2B2C ERP + learning platform from 0→1, grew it to 26+ institutions and 42K+ users across Maharashtra with a cross-functional team of 8.",
    lesson: "Nobody buys software. They buy fewer Monday-morning fires.",
  },
  {
    stage: "03",
    era: "2023",
    role: "EdTech Builder",
    org: "Zerton Education Technologies · CEO",
    story:
      "Launched Listen2RE — an audio-first learning platform for UPSC/MPSC aspirants. Shipped a mobile web MVP in 8 weeks instead of a 6-month native app. 35K+ learners followed.",
    lesson: "Habit design beats feature count. Consistency is the product.",
  },
  {
    stage: "04",
    era: "2024",
    role: "AI Product Builder",
    org: "LLM Pipelines · RAG · Agents · Evals",
    story:
      "Re-architected Listen2RE around an LLM content pipeline with LLM-as-a-Judge quality gates — cutting production effort 60%. Built RAG systems, multi-agent automations, and an AI PRD generator.",
    lesson: "The AI is invisible. The value is the outcome.",
  },
  {
    stage: "05",
    era: "Now",
    role: "AI Product Manager",
    org: "Agentic Systems · Product Leadership",
    story:
      "Operating at the intersection of product strategy and applied AI: scoping what LLMs can reliably do, designing the eval harness that proves it, and shipping products users return to daily.",
    lesson: "Ship outcomes, not models. Measure everything that matters.",
  },
];

export const frameworkSteps = [
  {
    num: "01",
    name: "Discover",
    desc: "Live with the user's problem before touching a solution. Field interviews, JTBD framing, and observing behavior — not just asking about it.",
    example:
      "Interviewing working UPSC aspirants surfaced the real constraint: not motivation, but 45–90 wasted commute minutes a day. That insight became Listen2RE.",
  },
  {
    num: "02",
    name: "Validate",
    desc: "Find the smallest testable slice that proves or kills the riskiest assumption. Speed of learning over completeness of build.",
    example:
      "Shipped Listen2RE as a mobile web app in 8 weeks instead of a 6-month native build. Learner behavior validated the model before heavy investment.",
  },
  {
    num: "03",
    name: "Prioritize",
    desc: "RICE scoring weighted by habit impact and AI-readiness. Saying no is the core deliverable — every yes carries pipeline and eval cost.",
    example:
      "Chose a single daily 6:30 AM push over an on-demand library. Less user control, far stronger habit loop — completion hit 71%.",
  },
  {
    num: "04",
    name: "Build",
    desc: "AI-first pipelines with humans where judgment matters. Design the system so quality is enforced by architecture, not heroics.",
    example:
      "Flipped 'human writes, AI edits' to 'AI generates, human spot-checks behind an LLM-as-a-Judge gate' — cutting content production effort 60%.",
  },
  {
    num: "05",
    name: "Measure",
    desc: "Instrument the outcome, not the output. Every AI feature ships with its evaluation harness and a north-star metric it must move.",
    example:
      "Tracked session completion (71%), LLM quality pass rate (87%), and human flag rate — driven down from 31% to 13% month over month.",
  },
  {
    num: "06",
    name: "Iterate",
    desc: "Follow the data to the highest-leverage fix — which is often not a feature. Then loop back to discovery with sharper questions.",
    example:
      "Upgrading voice synthesis quality lifted retention more than any feature shipped that quarter. Sound quality WAS the product.",
  },
];

// ---------- Case studies ----------

export type CaseStudy = {
  id: string;
  num: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  timeline: string;
  stack: string[];
  heroMetrics: { value: string; label: string }[];
  problem: { context: string; painPoints: string[] };
  research: { approach: string; findings: string[]; quote: string; quoteAttribution: string };
  insights: string[];
  strategy: {
    summary: string;
    requirements: string[];
    prioritization: { name: string; detail: string };
    prdHighlights: { label: string; text: string }[];
  };
  execution: {
    summary: string;
    architecture: string[];
    userJourney: string[];
    decisions: { decision: string; tradeoff: string }[];
  };
  metrics: { value: string; label: string }[];
  lessons: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "listen2re",
    num: "01",
    title: "Listen2RE",
    tagline: "An AI-augmented audio learning platform that turns wasted commute hours into UPSC progress.",
    category: "AI EdTech · 0→1",
    role: "CEO & AI Product Lead",
    timeline: "2023 — Present",
    stack: ["Claude API", "LLM Pipelines", "LLM-as-a-Judge", "TTS", "n8n", "Mixpanel", "PWA"],
    heroMetrics: [
      { value: "35K+", label: "Learners served" },
      { value: "71%", label: "Session completion" },
      { value: "60%", label: "Production effort cut" },
      { value: "8 wks", label: "Idea to launch" },
    ],
    problem: {
      context:
        "UPSC/MPSC preparation takes years, the syllabus is enormous, and most aspirants hold full-time jobs. The standard solutions — books, coaching, YouTube — all demand screen-on, focused attention that working aspirants simply cannot give.",
      painPoints: [
        "Working aspirants commute 45–90 minutes daily in conditions where reading is impossible — that time produces zero progress.",
        "Existing audio content was low-quality YouTube: slow pacing, no structure, nothing designed for audio-native learning.",
        "Aspirants knew exactly what to study. The constraint was never knowledge of the syllabus — it was usable time.",
      ],
    },
    research: {
      approach:
        "Field interviews with working aspirants aged 24–34, employed full-time, with 1–3 hours/day for prep. Mapped their actual day hour-by-hour instead of asking what features they wanted.",
      findings: [
        "Commute time was the single largest block of recoverable learning inventory — and it was 100% unused.",
        "Aspirants had tried podcasts and abandoned them: content read aloud from documents doesn't work for ears.",
        "Decision fatigue was real — large content libraries caused skipped sessions, not more engagement.",
      ],
      quote: "I know what I need to study. I just can't find the time to sit and study it.",
      quoteAttribution: "Working MPSC aspirant, user interview",
    },
    insights: [
      "Passive commute hours are wasted learning inventory — the product is reclaiming time users already spend.",
      "Audio-native ≠ text-to-speech. Content designed for ears has different sentence structure, pacing, and signposting than content designed for eyes.",
      "For habit-forming behavior, consistency beats choice. One great daily session outperforms an infinite library.",
    ],
    strategy: {
      summary:
        "Position Listen2RE not as a podcast or TTS app, but as an AI content system that ingests dense UPSC material and produces structured, audio-native daily sessions matched to each learner's commute.",
      requirements: [
        "Daily 15–25 min audio session, pushed at 6:30 AM, matched to the learner's current topic",
        "LLM pipeline: topic extraction → concept summarization → audio-script formatting → key-term callouts",
        "Quality gate: LLM-as-a-Judge pre-filter plus 10-minute human spot-check before publish",
        "Engagement loop: session rating, streaks, and replay with topic override",
        "Mobile-first web app with PWA caching for offline listening",
      ],
      prioritization: {
        name: "RICE, weighted by habit impact",
        detail:
          "Every candidate feature scored on Reach × Impact × Confidence ÷ Effort, with a habit-impact multiplier. Features that strengthened the daily loop (push timing, streaks, voice quality) consistently out-scored content breadth. The library expansion everyone asked for scored lowest — and was cut.",
      },
      prdHighlights: [
        {
          label: "North-star metric",
          text: "Completed listening sessions per learner per week — not downloads, not signups.",
        },
        {
          label: "Explicit non-goal",
          text: "Listen2RE is not an on-demand podcast library. One daily session, sequenced for the learner.",
        },
        {
          label: "Quality guardrail",
          text: "No AI-generated session ships below an 85% LLM-as-a-Judge pass threshold. Human review on every flag.",
        },
      ],
    },
    execution: {
      summary:
        "Built the full content system end-to-end: ingestion, LLM processing on the Claude API, dual-layer quality review, voice synthesis, and CDN delivery — orchestrated with n8n, instrumented with Mixpanel.",
      architecture: [
        "Source material — UPSC docs, current affairs, PYQs",
        "Ingestion + chunking (Python)",
        "LLM processing (Claude API) — extraction, summarization, audio-script formatting",
        "Quality gate — LLM-as-a-Judge + human spot-check",
        "Voice synthesis — TTS pipeline",
        "Platform + CDN delivery",
      ],
      userJourney: [
        "6:30 AM — daily session lands, matched to current topic",
        "Commute — 15–25 min structured audio, paced for listening",
        "Key-term recap — callouts reinforce retention at session end",
        "One-tap rating — feeds the quality loop",
        "Streak + progress — visible momentum across the syllabus",
      ],
      decisions: [
        {
          decision: "AI generates, human spot-checks — not the reverse",
          tradeoff:
            "Occasional quality misses a human-first flow would catch. Accepted because the user feedback loop surfaces issues fast — and production effort dropped 60%.",
        },
        {
          decision: "Daily push over on-demand library",
          tradeoff:
            "Less perceived user control. Offset with topic overrides and replay. Habit strength won: 71% completion.",
        },
        {
          decision: "Mobile web first, native app later",
          tradeoff:
            "No offline listening at launch — the #1 feature request. Shipped 8 weeks instead of 6 months; PWA caching closed the gap in a later iteration.",
        },
      ],
    },
    metrics: [
      { value: "35,000+", label: "Total learners served" },
      { value: "71%", label: "Avg. session completion rate" },
      { value: "84%", label: "Report it reclaims commute time" },
      { value: "87%", label: "LLM-as-a-Judge quality pass rate" },
      { value: "13%", label: "Human flag rate — down from 31%" },
      { value: "40%", label: "Cost per session cut over 6 months" },
    ],
    lessons: [
      "Personalization earlier. Topic-sequencing by individual progress should have been month 2, not month 8.",
      "Community sooner. Learners wanted to discuss sessions — a simple thread per episode would have lifted retention for 14 months.",
      "Evals are pre-launch infrastructure. Shipping without systematic LLM evaluation cost us early retention. Never again.",
      "Voice quality was the real product. The voice-pipeline upgrade beat every feature shipped that quarter.",
    ],
  },
  {
    id: "erp-platform",
    num: "02",
    title: "B2B2C ERP + Learning Platform",
    tagline: "From Excel-and-WhatsApp chaos to a multi-tenant platform running 26+ engineering institutions.",
    category: "B2B2C SaaS · 0→1",
    role: "Founder & Product Manager",
    timeline: "2015 — 2023",
    stack: ["Multi-tenant SaaS", "ERP", "Learning Delivery", "Analytics", "API Integrations", "GTM"],
    heroMetrics: [
      { value: "26+", label: "Institutions onboarded" },
      { value: "42K+", label: "Users on platform" },
      { value: "8", label: "Cross-functional team led" },
      { value: "0→1", label: "To multi-campus rollout" },
    ],
    problem: {
      context:
        "Engineering institutions across Maharashtra ran admissions, attendance, fees, exams, and learning delivery on Excel sheets and WhatsApp groups. No single system of record, no analytics, and every process depended on one overworked clerk's memory.",
      painPoints: [
        "Administrators rebuilt the same student data in five disconnected spreadsheets — errors compounded every term.",
        "Faculty had no channel for structured learning delivery; students had no unified view of schedules, marks, or materials.",
        "Leadership flew blind: no institution-level analytics on attendance, fee collection, or academic outcomes.",
      ],
    },
    research: {
      approach:
        "On-ground discovery: campus visits across Maharashtra, shadowing clerks through daily workflows, structured interviews with directors, admin staff, faculty, and students — three very different users of one system.",
      findings: [
        "The buyer (director) and the daily user (clerk, faculty) had completely different success criteria — adoption, not features, was the real product.",
        "Institutions didn't want 'digital transformation'. They wanted fewer fires: fee reconciliation that closes, attendance that tallies, marksheets that don't bounce.",
        "Change capacity was the binding constraint — staff could absorb one new module at a time, not a big-bang platform switch.",
      ],
      quote: "Don't show me a dashboard. Show me that admission season won't break my staff this year.",
      quoteAttribution: "Institution director, discovery interview",
    },
    insights: [
      "In B2B2C, the user who never signed the cheque decides whether the product lives. Design for the clerk, sell to the director.",
      "Operational reliability is the wedge — analytics and learning delivery only matter after the boring workflows are bulletproof.",
      "Phased, champion-led rollout beats big-bang deployment in low-change-capacity organizations every time.",
    ],
    strategy: {
      summary:
        "Build a modular, multi-tenant platform that wins on operational reliability first, then expands into learning delivery and analytics — rolled out campus by campus through trained on-site champions.",
      requirements: [
        "Multi-tenant core: each institution isolated, centrally upgradable",
        "Module sequence: admissions → attendance → fees → exams → learning delivery → analytics",
        "Role-based views for director, admin, faculty, student, and parent",
        "On-ground champion training program per campus as part of onboarding",
        "Engagement analytics to drive data-informed iteration and churn reduction",
      ],
      prioritization: {
        name: "Adoption-weighted value vs. implementation cost",
        detail:
          "Features were scored on value to daily users × likelihood of actual adoption ÷ rollout cost. High-prestige features the buyer asked for (fancy dashboards) were deliberately sequenced after high-adoption workflow features the clerk needed — because churn follows the clerk, not the director.",
      },
      prdHighlights: [
        {
          label: "North-star metric",
          text: "Weekly active staff per campus — the leading indicator of renewal, two quarters out.",
        },
        {
          label: "Explicit non-goal",
          text: "No custom one-off builds per institution. Configuration over customization, or multi-tenancy dies.",
        },
        {
          label: "Rollout guardrail",
          text: "No new module ships to a campus until the previous module hits adoption thresholds with its staff.",
        },
      ],
    },
    execution: {
      summary:
        "Led a cross-functional team of 8 across engineering, design, content, and GTM through the full lifecycle: user research, PRDs, roadmap, MVP, pilot campuses, and multi-campus rollout with on-ground enablement.",
      architecture: [
        "Campus onboarding + tenant provisioning",
        "Core ERP modules — admissions, attendance, fees, exams",
        "Learning delivery layer — materials, schedules, assessments",
        "Role-based access — director / admin / faculty / student / parent",
        "Engagement + operations analytics",
        "API integrations — payments, SMS, government reporting",
      ],
      userJourney: [
        "Pilot — one campus, one module, success criteria agreed upfront",
        "Champion training — on-site power users own internal adoption",
        "Phased module rollout — next module unlocks on adoption thresholds",
        "Feedback cycles — monthly campus reviews feed the roadmap",
        "Renewal + expansion — adoption data makes the renewal case itself",
      ],
      decisions: [
        {
          decision: "B2B2C model over pure B2B licensing",
          tradeoff:
            "Heavier support load serving students and parents directly — but it made the platform sticky at every layer of the institution.",
        },
        {
          decision: "Phased per-campus rollout over big-bang deployment",
          tradeoff:
            "Slower revenue recognition and longer sales cycles. Worth it: adoption survived staff turnover and exam-season stress.",
        },
        {
          decision: "Sales-led GTM with on-ground enablement",
          tradeoff:
            "Didn't scale like product-led growth — but in this market, trust is built in the staff room, not in a free trial.",
        },
      ],
    },
    metrics: [
      { value: "26+", label: "Institutions onboarded and retained" },
      { value: "42,000+", label: "Students, faculty & staff on platform" },
      { value: "8", label: "Person cross-functional team led" },
      { value: "6", label: "Module categories shipped" },
      { value: "5", label: "User roles served per tenant" },
      { value: "8 yrs", label: "Operated and grown as founder" },
    ],
    lessons: [
      "The buyer and the user are different people with different definitions of success. Ship for both, in the right order.",
      "Service-heavy onboarding felt like a tax — it was actually the moat. Competitors who shipped software without enablement churned out.",
      "Data-informed iteration cycles reduced churn more than any single feature: campuses that saw their own adoption data renewed.",
      "Configuration over customization is an existential rule for multi-tenant SaaS, not a preference.",
    ],
  },
];

// ---------- AI Product Lab ----------

export const labItems = [
  {
    title: "AI Agents",
    status: "Shipped",
    desc: "Multi-agent orchestration with n8n + LLMs: retrieval, reasoning, and generation agents chained with zero manual handoffs.",
    tags: ["n8n", "Prompt Chaining", "Orchestration"],
  },
  {
    title: "RAG Systems",
    status: "Shipped",
    desc: "Enterprise knowledge assistant: vector embeddings, semantic search, hallucination tracking, and accuracy dashboards.",
    tags: ["Vector Embeddings", "Semantic Search", "Python"],
  },
  {
    title: "Prompt Engineering",
    status: "Shipped",
    desc: "Role-based prompting frameworks that simulate senior PM reasoning — powering the AI PRD generator used across product cycles.",
    tags: ["Role Prompting", "OpenAI", "Anthropic"],
  },
  {
    title: "Automation Systems",
    status: "Production",
    desc: "Content publishing and platform-operations pipelines for Listen2RE — 60% reduction in manual production effort.",
    tags: ["Pipelines", "n8n", "CDN"],
  },
  {
    title: "LLM Evaluations",
    status: "Production",
    desc: "LLM-as-a-Judge quality gates: 87% pass rate, human flag rate driven from 31% to 13%. Evals as pre-launch infrastructure.",
    tags: ["LLM-as-a-Judge", "Quality Gates", "Metrics"],
  },
  {
    title: "AI Workflows",
    status: "Shipped",
    desc: "Document analysis chains where each agent owns one reasoning step — automating work teams repeated hundreds of times weekly.",
    tags: ["Document AI", "Reasoning Chains"],
  },
  {
    title: "Voice AI",
    status: "Production",
    desc: "TTS pipeline producing audio-native learning sessions. The voice-quality upgrade outperformed every feature that quarter.",
    tags: ["TTS", "Audio UX", "Pacing"],
  },
  {
    title: "Product Experiments",
    status: "Ongoing",
    desc: "A/B-tested engagement loops: push timing, streaks, session length. Habit mechanics measured, not guessed.",
    tags: ["A/B Testing", "Mixpanel", "Retention"],
  },
];

// ---------- Execution dashboard ----------

export const dashboardSkills = [
  { name: "Product Strategy", level: 92, tier: "Expert" },
  { name: "Roadmapping", level: 90, tier: "Expert" },
  { name: "User Research", level: 88, tier: "Advanced" },
  { name: "Data Analysis", level: 84, tier: "Advanced" },
  { name: "AI Systems", level: 90, tier: "Expert" },
  { name: "Prompt Engineering", level: 93, tier: "Expert" },
  { name: "Stakeholder Management", level: 89, tier: "Advanced" },
  { name: "Growth", level: 85, tier: "Advanced" },
];

// ---------- PM Artifacts ----------

export const artifacts = [
  {
    title: "PRDs",
    desc: "Problem framing, north-star metrics, non-goals, guardrails, acceptance criteria — including LLM-feature PRDs with eval plans.",
    items: ["Listen2RE daily-session PRD", "RAG assistant PRD", "LLM eval guardrails"],
  },
  {
    title: "Roadmaps",
    desc: "Outcome-based quarterly roadmaps with explicit bet sizing and kill criteria, not feature wishlists.",
    items: ["Listen2RE habit-loop roadmap", "ERP module sequencing"],
  },
  {
    title: "Wireframes",
    desc: "Low-fi flows that settle arguments before engineering spends a sprint — mobile-first, state-complete.",
    items: ["Daily session player", "Campus admin console"],
  },
  {
    title: "Experiment Docs",
    desc: "Hypothesis, minimum detectable effect, guardrail metrics, and decision rules written before the test runs.",
    items: ["Push-timing A/B", "Voice quality uplift", "Streak mechanics"],
  },
  {
    title: "User Flows",
    desc: "End-to-end journey maps spanning roles — learner loops, clerk workflows, director review cycles.",
    items: ["Learner daily loop", "Multi-role campus flows"],
  },
  {
    title: "Metrics Frameworks",
    desc: "North-star trees connecting input metrics to outcomes, plus AI-specific quality metrics and eval dashboards.",
    items: ["Completion-rate tree", "LLM quality scorecard"],
  },
  {
    title: "Feature Prioritization",
    desc: "RICE with habit-impact weighting; adoption-weighted value vs. implementation cost for B2B2C.",
    items: ["RICE scoring sheets", "Adoption-cost matrices"],
  },
];

// ---------- Testimonials ----------
// NOTE: Replace these with real quotes (with permission) before sharing widely.
// Attributions are role-based placeholders pending sign-off from each person.

export const testimonials = [
  {
    quote:
      "Sujit owns the whole problem. He'd come back from campus visits with insights none of us saw in the data, turn them into a crisp PRD, and then actually sit with engineering until it shipped right.",
    role: "Engineering Lead",
    context: "Worked together at Zerton, 4 years",
  },
  {
    quote:
      "Most PMs talk about AI. Sujit ships it — with eval gates, quality metrics, and a straight answer about what the model can't do yet. That honesty is rare and it's why his products hold up.",
    role: "AI Engineer",
    context: "Collaborated on LLM pipeline design",
  },
  {
    quote:
      "He turned our messiest operational season into a system. The rollout plan respected how much change our staff could absorb — that's why it stuck where other software didn't.",
    role: "Institution Director",
    context: "ERP platform customer, 5+ years",
  },
  {
    quote:
      "As a founder he's the full package: talks to users, reads the metrics himself, makes the hard scope cuts, and keeps the team pointed at the outcome instead of the output.",
    role: "Startup Mentor",
    context: "Advisor since 2016",
  },
];

// ---------- Resume snapshot ----------

export const resumeSnapshot = {
  experience: [
    { role: "CEO & AI Product Lead", org: "Zerton Education Technologies", period: "2023 — Present" },
    { role: "Founder & Product Manager", org: "Zerton Engineering Services", period: "2015 — 2023" },
    { role: "Trusted Photographer (B2B)", org: "Google Street View", period: "2016 — 2020" },
  ],
  skills: [
    "Product Strategy",
    "0→1 Execution",
    "LLM & Agentic Systems",
    "RAG Architecture",
    "User Research",
    "Growth & GTM",
  ],
  projects: [
    "Listen2RE — AI audio learning, 35K+ learners",
    "B2B2C ERP — 26+ institutions, 42K+ users",
    "Enterprise RAG knowledge assistant",
    "AI-assisted PRD generator",
  ],
  achievements: [
    "77K+ users impacted across products",
    "60% content production effort cut with LLM pipeline",
    "8-person cross-functional team led",
    "Published engineering research at L&T",
  ],
};

export const navLinks = [
  { label: "Journey", id: "journey" },
  { label: "Framework", id: "framework" },
  { label: "Case Studies", id: "case-studies" },
  { label: "AI Lab", id: "lab" },
  { label: "Skills", id: "dashboard" },
  { label: "Contact", id: "contact" },
];

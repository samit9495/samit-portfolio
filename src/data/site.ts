export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  description: string;
  stack: string[];
  outcome: string;
  link?: string;
  linkLabel?: string;
  /** [accent, glow] hex colors that drive the shader background for this chapter */
  accent: string;
  glow: string;
  /** shader "mood" 0..6, switches the generative pattern */
  mood: number;
  vibe: string[];
};

export const identity = {
  name: "Samit Pawar",
  role: "AI Engineer",
  roleLong: "AI Engineer · Senior Python Developer · 8+ yrs",
  tagline:
    "I architect the AI-native engineering systems that ship 35+ production features a month — at HIPAA-grade rigor, not demo quality.",
  bio: "I'm an AI Engineer and Senior Python Developer with 8+ years building production systems — the last 2 spent redesigning how I ship code around LLM agents, RAG, and the Model Context Protocol. By day, I lead the AI-native engineering platform behind Trulla, a 340B healthcare-compliance SaaS serving 30+ enterprise clients, shipping 35+ features a month at \u226595% test coverage. By night, I build autonomous AI pipelines, observability platforms, and a production e-commerce store solo — proof the ideas work end to end, not just in a demo.",
  location: "Noida, Uttar Pradesh, India",
  email: "samit.pawar7711@gmail.com",
  github: "https://github.com/samit9495",
  linkedin: "https://linkedin.com/in/samitpanwar",
  resume: "/Samit_Pawar_Resume_v3.md",
};

export const stats = [
  { value: "8+", label: "Years shipping production systems" },
  { value: "35+", label: "Features / month at \u226595% coverage" },
  { value: "30+", label: "Enterprise tenants served" },
  { value: "8", label: "MCP servers wired into agents" },
];

export const projects: Project[] = [
  {
    id: "gitaflow",
    index: "01",
    title: "GitaFlow",
    subtitle: "Autonomous AI Content Generation Engine",
    role: "Sole creator, architect, end-to-end build",
    year: "2025 — Present",
    description:
      "An autonomous pipeline that turns each of the 701 Bhagavad Gita verses into a narrated, captioned video — RAG-grounded scripts, locally-run voice-clone narration, local diffusion scene art, and local Whisper captions, orchestrated through a 7-stage agent pipeline on a swappable multi-LLM layer.",
    stack: ["Python", "SQLAlchemy", "Alembic", "Gemini/Claude/GPT", "LlamaIndex", "ChromaDB", "faster-whisper", "Diffusion", "Streamlit", "APScheduler"],
    outcome: "144 commits driven test-first; zero repetitive output across hundreds of generated videos via dedup-store logic.",
    accent: "#F5A623",
    glow: "#FF7A1A",
    mood: 0,
    vibe: ["spiritual", "cinematic", "saffron/gold", "sacred-geometry", "warm-glow"],
  },
  {
    id: "trulla",
    index: "02",
    title: "Trulla",
    subtitle: "AI-Native Engineering Platform",
    role: "Lead engineer & architect of the AI-native workflow",
    year: "Nov 2021 — Present",
    description:
      "A multi-tenant pharmaceutical supply-chain SaaS for the U.S. 340B drug-pricing compliance program serving 30+ enterprise clients, plus the in-house agentic engineering platform — 12 AI rules, 14 agent skills, 8 MCP servers, and an LLM Council — built on top of it.",
    stack: ["Django 6", "DRF", "PostgreSQL", "Celery", "Redis", "AWS Lambda", "ECS Fargate", "CloudFormation", "MCP", "LangChain", "LangGraph"],
    outcome: "35+ production tickets/month at \u226595% pytest coverage across 30+ tenants; zero high-risk architectural failures in 12 months.",
    linkLabel: "Private enterprise platform",
    accent: "#4F9DFF",
    glow: "#1E6BFF",
    mood: 1,
    vibe: ["clinical", "enterprise", "healthcare-blue", "schematic", "regulated"],
  },
  {
    id: "llm-council",
    index: "03",
    title: "LLM Council",
    subtitle: "Multi-Agent Decision System",
    role: "Designer & implementer (Karpathy methodology)",
    year: "2024 — Present",
    description:
      "A 5-advisor multi-agent decision pipeline — independent analysis, anonymous peer review, then synthesis — used for high-stakes architecture, migration-safety, and refactor-scope calls on a regulated production codebase.",
    stack: ["Claude (Anthropic)", "GPT (OpenAI)", "LangGraph", "MCP-aware context injection"],
    outcome: "Zero high-risk architectural failures in 12 months of high-stakes calls.",
    accent: "#9B6BFF",
    glow: "#6A2BFF",
    mood: 2,
    vibe: ["council-chamber", "neural-network", "deliberative", "glowing-nodes", "multi-agent-orbit"],
  },
  {
    id: "agentic-sre",
    index: "04",
    title: "Agentic SRE",
    subtitle: "Observability Platform",
    role: "Solo builder, end-to-end",
    year: "2025 — Present",
    description:
      "An end-to-end agentic AI observability platform built from a blank repo — anomaly detection, incident correlation, a 4-agent Gemini triage pipeline grounded by RAG over runbooks, and a React analytics dashboard.",
    stack: ["Python", "FastAPI", "SQLAlchemy 2.x", "Pydantic v2", "Google Gemini", "RAG", "React 18", "Vite", "TypeScript", "Docker", "GitHub Actions"],
    outcome: "98.75% test coverage across 246 tests; review score raised to 9/10 after closing 8 findings test-first.",
    accent: "#2DE2A6",
    glow: "#FF4D4D",
    mood: 3,
    vibe: ["dashboard", "dark-terminal", "signal-vs-noise", "pulse-lines", "alert-accent"],
  },
  {
    id: "hr-comp",
    index: "05",
    title: "HR Comp Analytics",
    subtitle: "Compensation Intelligence Platform",
    role: "Solo builder, end-to-end",
    year: "2025 — Present",
    description:
      "A compensation-analytics tool for a simulated 10,000-employee org, computing compa-ratio, range penetration, and percentile pay outliers via SQL window functions, with a React/TanStack dashboard.",
    stack: ["FastAPI", "SQLAlchemy 2.x", "Pydantic v2", "SQLite", "React 19", "TanStack Query/Table", "Recharts", "Tailwind", "shadcn/ui", "Fly.io", "Vercel"],
    outcome: "99% test coverage across 69 tests; 10,000 records seeded in 0.09s.",
    accent: "#2BD4CF",
    glow: "#0FA3A0",
    mood: 4,
    vibe: ["data-viz", "clean-charts", "corporate-modern", "teal", "analytical"],
  },
  {
    id: "label-by-mahi",
    index: "06",
    title: "Label by Mahi",
    subtitle: "Production E-Commerce Platform",
    role: "Sole designer, builder, and operator",
    year: "Live in production",
    description:
      "A live e-commerce platform — catalog, cart, checkout, custom coupon engine, wishlist — with real Razorpay payments, personally deployed and operated on AWS EC2 and Oracle Cloud.",
    stack: ["Django 5", "PostgreSQL", "django-allauth", "HTMX", "Razorpay", "Nginx", "Gunicorn", "systemd", "Certbot", "AWS EC2", "Oracle Cloud"],
    outcome: "Live production store processing real payments across 7 Django apps, solo-operated end to end.",
    accent: "#FF8FA3",
    glow: "#E8527A",
    mood: 5,
    vibe: ["retail", "warm", "product", "commerce", "lifestyle-brand"],
  },
  {
    id: "fraud",
    index: "07",
    title: "Fraud Detection",
    subtitle: "AI Biometric Verification",
    role: "Engineer (at Nagarro)",
    year: "2022 — 2023",
    description:
      "A facial-recognition and behavioral-analytics fraud-detection module integrated into Trulla for identity verification during transaction onboarding.",
    stack: ["Python", "OpenCV", "Machine Learning", "AWS Lambda", "PostgreSQL"],
    outcome: "30% improvement in fraud-detection rate; $500K annual reduction in losses.",
    linkLabel: "Private enterprise platform",
    accent: "#7DF9FF",
    glow: "#2A9DAE",
    mood: 6,
    vibe: ["security", "biometric-scan-lines", "facial-mesh", "vigilant"],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: "AI / LLM", items: ["LLMs (Claude · GPT-5 · Gemini)", "LangChain", "LangGraph", "LlamaIndex", "ChromaDB", "Agentic AI", "Prompt / Context Engineering", "RAG", "MCP", "Multi-Agent Systems"] },
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"] },
  { label: "Backend", items: ["Django 6", "DRF", "Flask", "FastAPI", "SQLAlchemy", "Pydantic"] },
  { label: "Frontend", items: ["React 18/19", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query/Table", "Recharts", "HTMX", "Streamlit"] },
  { label: "Databases", items: ["PostgreSQL (schema-per-tenant)", "MySQL", "SQLite", "Redis", "Elasticsearch", "Firebase", "Alembic"] },
  { label: "Cloud / DevOps", items: ["AWS (Lambda · ECS · CFN · CloudWatch · SQS/SNS · EventBridge)", "Azure", "Oracle Cloud", "Fly.io", "Vercel", "Docker", "CI/CD", "Nginx/Gunicorn"] },
  { label: "Testing / Quality", items: ["pytest", "TDD (\u226595% coverage)", "Selenium", "Ruff", "Black", "Mypy", "pip-audit"] },
  { label: "Domain", items: ["Healthcare / 340B", "HL7", "EDI 810/832/856", "HIPAA-aware", "Fintech", "E-commerce"] },
];

export const experience = [
  { company: "Nagarro", title: "Senior AI Engineer", dates: "Apr 2023 — Present", summary: "Architected the AI-native engineering workflow shipping 35+ features/month on a regulated healthcare SaaS." },
  { company: "Nagarro", title: "Senior Python Developer", dates: "Nov 2021 — Mar 2023", summary: "Backend / data engineering: ETL pipelines, multi-tenancy, fraud detection." },
  { company: "Skill-Up Technologies", title: "Python Developer", dates: "May 2019 — Nov 2021", summary: "eLearning chatbots, NLP, Microsoft Graph integrations." },
  { company: "Zingmobile", title: "Python Developer", dates: "Sep 2018 — May 2019", summary: "Elasticsearch optimization, web scraping at scale." },
  { company: "AppAmplify", title: "Python Developer", dates: "Jul 2017 — Sep 2018", summary: "Batch automation, ad-tech tooling." },
];

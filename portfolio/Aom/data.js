// Portfolio Data Store - All editable text & content for the website

export const profileData = {
  name: "Phanuwat Audkanthar",
  title: "Junior Dev | Backend Developer & Frontend Developer",
  avatar: "./IMG_0163.heic", // Profile image path or URL
  handle: "Road to Full-Stack!!",
  idCode: "29-03-2006",
  status: "AVAILABLE FOR HIRE",
  bio: "Architecting high-performance web applications, distributed systems, and real-time interactive interfaces with cyber-linear precision.",
  location: "Uttaradit, Thailand / Remote",
  coreStackText: "CORE: React, TypeScript, Next.js, Supabase, Tailwind",
  securityVerifiedText: "SECURITY VERIFIED",
  
  // Hero Section Stats
  stats: {
    experienceYears: { value: "1+", label: "Years Experience" },
    projectsCompleted: { value: "10+", label: "Projects Shipped" },
    codeCommits: { value: "100k", label: "Git Commits" }
  },

  // Social Links & Contact Details
  socials: {
    github: "https://github.com/Aommykung1250-X7",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "phanuwataom1250@gmail.com"
  }
};

// Section Headings & General Site Text
export const siteTextData = {
  hero: {
    subtitle: "// CYBERNETIC DEVELOPER PROFILE",
    titleMain: "Engineering High-Performance",
    titleGradient: "Web Systems",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "Download Resume"
  },
  showcase: {
    tag: "PORTFOLIO SHOWCASE",
    titleMain: "Architectural Engineering &",
    titleGradient: "Shipped Systems",
    description: "Explore full-stack platforms, high-performance web applications, and real-time interactive tools."
  },
  contact: {
    tag: "START A CONVERSATION",
    titleMain: "Let's Build Something",
    titleGradient: "Exceptional",
    description: "Have an upcoming project, engineering opportunity, or architectural inquiry? Drop a message below.",
    directSignalsTitle: "Direct Signals",
    directSignalsDesc: "Whether you need a full-stack developer for a production launch or architectural guidance on web applications, my inbox is open.",
    responseTime: "< 24 Hours Guaranteed"
  },
  footer: {
    tagline: "CYBER-LINEAR DESIGN SYSTEM #131313 / #00FFC2",
    copyright: "© 2026 Phanuwat Audkanthar. All rights reserved."
  }
};

// Resume Modal Content
export const resumeData = {
  title: "Phanuwat Audkanthar Resume Spec",
  badge: "VERIFIED CERTIFIED DEVELOPER SPECIFICATION",
  summary: "Junior Full-Stack Developer passionate about engineering clean, responsive React/Next.js frontends, scalable Node.js/Python backends, and high-quality web applications.",
  
  experience: [
    {
      role: "Junior Full-Stack Developer",
      company: "Freelance & Open Source Projects",
      period: "2024 - Present",
      description: "Developing modern web apps, REST APIs, and responsive interfaces using React, Next.js, and Node.js."
    },
    {
      role: "Backend & Frontend Engineer Learner",
      company: "Self-Driven Engineering Projects",
      period: "2023 - 2024",
      description: "Built database-backed web applications, state management workflows, and custom glassmorphic UI systems."
    }
  ],

  education: {
    degree: "Computer Science / Software Engineering Student",
    institution: "Uttaradit, Thailand"
  }
};

// Tech Stack Data
export const techStackData = [
  { id: "react", name: "React.js", category: "Frontend", level: "Excellent", icon: "atom", desc: "Hooks, Fiber architecture, Concurrent mode, state management" },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: "Excellent", icon: "layers", desc: "App Router, SSR, Server Components, Edge runtime" },
  { id: "typescript", name: "TypeScript", category: "Frontend", level: "Good", icon: "code", desc: "Strict typing, generics, AST transformations, utility types" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: "Excellent", icon: "palette", desc: "Design tokens, custom plugins, responsive layouts, JIT" },
  { id: "nodejs", name: "Node.js", category: "Backend", level: "Good", icon: "server", desc: "Event loop optimization, REST/gRPC APIs, microservices" },
  { id: "python", name: "Python / FastAPI", category: "Backend", level: "Good", icon: "terminal", desc: "Async IO, Pydantic, ML inference endpoints, data pipelines" },
  { id: "supabase", name: "Supabase / Postgres", category: "Database", level: "Good", icon: "database", desc: "Row Level Security, realtime subscriptions, vector search" },
  { id: "docker", name: "Docker & K8s", category: "DevOps", level: "Practicing", icon: "box", desc: "Multi-stage builds, container orchestration, CI/CD pipelines" },
  { id: "graphql", name: "GraphQL", category: "Backend", level: "Practicing", icon: "share-2", desc: "Schema stitching, Apollo Server, query optimization" },
  { id: "webgl", name: "Three.js / WebGL", category: "Graphics", level: "Practicing", icon: "cpu", desc: "3D shaders, particle systems, interactive canvas rendering" }
];

// Project Showcase Data
export const projectsData = [
  {
    id: "proj-1",
    title: "AuraOS - Cybernetic Cloud Dashboard",
    category: "Full Stack",
    featured: true,
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Recharts"],
    summary: "Real-time infrastructure monitoring console with interactive node telemetry, AI anomaly detection, and glassmorphic UI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#00ffc2",
    metrics: { uptime: "99.99%", latency: "<12ms", users: "14.2k" },
    demoUrl: "https://example.com/auraos",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "AuraOS provides enterprise cloud engineering teams with live visualization of multi-region kubernetes clusters, serverless metrics, and real-time security threats with high-contrast neon visual feedback."
  },
  {
    id: "proj-2",
    title: "NeuroFlux AI - Vector Search Engine",
    category: "AI & Data",
    featured: true,
    tags: ["Python", "FastAPI", "React.js", "PostgreSQL", "Tailwind"],
    summary: "Ultra-fast neural search platform parsing unstructured documentation with sub-50ms hybrid vector retrieval.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#00e5ff",
    metrics: { queryTime: "34ms", accuracy: "98.4%", indexing: "1M docs/hr" },
    demoUrl: "https://example.com/neuroflux",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "Built to handle massive technical documentation repositories, NeuroFlux converts multi-format files into high-dimensional vector embeddings with interactive graph exploration."
  },
  {
    id: "proj-3",
    title: "Synthetix - Web3 Realtime Exchange",
    category: "Full Stack",
    featured: true,
    tags: ["React.js", "TypeScript", "Node.js", "GraphQL", "WebSockets"],
    summary: "High-frequency decentralized asset trading portal with live order books, candlestick charts, and custom WebGL particles.",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#7928ca",
    metrics: { tps: "50,000", volume: "$1.2B", markets: "120+" },
    demoUrl: "https://example.com/synthetix",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "Engineered with low-latency WebSocket data streams and optimized WebGL rendering to display 60fps market fluctuations without UI stutter."
  },
  {
    id: "proj-4",
    title: "KubePulse - Container Telemetry",
    category: "DevOps",
    featured: false,
    tags: ["Go", "Docker", "TypeScript", "Tailwind"],
    summary: "Lightweight container performance inspector with zero-overhead eBPF probes and instant terminal exports.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#00ffc2",
    metrics: { overhead: "<0.1%", binarySize: "8.4MB", stars: "2.8k" },
    demoUrl: "https://example.com/kubepulse",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "Monitors memory leaks, thread locks, and IO bottlenecks across Kubernetes pod instances with zero agent overhead."
  },
  {
    id: "proj-5",
    title: "Nexus Code Studio - Browser IDE",
    category: "Frontend",
    featured: false,
    tags: ["React.js", "Monaco Editor", "WebAssembly", "TypeScript"],
    summary: "Browser-native code execution environment with real-time collaborative editing, LSP support, and terminal runner.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#ff007a",
    metrics: { bootTime: "400ms", languages: "14", activeDevs: "8.5k" },
    demoUrl: "https://example.com/nexus-ide",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "Runs sandboxed WebAssembly compilers in web workers, enabling offline compilation of C++, Rust, and TypeScript directly inside the client browser."
  }
];

// Certificates Data
export const certificatesData = [
  {
    id: "cert-1",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "2025",
    code: "AWS-PSA-993821",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeIcon: "award",
    skills: ["Cloud Architecture", "Distributed Systems", "Security", "Cost Optimization"]
  },
  {
    id: "cert-2",
    title: "CKAD: Certified Kubernetes Application Developer",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    date: "2024",
    code: "LF-CKAD-77412",
    verifyUrl: "https://cncf.io/verify",
    badgeIcon: "box",
    skills: ["Container Security", "Helm Charts", "Ingress Controllers", "StatefulSets"]
  },
  {
    id: "cert-3",
    title: "Meta Certified Senior Front-End Developer",
    issuer: "Meta Credentials",
    date: "2024",
    code: "META-FRONTEND-4491",
    verifyUrl: "https://coursera.org/verify",
    badgeIcon: "code-2",
    skills: ["React Deep Dive", "Advanced JS", "Web Performance", "Accessibility"]
  }
];

// Portfolio Data Store - All editable text & content for the website

export const profileData = {
  name: "Phanuwat Audkanthar",
  title: "Junior Dev | Backend Developer & Frontend Developer",
  avatar: "assets/profile.JPG",
  handle: "Road to Full-Stack!!",
  idCode: "Aommykung-X7",
  status: "AVAILABLE FOR HIRE",
  bio: "Architecting high-performance web applications, backend APIs, and real-time interactive interfaces with cyber-linear precision.",
  location: "Uttaradit, Thailand / Remote",
  coreStackText: "CORE: React, Next.js, Tailwind, HTML, CSS, JavaScript, Spring Boot, Docker",

  // Hero Section Stats
  stats: {
    experienceYears: { value: "Student", label: "Developer Status" },
    projectsCompleted: { value: "3+", label: "Featured Projects" },
    codeCommits: { value: "500+", label: "Git Commits" }
  },

  // Social Links & Contact Details
  socials: {
    github: "https://github.com/Aommykung1250-X7",
    instagram: "https://www.instagram.com/saimon_.am/",
    facebook: "https://www.facebook.com/AoMYKuNgG/",
    email: "phanuwataom1250@gmail.com"
  }
};

// Section Headings & General Site Text
export const siteTextData = {
  hero: {
    subtitle: "// PHANUWAT AUDKANTHAR PROFILE",
    titleMain: "Junior Developer & Full-Stack",
    titleGradient: "Frontend & Backend",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "Download Resume"
  },
  showcase: {
    tag: "PORTFOLIO SHOWCASE",
    titleMain: "Web Applications &",
    titleGradient: "Verified Credentials",
    description: "สำรวจผลงาน และใบประกาศนียบัตรรับรองทักษะ"
  },
  contact: {
    tag: "START A CONVERSATION",
    titleMain: "Let's Build Something",
    titleGradient: "Exceptional",
    description: "หากมีข้อซักถาม โอกาสในการร่วมงาน หรือสนใจร่วมพัฒนาโปรเจกต์ สามารถติดต่อผ่านช่องทางด้านล่างได้ทันทีครับ",
    directSignalsTitle: "Direct Signals",
    directSignalsDesc: "พร้อมรับโอกาสในการเรียนรู้และร่วมทีมพัฒนา Web Application, Backend APIs และระบบซอฟต์แวร์ต่างๆ ทักมาพูดคุยกันได้เลยครับ",
    responseTime: "< 24 Hours Guaranteed"
  },
  footer: {
    tagline: "PHANUWAT AUDKANTHAR PORTFOLIO",
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
  { id: "react", name: "React.js", category: "Frontend", level: "Good", icon: "atom" },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: "Good", icon: "layers" },
  { id: "html", name: "HTML", category: "Frontend", level: "Excellent", icon: "code" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: "Excellent", icon: "palette" },
  { id: "nodejs", name: "Node.js", category: "Backend", level: "Excellent", icon: "server" },
  { id: "python", name: "FastAPI", category: "Backend", level: "Excellent", icon: "terminal" },
  { id: "supabase", name: "Supabase / Postgres", category: "Database", level: "Excellent", icon: "database" },
  { id: "docker", name: "Docker & K8s", category: "DevOps", level: "Good", icon: "box" },
  { id: "springboot", name: "Spring Boot", category: "Backend", level: "Good", icon: "share-2" },
  { id: "kotlin", name: "Kotlin", category: "mobile", level: "Practicing", icon: "cpu" }
];

// Project Showcase Data
export const projectsData = [
  {
    id: "proj-1",
    title: "Web Application Competition",
    category: "Web Application",
    featured: true,
    tags: ["HTML", "CSS", "PHP", "JS", "MySQL"],
    summary: "รางวัลเหรียญทอง การแข่งขันสร้าง Web Application งานศิลปหัตถกรรมนักเรียนระดับเขตพื้นที่การศึกษา",
    image: "assets/pic/webapp.JPG",
    images: [
      "assets/pic/webapp.JPG"
    ],
    accentColor: "#00ffc2",
    metrics: { Award: "Gold Medal", Scope: "District", Stack: "PHP / JS" },
    demoUrl: "#",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "ระบบเว็บแอปพลิเคชันที่ได้รับการพัฒนาขึ้นเพื่อเข้าร่วมการแข่งขันงานศิลปหัตถกรรมนักเรียน รังสรรค์ด้วย HTML5, CSS3, PHP และ JavaScript โดยมุ่งเน้นการออกแบบระบบใช้งานง่าย รองรับการจัดการข้อมูลหลังบ้านและการเชื่อมต่อฐานข้อมูลอย่างมีประสิทธิภาพ จนได้รับรางวัลเหรียญทองระดับเขตพื้นที่การศึกษา"
  },
  {
    id: "proj-2",
    title: "Nan-Ngai (น่านไง - CCTV Detection)",
    category: "AI & Web System",
    featured: true,
    tags: ["Next.js", "Tailwind CSS", "React.js", "FastAPI", "Prisma", "YOLOv11"],
    summary: "ระบบเฝ้าระวังและตรวจจับวัตถุจากกล้อง CCTV อัจฉริยะด้วยโมเดล AI YOLOv11 เชื่อมต่อเว็บแอปพลิเคชันแบบเรียลไทม์",
    image: "assets/pic/nan1.JPG",
    images: [
      "assets/pic/nan1.JPG",
      "assets/pic/nan2.JPG",
      "assets/pic/nan3.png"
    ],
    accentColor: "#00e5ff",
    metrics: { Model: "YOLOv11", Response: "Real-time", Architecture: "Microservices" },
    demoUrl: "#",
    repoUrl: "https://github.com/PreturnPRO/Nan-Ngai-CCTV",
    details: "แพลตฟอร์มระบบกล้องตรวจจับอัจฉริยะ Nan-Ngai (น่านไง) ที่ผสานพลังคอมพิวเตอร์วิทัศน์ (Computer Vision) ด้วย YOLOv11 ร่วมกับ Backend API ประสิทธิภาพสูงบน FastAPI และ Frontend ล้ำสมัยด้วย Next.js, Tailwind CSS และ Prisma ORM ช่วยในการวิเคราะห์ คัดแยกวัตถุ และแจ้งเตือนเหตุการณ์จากกล้องวงจรปิดแบบเรียลไทม์"
  },
  {
    id: "proj-3",
    title: "DITC | Smart Kiosk System",
    category: "Web Application & Server",
    featured: true,
    tags: ["React.js", "Tailwind CSS", "Docker", "PostgreSQL", "WebSockets", "JavaScript"],
    summary: "ระบบบริหารจัดการตู้คีออสก์อัจฉริยะ สื่อสารผ่าน WebSockets และควบคุมเซิร์ฟเวอร์ด้วย Docker",
    image: "assets/pic/kiosk3.png",
    images: [
      "assets/pic/kiosk3.png",
      "assets/pic/kiosk2.png",
      "assets/pic/kiosk1.png"
    ],
    accentColor: "#7928ca",
    metrics: { System: "Smart Kiosk", Protocol: "WebSockets", Deployment: "Docker" },
    demoUrl: "#",
    repoUrl: "https://github.com/Aommykung1250-X7",
    details: "ระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการตู้คีออสก์อัจฉริยะ (DITC Smart Kiosk) รองรับการโต้ตอบกับผู้ใช้งานอย่างรวดเร็วด้วย React.js และ Tailwind CSS ทำงานร่วมกับระบบ WebSockets เพื่อส่งข้อมูลเรียลไทม์ไปยังเซิร์ฟเวอร์ที่คอนเทนเนอไรซ์ด้วย Docker และจัดเก็บข้อมูลอย่างปลอดภัยบน PostgreSQL"
  }
];

// Certificates Data
export const certificatesData = [
  {
    id: "cert-1",
    title: "Cyber Top Talent (Senior)",
    issuer: "NCSA (สกมช. - สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ)",
    date: "2025",
    code: "CYBER-TOP-2025",
    verifyUrl: "assets/pic/cert1.jpg",
    image: "assets/pic/cert1.jpg",
    badgeIcon: "award",
    skills: ["Cyber Security", "Network Defense", "Threat Analysis", "Incident Response"],
    description: "ใบประกาศนียบัตรเข้าร่วมและผ่านการทดสอบการแข่งขัน Cyber Top Talent ประจำปี 2025 ในระดับ Senior แสดงถึงความรู้ความเชี่ยวชาญด้าน Cyber Security การวิเคราะห์ช่องโหว่ และการป้องกันระบบสารสนเทศจากภัยคุกคามไซเบอร์"
  },
  {
    id: "cert-2",
    title: "AI Prompt Mini Hackathon 2024",
    issuer: "SPU | SRIPATUM UNIVERSITY",
    date: "2024",
    code: "AI-PROMPT-2024",
    verifyUrl: "assets/pic/cert2.PNG",
    image: "assets/pic/cert2.PNG",
    badgeIcon: "box",
    skills: ["Prompt Engineering", "Generative AI", "LLM Optimization", "Creative Problem Solving"],
    description: "ใบประกาศนียบัตรเข้าร่วมการแข่งขัน AI Prompt Mini Hackathon 2024 แสดงถึงทักษะการออกแบบและประยุกต์ใช้ Prompt Engineering ร่วมกับเทคโนโลยี Generative AI เพื่อแก้โจทย์ปัญหาเชิงสร้างสรรค์ได้อย่างมีประสิทธิภาพ"
  }
];

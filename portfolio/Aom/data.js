/* ============================================================================
   PORTFOLIO CONTENT STORE  —  v3 "Depth Canvas"
   ----------------------------------------------------------------------------
   แก้เนื้อหาผลงาน / ใบประกาศ / ทักษะ ที่ไฟล์นี้ไฟล์เดียว
   (ชื่อ ประวัติ ที่อยู่ อยู่ใน index-v3.html ตรงๆ ค้นหาคำแล้วแก้ได้เลย)

   เป็นสคริปต์ธรรมดา ไม่ใช่ ES module — ดับเบิลคลิกเปิดไฟล์ดูได้เลย
   ไม่ต้องรันเซิร์ฟเวอร์
   ========================================================================== */

window.PORTFOLIO = {

  /* ── โปรไฟล์ ──────────────────────────────────────────────────────────── */
  profile: {
    firstName: "PHANUWAT",
    lastName: "AUDKANTHAR",
    nickname: "Aom",
    handle: "Road to Full-Stack!!",
    idCode: "AOMMYKUNG-X7",
    role: "Junior Dev · Backend & Frontend Developer",
    status: "AVAILABLE FOR HIRE",
    location: "Uttaradit, Thailand / Remote",
    education: "Chiang Mai University · DII",
    avatar: "assets/profile.JPG",
    email: "phanuwataom1250@gmail.com",
    socials: {
      github: "https://github.com/Aommykung1250-X7",
      instagram: "https://www.instagram.com/saimon_.am/",
      facebook: "https://www.facebook.com/AoMYKuNgG/"
    }
  },

  /* ── ตัวเลขหน้าแรก ─────────────────────────────────────────────────────── */
  stats: [
    { value: "3",   suffix: "+", label: "Featured Projects", note: "shipped" },
    { value: "500", suffix: "+", label: "Git Commits",       note: "and counting" },
    { value: "2",   suffix: "",  label: "Competition Awards", note: "gold · national" }
  ],

  /* ── แถบวิ่ง (marquee) ─────────────────────────────────────────────────── */
  ticker: [
    "REACT", "NEXT.JS", "SPRING BOOT", "FASTAPI", "DOCKER",
    "POSTGRESQL", "TAILWIND", "WEBSOCKETS", "YOLOv11", "KOTLIN"
  ],

  /* ── ผลงาน ─────────────────────────────────────────────────────────────
     เพิ่มโปรเจกต์ = ก๊อปบล็อก { ... } ทั้งก้อนแล้วแก้
     images ใส่กี่รูปก็ได้ ถ้ามากกว่า 1 ปุ่มเลื่อนรูปจะโผล่มาเอง        */
  projects: [
    {
      id: "proj-nanngai",
      index: "01",
      title: "Nan-Ngai — CCTV Detection",
      titleTh: "น่านไง",
      category: "AI & WEB SYSTEM",
      year: "2025",
      summary: "ระบบเฝ้าระวังและตรวจจับวัตถุจากกล้อง CCTV ด้วยโมเดล YOLOv11 เชื่อมต่อเว็บแอปพลิเคชันแบบเรียลไทม์",
      details: "แพลตฟอร์มกล้องตรวจจับอัจฉริยะที่ผสานคอมพิวเตอร์วิทัศน์ (Computer Vision) ด้วย YOLOv11 เข้ากับ Backend API บน FastAPI และ Frontend ด้วย Next.js, Tailwind CSS และ Prisma ORM — วิเคราะห์ คัดแยกวัตถุ และแจ้งเตือนเหตุการณ์จากกล้องวงจรปิดแบบเรียลไทม์",
      tags: ["Next.js", "React.js", "Tailwind CSS", "FastAPI", "Prisma", "YOLOv11"],
      metrics: [
        { k: "Model",        v: "YOLOv11" },
        { k: "Response",     v: "Real-time" },
        { k: "Architecture", v: "Microservices" }
      ],
      image: "assets/pic/nan1.JPG",
      images: ["assets/pic/nan1.JPG", "assets/pic/nan2.JPG", "assets/pic/nan3.png"],
      repoUrl: "https://github.com/PreturnPRO/Nan-Ngai-CCTV",
      demoUrl: ""
    },
    {
      id: "proj-kiosk",
      index: "02",
      title: "DITC — Smart Kiosk System",
      titleTh: "",
      category: "WEB APP & SERVER",
      year: "2025",
      summary: "ระบบบริหารจัดการตู้คีออสก์อัจฉริยะ สื่อสารผ่าน WebSockets และควบคุมเซิร์ฟเวอร์ด้วย Docker",
      details: "เว็บแอปพลิเคชันสำหรับบริหารจัดการตู้คีออสก์อัจฉริยะ (DITC Smart Kiosk) โต้ตอบกับผู้ใช้งานด้วย React.js และ Tailwind CSS ทำงานร่วมกับ WebSockets เพื่อส่งข้อมูลเรียลไทม์ไปยังเซิร์ฟเวอร์ที่คอนเทนเนอไรซ์ด้วย Docker และจัดเก็บข้อมูลบน PostgreSQL",
      tags: ["React.js", "Tailwind CSS", "Docker", "PostgreSQL", "WebSockets", "JavaScript"],
      metrics: [
        { k: "System",     v: "Smart Kiosk" },
        { k: "Protocol",   v: "WebSockets" },
        { k: "Deployment", v: "Docker" }
      ],
      image: "assets/pic/kiosk3.png",
      images: ["assets/pic/kiosk3.png", "assets/pic/kiosk2.png", "assets/pic/kiosk1.png"],
      repoUrl: "https://github.com/Aommykung1250-X7",
      demoUrl: ""
    },
    {
      id: "proj-webapp",
      index: "03",
      title: "Web Application Competition",
      titleTh: "",
      category: "WEB APPLICATION",
      year: "2024",
      award: "GOLD MEDAL",
      summary: "รางวัลเหรียญทอง การแข่งขันสร้าง Web Application งานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา",
      details: "ระบบเว็บแอปพลิเคชันที่พัฒนาขึ้นเพื่อเข้าร่วมการแข่งขันงานศิลปหัตถกรรมนักเรียน สร้างด้วย HTML5, CSS3, PHP และ JavaScript เน้นการออกแบบระบบที่ใช้งานง่าย รองรับการจัดการข้อมูลหลังบ้านและการเชื่อมต่อฐานข้อมูลอย่างมีประสิทธิภาพ จนได้รับรางวัลเหรียญทองระดับเขตพื้นที่การศึกษา",
      tags: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
      metrics: [
        { k: "Award", v: "Gold Medal" },
        { k: "Scope", v: "District" },
        { k: "Stack", v: "PHP / JS" }
      ],
      image: "assets/pic/webapp.JPG",
      images: ["assets/pic/webapp.JPG"],
      repoUrl: "https://github.com/Aommykung1250-X7",
      demoUrl: ""
    }
  ],

  /* ── ใบประกาศ ─────────────────────────────────────────────────────────── */
  certificates: [
    {
      id: "cert-cyber",
      index: "01",
      title: "Cyber Top Talent (Senior)",
      issuer: "NCSA · สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ",
      issuerShort: "NCSA (สกมช.)",
      year: "2025",
      code: "CYBER-TOP-2025",
      description: "ใบประกาศนียบัตรเข้าร่วมและผ่านการทดสอบการแข่งขัน Cyber Top Talent ประจำปี 2025 ระดับ Senior แสดงถึงความรู้ด้าน Cyber Security การวิเคราะห์ช่องโหว่ และการป้องกันระบบสารสนเทศจากภัยคุกคามไซเบอร์",
      skills: ["Cyber Security", "Network Defense", "Threat Analysis", "Incident Response"],
      image: "assets/pic/cert1.jpg",
      images: ["assets/pic/cert1.jpg", "assets/pic/cyber1.JPG", "assets/pic/cyber2.JPG"]
    },
    {
      id: "cert-aiprompt",
      index: "02",
      title: "AI Prompt Mini Hackathon 2024",
      issuer: "SPU · Sripatum University",
      issuerShort: "Sripatum University",
      year: "2024",
      code: "AI-PROMPT-2024",
      description: "ใบประกาศนียบัตรเข้าร่วมการแข่งขัน AI Prompt Mini Hackathon 2024 แสดงถึงทักษะการออกแบบและประยุกต์ใช้ Prompt Engineering ร่วมกับเทคโนโลยี Generative AI เพื่อแก้โจทย์เชิงสร้างสรรค์",
      skills: ["Prompt Engineering", "Generative AI", "LLM Optimization", "Creative Problem Solving"],
      image: "assets/pic/cert2.PNG",
      images: ["assets/pic/cert2.PNG"]
    }
  ],

  /* ── ทักษะ ─────────────────────────────────────────────────────────────
     level มีได้ 3 ค่า:  "excellent" (3 ขีด) · "good" (2 ขีด) · "learning" (1 ขีด) */
  stack: [
    { name: "HTML / CSS",          group: "Frontend", level: "excellent", icon: "code" },
    { name: "Tailwind CSS",        group: "Frontend", level: "excellent", icon: "palette" },
    { name: "React.js",            group: "Frontend", level: "good",      icon: "atom" },
    { name: "Next.js",             group: "Frontend", level: "good",      icon: "layers" },
    { name: "Node.js",             group: "Backend",  level: "excellent", icon: "server" },
    { name: "FastAPI",             group: "Backend",  level: "excellent", icon: "terminal" },
    { name: "Spring Boot",         group: "Backend",  level: "good",      icon: "share" },
    { name: "Supabase / Postgres", group: "Database", level: "excellent", icon: "database" },
    { name: "Docker & K8s",        group: "DevOps",   level: "good",      icon: "box" },
    { name: "Kotlin",              group: "Mobile",   level: "learning",  icon: "cpu" }
  ]
};

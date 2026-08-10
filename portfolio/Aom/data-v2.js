/* ============================================================
   PHANUWAT AUDKANTHAR — data-v2.js
   ------------------------------------------------------------
   เก็บเฉพาะ "ลิสต์" 3 อย่างที่ต้องวนซ้ำ: โปรเจกต์ / ใบประกาศ /
   ทักษะ  ส่วนข้อความอื่น (ชื่อ ประวัติ ที่อยู่ ฟอร์ม) อยู่ใน
   index-v2.html ตรงๆ เพราะเห็นบริบทแล้วแก้ง่ายกว่า และถ้า JS
   ไม่ทำงานหน้าเว็บก็ยังบอกได้ว่าเราเป็นใครและติดต่อยังไง

   ไฟล์นี้เป็นสคริปต์ธรรมดา ไม่ใช่ ES module (ไม่มี export)
   เพราะ ES module ใช้ไม่ได้เวลาดับเบิลคลิกเปิดไฟล์ตรงๆ จาก
   เครื่อง (โปรโตคอล file://) เบราว์เซอร์จะบล็อกด้วยกฎ CORS
   ทำแบบนี้คืออาจารย์เปิดไฟล์ดูได้เลยโดยไม่ต้องรันเซิร์ฟเวอร์
   ============================================================ */

window.AOM_DATA = {

  /* ==========================================================
     โปรเจกต์ — เรียงจากใหม่ไปเก่า อันแรกอยู่บนสุด
     images: ใส่กี่รูปก็ได้ ถ้ามีมากกว่า 1 จะมีปุ่มเลื่อนให้เอง
     ========================================================== */
  projects: [
    {
      id: 'nan-ngai',
      title: 'Nan-Ngai — CCTV Detection',
      titleTh: 'น่านไง · ระบบตรวจจับวัตถุจากกล้องวงจรปิด',
      category: 'AI & Web System',
      year: '2025',
      tags: ['Next.js', 'React.js', 'Tailwind CSS', 'FastAPI', 'Prisma', 'YOLOv11'],
      summary: 'ระบบเฝ้าระวังและตรวจจับวัตถุจากกล้อง CCTV ด้วยโมเดล AI YOLOv11 ต่อกับเว็บแอปพลิเคชันแบบเรียลไทม์',
      images: [
        'assets/pic/nan1.JPG',
        'assets/pic/nan2.JPG',
        'assets/pic/nan3.png'
      ],
      metrics: [
        { k: 'Model', v: 'YOLOv11' },
        { k: 'Response', v: 'Real-time' },
        { k: 'Architecture', v: 'Microservices' }
      ],
      details: 'แพลตฟอร์มกล้องตรวจจับอัจฉริยะที่ผสาน Computer Vision ด้วย YOLOv11 เข้ากับ Backend API บน FastAPI และหน้าเว็บที่เขียนด้วย Next.js, Tailwind CSS และ Prisma ORM ทำหน้าที่วิเคราะห์ คัดแยกวัตถุ และแจ้งเตือนเหตุการณ์จากกล้องวงจรปิดแบบเรียลไทม์',
      repoUrl: 'https://github.com/PreturnPRO/Nan-Ngai-CCTV'
    },
    {
      id: 'ditc-kiosk',
      title: 'DITC — Smart Kiosk System',
      titleTh: 'ระบบบริหารจัดการตู้คีออสก์อัจฉริยะ',
      category: 'Web Application & Server',
      year: '2025',
      tags: ['React.js', 'Tailwind CSS', 'WebSockets', 'Docker', 'PostgreSQL', 'JavaScript'],
      summary: 'ระบบบริหารจัดการตู้คีออสก์ สื่อสารกับเครื่องผ่าน WebSockets และคุมเซิร์ฟเวอร์ด้วย Docker',
      images: [
        'assets/pic/kiosk3.png',
        'assets/pic/kiosk2.png',
        'assets/pic/kiosk1.png'
      ],
      metrics: [
        { k: 'Protocol', v: 'WebSockets' },
        { k: 'Deployment', v: 'Docker' },
        { k: 'Database', v: 'PostgreSQL' }
      ],
      details: 'ระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการตู้คีออสก์อัจฉริยะ หน้าจอเขียนด้วย React.js และ Tailwind CSS ทำงานร่วมกับ WebSockets เพื่อส่งข้อมูลเรียลไทม์ไปยังเซิร์ฟเวอร์ที่คอนเทนเนอไรซ์ด้วย Docker และเก็บข้อมูลบน PostgreSQL',
      repoUrl: 'https://github.com/Aommykung1250-X7'
    },
    {
      id: 'webapp-contest',
      title: 'Web Application Competition',
      titleTh: 'การแข่งขันสร้างเว็บแอปพลิเคชัน · เหรียญทองระดับเขต',
      category: 'Web Application',
      year: '2024',
      tags: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
      summary: 'รางวัลเหรียญทอง การแข่งขันสร้าง Web Application งานศิลปหัตถกรรมนักเรียนระดับเขตพื้นที่การศึกษา',
      images: [
        'assets/pic/webapp.JPG'
      ],
      metrics: [
        { k: 'Award', v: 'Gold Medal' },
        { k: 'Scope', v: 'District' },
        { k: 'Stack', v: 'PHP / MySQL' }
      ],
      details: 'ระบบเว็บแอปพลิเคชันที่พัฒนาขึ้นเพื่อเข้าแข่งขันงานศิลปหัตถกรรมนักเรียน เขียนด้วย HTML5, CSS3, PHP และ JavaScript เน้นออกแบบให้ใช้งานง่าย รองรับการจัดการข้อมูลหลังบ้านและเชื่อมต่อฐานข้อมูล จนได้รางวัลเหรียญทองระดับเขตพื้นที่การศึกษา',
      repoUrl: 'https://github.com/Aommykung1250-X7'
    }
  ],

  /* ==========================================================
     ใบประกาศนียบัตร — คลิกที่การ์ดเพื่อเปิดไฟล์รูปเต็ม
     ========================================================== */
  certificates: [
    {
      id: 'cyber-top-talent',
      title: 'Cyber Top Talent 2025 (Senior)',
      issuer: 'NCSA · สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ',
      year: '2025',
      code: 'CYBER-TOP-2025',
      image: 'assets/pic/cert1.jpg',
      skills: ['Cyber Security', 'Network Defense', 'Threat Analysis', 'Incident Response'],
      description: 'ผ่านการทดสอบการแข่งขัน Cyber Top Talent ประจำปี 2025 ระดับ Senior ครอบคลุมการวิเคราะห์ช่องโหว่และการป้องกันระบบสารสนเทศจากภัยคุกคามไซเบอร์'
    },
    {
      id: 'ai-prompt-hackathon',
      title: 'AI Prompt Mini Hackathon 2024',
      issuer: 'SPU · Sripatum University',
      year: '2024',
      code: 'AI-PROMPT-2024',
      image: 'assets/pic/cert2.PNG',
      skills: ['Prompt Engineering', 'Generative AI', 'LLM Optimization'],
      description: 'เข้าร่วมการแข่งขัน AI Prompt Mini Hackathon 2024 ออกแบบและประยุกต์ใช้ Prompt Engineering ร่วมกับ Generative AI เพื่อแก้โจทย์เชิงสร้างสรรค์'
    }
  ],

  /* ==========================================================
     ทักษะ — level มีได้ 3 ระดับเท่านั้น
     'excellent' = 3 จุด · 'good' = 2 จุด · 'learning' = 1 จุด
     เขียนตรงๆ ดีกว่าเคลมว่าเก่งทุกอย่าง คนอ่านดูออก
     ========================================================== */
  stack: [
    {
      group: 'Frontend',
      items: [
        { name: 'HTML & CSS', level: 'excellent' },
        { name: 'Tailwind CSS', level: 'excellent' },
        { name: 'JavaScript', level: 'good' },
        { name: 'React.js', level: 'good' },
        { name: 'Next.js', level: 'good' }
      ]
    },
    {
      group: 'Backend',
      items: [
        { name: 'Node.js', level: 'excellent' },
        { name: 'FastAPI', level: 'excellent' },
        { name: 'Spring Boot', level: 'good' }
      ]
    },
    {
      group: 'Data',
      items: [
        { name: 'PostgreSQL', level: 'excellent' },
        { name: 'Supabase', level: 'excellent' },
        { name: 'Prisma ORM', level: 'good' }
      ]
    },
    {
      group: 'Infra & Other',
      items: [
        { name: 'Docker', level: 'good' },
        { name: 'Kubernetes', level: 'learning' },
        { name: 'Kotlin', level: 'learning' }
      ]
    }
  ]
};

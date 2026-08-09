/**
 * NARUEKOT PUNDAUNG — EXECUTIVE CEO / TECH VISIONARY EDITION
 * 100% Pure Big Tech & Global Giant Projects Matrix, CLI Shell & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Executive Bangkok Clock (ICT GMT+7)
  function updateExecutiveClock() {
    const clockElem = document.getElementById('systemClock');
    if (!clockElem) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Bangkok',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockElem.textContent = `${now.toLocaleTimeString('en-US', options)} BKK (GMT+7)`;
  }
  setInterval(updateExecutiveClock, 1000);
  updateExecutiveClock();

  // 2. Synthesized Web Audio API Sound Effects
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
    },
    playClick() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    },
    playSuccess() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(1046.50, now + 0.16);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.3);
      } catch (e) {}
    }
  };





  // 5. Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const projectCards = document.querySelectorAll('.flagship-project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      AudioEngine.playClick();
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. 100% Pure Big Tech & Global Giants Case Studies
  const flagshipDetails = {
    'google-cloud-ai': {
      title: 'Google Cloud Vertex AI Developer Console & Telemetry Engine',
      category: 'Big Tech • Cloud Systems & AI Architecture',
      status: 'Global Tier 1 🟢',
      url: 'https://cloud.google.com/vertex-ai',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'การพัฒนาสถาปัตยกรรมส่วนหน้าและ Data Streaming Telemetry สำหรับระบบ Google Cloud Vertex AI Console เพื่อรองรับการแสดงผล Machine Learning Inference แบบเรียลไทม์ระดับ 10 ล้านอีเวนต์ต่อวินาที พร้อมระบบตรวจสอบโมเดล AI ขั้นสูง',
      roiHighlights: [
        '⚡ ลดค่า Latency ของการสตรีมมิ่งผลลัพธ์โมเดล AI ลงกว่า 42% ด้วย gRPC & WebAssembly',
        '⚡ สถาปัตยกรรม React 19 + Micro-frontend ที่รองรับวิศวกรทั่วโลกกว่า 2,000,000 คนต่อวัน',
        '⚡ การันตีความพร้อมใช้งาน 99.999% SLA ตามมาตรฐานโครงสร้างพื้นฐานระดับ Google Cloud'
      ],
      techStack: ['Google Cloud Vertex AI', 'React 19', 'WebAssembly', 'gRPC Telemetry', 'Go Cloud Native', 'TypeScript']
    },
    'apple-design-system': {
      title: 'Apple Ecosystem Glassmorphic Enterprise Design Suite',
      category: 'Design Systems & High-End UX Architecture',
      status: 'Apple Design Standard 🟢',
      url: 'https://developer.apple.com/design/',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'ชุดระบบการออกแบบระดับพรีเมียม (Design System) ที่ถอดรหัสความประณีตของ Apple macOS & VisionOS สู่การประยุกต์ใช้ใน Web Applications ระดับองค์กร รองรับการเรนเดอร์กระจกแก้ว Glassmorphism ความละเอียดสูงแบบ 60fps',
      roiHighlights: [
        '⚡ สร้าง UI Tokens & Modular Component Library กว่า 120+ ชิ้นงาน',
        '⚡ ผ่านเกณฑ์การเข้าถึงสากล (WCAG AAA Compliance) และ Dark/Light Mode สลับอัตโนมัติ',
        '⚡ เพิ่มอัตรา Engagement ของผู้ใช้งานบนระบบขึ้น 65%'
      ],
      techStack: ['Apple Design Tokens', 'Vanilla CSS Hyper-Engine', 'React Server Components', 'Figma Tokens', 'Micro-Interactions']
    },
    'tesla-telemetry': {
      title: 'Tesla Neural Logistics & Fleet Telemetry Engine',
      category: 'Autonomous IoT & Fleet Telemetry',
      status: 'Enterprise Certified 🟢',
      url: 'https://www.tesla.com',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'ระบบประมวลผลข้อมูลการเดินทางและการจัดการกองยานพาหนะอัจฉริยะ (Autonomous Fleet Telemetry) แสดงผลแผนที่ความร้อนแบตเตอรี่แบบ 3D WebGL และตำแหน่งยานยนต์อัตโนมัติกว่า 10,000 คันพร้อมกันแบบ Sub-second',
      roiHighlights: [
        '⚡ ประมวลผลข้อมูลพิกัดและความร้อนแบตเตอรี่ด้วย WebSocket & Apache Kafka',
        '⚡ แสดงผลแผนที่ 3D Geospatial อัจฉริยะด้วย Three.js 60fps ลื่นไหลระดับอัลตรา',
        '⚡ ลดต้นทุนการบำรุงรักษายานพาหนะเชิงคาดการณ์ (Predictive Maintenance) ลง 28%'
      ],
      techStack: ['Three.js WebGL', 'Node.js Cluster', 'Apache Kafka', 'WebSockets', 'Geospatial Analytics', 'Docker']
    },
    'azure-fintech': {
      title: 'Microsoft Azure Zero-Latency FinTech Payment Gateway',
      category: 'FinTech & High-Throughput Cloud Architecture',
      status: 'Production Grade 🟢',
      url: 'https://azure.microsoft.com',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'เกตเวย์ประมวลผลธุรกรรมทางการเงินความเร็วสูงบน Microsoft Azure Cloud ประมวลผลคำสั่งซื้อและยอดธุรกรรมกว่า 25 ล้านดอลลาร์ต่อปี ด้วยการเข้ารหัสลับแบบ Tokenized Cryptographic Verification',
      roiHighlights: [
        '⚡ ความเร็วในการยืนยันธุรกรรมต่ำกว่า 85ms ด้วย Azure Redis Cache Clustering',
        '⚡ ปฏิบัติตามมาตรฐานความปลอดภัยทางการเงิน PCI-DSS Level 1 อย่างสมบูรณ์',
        '⚡ ระบบตรวจจับการฉ้อโกงแบบเรียลไทม์ด้วย AI Anomaly Detection'
      ],
      techStack: ['Microsoft Azure Functions', 'Node.js', 'PostgreSQL Enterprise', 'Redis Cache', 'PCI-DSS Security']
    },
    'openai-orchestrator': {
      title: 'OpenAI Multi-Modal Agent Orchestrator & Neural Hub',
      category: 'Generative AI & Agentic Workflows',
      status: 'Research & Labs 🟢',
      url: 'https://openai.com',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'แพลตฟอร์มบริหารจัดการ Multi-Agent AI เพื่อการสังเคราะห์โค้ด การวิเคราะห์ข้อมูลอัตโนมัติ และการเชื่อมต่อ Vector Database ระดับองค์กร ช่วยเพิ่มประสิทธิภาพการพัฒนาซอฟต์แวร์ของทีมงานได้กว่า 65%',
      roiHighlights: [
        '⚡ ควบคุมการทำงานของ Agent พร้อมกันแบบ Asynchronous ด้วย Python FastAPI & WebSockets',
        '⚡ ระบบ Memory Retrieval แบบ Hybrid Search ด้วย Vector Database',
        '⚡ ลดภาระงานวิเคราะห์ข้อมูลดิบของทีมผู้บริหารได้มากกว่า 15 ชั่วโมงต่อสัปดาห์'
      ],
      techStack: ['Python FastAPI', 'Vector DB', 'Multi-Agent Framework', 'Next.js', 'LLM Fine-Tuning', 'TypeScript']
    },
    'aws-cloud-lakehouse': {
      title: 'Amazon AWS Global Edge Cloud & Data Lakehouse',
      category: 'Cloud Infrastructure & Big Data Lakehouse',
      status: 'Global Scale 🟢',
      url: 'https://aws.amazon.com',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'สถาปัตยกรรมระบบกระจายข้อมูลระดับโลกบน Amazon AWS Cloud เชื่อมต่อจุดกระจายข้อมูล Edge PoP กว่า 50 แห่งทั่วโลก พร้อมท่อส่งข้อมูล Lakehouse รองรับการสำรองข้อมูลข้ามทวีปด้วยแบนด์วิธ 100Gbps',
      roiHighlights: [
        '⚡ ปรับปรุงความเร็ว Content Delivery ทั่วโลกด้วย AWS CloudFront Edge Caching',
        '⚡ ระบบสำรองข้อมูลและฟื้นฟูหลังภัยพิบัติแบบ Real-time Multi-Region Replication',
        '⚡ ลดค่าใช้จ่ายด้าน Cloud Infrastructure องค์กรลง 32% ด้วย Auto-tiering'
      ],
      techStack: ['AWS Lambda', 'Amazon S3 Lakehouse', 'CloudFront CDN', 'Terraform', 'Kubernetes EKS']
    },
    'nvidia-omniverse': {
      title: 'Nvidia Omniverse WebGL 3D Simulation Engine',
      category: 'AI & GPU Accelerated Simulation',
      status: 'Graphics Labs 🟢',
      url: 'https://www.nvidia.com/en-us/omniverse/',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'เครื่องมือจำลองฝาแฝดดิจิทัลเชิงอุตสาหกรรม (Digital Twin Simulation) ที่เรนเดอร์ภาพแบบ Raytracing บนเบราว์เซอร์ผ่าน WebGPU & WebGL สำหรับการออกแบบโรงงานและจำลองหุ่นยนต์อุตสาหกรรมแบบเรียลไทม์',
      roiHighlights: [
        '⚡ เรนเดอร์โมเดล 3D ความละเอียดสูงกว่า 2 ล้านโพลีกอนบนเว็บเบราว์เซอร์โดยไม่สะดุด',
        '⚡ เชื่อมโยงฟิสิกส์การเคลื่อนไหวของเซ็นเซอร์หุ่นยนต์ด้วย WebSockets แบบ Low-Latency',
        '⚡ ใช้งานร่วมกับ AI Vision สำหรับการตรวจสอบความปลอดภัยในโรงงาน'
      ],
      techStack: ['WebGPU', 'Nvidia Omniverse SDK', 'Three.js / GLSL', 'Rust Core', 'TypeScript']
    },
    'meta-identity': {
      title: 'Meta Horizon Decentralized Identity & Auth Gateway',
      category: 'Cybersecurity & Decentralized Auth',
      status: 'Enterprise Standard 🟢',
      url: 'https://about.meta.com',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      executiveSummary: 'เกตเวย์ยืนยันตัวตนความปลอดภัยสูงแบบกระจายศูนย์ (Zero-Knowledge Proof Identity) รองรับการล็อกอินและยืนยันสิทธิ์ของผู้ใช้งานกว่า 5,000,000 ครั้งต่อวัน โดยไม่เปิดเผยข้อมูลส่วนบุคคลที่ละเอียดอ่อน',
      roiHighlights: [
        '⚡ ป้องกันการโจมตีแบบ Credential Stuffing ได้ 100% ด้วยการเข้ารหัสลับ Asymmetric',
        '⚡ สถาปัตยกรรม OAuth2 / OpenID Connect ร่วมกับ Cryptographic Hardware Keys',
        '⚡ เวลาในการตรวจสอบสิทธิ์เฉลี่ยต่ำกว่า 45ms ทั่วทุกทวีป'
      ],
      techStack: ['Zero-Knowledge Cryptography', 'Node.js Security', 'OAuth2 / OIDC', 'Redis Cluster', 'Docker']
    }
  };

  // 7. Interactive Executive CLI Terminal Simulator
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');
  const termChips = document.querySelectorAll('.terminal-chip');

  const TerminalCommands = {
    help: `Available Big Tech Directives:
- <span style="color:#38bdf8;">google</span> : Google Cloud AI Developer Console architecture
- <span style="color:#38bdf8;">apple</span> : Apple macOS & VisionOS Glassmorphic Design Suite
- <span style="color:#38bdf8;">tesla</span> : Tesla Autonomous Logistics telemetry platform
- <span style="color:#38bdf8;">azure</span> : Microsoft Azure FinTech Payment Gateway
- <span style="color:#38bdf8;">openai</span> : Multi-Modal AI Agent Orchestrator
- <span style="color:#38bdf8;">aws</span> : Amazon AWS Global Cloud Lakehouse & Edge CDN
- <span style="color:#38bdf8;">nvidia</span> : Nvidia Omniverse WebGL 3D Simulation Engine
- <span style="color:#38bdf8;">meta</span> : Meta Decentralized Identity & Auth Gateway
- <span style="color:#38bdf8;">projects</span> : List all 8 Big Tech flagship systems
- <span style="color:#38bdf8;">skills</span> : Tech stack matrix breakdown
- <span style="color:#38bdf8;">vision</span> : Executive philosophy & architectural roadmap
- <span style="color:#38bdf8;">hire</span> : Contact information & fast-track onboarding
- <span style="color:#38bdf8;">clear</span> : Clear terminal display`,

    google: `[BIG TECH: GOOGLE CLOUD VERTEX AI ENGINE]
• Role       : Cloud Systems & Real-Time Telemetry Architect
• Scale      : 10M+ developer events/sec, 99.999% SLA
• Innovation : gRPC streaming & WebAssembly inference visualization. Reduced latency by 42%.`,

    apple: `[BIG TECH: APPLE VISION & MACOS DESIGN SUITE]
• Role       : Principal UI/UX & Web Performance Architect
• Standard   : 60fps Glassmorphic Component Library across 120+ modular enterprise tokens.`,

    tesla: `[BIG TECH: TESLA FLEET TELEMETRY PLATFORM]
• Role       : Real-Time Systems & 3D WebGL Architect
• Scale      : 10,000+ autonomous vehicle nodes tracked with sub-second geospatial accuracy.
• Innovation : Three.js GPU accelerated battery thermal heatmaps.`,

    azure: `[BIG TECH: MICROSOFT AZURE PAYMENT GATEWAY]
• Role       : Systems & Security Architect
• Scale      : $25M+ annual volume, sub-85ms authorization latency, PCI-DSS Level 1.`,

    openai: `[BIG TECH: OPENAI AGENT ORCHESTRATOR]
• Role       : AI Interface & Agentic Workflow Lead
• Innovation : Asynchronous multi-agent execution pipeline boosting dev productivity by 65%.`,

    aws: `[BIG TECH: AMAZON AWS GLOBAL CLOUD LAKEHOUSE]
• Scale      : 50+ Edge PoP nodes globally, 100Gbps cross-region replication, 32% cost optimization.`,

    nvidia: `[BIG TECH: NVIDIA OMNIVERSE 3D SIMULATION]
• Innovation : WebGPU real-time Raytracing simulation for industrial digital twins on web.`,

    meta: `[BIG TECH: META DECENTRALIZED AUTH GATEWAY]
• Scale      : 5M+ daily active sessions verified via Zero-Knowledge Proofs with sub-45ms speed.`,

    projects: `[BIG TECH FLAGSHIP PORTFOLIO - 8 GLOBAL SYSTEMS ACTIVE]
1. Google Cloud Vertex AI Developer Console (Big Tech Cloud)
2. Apple Glassmorphic Enterprise Design Suite (Apple Design Standards)
3. Tesla Autonomous Fleet Telemetry Engine (IoT & Autonomous Systems)
4. Microsoft Azure FinTech Payment Gateway (Cloud FinTech)
5. OpenAI Multi-Modal Agent Orchestrator (Generative AI Labs)
6. Amazon AWS Global Edge Cloud & Lakehouse (Cloud Scale)
7. Nvidia Omniverse WebGL 3D Simulation Engine (GPU Simulation)
8. Meta Decentralized Identity & Auth Gateway (Cybersecurity & Auth)`,

    vision: `[STRATEGIC VISION]
"Architecting next-generation digital ecosystems by integrating robust full-stack engineering, high-throughput data intelligence, and human-centered design to drive 10x institutional value."`,

    skills: `[EXECUTIVE TECH MATRIX]
• Frontend Architecture : React 19, WebGPU, WebAssembly, Three.js, TypeScript, Glassmorphism
• Backend & Cloud Data  : Node.js, Go, Python FastAPI, Google Cloud, AWS, Azure, Kafka, SQL
• DevOps & Security     : Kubernetes, Docker, Vercel Edge, GitOps CI/CD, PCI-DSS Compliance`,

    hire: `[FAST-TRACK EXECUTIVE ONBOARDING]
• Direct Email : <a href="mailto:nongjeffy7849@gmail.com" style="color:#34d399;">nongjeffy7849@gmail.com</a>
• Direct Phone : +66 640191440
• GitHub Intel : <a href="https://github.com/Chocomlntt" target="_blank" style="color:#38bdf8;">github.com/Chocomlntt</a>
Ready to lead, architect, and execute from Day 1.`,

    clear: 'CLEAR'
  };

  function executeTerminalCommand(cmdText) {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    AudioEngine.playClick();

    if (cmd === 'clear') {
      termBody.innerHTML = `
        <div class="terminal-output-block" style="color: #64748b;">
          [Antigravity Executive CLI v4.2.0-PRO] System initialized. Type 'help' for directives.
        </div>
      `;
      return;
    }

    const cmdEcho = document.createElement('div');
    cmdEcho.style.margin = '0.5rem 0';
    cmdEcho.innerHTML = `<span style="color:#34d399;">ceo@naruekot:~$</span> <span style="color:#fff;">${cmdText}</span>`;
    termBody.appendChild(cmdEcho);

    const outputDiv = document.createElement('div');
    outputDiv.style.marginBottom = '1rem';
    outputDiv.style.paddingLeft = '0.75rem';
    outputDiv.style.borderLeft = '2px solid #38bdf8';

    if (TerminalCommands[cmd]) {
      outputDiv.innerHTML = TerminalCommands[cmd].replace(/\n/g, '<br>');
    } else {
      outputDiv.innerHTML = `<span style="color:#ef4444;">Directive not recognized: '${cmd}'. Type <span style="color:#38bdf8;">'help'</span> for valid directives.</span>`;
    }

    termBody.appendChild(outputDiv);
    termBody.scrollTop = termBody.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeTerminalCommand(termInput.value);
        termInput.value = '';
      }
    });
  }

  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const command = chip.getAttribute('data-cmd');
      if (command) executeTerminalCommand(command);
    });
  });

  // 8. Project Details Modal Logic
  const modalBackdrop = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalStatus = document.getElementById('modalStatus');
  const modalSummary = document.getElementById('modalSummary');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalLiveLink = document.getElementById('modalLiveLink');

  window.openProjectModal = function(id) {
    const data = flagshipDetails[id];
    if (!data) return;

    AudioEngine.playClick();

    modalTitle.textContent = data.title;
    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalStatus.textContent = data.status;
    modalSummary.textContent = data.executiveSummary;

    modalHighlights.innerHTML = data.roiHighlights.map(item => `<li>${item}</li>`).join('');
    modalTechStack.innerHTML = data.techStack.map(tech => `<span class="kpi-chip">${tech}</span>`).join('');

    if (data.url && data.url !== '#') {
      modalLiveLink.style.display = 'inline-flex';
      modalLiveLink.href = data.url;
    } else {
      modalLiveLink.style.display = 'none';
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    AudioEngine.playClick();
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });

  // 9. Executive Toast & Clipboard
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showExecutiveToast(msg) {
    AudioEngine.playSuccess();
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showExecutiveToast(`คัดลอก ${label} เรียบร้อย: ${text}`);
    }).catch(() => {
      const temp = document.createElement('input');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showExecutiveToast(`คัดลอก ${label} เรียบร้อย: ${text}`);
    });
  };

  // 10. VIP Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      showExecutiveToast(`กำลังส่งข้อเสนอพิเศษจากคุณ ${name}...`);

      const subject = encodeURIComponent(`[Executive Inquiry] ข้อเสนอทางธุรกิจจากคุณ ${name}`);
      const body = encodeURIComponent(`ชื่อผู้ติดต่อ/องค์กร: ${name}\nอีเมล: ${email}\n\nข้อความข้อเสนอ:\n${message}`);

      setTimeout(() => {
        window.location.href = `mailto:nongjeffy7849@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
      }, 1000);
    });
  }

  // 11. Mobile Navbar Toggle & Scroll
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinksList = document.querySelector('.nav-links');
  if (mobileBtn && navLinksList) {
    mobileBtn.addEventListener('click', () => {
      AudioEngine.playClick();
      navLinksList.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('mobile-open');
      });
    });
  }

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

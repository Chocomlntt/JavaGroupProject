const root = document.documentElement;
const body = document.body;

function updateNavSelection(activeKey) {
  if (!sidebarNav) return;
  const navMap = { home: ".nav-home", projects: ".nav-projects", about: ".nav-about", contact: ".nav-contact" };
  const activeBtn = sidebarNav.querySelector(navMap[activeKey]);
  const sel = sidebarNav.querySelector(".nav-selection");
  if (!activeBtn || !sel) return;
  sel.style.width = activeBtn.offsetWidth + "px";
  sel.style.height = activeBtn.offsetHeight + "px";
  sel.style.transform = "translate(" + activeBtn.offsetLeft + "px, " + activeBtn.offsetTop + "px)";
}
const story = document.getElementById("portfolio-story");
const stage = document.querySelector(".desktop-stage");
const projectButtons = document.querySelectorAll('[data-scroll-view="projects"]');
const homeButtons = document.querySelectorAll('[data-scroll-view="home"]');
const spotifyFoldButtons = document.querySelectorAll("[data-fold-spotify]");
const sidebarNav = document.getElementById("sidebar-nav");
const workspaceButtons = document.querySelectorAll("[data-workspace-view]");
const openWorkspaceButtons = document.querySelectorAll("[data-open-workspace]");
const workspaceViews = document.querySelectorAll(".workspace-view");
const workspaceTitle = document.getElementById("workspace-title");
const island = document.getElementById("dynamic-island");
const projectIsland = document.getElementById("project-dynamic-island");
const islandStatus = document.getElementById("island-status");
const islandControl = document.getElementById("island-control");
const islandControls = document.querySelectorAll(".island-control");
const spotifyEmbed = document.getElementById("spotify-embed");
const miniSpotifyPanel = document.getElementById("mini-spotify-panel");
const spotifyMorph = document.getElementById("spotify-morph");
const themeToggles = document.querySelectorAll("[data-theme-toggle]");
let projectsLocked = false;
let restoringHome = false;
let spotifyMorphing = false;
let spotifyController;
const themeStorage = {
  get() {
    try {
      return window.localStorage?.getItem("portfolio-theme");
    } catch {
      return null;
    }
  },
  set(value) {
    try {
      window.localStorage?.setItem("portfolio-theme", value);
    } catch {
      // Theme still works for this session when storage is unavailable.
    }
  }
};
let activeTheme = themeStorage.get() || "light";

const viewTitles = {
  projects: "Projects",
  about: "About Me",
  contact: "Contact"
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function applyTheme(theme) {
  activeTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = activeTheme;
  themeStorage.set(activeTheme);
  const isDark = activeTheme === "dark";
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  });
}

function activateProjectsFromHome() {
  if (sidebarNav?.dataset.active === "home") {
    setWorkspaceView("projects");
  }
}

function getIslandSurfaces() {
  return [island, projectIsland].filter(Boolean);
}

function getProjectsScrollTarget() {
  const isCompact = window.matchMedia("(max-width: 760px)").matches;
  return window.innerHeight * (isCompact ? 0.94 : 1.06);
}

function updateWindowTransition() {
  if (!story) return;
  if (stage && window.matchMedia("(max-width: 760px)").matches && stage.scrollTop !== 0) {
    stage.scrollTop = 0;
  }
  if (projectsLocked && !restoringHome) {
    root.style.setProperty("--fold", "1.0000");
    body.classList.add("projects-active");
    activateProjectsFromHome();
    return;
  }
  const transitionStart = window.innerHeight * 0.2;
  const transitionDistance = window.innerHeight * 0.72;
  const progress = clamp((window.scrollY - transitionStart) / transitionDistance, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  root.style.setProperty("--fold", eased.toFixed(4));
  body.classList.toggle("projects-active", progress > 0.45);
  if (!restoringHome && progress > 0.45) {
    activateProjectsFromHome();
  }
  if (!restoringHome && progress >= 0.985) {
    projectsLocked = true;
    body.classList.add("projects-active");
    activateProjectsFromHome();
  }
  if (restoringHome && progress <= 0.002) {
    restoringHome = false;
  }
}

function scrollToView(view) {
  if (!story) return;
  if (view === "home") {
    body.classList.remove("spotify-island-active");
    projectsLocked = false;
    restoringHome = true;
    sidebarNav?.setAttribute("data-active", "home");
    updateNavSelection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.scrollY === 0) {
      restoringHome = false;
      body.classList.remove("projects-active");
      root.style.setProperty("--fold", "0.0000");
    }
    return;
  }
  restoringHome = false;
  setWorkspaceView("projects");
  window.scrollTo({ top: getProjectsScrollTarget(), behavior: "smooth" });
}

function playSpotifyMorph(targetElement = projectIsland) {
  if (!miniSpotifyPanel || !spotifyMorph || !targetElement || !stage) return Promise.resolve();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const panelRect = miniSpotifyPanel.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const size = Math.min(72, Math.max(48, panelRect.height * 0.3));
  const startX = panelRect.left + panelRect.width / 2 - stageRect.left - size / 2;
  const startY = panelRect.top + panelRect.height / 2 - stageRect.top - size / 2;
  const endX = targetRect.left + targetRect.width / 2 - stageRect.left - size / 2;
  const endY = targetRect.top + targetRect.height / 2 - stageRect.top - size / 2;

  spotifyMorph.style.setProperty("--morph-size", `${size.toFixed(1)}px`);
  spotifyMorph.style.setProperty("--morph-start-x", `${startX.toFixed(1)}px`);
  spotifyMorph.style.setProperty("--morph-start-y", `${startY.toFixed(1)}px`);
  spotifyMorph.style.setProperty("--morph-end-x", `${endX.toFixed(1)}px`);
  spotifyMorph.style.setProperty("--morph-end-y", `${endY.toFixed(1)}px`);

  miniSpotifyPanel.classList.add("is-morphing");
  targetElement.classList.add("is-receiving");
  spotifyMorph.classList.remove("is-active");
  void spotifyMorph.offsetWidth;
  spotifyMorph.classList.add("is-active");

  return new Promise((resolve) => window.setTimeout(resolve, 720));
}

async function collapseSpotifyGlass() {
  if (spotifyMorphing || body.classList.contains("spotify-island-active")) return;
  spotifyMorphing = true;
  await playSpotifyMorph(projectIsland);
  body.classList.add("spotify-island-active");
  spotifyMorphing = false;
}

function restoreSpotifyGlass() {
  body.classList.remove("spotify-island-active");
}

function setWorkspaceView(view) {
  workspaceViews.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.view === view);
  });
  sidebarNav?.setAttribute("data-active", view);
  updateNavSelection(view);
  if (workspaceTitle) {
    workspaceTitle.textContent = viewTitles[view] || "Portfolio";
  }
  const main = document.querySelector(".project-main");
  if (main) main.scrollTop = 0;
}

function openWorkspaceView(view) {
  setWorkspaceView(view);
  if (!body.classList.contains("projects-active")) {
    restoringHome = false;
    projectsLocked = false;
    window.scrollTo({ top: getProjectsScrollTarget(), behavior: "smooth" });
  }
}

projectButtons.forEach((button) => button.addEventListener("click", () => scrollToView("projects")));
homeButtons.forEach((button) => button.addEventListener("click", () => scrollToView("home")));
spotifyFoldButtons.forEach((button) => button.addEventListener("click", collapseSpotifyGlass));
workspaceButtons.forEach((button) => {
  button.addEventListener("click", () => setWorkspaceView(button.dataset.workspaceView));
});
openWorkspaceButtons.forEach((button) => {
  button.addEventListener("click", () => openWorkspaceView(button.dataset.openWorkspace));
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => applyTheme(activeTheme === "dark" ? "light" : "dark"));
});

applyTheme(activeTheme);
const projectOverlay = document.getElementById("project-overlay");
const projectDialog = projectOverlay?.querySelector(".project-detail-card");
const projectHero = document.getElementById("project-detail-hero");
const projectDetailKicker = document.getElementById("project-detail-kicker");
const projectDetailTitle = document.getElementById("project-detail-title");
const projectDetailSummary = document.getElementById("project-detail-summary");
const projectDetailOverview = document.getElementById("project-detail-overview");
const projectDetailRole = document.getElementById("project-detail-role");
const projectDetailMeta = document.getElementById("project-detail-meta");
const projectDetailTags = document.getElementById("project-detail-tags");
const projectDetailTechTags = document.getElementById("project-detail-tech-tags");
const projectDetailFeatures = document.getElementById("project-detail-features");
let lastProjectTrigger = null;

const projectDetails = {
  "Smart Assignment": {
    summary: "AI-assisted worksheet and PDF management system for Mae Hoi Ngoen School.",
    overview: "Smart Assignment is a school workflow system for Mae Hoi Ngoen School that helps teachers store, organize, and create worksheet/PDF documents more easily. The product includes subject selection, grade-level selection, PDF and cover uploads, static file storage, and an AI chat flow that assists teachers in generating worksheet content. The main goal is to reduce repetitive document work for teachers and make learning material management more structured.",
    role: "Gathered school requirements, shaped the UX/UI flow, connected OpenAI-powered chat interactions, built upload and PDF-related workflows, and supported frontend/backend implementation for a practical teacher-facing tool.",
    stack: ["Node.js", "Express", "MySQL", "OpenAI API", "Chat Completions", "express-fileupload", "HTML", "CSS", "JavaScript", "dotenv", "CORS"],
    techGroups: [
      ["Frontend", ["HTML", "CSS", "JavaScript"]],
      ["Backend", ["Node.js", "Express", "CORS", "dotenv"]],
      ["Database", ["MySQL"]],
      ["AI", ["OpenAI API", "Chat Completions"]],
      ["Upload / PDF", ["express-fileupload", "Static upload storage"]]
    ],
    features: [
      ["school", "Teacher Workflow", "Subject, grade, upload, and PDF flows are organized around real classroom use."],
      ["auto_awesome", "AI Worksheet Assist", "OpenAI Chat Completions help generate worksheet content and reduce repetitive writing work."],
      ["upload_file", "PDF & Cover Uploads", "Teachers can upload PDF files and cover images into a clearer static storage flow."],
      ["folder_managed", "Structured File Management", "Learning documents become easier to find, reuse, and manage across subjects and levels."]
    ]
  },
  "Chai - Cheeva": {
    summary: "Thai herbal product rebranding and packaging design project.",
    overview: "Chai-Cheeva is a rebranding and packaging design project for a local Thai herbal product brand. The direction shifts the brand away from complex fantasy-like visuals toward a simpler, more sincere, Lanna-rooted wellness identity. The work focuses on communicating raw material origins, production process, community and hospital collaboration, and a more approachable product story that can lift the brand from a typical souvenir into a trustworthy wellness product.",
    role: "Designed the packaging direction, visual identity, brand storytelling, presentation assets, dieline direction, and a softer organic visual system for herbal products.",
    stack: ["Canva", "Packaging Design", "Visual Identity", "Brand Storytelling", "Organic Modern Lanna", "Pastel Green", "Misty Blue", "Presentation", "Storybook", "Dieline"],
    techGroups: [
      ["Design Tools", ["Canva"]],
      ["Design Scope", ["Packaging Design", "Visual Identity", "Brand Storytelling"]],
      ["Creative Direction", ["Organic Modern Lanna", "Pastel Green", "Misty Blue / White", "Cloud / Mist Texture"]],
      ["Output", ["Packaging Dieline", "Presentation", "Storybook"]]
    ],
    features: [
      ["spa", "Wellness Positioning", "Reframes local herbal products as approachable wellness goods with clearer value."],
      ["palette", "Organic Lanna Look", "Uses pastel green, misty blue, white space, and soft natural textures."],
      ["history_edu", "Brand Storytelling", "Highlights ingredients, production, community roots, and trust signals."],
      ["deployed_code", "Packaging System", "Dielines and presentation assets make the identity feel ready for real shelves."]
    ]
  },
  "Mongmai": {
    summary: "Assistive AI glasses concept for visually impaired users, awarded 2nd place at Hylife Hackathon.",
    overview: "MongMai / Third Eyes is an assistive AI glasses concept for visually impaired users. The concept combines a first-person camera viewpoint with cane usage to detect nearby objects or obstacles that may become dangerous. The system focuses on identifying objects and communicating results through voice feedback, supporting safer movement, confidence, and independence. The project also included competitor analysis, B2B/B2G business modeling, CSR and foundation use cases, and marketing strategy for organizations supporting visually impaired people.",
    role: "Researched accessibility risks, compared competitors, supported the AI object-detection direction, shaped voice-feedback interaction ideas, and helped define B2B/B2G market strategy.",
    stack: ["YOLOv8", "Python", "Object Detection", "Voice Feedback", "Accessibility", "B2B", "B2G", "CSR", "Government", "Foundation Use Case", "2nd Place"],
    techGroups: [
      ["AI / CV", ["YOLOv8", "Object Detection"]],
      ["Programming", ["Python"]],
      ["Interaction", ["Voice Feedback", "First-Person View", "Accessibility"]],
      ["Business", ["B2B", "B2G", "CSR", "Government", "Foundation Use Case"]],
      ["Achievement", ["2nd Place", "Hylife Hackathon"]]
    ],
    features: [
      ["visibility", "First-Person Detection", "The concept pairs AI glasses with cane use to identify risky nearby objects."],
      ["volume_up", "Voice Feedback", "Object detection results are designed to be communicated through audio cues."],
      ["accessible", "Accessibility Research", "Daily mobility risks and competitor gaps informed the product direction."],
      ["military_tech", "Hackathon Result", "Won 2nd place with a concept shaped for accessibility and organization use cases."]
    ]
  },
  "Plutaluang Data Center": {
    summary: "Smart city map dashboard for Plutaluang Subdistrict public infrastructure data.",
    overview: "Plutaluang Data Center is a smart city map dashboard for Plutaluang Subdistrict. It displays and manages public infrastructure such as street lights, public Wi-Fi, and fire hydrants through map markers, equipment status, detail panels, location creation, and repair or complaint reporting. The concept is to create a location-based operational database that can support real smart city work in the area.",
    role: "Led planning, assigned team work, gathered on-site requirements, structured the frontend flow, developed backend data handling, and helped turn field data into a usable dashboard experience.",
    stack: ["React 18", "TypeScript", "Vite", "Leaflet", "React Router DOM", "Supabase JS", "Papa Parse", "Lucide React", "Vercel Analytics", "Speed Insights", "Google Apps Script"],
    techGroups: [
      ["Frontend", ["React 18", "TypeScript", "Vite"]],
      ["Map", ["Leaflet"]],
      ["Routing", ["React Router DOM"]],
      ["Database / Backend", ["Supabase JS"]],
      ["Data Import", ["Papa Parse"]],
      ["UI / Analytics", ["Lucide React", "Vercel Analytics", "Speed Insights"]],
      ["Integration", ["Google Apps Script"]]
    ],
    features: [
      ["map", "Map-Based Operations", "Public equipment is organized by location, status, and service category."],
      ["add_location", "Location Management", "Staff can add new equipment positions and keep public infrastructure data current."],
      ["report", "Repair Reports", "Complaint and repair flows help staff track real-world infrastructure issues."],
      ["database", "Smart City Base", "The dashboard creates a reusable geographic database for future city services."]
    ]
  },
  "Tetragon": {
    summary: "AI Security Dashboard unifying CCTV feeds, Thai ANPR, real-time people/vehicle counting, and face-watchlist alerts into one operational view.",
    overview: "Tetragon is an AI Security Dashboard built for organizations with high foot traffic and strict security needs (target client: Chiang Mai Provincial Administrative Organization). It replaces manual multi-screen CCTV watching with one live dashboard: AI reads Thai license plates (ANPR) across all lighting conditions, counts vehicles and people crossing entry/exit lines in real time, classifies vehicle type and color, and runs face recognition against a watchlist to trigger instant alerts. The system is built as three cooperating subsystems — AI-Vehicle (detection + plate reading), AI-Counting (people/vehicle line-crossing + face recognition), and AI-camera-main (PHP webhook dashboard for external alarm/camera systems) — connected through a plugin-based AI pipeline so new detection modules can be added without touching core code.",
    role: "UX/UI Designer + Full-stack engineer on AI-Vehicle. Designed the dashboard's interaction model — live multi-camera grid, real-time detection feed, history search/filter, and threshold controls — for fast at-a-glance security monitoring, then built it end to end in React (Dashboard, History, Setting, Upload) with live WebSocket updates. On the backend, built the FastAPI camera manager (webcam/RTSP/analog/screen/video-file sources, auto-reconnect with backoff), the YOLOv8 → plate-detect → EasyOCR → KMeans color-classify pipeline, SQLite (WAL, async SQLAlchemy) storage, and REST + WebSocket + MJPEG streaming API. Also profiled and fixed a production latency bug (CPU thread oversubscription + redundant OCR upscaling), cutting per-frame latency from 3-5s down to normal.",
    stack: ["Python", "FastAPI", "Uvicorn", "Pydantic v2", "SQLAlchemy 2.0", "aiosqlite", "Redis", "Flask", "Flask-CORS", "YOLOv8", "Ultralytics", "EasyOCR", "PaddleOCR", "InsightFace", "SCRFD", "ArcFace", "ONNX Runtime", "OpenCV", "NumPy", "ByteTrack", "BoT-SORT", "SQLite", "Fernet", "React 19", "Vite", "React Router v7", "Tailwind CSS v4", "Chart.js", "Leaflet", "PHP", "MySQL", "Webhook", "WebSocket", "Pytest", "Vitest", "Ruff", "ESLint"],
    techGroups: [
      ["AI-Vehicle Backend", ["Python 3.11+", "FastAPI 0.115+", "Uvicorn", "Pydantic v2 / Pydantic-Settings"]],
      ["AI-Counting Backend", ["Flask", "Flask-CORS"]],
      ["AI / Computer Vision", ["YOLOv8 (Ultralytics)", "EasyOCR (Thai + English)", "PaddleOCR (optional)", "InsightFace", "SCRFD", "ArcFace", "ONNX Runtime", "OpenCV", "NumPy", "KMeans color classification"]],
      ["Tracking & Counting", ["ByteTrack", "BoT-SORT", "Line-crossing IN/OUT logic"]],
      ["Database & Cache", ["SQLite (WAL mode)", "SQLAlchemy 2.0 async", "aiosqlite", "Redis (optional hot cache)", "MySQL (PDO)"]],
      ["Security", ["Cryptography / Fernet-encrypted face embeddings", "PDPA-aligned storage"]],
      ["Frontend", ["React 19", "Vite 8", "React Router v7", "Tailwind CSS v4", "Chart.js", "Leaflet"]],
      ["Integration", ["PHP 8+", "HTML/CSS/JS", "Webhook (POST JSON)", "WebSocket", "MJPEG streaming"]],
      ["Testing & Tooling", ["Pytest", "pytest-asyncio", "HTTPX", "Vitest", "Testing Library", "Ruff", "ESLint"]]
    ],
    features: [
      ["videocam", "Multi-Camera Monitoring", "Live MJPEG grid across webcam, RTSP/IP camera, analog CCTV, screen capture, and uploaded video, each on its own auto-reconnecting thread."],
      ["directions_car", "Thai ANPR & Vehicle Analytics", "YOLOv8 plate detector + EasyOCR reads Thai plates in any lighting, with an OpenCV fallback localizer and confidence-threshold filtering."],
      ["groups", "People & Vehicle Counting", "Line-crossing detection counts IN/OUT for people, cars, and motorcycles in real time, with grace-frame logic to prevent double counts from tracker drops."],
      ["notification_important", "Face Watchlist Alerts", "InsightFace (SCRFD + ArcFace) matches faces against an encrypted watchlist and fires instant alerts on a match."],
      ["dashboard", "Real-Time Dashboard", "REST + WebSocket + MJPEG API pushes new detections to the React dashboard instantly, no refresh needed."],
      ["extension", "Plugin-Based AI Pipeline", "New AI modules register via a PipelineBase interface and can be enabled/disabled per camera at runtime without editing core code."]
    ]
  }
};

function getProjectCardData(card) {
  const title = card.querySelector("h3")?.textContent?.trim() || "Project Card";
  const category = card.querySelector(".project-category")?.textContent?.trim() || "Project Detail";
  const summary = card.querySelector("p:not(.project-category)")?.textContent?.trim() || "";
  const role = card.querySelector(".project-role")?.textContent?.replace(/^Role:\s*/i, "").trim() || "Project contribution";
  const year = card.querySelector(".project-year")?.textContent?.trim();
  const status = card.querySelector(".project-status")?.textContent?.trim();
  const images = [...card.querySelectorAll(".project-media img")].map((img) => img.getAttribute("src")).filter(Boolean);
  const tags = [...card.querySelectorAll(".project-tags span")].map((tag) => tag.textContent.trim());
  const detail = projectDetails[title] || {};
  return {
    title,
    category,
    summary: detail.summary || summary,
    role: detail.role || role,
    overview: detail.overview || summary,
    images,
    image: images[0] || "",
    meta: [status, year].filter(Boolean),
    tags: detail.stack || tags,
    techGroups: detail.techGroups || [["Core Tools", detail.stack || tags]],
    features: detail.features || []
  };
}

function createPill(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function renderProjectOverlay(data) {
  if (!projectOverlay) return;
  projectDetailKicker.textContent = data.category;
  projectDetailTitle.textContent = data.title;
  projectDetailSummary.textContent = data.summary;
  projectDetailOverview.textContent = data.overview;
  projectDetailRole.textContent = data.role;
  projectHero.innerHTML = "";
  projectHero.style.backgroundImage = "";
  projectHero.style.display = "";
  projectHero.style.gridTemplateColumns = "";
  projectHero.style.gap = "";
  if (data.images && data.images.length > 1) {
    projectHero.style.display = "grid";
    projectHero.style.gridTemplateColumns = `repeat(${data.images.length}, 1fr)`;
    projectHero.style.gap = "2px";
    data.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.lightbox = "true";
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      projectHero.appendChild(img);
    });
  } else if (data.image) {
    const img = document.createElement("img");
    img.src = data.image;
    img.dataset.lightbox = "true";
    img.style.cssText = "width:100%;height:100%;object-fit:contain;display:block;";
    projectHero.appendChild(img);
  }
  projectDetailMeta.replaceChildren(...data.meta.map(createPill));
  projectDetailTags.replaceChildren(...data.tags.slice(0, 6).map(createPill));
  projectDetailTechTags?.replaceChildren(...data.techGroups.map(([label, items]) => {
    const group = document.createElement("section");
    group.className = "project-tech-group";
    const title = document.createElement("span");
    title.className = "project-tech-label";
    title.textContent = label;
    const tagsWrap = document.createElement("div");
    tagsWrap.className = "project-tech-tags";
    tagsWrap.replaceChildren(...items.map(createPill));
    group.replaceChildren(title, tagsWrap);
    return group;
  }));
  projectDetailFeatures?.replaceChildren(...data.features.map(([icon, title, description]) => {
    const card = document.createElement("article");
    card.className = "project-feature-card";
    card.innerHTML = `<span class="material-symbols-outlined">${icon}</span><strong></strong><p></p>`;
    card.querySelector("strong").textContent = title;
    card.querySelector("p").textContent = description;
    return card;
  }));
}

function openProjectOverlay(card) {
  if (!projectOverlay || !projectDialog) return;
  lastProjectTrigger = card;
  renderProjectOverlay(getProjectCardData(card));
  const sourceRect = card.getBoundingClientRect();
  projectDialog.style.setProperty("--origin-x", `${sourceRect.left + sourceRect.width / 2}px`);
  projectDialog.style.setProperty("--origin-y", `${sourceRect.top + sourceRect.height / 2}px`);
  projectOverlay.classList.remove("is-closing");
  projectOverlay.classList.add("is-open");
  projectOverlay.setAttribute("aria-hidden", "false");
  body.classList.add("project-overlay-open");
  requestAnimationFrame(() => projectDialog.focus({ preventScroll: true }));
}

function closeProjectOverlay() {
  if (!projectOverlay || !projectOverlay.classList.contains("is-open")) return;
  projectOverlay.classList.add("is-closing");
  projectOverlay.classList.remove("is-open");
  projectOverlay.setAttribute("aria-hidden", "true");
  body.classList.remove("project-overlay-open");
  window.setTimeout(() => {
    projectOverlay.classList.remove("is-closing");
    lastProjectTrigger?.focus?.({ preventScroll: true });
  }, 230);
}

projectOverlay?.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-project]")) {
    closeProjectOverlay();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectOverlay();
  }
});

spotifyMorph?.addEventListener("animationend", () => {
  spotifyMorph.classList.remove("is-active");
  miniSpotifyPanel?.classList.remove("is-morphing");
});

getIslandSurfaces().forEach((surface) => {
  surface.addEventListener("animationend", () => surface.classList.remove("is-receiving"));
});

projectIsland?.addEventListener("click", (event) => {
  if (event.target.closest(".island-control")) return;
  restoreSpotifyGlass();
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-haspopup", "dialog");

  let isPressing = false;

  function setTilt(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const strength = isPressing ? 34 : 18;
    const tiltX = (0.5 - y) * strength;
    const tiltY = (x - 0.5) * strength;

    card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    card.style.setProperty("--shine-x", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--shine-y", `${(y * 100).toFixed(1)}%`);
    card.classList.add("is-tilting");
  }

  function resetTilt() {
    isPressing = false;
    card.classList.remove("is-tilting", "is-pressing");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--shine-x", "50%");
    card.style.setProperty("--shine-y", "18%");
  }

  card.addEventListener("pointerenter", setTilt);
  card.addEventListener("pointermove", setTilt);
  card.addEventListener("pointerdown", (event) => {
    isPressing = true;
    card.classList.add("is-pressing");
    card.setPointerCapture?.(event.pointerId);
    setTilt(event);
  });
  card.addEventListener("pointerup", (event) => {
    isPressing = false;
    card.classList.remove("is-pressing");
    card.releasePointerCapture?.(event.pointerId);
    setTilt(event);
  });
  card.addEventListener("pointercancel", resetTilt);
  card.addEventListener("pointerleave", resetTilt);
  card.addEventListener("click", () => openProjectOverlay(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectOverlay(card);
    }
  });
});

window.addEventListener("scroll", updateWindowTransition, { passive: true });
window.addEventListener("resize", updateWindowTransition);
window.addEventListener("resize", () => updateNavSelection(sidebarNav?.getAttribute("data-active") || "projects"));
setWorkspaceView("projects");
updateWindowTransition();
updateNavSelection("projects");

// --- Card image carousel: cycle multi-image cards one at a time instead of a split view ---
document.querySelectorAll(".project-media").forEach((media) => {
  const imgs = [...media.querySelectorAll("img")];
  if (imgs.length < 2) return;
  imgs[0].classList.add("is-active");

  const dots = document.createElement("div");
  dots.className = "media-dots";
  imgs.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("is-active");
    dots.appendChild(dot);
  });
  media.appendChild(dots);
  const dotEls = [...dots.children];

  let index = 0;
  window.setInterval(() => {
    imgs[index].classList.remove("is-active");
    dotEls[index].classList.remove("is-active");
    index = (index + 1) % imgs.length;
    imgs[index].classList.add("is-active");
    dotEls[index].classList.add("is-active");
  }, 2600);
});

// --- Lightbox: click any project-detail-hero image to view it full size ---
const lightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("image-lightbox-img");
let lastLightboxTrigger = null;

function openLightbox(src, alt, trigger) {
  if (!lightbox || !lightboxImg) return;
  lastLightboxTrigger = trigger || null;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lastLightboxTrigger?.focus?.({ preventScroll: true });
}

projectHero?.addEventListener("click", (event) => {
  const img = event.target.closest("img[data-lightbox]");
  if (!img) return;
  openLightbox(img.src, img.alt, img);
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest("[data-close-lightbox]")) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

/* ── Search ── */
const projectsWindow = document.querySelector(".projects-window");
const searchBtn = projectsWindow?.querySelector('.icon-button[aria-label="Search projects"]');
const allProjectCards = document.querySelectorAll(".project-card");

const searchBar = document.createElement("div");
searchBar.className = "search-bar";
searchBar.setAttribute("role", "search");
searchBar.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">search</span><input type="search" placeholder="Search projects…" autocomplete="off" aria-label="Search projects" /><button class="search-close" type="button" aria-label="Close search"><span class="material-symbols-outlined">close</span></button>`;
projectsWindow?.querySelector(".window-bar")?.appendChild(searchBar);

const searchInput = searchBar.querySelector("input");
const searchCloseBtn = searchBar.querySelector(".search-close");

const searchEmpty = document.createElement("p");
searchEmpty.className = "search-empty";
searchEmpty.textContent = "No projects match your search.";
document.querySelector(".projects-grid")?.after(searchEmpty);

function filterProjects(query) {
  const q = query.toLowerCase().trim();
  let visibleCount = 0;
  allProjectCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const match = !q || text.includes(q);
    card.style.display = match ? "" : "none";
    if (match) visibleCount++;
  });
  searchEmpty.classList.toggle("visible", q.length > 0 && visibleCount === 0);
}

function openSearch() {
  projectsWindow?.classList.add("search-active");
  searchInput?.focus();
}

function closeSearch() {
  projectsWindow?.classList.remove("search-active");
  if (searchInput) searchInput.value = "";
  filterProjects("");
}

searchBtn?.addEventListener("click", () => {
  projectsWindow?.classList.contains("search-active") ? closeSearch() : openSearch();
});
searchInput?.addEventListener("input", () => filterProjects(searchInput.value));
searchCloseBtn?.addEventListener("click", closeSearch);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectsWindow?.classList.contains("search-active")) {
    closeSearch();
  }
});

/* ── Share ── */
const shareBtn = projectsWindow?.querySelector('.icon-button[aria-label="Share"]');
let shareToastTimer;

function showShareToast(msg) {
  let toast = document.getElementById("share-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "share-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    stage?.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(shareToastTimer);
  shareToastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

shareBtn?.addEventListener("click", async () => {
  const url = location.href;
  const shareData = { title: "Jirawat Kuankaew — Portfolio", url };
  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(url);
    showShareToast("Link copied!");
  } catch {
    showShareToast("Copy: " + url);
  }
});

function updateIslandPlayback(state) {
  if (!islandStatus) return;
  const isPlaying = !state.isPaused && !state.isBuffering;
  const statusText = state.isBuffering ? "Loading" : isPlaying ? "Now Playing" : "Paused";
  getIslandSurfaces().forEach((surface) => {
    surface.dataset.state = isPlaying ? "playing" : "paused";
    const status = surface.querySelector(".island-copy small");
    if (status) status.textContent = statusText;
  });
  islandControls.forEach((control) => {
    control.setAttribute("aria-label", isPlaying ? "Pause Self Control" : "Play Self Control");
    control.querySelector(".material-symbols-outlined").textContent = isPlaying ? "pause" : "play_arrow";
  });
}

if (spotifyEmbed) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    IFrameAPI.createController(
      spotifyEmbed,
      {
        width: "100%",
        height: 82,
        uri: "spotify:track:5GUYJTQap5F3RDQiCOJhrS",
        theme: "dark"
      },
      (EmbedController) => {
        spotifyController = EmbedController;
        islandControls.forEach((control) => {
          control.disabled = false;
        });
        EmbedController.addListener("playback_update", (event) => updateIslandPlayback(event.data));
      }
    );
  };

  const spotifyApiScript = document.createElement("script");
  spotifyApiScript.src = "https://open.spotify.com/embed/iframe-api/v1";
  spotifyApiScript.async = true;
  document.body.appendChild(spotifyApiScript);
}

islandControls.forEach((control) => control.addEventListener("click", () => {
  spotifyController?.togglePlay();
}));

const canvas = document.getElementById("orb-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const dots = [];
  const pointer = { x: -9999, y: -9999 };
  const config = { dotCount: 170, avoidRadius: 82, avoidStrength: 0.55, spring: 0.068, damping: 0.77, rotationX: 0.27, rotationY: 0 };
  let centerX = 0;
  let centerY = 0;
  let radius = 0;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerX = rect.width / 2;
    centerY = rect.height / 2;
    radius = Math.min(rect.width, rect.height) * 0.36;
    buildDots();
  }

  function buildDots() {
    dots.length = 0;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < config.dotCount; i += 1) {
      const y = 1 - (i / (config.dotCount - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      dots.push({ sx: Math.cos(theta) * ring, sy: y, sz: Math.sin(theta) * ring, x: centerX, y: centerY, vx: 0, vy: 0 });
    }
  }

  function project(dot) {
    const cosY = Math.cos(config.rotationY);
    const sinY = Math.sin(config.rotationY);
    const x = dot.sx * cosY + dot.sz * sinY;
    const z = -dot.sx * sinY + dot.sz * cosY;
    const cosX = Math.cos(config.rotationX);
    const sinX = Math.sin(config.rotationX);
    const y = dot.sy * cosX - z * sinX;
    const depth = dot.sy * sinX + z * cosX;
    const scale = 4 / (4 + depth);
    return { tx: centerX + x * radius * scale, ty: centerY + y * radius * scale, depth, scale };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    config.rotationY += 0.0037;
    const projected = dots.map((dot) => ({ dot, ...project(dot) })).sort((a, b) => a.depth - b.depth);
    projected.forEach(({ dot, tx, ty, depth, scale }) => {
      let forceX = (tx - dot.x) * config.spring;
      let forceY = (ty - dot.y) * config.spring;
      const dx = dot.x - pointer.x;
      const dy = dot.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < config.avoidRadius && distance > 0.01) {
        const push = (1 - distance / config.avoidRadius) * config.avoidStrength;
        forceX += (dx / distance) * push;
        forceY += (dy / distance) * push;
      }
      dot.vx = (dot.vx + forceX) * config.damping;
      dot.vy = (dot.vy + forceY) * config.damping;
      dot.x += dot.vx;
      dot.y += dot.vy;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, Math.max(1, 2.7 * scale), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45, 72, 104, ${0.2 + 0.54 * ((depth + 1) / 2)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  canvas.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });
  resizeCanvas();
  draw();
}

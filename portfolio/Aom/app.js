import { profileData, siteTextData, resumeData, techStackData, projectsData, certificatesData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Cursor Glow Follower Effect
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. 3D Interactive Cyber ID Card Tilt
  const cyberIdCard = document.getElementById('cyberIdCard');
  if (cyberIdCard) {
    cyberIdCard.addEventListener('mousemove', (e) => {
      const rect = cyberIdCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / (rect.height / 2)) * 12;
      const rotateY = (x / (rect.width / 2)) * 12;

      cyberIdCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    cyberIdCard.addEventListener('mouseleave', () => {
      cyberIdCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  // Comprehensive Site & Profile Renderer from data.js
  function renderAllSiteData(profile, siteText, resume) {
    if (!profile) return;

    // Brand Logo Name
    const brandName = document.querySelector('.brand-logo span');
    if (brandName) {
      const firstName = profile.name ? profile.name.split(' ')[0] : 'Phanuwat';
      brandName.innerHTML = `${firstName}<span class="cyan-text">.Dev</span>`;
    }

    // Hero Section Subtitle, Title & Bio
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && siteText?.hero?.subtitle) {
      heroSubtitle.innerHTML = `<i data-lucide="radio"></i> ${siteText.hero.subtitle}`;
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && siteText?.hero) {
      heroTitle.innerHTML = `${siteText.hero.titleMain} <span class="gradient-text">${siteText.hero.titleGradient}</span>`;
    }

    const heroBio = document.querySelector('.hero-description');
    if (heroBio && profile.bio) heroBio.textContent = profile.bio;

    const heroBtnPrimary = document.querySelector('.hero-actions a.btn-primary');
    if (heroBtnPrimary && siteText?.hero?.ctaPrimary) {
      heroBtnPrimary.innerHTML = `<i data-lucide="message-square"></i> ${siteText.hero.ctaPrimary}`;
    }

    const heroBtnSecondary = document.querySelector('#openResumeBtn');
    if (heroBtnSecondary && siteText?.hero?.ctaSecondary) {
      heroBtnSecondary.innerHTML = `<i data-lucide="file-text"></i> ${siteText.hero.ctaSecondary}`;
    }

    // Hero Stats
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length >= 3 && profile.stats) {
      const { experienceYears, projectsCompleted, codeCommits } = profile.stats;
      if (experienceYears) {
        statItems[0].querySelector('.stat-value').textContent = experienceYears.value;
        statItems[0].querySelector('.stat-label').textContent = experienceYears.label;
      }
      if (projectsCompleted) {
        statItems[1].querySelector('.stat-value').textContent = projectsCompleted.value;
        statItems[1].querySelector('.stat-label').textContent = projectsCompleted.label;
      }
      if (codeCommits) {
        statItems[2].querySelector('.stat-value').textContent = codeCommits.value;
        statItems[2].querySelector('.stat-label').textContent = codeCommits.label;
      }
    }

    // 3D Cyber ID Card
    const idCode = document.querySelector('.id-card-code');
    if (idCode && profile.idCode) idCode.textContent = profile.idCode;

    const idStatus = document.querySelector('.id-card-header .status-pill');
    if (idStatus && profile.status) {
      idStatus.innerHTML = `<span class="status-dot"></span> ${profile.status}`;
    }

    const idName = document.querySelector('.id-name');
    if (idName && profile.name) idName.textContent = profile.name;

    const idHandle = document.querySelector('.id-handle');
    if (idHandle && profile.handle) idHandle.textContent = profile.handle;

    const idRole = document.querySelector('.id-role');
    if (idRole && profile.title) idRole.textContent = profile.title;

    const avatarImg = document.querySelector('.id-avatar-img');
    if (avatarImg && profile.avatar) {
      avatarImg.src = profile.avatar;
      avatarImg.alt = `${profile.name} Avatar`;
    }

    const idLocation = document.querySelector('.id-details div:last-child');
    if (idLocation && profile.location) {
      idLocation.innerHTML = `<i data-lucide="map-pin" style="width: 12px; height: 12px; display: inline;"></i> ${profile.location}`;
    }

    const idCoreStack = document.querySelector('.cyber-id-card > div:nth-last-child(2)');
    if (idCoreStack && profile.coreStackText) {
      idCoreStack.innerHTML = `<i data-lucide="cpu" style="width: 14px; height: 14px; vertical-align: middle; color: var(--accent-cyan);"></i> ${profile.coreStackText}`;
    }

    const idSecurityVerified = document.querySelector('.id-card-footer span');
    if (idSecurityVerified && profile.securityVerifiedText) {
      idSecurityVerified.textContent = profile.securityVerifiedText;
    }

    // Showcase Section Header
    const showcaseTag = document.querySelector('#showcase .section-tag');
    if (showcaseTag && siteText?.showcase?.tag) {
      showcaseTag.innerHTML = `<i data-lucide="grid"></i> ${siteText.showcase.tag}`;
    }
    const showcaseTitle = document.querySelector('#showcase .section-title');
    if (showcaseTitle && siteText?.showcase) {
      showcaseTitle.innerHTML = `${siteText.showcase.titleMain} <span class="gradient-text">${siteText.showcase.titleGradient}</span>`;
    }
    const showcaseDesc = document.querySelector('#showcase .section-desc');
    if (showcaseDesc && siteText?.showcase?.description) {
      showcaseDesc.textContent = siteText.showcase.description;
    }

    // Contact Section Header & Direct Signals
    const contactTag = document.querySelector('#contact .section-tag');
    if (contactTag && siteText?.contact?.tag) {
      contactTag.innerHTML = `<i data-lucide="terminal"></i> ${siteText.contact.tag}`;
    }
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle && siteText?.contact) {
      contactTitle.innerHTML = `${siteText.contact.titleMain} <span class="gradient-text">${siteText.contact.titleGradient}</span>`;
    }
    const contactDesc = document.querySelector('#contact .section-desc');
    if (contactDesc && siteText?.contact?.description) {
      contactDesc.textContent = siteText.contact.description;
    }

    const directSignalsTitle = document.querySelector('.contact-card h3');
    if (directSignalsTitle && siteText?.contact?.directSignalsTitle) {
      directSignalsTitle.textContent = siteText.contact.directSignalsTitle;
    }
    const directSignalsDesc = document.querySelector('.contact-card p');
    if (directSignalsDesc && siteText?.contact?.directSignalsDesc) {
      directSignalsDesc.textContent = siteText.contact.directSignalsDesc;
    }

    const contactEmailEl = document.querySelector('#contact .font-mono');
    if (contactEmailEl && profile.socials?.email) {
      contactEmailEl.textContent = profile.socials.email;
    }

    const responseTimeEl = document.querySelector('#contact .cyan-text');
    if (responseTimeEl && siteText?.contact?.responseTime) {
      responseTimeEl.textContent = siteText.contact.responseTime;
    }

    // Social Links
    if (profile.socials) {
      if (profile.socials.github) {
        document.querySelectorAll('a[href*="github.com"]').forEach(a => a.href = profile.socials.github);
      }
      if (profile.socials.instagram) {
        document.querySelectorAll('a[href*="instagram.com"]').forEach(a => a.href = profile.socials.instagram);
      }
      if (profile.socials.facebook) {
        document.querySelectorAll('a[href*="facebook.com"]').forEach(a => a.href = profile.socials.facebook);
      }
    }

    // Resume Modal Content
    if (resume) {
      const resumeTitleEl = document.querySelector('#resumeModal h2');
      if (resumeTitleEl && resume.title) resumeTitleEl.textContent = resume.title;

      const resumeBadgeEl = document.querySelector('#resumeModal .font-mono');
      if (resumeBadgeEl && resume.badge) resumeBadgeEl.textContent = resume.badge;

      const resumeSummaryEl = document.querySelector('#resumeModal p');
      if (resumeSummaryEl && resume.summary) resumeSummaryEl.textContent = resume.summary;
    }

    // Footer
    const footerName = document.querySelector('.footer div > div:first-child');
    if (footerName && profile.name) footerName.textContent = `${profile.name} Portfolio`;

    const footerTagline = document.querySelector('.footer .font-mono');
    if (footerTagline && siteText?.footer?.tagline) footerTagline.textContent = siteText.footer.tagline;

    const footerCopyright = document.querySelectorAll('.footer .font-mono')[1];
    if (footerCopyright && siteText?.footer?.copyright) footerCopyright.textContent = siteText.footer.copyright;

    if (window.lucide) window.lucide.createIcons();
  }

  // Execute comprehensive site render
  renderAllSiteData(profileData, siteTextData, resumeData);

  // 3. Render Functions
  function renderProjects(gridElement, items) {
    gridElement.innerHTML = items.map(proj => {
      const coverImg = (proj.images && proj.images.length > 0) ? proj.images[0] : (proj.image || '');
      return `
        <div class="project-card" data-project-id="${proj.id}">
          <div class="project-image-wrapper">
            <img src="${coverImg}" alt="${proj.title}" class="project-image" loading="lazy">
            <div class="project-overlay-badge">${proj.category}</div>
          </div>
          <div class="project-content">
            <div class="project-tags">
              ${proj.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-summary">${proj.summary}</p>
            <div class="project-footer">
              <span class="project-link">
                Explore Specs <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
              <div style="display: flex; gap: 0.5rem;">
                <a href="${proj.repoUrl}" target="_blank" onclick="event.stopPropagation();" class="social-icon-btn" title="Repository">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click handlers to open details modal
    gridElement.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.projectId;
        const project = projectsData.find(p => p.id === id);
        if (project) openProjectModal(project);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderTechStack(gridElement, items) {
    const levelOrder = { 'excellent': 1, 'good': 2, 'practicing': 3 };
    const sortedItems = [...items].sort((a, b) => {
      const orderA = levelOrder[a.level?.toLowerCase()] || 99;
      const orderB = levelOrder[b.level?.toLowerCase()] || 99;
      return orderA - orderB;
    });

    gridElement.innerHTML = sortedItems.map(tech => `
      <div class="tech-card">
        <div class="tech-card-header">
          <div class="tech-icon-box">
            <i data-lucide="${tech.icon || 'cpu'}" style="width: 20px; height: 20px;"></i>
          </div>
          <span class="tech-level-text">${tech.level ? tech.level.toUpperCase() : ''}</span>
        </div>
        <div class="tech-name">${tech.name}</div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Certificate Modal Handler
  const certImageModal = document.getElementById('certImageModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const closeCertModalBtn = document.getElementById('closeCertModalBtn');

  function openCertImageModal(src, title) {
    if (!certImageModal || !certModalImg) return;
    certModalImg.src = src;
    if (certModalTitle) certModalTitle.textContent = title;
    certImageModal.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
  }

  if (closeCertModalBtn && certImageModal) {
    closeCertModalBtn.addEventListener('click', () => certImageModal.classList.remove('open'));
  }
  if (certImageModal) {
    certImageModal.addEventListener('click', (e) => {
      if (e.target === certImageModal) certImageModal.classList.remove('open');
    });
  }

  function renderCertificates(gridElement, items) {
    gridElement.innerHTML = items.map(cert => {
      const certImg = cert.image || (cert.verifyUrl && (cert.verifyUrl.includes('.jpg') || cert.verifyUrl.includes('.png') || cert.verifyUrl.includes('.jpeg') || cert.verifyUrl.startsWith('assets/')) ? cert.verifyUrl : null);

      return `
        <div class="cert-card" data-cert-id="${cert.id}">
          <div class="cert-card-header">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div class="cert-icon">
                <i data-lucide="${cert.badgeIcon || 'award'}" style="width: 24px; height: 24px;"></i>
              </div>
              <span class="cert-code font-mono">${cert.date}</span>
            </div>
            <div style="margin-top: 0.8rem;">
              <h3 class="cert-title">${cert.title}</h3>
              <div class="cert-issuer">${cert.issuer}</div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.8rem;">
              ${cert.skills ? cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('') : ''}
            </div>
          </div>

          <div class="cert-card-actions">
            <button class="cert-toggle-btn" type="button">
              <span class="btn-text">ขยายดูใบประกาศนียบัตร</span>
              <i data-lucide="chevron-down" class="chevron-icon"></i>
            </button>
            ${cert.verifyUrl && !cert.verifyUrl.startsWith('assets/') ? `
              <a href="${cert.verifyUrl}" target="_blank" onclick="event.stopPropagation();" class="cert-verify-link" title="Verify Credentials">
                <i data-lucide="external-link" style="width: 13px; height: 13px;"></i> Verify
              </a>
            ` : ''}
          </div>

          <div class="cert-drawer">
            <div class="cert-drawer-content">
              ${certImg ? `
                <div class="cert-image-wrapper">
                  <img src="${certImg}" alt="${cert.title}" class="cert-preview-img" loading="lazy">
                  <div class="cert-image-overlay">
                    <span><i data-lucide="maximize-2" style="width: 16px; height: 16px;"></i> คลิกเพื่อดูรูปภาพขนาดเต็ม</span>
                  </div>
                </div>
              ` : `
                <div class="cert-no-img">
                  <i data-lucide="award" style="width: 36px; height: 36px; color: var(--accent-cyan);"></i>
                  <span>ไม่มีรูปภาพตัวอย่างสำหรับใบรับรองนี้</span>
                </div>
              `}

              ${cert.description ? `<p class="cert-description">${cert.description}</p>` : ''}

              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach click listeners for expand/collapse and image modal
    gridElement.querySelectorAll('.cert-card').forEach(card => {
      const toggleBtn = card.querySelector('.cert-toggle-btn');
      const imgWrapper = card.querySelector('.cert-image-wrapper');

      // Click card header or toggle button to expand/collapse inline
      const toggleDrawer = (e) => {
        // Prevent toggle if user clicks direct link or image preview
        if (e.target.closest('a') || e.target.closest('.cert-image-wrapper')) return;

        const isExpanded = card.classList.contains('expanded');

        // Close all other expanded certificate cards in the document
        document.querySelectorAll('.cert-card.expanded').forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            const otherBtnText = otherCard.querySelector('.cert-toggle-btn .btn-text');
            if (otherBtnText) otherBtnText.textContent = 'ขยายดูใบประกาศนียบัตร';
          }
        });

        if (isExpanded) {
          card.classList.remove('expanded');
          if (toggleBtn) {
            const btnText = toggleBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'ขยายดูใบประกาศนียบัตร';
          }
        } else {
          card.classList.add('expanded');
          if (toggleBtn) {
            const btnText = toggleBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'ย่อรายละเอียด';
          }
        }
      };

      card.addEventListener('click', toggleDrawer);

      // Lightbox modal view when image is clicked
      if (imgWrapper) {
        imgWrapper.addEventListener('click', (e) => {
          e.stopPropagation();
          const img = imgWrapper.querySelector('.cert-preview-img');
          const title = card.querySelector('.cert-title')?.textContent || 'Certificate Preview';
          if (img) openCertImageModal(img.src, title);
        });
      }
    });
  }

  // 4. Initial Showcase Grid & Tab Controller
  const showcaseGrid = document.getElementById('showcaseGrid');
  const showcaseTabs = document.getElementById('showcaseTabs');
  const techStackGrid = document.getElementById('techStackGrid');
  const certificatesGrid = document.getElementById('certificatesGrid');

  if (showcaseGrid) {
    renderProjects(showcaseGrid, projectsData);
  }
  if (techStackGrid) {
    renderTechStack(techStackGrid, techStackData);
  }
  if (certificatesGrid) {
    renderCertificates(certificatesGrid, certificatesData);
  }

  if (showcaseTabs) {
    showcaseTabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showcaseTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        if (tab === 'all') {
          renderProjects(showcaseGrid, projectsData);
        } else if (tab === 'projects') {
          renderProjects(showcaseGrid, projectsData.filter(p => p.featured || p.category === 'Full Stack'));
        } else if (tab === 'certificates') {
          renderCertificates(showcaseGrid, certificatesData);
        } else if (tab === 'tech') {
          renderTechStack(showcaseGrid, techStackData);
        }
      });
    });
  }

  // 5. Project Modal Handlers
  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalContent');

  function openProjectModal(project) {
    if (!projectModal || !projectModalContent) return;

    const images = (project.images && project.images.length > 0) ? project.images : [project.image || ''];
    let currentSlide = 0;

    projectModalContent.innerHTML = `
      <button class="modal-close-btn" id="closeProjModalBtn" aria-label="Back"><i data-lucide="arrow-left"></i></button>
      
      <div class="project-modal-slider">
        <div class="slider-stage">
          <img id="modalSliderImg" src="${images[0]}" alt="${project.title}">
          <div class="project-category-badge">
            ${project.category}
          </div>
          ${images.length > 1 ? `
            <button type="button" class="slider-arrow prev-arrow" id="sliderPrevBtn" aria-label="Previous image">
              <i data-lucide="chevron-left"></i>
            </button>
            <button type="button" class="slider-arrow next-arrow" id="sliderNextBtn" aria-label="Next image">
              <i data-lucide="chevron-right"></i>
            </button>
            <div class="slider-counter font-mono">
              <span id="currentSlideIdx">1</span> / ${images.length}
            </div>
            <div class="slider-dots" id="sliderDots">
              ${images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>

      <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">${project.title}</h2>
      
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.2rem;">
        ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
        ${project.details}
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${project.repoUrl}" target="_blank" class="btn btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.4rem; vertical-align: middle;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> View Source Code
        </a>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    projectModal.classList.add('open');

    // Attach slider controls if multiple images exist
    if (images.length > 1) {
      const sliderImg = document.getElementById('modalSliderImg');
      const currentIdxEl = document.getElementById('currentSlideIdx');
      const dots = document.querySelectorAll('#sliderDots .dot');
      const prevBtn = document.getElementById('sliderPrevBtn');
      const nextBtn = document.getElementById('sliderNextBtn');

      const updateSlide = (newIdx) => {
        currentSlide = (newIdx + images.length) % images.length;
        if (sliderImg) {
          sliderImg.style.opacity = '0';
          setTimeout(() => {
            sliderImg.src = images[currentSlide];
            sliderImg.style.opacity = '1';
          }, 120);
        }
        if (currentIdxEl) currentIdxEl.textContent = currentSlide + 1;
        dots.forEach((dot, idx) => {
          if (idx === currentSlide) dot.classList.add('active');
          else dot.classList.remove('active');
        });
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlide(currentSlide - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlide(currentSlide + 1);
        });
      }
      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(dot.dataset.idx, 10);
          updateSlide(idx);
        });
      });
    }

    const closeBtn = document.getElementById('closeProjModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => projectModal.classList.remove('open'));
    }
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.remove('open');
    });
  }

  // 6. Resume Modal Handlers
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => resumeModal.classList.add('open'));
  }
  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => resumeModal.classList.remove('open'));
  }
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.classList.remove('open');
    });
  }

  // 7. Contact Form Terminal Transmission Simulation
  const contactForm = document.getElementById('contactForm');
  const terminalLog = document.getElementById('terminalLog');

  if (contactForm && terminalLog) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;

      terminalLog.innerHTML += `
        <div class="log-line">
          <span class="log-prompt">&gt;</span>
          <span style="color: var(--accent-cyan);">[ENCRYPTING] Payload signed from ${name} &lt;${email}&gt;...</span>
        </div>
      `;

      setTimeout(() => {
        terminalLog.innerHTML += `
          <div class="log-line">
            <span class="log-prompt">&gt;</span>
            <span style="color: var(--accent-blue);">[TRANSMITTING] Connecting to ${profileData.name} neural endpoint...</span>
          </div>
        `;
        terminalLog.scrollTop = terminalLog.scrollHeight;
      }, 600);

      setTimeout(() => {
        terminalLog.innerHTML += `
          <div class="log-line">
            <span class="log-prompt">&gt;</span>
            <span style="color: #00ffc2; font-weight: 700;">[SUCCESS] Transmission delivered! Confirmation sent to ${email}.</span>
          </div>
        `;
        terminalLog.scrollTop = terminalLog.scrollHeight;
        contactForm.reset();
      }, 1500);
    });
  }

  // 8. Sticky Header Scroll Effect & Active Nav Link Highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

/* ============================================================
   PHANUWAT AUDKANTHAR — app-v2.js
   ------------------------------------------------------------
   ทุกอย่างในไฟล์นี้เช็คก่อนว่ามีของจริงไหมแล้วค่อยทำงาน
   ถ้าส่วนไหนหายไปส่วนอื่นต้องไม่พังตาม

   1. ตัวช่วย
   2. สร้างการ์ดผลงาน / ใบประกาศ / ทักษะ จาก data-v2.js
   3. BOOT SEQUENCE
   4. ตัวอักษรสุ่มแล้วเข้าที่ (decode)
   5. โผล่ตอนเลื่อนถึง + แถบนำทางซ้าย
   6. เส้นกากบาทตามเมาส์ + แผงประจำตัวเอียงตามเมาส์
   7. เมนูจอเล็ก
   8. MODAL + แกลเลอรีรูป
   9. ฟอร์มติดต่อ (เปิดโปรแกรมอีเมล)
   ============================================================ */

(function () {
  'use strict';

  /* บรรทัดแรกสุดโดยตั้งใจ — CSS จะซ่อนของที่รอโผล่ก็ต่อเมื่อเห็น
     คลาสนี้เท่านั้น ถ้าโค้ดข้างล่างพัง อย่างน้อยหน้าเว็บก็ยังอ่านได้ครบ */
  document.documentElement.classList.add('js');

  var DATA = window.AOM_DATA || { projects: [], certificates: [], stack: [] };
  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ==========================================================
     1. ตัวช่วย
     ========================================================== */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* กันข้อความจากข้อมูลไปแตก HTML — ข้อมูลเราเองก็จริง
     แต่วันหลังใครมาแก้แล้วใส่ < > เข้าไปจะได้ไม่พัง */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /* ==========================================================
     2. สร้างเนื้อหาจากข้อมูล
     ========================================================== */

  /* --- กล่องรูปที่ใช้ซ้ำทุกที่ ---------------------------------
     รูปผลงานมีสัดส่วนไม่เท่ากัน (สกรีนช็อตมือถือแนวตั้ง vs
     ภาพหน้าจอคอมแนวนอน) ถ้า crop ให้เท่ากันรูปมือถือจะเหลือ
     แค่ตรงกลาง เลยวางรูปเต็มใบไว้บนฉากหลังที่เป็นรูปเดียวกัน
     แบบเบลอ — เห็นครบทั้งใบ และที่ว่างข้างๆ ก็ไม่โล่ง */
  function shotHTML(src, alt, cls) {
    return '<div class="shot ' + (cls || '') + '">' +
      '<img class="shot__bg" src="' + esc(src) + '" alt="" aria-hidden="true">' +
      '<img class="shot__img" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">' +
      '<span class="shot__grid" aria-hidden="true"></span>' +
      '<span class="shot__scan" aria-hidden="true"></span>' +
      '</div>';
  }

  function buildProjects() {
    var box = $('#cards');
    if (!box || !DATA.projects.length) return;

    box.innerHTML = DATA.projects.map(function (p, i) {
      var tags = p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      return '' +
        '<article class="card" data-project="' + esc(p.id) + '" data-reveal style="--d:' + (i * 90) + 'ms">' +
        '<span class="card__corner" aria-hidden="true"></span>' +
        '<span class="card__corner" aria-hidden="true"></span>' +
        shotHTML(p.images[0], p.title) +
        '<div>' +
        '<p class="card__meta"><span class="card__idx">' + pad(i + 1) + '</span>' +
        '<span>' + esc(p.category) + '</span><span>' + esc(p.year) + '</span></p>' +
        '<h3 class="card__t">' + esc(p.title) + '</h3>' +
        '<p class="card__th">' + esc(p.titleTh) + '</p>' +
        '<p class="card__d">' + esc(p.summary) + '</p>' +
        '<ul class="tags">' + tags + '</ul>' +
        '<button class="card__go" type="button">Open case' +
        '<svg aria-hidden="true"><use href="#i-arrow"/></svg></button>' +
        '</div>' +
        '</article>';
    }).join('');
  }

  function buildCerts() {
    var box = $('#certs-grid');
    if (!box || !DATA.certificates.length) return;

    box.innerHTML = DATA.certificates.map(function (c, i) {
      var skills = c.skills.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
      return '' +
        '<a class="cert" href="' + esc(c.image) + '" target="_blank" rel="noopener"' +
        ' data-reveal style="--d:' + (i * 90) + 'ms">' +
        shotHTML(c.image, c.title) +
        '<div class="cert__in">' +
        '<p class="cert__meta"><svg aria-hidden="true" style="width:14px;height:14px"><use href="#i-award"/></svg>' +
        esc(c.year) + ' · ' + esc(c.code) + '</p>' +
        '<h3 class="h3">' + esc(c.title) + '</h3>' +
        '<p class="cert__issuer">' + esc(c.issuer) + '</p>' +
        '<p class="cert__d">' + esc(c.description) + '</p>' +
        '<ul class="tags">' + skills + '</ul>' +
        '<span class="cert__go">เปิดใบประกาศ' +
        '<svg aria-hidden="true"><use href="#i-arrow"/></svg></span>' +
        '</div></a>';
    }).join('');
  }

  function buildStack() {
    var box = $('#stack-grid');
    if (!box || !DATA.stack.length) return;

    var dotsFor = { excellent: 3, good: 2, learning: 1 };

    box.innerHTML = DATA.stack.map(function (g, i) {
      var items = g.items.map(function (it) {
        var n = dotsFor[it.level] || 1;
        var dots = '';
        for (var d = 1; d <= 3; d++) dots += '<i class="' + (d <= n ? 'on' : '') + '"></i>';
        var label = it.level === 'excellent' ? 'ใช้คล่อง' : (it.level === 'good' ? 'ใช้ได้' : 'กำลังฝึก');
        return '<div class="stack__i"><span>' + esc(it.name) + '</span>' +
          '<span class="dots" role="img" aria-label="' + label + '">' + dots + '</span></div>';
      }).join('');

      return '<div class="stack__g" data-reveal style="--d:' + (i * 70) + 'ms">' +
        '<p class="stack__t">' + esc(g.group) + '</p>' + items + '</div>';
    }).join('');
  }

  buildProjects();
  buildCerts();
  buildStack();

  /* ==========================================================
     3. BOOT SEQUENCE
     ----------------------------------------------------------
     ข้ามได้ทุกเมื่อ และไม่แสดงเลยถ้าผู้ใช้ตั้งเครื่องให้ลดการ
     เคลื่อนไหว — ไม่มีใครควรถูกบังคับให้รอดูอนิเมชัน
     ========================================================== */
  (function boot() {
    var el = $('#boot');
    if (!el || noMotion) return;

    var log = $('#bootLog');
    var bar = $('#bootBar');
    var lines = [
      '&gt; init portfolio.sys',
      '&gt; loading profile ............ <b>ok</b>',
      '&gt; projects [' + DATA.projects.length + '] certificates [' +
      DATA.certificates.length + '] ... <b>ok</b>',
      '&gt; <b>ready</b>'
    ];

    el.classList.add('is-on');
    document.documentElement.style.overflow = 'hidden';

    var i = 0, done = false;
    var timers = [];

    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      el.classList.add('is-off');
      document.documentElement.style.overflow = '';
      document.removeEventListener('click', finish);
      document.removeEventListener('keydown', finish);
      setTimeout(function () { el.classList.remove('is-on', 'is-off'); }, 600);
    }

    function step() {
      if (i < lines.length) {
        log.innerHTML += '<div>' + lines[i] + '</div>';
        bar.style.width = Math.round(((i + 1) / lines.length) * 100) + '%';
        i++;
        timers.push(setTimeout(step, 260));
      } else {
        timers.push(setTimeout(finish, 380));
      }
    }

    step();
    document.addEventListener('click', finish);
    document.addEventListener('keydown', finish);
    /* กันเหนียว: ถ้ามีอะไรพลาด ยังไงก็ต้องเปิดหน้าเว็บให้ได้ */
    timers.push(setTimeout(finish, 3500));
  })();

  /* ==========================================================
     4. ตัวอักษรสุ่มแล้วเข้าที่
     ----------------------------------------------------------
     ข้อความจริงอยู่ใน HTML อยู่แล้ว ตรงนี้แค่เอามาเล่น
     ตัวไทยสุ่มด้วยพยัญชนะไทย ตัวอังกฤษสุ่มด้วยอักษรอังกฤษ
     ถ้าสุ่มมั่วข้ามภาษา ความกว้างบรรทัดจะเปลี่ยนแล้วหน้าเว็บกระตุก
     ========================================================== */
  var LAT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=/<>[]';
  var THA = 'กขคงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ';

  function randLike(ch) {
    if (/\s/.test(ch)) return ch;
    if (ch >= '฀' && ch <= '๿') return THA[Math.floor(Math.random() * THA.length)];
    return LAT[Math.floor(Math.random() * LAT.length)];
  }

  function decode(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    if (noMotion) return;

    /* เก็บเฉพาะ text node จะได้ไม่ทำลาย <br> ที่คั่นบรรทัดอยู่ */
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var parts = [], node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim()) parts.push({ node: node, text: node.nodeValue });
    }
    if (!parts.length) return;

    var total = parts.reduce(function (a, p) { return a + p.text.length; }, 0);
    var start = null;
    var DUR = 620;

    el.classList.add('is-decoding');

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / DUR, 1);
      var shown = Math.floor(t * total);
      var seen = 0;

      parts.forEach(function (p) {
        var out = '';
        for (var i = 0; i < p.text.length; i++) {
          out += (seen + i) < shown ? p.text[i] : randLike(p.text[i]);
        }
        p.node.nodeValue = out;
        seen += p.text.length;
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        parts.forEach(function (p) { p.node.nodeValue = p.text; });
        el.classList.remove('is-decoding');
      }
    }
    requestAnimationFrame(frame);
  }

  /* ==========================================================
     5. โผล่ตอนเลื่อนถึง + แถบนำทางซ้าย + เมนูบนที่ไฮไลต์เอง
     ========================================================== */
  var revealables = $$('[data-reveal]');
  var decodables = $$('[data-decode]');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .08 });

    revealables.forEach(function (el) { io.observe(el); });

    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        decode(en.target);
        dio.unobserve(en.target);
      });
    }, { threshold: .3 });

    decodables.forEach(function (el) { dio.observe(el); });

    /* section ไหนอยู่กลางจอ ให้ไฮไลต์ทั้งแถบซ้ายและเมนูบน */
    var railLinks = {}, navLinks = {};
    $$('[data-rail]').forEach(function (a) { railLinks[a.getAttribute('data-rail')] = a; });
    $$('.nav__links a').forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (id) navLinks[id] = a;
    });

    var sections = $$('main section[id]');
    if (sections.length) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id;
          Object.keys(railLinks).forEach(function (k) { railLinks[k].classList.remove('is-on'); });
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove('is-on'); });
          if (railLinks[id]) railLinks[id].classList.add('is-on');
          if (navLinks[id]) navLinks[id].classList.add('is-on');
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      sections.forEach(function (s) { sio.observe(s); });
    }
  } else {
    /* เบราว์เซอร์เก่า: แสดงทุกอย่างเลย ดีกว่าไม่เห็นอะไร */
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ==========================================================
     6. เส้นกากบาทตามเมาส์ + แผงประจำตัวเอียงตามเมาส์
     ทั้งคู่ทำงานเฉพาะเครื่องที่ใช้เมาส์จริง — บนมือถือไม่มีเมาส์
     ให้ตาม และการเอียงจะกวนตอนเลื่อนหน้า
     ========================================================== */
  if (finePointer && !noMotion) {
    var cross = $('#cross');
    if (cross) {
      var ch = $('.cross__h', cross), cv = $('.cross__v', cross), cb = $('b', cross);
      var cx = 0, cy = 0, queued = false;
      cross.classList.add('is-on');

      document.addEventListener('mousemove', function (e) {
        cx = e.clientX; cy = e.clientY;
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          ch.style.top = cy + 'px';
          cv.style.left = cx + 'px';
          cb.style.left = cx + 'px';
          cb.style.top = cy + 'px';
          cb.textContent = pad(cx) + ' / ' + pad(cy);
        });
      });
    }

    var idc = $('#idc');
    if (idc) {
      idc.addEventListener('mousemove', function (e) {
        var r = idc.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        idc.style.transform =
          'perspective(900px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' +
          (-py * 7).toFixed(2) + 'deg)';
      });
      idc.addEventListener('mouseleave', function () { idc.style.transform = ''; });
    }
  }

  /* ==========================================================
     7. เมนูจอเล็ก
     ========================================================== */
  (function menu() {
    var burger = $('#burger'), links = $('#navLinks');
    if (!burger || !links) return;

    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
    });

    links.addEventListener('click', function (e) {
      if (!e.target.closest('a')) return;
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  })();

  /* ==========================================================
     8. MODAL + แกลเลอรีรูป
     ========================================================== */
  (function modal() {
    var box = $('#modal');
    if (!box) return;

    var win = $('#modalWin'), body = $('#modalBody'),
      file = $('#modalFile'), closeBtn = $('#modalClose');
    var lastFocus = null, slides = [], at = 0;

    function show(idx) {
      if (!slides.length) return;
      at = (idx + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-on', i === at); });
      $$('.gal__dots button', box).forEach(function (d, i) {
        d.classList.toggle('is-on', i === at);
        d.setAttribute('aria-current', i === at ? 'true' : 'false');
      });
      var c = $('.gal__count', box);
      if (c) c.textContent = pad(at + 1) + ' / ' + pad(slides.length);
    }

    function open(p) {
      var imgs = p.images.map(function (src, i) {
        return '<div class="gal__slide' + (i === 0 ? ' is-on' : '') + '">' +
          shotHTML(src, p.title + ' — รูปที่ ' + (i + 1)) + '</div>';
      }).join('');

      var many = p.images.length > 1;
      var dots = many ? '<div class="gal__dots">' + p.images.map(function (_, i) {
        return '<button type="button" class="' + (i === 0 ? 'is-on' : '') +
          '" aria-label="รูปที่ ' + (i + 1) + '"></button>';
      }).join('') + '</div>' : '';

      var nav = many ?
        '<button class="gal__nav gal__nav--prev" type="button" aria-label="รูปก่อนหน้า">' +
        '<svg aria-hidden="true"><use href="#i-left"/></svg></button>' +
        '<button class="gal__nav gal__nav--next" type="button" aria-label="รูปถัดไป">' +
        '<svg aria-hidden="true"><use href="#i-right"/></svg></button>' +
        '<span class="gal__count">01 / ' + pad(p.images.length) + '</span>' : '';

      var specs = p.metrics.map(function (m) {
        return '<div class="spec__r"><dt>' + esc(m.k) + '</dt><dd>' + esc(m.v) + '</dd></div>';
      }).join('');

      var tags = p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');

      body.innerHTML = '' +
        '<div class="gal"><div class="gal__stage">' + imgs + nav + '</div>' + dots + '</div>' +
        '<div class="modal__head">' +
        '<p class="card__meta"><span class="card__idx">' + esc(p.year) + '</span>' +
        '<span>' + esc(p.category) + '</span></p>' +
        '<h2 class="h2" id="modalTitle">' + esc(p.title) + '</h2>' +
        '<p class="card__th">' + esc(p.titleTh) + '</p></div>' +
        '<div class="modal__two">' +
        '<div><p class="modal__d">' + esc(p.details) + '</p>' +
        '<ul class="tags">' + tags + '</ul>' +
        (p.repoUrl ? '<div class="btns" style="margin-top:22px">' +
          '<a class="btn" href="' + esc(p.repoUrl) + '" target="_blank" rel="noopener">' +
          '<span>Repository</span><svg class="btn__i" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>' : '') +
        '</div><dl class="spec">' + specs + '</dl></div>';

      file.innerHTML = '<b>' + esc(p.id) + '</b> &nbsp;/&nbsp; case file';

      slides = $$('.gal__slide', box);
      at = 0;

      var prev = $('.gal__nav--prev', box), next = $('.gal__nav--next', box);
      if (prev) prev.addEventListener('click', function () { show(at - 1); });
      if (next) next.addEventListener('click', function () { show(at + 1); });
      $$('.gal__dots button', box).forEach(function (d, i) {
        d.addEventListener('click', function () { show(i); });
      });

      lastFocus = document.activeElement;
      box.hidden = false;
      box.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      box.hidden = true;
      document.documentElement.style.overflow = '';
      body.innerHTML = '';
      slides = [];
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    /* เปิดจากปุ่มในการ์ด — ทั้งใบกดได้เพราะปุ่มมี ::after คลุมอยู่ */
    document.addEventListener('click', function (e) {
      var go = e.target.closest && e.target.closest('.card__go');
      if (!go) return;
      var card = go.closest('.card');
      if (!card) return;
      var p = DATA.projects.filter(function (x) {
        return x.id === card.getAttribute('data-project');
      })[0];
      if (p) open(p);
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;

      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft' && slides.length > 1) { show(at - 1); return; }
      if (e.key === 'ArrowRight' && slides.length > 1) { show(at + 1); return; }

      /* กัน Tab หลุดออกไปข้างนอกตอน modal เปิดอยู่ */
      if (e.key === 'Tab') {
        var focusables = $$('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])', win)
          .filter(function (el) { return el.offsetParent !== null; });
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  })();

  /* ==========================================================
     9. ฟอร์มติดต่อ
     ----------------------------------------------------------
     หน้านี้ไม่มีเซิร์ฟเวอร์หลังบ้าน จะแกล้งขึ้นว่า "ส่งแล้ว"
     ก็ได้ แต่นั่นคือโกหกคนที่กดส่ง — เลยให้มันเปิดโปรแกรมอีเมล
     พร้อมข้อความที่พิมพ์ไว้จริงๆ แทน กดแล้วได้ผลจริง
     ========================================================== */
  (function form() {
    var f = $('#contactForm');
    if (!f) return;
    var note = $('#formNote');
    var TO = 'phanuwataom1250@gmail.com';

    f.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = f.name.value.trim();
      var mail = f.email.value.trim();
      var msg = f.message.value.trim();

      if (!name || !mail || !msg) {
        note.textContent = 'กรอกให้ครบทั้งสามช่องก่อนนะครับ';
        note.style.color = 'var(--mint)';
        return;
      }

      var subject = 'ติดต่อจากพอร์ตโฟลิโอ — ' + name;
      var lines = [msg, '', '—', name, mail].join('\n');

      window.location.href = 'mailto:' + TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines);

      note.textContent = 'กำลังเปิดโปรแกรมอีเมล ถ้าไม่ขึ้น ส่งมาที่ ' + TO + ' ได้เลยครับ';
      note.style.color = 'var(--mint)';
    });
  })();

})();

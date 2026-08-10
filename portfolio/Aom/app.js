/* ==========================================================================
   PHANUWAT AUDKANTHAR — PORTFOLIO v3 · "DEPTH CANVAS"
   --------------------------------------------------------------------------
   สคริปต์ธรรมดา ไม่ใช่ ES module — ดับเบิลคลิกเปิด index-v3.html ได้เลย
   ทุกอนิเมชันปิดอัตโนมัติถ้าเครื่องตั้งค่า prefers-reduced-motion
   ========================================================================== */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ── ICONS ─────────────────────────────────────────────────────────── */
  var P = { f: 'none', s: 'currentColor' };
  var ICONS = {
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 1 2-4h2a4 4 0 0 0 4-4 10 10 0 0 0-10-8Z"/>',
    atom: '<circle cx="12" cy="12" r="1.5"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9C11.16 3.8 5.83 1.78 3.8 3.8c-2.02 2.03 0 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.02-7.36 0-11.9 4.5C3.8 12.84 1.78 18.17 3.8 20.2c2.03 2.02 7.36 0 11.9-4.5Z"/>',
    layers: '<path d="m12.83 2.18 8.34 4.17a1 1 0 0 1 0 1.79l-8.34 4.17a2 2 0 0 1-1.66 0L2.83 8.14a1 1 0 0 1 0-1.79l8.34-4.17a2 2 0 0 1 1.66 0Z"/><path d="m2.83 12.14 8.34 4.17a2 2 0 0 0 1.66 0l8.34-4.17"/><path d="m2.83 16.14 8.34 4.17a2 2 0 0 0 1.66 0l8.34-4.17"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" x2="15.4" y1="10.5" y2="6.5"/><line x1="8.6" x2="15.4" y1="13.5" y2="17.5"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
    arrow: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };
  function svg(name, w) {
    var d = ICONS[name] || '';
    return '<svg viewBox="0 0 24 24" width="' + (w || 24) + '" height="' + (w || 24) + '" fill="' + P.f +
      '" stroke="' + P.s + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     1 · DEPTH FIELD  —  particle field 3 มิติที่ตอบสนองเมาส์และการเลื่อน
     ════════════════════════════════════════════════════════════════════ */
  function initDepthField() {
    var cv = $('#depthCanvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, DPR = 1, cx = 0, cy = 0;
    var FOV = 640, DEPTH = 1000, LINK = 132;
    var pts = [], zOff = 0, t = 0, raf = 0, alive = true;
    var pm = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false };
    var par = { x: 0, y: 0, tx: 0, ty: 0 };
    var lastScroll = window.pageYOffset || 0, zVel = 0;

    function make(i) {
      return {
        x: (Math.random() - .5) * 2.1,
        y: (Math.random() - .5) * 2.1,
        z: Math.random() * DEPTH,
        s: .55 + Math.random() * 1.35,
        ph: Math.random() * 6.283,
        wob: .35 + Math.random() * .9,
        hot: i % 8 === 0
      };
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cx = W / 2; cy = H / 2;
      cv.width = Math.floor(W * DPR); cv.height = Math.floor(H * DPR);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var n = clamp(Math.round((W * H) / 10500), 42, 155);
      pts = []; for (var i = 0; i < n; i++) pts.push(make(i));
    }

    var sx = [], sy = [], sk = [], sa = [];
    /* flat segment buffers (x1,y1,x2,y2 …) — reused ทุกเฟรม ไม่สร้าง array ใหม่ */
    var segN = [], segM = [], segF = [], nN = 0, nM = 0, nF = 0;
    var bucketMap = new Map();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 1;

      par.x += (par.tx - par.x) * .055;
      par.y += (par.ty - par.y) * .055;
      pm.x += (pm.tx - pm.x) * .16;
      pm.y += (pm.ty - pm.y) * .16;
      zVel *= .92;
      zOff = (zOff + .55 + zVel) % DEPTH;

      var spanX = W * .95, spanY = H * .95;
      var i, n = pts.length;

      for (i = 0; i < n; i++) {
        var p = pts[i];
        var z = p.z - zOff; if (z < 0) z += DEPTH;
        var k = FOV / (FOV + z);
        var wob = Math.sin(p.ph + t * .0055) * p.wob * 14;
        var wob2 = Math.cos(p.ph * 1.7 + t * .0041) * p.wob * 11;

        var X = cx + (p.x * spanX + wob) * k - par.x * k * 1.15;
        var Y = cy + (p.y * spanY + wob2) * k - par.y * k * 1.15;

        if (pm.on) {
          var dx = X - pm.x, dy = Y - pm.y;
          var dd = Math.sqrt(dx * dx + dy * dy);
          if (dd < 170 && dd > .001) {
            var f = (1 - dd / 170); f = f * f * 46;
            X += (dx / dd) * f; Y += (dy / dd) * f;
          }
        }
        sx[i] = X; sy[i] = Y; sk[i] = k;
        sa[i] = clamp((k - .38) * 1.5, 0, 1);
      }

      /* links — spatial buckets so it stays cheap */
      var cell = LINK, LINK2 = LINK * LINK;
      bucketMap.clear();
      for (i = 0; i < n; i++) {
        if (sa[i] < .05) continue;
        if (sx[i] < -cell || sy[i] < -cell || sx[i] > W + cell || sy[i] > H + cell) continue;
        var key = (Math.floor(sx[i] / cell) + 512) * 4096 + (Math.floor(sy[i] / cell) + 512);
        var arr = bucketMap.get(key);
        if (arr) arr.push(i); else bucketMap.set(key, [i]);
      }
      nN = nM = nF = 0;
      var OFF = [0, 0, 4096, 0, -4096, 1, 0, 1, 4096, 1];
      bucketMap.forEach(function (a, k) {
        for (var oi = 0; oi < 10; oi += 2) {
          var b = bucketMap.get(k + OFF[oi] + OFF[oi + 1]);
          if (!b) continue;
          var same = (OFF[oi] === 0 && OFF[oi + 1] === 0);
          for (var ai = 0; ai < a.length; ai++) {
            for (var bi = same ? ai + 1 : 0; bi < b.length; bi++) {
              var q = a[ai], r = b[bi];
              var ddx = sx[q] - sx[r], ddy = sy[q] - sy[r];
              var d2 = ddx * ddx + ddy * ddy;
              if (d2 > LINK2) continue;
              var st = (1 - Math.sqrt(d2) / LINK) * (sa[q] < sa[r] ? sa[q] : sa[r]);
              if (st > .62) { segN[nN++] = sx[q]; segN[nN++] = sy[q]; segN[nN++] = sx[r]; segN[nN++] = sy[r]; }
              else if (st > .3) { segM[nM++] = sx[q]; segM[nM++] = sy[q]; segM[nM++] = sx[r]; segM[nM++] = sy[r]; }
              else { segF[nF++] = sx[q]; segF[nF++] = sy[q]; segF[nF++] = sx[r]; segF[nF++] = sy[r]; }
            }
          }
        }
      });
      strokeSet(segF, nF, 'rgba(150,166,182,.055)');
      strokeSet(segM, nM, 'rgba(160,178,196,.10)');
      strokeSet(segN, nN, 'rgba(212,255,63,.13)');

      /* dots */
      for (i = 0; i < n; i++) {
        var al = sa[i]; if (al < .04) continue;
        var sz = Math.max(.9, pts[i].s * sk[i] * 2.5);
        ctx.globalAlpha = pts[i].hot ? al * .95 : al * .5;
        ctx.fillStyle = pts[i].hot ? '#D4FF3F' : '#B4C2CF';
        ctx.fillRect(sx[i] - sz / 2, sy[i] - sz / 2, sz, sz);
        if (pts[i].hot && sk[i] > .72) {
          ctx.globalAlpha = al * .16;
          ctx.fillRect(sx[i] - sz * 1.9, sy[i] - sz * 1.9, sz * 3.8, sz * 3.8);
        }
      }
      ctx.globalAlpha = 1;

      if (alive) raf = requestAnimationFrame(draw);
    }

    function strokeSet(buf, count, color) {
      if (!count) return;
      ctx.beginPath();
      for (var i = 0; i < count; i += 4) {
        ctx.moveTo(buf[i], buf[i + 1]);
        ctx.lineTo(buf[i + 2], buf[i + 3]);
      }
      ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke();
    }

    resize();
    window.addEventListener('resize', debounce(resize, 180));

    if (REDUCED) { drawStatic(); return; }

    function drawStatic() { alive = false; draw(); alive = false; cancelAnimationFrame(raf); }

    window.addEventListener('pointermove', function (e) {
      pm.tx = e.clientX; pm.ty = e.clientY; pm.on = true;
      par.tx = (e.clientX / W - .5) * 130;
      par.ty = (e.clientY / H - .5) * 130;
    }, { passive: true });
    window.addEventListener('pointerleave', function () { pm.on = false; par.tx = 0; par.ty = 0; });

    window.addEventListener('scroll', function () {
      var y = window.pageYOffset || 0;
      zVel = clamp(zVel + (y - lastScroll) * .045, -9, 9);
      lastScroll = y;
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { alive = false; cancelAnimationFrame(raf); }
      else if (!alive) { alive = true; raf = requestAnimationFrame(draw); }
    });

    raf = requestAnimationFrame(draw);
  }

  function debounce(fn, ms) {
    var id; return function () { clearTimeout(id); id = setTimeout(fn, ms); };
  }

  /* ══════════════════════════════════════════════════════════════════════
     2 · BOOT SEQUENCE
     ════════════════════════════════════════════════════════════════════ */
  function initBoot(done) {
    var boot = $('#boot'), fill = $('#bootFill'), pct = $('#bootPct'), stream = $('#bootStream'),
      skip = $('#bootSkip');
    if (!boot) { done(); return; }

    var lines = ['allocating particles', 'building depth buffer', 'linking nodes',
      'loading typefaces', 'mounting interface'];
    var v = 0, id = 0, finished = false;

    function finish() {
      if (finished) return; finished = true;
      clearInterval(id);
      boot.classList.add('is-done');
      document.body.classList.add('is-booted');
      setTimeout(function () { boot.style.display = 'none'; }, 700);
      done();
    }

    if (REDUCED) { fill.style.width = '100%'; pct.textContent = '100'; finish(); return; }

    skip.addEventListener('click', finish);
    document.addEventListener('keydown', function esc2(e) {
      if (e.key === 'Escape' || e.key === 'Enter') { finish(); document.removeEventListener('keydown', esc2); }
    });

    id = setInterval(function () {
      v = Math.min(100, v + 4 + Math.random() * 11);
      fill.style.width = v + '%';
      pct.textContent = ('00' + Math.round(v)).slice(-3);
      stream.textContent = lines[Math.min(lines.length - 1, Math.floor(v / 21))];
      if (v >= 100) setTimeout(finish, 260);
    }, 68);

    setTimeout(finish, 2600); /* กันค้าง */
  }

  /* ══════════════════════════════════════════════════════════════════════
     3 · DECODE TEXT  (รองรับไทย — สุ่มด้วยพยัญชนะไทยเพื่อไม่ให้บรรทัดกระตุก)
     ════════════════════════════════════════════════════════════════════ */
  var TH = 'กขคงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ';
  /* ตัด W กับ M ออก — ตัวกว้างเกิน ถ้าสุ่มติดกันบรรทัดจะยืดจนหน้าเว็บกระตุก */
  var LT = 'ABCDEFGHIJKLNOPQRSTUVXYZ0123456789#$%&*+=<>/';
  function rnd(str) { return str.charAt(Math.floor(Math.random() * str.length)); }
  function isTh(c) { return c >= '฀' && c <= '๿'; }

  function decode(el, delay) {
    if (REDUCED || el.dataset.decoded === '1') return;
    el.dataset.decoded = '1';
    var final = el.dataset.text || el.textContent;
    el.dataset.text = final;
    var chars = final.split('');
    var total = chars.length;
    var frame = 0, dur = Math.min(30, 12 + total * 1.1);

    setTimeout(function () {
      var id = setInterval(function () {
        frame++;
        var reveal = Math.floor((frame / dur) * total);
        var out = '';
        for (var i = 0; i < total; i++) {
          var c = chars[i];
          if (i < reveal || !/\S/.test(c)) { out += c; }
          else if (isTh(c)) { out += rnd(TH); }
          else if (/[A-Za-z0-9]/.test(c)) { out += rnd(LT); }
          else { out += c; }
        }
        el.textContent = out;
        if (frame >= dur) { clearInterval(id); el.textContent = final; }
      }, 32);
    }, delay || 0);
  }

  /* ══════════════════════════════════════════════════════════════════════
     4 · REVEAL ON SCROLL
     ════════════════════════════════════════════════════════════════════ */
  var revealIO = null;
  function initReveal() {
    if (!('IntersectionObserver' in window) || REDUCED) {
      $$('.reveal,.card,.tile').forEach(function (n) { n.classList.add('is-in'); });
      $$('[data-decode]').forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.setProperty('--d', (el.dataset.delay || 0) + 'ms');
        el.classList.add('is-in');
        if (el.hasAttribute('data-decode-scroll')) decode(el, 120);
        revealIO.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

    observeAll();
  }
  function observeAll(root) {
    var list = $$('.reveal:not(.is-in),.card:not(.is-in),.tile:not(.is-in),[data-decode-scroll]:not(.is-in)', root);
    if (!revealIO) { list.forEach(function (n) { n.classList.add('is-in'); }); return; }
    list.forEach(function (n) { revealIO.observe(n); });
  }

  /* ══════════════════════════════════════════════════════════════════════
     5 · CURSOR + MAGNETIC
     ════════════════════════════════════════════════════════════════════ */
  function initCursor() {
    if (!FINE || REDUCED) return;
    var c = $('#cursor'), label = $('#cursorLabel');
    if (!c) return;
    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf;

    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!c.classList.contains('is-live')) c.classList.add('is-live');
    }, { passive: true });
    document.addEventListener('pointerleave', function () { c.classList.remove('is-live'); });

    (function loop() {
      x += (tx - x) * .22; y += (ty - y) * .22;
      c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      raf = requestAnimationFrame(loop);
    })();

    document.addEventListener('pointerover', function (e) {
      if (!e.target || !e.target.closest) return;
      var big = e.target.closest('[data-cursor]');
      if (big) {
        label.textContent = big.getAttribute('data-cursor');
        c.classList.add('is-label'); c.classList.remove('is-hot');
      } else if (e.target.closest('a,button,input,textarea,select')) {
        c.classList.add('is-hot'); c.classList.remove('is-label');
      } else {
        c.classList.remove('is-hot'); c.classList.remove('is-label');
      }
    });
  }

  function initMagnetic(root) {
    if (!FINE || REDUCED) return;
    $$('.magnetic', root).forEach(function (el) {
      if (el.dataset.mag === '1') return;
      el.dataset.mag = '1';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = 'translate(' + (dx * 14) + 'px,' + (dy * 12) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ── 3D TILT ───────────────────────────────────────────────────────── */
  function tilt(el, deg, glare) {
    if (!FINE || REDUCED) return;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = 'perspective(1000px) rotateY(' + ((px - .5) * deg * 2) + 'deg) rotateX(' +
        (-(py - .5) * deg * 2) + 'deg) translateZ(6px)';
      if (glare) { el.style.setProperty('--gx', (px * 100) + '%'); el.style.setProperty('--gy', (py * 100) + '%'); }
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  }

  /* ══════════════════════════════════════════════════════════════════════
     6 · NAV · RAIL · PROGRESS · SCROLL SPY
     ════════════════════════════════════════════════════════════════════ */
  function initNav() {
    var nav = $('#nav'), burger = $('#navBurger'), bar = $('#scrollProgress');

    var onScroll = function () {
      var y = window.pageYOffset || 0;
      nav.classList.toggle('is-stuck', y > 40);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? clamp(y / h, 0, 1) : 0) + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
    });
    $$('.nav__link').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.dataset.section;
          $$('[data-nav]').forEach(function (n) {
            n.classList.toggle('is-active', n.dataset.nav === id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('[data-section]').forEach(function (s) { spy.observe(s); });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     7 · STATS · MARQUEE · CLOCK
     ════════════════════════════════════════════════════════════════════ */
  function initStats() {
    var wrap = $('#stats'); if (!wrap) return;
    wrap.innerHTML = D.stats.map(function (s) {
      return '<div class="stat reveal"><div class="stat__v"><span data-count="' + esc(s.value) + '">' +
        (REDUCED ? esc(s.value) : '0') + '</span><em>' + esc(s.suffix) + '</em></div>' +
        '<div class="stat__l">' + esc(s.label) + '</div>' +
        '<div class="stat__n">' + esc(s.note) + '</div></div>';
    }).join('');

    if (REDUCED || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.dataset.count, 10) || 0, cur = 0;
        var step = Math.max(1, Math.ceil(target / 34));
        var id = setInterval(function () {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(id); }
          el.textContent = cur;
        }, 28);
        io.unobserve(el);
      });
    }, { threshold: .6 });
    $$('[data-count]', wrap).forEach(function (n) { io.observe(n); });
  }

  function initMarquee() {
    var track = $('#marqueeTrack'); if (!track) return;
    var one = D.ticker.map(function (w) { return '<span class="marquee__item">' + esc(w) + '</span>'; }).join('');
    track.innerHTML = one + one;
  }

  function initClock() {
    var el = $('#footClock'); if (!el) return;
    var tick = function () {
      try {
        el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Bangkok', hour12: false }) + ' ICT';
      } catch (e) { el.textContent = new Date().toLocaleTimeString(); }
    };
    tick(); setInterval(tick, 1000);
  }

  /* ══════════════════════════════════════════════════════════════════════
     8 · SHOWCASE GRID
     ════════════════════════════════════════════════════════════════════ */
  function projectCard(p, i) {
    var chips = p.tags.slice(0, 4).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    if (p.tags.length > 4) chips += '<span class="chip chip--more">+' + (p.tags.length - 4) + '</span>';
    return '<article class="card' + (i === 0 ? ' card--wide' : '') + '" data-delay="' + (i * 70) + '">' +
      '<div class="card__media">' +
      '<div class="card__blur" style="background-image:url(&quot;' + esc(p.image) + '&quot;)"></div>' +
      '<img class="card__img" src="' + esc(p.image) + '" alt="ภาพหน้าจอโปรเจกต์ ' + esc(p.title) + '" loading="lazy">' +
      '<span class="card__scan"></span>' +
      '<span class="card__idx">PRJ ' + esc(p.index) + '</span>' +
      (p.award ? '<span class="card__award">' + esc(p.award) + '</span>' : '') +
      '</div>' +
      '<div class="card__body">' +
      '<div class="card__meta"><span>' + esc(p.category) + '</span><b>' + esc(p.year) + '</b></div>' +
      '<h3 class="card__title"><button type="button" class="card__trigger" data-kind="project" data-id="' +
      esc(p.id) + '" data-cursor="เปิดดู">' + esc(p.title) + '</button></h3>' +
      '<p class="card__sum">' + esc(p.summary) + '</p>' +
      '<div class="chips">' + chips + '</div>' +
      '<span class="card__go">VIEW CASE ' + svg('arrow', 13) + '</span>' +
      '</div></article>';
  }

  function certCard(c, i) {
    var chips = c.skills.slice(0, 3).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    if (c.skills.length > 3) chips += '<span class="chip chip--more">+' + (c.skills.length - 3) + '</span>';
    return '<article class="card" data-delay="' + (i * 70) + '">' +
      '<div class="card__media">' +
      '<div class="card__blur" style="background-image:url(&quot;' + esc(c.image) + '&quot;)"></div>' +
      '<img class="card__img" src="' + esc(c.image) + '" alt="ใบประกาศ ' + esc(c.title) + '" loading="lazy">' +
      '<span class="card__scan"></span>' +
      '<span class="card__idx">CERT ' + esc(c.index) + '</span>' +
      '</div>' +
      '<div class="card__body">' +
      '<div class="card__meta"><span>' + esc(c.issuerShort) + '</span><b>' + esc(c.year) + '</b></div>' +
      '<h3 class="card__title"><button type="button" class="card__trigger" data-kind="cert" data-id="' +
      esc(c.id) + '" data-cursor="เปิดดู">' + esc(c.title) + '</button></h3>' +
      '<p class="card__sum">' + esc(c.description.slice(0, 108)) + '…</p>' +
      '<div class="chips">' + chips + '</div>' +
      '<span class="card__go">VIEW CREDENTIAL ' + svg('arrow', 13) + '</span>' +
      '</div></article>';
  }

  function stackTile(s, i) {
    var on = s.level === 'excellent' ? 3 : s.level === 'good' ? 2 : 1;
    var bars = ''; for (var b = 0; b < 3; b++) bars += '<i class="' + (b < on ? 'on' : '') + '"></i>';
    return '<article class="tile" data-delay="' + (i * 45) + '">' +
      '<span class="tile__icon">' + svg(s.icon, 24) + '</span>' +
      '<span class="tile__name">' + esc(s.name) + '</span>' +
      '<span class="tile__foot"><span class="tile__group">' + esc(s.group) + '</span>' +
      '<span class="level" title="' + esc(s.level) + '">' + bars + '</span></span>' +
      '</article>';
  }

  var currentTab = 'all';
  function renderGrid(tab) {
    var grid = $('#grid'); if (!grid) return;
    currentTab = tab;
    var html = '', i = 0;

    if (tab === 'all' || tab === 'projects') {
      D.projects.forEach(function (p) { html += projectCard(p, i++); });
    }
    if (tab === 'all' || tab === 'certificates') {
      D.certificates.forEach(function (c) { html += certCard(c, i++); });
    }
    if (tab === 'stack') {
      D.stack.forEach(function (s) { html += stackTile(s, i++); });
    }
    grid.classList.toggle('is-stack', tab === 'stack');
    grid.innerHTML = html;
    observeAll(grid);
    if (FINE && !REDUCED) {
      $$('.card,.tile', grid).forEach(function (c) {
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
          c.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
        });
      });
    }
  }

  function initTabs() {
    var tabs = $('#tabs'), pill = $('#tabsPill');
    if (!tabs) return;

    function movePill(btn) {
      if (!pill || !btn) return;
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    }

    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab'); if (!btn) return;
      $$('.tab', tabs).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      movePill(btn);
      renderGrid(btn.dataset.tab);
    });

    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var list = $$('.tab', tabs), idx = list.indexOf(document.activeElement);
      if (idx < 0) return;
      e.preventDefault();
      var next = list[(idx + (e.key === 'ArrowRight' ? 1 : list.length - 1)) % list.length];
      next.focus(); next.click();
    });

    window.addEventListener('resize', debounce(function () { movePill($('.tab.is-active', tabs)); }, 160));
    /* ฟอนต์โหลดเสร็จทีหลัง ความกว้างปุ่มเปลี่ยน — ต้องขยับแถบตามอีกรอบ */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { movePill($('.tab.is-active', tabs)); });
    }

    /* จำนวนจริงจาก data */
    var counts = { all: D.projects.length + D.certificates.length, projects: D.projects.length, certificates: D.certificates.length, stack: D.stack.length };
    $$('.tab', tabs).forEach(function (b) {
      var i = b.querySelector('i');
      if (i) i.textContent = ('0' + counts[b.dataset.tab]).slice(-2);
    });
    requestAnimationFrame(function () { movePill($('.tab.is-active', tabs)); });
  }

  /* ══════════════════════════════════════════════════════════════════════
     9 · MODAL + CAROUSEL
     ════════════════════════════════════════════════════════════════════ */
  var modal = { root: null, panel: null, content: null, imgs: [], idx: 0, opener: null };

  function modalMedia(images, alt) {
    if (!images || !images.length) return '';
    var multi = images.length > 1;
    var dots = ''; for (var i = 0; i < images.length; i++) dots += '<span class="mv__dot' + (i === 0 ? ' on' : '') + '"></span>';
    return '<div class="mv__media">' +
      '<div class="mv__blur" id="mvBlur" style="background-image:url(&quot;' + esc(images[0]) + '&quot;)"></div>' +
      '<img class="mv__img" id="mvImg" src="' + esc(images[0]) + '" alt="' + esc(alt) + '">' +
      (multi ? '<button class="mv__nav mv__nav--prev" type="button" data-step="-1" aria-label="ภาพก่อนหน้า">' + svg('left', 24) + '</button>' +
        '<button class="mv__nav mv__nav--next" type="button" data-step="1" aria-label="ภาพถัดไป">' + svg('right', 24) + '</button>' +
        '<span class="mv__count" id="mvCount">01 / ' + ('0' + images.length).slice(-2) + '</span>' +
        '<span class="mv__dots" id="mvDots">' + dots + '</span>' : '') +
      '</div>';
  }

  function openProject(p) {
    var metrics = p.metrics.map(function (m) {
      return '<div class="mv__metric"><dt>' + esc(m.k) + '</dt><dd>' + esc(m.v) + '</dd></div>';
    }).join('');
    var chips = p.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    var actions = '';
    if (p.repoUrl) actions += '<a class="btn btn--ghost" href="' + esc(p.repoUrl) + '" target="_blank" rel="noopener">' + svg('ext', 17) + '<span>ดูโค้ดบน GitHub</span></a>';
    if (p.demoUrl) actions += '<a class="btn btn--solid" href="' + esc(p.demoUrl) + '" target="_blank" rel="noopener"><span>เปิดเดโม</span>' + svg('arrow', 17) + '</a>';

    open(modalMedia(p.images, 'ภาพหน้าจอโปรเจกต์ ' + p.title) +
      '<div class="mv__body">' +
      '<div class="mv__top"><span>PRJ ' + esc(p.index) + '</span><span>·</span><span>' + esc(p.category) + '</span><span>·</span><b>' + esc(p.year) + '</b>' +
      (p.award ? '<span>·</span><b>' + esc(p.award) + '</b>' : '') + '</div>' +
      '<h2 class="mv__title" id="modalTitle">' + esc(p.title) + '</h2>' +
      '<p class="mv__sum">' + esc(p.summary) + '</p>' +
      '<dl class="mv__metrics">' + metrics + '</dl>' +
      '<h3 class="mv__h">รายละเอียด</h3><p class="mv__text">' + esc(p.details) + '</p>' +
      '<h3 class="mv__h">เทคโนโลยีที่ใช้</h3><div class="chips">' + chips + '</div>' +
      (actions ? '<div class="mv__actions">' + actions + '</div>' : '') +
      '</div>', p.images);
  }

  function openCert(c) {
    var chips = c.skills.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    open(modalMedia(c.images, 'ใบประกาศ ' + c.title) +
      '<div class="mv__body">' +
      '<div class="mv__top"><span>CERT ' + esc(c.index) + '</span><span>·</span><span>' + esc(c.code) + '</span><span>·</span><b>' + esc(c.year) + '</b></div>' +
      '<h2 class="mv__title" id="modalTitle">' + esc(c.title) + '</h2>' +
      '<p class="mv__sum">' + esc(c.issuer) + '</p>' +
      '<h3 class="mv__h">รายละเอียด</h3><p class="mv__text">' + esc(c.description) + '</p>' +
      '<h3 class="mv__h">ทักษะที่เกี่ยวข้อง</h3><div class="chips">' + chips + '</div>' +
      '</div>', c.images);
  }

  function open(html, images) {
    modal.opener = document.activeElement;
    modal.imgs = images || []; modal.idx = 0;
    modal.content.innerHTML = html;
    modal.root.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { modal.root.classList.add('is-open'); });
    modal.panel.scrollTop = 0;
    $('#modalClose').focus();
    initMagnetic(modal.content);
  }

  function closeModal() {
    modal.root.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      modal.root.hidden = true;
      modal.content.innerHTML = '';
      if (modal.opener && modal.opener.focus) modal.opener.focus();
    }, 380);
  }

  function step(dir) {
    if (modal.imgs.length < 2) return;
    modal.idx = (modal.idx + dir + modal.imgs.length) % modal.imgs.length;
    var img = $('#mvImg'), blur = $('#mvBlur'), count = $('#mvCount'), dots = $('#mvDots');
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(function () {
      img.src = modal.imgs[modal.idx];
      if (blur) blur.style.backgroundImage = 'url("' + modal.imgs[modal.idx] + '")';
      img.style.opacity = '1';
    }, 160);
    if (count) count.textContent = ('0' + (modal.idx + 1)).slice(-2) + ' / ' + ('0' + modal.imgs.length).slice(-2);
    if (dots) $$('.mv__dot', dots).forEach(function (d, i) { d.classList.toggle('on', i === modal.idx); });
  }

  function initModal() {
    modal.root = $('#modal'); modal.panel = $('#modalPanel'); modal.content = $('#modalContent');
    if (!modal.root) return;

    document.addEventListener('click', function (e) {
      var trig = e.target.closest('.card__trigger');
      if (trig) {
        var id = trig.dataset.id;
        if (trig.dataset.kind === 'project') {
          var p = D.projects.filter(function (x) { return x.id === id; })[0]; if (p) openProject(p);
        } else {
          var c = D.certificates.filter(function (x) { return x.id === id; })[0]; if (c) openCert(c);
        }
        return;
      }
      if (e.target.closest('[data-close]') || e.target.closest('#modalClose')) { closeModal(); return; }
      var nav = e.target.closest('.mv__nav');
      if (nav) step(parseInt(nav.dataset.step, 10));
    });

    document.addEventListener('keydown', function (e) {
      if (modal.root.hidden) return;
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') {
        var f = $$('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])', modal.panel)
          .filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     10 · CONTACT FORM  →  เปิดโปรแกรมอีเมลจริง (ไม่แกล้งว่าส่งแล้ว)
     ════════════════════════════════════════════════════════════════════ */
  function log(text, cls) {
    var body = $('#termBody'); if (!body) return;
    var p = document.createElement('p');
    p.className = 'term__line' + (cls ? ' ' + cls : '');
    p.innerHTML = '<span>&gt;</span><span style="color:inherit">' + esc(text) + '</span>';
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function initForm() {
    var form = $('#contactForm'); if (!form) return;
    var EMAIL = D.profile.email;

    function setErr(id, msg) {
      var field = $('#' + id).closest('.field');
      field.classList.toggle('has-err', !!msg);
      $('[data-err-for="' + id + '"]').textContent = msg || '';
      return !msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fName').value.trim(),
        mail = $('#fEmail').value.trim(),
        msg = $('#fMsg').value.trim();

      var ok = true;
      ok = setErr('fName', name ? '' : 'กรุณากรอกชื่อ') && ok;
      ok = setErr('fEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? '' : 'รูปแบบอีเมลไม่ถูกต้อง') && ok;
      ok = setErr('fMsg', msg.length >= 10 ? '' : 'พิมพ์ข้อความอย่างน้อย 10 ตัวอักษร') && ok;

      if (!ok) { log('validation failed — ตรวจสอบช่องที่แจ้งเตือน', 'err'); return; }

      log('composing message from ' + name + ' <' + mail + '>');
      var subject = 'ติดต่อจากพอร์ตโฟลิโอ — ' + name;
      var body = msg + '\n\n—\nชื่อ: ' + name + '\nอีเมล: ' + mail + '\nส่งจาก: Portfolio v3';
      var href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      setTimeout(function () {
        log('opening default mail client…', 'ok');
        window.location.href = href;
        setTimeout(function () {
          log('ถ้าโปรแกรมอีเมลไม่เปิด ส่งมาที่ ' + EMAIL + ' ได้โดยตรงครับ');
        }, 1400);
      }, 260);
    });

    ['fName', 'fEmail', 'fMsg'].forEach(function (id) {
      var el = $('#' + id);
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('has-err')) setErr(id, '');
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     BOOTSTRAP
     ════════════════════════════════════════════════════════════════════ */
  function start() {
    if (!D) { console.error('data-v3.js ไม่ได้ถูกโหลด'); return; }

    initDepthField();
    initStats();
    initMarquee();
    initReveal();          /* ต้องมาก่อน renderGrid ไม่งั้นการ์ดจะโผล่มาทันทีโดยไม่รอเลื่อนถึง */
    initTabs();
    renderGrid('all');
    initNav();
    initModal();
    initForm();
    initClock();
    initCursor();
    initMagnetic(document);

    var card = $('#idcard');
    if (card) tilt(card, 7, true);

    initBoot(function () {
      $$('.hero [data-decode]').forEach(function (el) {
        decode(el, parseInt(el.dataset.delay || 0, 10) + 260);
      });
      $$('.hero .reveal').forEach(function (el, i) {
        el.style.setProperty('--d', (i * 90 + 200) + 'ms');
        el.classList.add('is-in');
      });
      $$('#stats .stat').forEach(function (el, i) {
        el.style.setProperty('--d', (i * 90 + 400) + 'ms');
        el.classList.add('is-in');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

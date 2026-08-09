/* ============================================================
   PIXELCRAFT STUDIO — site.js
   ------------------------------------------------------------
   สคริปต์ตัวเดียวใช้ได้ทั้งสองหน้า ทุกส่วนเช็คก่อนว่ามี element
   นั้นจริงไหม ถ้าไม่มีก็ข้ามไป — section ที่ยังว่างอยู่เลยไม่ทำ
   ให้ทั้งไฟล์พัง

   มี 4 อย่าง:
     1. ปุ่มเมนูขีดสามขีด (ทั้งสองหน้า)
     2. ป้ายบอกขนาดตัวหนังสือใน hero (หน้า home)
     3. แผงรายชื่อที่ไฮไลต์ตามคนที่กำลังอ่าน (หน้า profile)
     4. นาฬิกากรุงเทพใน status bar (ทั้งสองหน้า)
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. ปุ่มเมนูสำหรับจอเล็ก
     ========================================================== */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    /* กดลิงก์แล้วปิดเมนูเอง */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================
     2. ป้ายบอกขนาดใต้ตัวหนังสือ hero (หน้า home)
     ตัวเลขที่โชว์คือขนาดจริงของตัวหนังสือ ไม่ได้พิมพ์ทิ้งไว้
     ========================================================== */
  var heroWord = document.querySelector('.hero .word span');
  var dim = document.getElementById('dim');
  var vp = document.getElementById('vp');

  function measure() {
    if (heroWord && dim) {
      var r = heroWord.getBoundingClientRect();
      dim.textContent = Math.round(r.width) + ' × ' + Math.round(r.height);
    }
    if (vp) {
      vp.textContent = window.innerWidth + '×' + window.innerHeight;
    }
  }

  /* รอฟอนต์โหลดเสร็จก่อนวัด ไม่งั้นได้ขนาดของฟอนต์สำรอง */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);
  measure();

  /* ==========================================================
     3. แผงรายชื่อไฮไลต์ตามคนที่กำลังอ่าน (หน้า profile)
     ทำงานเมื่อมีทั้ง .layers a และ .mate เท่านั้น
     ========================================================== */
  var layerLinks = document.querySelectorAll('.layers a[data-layer]');
  var mates = document.querySelectorAll('.mate[id]');

  if (layerLinks.length && mates.length && 'IntersectionObserver' in window) {
    var byId = {};
    layerLinks.forEach(function (a) {
      byId[a.getAttribute('data-layer')] = a;
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        layerLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var hit = byId[en.target.id];
        if (hit) hit.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    mates.forEach(function (m) { io.observe(m); });
  }

  /* ==========================================================
     4. นาฬิกากรุงเทพ
     ========================================================== */
  var clock = document.getElementById('clock');

  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bangkok'
    });

    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 20000);
  }
})();

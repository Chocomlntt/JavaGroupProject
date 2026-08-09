/* ============================================================
   PIXELCRAFT STUDIO — site.js
   ------------------------------------------------------------
   สคริปต์ตัวเดียวใช้ได้ทั้งสองหน้า ทุกส่วนเช็คก่อนว่ามี element
   นั้นจริงไหม ถ้าไม่มีก็ข้ามไป — section ที่ยังว่างอยู่เลยไม่ทำ
   ให้ทั้งไฟล์พัง

   มี 5 อย่าง:
     1. ปุ่มเมนูขีดสามขีด (ทั้งสองหน้า)
     2. ป้ายบอกขนาดตัวหนังสือใน hero (หน้า home)
     3. แผงรายชื่อที่ไฮไลต์ตามคนที่กำลังอ่าน (หน้า profile)
     4. accordion ผลงานบริษัท (หน้า home)
     5. นาฬิกากรุงเทพใน status bar (ทั้งสองหน้า)
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
     4. ACCORDION ผลงานบริษัท (หน้า home)
     ----------------------------------------------------------
     เปิดได้ทีละอัน กดอันที่เปิดอยู่ซ้ำเพื่อปิด

     HTML ส่งมาแบบกางไว้ทุกอัน (aria-expanded="true") เพื่อให้คน
     ที่ปิด JS ยังอ่านเนื้อหาได้ครบ พอสคริปต์นี้ทำงานถึงค่อยหุบ
     — ถ้าทำกลับกัน คนที่ JS ไม่ทำงานจะไม่เห็นผลงานเลยสักชิ้น
     ========================================================== */
  var rowsBox = document.getElementById('work-rows');

  if (rowsBox) {
    var rows = Array.prototype.slice.call(rowsBox.querySelectorAll('.row'));
    var heads = rows.map(function (r) { return r.querySelector('.row__btn'); });
    var barH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bar-h'), 10) || 62;
    var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var closeAll = function () {
      rows.forEach(function (r, i) {
        r.classList.remove('is-open');
        heads[i].setAttribute('aria-expanded', 'false');
      });
    };

    var open = function (i) {
      rows[i].classList.add('is-open');
      heads[i].setAttribute('aria-expanded', 'true');
    };

    /* บอก CSS ว่า JS ทำงานแล้ว แล้วหุบทุกอัน เหลือเปิดใบแรกไว้
       เป็นตัวอย่างให้เห็นว่ากดแล้วเกิดอะไรขึ้น */
    rowsBox.classList.add('rows--js');
    closeAll();
    if (rows.length) open(0);

    heads.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var wasOpen = rows[i].classList.contains('is-open');
        closeAll();
        if (!wasOpen) open(i);

        /* ถ้าปิดอันที่อยู่ข้างบน หัวการ์ดนี้จะเลื่อนขึ้นไปหลบใต้แถบเมนู
           เลยต้องดึงกลับลงมาให้เห็น */
        var top = btn.getBoundingClientRect().top;
        if (top < barH + 10) {
          window.scrollBy({ top: top - barH - 16, behavior: noMotion ? 'auto' : 'smooth' });
        }
      });

      /* ลูกศรขึ้น-ลงเลื่อนระหว่างหัวการ์ด ตามมาตรฐาน accordion */
      btn.addEventListener('keydown', function (e) {
        var to = null;
        if (e.key === 'ArrowDown') to = (i + 1) % heads.length;
        else if (e.key === 'ArrowUp') to = (i - 1 + heads.length) % heads.length;
        else if (e.key === 'Home') to = 0;
        else if (e.key === 'End') to = heads.length - 1;

        if (to !== null) {
          e.preventDefault();
          heads[to].focus();
        }
      });
    });
  }

  /* ==========================================================
     5. นาฬิกากรุงเทพ
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

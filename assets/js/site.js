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
     ----------------------------------------------------------
     ทำงานเมื่อมีทั้ง .layers a และ .pcard เท่านั้น

     ในบล็อกนี้มี 2 อย่าง:
       - ไฮไลต์ตามการ์ดที่อยู่กลางจอ
       - กดชื่อแล้วเลื่อนการ์ดคนนั้นมากลางจอ

     บทเรียนจากของเดิม: กฎที่ใช้เลือกว่าใคร active ต้องเป็นกฎ
     เดียวกับที่ใช้พาการ์ดไปหยุด ถ้าสองอันคิดคนละแบบ กดชื่อแล้ว
     ไฮไลต์จะไปโผล่ผิดใบทันที ตอนนี้ใช้ "ใกล้กลางจอที่สุด" ทั้งคู่
     ========================================================== */
  var layerLinks = document.querySelectorAll('.layers a[data-layer]');
  var cards = document.querySelectorAll('.pcard[id]');

  /* --- ตัวเลื่อนการ์ดมากลางจอ ใช้ร่วมกันทั้งคลิกและ hover ------ */
  var slow = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var barH2 = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bar-h'), 10) || 62;
  var lockUntil = 0;

  /* การ์ดที่ถูกสั่งให้มากลางจอ — ไฮไลต์จะปักที่ใบนี้จนกว่าคนใช้
     จะเลื่อนหน้าเอง

     ทำไมต้องปัก: การ์ดใบแรกกับใบสุดท้ายไปกลางจอไม่ได้จริง เพราะ
     หน้าเลื่อนไปสุดทางแล้ว การ์ดเลยค้างอยู่ค่อนบน/ค่อนล่าง พอวัด
     ด้วยกฎ "ใกล้กลางจอที่สุด" ใบข้างเคียงดันใกล้กว่า ไฮไลต์เลย
     ไปโผล่ผิดใบ — ทั้งที่คนใช้เพิ่งกดใบนี้ไปหมาดๆ */
  var pinned = null;
  var applyActive = null;

  var centerCard = function (card) {
    var r = card.getBoundingClientRect();
    var top;

    /* "กลางจอ" ต้องคิดจากพื้นที่ที่มองเห็นจริง ไม่ใช่ทั้ง viewport
       เพราะแถบเมนูติดหนึบทับข้างบนอยู่ ถ้าคิดจากทั้งจอ หัวการ์ด
       จะไปมุดใต้แถบเมนูทุกครั้ง

       46 = ที่ให้ป้าย .pcard__tag ที่ยื่นขึ้นไปเหนือการ์ด 34px */
    var visTop = barH2 + 46;
    var visH = window.innerHeight - visTop;

    if (r.height > visH) {
      /* การ์ดสูงเกินจะจัดกลาง (ตอนกาง drawer แล้วมักเป็นแบบนี้)
         จับหัวการ์ดไว้ใต้แถบเมนูแทน ไม่งั้นหัวการ์ดหลุดออกนอกจอ */
      top = window.scrollY + r.top - visTop;
    } else {
      top = window.scrollY + r.top - visTop - (visH - r.height) / 2;
    }

    top = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));

    /* ปักไฮไลต์ก่อน ต่อให้ไม่ต้องเลื่อน (ใกล้ที่อยู่แล้ว) หรือเลื่อน
       ไปได้ไม่สุดเพราะติดขอบหน้า ไฮไลต์ก็ต้องอยู่ที่ใบนี้ */
    pinned = card;
    if (applyActive) applyActive(card);

    if (Math.abs(top - window.scrollY) < 24) return;

    lockUntil = Date.now() + 900;
    window.scrollTo({ top: top, behavior: slow ? 'auto' : 'smooth' });
  };

  if (layerLinks.length && cards.length) {
    var syncing = false;

    applyActive = function (card) {
      layerLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-layer') === card.id);
      });
    };

    var syncLayers = function () {
      syncing = false;

      /* มีใบที่ปักไว้ อย่าไปคำนวณใหม่ ไม่งั้นระหว่าง smooth scroll
         ไฮไลต์จะกระพริบไล่ไปทีละใบ แล้วไปจบผิดใบตอนติดขอบหน้า */
      if (pinned) return applyActive(pinned);

      /* เอาการ์ดที่กลางใบใกล้กลางจอที่สุด

         ต้องใช้กฎ "กลางจอ" ให้ตรงกับที่ centerCard พาการ์ดไปหยุด
         ถ้าใช้เส้นแบบเดิม (การ์ดใบล่างสุดที่หัวยังอยู่เหนือเส้นใต้
         แถบเมนู) พอกดชื่อแล้วการ์ดไปหยุดกลางจอ หัวการ์ดจะอยู่ต่ำ
         กว่าเส้น กฎเลยไปเลือกใบก่อนหน้า ไฮไลต์เด้งกลับทันที */
      var visTop = barH2 + 46;
      var mid = visTop + (window.innerHeight - visTop) / 2;

      var hit = cards[0];
      var best = Infinity;

      cards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        var gap = Math.abs(r.top + r.height / 2 - mid);
        if (gap < best) {
          best = gap;
          hit = c;
        }
      });

      applyActive(hit);
    };

    /* กัน scroll ยิงถี่เกิน คำนวณแค่เฟรมละครั้ง */
    var queueSync = function () {
      if (syncing) return;
      syncing = true;
      window.requestAnimationFrame(syncLayers);
    };

    /* กดชื่อในแผงรายชื่อ → เลื่อนการ์ดคนนั้นมากลางจอ
       ไม่ปล่อยให้เบราว์เซอร์กระโดดตาม #hash เอง เพราะแบบนั้นการ์ด
       จะไปหยุดชิดบนจอตาม scroll-margin-top ไม่ใช่กลางจอ

       ยังเขียน #hash ลง URL อยู่ ก๊อปลิงก์ไปส่งต่อได้เหมือนเดิม */
    layerLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var card = document.getElementById(a.getAttribute('data-layer'));
        if (!card) return;

        e.preventDefault();

        /* centerCard ปักไฮไลต์ให้เองแล้ว ไม่ต้องรอ smooth scroll วิ่งถึง */
        centerCard(card);

        if (history.replaceState) history.replaceState(null, '', '#' + card.id);
        else window.location.hash = card.id;
      });
    });

    /* คนใช้ลงมือเลื่อนเอง = เลิกปัก กลับไปคิดจากตำแหน่งจริง
       ดูจากอินพุตที่คนทำเอง (ล้อ นิ้ว คีย์บอร์ด) ไม่ใช่ event scroll
       เพราะ scroll ยิงตอนหน้าเลื่อนเองด้วย ถ้าใช้ตัวนั้นจะปลดล็อก
       ทันทีที่เพิ่งปักไป */
    var unpin = function () {
      if (!pinned) return;
      pinned = null;
      queueSync();
    };

    window.addEventListener('wheel', unpin, { passive: true });
    window.addEventListener('touchmove', unpin, { passive: true });
    window.addEventListener('keydown', function (e) {
      if (!e.key) return;
      if (e.key.indexOf('Arrow') === 0 || e.key === 'PageUp' || e.key === 'PageDown' ||
        e.key === 'Home' || e.key === 'End' || e.key === ' ') unpin();
    });

    window.addEventListener('scroll', queueSync, { passive: true });
    window.addEventListener('resize', queueSync);
    window.addEventListener('hashchange', queueSync);
    window.addEventListener('load', queueSync);
    syncLayers();
  }

  /* ==========================================================
     3b. เอาเมาส์ชี้การ์ดแล้วเลื่อนการ์ดนั้นมากลางจอ (หน้า profile)
     ----------------------------------------------------------
     อันตรายกว่าที่คิด ถ้าเขียนตรงๆ จะวนไม่จบ: หน้าเลื่อน →
     การ์ดใบอื่นวิ่งมาอยู่ใต้เคอร์เซอร์ → mouseenter ใบใหม่ →
     เลื่อนอีก วนแบบนี้ไปเรื่อยๆ จนคุมหน้าไม่ได้

     กันไว้ 4 ชั้น:
       1. รอ 260ms ก่อน ผ่านเฉยๆ ไม่นับ ต้องตั้งใจชี้ค้างจริง
       2. ล็อกหลังสั่งเลื่อน 900ms — mouseenter ที่เกิดจากหน้า
          เลื่อนเองในช่วงนี้ ไม่นับทั้งหมด
       3. ใกล้ที่อยู่แล้ว (ต่าง < 24px) ไม่ต้องเลื่อน — อยู่ใน centerCard
       4. เครื่องที่ไม่มีเมาส์ไม่ทำงานเลย

     จังหวะเลื่อน: รอ drawer กางเสร็จก่อน เพราะความสูงการ์ด
     เปลี่ยนระหว่างกาง ถ้าเลื่อนก่อนจะไปหยุดผิดที่

     ตัว centerCard กับ lockUntil ย้ายไปไว้ข้างบนแล้ว เพราะการกด
     ชื่อในแผงรายชื่อก็ใช้ตัวเดียวกัน — ล็อกจึงกันข้ามกันได้ด้วย
     กดชื่อแล้วหน้าเลื่อน การ์ดที่วิ่งผ่านเคอร์เซอร์จะไม่แย่งเลื่อน
     ========================================================== */
  if (cards.length && window.matchMedia('(hover: hover)').matches) {
    var wait = null;

    cards.forEach(function (card) {
      var drawer = card.querySelector('.pcard__drawer');

      card.addEventListener('mouseenter', function () {
        if (Date.now() < lockUntil) return;

        clearTimeout(wait);
        wait = setTimeout(function () {
          /* ยังชี้อยู่ไหม เผลอเลื่อนผ่านไม่นับ */
          if (!card.matches(':hover')) return;

          /* drawer กางเสร็จแล้วค่อยเลื่อน ความสูงจะได้นิ่ง */
          if (!drawer || slow) return centerCard(card);

          /* fired กันเลื่อนซ้อนสองรอบ — transitionend กับตัวกันเหนียว
             ข้างล่างอาจยิงทั้งคู่ ให้ใครถึงก่อนได้ไปคนเดียว */
          var fired = false;
          var done = function () {
            if (fired) return;
            fired = true;
            drawer.removeEventListener('transitionend', done);
            if (card.matches(':hover')) centerCard(card);
          };

          drawer.addEventListener('transitionend', done);

          /* กันเหนียว เผื่อ transitionend ไม่ยิง (drawer กางอยู่แล้ว) */
          setTimeout(done, 480);
        }, 260);
      });

      card.addEventListener('mouseleave', function () {
        clearTimeout(wait);
      });
    });
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

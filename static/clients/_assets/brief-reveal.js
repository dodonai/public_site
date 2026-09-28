/* ============================================================================
   Dodonai Brief Engine — scroll reveal + animation gating
   ----------------------------------------------------------------------------
   Pairs with brief.css. Two IntersectionObservers:
     1. .reveal  -> adds .in when the element scrolls into view (fade + rise).
     2. animated blocks (#xform, #pipe, #dash, or any [data-play]) -> adds .play
        the first time they're visible, so the CSS keyframe animations stay idle
        until seen (saves CPU + makes the reveal feel intentional).

   No dependencies. Safe to load with `defer`. Honors prefers-reduced-motion via
   brief.css (the .reveal rule no-ops; .play still applies but animations that
   matter are decorative). To register a custom animated block, add the
   `data-play` attribute to it OR push its id into PLAY_IDS below.
   ============================================================================ */
(function () {
  var PLAY_IDS = ['xform', 'pipe', 'dash'];

  function observe() {
    // 1. Scroll-reveal
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target); // reveal once, then stop watching
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });

    // 2. Animation gating: add .play once visible.
    var playIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('play'); }
      });
    }, { threshold: 0.2 });

    var targets = {};
    PLAY_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) targets[id] = el;
    });
    document.querySelectorAll('[data-play]').forEach(function (el) {
      targets[el.id || ('p' + Math.round(el.getBoundingClientRect().top))] = el;
    });
    Object.keys(targets).forEach(function (k) { playIO.observe(targets[k]); });
  }

  /* --------------------------------------------------------------------------
     FAMILY 5 — mini flow diagrams (.dg): auto-fit labels.
     SVG <text> never wraps, so squeeze any label wider than its node box.
     Runs once; viewBox geometry is constant regardless of display scale.
     -------------------------------------------------------------------------- */
  function fitDiagrams() {
    document.querySelectorAll('.dg svg').forEach(function (svg) {
      var rects = [].map.call(svg.querySelectorAll('rect.nd'), function (r) {
        return { x: +r.getAttribute('x'), w: +r.getAttribute('width'), y: +r.getAttribute('y'), h: +r.getAttribute('height') };
      });
      [].forEach.call(svg.querySelectorAll('text'), function (t) {
        var bb; try { bb = t.getBBox(); } catch (e) { return; }
        var cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, node = null;
        for (var i = 0; i < rects.length; i++) {
          var r = rects[i];
          if (cy >= r.y && cy <= r.y + r.h && cx >= r.x - 30 && cx <= r.x + r.w + 30) { node = r; break; }
        }
        if (!node) return;
        var max = node.w - 16;
        if (bb.width > max && max > 0) {
          t.setAttribute('textLength', max);
          t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     FAMILY 5 — interactive priced menu. Activates only when a [data-menu-total]
     bar exists, so it is a no-op on ordinary briefs. Data-attribute driven:
       - bar:  [data-menu-total][data-foundation="5000"][data-full-save="4000"]
               with children [data-count] [data-sum] [data-save] [data-total]
               and an optional [data-save-seg] wrapper for the savings line.
       - item: .acard > input[type=checkbox][data-price]; its .addbtn[data-for=id]
               toggles it. Optional [data-on]/[data-off] override button labels.
       - phase: any [data-phase][data-items="a1,a2,.."][data-discount] holding a
               .phbtn; the button selects/clears the whole set.
     Total = foundation + sum(selected) - savings, where savings = full-build
     save if every item is picked, else the sum of each fully-picked phase's save.

     Monthly run cost (optional, no-op unless some checkbox carries data-mlo):
       - item: checkbox[data-mlo][data-mhi] = est. AI usage $/mo, low and high.
       - bar:  [data-host-lo][data-host-hi] = always-on hosting $/mo (default 0),
               a [data-mseg] wrapper (shown once something is picked) holding
               [data-mrun] (hosting + AI range) and optional [data-mai] (AI only).
       - table: any tr[data-row=<item id>] (the .runtable block) gets .sel
               while its item is picked.

     Expected return (optional, no-op unless some checkbox carries data-hlo):
       - item: checkbox[data-hlo][data-hhi] = est. staff hours back per month.
       - rate: bar[data-rate] = $/hour the hours are valued at; any
               input[data-rate-input] edits it live (blank = hours only).
       - card: [data-roi-for=<item id>] gets "saves ≈ a–b hrs/mo · pays back ≈ x–y mo"
               (payback = line price / (hours × rate − its tokens)).
       - bar:  [data-roi-seg] wrapper(s) with [data-hrs], [data-val], [data-payback]
               (payback = build total / (value − hosting − tokens)), and an optional
               big [data-tsave] figure: $/mo saved at the rate, or hours without one.
       - table: tr[data-roirow=<item id>] cells [data-rval] and [data-rpay].
     Payback shows as a range, conservative end = low hours against high cost.
     -------------------------------------------------------------------------- */
  function initMenu() {
    var bar = document.querySelector('[data-menu-total]');
    if (!bar) return;
    var foundation = +(bar.getAttribute('data-foundation') || 0);
    var fullSave = +(bar.getAttribute('data-full-save') || 0);
    var boxes = [].slice.call(document.querySelectorAll('.acard input[type=checkbox][data-price]'));
    if (!boxes.length) return;
    var phases = [].slice.call(document.querySelectorAll('[data-phase][data-items]'));
    var runs = boxes.some(function (b) { return b.hasAttribute('data-mlo'); });
    var hostLo = +(bar.getAttribute('data-host-lo') || 0);
    var hostHi = +(bar.getAttribute('data-host-hi') || 0);
    function fmt(n) { return '$' + n.toLocaleString('en-US'); }
    function range(lo, hi) { return fmt(lo) + '–' + hi.toLocaleString('en-US'); }
    var roi = boxes.some(function (b) { return b.hasAttribute('data-hlo'); });
    var rate = +(bar.getAttribute('data-rate') || 0);
    function num(b, k) { return +(b.getAttribute(k) || 0); }
    function months(cost, lo, hi) {           // cost / net-monthly range -> "x–y mo"
      if (hi <= 0) return '';
      var fast = cost / hi, slow = lo > 0 ? cost / lo : null;
      function f(m) { return m < 3 ? (Math.round(m * 10) / 10).toString() : Math.round(m).toString(); }
      return slow === null ? f(fast) + '+ mo' : (f(fast) === f(slow) ? f(fast) : f(fast) + '–' + f(slow)) + ' mo';
    }
    function hrs(lo, hi) { return lo === hi ? lo + ' hrs/mo' : lo + '–' + hi + ' hrs/mo'; }
    function recalcRoi(buildTotal) {
      if (!roi) return;
      var hlo = 0, hhi = 0, tlo = 0, thi = 0, n = 0;
      boxes.forEach(function (b) {
        if (!b.hasAttribute('data-hlo')) return;
        var a = num(b, 'data-hlo'), z = num(b, 'data-hhi') || a, mlo = num(b, 'data-mlo'), mhi = num(b, 'data-mhi') || mlo;
        var pay = rate ? months(+b.dataset.price, a * rate - mhi, z * rate - mlo) : '';
        document.querySelectorAll('[data-roi-for="' + b.id + '"]').forEach(function (el) {
          el.textContent = 'saves ≈ ' + hrs(a, z) + (pay ? ' · pays back ≈ ' + pay : '') + (el.getAttribute('data-roi-note') || '');
        });
        document.querySelectorAll('tr[data-roirow="' + b.id + '"]').forEach(function (r) {
          r.classList.toggle('sel', b.checked);
          var v = r.querySelector('[data-rval]'), p = r.querySelector('[data-rpay]');
          if (v) v.textContent = rate ? range(Math.round(a * rate), Math.round(z * rate)) : '·';
          if (p) p.textContent = pay || '·';
        });
        if (b.checked) { hlo += a; hhi += z; tlo += mlo; thi += mhi; n++; }
      });
      bar.querySelectorAll('[data-roi-seg]').forEach(function (el) { el.style.display = n ? '' : 'none'; });
      set('[data-hrs]', hrs(hlo, hhi));
      set('[data-tsave]', rate ? range(Math.round(hlo * rate), Math.round(hhi * rate)) : (hlo === hhi ? hlo : hlo + '–' + hhi) + ' hrs');
      set('[data-val]', rate ? range(Math.round(hlo * rate), Math.round(hhi * rate)) : '');
      set('[data-payback]', rate ? (months(buildTotal, hlo * rate - hostHi - thi, hhi * rate - hostLo - tlo) || 'n/a') : '');
      bar.querySelectorAll('[data-rate-only]').forEach(function (el) { el.style.display = rate ? '' : 'none'; });
    }
    document.querySelectorAll('input[data-rate-input]').forEach(function (inp) {
      if (rate && !inp.value) inp.value = rate;
      inp.addEventListener('input', function () {
        rate = Math.max(0, +inp.value || 0);
        document.querySelectorAll('input[data-rate-input]').forEach(function (o) { if (o !== inp) o.value = inp.value; });
        document.querySelectorAll('[data-rate-echo]').forEach(function (el) { el.textContent = rate ? fmt(rate) : 'your rate'; });
        recalc();
      });
    });
    function recalcRun() {
      if (!runs) return;
      var lo = 0, hi = 0, n = 0;
      boxes.forEach(function (b) {
        if (b.checked && b.hasAttribute('data-mlo')) { lo += +b.dataset.mlo; hi += +(b.dataset.mhi || b.dataset.mlo); n++; }
        document.querySelectorAll('tr[data-row="' + b.id + '"]').forEach(function (r) { r.classList.toggle('sel', b.checked); });
      });
      var seg = bar.querySelector('[data-mseg]');
      if (seg) seg.style.display = n ? '' : 'none';
      set('[data-mrun]', range(hostLo + lo, hostHi + hi));
      set('[data-mai]', range(lo, hi));
    }
    function box(id) { return document.getElementById(id); }
    function items(p) { return (p.getAttribute('data-items') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean); }
    function complete(p) { var ids = items(p); return ids.length > 0 && ids.every(function (id) { var b = box(id); return b && b.checked; }); }
    function set(sel, v) { var el = bar.querySelector(sel); if (el) el.textContent = v; }
    function recalc() {
      var sum = 0, count = 0;
      boxes.forEach(function (b) {
        var card = b.closest('.acard');
        if (b.checked) { sum += +b.dataset.price; count++; if (card) card.classList.add('sel'); }
        else if (card) { card.classList.remove('sel'); }
        var btn = document.querySelector('.addbtn[data-for="' + b.id + '"]');
        if (btn) btn.textContent = b.checked ? (btn.getAttribute('data-on') || '✓ Added') : (btn.getAttribute('data-off') || '＋ Add to build');
      });
      var allSel = boxes.every(function (b) { return b.checked; });
      var save = 0;
      if (allSel) { save = fullSave; }
      else { phases.forEach(function (p) { if (complete(p)) save += +(p.getAttribute('data-discount') || 0); }); }
      phases.forEach(function (p) {
        var done = complete(p);
        p.classList.toggle('sel', done);
        var pb = p.querySelector('.phbtn');
        if (pb) pb.textContent = done ? (pb.getAttribute('data-on') || '✓ Selected') : (pb.getAttribute('data-off') || pb.dataset.label || pb.textContent);
      });
      recalcRun();
      if (!count) { recalcRoi(0); bar.classList.remove('active'); return; }
      bar.classList.add('active');
      set('[data-count]', count);
      set('[data-sum]', fmt(sum));
      var seg = bar.querySelector('[data-save-seg]');
      if (seg) seg.style.display = save > 0 ? '' : 'none';
      set('[data-save]', fmt(save));
      set('[data-total]', fmt(foundation + sum - save));
      recalcRoi(foundation + sum - save);
    }
    document.querySelectorAll('.addbtn[data-for]').forEach(function (btn) {
      btn.addEventListener('click', function () { var b = box(btn.getAttribute('data-for')); if (b) { b.checked = !b.checked; recalc(); } });
    });
    phases.forEach(function (p) {
      var pb = p.querySelector('.phbtn'); if (!pb) return;
      // Remember the label the button shipped with. recalc() overwrites the
      // text on select, so without this a button that omits data-off fell back
      // to its CURRENT text and stayed on "Selected" after deselection, telling
      // the buyer a package was still chosen while its cards and price cleared.
      if (!pb.dataset.label) pb.dataset.label = pb.textContent.trim();
      pb.addEventListener('click', function () {
        var done = complete(p);
        items(p).forEach(function (id) { var b = box(id); if (b) b.checked = !done; });
        recalc();
      });
    });
    recalc();
  }

  /* The fixed bar changes height as it fills (prompt only, then up to three rows).
     Reserve exactly its height at the page bottom: a fixed padding left a gap
     under the footer when the bar was empty and hid the footer when it was full. */
  function padForBar() {
    var bar = document.querySelector('body > .totbar');
    if (!bar) return;
    function pad() { document.body.style.paddingBottom = bar.offsetHeight + 'px'; }
    pad();
    if (window.ResizeObserver) new ResizeObserver(pad).observe(bar);
    else window.addEventListener('resize', pad);
  }

  function boot() { observe(); fitDiagrams(); initMenu(); padForBar(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

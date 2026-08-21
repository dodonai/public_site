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
     -------------------------------------------------------------------------- */
  function initMenu() {
    var bar = document.querySelector('[data-menu-total]');
    if (!bar) return;
    var foundation = +(bar.getAttribute('data-foundation') || 0);
    var fullSave = +(bar.getAttribute('data-full-save') || 0);
    var boxes = [].slice.call(document.querySelectorAll('.acard input[type=checkbox][data-price]'));
    if (!boxes.length) return;
    var phases = [].slice.call(document.querySelectorAll('[data-phase][data-items]'));
    function fmt(n) { return '$' + n.toLocaleString('en-US'); }
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
        if (pb) pb.textContent = done ? (pb.getAttribute('data-on') || '✓ Selected') : (pb.getAttribute('data-off') || pb.textContent);
      });
      if (!count) { bar.classList.remove('active'); return; }
      bar.classList.add('active');
      set('[data-count]', count);
      set('[data-sum]', fmt(sum));
      var seg = bar.querySelector('[data-save-seg]');
      if (seg) seg.style.display = save > 0 ? '' : 'none';
      set('[data-save]', fmt(save));
      set('[data-total]', fmt(foundation + sum - save));
    }
    document.querySelectorAll('.addbtn[data-for]').forEach(function (btn) {
      btn.addEventListener('click', function () { var b = box(btn.getAttribute('data-for')); if (b) { b.checked = !b.checked; recalc(); } });
    });
    phases.forEach(function (p) {
      var pb = p.querySelector('.phbtn'); if (!pb) return;
      pb.addEventListener('click', function () {
        var done = complete(p);
        items(p).forEach(function (id) { var b = box(id); if (b) b.checked = !done; });
        recalc();
      });
    });
    recalc();
  }

  function boot() { observe(); fitDiagrams(); initMenu(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

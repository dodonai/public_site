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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();

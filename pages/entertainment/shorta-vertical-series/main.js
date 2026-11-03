/* ═══════════════════════════════════════
   Shorta — prelander behaviour
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  // ── Where every tap goes ────────────────────────────
  // `default` is used everywhere. Fill `ios` / `android` to send each
  // platform straight to its own store; either falls back to `default`.
  var CTA = {
    default: '',
    ios:     '',
    android: ''
  };

  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var ctaUrl = (isIOS && CTA.ios) || (isAndroid && CTA.android) || CTA.default;

  var ctas = document.querySelectorAll('.cta');
  ctas.forEach(function (el) {
    if (ctaUrl) el.href = ctaUrl;
    el.addEventListener('click', function (e) {
      if (!ctaUrl) {
        e.preventDefault();
        console.warn('Shorta prelander: set CTA.default in main.js');
      }
    });
  });

  // ── Story player ────────────────────────────────────
  var story    = document.querySelector('.story');
  var frames   = Array.prototype.slice.call(document.querySelectorAll('.frame'));
  var segs     = Array.prototype.slice.call(document.querySelectorAll('.seg'));
  var ambients = document.querySelectorAll('.ambient-img');

  if (story && frames.length && segs.length === frames.length) {
    var current = 0;
    var ambientFront = 0;

    function show(i) {
      frames.forEach(function (f, n) { f.classList.toggle('is-on', n === i); });

      segs.forEach(function (s, n) {
        s.classList.remove('is-now');
        s.classList.toggle('is-done', n < i);
      });
      // Force reflow so the fill animation restarts on the same segment.
      void segs[i].offsetWidth;
      segs[i].classList.add('is-now');

      // Crossfade the blurred backdrop between two layers.
      var back = ambients[1 - ambientFront];
      back.src = frames[i].currentSrc || frames[i].src;
      back.classList.add('is-on');
      ambients[ambientFront].classList.remove('is-on');
      ambientFront = 1 - ambientFront;

      current = i;
    }

    segs.forEach(function (s) {
      s.querySelector('i').addEventListener('animationend', function () {
        show((current + 1) % frames.length);
      });
    });

    // Pause while the visitor is looking closely or the tab is hidden.
    function setPaused(p) { story.classList.toggle('is-paused', p); }
    story.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') setPaused(true); });
    story.addEventListener('pointerleave', function () { setPaused(false); });
    story.addEventListener('focus', function () { setPaused(true); });
    story.addEventListener('blur', function () { setPaused(false); });
    document.addEventListener('visibilitychange', function () { setPaused(document.hidden); });

    // Warm the cache so every frame is ready before its turn.
    frames.forEach(function (f) { f.loading = 'eager'; });

    show(0);
  }

  // ── Mobile dock: step aside when the final CTA is on screen ──
  var dock  = document.querySelector('.dock');
  var final = document.querySelector('.final');
  if (dock && final && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      dock.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0.35 }).observe(final);
  }
})();

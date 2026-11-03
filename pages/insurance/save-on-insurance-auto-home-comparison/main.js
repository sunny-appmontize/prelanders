/* ═══════════════════════════════════════
   SaveOnInsurance — landing page behaviour
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  // Two offers. Whichever the visitor has selected (Auto by default,
  // matching the pre-selected tab) is where every link on the page goes.
  var OFFERS = {
    auto: 'https://paychat.fuse-ad.com/tl?a=1651&o=6456',
    home: 'https://midasrates.com/get-fast-quote-home.html?aid=74&cid=48&sid=&tid=&ks=&zip=10001&lead_type=home&form_id=2&=undefined#/property-type'
  };
  var selectedOffer = 'auto';

  function applyOffer() {
    var url = OFFERS[selectedOffer];
    document.querySelectorAll('.offer-link').forEach(function (link) {
      link.href = url;
    });
  }

  // ── Meta Pixel — Lead on conversion ──────────────────
  var isLocal = ['localhost', '127.0.0.1', ''].indexOf(window.location.hostname) !== -1;

  // One pixel per product. Both get PageView (see index.html); a Lead
  // goes only to the pixel of the offer the visitor is sent to.
  var PIXELS = {
    home: '1465519845471669',
    auto: '1130732182671387'
  };

  function fireLead(cb) {
    if (!isLocal && typeof fbq === 'function') {
      fbq('trackSingle', PIXELS[selectedOffer], 'Lead', {
        content_name: selectedOffer === 'home' ? 'Home Insurance' : 'Auto Insurance',
        value: 0.0,
        currency: 'USD'
      });
    }
    // Give the pixel beacon a moment to flush before navigating away.
    setTimeout(cb, 250);
  }

  // Every CTA click fires Lead, then follows the link.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.offer-link');
    if (!link) return;
    e.preventDefault();
    var href = link.href;
    fireLead(function () {
      window.location.href = href;
    });
  });

  // ── Mobile menu ──────────────────────────────────────
  var burger = document.getElementById('hamburger');
  var menu   = document.getElementById('mobile-menu');

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // close after tapping a link
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Product tabs ─────────────────────────────────────
  // Picking Auto or Home only selects it and retargets every link on
  // the page — it does NOT navigate. Navigation happens when the
  // visitor clicks an actual CTA (a .offer-link or the ZIP form).
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      selectedOffer = tab.textContent.trim().toLowerCase() === 'home' ? 'home' : 'auto';
      applyOffer();
    });
  });

  // ── ZIP form ─────────────────────────────────────────
  // Submitting sends the visitor to whichever offer is currently
  // selected — no multi-step quiz, no validation gate.
  var form = document.getElementById('zip-form');
  var zip  = document.getElementById('zip');

  if (zip) {
    zip.addEventListener('input', function () {
      zip.value = zip.value.replace(/\D/g, '').slice(0, 5);
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var href = OFFERS[selectedOffer];
      fireLead(function () {
        window.location.href = href;
      });
    });
  }

  applyOffer();
})();

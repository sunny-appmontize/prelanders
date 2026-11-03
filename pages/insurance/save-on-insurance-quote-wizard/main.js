// Two offers. Whichever product the visitor last picked determines
// where every link on the page goes. Auto is the default until they
// pick something, matching a visitor who hasn't chosen yet.
const OFFERS = {
  auto: "https://paychat.fuse-ad.com/tl?a=1651&o=6456",
  home: "https://midasrates.com/get-fast-quote-home.html?aid=74&cid=48&sid=&tid=&ks=&zip=10001&lead_type=home&form_id=2&=undefined#/property-type",
};
let selectedOffer = "auto";

function applyOffer() {
  const url = OFFERS[selectedOffer];
  document.querySelectorAll(".offer-link").forEach((link) => {
    link.href = url;
  });
}

// ── Meta Pixel — Lead on conversion ──────────────────
const isLocal = ["localhost", "127.0.0.1", ""].indexOf(window.location.hostname) !== -1;

// One pixel per product. Both get PageView (see index.html); a Lead
// goes only to the pixel of the offer the visitor is sent to.
const PIXELS = {
  home: "1465519845471669",
  auto: "1130732182671387",
};

function fireLead(cb) {
  if (!isLocal && typeof fbq === "function") {
    fbq("trackSingle", PIXELS[selectedOffer], "Lead", {
      content_name: selectedOffer === "home" ? "Home Insurance" : "Auto Insurance",
      value: 0.0,
      currency: "USD",
    });
  }
  // Give the pixel beacon a moment to flush before navigating away.
  setTimeout(cb, 250);
}

// Every CTA click (logo, nav, footer, Call Licensed Agent — any
// .offer-link) fires Lead, then follows the link.
document.addEventListener("click", function (e) {
  const link = e.target.closest(".offer-link");
  if (!link) return;
  e.preventDefault();
  const href = link.href;
  fireLead(() => {
    window.location.href = href;
  });
});

// ─── HAMBURGER ───
function toggleMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const burger = document.getElementById('hamburger');
  drawer.classList.toggle('open');
  burger.classList.toggle('open');
}

// ─── TRUST BAR CAROUSEL ───
let trustIdx = 0;
const trustTrack = document.getElementById('trust-track');
if (trustTrack) {
  setInterval(() => {
    trustIdx = (trustIdx + 1) % 3;
    trustTrack.style.transform = `translateX(-${trustIdx * 100}%)`;
  }, 2800);
}

// ═══════════════════════════════════════
// PRODUCT SELECT — SaveOnInsurance
// Picking Home/Auto retargets every link on the page to that offer.
// Continuing sends the visitor straight there. There is no multi-step
// quiz on this page.
// ═══════════════════════════════════════

const PRODUCTS = {
  home: { label: "Home", icon: "🏠" },
  auto: { label: "Auto", icon: "🚗" },
};

// Exactly one product can be selected at a time — picking one
// deselects the other, same as insurify's Auto/Home tabs.
let selectedProduct = null;

function toggleProduct(p) {
  selectedProduct = p;
  selectedOffer = p === "home" ? "home" : "auto";
  applyOffer();
  render();
}

function startQuestions() {
  if (!selectedProduct) return;
  const href = OFFERS[selectedOffer];
  fireLead(() => {
    window.location.href = href;
  });
}

// ── Click delegation ──
document.addEventListener("click", function (e) {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const action = t.dataset.action, val = t.dataset.val;
  if (action === "toggle-product") toggleProduct(val);
  else if (action === "start") startQuestions();
});

function render() {
  const c = document.getElementById("step-container");
  c.innerHTML = renderSelect();
  document.getElementById("back-wrap").style.display = "none";
}

function renderSelect() {
  const cards = ["home", "auto"].map(p => {
    const def = PRODUCTS[p], sel = selectedProduct === p;
    return `<div class="product-card ${sel ? "sel" : ""}" data-action="toggle-product" data-val="${p}"><div class="product-icon">${def.icon}</div><div class="product-label">${def.label}</div><div class="product-check">&#10003;</div></div>`;
  }).join("");
  return `<h2 class="step-title" style="font-size:28px">What would you like to insure?</h2><p class="step-sub" style="margin-bottom:20px">Select one</p><div class="product-grid">${cards}</div><button class="btn-primary" data-action="start" style="${!selectedProduct ? "opacity:.4;cursor:default" : ""}">Compare Rates →</button>`;
}

document.getElementById("step-container").style.transition = "opacity .18s ease,transform .18s ease";

applyOffer();
render();

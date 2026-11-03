(function () {
  "use strict";

  // --- CONFIG ---
  var audioMap = {
    msg1: "msg1",
    msg2: "msg2",
    msg3: "msg3",
    msg7: "msg7",
    msg10: "msg10",
    msg13: "y_msg7",
    msg14: "y_msg8",
    msg15: "y_msg9",
    msg18: "sorry",
  };
  var MSG_GAP = 500;
  var AUDIO_GAP = 400;

  // --- AUDIO QUEUE ---
  var player = new Audio();
  player.preload = "none";
  player.playbackRate = 1.2;
  var queue = [];
  var draining = false;

  function enqueue(ids) {
    for (var i = 0; i < ids.length; i++) {
      var f = audioMap[ids[i]];
      if (f) queue.push(f);
    }
    if (!draining) drain();
  }

  function drain() {
    if (queue.length === 0) {
      draining = false;
      return;
    }
    draining = true;
    var file = queue.shift();
    player.src = "audio/" + file + ".mp3";
    player.playbackRate = 1.2;
    var next = function () { setTimeout(drain, AUDIO_GAP); };
    player.onended = next;
    player.onerror = next;
    var p = player.play();
    if (p && typeof p.catch === "function") p.catch(next);
  }

  function clearAudio() {
    queue = [];
    try { player.pause(); } catch (e) {}
    player.removeAttribute("src");
    draining = false;
  }

  // --- DOM HELPERS ---
  function $(id) { return document.getElementById(id); }
  function show(id) {
    var el = $(id);
    if (el) el.classList.remove("hidden");
    scrollToBottom();
  }
  function hide(id) {
    var el = $(id);
    if (el) el.classList.add("hidden");
  }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function scrollToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }

  function showChunk(ids) {
    ids.forEach(function (id, i) {
      setTimeout(function () {
        var el = $(id);
        if (el) el.classList.remove("hidden");
        scrollToBottom();
      }, i * MSG_GAP);
    });
    enqueue(ids);
  }

  // --- INTRO ---
  async function startIntro() {
    await delay(800);
    var t = $("initTyping");
    if (t && t.parentNode) t.parentNode.removeChild(t);

    showChunk(["msg1", "msg2", "msg3"]);
    await delay(3 * MSG_GAP + 400);
    show("agentBlock2");
    await delay(150);
    showChunk(["msg7"]);
    await delay(MSG_GAP + 300);
    show("msg8a");
  }

  // --- CLICKS ---
  function onChatButtonClick(e) {
    var btn = e.currentTarget;
    var step = parseInt(btn.getAttribute("data-form-step"), 10);
    var value = btn.getAttribute("data-form-value");

    clearAudio();

    // disable sibling buttons in this group
    var parent = btn.parentNode;
    if (parent) {
      var siblings = parent.querySelectorAll(".chat-button");
      for (var i = 0; i < siblings.length; i++) siblings[i].disabled = true;
    }

    if (step === 1) {
      handleAge(value);
    } else if (step === 2) {
      handleMedicare(value);
    }
  }

  async function handleAge(value) {
    hide("msg8a");
    show("userBlock2");
    if (value.indexOf("54") !== -1) show("msg9-54to75");
    else show("msg9-76andOlder");

    await delay(350);
    show("agentBlock3");
    await delay(150);

    showChunk(["msg10"]);
    await delay(MSG_GAP + 300);
    show("msg11");
  }

  async function handleMedicare(value) {
    hide("msg11");
    show("userBlock3");
    if (value === "Yes") show("msg12Yes");
    else show("msg12No");

    await delay(350);
    show("agentBlock4");
    await delay(150);

    if (value === "Yes") {
      showChunk(["msg13", "msg14", "msg15"]);
      await delay(3 * MSG_GAP + 350);
      show("msg17");
    } else {
      showChunk(["msg18"]);
      await delay(MSG_GAP + 400);
      show("disconnected");
    }
  }

  // --- AFFILIATE LINK WIRING ---
  function wireAffiliateLinks() {
    var params = new URLSearchParams(window.location.search);
    var affClick = params.get("aff_click_id");
    var sc = params.get("sc");
    var fbclid = params.get("fbclid");

    var finalClickId = null;
    if (affClick && affClick !== "{fbclid}") finalClickId = affClick;
    else if (fbclid) finalClickId = fbclid;

    var finalSc = (sc && sc !== "{ad_name}") ? sc : null;

    var baseCTA = "https://paychat.fuse-ad.com/tl?a=1651&o=6156";
    var finalCTA = baseCTA;
    if (finalClickId) finalCTA += "&aff_click_id=" + encodeURIComponent(finalClickId);
    if (finalSc) finalCTA += "&sc=" + encodeURIComponent(finalSc);

    var links = document.querySelectorAll(".dynamic_link");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", finalCTA);
      links[i].addEventListener("click", function () {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            click_id: finalClickId || null,
            ad_name: finalSc || null,
          });
        }
        if (window._nb_pixel) {
          window._nb_pixel.push(["track", "click_button", { click_id: finalClickId || null }]);
        }
      });
    }
  }

  // --- INIT ---
  function init() {
    wireAffiliateLinks();
    var buttons = document.querySelectorAll(".chat-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", onChatButtonClick);
    }
    startIntro();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

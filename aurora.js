(function () {
  function rand(min, max) { return Math.random() * (max - min) + min; }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* responsive.js sets these globals before aurora.js loads.
     Fall back to desktop defaults if not set. */
  var ribbonCount = prefersReduced ? 0
    : (window.AURORA_RIBBON_COUNT !== undefined ? window.AURORA_RIBBON_COUNT : 24);
  var starCount   = prefersReduced ? 0
    : (window.AURORA_STAR_COUNT   !== undefined ? window.AURORA_STAR_COUNT   : 150);

  var colors = [
    "rgba(90,255,180,0.14)",
    "rgba(140,100,255,0.14)",
    "rgba(120,255,210,0.10)",
    "rgba(180,130,255,0.12)",
  ];

  /* ── Ribbons ─────────────────────────────────────────────── */
  var ribbons = document.getElementById("auroraRibbons");
  if (ribbons && ribbonCount > 0) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < ribbonCount; i++) {
      var s    = document.createElement("span");
      var h    = Math.round(rand(120, 320));
      var ml   = Math.round(rand(6, 40));
      var mt   = Math.round(rand(-60, 120));
      var blur = Math.round(rand(40, 110));
      var dur  = Math.round(rand(6000, 18000));
      var c    = colors[Math.floor(Math.random() * colors.length)];
      s.style.cssText =
        "display:block;width:18px;min-height:" + h + "px;" +
        "margin-left:" + ml + "px;margin-top:" + mt + "px;" +
        "border-radius:5% 52% 30px 20px;opacity:0.6;" +
        "background:transparent;" +
        "box-shadow:0 0 " + blur + "px 20px " + c + ";" +
        "animation:topup " + dur + "ms infinite linear;" +
        "transform:skew(-10deg,18deg) translateX(" + Math.round(rand(-8, 8)) + "px);" +
        "will-change:transform;";
      frag.appendChild(s);
    }
    ribbons.appendChild(frag);
  }

  /* ── Stars ───────────────────────────────────────────────── */
  var starContainer = document.getElementById("stars");

  function createStars() {
    if (!starContainer || starCount === 0) return;
    starContainer.innerHTML = "";
    var frag = document.createDocumentFragment();
    for (var i = 0; i < starCount; i++) {
      var star    = document.createElement("span");
      var size    = Math.random() * 2 + 0.2;
      var opacity = Math.random() * 0.9 + 0.1;
      star.style.cssText =
        "position:absolute;" +
        "left:"   + (Math.random() * 100) + "%;" +
        "top:"    + (Math.random() * 100) + "%;" +
        "width:"  + size + "px;height:" + size + "px;" +
        "border-radius:50%;" +
        "background:rgba(255,255,255," + opacity.toFixed(2) + ");" +
        "box-shadow:0 0 " + Math.round(size * 6) + "px rgba(255,255,255," +
          (opacity / 2).toFixed(2) + ");" +
        "pointer-events:none;";
      frag.appendChild(star);
    }
    starContainer.appendChild(frag);
  }

  createStars();

  /* ── Pause when tab hidden (saves battery) ───────────────── */
  document.addEventListener("visibilitychange", function () {
    var state = document.hidden ? "paused" : "running";
    var bg = document.getElementById("auroraBg");
    if (!bg) return;
    var animated = bg.querySelectorAll("*");
    for (var i = 0; i < animated.length; i++) {
      animated[i].style.animationPlayState = state;
    }
  });

  /* ── Resize — skip on mobile (static CSS handles it) ─────── */
  var resizeTimer;
  window.addEventListener("resize", function () {
    if (window.QUARTZ_DEVICE) return; /* mobile — skip */
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStars, 300);
  }, { passive: true });

})();
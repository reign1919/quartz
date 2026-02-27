(function () {
  function rand(min, max) { return Math.random() * (max - min) + min; }

  var colors = [
    "rgba(90,255,180,0.14)",
    "rgba(140,100,255,0.14)",
    "rgba(120,255,210,0.10)",
    "rgba(180,130,255,0.12)",
  ];

  var ribbons = document.getElementById("auroraRibbons");
  if (ribbons) {
    for (var i = 0; i < 24; i++) {
      var s = document.createElement("span");
      var h = Math.round(rand(120, 320));
      var ml = Math.round(rand(6, 40));
      var mt = Math.round(rand(-60, 120));
      var blur = Math.round(rand(40, 110));
      var dur = Math.round(rand(6000, 18000));
      var c = colors[Math.floor(Math.random() * colors.length)];
      s.style.cssText =
        "display:block;width:18px;min-height:" + h + "px;margin-left:" + ml +
        "px;margin-top:" + mt + "px;border-radius:5% 52% 30px 20px;opacity:0.6;" +
        "background:transparent;box-shadow:0 0 " + blur + "px 20px " + c +
        ";animation:topup " + dur + "ms infinite linear;transform:skew(-10deg,18deg)" +
        " translateX(" + Math.round(rand(-8, 8)) + "px);will-change:transform;";
      ribbons.appendChild(s);
    }
  }

  var starContainer = document.getElementById("stars");
  function createStars() {
    if (!starContainer) return;
    starContainer.innerHTML = "";
    for (var i = 0; i < 150; i++) {
      var star = document.createElement("span");
      var size = Math.random() * 2 + 0.2;
      var opacity = Math.random() * 0.9 + 0.1;
      star.style.cssText =
        "position:absolute;left:" + (Math.random() * 100) + "%;top:" +
        (Math.random() * 100) + "%;width:" + size + "px;height:" + size +
        "px;border-radius:50%;background:rgba(255,255,255," + opacity.toFixed(2) +
        ");box-shadow:0 0 " + Math.round(size * 6) + "px rgba(255,255,255," +
        (opacity / 2).toFixed(2) + ");pointer-events:none;";
      starContainer.appendChild(star);
    }
  }
  createStars();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStars, 200);
  });
})();

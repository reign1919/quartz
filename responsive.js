/* ============================================================
   RESPONSIVE.JS — Quartz
   Detects mobile devices and sets performance globals.
   MUST be loaded BEFORE aurora.js in every HTML page.
   ============================================================ */

(function () {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth <= 768;

  // Expose globally so aurora.js and other scripts can check
  window.QUARTZ_DEVICE = isMobile ? 'mobile' : null;

  if (isMobile) {
    // Reduce aurora effects for performance
    window.AURORA_RIBBON_COUNT = 8;
    window.AURORA_STAR_COUNT = 40;
    document.documentElement.classList.add('is-mobile');
  } else {
    window.AURORA_RIBBON_COUNT = 24;
    window.AURORA_STAR_COUNT = 150;
  }
})();

window.addEventListener('pageshow', function() {
  // re-run device detection
  window.QUARTZ_DEVICE = window.innerWidth <= 768 ? 'mobile' : 'desktop';
});

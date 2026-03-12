/* ============================================================
   DISCOUNT-BADGE.JS — Quartz
   Injects % discount badges into every product card
   that has both a .price-old and .price-new element.

   Call discountBadges.init() AFTER renderCards() has run,
   OR just include this file — it hooks into MutationObserver
   so it auto-fires whenever the product grid updates.
   ============================================================ */

var discountBadges = (function () {

  function calcDiscount(oldPrice, newPrice) {
    if (!oldPrice || oldPrice <= newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }

  function badgeHTML(pct) {
    var isHigh = pct >= 70;
    var cls = 'discount-badge' + (isHigh ? ' discount-badge--high' : '');
    var arrow = isHigh ? '🔥' : '↓';
    return (
      '<span class="' + cls + '">' +
        '<span class="badge-arrow">' + arrow + '</span>' +
        pct + '% off' +
      '</span>'
    );
  }

  function decorateGrid() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.product-card');
    cards.forEach(function (card) {
      // Skip if already decorated
      if (card.querySelector('.discount-badge')) return;

      var oldEl  = card.querySelector('.price-old');
      var newEl  = card.querySelector('.price-new');
      if (!oldEl || !newEl) return;

      // Parse numeric values (strip ₹ and commas)
      var oldVal = parseFloat(oldEl.textContent.replace(/[₹,]/g, ''));
      var newVal = parseFloat(newEl.textContent.replace(/[₹,]/g, ''));
      var pct    = calcDiscount(oldVal, newVal);
      if (pct <= 0) return;

      // Wrap old+new prices in a flex row and inject badge
      var priceContainer = oldEl.parentElement;

      // Replace the loose <br> + spans with a tidy row
      priceContainer.innerHTML =
        '<span class="price-old">₹' + oldVal.toFixed(2) + '</span>' +
        '<div class="price-badge-row">' +
          '<span class="price-new">₹' + newVal.toFixed(2) + '</span>' +
          badgeHTML(pct) +
        '</div>';
    });
  }

  function init() {
    decorateGrid();

    // Watch the grid for DOM changes (re-renders on sort / add-to-cart)
    var grid = document.getElementById('productGrid');
    if (!grid) return;

    var observer = new MutationObserver(function (mutations) {
      var relevant = mutations.some(function (m) {
        return m.addedNodes.length > 0;
      });
      if (relevant) decorateGrid();
    });

    observer.observe(grid, { childList: true, subtree: false });
  }

  // Auto-init on DOMContentLoaded (safe even if DOM already ready)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is ready — but product grid renders via JS, so wait one tick
    setTimeout(init, 0);
  }

  return { init: init, decorate: decorateGrid };

})();
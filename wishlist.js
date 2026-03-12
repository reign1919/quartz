/* ============================================================
   WISHLIST.JS — Quartz
   Full wishlist: localStorage persistence, floating drawer,
   toast notifications, heart button state sync.
   ============================================================ */

var wishlist = (function () {

  var WISH_KEY = 'quartz-wishlist';

  /* ── Storage ─────────────────────────────────────────────── */

  function getWishlist() {
    try {
      var raw = localStorage.getItem(WISH_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISH_KEY, JSON.stringify(list));
  }

  function isWished(productId) {
    return getWishlist().indexOf(productId) !== -1;
  }

  function toggle(productId) {
    var list = getWishlist();
    var idx  = list.indexOf(productId);
    var added;
    if (idx === -1) { list.push(productId); added = true; }
    else            { list.splice(idx, 1);  added = false; }
    saveWishlist(list);
    return added;
  }

  function remove(productId) {
    saveWishlist(getWishlist().filter(function (id) { return id !== productId; }));
  }

  function clear() {
    localStorage.removeItem(WISH_KEY);
  }

  /* ── Toast ───────────────────────────────────────────────── */

  var _toastTimer;

  function showToast(msg, isAdd) {
    var el = document.getElementById('wishToast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'wish-toast wish-toast--' + (isAdd ? 'add' : 'remove') + ' wish-toast--show';
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () {
      el.classList.remove('wish-toast--show');
    }, 2400);
  }

  /* ── Heart Button Sync ───────────────────────────────────── */

  function syncHearts() {
    document.querySelectorAll('[data-wish]').forEach(function (btn) {
      var id = btn.getAttribute('data-wish');
      var wished = isWished(id);
      btn.classList.toggle('wished', wished);
      btn.setAttribute('title', wished ? 'Remove from wishlist' : 'Add to wishlist');
      btn.innerHTML = wished ? '♥' : '♡';
    });
  }

  /* ── Drawer ──────────────────────────────────────────────── */

  function buildDrawer() {
    if (document.getElementById('wishDrawer')) return;

    /* Overlay */
    var overlay = document.createElement('div');
    overlay.id = 'wishOverlay';
    overlay.className = 'wish-overlay';
    overlay.addEventListener('click', closeDrawer);

    /* Drawer */
    var drawer = document.createElement('div');
    drawer.id = 'wishDrawer';
    drawer.className = 'wish-drawer';
    drawer.innerHTML =
      '<div class="wish-drawer-header">' +
        '<div class="wish-drawer-title">' +
          '<span class="wish-drawer-icon">♥</span>' +
          'Wishlist' +
          '<span class="wish-drawer-count" id="wishDrawerCount">0</span>' +
        '</div>' +
        '<button class="wish-close-btn" id="wishCloseBtn" title="Close">✕</button>' +
      '</div>' +
      '<div class="wish-drawer-body" id="wishDrawerBody"></div>' +
      '<div class="wish-drawer-footer" id="wishDrawerFooter"></div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById('wishCloseBtn').addEventListener('click', closeDrawer);
  }

  function openDrawer() {
    buildDrawer();
    renderDrawer();
    document.getElementById('wishOverlay').classList.add('wish-overlay--show');
    document.getElementById('wishDrawer').classList.add('wish-drawer--open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var d = document.getElementById('wishDrawer');
    var o = document.getElementById('wishOverlay');
    if (d) d.classList.remove('wish-drawer--open');
    if (o) o.classList.remove('wish-overlay--show');
    document.body.style.overflow = '';
  }

  function renderDrawer() {
    var body  = document.getElementById('wishDrawerBody');
    var count = document.getElementById('wishDrawerCount');
    var footer = document.getElementById('wishDrawerFooter');
    if (!body) return;

    var list = getWishlist();
    count.textContent = list.length;

    if (list.length === 0) {
      body.innerHTML =
        '<div class="wish-empty">' +
          '<div class="wish-empty-icon">♡</div>' +
          '<p>Your wishlist is empty</p>' +
          '<span>Tap ♡ on any item to save it here</span>' +
        '</div>';
      footer.innerHTML = '';
      return;
    }

    var html = '';
    list.forEach(function (id) {
      var p = (typeof findProduct === 'function') ? findProduct(id) : null;
      if (!p) return;
      var pct = p.oldPrice > p.price
        ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
        : 0;
      html +=
        '<div class="wish-item" data-id="' + p.id + '">' +
          '<div class="wish-item-body">' +
            '<div class="wish-item-name">' + p.name + '</div>' +
            '<div class="wish-item-meta">' +
              '<span class="wish-item-class">Class ' + p.classLevel + '</span>' +
              (pct ? '<span class="wish-item-badge">' + pct + '% off</span>' : '') +
            '</div>' +
            '<div class="wish-item-prices">' +
              '<span class="wish-price-new">₹' + p.price.toFixed(2) + '</span>' +
              '<span class="wish-price-old">₹' + p.oldPrice.toFixed(2) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="wish-item-actions">' +
            '<button class="wish-add-cart-btn" data-wish-cart="' + p.id + '" title="Add to cart">🛒 Add</button>' +
            '<button class="wish-remove-btn" data-wish-remove="' + p.id + '" title="Remove">✕</button>' +
          '</div>' +
        '</div>';
    });

    body.innerHTML = html;

    /* Add-to-cart from drawer */
    body.querySelectorAll('[data-wish-cart]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-wish-cart');
        if (typeof addToCart === 'function') addToCart(id);
        /* Update cart badge if present */
        var badge = document.getElementById('cartBadge');
        if (badge && typeof getTotalItems === 'function') badge.textContent = getTotalItems();
        btn.textContent = '✔ Added';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = '🛒 Add'; btn.disabled = false; }, 1800);
      });
    });

    /* Remove from drawer */
    body.querySelectorAll('[data-wish-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-wish-remove');
        remove(id);
        var item = body.querySelector('.wish-item[data-id="' + id + '"]');
        if (item) {
          item.classList.add('wish-item--removing');
          setTimeout(function () { renderDrawer(); syncHearts(); updateFloatBadge(); }, 280);
        }
      });
    });

    /* Footer: clear all */
    footer.innerHTML =
      '<button class="wish-clear-btn" id="wishClearBtn">Clear all</button>';
    document.getElementById('wishClearBtn').addEventListener('click', function () {
      clear();
      renderDrawer();
      syncHearts();
      updateFloatBadge();
    });
  }

  /* ── Floating Wishlist Button ────────────────────────────── */

  function buildFloatBtn() {
    if (document.getElementById('wishFloat')) return;
    var btn = document.createElement('div');
    btn.id = 'wishFloat';
    btn.className = 'wish-float';
    btn.innerHTML =
      '<button class="wish-float-btn" id="wishFloatBtn" title="Open Wishlist">' +
        '<span class="wish-float-heart">♥</span>' +
        '<span class="wish-float-badge" id="wishFloatBadge" style="display:none">0</span>' +
      '</button>';
    document.body.appendChild(btn);
    document.getElementById('wishFloatBtn').addEventListener('click', openDrawer);
  }

  function updateFloatBadge() {
    var badge = document.getElementById('wishFloatBadge');
    if (!badge) return;
    var count = getWishlist().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  /* ── Toast element ───────────────────────────────────────── */

  function buildToast() {
    if (document.getElementById('wishToast')) return;
    var t = document.createElement('div');
    t.id = 'wishToast';
    t.className = 'wish-toast';
    document.body.appendChild(t);
  }

  /* ── Public: init ────────────────────────────────────────── */

  function init() {
    buildToast();
    buildFloatBtn();
    buildDrawer();
    syncHearts();
    updateFloatBadge();

    /* Listen for heart clicks anywhere on the page */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-wish]');
      if (!btn) return;
      var id    = btn.getAttribute('data-wish');
      var added = toggle(id);

      /* Animate the button */
      btn.classList.toggle('wished', added);
      btn.innerHTML = added ? '♥' : '♡';
      btn.setAttribute('title', added ? 'Remove from wishlist' : 'Add to wishlist');
      btn.classList.add('wish-pop');
      setTimeout(function () { btn.classList.remove('wish-pop'); }, 400);

      /* Toast */
      var p = (typeof findProduct === 'function') ? findProduct(id) : null;
      var name = p ? p.name : 'Item';
      showToast(
        added ? ('♥ ' + ' added to wishlist') : ('♡ Removed from wishlist'),
        added
      );

      updateFloatBadge();

      /* If drawer is open, re-render it */
      var drawer = document.getElementById('wishDrawer');
      if (drawer && drawer.classList.contains('wish-drawer--open')) renderDrawer();
    });
  }

  /* Auto-init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

  return { getWishlist: getWishlist, isWished: isWished, syncHearts: syncHearts, open: openDrawer, updateFloatBadge: updateFloatBadge };

})();
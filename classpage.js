

function initClassPage(products) {
  var grid       = document.getElementById("productGrid");
  var sortSelect = document.getElementById("sortSelect");
  var badge      = document.getElementById("cartBadge");

  /* ── Inject search bar above sort bar ─────────────────── */

  var sortBar = document.querySelector(".sort-bar");
  if (sortBar) {
    var searchWrap = document.createElement("div");
    searchWrap.className = "search-wrap";
    searchWrap.innerHTML =
      '<span class="search-icon">🔍</span>' +
      '<input ' +
        'type="text" ' +
        'id="searchInput" ' +
        'class="search-input" ' +
        'placeholder="Search notes, subjects, topics…" ' +
        'autocomplete="off" ' +
        'spellcheck="false" ' +
      '/>' +
      '<button class="search-clear" id="searchClear" title="Clear search">✕</button>';

    sortBar.parentNode.insertBefore(searchWrap, sortBar);
  }

  /* ── Inject results tag placeholder (shown when searching) */

  var resultsTag = document.createElement("div");
  resultsTag.id = "searchResultsTag";
  resultsTag.style.display = "none";
  if (sortBar) sortBar.parentNode.insertBefore(resultsTag, sortBar);

  var searchInput = document.getElementById("searchInput");
  var searchClear = document.getElementById("searchClear");

  /* ── Search state ──────────────────────────────────────── */

  var currentQuery = "";

  function normalise(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  }

  function matches(product, query) {
    if (!query) return true;
    var haystack = normalise(
      product.name + " " +
      product.caption + " " +
      (product.classLevel ? "class " + product.classLevel : "")
    );
    var words = query.split(/\s+/).filter(Boolean);
    return words.every(function (w) { return haystack.indexOf(w) !== -1; });
  }

  function highlight(text, query) {
    if (!query) return text;
    var words = query.trim().split(/\s+/).filter(Boolean);
    var escaped = words.map(function (w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("|");
    var re = new RegExp("(" + escaped + ")", "gi");
    return text.replace(re, '<mark class="search-highlight">$1</mark>');
  }

  /* ── Badge ─────────────────────────────────────────────── */

  function updateBadge() {
    badge.textContent = getTotalItems();
  }

  /* ── Render ────────────────────────────────────────────── */

  function renderCards(list) {
    grid.innerHTML = "";
    var query    = normalise(currentQuery);
    var filtered = list.filter(function (p) { return matches(p, query); });

    /* Results tag */
    var tag = document.getElementById("searchResultsTag");
    if (query && tag) {
      tag.style.display = "inline-flex";
      tag.className = "search-results-tag";
      tag.innerHTML =
        '<span class="tag-count">' + filtered.length + '</span>' +
        ' result' + (filtered.length !== 1 ? "s" : "") +
        ' for <span class="tag-query">"' + currentQuery.trim() + '"</span>';
    } else if (tag) {
      tag.style.display = "none";
    }

    /* No results */
    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="search-empty">' +
          '<div class="search-empty-icon">🔎</div>' +
          '<div class="search-empty-title">No results for "' + currentQuery.trim() + '"</div>' +
          '<div class="search-empty-sub">Try a subject name, topic, or class number</div>' +
        '</div>';
      return;
    }

    filtered.forEach(function (p) {
      var qty  = getQuantity(p.id);
      var card = document.createElement("div");
      card.className = "glass-card product-card";

      var actionsHTML;
      if (qty === 0) {
        actionsHTML =
          '<button class="icon-btn" data-add="' + p.id + '" title="Add to cart">🛒</button>';
      } else {
        actionsHTML =
          '<div class="qty-control">' +
            '<button class="qty-btn" data-dec="' + p.id + '">−</button>' +
            '<span class="qty-num">' + qty + '</span>' +
            '<button class="qty-btn" data-inc="' + p.id + '">+</button>' +
          '</div>';
      }

      var displayName    = highlight(p.name,    currentQuery.trim());
      var displayCaption = highlight(p.caption, currentQuery.trim());

      card.innerHTML =
        '<div class="product-image">' +
          '<div>' +
            '<h2>' + displayName + '</h2>' +
            '<p>' + displayCaption + '</p>' +
            (p.hot ? '<span class="hot-badge">🔥 Hot Selling</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="product-info">' +
          '<div>' +
            '<span class="price-old">₹' + p.oldPrice.toFixed(2) + '</span><br>' +
            '<span class="price-new">₹' + p.price.toFixed(2) + '</span>' +
          '</div>' +
          '<div class="product-actions">' +
            '<button class="icon-btn" data-wish="' + p.id + '" title="Add to wishlist">♡</button>' +
            actionsHTML +
          '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    /* Cart events */
    grid.querySelectorAll("[data-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addToCart(btn.getAttribute("data-add"));
        render();
      });
    });
    grid.querySelectorAll("[data-inc]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addToCart(btn.getAttribute("data-inc"));
        render();
      });
    });
    grid.querySelectorAll("[data-dec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        decreaseQty(btn.getAttribute("data-dec"));
        render();
      });
    });

    /* Sync wishlist hearts */
    if (typeof wishlist !== "undefined" && wishlist.syncHearts) {
      wishlist.syncHearts();
    }
  }

  function getSorted() {
    var copy = products.slice();
    var mode = sortSelect.value;
    if (mode === "low")       copy.sort(function (a, b) { return a.price - b.price; });
    else if (mode === "high") copy.sort(function (a, b) { return b.price - a.price; });
    else if (mode === "hot")  copy.sort(function (a, b) { return (b.hot ? 1 : 0) - (a.hot ? 1 : 0); });
    return copy;
  }

  function render() {
    renderCards(getSorted());
    updateBadge();
  }

  /* ── Search events ─────────────────────────────────────── */

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentQuery = searchInput.value;
      searchClear.classList.toggle("search-clear--visible", currentQuery.length > 0);
      render();
    });

    /* Press "/" anywhere to jump to search */
    document.addEventListener("keydown", function (e) {
      if (
        e.key === "/" &&
        document.activeElement !== searchInput &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA" &&
        document.activeElement.tagName !== "SELECT"
      ) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
      /* Escape clears and blurs */
      if (e.key === "Escape" && document.activeElement === searchInput) {
        currentQuery = "";
        searchInput.value = "";
        searchClear.classList.remove("search-clear--visible");
        render();
        searchInput.blur();
      }
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", function () {
      currentQuery = "";
      searchInput.value = "";
      searchClear.classList.remove("search-clear--visible");
      searchInput.focus();
      render();
    });
  }

  sortSelect.addEventListener("change", render);
  render();
}
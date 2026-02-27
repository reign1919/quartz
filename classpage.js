function initClassPage(products) {
  var grid = document.getElementById("productGrid");
  var sortSelect = document.getElementById("sortSelect");
  var badge = document.getElementById("cartBadge");

  console.log("initClassPage called with", products.length, "products"); // Debug
  console.log("Grid element:", grid); // Debug

// In your classpage.js or cartpage.js — replace the existing place order handler

function handlePlaceOrder() {
  var emailInput = document.getElementById("emailInput"); // your email input
  var email = emailInput.value.trim();
  var emailError = document.getElementById("emailError");

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.style.display = "block";
    return;
  }
  emailError.style.display = "none";

  // Build product summary from cart
  var cart = JSON.parse(localStorage.getItem("study-shop-cart") || "[]");
  var productLines = cart.map(function (item) {
    var product = findProduct(item.productId); // uses your existing findProduct from products.js
    if (!product) return "";
    return product.name + " (Class " + product.classLevel + ") x" + item.quantity + " — ₹" + (product.price * item.quantity).toFixed(2);
  }).filter(Boolean).join("\n");

  var total = cart.reduce(function (sum, item) {
    var p = findProduct(item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  // Create a hidden form and POST to FormSubmit
  var form = document.createElement("form");
  form.method = "POST";
  form.action = "https://formsubmit.co/devreign.ai@gmail.com";

  var fields = {
    "Customer Email": email,
    "Products Ordered": productLines,
    "Grand Total": "₹" + (total + 5).toFixed(2) + " (includes ₹5 service charge)",
    "_subject": "New Order from " + email,
    "_captcha": "false",            // disable captcha (optional)
    "_template": "table",           // nice table format in email
    "_next": windows.location.origin,
  };

  for (var key in fields) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}


  function updateBadge() {
    badge.textContent = getTotalItems();
  }

  function renderCards(list) {
    grid.innerHTML = "";
    list.forEach(function (p) {
      var qty = getQuantity(p.id);
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

      card.innerHTML =
        '<div class="product-image">' +
          '<div>' +
            '<h2>' + p.name + '</h2>' +
            '<p>' + p.caption + '</p>' +
            (p.hot ? '<span class="hot-badge">🔥 Hot Selling</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="product-info">' +
          '<div>' +
            '<span class="price-old">₹' + p.oldPrice.toFixed(2) + '</span><br>' +
            '<span class="price-new">₹' + p.price.toFixed(2) + '</span>' +
          '</div>' +
          '<div class="product-actions">' +
            '<button class="icon-btn" title="Wishlist">♡</button>' +
            actionsHTML +
          '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    // Attach events
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
  }

  function getSorted() {
    var copy = products.slice();
    var mode = sortSelect.value;
    if (mode === "low") copy.sort(function (a, b) { return a.price - b.price; });
    else if (mode === "high") copy.sort(function (a, b) { return b.price - a.price; });
    else if (mode === "hot") copy.sort(function (a, b) { return (b.hot ? 1 : 0) - (a.hot ? 1 : 0); });
    return copy;
  }

  function render() {
    renderCards(getSorted());
    updateBadge();
  }

  sortSelect.addEventListener("change", render);
  render();
}

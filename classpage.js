function handlePlaceOrder() {
  var emailInput = document.getElementById("emailInput");
  var email = emailInput.value.trim();
  var emailError = document.getElementById("emailError");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.style.display = "block";
    return;
  }
  emailError.style.display = "none";

  var cart = JSON.parse(localStorage.getItem("study-shop-cart") || "[]");
  var productLines = cart.map(function (item) {
    var product = findProduct(item.productId);
    if (!product) return "";
    return product.name + " (Class " + product.classLevel + ") x" + item.quantity + " — ₹" + (product.price * item.quantity).toFixed(2);
  }).filter(Boolean).join("\n");

  var total = cart.reduce(function (sum, item) {
    var p = findProduct(item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  var formData = new FormData();
  formData.append("Customer Email", email);
  formData.append("Products Ordered", productLines);
  formData.append("Grand Total", "₹" + (total + 5).toFixed(2) + " (includes ₹5 service charge)");
  formData.append("_subject", "New Order from " + email);
  formData.append("_captcha", "false");
  formData.append("_template", "table");

  fetch("https://formsubmit.co/ajax/devreign.ai@gmail.com", {
    method: "POST",
    body: formData
  })
  .then(function (res) { return res.json(); })
  .then(function (data) {
    if (data.success) {
      clearCart();
      window.location.href = "orderplaced.html";
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(function () {
    alert("Network error. Please check your connection and try again.");
  });
}

function initClassPage(products) {
  var grid = document.getElementById("productGrid");
  var sortSelect = document.getElementById("sortSelect");
  var badge = document.getElementById("cartBadge");

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
      if (qty > 0) {
        actionsHTML =
          '<div class="qty-controls">' +
            '<button class="qty-btn" onclick="decreaseQty(\'' + p.id + '\');location.reload()">−</button>' +
            '<span class="qty-num">' + qty + '</span>' +
            '<button class="qty-btn" onclick="addToCart(\'' + p.id + '\');location.reload()">+</button>' +
          '</div>';
      } else {
        actionsHTML =
          '<button class="gradient-btn add-btn" onclick="addToCart(\'' + p.id + '\');location.reload()">Add to Cart</button>';
      }

      card.innerHTML =
        '<div class="product-image-area">' +
          (p.hot ? '<span class="hot-badge">🔥 HOT</span>' : '') +
        '</div>' +
        '<div class="product-info">' +
          '<h3>' + p.name + '</h3>' +
          '<p class="caption">' + p.caption + '</p>' +
          '<div class="price-row">' +
            '<span class="price">₹' + p.price.toFixed(2) + '</span>' +
            '<span class="old-price">₹' + p.oldPrice.toFixed(2) + '</span>' +
          '</div>' +
          actionsHTML +
        '</div>';

      grid.appendChild(card);
    });
  }

  function sortProducts(mode) {
    var sorted = products.slice();
    if (mode === "low") sorted.sort(function (a, b) { return a.price - b.price; });
    else if (mode === "high") sorted.sort(function (a, b) { return b.price - a.price; });
    else if (mode === "hot") sorted.sort(function (a, b) { return (b.hot ? 1 : 0) - (a.hot ? 1 : 0); });
    renderCards(sorted);
  }

  sortSelect.addEventListener("change", function () {
    sortProducts(this.value);
  });

  renderCards(products);
  updateBadge();
}

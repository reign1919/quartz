
var CART_KEY = "study-shop-cart";

function getCart() {
  try {
    var raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  var cart = getCart();
  var item = cart.find(function (i) { return i.productId === productId; });
  if (item) { item.quantity++; }
  else { cart.push({ productId: productId, quantity: 1 }); }
  saveCart(cart);
  return cart;
}

function decreaseQty(productId) {
  var cart = getCart();
  var idx = cart.findIndex(function (i) { return i.productId === productId; });
  if (idx === -1) return cart;
  if (cart[idx].quantity <= 1) { cart.splice(idx, 1); }
  else { cart[idx].quantity--; }
  saveCart(cart);
  return cart;
}

function removeFromCart(productId) {
  var cart = getCart().filter(function (i) { return i.productId !== productId; });
  saveCart(cart);
  return cart;
}

function getQuantity(productId) {
  var item = getCart().find(function (i) { return i.productId === productId; });
  return item ? item.quantity : 0;
}

function getTotalItems() {
  return getCart().reduce(function (sum, i) { return sum + i.quantity; }, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}




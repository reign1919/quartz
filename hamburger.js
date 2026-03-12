(function () {
  var btn = document.querySelector('.hamburger-btn');
  var nav = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.nav-overlay');
  if (!btn || !nav || !overlay) return;

  function toggle() {
    var open = nav.classList.toggle('open');
    overlay.classList.toggle('open', open);
    btn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    btn.classList.remove('active');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', close);
  nav.querySelectorAll('.mobile-nav-link').forEach(function (a) {
    a.addEventListener('click', close);
  });
})();

function initHamburger() {
  var btn = document.querySelector('.hamburger-btn');
  var nav = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.nav-overlay');
  if (!btn || !nav || !overlay) return;

  function toggle() {
    var open = nav.classList.toggle('open');
    overlay.classList.toggle('open', open);
    btn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', toggle);

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}


document.addEventListener('DOMContentLoaded', initHamburger);
window.addEventListener('pageshow', initHamburger);



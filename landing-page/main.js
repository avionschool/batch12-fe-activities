// After scroll
let nav = document.querySelector('.nav-bar');

window.addEventListener('scroll', function () {
  let windowPosition = window.scrollY > 0;
  nav.classList.toggle('scroll-active', windowPosition);
});
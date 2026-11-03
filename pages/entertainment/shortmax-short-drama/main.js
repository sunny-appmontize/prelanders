/* Replace this value with the approved campaign URL when one is available. */
const DOWNLOAD_URL = 'https://play.google.com/store/apps/details?id=live.shorttv.apps';
document.querySelectorAll('a.download').forEach(link => { link.href = DOWNLOAD_URL; });

const gallery = document.querySelector('#gallery');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateControls() {
  previous.disabled = gallery.scrollLeft <= 2;
  next.disabled = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2;
}
function moveGallery(direction) {
  const card = gallery.querySelector('figure');
  const distance = card.getBoundingClientRect().width + parseFloat(getComputedStyle(gallery).gap);
  gallery.scrollBy({ left: distance * direction, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
previous.addEventListener('click', () => moveGallery(-1));
next.addEventListener('click', () => moveGallery(1));
gallery.addEventListener('scroll', updateControls, { passive: true });
window.addEventListener('resize', updateControls);
updateControls();

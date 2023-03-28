let href = window.location.href;
let currentPage =
  href.substring(href.lastIndexOf('/') + 1).replace('.html', '') ?? 'undefined';

let currentPageLink = document.querySelector('#' + currentPage);

if (currentPageLink) {
  currentPageLink.classList.add('current__page');
}

// if (window.matchMedia('(max-width: 767px)').matches) {
//   currentPageLink.classList.add('current__page--mob');
// } else {
//   return;
// }

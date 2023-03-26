const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');

icon.onclick = () => {
  search.classList.add('active');
};

// const screenWidth = function () {
//   let windowWidth = window.screen.width;
//   if (windowWidth > 767) {
//     search.classList.add('active');
//   }
// };

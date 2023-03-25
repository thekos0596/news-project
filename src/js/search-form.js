const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
// const closeIcon = document.querySelector('.close-icon');

icon.onclick = () => {
  search.classList.add('active');
};
// closeIcon.addEventListener('click', () => search.classList.remove('active'));

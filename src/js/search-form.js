import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewArticles from './API-service/api-news';
import { normalizationSearch } from './normalization.js';
import defImg from '../images/defaultimage.jpg';

import renderSearchNews from './renderSerchNews';

const newArticles = new NewArticles();

const btnAddtoFavEl = document.querySelector('.news-card');
const icon = document.querySelector('.search-box__icon-svg');
const search = document.querySelector('.search-box');

search.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  console.log(e.target.elements.mySearch.value);
  const serchValue = e.target.elements.mySearch.value;

  try {
    const res = await newArticles.fetchSearch(serchValue);
    const normalizedResults = normalizationSearch(res);
    btnAddtoFavEl.innerHTML = '';
    renderSearchNews(normalizedResults);
  } catch (error) {
    console.log(error);
  }
}

// function messageInfo(arr) {
//   if (arr.input.value === 0) {
//     return `<h2 class="message-info">We haven’t found news from this category</h2>
//     <img src="${defImg}" class="defImg"/>`;
//   }
//   // повинна підгружатись картинка

//   if (arr.totalInput.value !== 0) {
//     Notify.success(`Hooray! We found ${arr.totalInput.value} articles.`);
//   }
// }

icon.onclick = () => {
  search.classList.add('active');
};
// відкриття форми пошуку на мобільній версії

document.addEventListener('click', e => {
  const withinBoundaries = e.composedPath().includes(search);

  if (!withinBoundaries) {
    search.classList.remove('active');
  }
});
// // закриття форми по кліку поза формою на мобільній версії

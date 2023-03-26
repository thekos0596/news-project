
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderArticle } from './renderArticle';
import NewArticles from './API-service/api-news';
import normalization from './normalization.js';
import { normalizationSearch } from './normalization.js';
import defImg from '../images/defaultimage.jpg';

const newArticles = new NewArticles();
const btnAddtoFavEl = document.querySelector('.news-card');
const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const input = document.querySelector('#mySearch');

console.log(search.elements.value);

input.addEventListener('input', onFormSubmit);

async function onFormSubmit(e) {
  const serchValue = e.target.value;

  try {
    const res = await newArticles.fetchSearch(serchValue);

    const normalizedResults = normalizationSearch(res);
    btnAddtoFavEl.innerHTML = '';
    renderArticle(normalizedResults);
  } catch (error) {
    console.log(error);
  }

}



function messageInfo(arr) {
  if (arr.input.value === 0) {
    return `<h2 class="message-info">We haven’t found news from this category</h2>
    <img src="${defImg}" class="defImg"/>`;
  }
  // повинна підгружатись картинка

  if (arr.totalInput.value !== 0) {
    Notify.success(`Hooray! We found ${arr.totalInput.value} articles.`);
  }
}
function stopSearch(arr) {
  if (arr.hits.length < 40 && arr.hits.length > 0) {
    loadMoreBtn.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  if (arr.hits.length === 40) {
    loadMoreBtn.style.display = 'block';
  }
}

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

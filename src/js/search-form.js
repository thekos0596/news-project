import { fetchArtic } from './API-service/api-news';
import { API_KEY } from './API-service/api-news';
import { BASE_URL } from './API-service/api-news';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { log } from 'console';

import { renderArticle } from './renderArticle';
import NewArticles from './API-service/api-news';
import normalization from './normalization.js';
import { normalizationSearch } from './normalization.js';
const newArticles = new NewArticles();
const btnAddtoFavEl = document.querySelector('.news-card');

const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const input = document.querySelector('#mySearch');

console.log(search.elements.value);
let page = 1;
let title = ' ';
const perPage = 7;

let cardNews = [];

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

// async function onSubmitNews(e) {
//   e.preventDefault();
//   console.log('test', e.currentTarget.value);

//   title = e.target.elements.searchQuery.value.trim();
//   if (input.value === '' && input.value.lendth <= 1) {
//     return Notify.failure(
//       'Sorry, the search field cannot be empty. Please enter information to search.'
//     );
//   }

//   const { data } = await searchingNews(title);

//   articleCard(data);
//   // сюди будуть додаватись знайдені статті
//   messageInfo(data);
//   stopSearch(data);
//   e.target.reset();

//   try {
//     const res = await newArticles.fetchArtic(searchNews);
//     const normalizedResults = normalization(res);
//     renderArticle(normalizedResults);
//   } catch (error) {
//     console.log(error);
//   }
// }
import defImg from '../images/defaultimage.jpg';
function messageInfo(arr) {
  if (arr.input.value === 0) {
    return `<h2 class="message-info">We haven’t found news from this category</h2>
    <img src="${defImg}"/>`;
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

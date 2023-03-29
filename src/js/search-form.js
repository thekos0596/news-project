// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewArticles from './API-service/api-news';
import { normalizeData } from './normalization.js';
import defImg from '../images/defaultimage.jpg';
import { checkFavorites } from './btn-add-remove';
import { checkRead } from './btn-read-more';

import renderSearchNews from './renderSerchNews';

const newArticles = new NewArticles();
let numCardsOnPages = 8;
const addCard = document.querySelector('.news-card');
const icon2 = document.querySelector('.search-box__icon-svg');
const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const newEl = document.querySelector('.container__home-search');
const pagination = document.querySelector('.pagination');

search.addEventListener('submit', onFormSubmit);
async function onFormSubmit(e) {
  e.preventDefault();

  const serchValue = e.target.elements.mySearch.value;
  try {
    const res = await newArticles.fetchSearch(serchValue);
    const normalizedResults = normalizeData(res, 'search');

    if (normalizedResults.length === 0) {
      pagination.classList.add('visually-hidden')
      newEl.innerHTML = `
<div class="page-empty">
<h2 class="page-empty__text">We haven’t found news from this category</h2>
<img src="${defImg}" alt="We haven’t found news from this category" class="page-empty__img">
</div>`
    };

    addCard.setAttribute('data-page', serchValue);
    const newArray = normalizedResults.slice(0, numCardsOnPages);
    addCard.innerHTML = '';
    renderSearchNews(newArray);
    checkFavorites(newArray);
    checkRead(newArray);
  } catch (error) {
    console.log(error);
  }

  // messageInfo();

  e.target.reset();
}

// function messageInfo(arr) {
//   if (normalizedResults.value === []) {
//     return `<div><h2 class="message-info">We haven’t found news from this category</h2><img src="${defImg}" class="defImg"/></div>`;
//   }
// }

// document.addEventListener('click', e => {
//   const withinBoundaries = e.composedPath().includes(search);

//   if (!withinBoundaries) {
//     search.classList.remove('active');
//     brnSerchEl.classList.remove('fetch');
//     btnSerchEl.classList.remove('visually-hidden');
//   }
// });
// // закриття форми по кліку поза формою на мобільній версії

// search.addEventListener('click', onOpenSearch);

// function onOpenSearch(e) {
//   const btnFetch = e.currentTarget.elements.namedItem('btn-fetch');
//   const btnSerch = e.currentTarget.elements.namedItem('btn-search');

//   search.classList.add('active');
//   btnFetch.classList.add('fetch');
//   btnSerch.classList.add('visually-hidden');
//   search.addEventListener('submit', onFormSubmit);
//   console.log(btnSerch);
// }

const brnSerchEl = document.querySelector('.search-box__icon');
const btnSerchEl = document.querySelector('.btn-search');

const screenWidth = window.innerWidth;
if (screenWidth <= 768) {
  btnSerchEl.classList.remove('visually-hidden');
  search.classList.remove('active');

  search.addEventListener('click', onOpenSearch);

  function onOpenSearch(e) {
    const btnFetch = e.currentTarget.elements.namedItem('btn-fetch');
    const btnSerch = e.currentTarget.elements.namedItem('btn-search');

    search.classList.add('active');
    btnFetch.classList.add('fetch');
    btnSerch.classList.add('visually-hidden');

    console.log(btnSerch);

    document.addEventListener('click', e => {
      const withinBoundaries = e.composedPath().includes(search);

      if (!withinBoundaries) {
        search.classList.remove('active');
        brnSerchEl.classList.remove('fetch');
        btnSerchEl.classList.remove('visually-hidden');
      }
    });
  }
} else {
  btnSerchEl.classList.add('visually-hidden');
  search.classList.add('active');
}

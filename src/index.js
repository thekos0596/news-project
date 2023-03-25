import './js/mobile-menu';
import './js/categories';
import './js/toggle-switcher-theme';
import './js/search-form';
import './js/API-service/api-weather';

import { renderArticle } from './js/renderArticle';
import NewArticles from './js/API-service/api-news';
import normalization from './js/normalization.js';
import { initAccordion } from './js/accordion';
import addToFavorites from './js/API-service/api-btn-add_remove';

const buttonEL = document.querySelector('.fetch');
const newArticles = new NewArticles();
const btnAddtoFavEl = document.querySelector('.news-card');

buttonEL.addEventListener('click', onFormSubmit);
btnAddtoFavEl.addEventListener('click', addToFavorites);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();
    const normalizedResults = normalization(res);
    renderArticle(normalizedResults);
  } catch (error) {
    console.log(error);
  }
}

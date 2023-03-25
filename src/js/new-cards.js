import { renderArticle } from './renderArticle';
import NewArticles from './API-service/api-news';
import normalization from './normalization.js';
import addToFavorites from './btn-add-remove';

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

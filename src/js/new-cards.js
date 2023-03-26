import { renderArticle } from './renderArticle';
import NewArticles from './API-service/api-news';
import normalization from './normalization.js';
import addToFavorites from './btn-add-remove';

const buttonEL = document.querySelector('.fetch');
const newArticles = new NewArticles();
const btnAddtoFavEl = document.querySelector('.news-card');

buttonEL.addEventListener('click', onFormSubmit);
btnAddtoFavEl.addEventListener('click', addToFavorites);

const numCardsOnPages = 9;

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();
    const normalizedResults = normalization(res);
    const newArray = normalizedResults.slice(0, numCardsOnPages);
    btnAddtoFavEl.innerHTML = '';
    renderArticle(newArray);
  } catch (error) {
    console.log(error);
  }
}

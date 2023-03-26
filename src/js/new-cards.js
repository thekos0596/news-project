import { renderArticle } from './renderArticle';
import NewArticles from './API-service/api-news';
import normalization from './normalization.js';
import addToFavorites from './btn-add-remove';
import readMore from './btn-read-more';

const buttonEL = document.querySelector('.fetch');
const newArticles = new NewArticles();
const newsCardEl = document.querySelector('.news-card');

buttonEL.addEventListener('click', onFormSubmit);
newsCardEl.addEventListener('click', function (event) {
  const targetEl = event.target;

  if (targetEl.classList.contains('news-card__favorite-button')) {
    addToFavorites(event);
  } else if (targetEl.classList.contains('news-card__read-more')) {
    readMore(event);
  }
});

async function onFormSubmit(event) {
  event.preventDefault();
  console.log(event);
  try {
    const res = await newArticles.fetchArtic();
    const normalizedResults = normalization(res);
    btnAddtoFavEl.innerHTML = '';
    renderArticle(normalizedResults);
  } catch (error) {
    console.log(error);
  }
}

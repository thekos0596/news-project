import './js/mobile-menu';
import { renderArticle } from './renderArticle';
import NewArticles from './js/API-service/api-news';
import { initAccordion } from "./js/accordion";
const buttonEL = document.querySelector('.fetch');
const newArticles = new NewArticles();

buttonEL.addEventListener('click', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();
    renderArticle(res);
  } catch (error) {
    console.log(error);
  }
}

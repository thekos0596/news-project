import NewArticles from './API-service/api-news';
import { renderArticle } from '../renderArticle';

const paginationEl = document.getElementById('#pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

let currentPage = 1;

const newArticles = new NewArticles();

arrowLeft.addEventListener('click', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();

    console.log(res);

    renderArticle(res);
  } catch (error) {
    console.log(error);
  }
}

// неактивні кнопки prew або next
// function disableArrowBtn(totalPages) {
//   if (currentPage === 1) {
//     arrowLeft.classList.add('disabled-arrow');
//   } else {
//     arrowLeft.classList.remove('disabled-arrow');
//   }

//   if (currentPage === totalPages) {
//     arrowRight.classList.add('disabled-arrow');
//   } else {
//     arrowRight.classList.remove('disabled-arrow');
//   }
// }

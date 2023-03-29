import { addToFavorites } from './btnAddRemove';
import { readMore } from './btnReadMore';

const newsCardEl = document.querySelector('.news-card');

newsCardEl.addEventListener('click', function (event) {
  const targetEl = event.target;

  if (targetEl.classList.contains('news-card__favorite-button')) {
    addToFavorites(event);
  } else if (targetEl.classList.contains('news-card__read-more')) {
    readMore(event);
  }
});

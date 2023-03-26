import svgSprite from '../images/icons/icons.svg';
import { normalization, currentNewsPage } from './normalization';

function createIcon(bool, btn) {
  const icon = bool ? `${svgSprite}#icon-heart` : `${svgSprite}#icon-favorite`;
  const svg = document.createElement('svg');
  svg.classList.add('news-card__favorite-icon');
  svg.setAttribute('width', '13');
  svg.setAttribute('height', '12');
  const use = document.createElement('use');
  use.setAttribute('href', icon);
  svg.appendChild(use);
  btn.insertAdjacentHTML('beforeend', svg.outerHTML);
}

export default function addToFavorites(event) {
  const btn = event.target.closest('.news-card__favorite-button');
  const newsId = btn.dataset.newsId;

  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.title === newsId
  );

  const bool = favoriteIndex === -1;

  btn.textContent = bool ? 'Remove from favorite' : 'Add to favorite';
  createIcon(bool, btn);
  if (bool) {
    const currentNews = currentNewsPage.find(news => news.title === newsId);
    favoriteList.push(currentNews);
  } else {
    favoriteList.splice(favoriteIndex, 1);
  }
  localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}

import svgSprite from '../images/icons/icons.svg';
import { normalization, currentNewsPage } from './normalization';

export default function addToFavorites(event) {
  const newsId = event.target.dataset.newsId;
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.title === newsId
  );

  if (favoriteIndex === -1) {
    const currentNews = currentNewsPage.find(news => news.title === newsId);
    favoriteList.push(currentNews);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    event.target.textContent = 'Remove from favorite';
    const svg = document.createElement('svg');
    svg.classList.add('news-card__favorite-icon');
    svg.setAttribute('width', '13');
    svg.setAttribute('height', '12');
    const use = document.createElement('use');
    use.setAttribute('href', `${svgSprite}#icon-heart`);
    svg.appendChild(use);
    event.target.insertAdjacentHTML('beforeend', svg.outerHTML);
  } else {
    favoriteList.splice(favoriteIndex, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    event.target.textContent = 'Add to favorite';
    const svg = document.createElement('svg');
    svg.classList.add('news-card__favorite-icon');
    svg.setAttribute('width', '13');
    svg.setAttribute('height', '12');
    const use = document.createElement('use');
    use.setAttribute('href', `${svgSprite}#icon-favorite`);
    svg.appendChild(use);
    event.target.insertAdjacentHTML('beforeend', svg.outerHTML);
  }
}

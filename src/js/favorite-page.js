import svgSprite from '../images/icons/icons.svg';
import defImg from '../images/defaultimage.jpg';
import defImgPng from '../images/default_hidden.png';
import { checkFavorites } from './btnAddRemove';
import { readMore, checkRead } from './btnReadMore';

const favoriteNewsCardEl = document.querySelector('.news-card');

const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

favoriteNewsCardEl.addEventListener('click', function (event) {
  const targetEl = event.target;

  if (targetEl.classList.contains('news-card__favorite-button')) {
    deleteFromFavorites(event);
  }
});

renderArticle(favoriteList);

function renderArticle(res) {
  if (!res || res.length === 0) {
    pageEmpty();
  }

  let newsId = [];
  if (res.length) {
    newsId = res.map(({ id }) => id.toUpperCase());
  }

  const markup = `<ul class="news-card__image-container">${res
    .map(
      ({ abstract, section, title, published_date, multimedia = [], url }) => {
        const bool = newsId.includes(title.toUpperCase());
        const articleTitle = bool ? 'Remove from favorite' : 'Add to favorite';
        const iconClass = bool ? 'icon-favorite' : 'icon-heart';

        const imageUrl =
          multimedia && multimedia[2]?.url ? multimedia[2].url : defImg;
        const imageAlt =
          multimedia && multimedia[2]?.caption
            ? multimedia[2].caption
            : 'Default Image';

        return `<li class="news-card__item">
   <div class="news-card__foto">
    <img src="${imageUrl}" alt="${imageAlt}" class="news-card__image">
  <div class="news-card__category">
   ${section}
  </div>
  <button class="news-card__favorite-button" data-news-id="${title}">${articleTitle}<svg width="13" height="12" class="news-card__favorite-icon">
    <use href="${svgSprite}#${iconClass}"></use></svg>

  </button>
  </div>
  <div class="news-card__description">
  <h2 class="news-card__title">
    ${title}
  </h2>
  <p class="news-card__abstract">
    ${abstract}
  </p>
  </div>
  <div class="news-card__container">
  <div class="news-card__date">
    ${published_date}
  </div>
  <a href="${url}" target="_blank" rel="noreferrer noopener nofollow" class="news-card__read-more" data-news-id="${title}">
    Read more
  </a>
 
  </div>
  </li>
`;
      }
    )
    .join('')}
    </ul>`;
  favoriteNewsCardEl.insertAdjacentHTML('beforeEnd', markup);
  checkFavorites(favoriteList);
}

function deleteFromFavorites(event) {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
  const targetEl = event.target;

  const newsId = targetEl.dataset.newsId;
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.title === newsId
  );
  if (favoriteIndex !== -1) {
    favoriteList.splice(favoriteIndex, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    location.reload();
  }
}

function pageEmpty() {
  const markup = `
    <div class="page-empty">
    <h2 class="page-empty__text">You don't have any favorite news</h2>
    <img src="${defImgPng}" alt="You have no favorite news" class="page-empty__img">
    </div>`;
  favoriteNewsCardEl.insertAdjacentHTML('beforeend', markup);
}

import svgSprite from '../images/icons/icons.svg';
import defImg from '../images/defaultimage.jpg';
import { checkFavorites } from './btn-add-remove';

const favoriteNewsCardEl = document.querySelector('.favorite-news-card');
const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
renderArticle(favoriteList);

function renderArticle(res) {
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

favoriteNewsCardEl.addEventListener('click', deleteFromFavorites);

function deleteFromFavorites(event) {
  const targetEl = event.target;

  if (targetEl.classList.contains('news-card__favorite-button')) {
    const title = targetEl.id;
    const favoriteIndex = favoriteList.findIndex(
      favorite => favorite.title === title
    );
    if (favoriteIndex !== -1) {
      favoriteList.splice(favoriteIndex, 1);
      localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
      renderArticle(favoriteList);
    }
  }
}

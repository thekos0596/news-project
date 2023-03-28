export { renderArticle };
import defImg from '../images/defaultimage.jpg';
import svgSprite from '../images/icons/icons.svg';

const newCardEl = document.querySelector('.news-card');

function onGetDate(res) {
  const dataStr = res.results.map(({ published_date }) => {
    const dataObj = new Date(`${published_date}`);

    const year = dataObj.getFullYear();
    const month = String(dataObj.getMonth() + 1).padStart(2, '0');
    const day = String(dataObj.getDate()).padStart(2, '0');

    const newDataStr = `${day}/${month}/${year}`;
    return newDataStr;
  });

  return dataStr;
}

function getDataFromLoc() {
  try {
    const data = localStorage.getItem('favoriteList');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
  }
}

export function renderCategories(res) {
  const paginationClass = res[0].data_set;
  console.log(paginationClass);
  if (newCardEl.classList.contains('search')) {
    newCardEl.classList.remove('search');
  } else if (newCardEl.classList.contains('popular')) {
    newCardEl.classList.remove('popular');
  }
  newCardEl.classList.add(paginationClass);

  let newsId = [];
  const data = getDataFromLoc();
  if (data.length) {
    newsId = data.map(({ id }) => id.toUpperCase());
  }
  const markup = `<ul class="news-card__image-container">${res
    .map(
      ({ abstract, section, title, published_date, multimedia = [], url }) => {
        const bool = newsId.includes(title.toUpperCase());
        const articleTitle = bool ? 'Remove from favorite' : 'Add to favorite';
        const iconClass = bool ? 'icon-heart' : 'icon-favorite';

        const imageUrl =
          multimedia && multimedia[2]?.url ? multimedia[2].url : defImg;
        const imageAlt =
          multimedia && multimedia[2]?.caption
            ? multimedia[2].caption
            : 'Default Image';

        return `
  <li class="news-card__item">
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
    ${onGetDate({ results: [{ published_date }] })}
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

  newCardEl.insertAdjacentHTML('beforeEnd', markup);
}

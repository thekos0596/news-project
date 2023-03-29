import svgSprite from '../images/icons/icons.svg';
import defImg from '../images/defaultimage.jpg';
import { fetchweather } from '../js/API-service/api-weather.js';
const newCardEl = document.querySelector('.news-card');

const baseUrl = 'https://www.nytimes.com/';
let numberNew = 1;
let numberWeather = 1;
let insertWeather = '';
let tablet = window.matchMedia('(min-width: 768px)');
let desctop = window.matchMedia('(min-width: 1280px)');
if (tablet.matches === true) {
  numberWeather = 2;
}
if (desctop.matches === true) {
  numberWeather = 3;
}

export default function renderSearchNews(res) {
  const paginationClass = res[0].data_set;

  if (newCardEl.classList.contains('popular')) {
    newCardEl.classList.remove('popular');
  } else if (newCardEl.classList.contains('categories')) {
    newCardEl.classList.remove('categories');
  } else if (newCardEl.classList.contains('calendar')) {
    newCardEl.classList.remove('calendar');
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
        const iconClass = bool ? 'icon-favorite' : 'icon-heart';
        const imageUrl =
          multimedia && multimedia[1] && multimedia[1] && multimedia[2]?.url
            ? baseUrl + multimedia[2].url ||
              baseUrl + multimedia[1] ||
              baseUrl + multimedia[0]
            : defImg;
        const imageAlt =
          multimedia && multimedia[2]?.caption
            ? multimedia[2].caption
            : 'Default Image';

        if (numberNew === numberWeather) {
          insertWeather =
            '<li class="news-card__item"><div class="news-card__foto news-card__image"><div id=weather></div></li>';
        } else {
          insertWeather = '';
        }
        numberNew++;

        return `${insertWeather}
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
  <div class="news-card__overlay" style="display: none">Already read</div>
  </div>
  </li>
`;
      }
    )
    .join('')}
    </ul>`;

  newCardEl.insertAdjacentHTML('beforeEnd', markup);
  fetchweather();
}

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

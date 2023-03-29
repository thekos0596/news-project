import { initAccordion } from './accordion';
import svgSprite from '../images/icons/icons.svg';
import defImgPng from '../images/default_hidden.png';
import defImg from '../images/defaultimage.jpg';
import './btnAddRemove';
import { checkFavorites } from './btnAddRemove';

const containerEl = document.querySelector('.container__read');
const newAccorEl = document.querySelector('.accordion');
const response = JSON.parse(localStorage.getItem('readList')) || [];
const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

containerEl.addEventListener('click', function (event) {
  checkFavorites(favoriteList);
});
containerEl.addEventListener('click', function (event) {
  const targetEl = event.target;
  if (targetEl.classList.contains('news-card__favorite-button')) {
    console.log('this is favorire');
    addToFavorites(event);
  } else if (targetEl.classList.contains('news-card__read-more')) {
    console.log('news-card__read-more');
  }
});

export function pageEmpty() {
  if (!response || response.length === 0) {
    return `
    <div class="page-empty">
    <h2 class="page-empty__text">You don't have any read news</h2>
    <img src="${defImgPng}" alt="You have not read news" class="page-empty__img">
    </div>`;
  }
  return '';
}

function newFormatArray(response) {
  const formattedItems = response.map(item => {
    const newDate = new Date(item.readAt);
    const formattedReadAt = `${newDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;

    const newPublishedDate = new Date(item.published_date);
    const formattedPublishedDate = `${newPublishedDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(newPublishedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${newPublishedDate.getFullYear()}`;

    const { multimedia = [] } = item;
    const imageUrl =
      multimedia && multimedia[2]?.url ? multimedia[2].url : defImg;
    const imageAlt =
      multimedia && multimedia[2]?.caption
        ? multimedia[2].caption
        : 'Default Image';

    return {
      ...item,
      readAt: formattedReadAt,
      published_date: formattedPublishedDate,
      imageUrl,
      imageAlt,
    };
  });
  return formattedItems;
}

const formattedItems = newFormatArray(response);

export function renderAccordion() {
  containerEl.insertAdjacentHTML('beforeEnd', pageEmpty());

  const uniqueDates = new Set();

  formattedItems.forEach(({ readAt }) => {
    uniqueDates.add(readAt);
  });
  const markupAccordion = Array.from(uniqueDates)
    .map(readAt => {
      return `
              <div class="accordion__wrap">
                  <div class="accordion__active">
                    <div class="read__date">${readAt}</div>
                    <svg class="accordion_icon" width="15" height="9">
                      <use href="${svgSprite}#icon-vector-down"></use>
                    </svg>
                  </div>
                  <hr class="accordion__line">
                  <div class="content">
                    <div class="news-card">
                      <ul class="news-card__image-container">
                      </ul>
                    </div>
                  </div>
              </div>
          `;
    })
    .reverse()
    .join('');

  newAccorEl.insertAdjacentHTML('beforeEnd', markupAccordion);
  initAccordion();
}

renderAccordion();

function markupReadCard({ abstract, section, title, published_date, imageUrl, imageAlt, url }) {
  let newsId = [];
  const bool = newsId.includes(title.toUpperCase());
  const articleTitle = bool ? 'Remove from favorite' : 'Add to favorite';
  const iconClass = bool ? 'icon-favorite' : 'icon-heart';
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
        <h2 class="news-card__title">${title}</h2>
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

function addMarkupToCards() {
  const readDates = document.querySelectorAll('.read__date');

  // Группируем элементы массива по датам readAt
  const groupedItems = formattedItems.reduce((acc, item) => {
    const date = item.readAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Добавляем разметку к каждому элементу соответствующей группы
  readDates.forEach(dateEl => {
    const date = dateEl.textContent;
    const items = groupedItems[date] || [];
    const cardContainer = dateEl
      .closest('.accordion__wrap')
      .querySelector('.news-card__image-container');

    items.forEach(item => {
      if (item.readAt === date) {
        cardContainer.insertAdjacentHTML('beforeEnd', markupReadCard(item));
      }
    });
  });
}

addMarkupToCards()


function createIcon(bool, btn) {
  const icon = !bool ? `${svgSprite}#icon-favorite` : `${svgSprite}#icon-heart`;
  const svg = document.createElement('svg');
  svg.classList.add('news-card__favorite-icon');
  svg.setAttribute('width', '13');
  svg.setAttribute('height', '12');
  const use = document.createElement('use');
  use.setAttribute('href', icon);
  svg.appendChild(use);
  btn.insertAdjacentHTML('beforeend', svg.outerHTML);
}



function addToFavorites(event) {
  const btn = event.target.closest('.news-card__favorite-button');

  const newsId = btn.dataset.newsId;

  const readList = JSON.parse(localStorage.getItem('readList')) || [];
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
 
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.title === newsId
  );
  
  const bool = favoriteIndex === -1;
  if (bool) {
    const currentNews = readList.find(news => news.title === newsId);
    favoriteList.push(currentNews);
    
  } else {
    favoriteList.splice(favoriteIndex, 1);
  }

  localStorage.setItem('favoriteList', JSON.stringify(favoriteList));

  btn.textContent = bool ? 'Remove from favorite' : 'Add to favorite';
  createIcon(bool, btn);
}
addMarkupToCards();

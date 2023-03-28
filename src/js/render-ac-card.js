import NewArticles from './API-service/api-news';
import { initAccordion } from './accordion';
import svgSprite from '../images/icons/icons.svg';
import defImgPng from '../images/default_hidden.png';
import './btn-add-remove';

const containerEl = document.querySelector('.container__read')

const newAccorEl = document.querySelector('.accordion');

function renderAccordion() {
  containerEl.insertAdjacentHTML('beforeEnd', pageEmpty());
  const response = JSON.parse(localStorage.getItem('readList')) || [];

  const uniqueDates = new Set();

  response.forEach(({ published_date }) => {
    const date = new Date(published_date);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    uniqueDates.add(formattedDate);
  });
  const markupAccordion = Array.from(uniqueDates)
    .map((formattedDate) => {
      return `
              <div class="accordion__wrap">
                  <div class="accordion__active">
                    <div class="read__date">${formattedDate}</div>
                    <svg class="accordion_icon" width="15" height="9">
                      <use href="${svgSprite}#icon-vector-down"></use>
                    </svg>
                  </div>
                  <hr class="accordion__line">
                  <div class="content">
                    <div class="news-card">

                    </div>
                  </div>
              </div>
          `;
    })
    .join('');

  newAccorEl.insertAdjacentHTML('beforeEnd', markupAccordion)
  initAccordion();
}
renderAccordion()

function pageEmpty() {
  const items = JSON.parse(localStorage.getItem('readList'));

  if (!items || items.length === 0) {
    return `
    <div class="page-empty">
    <h2 class="page-empty__text">You don't have any read news</h2>
    <img src="${defImgPng}" alt="You have not read news" class="page-empty__img">
    </div>`
  }
  return ''
}

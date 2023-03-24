import NewArticles from './API-service/api-news';
import { initAccordion } from './accordion';

const buttonEL = document.querySelector('.fetch');
const newArticles = new NewArticles();

buttonEL.addEventListener('click', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();

    console.log(res);

    renderAccordion(res);
  } catch (error) {
    console.log(error);
  }
}

const newAccorEl = document.querySelector('.accordion');

export function renderAccordion(res){
  console.log (res.results)

  const uniqueDates = new Set();

  res.results.forEach(({published_date}) => {
      const date = new Date(published_date);
      const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
      });
      uniqueDates.add(formattedDate);
    });
    const markupAccordion = Array.from(uniqueDates)
      .map((formattedDate ) => {
          return `
              <div class="accordion__wrap">
                  <div class="accordion__active">
                    <div class="read__date">${formattedDate}</div>
                    <svg class="accordion_icon" width="15" height="9" viewBox="0 0 32 32" fill="none">
                      <use href="./images/icons/icons.svg#icon-vector-down"></use>
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
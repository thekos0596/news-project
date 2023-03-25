import NewArticles from './API-service/api-news';
import { initAccordion } from './accordion';
import iconAc from '../images/icons/icons.svg';
import defImg from '../images/defaultimage.jpg';


const containerEl = document.querySelector('.container__read')
const buttonEL = document.querySelector('.read_fetch');
const newArticles = new NewArticles();

buttonEL.addEventListener('click', readOnFormSubmit);

export async function readOnFormSubmit(event) {
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
                    <svg class="accordion_icon" width="15" height="9">
                      <use href="${iconAc}#icon-vector-down"></use>
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

export function pageEmpty(){
  const items = localStorage.getItem('url');
  if(!items){
    return `
    <div class="page-empty">
    <h2 class="page-empty__text">You don't have any read news</h2>
    <img src="${defImg}" alt="You have not read news" class="page-empty__img">
    </div>`
  }
  return
}

containerEl.insertAdjacentHTML('beforeEnd', pageEmpty())
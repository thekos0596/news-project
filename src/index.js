import NewArticles from './js/fetchArticle';

const newArticles = new NewArticles();

const buttonEL = document.querySelector('.fetch');
const newCardEl = document.querySelector('.news-card');

buttonEL.addEventListener('click', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const res = await newArticles.fetchArtic();

    console.log(res);

    renderArticle(res);
  } catch (error) {
    console.log(error);
  }
}

function renderArticle(res) {
  console.log(res.results);

  const markup = res.results
    .map(
      ({ abstract, section, title, published_date, multimedia = [], url }) => {
        const imageUrl =
          multimedia && multimedia[2]?.url
            ? multimedia[2].url
            : './picture/image2.jpg';
        const imageAlt =
          multimedia && multimedia[2]?.caption
            ? multimedia[2].caption
            : 'Default Image';

        return `
  <ul class="news-card__image-container">
  <li class="news-card__item">
   <div class="news-card__foto">
    <img src="${imageUrl}" alt="${imageAlt}" class="news-card__image">
  <div class="news-card__category">
   ${section}
  </div>
  <button class="news-card__favorite-button" data-news-id="">
    Add to favorite
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
  <a href="${url}" class="news-card__read-more" data-news-id="">
    Read more
  </a>
  </div>
  </li>
</ul>`;
      }
    )
    .join('');

  newCardEl.insertAdjacentHTML('beforeEnd', markup);
}

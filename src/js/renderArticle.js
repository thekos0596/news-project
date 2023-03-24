export { renderArticle };
import sha256 from 'crypto-js/sha256';

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

function generateId(res) {
  const newsItem = res.results.map(
    ({
      title = 'No title',
      updated_date = 'No date',
      slug_name = 'No name',
    }) => {
      const hash = sha256(`${updated_date}-${title}-${slug_name}`).toString();
      return hash;
    }
  );
  return newsItem;
}

function renderArticle(res) {
  const markup = `<ul class="news-card__image-container">${res.results
    .map(
      ({ abstract, section, title, published_date, multimedia = [], url }) => {
        const imageUrl =
          multimedia && multimedia[2]?.url
            ? multimedia[2].url
            : './../images/defaultimage.jpg';
        const imageAlt =
          multimedia && multimedia[2]?.caption
            ? multimedia[2].caption
            : 'Default Image';
        const newsId = generateId();

        return `
  <li class="news-card__item">
   <div class="news-card__foto">
    <img src="${imageUrl}" alt="${imageAlt}" class="news-card__image">
  <div class="news-card__category">
   ${section}
  </div>
  <button class="news-card__favorite-button" data-news-id="${newsId}">
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
    ${onGetDate({ results: [{ published_date }] })}
  </div>
  <a href="${url}" class="news-card__read-more" data-news-id="">
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

const readList = JSON.parse(localStorage.getItem('readList')) || [];

// Loop through the news articles on the page and apply styles if they have been read
const newsCards = document.querySelectorAll('.news-card');
newsCards.forEach(card => {
  const newsId = card.dataset.newsId;
  const readIndex = readList.findIndex(read => read.title === newsId);
  if (readIndex !== -1) {
    // The news article has been read, so apply styles
    card.classList.add('news-card--read');
    const overlay = document.createElement('div');
    overlay.classList.add('news-card__overlay');
    const alreadyRead = document.createElement('p');
    alreadyRead.classList.add('news-card__p');
    alreadyRead.textContent = 'Already read';
    const svg = document.createElement('svg');
    svg.classList.add('news-card__ok');
    svg.setAttribute('width', '15');
    svg.setAttribute('height', '10');
    const use = document.createElement('use');
    use.setAttribute('href', `${svgSprite}#icon-vector-ok`);
    svg.appendChild(use);
    overlay.appendChild(alreadyRead);
    overlay.appendChild(svg);
    card.insertAdjacentHTML('beforeend', overlay.outerHTML);
  }
});

export default function readMore(event) {
  const newsId = event.target.dataset.newsId;

  const readIndex = readList.findIndex(read => read.title === newsId);
  console.log(readIndex);

  if (readIndex !== -1) {
    const item = readList[readIndex];

    readList.splice(readIndex, 1);

    const newReadItem = {
      ...item,
      readAt: new Date().getTime(),
    };

    readList.push(newReadItem);
    localStorage.setItem('readList', JSON.stringify(readList));
  } else {
    let currentNews = currentNewsPage.find(news => news.title === newsId);
    currentNews.readAt = new Date().getTime();
    readList.push(currentNews);
    localStorage.setItem('readList', JSON.stringify(readList));
  }
}

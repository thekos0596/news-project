import svgSprite from '../images/icons/icons.svg';
import { currentNewsPage } from './normalization';

export default function readMore(event) {
  const newsId = event.target.dataset.newsId;

  const readList = JSON.parse(localStorage.getItem('readList')) || [];
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
  }
  const sortedReadList = [...readList].sort((a, b) => a.readAt - b.readAt);
  localStorage.setItem('readList', JSON.stringify(sortedReadList));

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
  event.target.insertAdjacentHTML('beforeend', overlay.outerHTML);
}

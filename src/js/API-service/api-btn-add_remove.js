import svgSprite from '../../images/icons/icons.svg';

export default function addToFavorites(event) {
  const newsId = event.target.dataset.newsId;

  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []; // отримання списку з localStorage
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.id === newsId
  ); // пошук індексу обраної новини
  if (favoriteIndex === -1) {
    // якщо новина не знаходиться у списку
    favoriteList.push({ id: newsId }); // додавання нової новини
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList)); // збереження списку в localStorage
    event.target.textContent = 'Remove from favorite'; // зміна тексту кнопки
    const svg = document.createElement('svg');
    svg.classList.add('news-card__favorite-icon');
    svg.setAttribute('width', '13');
    svg.setAttribute('height', '12');
    const use = document.createElement('use');
    use.setAttribute('href', `${svgSprite}#icon-heart`);
    svg.appendChild(use);
    event.target.insertAdjacentHTML('beforeend', svg.outerHTML);
  } else {
    // якщо новина вже знаходиться у списку
    favoriteList.splice(favoriteIndex, 1); // видалення новини
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList)); // збереження списку в localStorage
    event.target.textContent = 'Add to favorite'; // зміна тексту кнопки
    const svg = document.createElement('svg');
    svg.classList.add('news-card__favorite-icon');
    svg.setAttribute('width', '13');
    svg.setAttribute('height', '12');
    const use = document.createElement('use');
    use.setAttribute('href', `${svgSprite}#icon-favorite`);
    svg.appendChild(use);
    event.target.insertAdjacentHTML('beforeend', svg.outerHTML);
  }
}

// перевірка, чи знаходиться новина у списку обраних
// const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
// const favoriteIndex = favoriteList.findIndex(
//   favorite => favorite.id === newsId
// );
// if (favoriteIndex === -1) {
//   favoriteBtn.textContent = 'AddToFavorite';
// } else {
//   favoriteBtn.textContent = 'RemoveFromFavorite';
// }

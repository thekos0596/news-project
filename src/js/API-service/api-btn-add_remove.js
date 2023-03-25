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
    event.target.textContent = 'RemoveFromFavorite'; // зміна тексту кнопки
  } else {
    // якщо новина вже знаходиться у списку
    favoriteList.splice(favoriteIndex, 1); // видалення новини
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList)); // збереження списку в localStorage
    event.target.textContent = 'AddToFavorite'; // зміна тексту кнопки
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

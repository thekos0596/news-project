// отримання унікального id кнопки
const favoriteBtn = document.querySelector('#favorite-btn');
const favoriteId = generateFavoriteId(); // функція генерації унікального id
favoriteBtn.id = favoriteId;

// додавання обробника події на кнопку
favoriteBtn.addEventListener('click', toggleFavorite);

// функція генерації унікального id
function generateFavoriteId() {
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return `favorite-${randomId}`;
}

// функція додавання/видалення новини зі списку обраних
function toggleFavorite() {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []; // отримання списку з localStorage
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.id === favoriteId
  ); // пошук індексу обраної новини
  if (favoriteIndex === -1) {
    // якщо новина не знаходиться у списку
    favoriteList.push({ id: favoriteId }); // додавання нової новини
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList)); // збереження списку в localStorage
    favoriteBtn.textContent = 'RemoveFromFavorite'; // зміна тексту кнопки
  } else {
    // якщо новина вже знаходиться у списку
    favoriteList.splice(favoriteIndex, 1); // видалення новини
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList)); // збереження списку в localStorage
    favoriteBtn.textContent = 'AddToFavorite'; // зміна тексту кнопки
  }
}

// перевірка, чи знаходиться новина у списку обраних
const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
if (favoriteList.findIndex(favorite => favorite.id === favoriteId) === -1) {
  favoriteBtn.textContent = 'AddToFavorite';
} else {
  favoriteBtn.textContent = 'RemoveFromFavorite';
}

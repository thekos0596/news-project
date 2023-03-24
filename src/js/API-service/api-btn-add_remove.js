const addToFavBtn = document.getElementById('addToFavBtn');
const removeFromFavBtn = document.getElementById('removeFromFavBtn');
const newsId = ''; // унікальний ідентифікатор новини

// Перевіряємо, чи є дана новина у списку улюблених користувача
const isFav = localStorage.getItem('favoriteNews')?.includes(newsId);

// Функція для додавання новини до списку улюблених
function addToFavorites() {
  let favorites = localStorage.getItem('favoriteNews');
  if (!favorites) {
    favorites = [];
  } else {
    favorites = JSON.parse(favorites);
  }

  if (!favorites.includes(newsId)) {
    favorites.push(newsId);
    localStorage.setItem('favoriteNews', JSON.stringify(favorites));
  }

  updateBtnnState();
}

// Функція для видалення новини зі списку улюблених
function removeFromFavorites() {
  let favorites = localStorage.getItem('favoriteNews');
  if (favorites) {
    favorites = JSON.parse(favorites);
    const index = favorites.indexOf(newsId);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favoriteNews', JSON.stringify(favorites));
    }
  }

  updateBtnState();
}

// Функція для оновлення стану кнопки додавання/видалення зі списку улюблених
function updateBtnState() {
  const isFav = localStorage.getItem('favoriteNews')?.includes(newsId);
  if (isFav) {
    addToFavBtn.style.display = 'none';
    removeFromFavBtn.style.display = 'block';
  } else {
    addToFavBtn.style.display = 'block';
    removeFromFavBtn.style.display = 'none';
  }
}

// Встановлюємо обробник подій на кнопки додавання/видалення зі списку улюблених
addToFavBtn.addEventListener('click', addToFavorites);
removeFromFavBtn.addEventListener('click', removeFromFavorites);

// Оновлюємо стан кнопки при завантаженні сторінки
updateBtnState();

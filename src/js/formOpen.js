const loginBtn = document.querySelector('.loginBtn');
const modal = document.querySelector('.form__overlay');
const closeButton = modal.querySelector('.form__close');

loginBtn.addEventListener('click', () => {
  modal.classList.add('form__overlay--visible');
});

closeButton.addEventListener('click', () => {
  modal.classList.remove('form__overlay--visible');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('form__overlay--visible');
  }
});
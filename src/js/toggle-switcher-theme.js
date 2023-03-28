const body = document.querySelector('body'),
  navToggle = document.querySelector('.nav__toggle'),
  mobToggle = document.querySelector('.mob__toggle');

let getMode = localStorage.getItem('theme');
if (getMode && getMode === 'dark') {
  body.classList.add('dark');
  navToggle.classList.add('active');
  mobToggle.classList.add('active');
}

navToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.style.transition = '1s';

  if (!body.classList.contains('dark')) {
    return localStorage.setItem('theme', 'light');
  }
  localStorage.setItem('theme', 'dark');
});

mobToggle.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (!body.classList.contains('dark')) {
    return localStorage.setItem('theme', 'light');
  }
  localStorage.setItem('theme', 'dark');
});

navToggle.addEventListener('click', () => navToggle.classList.toggle('active'));
mobToggle.addEventListener('click', () => mobToggle.classList.toggle('active'));

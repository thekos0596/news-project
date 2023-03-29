const btnUp = document.querySelector('.btn-scroll');
const viewportWidth = window.innerWidth;

window.addEventListener('scroll', e => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPositin = scrollHeight - scrollTop;

  if (viewportWidth <= 768) {
    if (clientHeight >= scrollPositin - 2000) {
      showBtn();
    } else {
      hiddenBtn();
    }
  } else if (viewportWidth > 768 && viewportWidth <= 1280) {
    if (clientHeight >= scrollPositin - 1700) {
      showBtn();
    } else {
      hiddenBtn();
    }
  } else {
    if (clientHeight >= scrollPositin - 900) {
      showBtn();
    } else {
      hiddenBtn();
    }
  }
});

function showBtn() {
  btnUp.classList.remove('visually-hidden');
  btnUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function hiddenBtn() {
  btnUp.classList.add('visually-hidden');
  btnUp.removeEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

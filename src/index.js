import './js/mobile-menu';
import './js/new-cards';
import './js/toggle-switcher-theme';
import './js/search-form';
import './js/API-service/api-weather';
import './js/current-page';
import './js/categories';
import './js/pagination';

import './js/formRegFatchData';
import './js/formOpen';
const up = document.querySelector('.btn-scroll');

up.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

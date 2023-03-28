import NewArticles from './API-service/api-news';
import { renderArticle } from './renderArticle';
import normalization from './normalization';
import { checkFavorites } from './btn-add-remove';
import { checkRead } from './btn-read-more';
import { normalizationPopular } from './normalization';
import { normalizationSearch } from './normalization';
import renderSearchNews from './renderSerchNews';

const pg = document.getElementById('pagination');
const ulPageContainer = document.querySelector('.page-container');
const btnNextPg = document.querySelector('button.next-page');
const btnPrewPg = document.querySelector('button.prew-page');
const addCard = document.querySelector('.news-card');

window.addEventListener('load', onFirstLoad);

const newArticles = new NewArticles();

const pageDesktop = 8;
const pageTablet = 7;
const pageMobile = 4;

let numCardsOnPages = 8;

const desktopWidth = window.matchMedia('(min-width: 1280px)');
const tabletWidth = window.matchMedia(
  '(min-width: 767px) and (max-width: 1279px)'
);
const mobileWidth = window.matchMedia('(max-width: 766px)');

// console.log('desktopWidth ', desktopWidth);
// console.log('tabletWidth ', tabletWidth);
// console.log('mobileWidth ', mobileWidth);

if (desktopWidth.matches) {
  numCardsOnPages = pageDesktop;
} else if (tabletWidth.matches) {
  numCardsOnPages = pageTablet;
} else if (mobileWidth.matches) {
  numCardsOnPages = pageMobile;
}

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 10,
};

async function onFirstLoad(event) {
  event.preventDefault();
  try {
    const res = await newArticles.fetchMostPopular();
    const totalNumberPagesApi = res.results.length; // 20
    valuePage.totalPages = Math.ceil(totalNumberPagesApi / numCardsOnPages); // 3
    const normalizedResults = normalizationPopular(res);
    const newArray = normalizedResults.slice(0, numCardsOnPages);

    addCard.innerHTML = '';
    renderArticle(newArray);
    checkFavorites(newArray);
    checkRead(newArray);
  } catch (error) {
    console.log(error);
  }

  pagination();

  async function renderNumPage(page) {
    try {
      if (addCard.classList.contains('popular')) {
        const res = await newArticles.fetchMostPopular();
        const normalizedResults = normalizationPopular(res);

        const s = (page - 1) * numCardsOnPages;
        const e = s + numCardsOnPages;
        const newArray = normalizedResults.slice(s, e);
        addCard.innerHTML = '';
        renderArticle(newArray);
        checkFavorites(newArray);
        checkRead(newArray);
      }
      if (addCard.classList.contains('search')) {
        const serchValue = addCard.getAttribute('data-page');

        const res = await newArticles.fetchSearch(serchValue);
        const normalizedResults = normalizationSearch(res);

        const s = (page - 1) * numCardsOnPages;
        const e = s + numCardsOnPages;
        const newArray = normalizedResults.slice(s, e);
        addCard.innerHTML = '';
        renderSearchNews(newArray);
        checkFavorites(newArray);
        checkRead(newArray);
      }

      if (addCard.classList.contains('categories')) {
        const serchValue = addCard.getAttribute('data-page');
        const res = await newArticles.fetchSearch(serchValue);
        const normalizedResults = normalizationSearch(res);

        const s = (page - 1) * numCardsOnPages;
        const e = s + numCardsOnPages;
        const newArray = normalizedResults.slice(s, e);
        addCard.innerHTML = '';
        renderSearchNews(newArray);
        checkFavorites(newArray);
        checkRead(newArray);
      }
      // const res = await newArticles.fetchArtic();
      // // totalObjsApi = res.results; // 20[]
      // // totalNumberPagesApi = res.results.length; // 20
      // // valuePage.totalPages = Math.ceil(totalNumberPagesApi / numCardsOnPages); // 3
      // const normalizedResults = normalization(res);
    } catch (error) {
      console.log(error);
    }
  }

  pg.addEventListener('click', e => {
    const ele = e.target;

    if (ele.dataset.page) {
      renderNumPage(ele.dataset.page);
      const pageNumber = parseInt(e.target.dataset.page);
      valuePage.curPage = pageNumber;
      pagination(valuePage);
      handleButtonLeft();
      handleButtonRight();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // DYNAMIC PAGINATION
  function pagination() {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
    const range = delta + 4; // use for handle visible number of links left side

    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? 'active' : '';

      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide += renderPage(pos, active);
          }
        } else {
          // truncate left side or right side
          if (
            (curPage < range && pos <= range) ||
            (curPage > totalPages - range && pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render += renderPage(pos, active);
          } else {
            countTruncate++;
            if (countTruncate === 1) render += dot;
          }
        }
      } else {
        // not truncate
        render += renderPage(pos, active);
      }
    }

    if (renderTwoSide) {
      renderTwoSide =
        renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
      pg.innerHTML = renderTwoSide;
    } else {
      pg.innerHTML = render;
    }
  }

  function renderPage(index, active = '') {
    return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
  }

  ulPageContainer.addEventListener('click', function (e) {
    handleButton(e.target);
  });

  function handleButton(element) {
    if (element.classList.contains('first-page')) {
      valuePage.curPage = 1;
    } else if (element.classList.contains('last-page')) {
      valuePage.curPage = valuePage.totalPages;
    } else if (element.classList.contains('prew-page')) {
      valuePage.curPage--;
      handleButtonLeft();
      renderNumPage(valuePage.curPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      btnNextPg.disabled = false;
    } else if (element.classList.contains('next-page')) {
      valuePage.curPage++;
      handleButtonRight();
      renderNumPage(valuePage.curPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      btnPrewPg.disabled = false;
    }
    pagination();
  }

  function handleButtonLeft() {
    if (valuePage.curPage === 1) {
      btnPrewPg.disabled = true;
    } else {
      btnPrewPg.disabled = false;
    }
  }

  function handleButtonRight() {
    if (valuePage.curPage === valuePage.totalPages) {
      btnNextPg.disabled = true;
    } else {
      btnNextPg.disabled = false;
    }
  }
}

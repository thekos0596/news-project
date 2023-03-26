import { APIService } from './API-service/api-news';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const input = document.querySelector('.input');

icon.onclick = () => {
    search.classList.add("active");
}
// відкриття форми пошуку на мобільній версії

input.addEventListener('submit', onSubmitNews);
    
async function onSubmitNews(e) {
    e.preventDefault()

    title = e.target.elements.searchQuery.value.trim();
    if ((input.value === '') && (input.value.lendth <= 1)) {
        return Notify.failure(
      'Sorry, the search field cannot be empty. Please enter information to search.'
    );
    } 

    const { data } = await searchingNews(title);

      messageInfo(data); 
  stopSearch(data); 
  e.target.reset(); 

  try {
    const res = await newArticles.fetchArtic(searchNews);
    const normalizedResults = normalization(res);
    renderArticle(normalizedResults);
  } catch (error) {
    console.log(error);
  }
}
 
let page = 1;
let title = ' ';
const perPage = 7;


async function searchingNews(title, page = 1, perPage = 7) {
  const response = await axios(
    `?key=${API_KEY}&q=${title}${restAPI}&page=${page}&per_page=${perPage}`
  ); 
  return response;
}

function messageInfo(arr) {
  if (arr.input.value === 0) {
      return `<h2 class="message-info">We haven’t found news from this category</h2>
    <img src="./images/defaultimage.jpg"/>`
    ;
  }
  if (arr.totalHits !== 0) {
    Notify.success(`Hooray! We found ${arr.totalHits} images.`);
  }
}
function stopSearch(arr) {
  if (arr.hits.length < 40 && arr.hits.length > 0) {
    loadMoreBtn.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  if (arr.hits.length === 40) {
    loadMoreBtn.style.display = 'block';
  }
}






document.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(search);
 
    if (!withinBoundaries) {
        search.classList.remove("active") 
    }
})
    // закриття форми по кліку поза формою на мобільній версії

document.addEventListener('keydown', function(e) {
	if( e.key == 27 ){ // код клавіші Escape
		search.classList.remove("active")
	}
});
// закриття форми по натисканню на Esc на мобільній версії


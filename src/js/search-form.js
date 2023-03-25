import axios from 'axios';

const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
let dataSearch = [];

icon.onclick = () => {
    search.classList.add("active");
}
// відкриття форми пошуку на мобільній версії

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

open() {
    $('body').classList.add('overflow__hidden')
}
// блокую body щоб не скролився


export class SearchModel{
start () {
    if (localStorage.getItem("search-data") === null) {
// перевіряю якщо масив пустий тоді виконується функція

    axios.get(`/search`).then((r) => {
     
        localStorage.setItem("search-data", JSON.stringify(r.data))
// дані перероблюю на стрічку
        dataSearch = JSON.parse(localStorage.getItem("search-data"))
// в масив кладу дані із локалсторедж
    }).catch(r => {
       
        CustomPush.show({
            title:r,
        })
    });
} else {
    dataSearch = JSON.parse(localStorage.getItem("search-data"))
// якщо дані в локалсторедж є, то отримую їх без запиту 
    }
    }
}

function sSearch() {
    let count = 0;
    let liveList = 
}

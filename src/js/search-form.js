import axios from 'axios';

const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const input = document.querySelector('.input');
let dataSearch = [];

icon.onclick = () => {
    search.classList.add("active");
}
// відкриття форми пошуку на мобільній версії

icon.addEventListener('submit', () => {
    if (input.value != '') {
        
    }
})

// зробити сабміт по кліку на лупу як в інпут введено хоч один символ

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

// open() {
//     $('body').classList.add('overflow__hidden')
// }
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

// функція - що буде показуватись як результат

input.addEventListener("input", (e) => {
    let value = e.target.value

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()

        // return the results only, 
        // a function for filtering through our data to include the search input value

// let dataRelivant = dataSearch.sort((a, b) => b.views - a.views)

// dataRelivant.forEach((elem) => {
//     let title = elem.title.trim()

//     if (title.includes(inputText)) {
        
//     }
// })

    } else {
    noResults()
    }
})

function noResults() {
    const error = document.createElement('h2')
    error.classList.add('error-message')

    const text = document.createTextNode('We have not found news from this category')
    error.appendChild(text)
    list.appendChild(error)
}
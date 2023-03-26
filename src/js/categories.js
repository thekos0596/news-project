const categories = [
  {
    section: 'admin',
    display_name: 'Admin',
  },
  {
    section: 'arts',
    display_name: 'Arts',
  },
  {
    section: 'automobiles',
    display_name: 'Automobiles',
  },
  {
    section: 'books',
    display_name: 'Books',
  },
  {
    section: 'briefing',
    display_name: 'Briefing',
  },
  {
    section: 'business',
    display_name: 'Business',
  },
  {
    section: 'climate',
    display_name: 'Climate',
  },
  {
    section: 'corrections',
    display_name: 'Corrections',
  },
  {
    section: 'crosswords & games',
    display_name: 'Crosswords & Games',
  },
  {
    section: 'education',
    display_name: 'Education',
  },
  {
    section: 'en español',
    display_name: 'En Español',
  },
  {
    section: 'fashion',
    display_name: 'Fashion',
  },
  {
    section: 'food',
    display_name: 'Food',
  },
  {
    section: 'guides',
    display_name: 'Guides',
  },
  {
    section: 'health',
    display_name: 'Health',
  },
  {
    section: 'home & garden',
    display_name: 'Home & Garden',
  },
  {
    section: 'home page',
    display_name: 'Home Page',
  },
  {
    section: 'job market',
    display_name: 'Job Market',
  },
  {
    section: 'lens',
    display_name: 'Lens',
  },
  {
    section: 'magazine',
    display_name: 'Magazine',
  },
  {
    section: 'movies',
    display_name: 'Movies',
  },
  {
    section: 'multimedia/photos',
    display_name: 'Multimedia/Photos',
  },
  {
    section: 'new york',
    display_name: 'New York',
  },
  {
    section: 'obituaries',
    display_name: 'Obituaries',
  },
  {
    section: 'opinion',
    display_name: 'Opinion',
  },
  {
    section: 'parenting',
    display_name: 'Parenting',
  },
  {
    section: 'podcasts',
    display_name: 'Podcasts',
  },
  {
    section: 'reader center',
    display_name: 'Reader Center',
  },
  {
    section: 'real estate',
    display_name: 'Real Estate',
  },
  {
    section: 'science',
    display_name: 'Science',
  },
  {
    section: 'smarter living',
    display_name: 'Smarter Living',
  },
  {
    section: 'sports',
    display_name: 'Sports',
  },
  {
    section: 'style',
    display_name: 'Style',
  },
  {
    section: 'sunday review',
    display_name: 'Sunday Review',
  },
  {
    section: 't brand',
    display_name: 'T Brand',
  },
  {
    section: 't magazine',
    display_name: 'T Magazine',
  },
  {
    section: 'technology',
    display_name: 'Technology',
  },
  {
    section: 'the learning network',
    display_name: 'The Learning Network',
  },
  {
    section: 'the upshot',
    display_name: 'The Upshot',
  },
  {
    section: 'the weekly',
    display_name: 'The Weekly',
  },
  {
    section: 'theater',
    display_name: 'Theater',
  },
  {
    section: 'times insider',
    display_name: 'Times Insider',
  },
  {
    section: 'today’s paper',
    display_name: 'Today’s Paper',
  },
  {
    section: 'travel',
    display_name: 'Travel',
  },
  {
    section: 'u.s.',
    display_name: 'U.S.',
  },
  {
    section: 'universal',
    display_name: 'Universal',
  },
  {
    section: 'video',
    display_name: 'Video',
  },
  {
    section: 'well',
    display_name: 'Well',
  },
  {
    section: 'world',
    display_name: 'World',
  },
  {
    section: 'your money',
    display_name: 'Your Money',
  },
];
// const buttonEl = document.querySelectorAll('.categories__button');
const MAIN_URL = 'https://api.nytimes.com/svc/';
const APIS_KEY = 'qkqQGkmfT8AlFPBT4ADFZAe8t9wBji7i';

const buttonEl = document.querySelector('.categories__button');
console.log(buttonEl);

buttonEl.addEventListener('click', function() {
  const selectedCategory = this.dataset.section;
  console.log(buttonEl);
  const url = `https://api.nytimes.com/svc/news/v3/content/all/${selectedCategory}.json?api-key=qkqQGkmfT8AlFPBT4ADFZAe8t9wBji7i`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
            console.log(data);
    })
    .catch(error => console.error(error));
});





let select = function () {
  let selectHeader = document.querySelectorAll('.categories__dropdown-header');
  selectHeader.forEach(item => {
    item.addEventListener('click', function () {
      this.parentElement.classList.toggle('is-active');
    });
  });
};
select();

const buttonSelect = document.getElementById('dropdown-span');
const viewportWidth = window.innerWidth;
buttonSelect.textContent = viewportWidth < 768 ? 'Categories' : 'Other';

function createButton(array) {array.forEach(function(category) {
  const button = document.createElement("button");
  button.classList.add("categories__dropdown-item");
  button.dataset.section = category.section;
  button.innerText = category.display_name;
  document.querySelector(".categories__buttons .categories__dropdown-content").appendChild(button);
});}


if (viewportWidth < 768) {
 {
  const newArray = categories;
         createButton(newArray);
    return;
  }
} else if (viewportWidth < 1268) {
  
    const newArray = categories.slice(4, categories.length);
    createButton(newArray);
    return;
  }
 else {
  {
    const newArray = categories.slice(6, categories.length);
    createButton(newArray);

    return;
  }
}


const BASE_URL = 'https://api.nytimes.com/svc/';
const API_KEY = 'qkqQGkmfT8AlFPBT4ADFZAe8t9wBji7i';

buttonEl.addEventListener("click", () => {
  fetchNews()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

function fetchNews() {
  return fetch("${BASE_URL}news/v3/content/all/crosswords%20%26%20games.json?api-key=${API_KEY}").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}



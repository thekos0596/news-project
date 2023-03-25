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

let select = function () {
  let selectHeader = document.querySelectorAll('.categories__dropdown-header');
  selectHeader.forEach(item => {
    item.addEventListener('click', function () {
      this.parentElement.classList.toggle('is-active');
    });
  });
};
select();

const buttonSelect = document.getElementById('dropdown-btn');
const viewportWidth = window.innerWidth;
console.log(viewportWidth);
console.log(buttonSelect.textContent);
buttonSelect.textContent = viewportWidth < 768 ? 'Categories' : 'Other';

// let selectedCategory = null;

// function updateSelectedCategory() {
//   if (viewportWidth < 768) {
//     selectedCategory = categories[0];
//   } else if (viewportWidth < 1280) {
//     selectedCategory = categories[4];
//   } else {
//     selectedCategory = categories[6];
//   }

//   const dropdownContent = document.querySelector(".categories__buttons .categories__dropdown-content");
//   dropdownContent.innerHTML = "";

//   for (let i = 0; i < categories.length; i++) {
//     if (selectedCategory === categories[i]) {
//       const button = document.createElement('button');
//       button.classList.add('categories__dropdown-item');
//       button.dataset.section = categories[i].section;
//       button.innerText = categories[i].display_name;
//       dropdownContent.appendChild(button);
//       document
//         .querySelector('.categories__buttons .categories__dropdown-content')
//         .appendChild(button);
//     }
//   }
// }

// updateSelectedCategory();
// window.addEventListener("resize", updateSelectedCategory);
function createButton() {categories.forEach(function(category) {
  const button = document.createElement("button");
  button.classList.add("categories__dropdown-item");
  button.dataset.section = category.section;
  button.innerText = category.display_name;
  document.querySelector(".categories__buttons .categories__dropdown-content").appendChild(button);
});}

console.log(categories.length);
// const buttonContainer = document.getElementById('button-container');

// // функція для створення кнопок
// function createButton(text) {
//   const button = document.createElement("button");
//           button.classList.add("categories__dropdown-item");
//           button.dataset.section = category.section;
//           button.innerText = category.display_name;
//           document.querySelector(".categories__buttons .categories__dropdown-content").appendChild(button);
// }

// createButton(text);
// // ширина вьюпорту
const screenWidth = window.innerWidth;
// console.log(screenWidth);
// // додавання кнопок з назвами з масиву залежно від ширини вьюпорту
if (screenWidth < 768) {
  for (let i = 0; i < categories.length; i++) {
    createButton(categories[i].display_name);
    return;
  }
} else if (screenWidth < 1268) {
  for (let i = 4; i < categories.length; i++) {
    createButton(categories[i].display_name);
    return;
  }
} else {
  for (let i = 6; i < categories.length; i++) {
    createButton(categories[i].display_name);
    return;
  }
}
// createButton();
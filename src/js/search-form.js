const icon = document.querySelector('.search-box__icon');
const search = document.querySelector('.search-box');
const closeIcon = document.querySelector(".close-icon");

icon.onclick = () => {
    search.classList.add("active");
}
closeIcon.onclick = () => {
    search.classList.remove("active");
}

// closeIcon.addEventListener("click", () =>
//         inputBox.classList.remove("active")
//       );

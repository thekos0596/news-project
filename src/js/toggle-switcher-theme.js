const body = document.querySelector("body"),
  toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("theme");
if (getMode && getMode === "dark") {
  body.classList.add("dark");
  toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    return localStorage.setItem("theme", "light");
  }
  localStorage.setItem("theme", "dark");
});

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

// API: "https://www.omdbapi.com/?apikey=e8172c21&s=fast"

const moviesListEl = document.querySelector(".movies__list");
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__btn");


searchButton.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", typeInput);

showEmptyState();

async function renderMovies(filter) {
  const API = localStorage.getItem("API");
  const movies = await fetch(API);
  const moviesData = await movies.json();
  const snippedData = moviesData.Search.slice(0, 8);

  if (filter === "A-Z") {
    snippedData.sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
  } else if (filter === "Z-A") {
    snippedData.sort((a, b) => {
      return b.Title.localeCompare(a.Title);
    });
  } else if (filter === "OLD-TO-NEW") {
    snippedData.sort((a, b) => a.Year.slice(0, 4) - b.Year.slice(0, 4));
  } else if (filter === "NEW-TO-OLD") {
    snippedData.sort((a, b) => b.Year.slice(0, 4) - a.Year.slice(0, 4));
  }
  moviesListEl.innerHTML = snippedData
    .map((movie) => moviesHTML(movie))
    .join("");
}

function moviesHTML(movie) {
  return `
    <div class="movie">
        <figure class="poster__img--wrapper">
            <img class="poster__img" src="${movie.Poster}">
        </figure>
        <div class="movie__title">${movie.Title}</div>
        <div class="movie__year">Released in: ${movie.Year.slice(0, 4)}</div>
    </div>
    `;
}

function showEmptyState() {
  moviesListEl.innerHTML = `
        <div class="empty-state">
            <h2>Let's get started by searching above</h2>
        </div>
    `;
}

function typeInput(event) {
  if (event.key === 'Enter') {
    searchButton.click();
  }
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

function searchMovies() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  localStorage.setItem(
    "API",
    `https://www.omdbapi.com/?apikey=e8172c21&s=${searchTerm}`,
  );
  renderMovies();
}

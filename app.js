// API: "https://www.omdbapi.com/?apikey=e8172c21&s=fast"

const moviesListEl = document.querySelector(".movies__list");

async function renderMovies(filter) {
  const movies = await fetch("https://www.omdbapi.com/?apikey=e8172c21&s=red");
  const moviesData = await movies.json();
  const snippedData = moviesData.Search.slice(0, 8);

if (filter === "A-Z") {
    snippedData.sort((a, b) => {
        return a.Title.localeCompare(b.Title);
    });
}
else if (filter === "Z-A") {
    snippedData.sort((a, b) => {
        return b.Title.localeCompare(a.Title);
    });
}
else if (filter === "OLD-TO-NEW") {
    snippedData.sort((a, b) => a.Year - b.Year);
}
else if (filter === "NEW-TO-OLD") {
    snippedData.sort((a, b) => b.Year - a.Year);
}
  moviesListEl.innerHTML = snippedData.map((movie) =>
    moviesHTML(movie)).join("");
}

renderMovies();

function moviesHTML(movie) {
  return `
    <div class="movie">
        <figure class="poster__img--wrapper">
            <img class="poster__img" src="${movie.Poster}">
        </figure>
        <div class="movie__title">${movie.Title}</div>
        <div class="movie__year">Released in: ${movie.Year}</div>
    </div>
    `;
}

function filterMovies(event) {
    renderMovies(event.target.value);
}

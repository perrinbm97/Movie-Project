// API: "https://www.omdbapi.com/?apikey=e8172c21&"

const moviesListEl = document.querySelector(".movies-list");

async function main() {
  const movies = await fetch(
    "https://www.omdbapi.com/?apikey=e8172c21&s=fast");
  const moviesData = await movies.json();

  console.log(moviesData);

//   moviesListEl.innerHTML = moviesData.map((movie) => moviesHTML(movie)).join("");
}

main();

function moviesHTML(movie) {
  return `
    <div class="movie">
        <figure class="poster__img--wrapper">
            <img class="poster__img" src="https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg">
        </figure>
        <div class="movie__title">Movie Title</div>
        <div class="movie__year">Released in: 2005</div>
    </div>
    `;
}

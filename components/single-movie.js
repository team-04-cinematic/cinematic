import {
  CONTAINER,
  BACKDROP_BASE_URL,
  PROFILE_BASE_URL,
  LOGO_BASE_URL,
} from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMetaMovies from './meta-movies.js';
import renderActor from './actor.js';

const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const fetchVideoTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  const data = await res.json();
  const trailer = data.results.find((video) => video.type === 'Trailer');
  return trailer ? trailer.key : null;
};

const fetchMovieCredits = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  return data.cast;
};

const fetchMovieDirectors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  const directors = data.crew.filter((crew) => crew.job === 'Director');
  return directors;
};

const fetchSimilarMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

// You'll need to play with this function in order to add features and enhance
// the style.
const renderMovie = async (movieId) => {
  const movie = await fetchMovie(movieId);
  const videoTrailer = await fetchVideoTrailer(movieId);
  const movieCredits = await fetchMovieCredits(movieId);
  const movieDirectors = await fetchMovieDirectors(movieId);
  const similarMovies = await fetchSimilarMovies(movieId);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  CONTAINER.innerHTML = `
    <div class="flex flex-col gap-8 p-8 rounded min-h-screen items-center
    bg-neutral-100 dark:bg-neutral-700 m-4 lg:m-0  lg:mb-4">
      <div class="flex flex-col justify-center items-center gap-8
        overflow-hidden md:flex-row">

        <!-- Movie poster -->

        <div class="w-full max-h-[65vh] md:w-1/2 md:min-h-full">
          <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.poster_path}
            class="w-full h-full object-contain md:object-cover rounded"
            alt="${movie.title} poster">
        </div>

        <!-- Movie details -->

        <div class="flex flex-col basis-2/3 justify-center items-center gap-4
          md:w-1/2 md:items-start">
          <h2 id="movie-title" class="text-2xl text-center font-bold">
            ${movie.title}
          </h2>

          <!-- Movie release date, runtime, language, rating -->

          <div class="flex flex-wrap justify-evenly items-center gap-4
            md:flex-row md:justify-start md:items-center">

            <p id="movie-release-date" class="text-sm">
              <b>Release Date:</b> ${movie.release_date}
            </p>

            <p id="movie-runtime" class="text-sm">
              <b>Runtime:</b> ${movie.runtime}
            </p>

            <p id="movie-language" class="text-sm">
              <b>Language:</b> ${movie.original_language.toUpperCase()}
            </p>

            <p id="movie-rating" class="text-sm">
              <b>Rating:</b> ${movie.vote_average.toFixed(1)}
            </p>

          </div>

          <!-- Movie overview -->

          <h3 class="text-xl font-bold">Overview</h3>
          <p id="movie-overview">${movie.overview}</p>

          ${videoTrailer ? `
            <div class="flex flex-col w-full justify-center items-center gap-4
              md:items-start">
              <h3 class="text-xl text-left font-bold">Trailer</h3>
              <iframe src="https://www.youtube.com/embed/${videoTrailer}"
                height="315"title="YouTube video player" frameborder="0"
                allowfullscreen allow="picture-in-picture" class="w-full">
              </iframe>
            </div>
          ` : ''}

        </div> <!-- end of movie details -->
      </div> <!-- end of movie poster and details -->

      <h3 class="text-2xl font-bold">Related Movies</h3>
      ${renderMetaMovies(similarMovies, 6)}

      <h3 class="text-2xl font-bold">Credits</h3>
      <div id="movie-credits" class="flex flex-col gap-8 w-full
        justify-center items-center">

        <!-- Movie cast -->

        <h4 class="text-xl font-bold">Cast</h4>
        <div class="flex flex-wrap gap-6 w-full justify-center">
          ${movieCredits.slice(0, 6).map((credit) => `
            <div data-credit-id="${credit.id}" class="flex flex-col basis-52
              bg-neutral-200 cursor-pointer transition duration-500 rounded
              ease-in-out transform overflow-hidden dark:bg-neutral-700
              dark:hover:bg-neutral-600 hover:shadow-2xl hover:bg-neutral-300
              hover:-translate-y-1 hover:scale-110">

              <!-- check if the actor has a profile picture -->

              ${credit.profile_path ? `
              <img src="${PROFILE_BASE_URL + credit.profile_path}"
                alt="${credit.name} profile" width="185" height="276"
                class="rounded object-cover w-full">
              ` : `
              <img src="https://via.placeholder.com/185x276?text=Image+not+found"
                alt="${credit.name} profile" width="185" height="276"
                class="rounded object-cover w-full">
              `}

              <div class="flex flex-col justify-center items-center p-1">
                <div class="font-medium text-center">${credit.name}</div>
                <div
                  class="text-sm text-center text-gray-500 dark:text-gray-400">
                  as ${credit.character}
                </div>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Movie Director -->

        <div class="flex flex-col gap-4 w-full justify-center items-center">
          <h4 class="text-xl font-bold">Director</h4>
          <div class="directors flex flex-wrap justify-center gap-6">
            ${movieDirectors.map((director) => `
              <div class="director flex flex-col basis-52 justify-center
              items-center rounded bg-neutral-200 cursor-pointer transition
              duration-500 ease-in-out transform overflow-hidden
              dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:shadow-2xl
              hover:bg-neutral-300 hover:-translate-y-1 hover:scale-110"
              data-credit-id="${director.id}">
                <!-- check if director has a profile picture -->
                ${director.profile_path ? `
                  <img src="${PROFILE_BASE_URL + director.profile_path}"
                    alt="${director.name} profile" width="185" height="276"
                    class="rounded object-cover w-full">
                  <p class="text-sm p-4">${director.name}</p>
                ` : `
                  <img src="https://via.placeholder.com/185x276?text=Image+not+found"
                    alt="${director.name} profile" width="185" height="276"
                    class="rounded object-cover w-full">
                  <p class="text-sm p-4">${director.name}</p>
                `}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Movie production companies -->

        <h4 class="text-2xl font-bold">Production Companies</h4>
        <div class="flex flex-wrap gap-8 w-full h-full justify-center
          items-center">
          ${movie.production_companies.map((company) => (company.logo_path ? `
            <div class="flex flex-col basis-52 gap-2 items-center">

              <img src="${LOGO_BASE_URL + company.logo_path}"
                alt="${company.name} logo" class="rounded object-scale-down
                h-12 min-h-[100px] md:h-24">

                <p class="font-medium text-center">${company.name}</p>
            </div>
          ` : `
            <div
              class="flex flex-col basis-32 gap-2 items-center justify-center">
                <p class="font-medium text-center">${company.name}</p>
            </div>
          `)).join('')}
        </div> <!-- end of production companies -->
      </div> <!-- End of movie credits -->
    </div>
  `;

  const relatedMovies = document.querySelectorAll('.movie');
  relatedMovies.forEach((relatedMovie) => {
    relatedMovie.addEventListener('click', () => {
      const movieID = relatedMovie.dataset.id;
      renderMovie(movieID);
    });
  });

  const casts = document.querySelectorAll('[data-credit-id]');
  casts.forEach((cast) => {
    cast.addEventListener('click', () => {
      const { creditId } = cast.dataset;
      renderActor(creditId);
    });
  });
};

export default renderMovie;

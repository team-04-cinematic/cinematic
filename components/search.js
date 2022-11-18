import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMetaMovies from './meta-movies.js';
import renderMovie from './single-movie.js';
import renderActor from './actor.js';

const fetchSearch = async (searchTerm) => {
  const url = `${constructUrl('search/multi')}&query=${searchTerm}`;
  const res = await fetch(url);
  return res.json();
};

const renderSearch = async (searchTerm) => {
  CONTAINER.innerHTML = '';

  let resultsContainer = document.querySelector('.search-results');

  if (resultsContainer) {
    resultsContainer.innerHTML = '';
  } else {
    resultsContainer = document.createElement('div');
  }

  const search = await fetchSearch(searchTerm);
  const { results } = search;
  resultsContainer.innerHTML = '';

  const movieResults = results.filter((result) => result.media_type === 'movie');
  const actorResults = results.filter((result) => result.media_type === 'person');

  const searchResults = document.createElement('div');
  searchResults.classList.add(
    'search-results',
    'container',
    'mx-auto',
    'my-4',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'md:items-start',
    'max-w-screen-lg',
    'gap-4',

  );

  searchResults.innerHTML = `
    <h2 class="text-2xl font-bold md:pl-8">
      Search Results for "${searchTerm}"
    </h2>

    <div class="flex flex-col gap-4 ">

      <div class="movie-results flex flex-col items-center md:items-start">
        <h3 class="text-2xl font-bold md:pl-8 mb-8">Movies</h3>
        ${movieResults.length > 0 ? renderMetaMovies(movieResults)
    : '<p class="text-xl md:pl-8">No movies found</p>'}
      </div>

      <div class="actor-results flex flex-col items-center md:items-start">
        <!-- TODO: refactor to use renderActors -->
        <h3 class="text-2xl font-bold pl-8 my-8">Actors</h3>
        ${actorResults.length > 0 ? `
          <div class="actors-container container mx-auto my-4 flex flex-wrap
            justify-center gap-4 max-w-screen-lg">
            ${actorResults.map((actor) => `
              <div data-id="${actor.id}" class="actor flex flex-col
                justify-start items-center basis-52 rounded overflow-hidden
                bg-neutral-200 cursor-pointer transform transition duration-500
                ease-in-out dark:bg-neutral-700 dark:hover:bg-neutral-600
                hover:shadow-2xl hover:bg-neutral-400 hover:-translate-y-1
                hover:scale-105">

                <img src="${actor.profile_path
    ? `${BACKDROP_BASE_URL}${actor.profile_path}`
    : 'https://via.placeholder.com/300x450'}"
                width="780" height="439" class="object-cover"
                alt="${actor.name}">

                <h3 class="actor-name
                  my-2 font-bold text-center">${actor.name}</h3>
              </div>
            `).join('')}
          </div>
        ` : `
          <p class="md:pl-8 text-center">No actors found</p>
        `}
      </div>
    </div>
  `;

  CONTAINER.appendChild(searchResults);

  movieResults.forEach((movie) => {
    console.log(movie);
    const movieContainer = document.querySelector(`[data-id="${movie.id}"]`);
    movieContainer.addEventListener('click', () => {
      renderMovie(movie.id);
    });
  });

  actorResults.forEach((actor) => {
    const actorContainer = document.querySelector(`[data-id="${actor.id}"]`);
    actorContainer.addEventListener('click', () => {
      renderActor(actor.id);
    });
  });
};

export default renderSearch;

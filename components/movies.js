import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMovie from './single-movie.js';

const fetchGenres = async () => {
  const url = constructUrl('genre/movie/list');
  const res = await fetch(url);
  return res.json();
};

const fetchGenreName = async (genres, genreId) => genres.genres.find(
  (genre) => genre.id === genreId,
).name;

const renderMovies = async (movies) => {
  const genres = await fetchGenres();

  let moviesContainer = document.querySelector('.movies-container');

  if (moviesContainer) {
    moviesContainer.innerHTML = '';
  } else {
    moviesContainer = document.createElement('div');
  }

  moviesContainer.classList.add(
    'movies-container',
    'container',
    'mx-auto',
    'my-4',
    'flex',
    'flex-wrap',
    'justify-center',
    'gap-4',
    'max-w-screen-lg',
  );

  movies.map(async (movie) => {
    const genreName = movie.genre_ids.map(
      async (genreId) => fetchGenreName(genres, genreId),
    );
    const genreNames = await Promise.all(genreName);

    const movieContainer = document.createElement('div');
    movieContainer.classList.add(
      'movie',
      'flex',
      'flex-col',
      'justify-start',
      'items-start',
      'max-w-xs',
      'rounded',
      'relative',
      'overflow-hidden',
      'bg-neutral-200',
      'cursor-pointer',
      'transition',
      'duration-500',
      'ease-in-out',
      'transform',
      'dark:bg-neutral-700',
      'dark:hover:bg-neutral-600',
      'hover:shadow-2xl',
      'hover:bg-neutral-400',
      'hover:-translate-y-1',
      'hover:scale-110',
    );
    movieContainer.innerHTML = `
      <img src="${BACKDROP_BASE_URL + movie.backdrop_path}"
        alt="${movie.title} poster" width="780" height="439">

      <h3 class="movie-title my-2 p-4 py-2 text-lg font-bold">
        ${movie.title}
      </h3>

      <p class="text-sm px-4 pb-4 text-gray-500 dark:text-gray-400">
        ${genreNames.join(', ')}
      </p>

      <p class="movie-rating text-sm p-2 absolute top-32 right-4 rounded
        font-bold bg-blue-300 dark:bg-blue-600 text-neutral-900
        dark:text-neutral-200">
        ${movie.vote_average.toFixed(1)}
      </p>

      <p class="description hidden absolute bottom-0 p-4 text-sm tracking-wide
          text-center bg-neutral-200 dark:bg-neutral-700 animate-fade-in-down">
        ${movie.overview}
      </p>
      `;
    movieContainer.addEventListener('click', () => {
      renderMovie(movie.id);
    });

    movieContainer.addEventListener('mouseover', () => {
      const description = movieContainer.querySelector('.description');
      description.classList.remove('hidden');
    });

    movieContainer.addEventListener('mouseout', () => {
      const description = movieContainer.querySelector('.description');
      description.classList.add('hidden');
    });
    moviesContainer.appendChild(movieContainer);
  });
  CONTAINER.appendChild(moviesContainer);
};

export default renderMovies;

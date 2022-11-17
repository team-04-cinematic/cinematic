import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMovie from './single-movie.js';

const fetchGenreName = async (genreId) => {
  const url = constructUrl('genre/movie/list');
  const res = await fetch(url);
  const data = await res.json();
  return data.genres.find((genre) => genre.id === genreId).name;
};

const renderMovies = (movies) => {

  CONTAINER.innerHTML = '';

  CONTAINER.innerHTML = `
    <div class="filterBy mx-auto">
      <select id="filter" class="rounded-md p-1 mb-4 outline-slate-300
        dark:bg-neutral-700 dark:text-neutral-200">
        <option> Sort Movies By </option>
        <option> popularity </option>
        <option> relase date </option>
        <option> top rated </option>
      </select>
    </div>
  `;

  const filter = document.getElementById('filter');
  filter.addEventListener('change', () => {
    switch (filter.value) {
      case 'popularity':
        movies.sort((a, b) => {
          const keyA = a.popularity;
          const keyB = b.popularity;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break;
      case 'relase date':
        movies.sort((a, b) => {
          const keyA = new Date(a.release_date);
          const keyB = new Date(b.release_date);
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break;
      case 'top rated':
        movies.sort((a, b) => {
          const keyA = a.vote_average;
          const keyB = b.vote_average;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      default:
        break;
    }
    renderMovies(movies);
  });

  let moviesContainer = document.querySelector('.movies-container')

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
    'max-w-screen-lg'
  );

  movies.map(async (movie) => {
    const genreName = movie.genre_ids.map(
      async (genreId) => fetchGenreName(genreId),
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

      <p class="genre-names text-sm px-4 pb-4 text-gray-500 dark:text-gray-400 ">
        ${genreNames.join(', ')}
      </p>

      <p class="bg-cyan-300 dark:bg-cyan-600 text-neutral-900 dark:text-neutral-200 movie-rating text-sm p-2 absolute top-32 right-4 rounded font-bold">
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
    CONTAINER.appendChild(moviesContainer);
  });
};

export default renderMovies;

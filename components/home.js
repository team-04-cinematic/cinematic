import { CONTAINER } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMovies from './movies.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchNowPlayingMovies = async () => {
  const url = constructUrl('movie/now_playing');
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const fetchUpcomingMovies = async () => {
  const url = constructUrl('movie/upcoming');
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const fetchGenres = async () => {
  const url = constructUrl('genre/movie/list');
  const res = await fetch(url);
  return res.json();
};

const fetchMoviesByGenre = async (genreId) => {
  const url = constructUrl('discover/movie');
  const res = await fetch(`${url}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
};

const renderHome = async (passedMovies) => {
  let movies = passedMovies || await fetchNowPlayingMovies();
  const genres = await fetchGenres();

  let filterContainer = document.querySelector('.filter-results');

  if (!filterContainer) {
    filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-results', 'w-full', 'px-4');

    filterContainer.innerHTML = `
      <div class="filters flex flex-wrap w-full justify-center sm:justify-between
        items-center gap-4">
        <div class="filter-genre flex flex-wrap gap-4 items-center">
          <label for="genre" class="text-sm font-medium">Genre</label>
          <select name="genre" id="genre" class="rounded-md py-2 px-4
            border-transparent border-r-[16px] outline-slate-300
            dark:bg-neutral-700 dark:text-neutral-200 hover:cursor-pointer">
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
            ${genres.genres.map((genre) => `
              <option value="${genre.id}">${genre.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="filter-sort flex flex-wrap gap-4 items-center">
          <label for="sort" class="text-sm font-medium">Sort</label>
          <select name="sort" id="sort" class="rounded-md py-2 px-4
            border-transparent border-r-[16px] outline-slate-300
            dark:bg-neutral-700 dark:text-neutral-200 hover:cursor-pointer">
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>
        </div>
      </div>
    `;

    CONTAINER.appendChild(filterContainer);
  }

  const filter = document.getElementById('sort');
  filter.addEventListener('change', () => {
    switch (filter.value) {
      case 'popularity':
        movies.sort((a, b) => {
          if (a.popularity > b.popularity) return -1;
          if (a.popularity < b.popularity) return 1;
          return 0;
        });
        break;
      case 'release_date':
        movies.sort((a, b) => {
          if (a.release_date > b.release_date) return -1;
          if (a.release_date < b.release_date) return 1;
          return 0;
        });
        break;
      case 'vote_average':
        movies.sort((a, b) => {
          if (a.vote_average > b.vote_average) return -1;
          if (a.vote_average < b.vote_average) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
    renderMovies(movies);
  });

  const genreFilter = document.getElementById('genre');
  genreFilter.addEventListener('change', async () => {
    filter.value = 'popularity';
    switch (genreFilter.value) {
      case 'now_playing':
        movies = await fetchNowPlayingMovies();
        break;
      case 'upcoming':
        movies = await fetchUpcomingMovies();
        break;
      default:
        movies = await fetchMoviesByGenre(genreFilter.value);
        break;
    }
    renderMovies(movies);
  });

  renderMovies(movies);
};

export default renderHome;

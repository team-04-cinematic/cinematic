import { CONTAINER } from '../utils/constants.js';
import renderMovies from './movies.js';

const renderFilter = (movies) => {
  const navbar = document.querySelector('.filterBy');
  navbar.innerHTML = `
    <select id="filter" class="rounded-md p-1 mb-4 outline-slate-300
      dark:bg-neutral-700 dark:text-neutral-200">
      <option> Sort Movies By </option>
      <option> popularity </option>
      <option> relase date </option>
      <option> top rated </option>
    </select>
  `;
  const filter = document.getElementById('filter');

  filter.addEventListener('change', () => {
    switch (filter.value) {
      case 'popularity':
        movies.sort((a, b) => {
          const keyA = a.popularity;
          const keyB = b.popularity;
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break;
      case 'relase date':
        // do somthing with  , "remove" value
        movies.sort((a, b) => {
          const keyA = new Date(a.release_date);
          const keyB = new Date(b.release_date);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      case 'top rated':
        // do somthing with  , "add" value
        movies.sort((a, b) => {
          const keyA = a.vote_average;
          const keyB = b.vote_average;
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      default:
        break;
    }
    CONTAINER.innerHTML = '';
    renderMovies(movies);
  });
};

const renderHome = (movies) => {
  renderFilter(movies);
  renderMovies(movies);
};

export default renderHome;

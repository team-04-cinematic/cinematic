import constructUrl from './utils/urls.js';
import renderHome from './components/home.js';
import renderMovie from './components/single-movie.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl('movie/now_playing');
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please
const autorun = async () => {
  const search = document.getElementById("search");
  const movies = await fetchMovies();
  search.addEventListener(("keypress"), (event) => {
    if (event.charCode === 13) { // key code of the keybord key
      const result = movies.results.find(({ title }) => title.toUpperCase() === search.value.toUpperCase());
      if (result != undefined) {
        search.value = " "
        renderMovie(result.id)
      };
    }
  });
  renderHome(movies.results);
};

document.addEventListener('DOMContentLoaded', autorun);

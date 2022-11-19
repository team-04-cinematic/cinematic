import constructUrl from './utils/urls.js';
import renderActors from './components/actors.js';
import renderAbout from './components/about.js';
import renderSearch from './components/search.js';
import renderHome from './components/home.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl('movie/now_playing');
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderHome(movies.results);

  const navbarButtons = document.querySelectorAll('nav button');

  navbarButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      // show the menu when the button is clicked
      const menu = document.getElementById('navbar-search');
      menu.classList.toggle('hidden');
    });
  });

  const menuItems = document.querySelectorAll('#navbar-search li a');
  menuItems.forEach((item) => {
    const siblings = item.parentNode.parentNode.children;
    const siblingsLinks = Array.from(siblings).map(
      (sibling) => sibling.children[0],
    );

    item.addEventListener('click', async (event) => {
      event.preventDefault();

      if (!item.classList.contains('bg-blue-700')) {
        siblingsLinks.forEach((link) => {
          link.classList.remove(
            'text-white',
            'bg-blue-700',
            'md:bg-transparent',
            'md:text-blue-700',
            'md:dark:text-blue-300',
            'dark:text-white',
          );
          link.classList.add(
            'text-neutral-700',
            'hover:bg-neutral-100',
            'dark:text-neutral-200',
            'md:hover:bg-transparent',
            'dark:hover:bg-neutral-700',
            'dark:hover:text-white',
            'dark:border-neutral-700',
            'md:hover:text-blue-700',
            'md:dark:hover:text-white',
            'md:dark:hover:bg-transparent',
          );
        });
        item.classList.add(
          'text-white',
          'bg-blue-700',
          'md:bg-transparent',
          'md:text-blue-700',
          'md:dark:text-blue-300',
          'dark:text-white',
        );
        item.classList.remove('text-neutral-700');
      }
    });
  });

  const moviesMenuItem = document.getElementById('movies-page');
  moviesMenuItem.addEventListener('click', async () => {
    renderHome(movies.results);
  });

  const actorsMenuItem = document.getElementById('actors-page');
  actorsMenuItem.addEventListener('click', async () => {
    renderActors();
  });

  const aboutMenuItem = document.getElementById('about-page');
  aboutMenuItem.addEventListener('click', async () => {
    renderAbout();
  });

  const search = document.querySelectorAll('#search-navbar');
  search.forEach((item) => {
    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const query = event.target.value;
        renderSearch(query);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', autorun);

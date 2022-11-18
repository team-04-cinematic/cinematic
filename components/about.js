import { CONTAINER } from '../utils/constants.js';

const profiles = [
  {
    name: 'Amal Salah',
    avatar: 'https://cdn.discordapp.com/avatars/378975586040676363/450c7d0719c1f54622245657cfc78ca4.webp?size=1024',
    github: 'https://github.com/Amal95Salah',
  },

  {
    name: 'Ramyar Ali',
    avatar: 'https://cdn.discordapp.com/avatars/1027021196040089692/1bd5be2d2273036e784ed0e1a1cbb983.webp?size=1024',
    github: 'https://github.com/ramagitup',
  },

  {
    name: 'Sara Bakr',
    avatar: 'https://cdn.discordapp.com/avatars/1006878760764723234/c840c67e5463ecdd52682eeff29f5d22.webp?size=1024',
    github: 'https://github.com/SaraBakr',
  },

  {
    name: 'Aland Abdullah',
    avatar: 'https://cdn.discordapp.com/avatars/894698132066144287/ad89de8ec65267c98519459d24869fbc.webp?size=1024',
    github: 'https://github.com/alandio',
  },

];

const renderAbout = () => {
  CONTAINER.innerHTML = '';

  let aboutContainer = document.querySelector('.about-container');

  if (aboutContainer) {
    aboutContainer.innerHTML = '';
  } else {
    aboutContainer = document.createElement('div');
  }

  aboutContainer.classList.add(
    'about-container',
    'container',
    'mx-auto',
    'my-4',
    'flex',
    'flex-col',
    'justify-center',
    'gap-4',
    'max-w-screen-lg',
  );

  aboutContainer.innerHTML = `
    <div class="about">
      <h1 class="text-3xl font-bold text-center mb-8">About</h1>
      <p class="text-center">This is a simple movie app built with vanilla JavaScript.</p>
      <p class="text-center">It uses the <a href="https://developers.themoviedb.org/3/" target="_blank">The Movie Database API</a> to fetch movies and actors.</p>
      <p class="text-center">It has the following features:</p>

      <ul class="list-disc list-inside mx-auto mt-8 max-w-fit">
        <li>Search movies</li>
        <li>Search actors</li>
        <li>Sort movies by popularity, release date, and top rated</li>
        <li>Filter movies by genre</li>
        <li>View movie details</li>
        <li>View actor details</li>
      </ul>

      <h2 class="text-2xl font-bold text-center mt-8">Team</h2>
    </div >
  `;

  const teamContainer = document.createElement('div');
  teamContainer.classList.add('team-container', 'flex', 'flex-wrap', 'justify-center', 'gap-4', 'mt-8');

  profiles.forEach((profile) => {
    const memberContainer = document.createElement('div');
    memberContainer.classList.add(
      'movie',
      'flex',
      'flex-col',
      'basis-44',
      'justify-center',
      'items-center',
      'max-w-xs',
      'rounded',
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

    memberContainer.innerHTML = `
    <img src = "${profile.avatar}" alt="${profile.name.split(' ')[0]}'s avatar" class="w-32 h-32 rounded-full object-cover object-center my-4" />
    <h3 class="movie-title my-2 text-lg font-bold">
      ${profile.name}
    </h3>

    <!-- github link -->
    <a href="${profile.github}" target="_blank" rel="noopener noreferrer" class="mb-4">
      <img src="../images/github.svg" alt="github logo" width="30" height="30">
    </a>
    `;

    teamContainer.appendChild(memberContainer);
  });

  aboutContainer.appendChild(teamContainer);

  CONTAINER.appendChild(aboutContainer);
};

export default renderAbout;

import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderActor from './actor.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchActors = async () => {
  const url = constructUrl('person/popular');
  const res = await fetch(url);
  return res.json();
};

const renderActors = async () => {

  CONTAINER.innerHTML = '';

  const actors = await fetchActors();

  console.log(actors.results);

  let actorsContainer = document.querySelector('.actors-container')

  if (actorsContainer) {
    actorsContainer.innerHTML = '';
  } else {
    actorsContainer = document.createElement('div');
  }

  actorsContainer.classList.add(
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

  actors.results.map(async (actor) => {
    console.log(actor)
    const actorContainer = document.createElement('div');
    actorContainer.classList.add(
      'actor',
      'flex',
      'flex-col',
      'justify-start',
      'items-center',
      'basis-56',
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
      'hover:scale-105',
    );
    actorContainer.innerHTML = `
      <div class="actor-image relative">
        <img src="${BACKDROP_BASE_URL + actor.profile_path}"
          alt="${actor.name} poster" width="780" height="439">
        <h3 class="actor-name my-2 font-bold text-center">
          ${actor.name}
        </h3>
      </div>
    `;
    actorContainer.addEventListener('click', () => {
      renderActor(actor.id);
    });
    actorsContainer.appendChild(actorContainer);
  });
  CONTAINER.appendChild(actorsContainer);
};

export default renderActors;

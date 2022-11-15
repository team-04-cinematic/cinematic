import constructUrl from './utils/urls.js';
import renderActor from './components/actor.js';
import { CONTAINER, BACKDROP_BASE_URL } from './utils/constants.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchActors = async () => {
  const url = constructUrl('person/popular');
  const res = await fetch(url);
  return res.json();
};
const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  return res.json();
};
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  renderActor(actorRes);
};

// Don't touch this function please
const autorun = async () => {
  const actors = await fetchActors();
  renderActors(actors.results);
};

const renderActors = (actors) => {
  actors.map(async (actor) => {
    const actorContainer = document.createElement('div');
    actorContainer.classList.add(
      'actor',
      'flex',
      'flex-col',
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
      'hover:scale-105',
    );
    actorContainer.innerHTML = `
      <img src="${BACKDROP_BASE_URL + actor.profile_path}"
        alt="${actor.name} poster" width="780" height="439">
      <h3 class="movie-title my-2 text-lg font-bold">
        ${actor.name}
      </h3>
    `;
    actorContainer.addEventListener('click', () => {
      actorDetails(actor);
    });
    CONTAINER.appendChild(actorContainer);
  });
};

document.addEventListener('DOMContentLoaded', autorun);

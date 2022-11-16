import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';
import renderMetaMovies from './meta-movies.js';
import renderMovie from './single-movie.js';

const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`); // 82104
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const fetchMoviesParticipated = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  const data = await res.json();
  return data.cast;
};

const renderActor = async (actorId) => {
  const actor = await fetchActor(actorId);
  const movies = await fetchMoviesParticipated(actorId);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  CONTAINER.innerHTML = `
    <div class="flex flex-col p-8 md:flex-row gap-4 sm:gap-2 justify-start
      items-center">

      <!-- Actor profile pic -->
      <div class="max-h-[65vh] md:w-1/2 md:min-h-full">
        <img id="profile_path" src=${BACKDROP_BASE_URL + actor.profile_path}
          class="w-full h-full object-contain md:object-cover rounded"
          alt="${actor.name} ">
      </div>

      <h2 id="actor-name" class="text-2xl font-bold">
        ${actor.name}
      </h2>

      <!-- Actor details -->
      <div class="flex flex-wrap gap-4 md:w-1/2 justify-center basis-2/3 items-center">


        <!-- check if actor has a birthday -->
        ${actor.birthday ? `
          <p id="actor-birthday" class="text-base">
            <b>Birthday: </b> ${actor.birthday}
          </p>
        ` : ''}

        <!-- check if actor has a place of birth -->
        ${actor.place_of_birth ? `
          <p id="actor-placeofbirth" class="text-base">
            <b>Place of birth: </b> ${actor.place_of_birth}
          </p>
        ` : ''}

        <!-- check if actor has a biography -->
        ${actor.biography ? `
          <p id="movie-biography" class="text-base">
            <b>Gender: </b>${actor.gender === 1 ? 'Female' : 'Male'}
          </p>
        ` : ''}

        <!-- check if actor has a popularity -->
        ${actor.popularity ? `
          <p id="movie-popularity" class="text-base">
            <b>Popularity: </b>${actor.popularity}
          </p>
        ` : ''}

        ${actor.deathday ? `
        <p id="movie-language" class="text-base">
          <b>Death Day: </b>${actor.deathday}
        </p>
        ` : ''}
      </div>

      <p id="actor-biography" class="text-base">
          <b>Biography: </b> ${actor.biography}
      </p>

      <!-- participated in Movies -->

      <!-- check if the actor participated in any movies -->

      ${movies.length > 0 ? `
        <h3 class="text-xl font-bold">Movies</h3>
        <div id="participated-movies" class="flex flex-wrap w-full
          justify-center gap-4">
          ${renderMetaMovies(movies)}
        </div> <!-- end of actor details -->
      ` : `
        <h3 class="text-xl font-bold">No movies participations</h3>
      `}

    </div> <!-- end of container -->
`;

  movies.slice(0, 6).forEach(async (movieParticipated) => {
    const movieContainer = document.querySelector(
      `[data-id="${movieParticipated.id}"]`,
    );
    movieContainer.addEventListener('click', async () => {
      renderMovie(movieParticipated.id);
    });
  });
};

export default renderActor;

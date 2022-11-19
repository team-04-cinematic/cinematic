import { BACKDROP_BASE_URL } from '../utils/constants.js';

const renderMetaMovies = (movies, limit = 30) => `
    <div id="movies" class="flex flex-wrap w-full justify-center
        gap-6">
        ${movies.slice(0, limit).map((movie) => `
        <div data-id="${movie.id}" class="movie flex
            flex-col basis-52 justify-start items-center rounded
            bg-neutral-200 cursor-pointer transition duration-500 ease-in-out
            transform overflow-hidden dark:bg-neutral-700
            dark:hover:bg-neutral-600 hover:shadow-2xl hover:bg-neutral-300
            hover:-translate-y-1 hover:scale-110">

            <!-- check if movie has a backdrop image -->
            ${movie.backdrop_path ? `
            <img src="${BACKDROP_BASE_URL + movie.poster_path}"
                alt="${movie.title} backdrop" width="780" height="1170">
            ` : `
            <img src="https://via.placeholder.com/780x1170"
                alt="${movie.title} backdrop" width="780" height="1170">
            `}

            <h3 class="movie-title my-2 text-base font-bold text-center">
            ${movie.title}
            </h3>

            <p class="movie-rating text-sm pb-4">
            Average vote: ${movie.vote_average.toFixed(1)}
            </p>

        </div>
        `).join('')}
    </div>
`;

export default renderMetaMovies;

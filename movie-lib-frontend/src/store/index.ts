import { createStore } from 'vuex';
import { store as movies, State as MovieState, MoviesStore } from './movies';

// export default createStore({
//   state: {
//     movies: {
//       isLoading: false,
//       popularMovies: {
//         page: 0,
//         movies: [],
//       },
//       currentlyPlaying: {
//         page: 0,
//         movies: [],
//       },
//       selectedMovie: {},
//     },
//     user: {
//       userId: null,
//       key: null,
//       firstName: null,
//       lastName: null,
//     },
//   },
//   mutations: {
//     SET_MOVIE_LOADING(state, status) {
//       state.movies.isLoading = status;
//     },
//     SET_CURRENTLY_PLAYING(state, status) {
//       state.movies.currentlyPlaying = {
//         page: status.page,
//         movies: status.movies,
//       };
//     },
//   },
//   actions: {},
//   modules: {},
// });

export type RootState = {
  movies: MovieState;
};

export type Store = MoviesStore<Pick<RootState, 'movies'>>;

const plugins: any[] = [];

const store = createStore({
  plugins,
  modules: {
    movies,
  },
});

export function useStore(): Store {
  return store as Store;
}

export default store;

import { MovieDetails } from '@/@types';
import { MutationTree } from 'vuex';
import * as MovieTypes from './mutation-types';
import {
  State,
  PopularMovieState,
  CurrentlyPlayingState,
  LoadingPayload,
} from './state';

export type Mutations<S = State> = {
  [MovieTypes.SET_MOVIE_LOADING](state: S, payload: LoadingPayload): void;
  [MovieTypes.SET_SELECTED_MOVIE](state: S, payload: MovieDetails): void;
  [MovieTypes.SET_CURRENTLY_PLAYING](
    state: S,
    payload: Partial<CurrentlyPlayingState>,
  ): void;
  [MovieTypes.SET_POPULAR_MOVIES](
    state: S,
    payload: Partial<PopularMovieState>,
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MovieTypes.SET_MOVIE_LOADING](state: State, payload: LoadingPayload) {
    state.isLoading = payload.isLoading;
  },
  [MovieTypes.SET_SELECTED_MOVIE](state: State, payload: MovieDetails) {
    state.selectedMovie = payload;
  },
  [MovieTypes.SET_CURRENTLY_PLAYING](
    state: State,
    payload: CurrentlyPlayingState,
  ) {
    state.currentlyPlaying = {
      ...state.currentlyPlaying,
      page: payload.page,
      movies: [...state.currentlyPlaying.movies, ...payload.movies],
    };
  },
  [MovieTypes.SET_POPULAR_MOVIES](state: State, payload: PopularMovieState) {
    state.popularMovies = {
      ...state.popularMovies,
      page: payload.page,
      movies: [...state.popularMovies.movies, ...payload.movies],
    };
  },
};

import { MovieDetails, MovieItem } from '@/@types';
import { GetterTree } from 'vuex';
import { RootState } from '../index';
import { State } from './state';

export type Getters = {
  getCurrentlyPlayingMovies(state: State): MovieItem[] | null;
  getMovieDetailOrPartial(
    state: State,
  ): (id: number) => Partial<MovieDetails> | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getCurrentlyPlayingMovies: (state) => state.currentlyPlaying.movies,
  getMovieDetailOrPartial: (state) => (id: number) => {
    const isCurrentlyLoaded = state.selectedMovie.id === id;
    if (isCurrentlyLoaded) {
      return state.selectedMovie;
    }
    const details: Partial<MovieDetails> = {};
    const fromPopular = state.popularMovies.movies.find((m) => m.id === id);
    if (fromPopular) {
      return {
        ...details,
        ...fromPopular,
      };
    }

    const fromPlaying = state.currentlyPlaying.movies.find((m) => m.id === id);
    if (fromPlaying) {
      return {
        ...details,
        ...fromPlaying,
      };
    }

    return null;
  },
};

import { MovieItem } from '@/@types';
import { GetterTree } from 'vuex';
import { RootState } from '../index';
import { State } from './state';

export type Getters = {
  getCurrentlyPlayingMovies(state: State): MovieItem[] | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getCurrentlyPlayingMovies: (state) => state.currentlyPlaying.movies,
};

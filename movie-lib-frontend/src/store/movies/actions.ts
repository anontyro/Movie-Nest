import { ActionTree, ActionContext } from 'vuex';

import { State } from './state';
import { RootState } from '../index';
import { Mutations } from './mutations';
import * as MutationTypes from './mutation-types';
import * as ActionTypes from './action-types';
import { MovieDetails, MovieItem } from '@/@types';
import { httpGet } from '@/utils/apiCalls';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.FETCH_CURRENTLY_PLAYING](
    { commit }: AugmentedActionContext,
    page: number,
  ): Promise<boolean>;
  [ActionTypes.FETCH_POPULAR_MOVIES](
    { commit }: AugmentedActionContext,
    page: number,
  ): Promise<boolean>;
  [ActionTypes.FETCH_SELECTED_MOVIE_DETAILS](
    { commit }: AugmentedActionContext,
    movieId: string,
  ): Promise<boolean>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.FETCH_CURRENTLY_PLAYING]({ commit }, page: number = 1) {
    commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: true });
    try {
      const movies = await httpGet<MovieItem[]>(
        `/api/movie/now-playing?page=${page}`,
      );
      console.log('now playing movies fetched', movies);
      commit(MutationTypes.SET_CURRENTLY_PLAYING, {
        page,
        movies,
      });
      return true;
    } finally {
      commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: false });
      return false;
    }
  },
  async [ActionTypes.FETCH_POPULAR_MOVIES]({ commit, dispatch }, page: number) {
    try {
      const movies = await httpGet<MovieItem[]>(
        `/api/movie/popular?page=${page}`,
      );
      console.log('popular movies fetched', movies);
      commit(MutationTypes.SET_POPULAR_MOVIES, {
        page,
        movies,
      });
      return true;
    } finally {
      commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: false });
      return false;
    }
  },
  async [ActionTypes.FETCH_SELECTED_MOVIE_DETAILS](
    { commit },
    movieId: string,
  ) {
    try {
      const movie = await httpGet<MovieDetails>(`/api/movie/${movieId}`);
      console.log('movie detail retuned', movie);
      commit(MutationTypes.SET_SELECTED_MOVIE, movie);
      return true;
    } finally {
      commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: false });
      return false;
    }
  },
};

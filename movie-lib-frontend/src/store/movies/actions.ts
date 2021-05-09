import { ActionTree, ActionContext } from 'vuex';

import { State } from './state';
import { RootState } from '../index';
import { Mutations } from './mutations';
import * as MutationTypes from './mutation-types';
import * as ActionTypes from './action-types';
import { MovieItem } from '@/@types';

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

const httpGet = async <T>(url: string): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const options: RequestInit = {
    headers,
    method: 'GET',
    mode: 'cors',
  };

  const response = await fetch(url, options);
  const output = response.json();

  return output;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.FETCH_CURRENTLY_PLAYING]({ commit }, page: number) {
    commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: true });
    try {
      const movies = await httpGet<MovieItem[]>('/api/movie/now-playing');
      console.log('now playing movies fetched', movies);
      commit(MutationTypes.SET_CURRENTLY_PLAYING, {
        page,
        movies,
      });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      commit(MutationTypes.SET_MOVIE_LOADING, { isLoading: false });
    }
    return true;
  },
  async [ActionTypes.FETCH_POPULAR_MOVIES]({ commit, dispatch }, page: number) {
    return true;
  },
  async [ActionTypes.FETCH_SELECTED_MOVIE_DETAILS](
    { commit },
    movieId: string,
  ) {
    return new Promise(() => {
      return true;
    });
  },
};

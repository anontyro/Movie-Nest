import { MovieDetails, MovieItem } from '@/@types';

interface BaseMovieState {
  page: number;
  movies: MovieItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopularMovieState extends BaseMovieState {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CurrentlyPlayingState extends BaseMovieState {}

export interface LoadingPayload {
  isLoading: boolean;
}

export type State = {
  isLoading: boolean;
  popularMovies: PopularMovieState;
  currentlyPlaying: CurrentlyPlayingState;
  selectedMovie: Partial<MovieDetails>;
};

const state: State = {
  isLoading: false,
  popularMovies: {
    page: 0,
    movies: [],
  },
  currentlyPlaying: {
    page: 0,
    movies: [],
  },
  selectedMovie: {},
};

export default state;

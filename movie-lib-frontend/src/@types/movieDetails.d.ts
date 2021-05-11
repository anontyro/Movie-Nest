export type MovieDetails = {
  id: number;
  details: string;
  releaseDate: string;
  genres: number[];
  title: string;
  originalTitle: string;
  originalLanguage: string;
  backdropPath: string;
  posterPath: string;
  popularity: number;
  averageRating: number;
  numberOfRatings: number;
  budget: number;
  homepage: string;
  imdbId: string | null;
  productionCompanies: unknown[];
  productionCountries: unknown[];
  revenue: number;
  runtime: number | null;
  spokenLanguage: unknown[];
  status: string;
  tagline: string | null;
};

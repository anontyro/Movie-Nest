import { MovieEntity } from '../entities/movie.entity';

export class MovieDto {
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

  public static entityToDto(entity: MovieEntity): MovieDto {
    const output = new MovieDto();
    output.id = entity.id;
    output.averageRating = entity.vote_average;
    output.backdropPath = entity.backdrop_path;
    output.details = entity.overview;
    output.genres = entity.genre_ids;
    output.numberOfRatings = entity.vote_count;
    output.originalLanguage = entity.original_language;
    output.originalTitle = entity.original_title;
    output.popularity = entity.popularity;
    output.posterPath = entity.poster_path;
    output.releaseDate = entity.release_date;
    output.title = entity.title;

    return output;
  }
}

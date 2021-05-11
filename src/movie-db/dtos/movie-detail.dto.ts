import { MovieDetailEntity } from '../entities/movie-detail.entity';
import { MovieDto } from './movie.dto';

export class MovieDetailDto extends MovieDto {
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

  public static detailEntityToDto(entity: MovieDetailEntity): MovieDetailDto {
    const baseMovie = this.entityToDto(entity as any);
    let output = new MovieDetailDto();
    output = {
      ...baseMovie,
      budget: entity.budget,
      homepage: entity.homepage,
      imdbId: entity.imdb_id,
      productionCompanies: entity.production_companies,
      productionCountries: entity.production_countries,
      revenue: entity.revenue,
      runtime: entity.runtime,
      spokenLanguage: entity.spoken_languages,
      status: entity.status,
      tagline: entity.tagline,
    };

    return output;
  }
}

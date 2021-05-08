import { MovieEntity } from './movie.entity';

export class MovieDbEntity {
  page: number;
  results: MovieEntity[];
  total_pages: number;
  total_results: number;
}

import { Injectable } from '@nestjs/common';
import { HttpFetchService } from 'src/http-fetch/http-fetch.service';
import { MovieDetailDto } from './dtos/movie-detail.dto';
import { MovieDto } from './dtos/movie.dto';
import { MovieDbEntity } from './entities/movie-db.entity';
import { MovieDetailEntity } from './entities/movie-detail.entity';
import { MovieEntity } from './entities/movie.entity';
import { NowPlayingEntity } from './entities/now-playing.entity';

const mapMovieEntityDto = (entities: MovieEntity[]): MovieDto[] =>
  entities.map(MovieDto.entityToDto);

const mapMovieDetailEntityDto = (entity: MovieDetailEntity): MovieDetailDto =>
  MovieDetailDto.detailEntityToDto(entity);

@Injectable()
export class MovieDbService {
  constructor(private readonly httpFetch: HttpFetchService) {}
  async getNowPlaying(page = 1): Promise<MovieDto[]> {
    const uri = 'https://api.themoviedb.org/3/movie/now_playing';
    const nowPlaying = await this.httpFetch.getHttp<NowPlayingEntity>(
      uri,
      `page=${page}`,
    );
    const output = mapMovieEntityDto(nowPlaying.results);
    return output;
  }

  async getPopular(page = 1, region = null): Promise<MovieDto[]> {
    const uri = 'https://api.themoviedb.org/3/movie/popular';
    let query = `page=${page}`;
    if (region) {
      query += `&region=${region}`;
    }
    const popular = await this.httpFetch.getHttp<MovieDbEntity>(uri, query);
    const output = mapMovieEntityDto(popular.results);
    const orderedOutput = output.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      }
      if (a.popularity < b.popularity) {
        return 1;
      }
      return 0;
    });

    return orderedOutput;
  }

  async getMovieDetail(id: number): Promise<MovieDetailDto> {
    const uri = `https://api.themoviedb.org/3/movie/${id}`;

    const details = await this.httpFetch.getHttp<MovieDetailEntity>(uri);
    const output = mapMovieDetailEntityDto(details);
    return output;
  }

  async getMovieSearch(searchValue: string, page = 1): Promise<MovieDto[]> {
    const uri = `https://api.themoviedb.org/3/search/movie`;

    const query = `query=${searchValue}&page=${page}`;

    const search = await this.httpFetch.getHttp<MovieDbEntity>(uri, query);
    const output = mapMovieEntityDto(search.results);

    return output;
  }
}

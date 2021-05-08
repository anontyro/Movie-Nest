import { Injectable } from '@nestjs/common';
import { HttpFetchService } from 'src/http-fetch/http-fetch.service';
import { MovieDbEntity } from './entities/movie-db.entity';
import { MovieDetailEntity } from './entities/movie-detail.entity';
import { MovieEntity } from './entities/movie.entity';
import { NowPlayingEntity } from './entities/now-playing.entity';

@Injectable()
export class MovieDbService {
  constructor(private readonly httpFetch: HttpFetchService) {}
  async getNowPlaying(page = 1): Promise<MovieEntity[]> {
    const uri = 'https://api.themoviedb.org/3/movie/now_playing';
    const nowPlaying = await this.httpFetch.getHttp<NowPlayingEntity>(
      uri,
      `page=${page}`,
    );
    return nowPlaying.results;
  }

  async getPopular(page = 1, region = null): Promise<MovieEntity[]> {
    const uri = 'https://api.themoviedb.org/3/movie/popular';
    let query = `page=${page}`;
    if (region) {
      query += `region=${region}`;
    }
    const popular = await this.httpFetch.getHttp<MovieDbEntity>(uri, query);
    return popular.results;
  }

  async getMovieDetail(id: number): Promise<MovieDetailEntity> {
    const uri = `https://api.themoviedb.org/3/movie/${id}`;

    const details = await this.httpFetch.getHttp<MovieDetailEntity>(uri);
    return details;
  }
}

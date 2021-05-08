import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { HttpFetchService } from 'src/http-fetch/http-fetch.service';

interface MovieDbItem {
  dates: any;
  pages: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

// https://api.themoviedb.org/3/movie/now_playing?api_key=XXX&language=en-US&page=1
@Injectable()
export class MovieDbService {
  constructor(private readonly httpFetch: HttpFetchService) {}
  async getNowPlaying(page = 1): Promise<any> {
    const uri = 'https://api.themoviedb.org/3/movie/now_playing';
    const nowPlaying = await this.httpFetch.getHttp<MovieDbItem>(uri);
    return nowPlaying.results;
  }
}

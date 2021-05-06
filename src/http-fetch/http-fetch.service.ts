import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class HttpFetchService {
  async getHttp<Type>(uri: string, query?: string): Promise<Type> {
    const key = process.env.MOVIE_DB_KEY_V3;
    const q = `?api_key=${key}`;
    const resp = await fetch(`${uri}${q}`);
    const data = await resp.json();

    return data;
  }
}

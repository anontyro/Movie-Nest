import { Controller, Get, Query } from '@nestjs/common';
import { MovieDbService } from './movie-db.service';

@Controller('movies')
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}
  // get now playing
  @Get('now-playing')
  getNowPlaying(@Query() page?): Promise<any> {
    return this.movieDbService.getNowPlaying(page);
  }
}

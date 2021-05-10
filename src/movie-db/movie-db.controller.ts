import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { MovieDbService } from './movie-db.service';

@Controller('movie')
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}
  @Get('now-playing')
  getNowPlaying(@Query() page?): Promise<MovieEntity[]> {
    return this.movieDbService.getNowPlaying(page);
  }

  @Get('popular')
  getPopular(@Query() query) {
    const { page, region } = query;
    return this.movieDbService.getPopular(page, region);
  }

  @Get('search')
  getMovieSearch(@Query() query) {
    const { page, q } = query;
    return this.movieDbService.getMovieSearch(q, page);
  }

  @Get(':id')
  getDetails(@Param('id') id: number) {
    return this.movieDbService.getMovieDetail(id);
  }
}

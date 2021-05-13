import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieDetailDto } from './dtos/movie-detail.dto';
import { MovieDto } from './dtos/movie.dto';
import { MovieDbService } from './movie-db.service';

@Controller('movie')
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}
  @Get('now-playing')
  getNowPlaying(@Query() page?): Promise<MovieDto[]> {
    return this.movieDbService.getNowPlaying(page);
  }

  @Get('popular')
  getPopular(@Query() query): Promise<MovieDto[]> {
    const { page = 1, region } = query;
    return this.movieDbService.getPopular(page, region);
  }

  @Get('search')
  getMovieSearch(@Query() query): Promise<MovieDto[]> {
    const { page, q } = query;
    return this.movieDbService.getMovieSearch(q, page);
  }

  @Get(':id')
  getDetails(@Param('id') id: number): Promise<MovieDetailDto> {
    return this.movieDbService.getMovieDetail(id);
  }
}

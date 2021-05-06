import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieDbController } from './movie-db/movie-db.controller';
import { MovieDbService } from './movie-db/movie-db.service';
import { HttpFetchService } from './http-fetch/http-fetch.service';

@Module({
  imports: [],
  controllers: [AppController, MovieDbController],
  providers: [AppService, MovieDbService, HttpFetchService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieDbController } from './movie-db/movie-db.controller';
import { MovieDbService } from './movie-db/movie-db.service';
import { HttpFetchService } from './http-fetch/http-fetch.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'dist'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, MovieDbController],
  providers: [AppService, MovieDbService, HttpFetchService],
})
export class AppModule {}

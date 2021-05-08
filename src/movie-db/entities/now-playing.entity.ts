import { MovieDbEntity } from './movie-db.entity';

export class NowPlayingEntity extends MovieDbEntity {
  dates: {
    maximum: string;
    minimum: string;
  };
}

import { Artist } from './artist';
import { MovieInfo } from './movie-info';

export interface MovieSoundtrack{
  movie_info: MovieInfo;
  spotify_id: string;
  img_url: string;
  name: string;
  composors: Artist[];
}

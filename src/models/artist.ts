import { MovieSoundtrack } from './movie-soundtrack';

export interface Artist{
  spotify_id: string;
  img_url: string;
  name: string;
  movieSoundtracks?: any; //ids  // Optional!
}

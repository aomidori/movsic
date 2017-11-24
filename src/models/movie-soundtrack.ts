import { Artist } from './artist';

export interface MovieSoundtrack{
  spotify_id: string;
  img_url: string;
  name: string;
  composors: Artist[];
}

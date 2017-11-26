import { MovieSoundtrack } from './movie-soundtrack';
import { Artist } from './artist';

export interface User{
    uid: string;
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
    savedMovies: MovieSoundtrack[];
    savedArtists: Artist[];
}

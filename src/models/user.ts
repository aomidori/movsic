import { Artist } from './artist';
import { MovieInfo } from './movie-info';


export interface User{
    email: string;
    password: string;
    username: string;

    followed: User[]
    following: User[]
    collected_Artists: Artist[]
    collected_Movies: MovieInfo[]
    // collected_Musics: Music[]

}

import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { Artist } from '../../models/artist';
import { rec_movies } from '../../temporary/rec-movies';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'soundtrack-recommend',
  templateUrl: 'soundtrack-recommend.html'
})
export class SoundtrackRecommendComponent {
  recSoundtracks: MovieSoundtrack[];

  constructor(
    public nav: NavController,
    public params: NavParams,
    private _spotifyService: SpotifyServiceProvider,
    private _dbService: FirebaseProvider
  ) {
    this.recSoundtracks = [];
  }
  ngOnInit(){
    this._spotifyService.getToken().subscribe(res=>{
      for (let id of rec_movies){
        this._spotifyService.getAlbum(id, res.access_token).subscribe(item=>{
          let movie: MovieSoundtrack = {
            movie_info: {},
            spotify_id: item.id,
            img_url:item.images[1].url,
            name: item.name,
            composors: []
          }
          for (let a of item.artists){
            let artist: Artist = {
              spotify_id: a.id,
              img_url: '',
              name:a.name
            }
            movie.composors.push(artist);
          }
          this.registerNewMovie(item.id, movie);
          this.recSoundtracks.push(movie);

        });
      }
    });
    console.log(this.recSoundtracks);
  }


  registerNewMovie(id: string, data: MovieSoundtrack){
    if(!this._dbService.ifMovieSoundtrackExist(id)){
      this._dbService.registerMovieSoundtrack(id, data);
    }
  }





}

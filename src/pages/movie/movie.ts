import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OmdbServiceProvider } from '../../providers/omdb-service/omdb-service';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { ArtistPage } from '../artist/artist';
import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { MovieInfo } from '../../models/movie-info';

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {
  movieOST={} as MovieSoundtrack;
  movieInfo={} as MovieInfo;

  //name: string;
  //year: number;
  searchRes: string;
  tracks: string;
  composors: string;

  constructor(
    public nav: NavController,
    private _spotifyService:SpotifyServiceProvider,
    private _omdbService: OmdbServiceProvider,
    private iab: InAppBrowser) {

  }


  ionViewDidLoad(){
    this._spotifyService.getToken()
      .subscribe(res => {
            this._spotifyService.getAlbumTracks('5lyNebNgp8ZEhDwC2qOIWr' , res.access_token)
              .subscribe(res=> {
                      this.tracks = res.items;
                      //console.log(this.tracks);
            });

    });
    this._omdbService.searchMovie("The Revenant")
      .subscribe(res=>{
        console.log(res);
        if(!res.Response) return;
        let firstRes = res.Search[0];
        //console.log(firstRes);
        this.movieInfo = {
          imdb_id: firstRes.imdbID,
          movie_title: firstRes.Title,
          poster_url: firstRes.Poster,
          year: firstRes.Year,
          plot: ''
        };
        //plot is only accessible with id.
        this._omdbService.getMovie(firstRes.imdbID)
          .subscribe(res=>{
            this.movieInfo.plot=res.Plot;
        });
        console.log(this.movieInfo);

      })

  }

  playsong(url:string){
    let browser = this.iab.create(url, '_blank');
  }
  public openSakamoto(){
    this.nav.push(ArtistPage);
  }

}

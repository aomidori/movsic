import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';

/**
 * 
 */

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {

  name: string;
  year: number;
  soundtrack: Album[];
  searchRes:string;


  constructor(private _spotifyService:SpotifyServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  soundtrackDisplay(){

    this._spotifyService.getToken().subscribe(res => {
            this._spotifyService.getAlbumTracks('5lyNebNgp8ZEhDwC2qOIWr' , res.access_token).subscribe(res=> {
                       this.searchRes = res.tracks;
            })
    })
    console.log(this.searchRes);

  }





}

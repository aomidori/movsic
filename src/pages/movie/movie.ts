import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { ArtistPage } from '../artist/artist';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
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
  searchRes: string;
  tracks: string;
  composors: string;

  constructor(
    public nav: NavController,
    private _spotifyService:SpotifyServiceProvider,
    private iab: InAppBrowser) {

  }


  ionViewDidLoad(){
    this._spotifyService.getToken()
      .subscribe(res => {
            this._spotifyService.getAlbumTracks('5lyNebNgp8ZEhDwC2qOIWr' , res.access_token)
              .subscribe(res=> {
                      this.tracks = res.items;
                      console.log(this.tracks);
            });

    });

  }

  playsong(url:string){
    let browser = this.iab.create(url, '_blank');
  }
  public openSakamoto(){
    this.nav.push(ArtistPage);
  }

}

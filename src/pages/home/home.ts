import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SpotifyServiceProvider]
})
export class HomePage {
  searchStr: string;
  token: string;
  constructor(public navCtrl: NavController, public http:Http, private _spotifyService:SpotifyServiceProvider) {

  }
  searchMusic(){
    console.log(this.searchStr);
    this.token = this._spotifyService.getToken();
    console.log(this.token);
    console.log(this.searchStr);
    this._spotifyService.searchMusic(this.searchStr,this.token)
            .subscribe(res => {
                this.searchRes = res.artists.items;
    })
  }

}

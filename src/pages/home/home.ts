import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SpotifyServiceProvider]
})
export class HomePage {
  searchStr: string;
  token: string;
  searchRes: string;
  constructor(public navCtrl: NavController, public http:Http, private _spotifyService:SpotifyServiceProvider) {

  }
  searchMusic(){
    this._spotifyService.getToken()
         .subscribe(res => {
             this._spotifyService.searchMusic(this.searchStr ,'album' , res.access_token)
               .subscribe(res=> {
                 this.searchRes = res.albums.items;
            })
         })
         console.log(this.searchRes);
  }

}

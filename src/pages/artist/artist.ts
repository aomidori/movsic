import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  albumIds: any;
  albumImgUrls: any;

  constructor(private _spotifyService: SpotifyServiceProvider, public http:Http, public nav: NavController) {
    this.albumIds = [];
    this.albumImgUrls = [];
  }

  ionViewDidLoad() {
    this._spotifyService.getToken()
      .subscribe(res => {
            //get Sakamoto ryuichi's info
          this._spotifyService.getArtistAlbums('1tcgfoMTT1szjUeaikxRjA' , res.access_token)
              .subscribe(res=> {
                   for (let album of res.items){
                      this.albumIds.push(album.id);
                      let images = album.images;
                      this.albumImgUrls.push(images[0].url);
                    }

          });
          console.log(this.albumIds);
          console.log(this.albumImgUrls);

    });  //---end of this._spotifyService.getToken().subscribe


  }


}

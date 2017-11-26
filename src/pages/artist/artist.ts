import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Artist } from '../../models/artist';


@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  artistId: string;
  artistData: Observable<Artist>;
  albumIds: any;
  albumImgUrls: any;

  constructor(
    private _spotifyService: SpotifyServiceProvider,
    private _dbService: FirebaseProvider,
    public nav: NavController, public navParams: NavParams
    ) {
    this.albumIds = [];
    this.albumImgUrls = [];
    this.artistId = navParams.get('artistId');
    this._dbService.init();
  }

  ngOnInit(){
    this.artistData = this._dbService.getArtist(this.artistId);
  }

  ionViewDidLoad() {
    this.getArtistData();
    this._spotifyService.getToken()
      .subscribe(res => {
          console.log("this artist: "+this.artistId);
            //'1tcgfoMTT1szjUeaikxRjA'
          this._spotifyService.getArtistAlbums(this.artistId, res.access_token)
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

  getArtistData(){
    if(this._dbService.ifArtistExist(this.artistId)){
      this.artistData = this._dbService.getArtist(this.artistId);
    }else{
      let composor={} as Artist;
      this._spotifyService.getToken().subscribe(res=>{
        this._spotifyService.getArtist(this.artistId,res.access_token)
            .subscribe(artist =>{
              composor.spotify_id = artist.id;
              let imgs = artist.images;
              if(imgs[0]) composor.img_url = imgs[0].url;
              composor.name = artist.name;
            })
      })
      this._dbService.registerArtist(this.artistId, composor);
      this.artistData = composor;
    }
  }


}

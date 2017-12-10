import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviePage } from '../movie/movie';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
@IonicPage()
@Component({
  selector: 'page-recognition',
  templateUrl: 'recognition.html',
})
export class RecognitionPage {
  actionText: string;
  recognizing: boolean;
  ifResult: boolean;

  constructor(public nav: NavController, public navParams: NavParams,
    private _spotifyService: SpotifyServiceProvider
  ) {
    this.actionText = "Tap to start";
    this.recognizing = false;
    this.ifResult = false;
  }

  ionViewDidLoad() {

  }
  startRecg(){
    var that = this;
    this.actionText = "Tap to stop";
    this.recognizing = true;
    setTimeout(function(){
      //this.ifResult = true;
      that.showResult();
    }, 4000);
  }
  stopRecg(){
    this.actionText = "Tap to start";
    this.recognizing = false;
  }
  showResult(){
    this.ifResult = true;
  }

  goToMovie(){
    var ost = {
      spotify_id:  '5lyNebNgp8ZEhDwC2qOIWr',
      img_url:  'https://i.scdn.co/image/018f50eeef1f388a2701a3dc36c0f22bfab670d5',
      name: 'The Revenant (Original Motion Picture Soundtrack)',
      composors: []
    }
    this._spotifyService.getToken().subscribe(res=>{
      this._spotifyService.getAlbum(ost.spotify_id, res.access_token).subscribe(album=>{
        for (let artist of album.artists){
          ost.composors.push({
            spotify_id: artist.id,
            name: artist.name,
            img_url: ''
          });
        } //img urls will be filled in movie page.
        this.nav.push(MoviePage, {soundtrack: ost, artistId: '1tcgfoMTT1szjUeaikxRjA'});
      })
    })
  }



}

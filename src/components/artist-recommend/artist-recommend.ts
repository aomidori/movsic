import { Component, OnInit } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { ArtistPage } from '../../pages/artist/artist';
import { Artist } from '../../models/artist';
import { rec_composors } from '../../temporary/rec-composors';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'artist-recommend',
  templateUrl: 'artist-recommend.html'
})
export class ArtistRecommendComponent {

  artistPage = ArtistPage;
  recArtists: Artist[];

  constructor(
    public nav: NavController,
    private _spotifyService: SpotifyServiceProvider,
    private _dbService: FirebaseProvider
  ) {
    this.recArtists = [];
  }
  ngOnInit(){
    this._spotifyService.getToken().subscribe(res=>{
      for (let id of rec_composors){
        this._spotifyService.getArtist(id, res.access_token).subscribe(item => {
          let artist: Artist={
            spotify_id: item.id,
            img_url:item.images[0].url,
            name: item.name
          };
          this.registerNewArtist(item.id,artist);
          this.recArtists.push(artist);
        });
      }
    });
  }

  registerNewArtist(id:string, data:Artist){
    if(!this._dbService.ifArtistExist(id)){
      this._dbService.registerArtist(id,data);
    }
  }
  public goToArtist(id: string){
    this.nav.push(ArtistPage, {artistId: id});
  }

}

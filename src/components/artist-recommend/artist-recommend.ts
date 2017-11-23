import { Component, OnInit } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { ArtistPage } from '../../pages/artist/artist';
import { Artist } from '../../models/artist';
import { rec_composors } from '../../temporary/rec-composors';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';


@Component({
  selector: 'artist-recommend',
  templateUrl: 'artist-recommend.html'
})
export class ArtistRecommendComponent {

  artistPage = ArtistPage;
  recArtists: Artist[];

  constructor(
    public nav: NavController,
    private _spotifyService: SpotifyServiceProvider
  ) {
    this.recArtists = [];
  }
  ngOnInit(){
    this._spotifyService.getToken().subscribe(res=>{
      for (let id of rec_composors){
        this._spotifyService.getArtist(id, res.access_token).subscribe(item => {
          let artist: Artist={
            spotify_id: item.id,
            img_url:item.images[1].url,
            name: item.name
          };
          this.recArtists.push(artist);
        });
      }
    });
  }
  public goToArtist(){
    this.nav.push(ArtistPage);
  }

}

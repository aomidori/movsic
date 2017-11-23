import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { Album } from '../../models/album';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [SpotifyServiceProvider]
})
export class SearchComponent {

  query: string;
  token: string;
  searchRes: string;
  dropdownDisplay: boolean;
  albums: Album[];

  constructor(
    public nav: NavController,
    private _spotifyService: SpotifyServiceProvider
  ) {
    this.dropdownDisplay = false;
    this.albums = [];
  }

  searchMusic(){
    this.albums = [];
    const trimmed_query = this.query.trim();
    if(!trimmed_query || trimmed_query.length ==0 ){
      this.dropdownDisplay=false;
      return;
    }
    this._spotifyService.getToken()
         .subscribe(res => {
             this._spotifyService.searchMusic(trimmed_query,'album' , res.access_token)
               .subscribe(res=> {
                 this.searchRes = res.albums.items;
                 for (let item of res.albums.items){
                  let images = item.images;
                  let album: Album={
                    spotify_id: item.id,
                    img_url: images[2].url,
                    name: item.name
                  };
                  this.albums.push(album);
                }
            })
         })
    if (this.searchRes){
      this.dropdownDisplay = true;
    }
    else{
      this.dropdownDisplay=false;
    }
    console.log(this.albums);
    //this.searchResult.type =


  }

}

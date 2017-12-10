import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { MovieSoundtrack } from '../../models/movie-soundtrack';

import { ArtistPage } from '../../pages/artist/artist';
import { MoviePage } from '../../pages/movie/movie';
import { RecognitionPage } from '../../pages/recognition/recognition';
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
  albums: MovieSoundtrack[];

  constructor(
    public nav: NavController,
    public params: NavParams,
    private _spotifyService: SpotifyServiceProvider
  ) {
    this.dropdownDisplay = false;
    this.albums = [];

  }
  searchMusic(){
    this.dropdownDisplay = false;
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
                 this.albums = [];
                 this.searchRes = res.albums.items;
                 for (let item of res.albums.items){
                   if(this.ifSoundtrack(item.name)){
                     let images = item.images;
                     let album: MovieSoundtrack={
                       movie_info: {},
                       spotify_id: item.id,
                       img_url: images[2].url,
                       name: item.name,
                       composors: []
                     };
                     this.albums.push(album);
                   }
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
  }

  checkFocus(){
    this.dropdownDisplay = true;
  }
  checkBlur(){
     //this.dropdownDisplay = false;
  }


  ifSoundtrack(name: string){
    name = name.toLowerCase();
    if(name.indexOf("soundtrack")>=0||name.indexOf("o.s.t")>=0) {
      return true;
    }
    else return false;
  }



  public goToArtist(id: string){
    this.nav.push(ArtistPage, {artistId: id});
  }

  public goToSoundtrack(ost: MovieSoundtrack){
      //now the ost has empty composers[]
      this._spotifyService.getToken().subscribe(res=>{
        this._spotifyService.getAlbum(ost.spotify_id, res.access_token).subscribe(data=>{
           for (let composer of data.artists){
             ost.composors.push({
               img_url: '',
               name: composer.name,
               spotify_id: composer.id
             })
           }
           if (ost.spotify_id == '5lyNebNgp8ZEhDwC2qOIWr'){
             this.nav.push(MoviePage, {soundtrack: ost});
           }else{
             this.nav.push(MoviePage, {soundtrack: ost});
           }
        })
      })

  }
  goToRecognition(){
      this.nav.push(RecognitionPage);
  }


}

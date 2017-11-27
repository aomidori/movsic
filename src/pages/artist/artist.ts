import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MoviePage } from '../movie/movie';

import { Artist } from '../../models/artist';
import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { Album } from '../../models/album';

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  artistId: string;
  artistData: Observable<Artist>;
  albums: Album[];

  constructor(
    private _spotifyService: SpotifyServiceProvider,
    private _dbService: FirebaseProvider,
    public nav: NavController, public navParams: NavParams,
    public iab: InAppBrowser
    ) {
      this.albums = [];
      this.artistId = navParams.get('artistId');
      this._dbService.init();
  }

  ngOnInit(){
    if(!this._dbService.ifArtistExist(this.artistId)){
      console.log("new artist!");
      this._dbService.AutoRegisterArtist(this.artistId);
    }
    //this.getArtistData();
    this.artistData = this._dbService.getArtist(this.artistId);
  }

  ionViewDidLoad() {
    this._spotifyService.getToken()
      .subscribe(res => {
          console.log("this artist: "+this.artistId);
            //'1tcgfoMTT1szjUeaikxRjA'
          this._spotifyService.getArtistAlbums(this.artistId, res.access_token)
              .subscribe(res=> {
                   for (let item of res.items){
                     if(this.ifSoundtrack(item.name)){
                       let album: Album = {
                         id: item.id,
                         img_url: item.images[0].url,
                         name: item.name,
                         external_url: item.external_urls.spotify
                       }
                       console.log(this.extractMovieName(item.name));
                       this.albums.push(album);
                     }

                    }

          });


    });  //---end of this._spotifyService.getToken().subscribe

  }

  openOnSpotify(url: string){
    let browser = this.iab.create(url,'_blank');
  }
  goToMovie(album: Album){
    //console.log("clicked album"+ JSON.stringify(album));
    var ost: MovieSoundtrack = {
      spotify_id:  album.id,
      img_url:  album.img_url,
      name: album.name,
      composors: []
    };
    //console.log("this ost:" + ost);
    this._spotifyService.getToken().subscribe(res=>{
      this._spotifyService.getAlbum(album.id, res.access_token).subscribe(album=>{
        for (let artist of album.artists){
          ost.composors.push({
            spotify_id: artist.id,
            name: artist.name,
            img_url: ''
          });
        } //img urls will be filled in movie page.
        this.nav.push(MoviePage, {soundtrack: ost});
      })
    })

  }

  ifSoundtrack(name: string){
    name = name.toLowerCase();
    if(name.indexOf("soundtrack")>=0||name.indexOf("o.s.t")>=0) {
      return true;
    }
    else return false;
  }

  //Also one in the omdb Service provider!
  //If you'd like to update, update both;
  extractMovieName(name: string){
    name = name.toLowerCase();
    if(name.indexOf('(')>0) name = name.substr(0,name.indexOf('('));
    if(name.indexOf('/')>0) name = name.substr(0,name.indexOf('/'));
    if(name.indexOf('-')>0) name = name.substr(0,name.indexOf('-'));

    name = name.replace('original motion picture soundtracks', '');
    name = name.replace('original soundtracks', '');
    name = name.replace('original motion picture soundtrack', '');
    name = name.replace('original soundtrack', '');
    name = name.replace('original film soundtrack', '');
    name = name.replace('o.s.t','');
    name = name.replace('/', '');
    name = name.replace('-', '');
    name = name.replace('(', '');
    name = name.replace(')','');
    name = name.trim();
    return name;
  }




}

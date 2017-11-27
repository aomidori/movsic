import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OmdbServiceProvider } from '../../providers/omdb-service/omdb-service';
import { SpotifyServiceProvider } from '../../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ArtistPage } from '../artist/artist';
import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { MovieInfo } from '../../models/movie-info';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {
  movieOST={} as MovieSoundtrack;
  movieInfo={} as MovieInfo;
  soundtrackId: string;  //!!!! Spotify album ID;
  soundtrackName: string;
  soundtrackData: Observable<MovieSoundtrack>;

  //name: string;
  //year: number;
  searchRes: string;
  tracks: any;
  defaultComposorId: string;
  ifVariousArtists: boolean;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private _spotifyService:SpotifyServiceProvider,
    private _omdbService: OmdbServiceProvider,
    private _dbService: FirebaseProvider,
    private iab: InAppBrowser) {
        this.movieOST = navParams.get('soundtrack');
        this.defaultComposorId = navParams.get('artistId');
        console.log(this.movieOST);
        this.soundtrackId = this.movieOST.spotify_id;
        this.soundtrackName = this.movieOST.name;
        if(this.movieOST.composors[0].name.trim()=="Various Artists"){
          this.ifVariousArtists = true;
        }
        this.movieInfo={
          imdb_id: '',
          movie_title: _omdbService.extractMovieName(this.soundtrackName),
          poster_url: this.movieOST.img_url,
          year: 0,
          plot: ''
        } //Default if no result;
  }

  ngOnInit(){
    if(!this._dbService.ifMovieSoundtrackExist(this.soundtrackId)){
      console.log("new soundtrack!");
      this._dbService.registerMovieSoundtrack(this.soundtrackId, this.movieOST);
    }
    this.soundtrackData = this._dbService.getMovieSoundtrack(this.soundtrackId);
  }


  ionViewDidLoad(){
    this._spotifyService.getToken()
      .subscribe(res => {
          //get tracks
            this._spotifyService.getAlbumTracks(this.soundtrackId , res.access_token)
              .subscribe(res=> {
                    this.tracks = res.items;
            });
          //get composor composorAvatars
          if(!this.ifVariousArtists){
            let i=0;
            for (const artist of this.movieOST.composors){
              this._spotifyService.getArtist(artist.spotify_id, res.access_token,)
                .subscribe(res=>{
                  if(res.images && res.images[0])  artist.img_url = res.images[0].url;
                })
              i++;
            }
          }else{
            this.variousArtistsHandler();
          }
    });
    let title = this._omdbService.extractMovieName(this.soundtrackName);
    //console.log("search title: "+ title);
    this._omdbService.searchMovie(title)
      .subscribe(res=>{
        if(!res.Response) return; //if not getting response
        else{
          if(res.Search){ //If search result not empty
                let firstRes = res.Search[0];
                this.movieInfo = {
                  imdb_id: firstRes.imdbID,
                  movie_title: firstRes.Title,
                  poster_url: firstRes.Poster,
                  year: firstRes.Year,
                  plot: ''
                };
                //plot is only accessible with id.
                this._omdbService.getMovie(firstRes.imdbID)
                  .subscribe(res=>{
                    this.movieInfo.plot=res.Plot;
                });
          }
        }

      })

  }

  variousArtistsHandler(){
    const composors = this.movieOST.composors;
    this._spotifyService.getToken().subscribe(res=>{
        let defaultComposorId = '';
        if(this.defaultComposorId) defaultComposorId = this.defaultComposorId;
        else defaultComposorId = this.tracks[0].artists[0].id;
        this._spotifyService.getArtist(defaultComposorId, res.access_token).subscribe(artist=>{
          let url = '';
          console.log("try to get"+ artist.name);
          if(artist.images) url = artist.images[0].url;
          composors.push({
            spotify_id: artist.id,
            img_url: url,
            name: artist.name
          });
          composors.shift();
        })
    })
    this.ifVariousArtists = false;
  }


  registerNewMovieInfo(id:string, data: MovieInfo){
    if(!this._dbService.ifMovieInfoExist(id)){
      this._dbService.registerMovieInfo(id,data);
    }
  }

  playsong(url:string){
    let browser = this.iab.create(url, '_blank');
  }

  public goToArtist(id: string){
    this.nav.push(ArtistPage, {artistId: id});
  }

  ngOnDestroy(){
    this._dbService.updateMovieSoundtrack(this.soundtrackId, this.movieOST);
  }


}

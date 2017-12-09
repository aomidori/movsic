import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import {OmdbServiceProvider} from '../omdb-service/omdb-service';
import {SpotifyServiceProvider} from '../spotify-service/spotify-service';

import { User } from '../../models/user';
import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { MovieInfo } from '../../models/movie-info';
import { Artist } from '../../models/artist';

@Injectable()
export class FirebaseProvider {
  private currentUserId: string;
  private currentUserData: Observable<User>;
  private artistData: Observable<Artist>;
  private soundtrackData: Observable<MovieSoundtrack>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private _spotifyService: SpotifyServiceProvider,
    private _omdbService: OmdbServiceProvider
  ) {
    this.init();
  }

  async init(){
    let result = await this.afAuth.authState.take(1).subscribe(auth => {
      let userId=auth.uid;
      this.currentUserId = userId;
    });
    if(this.currentUserId){
      this.currentUserData = this.afDatabase.object(`user/${this.currentUserId}`).valueChanges();
    }
  }

  getCurrentUserId(){
    return this.currentUserId;
  }
  getCurrentUserData(){
    return this.currentUserData;
  }
  getUserData(userId: string){
    return this.afDatabase.object(`user/${userId}`).valueChanges()
  }

  getFollowers(userId: string){
    return this.afDatabase.object(`followers/${userId}`).valueChanges()
  }
  getFollowing(followerId: string, followedId: string){
    return this.afDatabase.object(`following/${followerId}/${followedId}`).valueChanges()
  }
  follow(followerId: string, followedId: string){
    this.afDatabase.object(`followers/${followedId}`).update({[followerId]: true});
    this.afDatabase.object(`following/${followerId}`).update({[followedId]: true});
  }
  unfollow(followerId: string, followedId: string){
    this.afDatabase.object(`followers/${followedId}/${followerId}`).remove();
    this.afDatabase.object(`following/${followerId}/${followedId}`).remove();
  }


  /*
   *    user, movies, artists
   */

  getSavedMovies(userId: string){
    return this.afDatabase.object(`user/${userId}/savedMovies`).valueChanges();
  }
  getSavedArtists(userId: string){
    return this.afDatabase.object(`user/${userId}/savedArtists`).valueChanges();
  }
  saveMovie(userId:string, spotifyId:string){
    this.afDatabase.object(`user/${userId}/savedMovies`).update({[spotifyId]:true});
    //this.afDatabase.object(`movie/${imdbId}/fans`).update({[userId]: true});
  }
  unsaveMovie(userId:string, spotifyId:string){
    this.afDatabase.object(`user/${userId}/savedMovies/${spotifyId}`).remove();
  }
  saveArtist(userId: string, artistId: string){
    this.afDatabase.object(`user/${userId}/savedArtists`).update({[artistId]:true});
    //this.afDatabase.object(`movie/${artistId}/fans`).update({[userId]: true});
  }
  unsaveArtist(userId: string, artistId: string){
    this.afDatabase.object(`user/${userId}/savedArtists/${artistId}`).remove();
  }

  async ifSavedMovie(spotifyId:string){
    let userId = this.getCurrentUserId();
    let result = false;
    let res = await firebase.database().ref(`/user/${userId}/savedMovies/${spotifyId}`).once(`value`).then(snapshot =>{
      if(!snapshot.val() || snapshot.val()===null){
        result = false;
      }else result = true;
    })
    return result;
  }
  async ifSavedArtist(spotifyId: string){
    let userId = this.getCurrentUserId();
    let result = false;
    let res = await firebase.database().ref(`/user/${userId}/savedArtists/${spotifyId}`).once(`value`).then(snapshot =>{
      if(!snapshot.val() || snapshot.val()===null){
        result = false;
      }else {
        result = true;
      }
    })
    return result;
  }

  /*
   *    movies, artists
   */

  ifMovieSoundtrackExist(albumId: string){
    let result = false;
    firebase.database().ref(`/movieSoundtrack/`+albumId).once('value').then(snapshot =>{
      if(!snapshot.val() || snapshot.val()===null){
        result = false;
      }
      else result = true;
    })
    return result;
  }
  ifMovieInfoExist(albumId: string){
    let result = false;
    firebase.database().ref(`/movieSoundtrack/`+albumId+'/movieInfo').once('value').then(snapshot =>{
      if(!snapshot.val()){
        result =false;
      }else result =true;
    })
    return result;
  }
  ifArtistExist(artistId: string){ //artist spotify id
    let result = false;
    firebase.database().ref('/artist/'+artistId).once('value').then(snapshot =>{
      if(!snapshot.val()){
        result = false;
      }else{
        result = true;
      }
    });
    return result;
  }
  ifArtistHasSoundtrack(artistId: string, ostId: string){
    let result = false;
    firebase.database().ref('/artist/'+artistId+'/movieSoundtracks/'+ostId).once('value').then(snapshot =>{
      if(!snapshot.val()){
        result = false;
      }else{
        console.log("from firabse ts: artist has this album");
        result = true;
      }
    });
    return result;
  }
  registerMovieSoundtrack(albumId: string, ost: MovieSoundtrack){
    this.afDatabase.object(`movieSoundtrack/${albumId}`).set(ost);
  }
  updateMovieSoundtrack(albumId: string, ost: MovieSoundtrack){
    this.afDatabase.object(`movieSoundtrack/${albumId}`).update(ost);
  }
  registerMovieInfo(id:string, info: MovieInfo){
    this.afDatabase.object(`movieSoundtrack/${id}/movieInfo`).set(info);
  }

  registerArtist(artistId: string, artistInfo: Artist){
    console.log("register artist: "+ artistInfo);
    this.afDatabase.object(`artist/${artistId}`).set(artistInfo);
  }
  getMovieSoundtrack(albumId: string){
    this.soundtrackData = this.afDatabase.object(`movieSoundtrack/${albumId}`).valueChanges();
    return this.soundtrackData;
  }
  getArtist(artistId: string){
    this.artistData = this.afDatabase.object(`artist/${artistId}`).valueChanges();
    return this.artistData;
  }


  /*
  *  Our AI cross search functions
  */
  AutoRegisterArtist(artistId: string){
    this._spotifyService.getToken().subscribe(res=>{
      this._spotifyService.getArtist(artistId, res.access_token).subscribe(result =>{
        let artist: Artist = {
          spotify_id: result.id,
          img_url: result.images[0].url,
          name: result.name
        }
        this.afDatabase.object(`artist/${artistId}`).set(artist);
      })
    })
  }
  AutoRegisterMovie(title: string){
    //with title search from omdb automaticlly.
    this._omdbService.searchMovie(title).subscribe(res=>{
      if(!res.Response) return;
      let firstRes = res.Search[0];
      let movieInfo: MovieInfo={
        imdb_id: firstRes.imdbID,
        movie_title: firstRes.Title,
        poster_url: firstRes.Poster,
        year: firstRes.Year,
        plot: ''
      };
      this._omdbService.getMovie(firstRes.imdbID).subscribe(res=>{
        movieInfo.plot = res.Plot;
      });
      this.registerMovieInfo(firstRes.imdbID, movieInfo);
    })
  }


}

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

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private _spotifyService: SpotifyServiceProvider
  ) {
  }

  async init(){
    let result = await this.afAuth.authState.take(1).subscribe(auth => {
      let userId=auth.uid;
      this.currentUserId = userId;
    });
    if(this.currentUserId){
      this.currentUserData = this.afDatabase.object(`user/${this.currentUserId}`).valueChanges();
      console.log(this.currentUserData);
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
    return this.afDatabase.object(`user/${userId}/savedMovies`).valueChanges()
  }
  getSavedArtists(userId: string){
    return this.afDatabase.object(`user/${userId}/savedArtists`).valueChanges();
  }
  saveMovie(userId:string, spotifyId:string){
    this.afDatabase.object(`user/${userId}/savedMovies`).update({spotifyId:true});
    //this.afDatabase.object(`movie/${imdbId}/fans`).update({[userId]: true});
  }
  unsaveMovie(userId:string, spotifyId:string){
    this.afDatabase.object(`user/${userId}/savedMovies/${spotifyId}`).remove();
  }
  saveArtist(userId: string, artistId: string){
    this.afDatabase.object(`user/${userId}/savedArtists`).update({artistId:true});
    //this.afDatabase.object(`movie/${artistId}/fans`).update({[userId]: true});
  }
  unsaveArtist(userId: string, artistId: string){
    this.afDatabase.object(`user/${userId}/savedArtists/${artistId}`).remove();
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
    firebase.database()/ref(`/movieSoundtrack/`+albumId+'/movieInfo').once('value').then(snapshot =>{
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
  registerMovieSoundtrack(albumId: string, ost: MovieSoundtrack){
    this.afDatabase.object(`movieSoundtrack/${albumId}`).set(ost);
  }
  registerMovieInfo(id:string, info: MovieInfo){
    this.afDatabase.object(`movieSoundtrack/${id}/movieInfo`).set(info);
  }

  registerArtist(artistId: string, artistInfo: Artist){
    this.afDatabase.object(`artist/${artistId}`).set(artistInfo);
  }
  getMovieSoundtrack(albumId: string){
    return this.afDatabase.object(`movieSoundtrack/${albumId}`).valueChanges();
  }
  getArtist(artistId: string){
    return this.afDatabase.object(`artist/${artistId}`).valueChanges();
  }
  


}

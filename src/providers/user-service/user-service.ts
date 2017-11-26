import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';


@Injectable()
export class UserServiceProvider {
  private currentUserId: string;
  private currentUserData: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      //this.currentUserData = this.afDatabase.object(`user/${this.currentUserId}`).valueChanges();
      //console.log("data from firebase:" + this.currentUserData);
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
    console.log("whoami:"+this.currentUserId);
    return this.currentUserId;
  }
  getCurrentUserData(){
    //console.log("userdata: " +JSON.stringify(this.currentUserData));
    return this.currentUserData;
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

}

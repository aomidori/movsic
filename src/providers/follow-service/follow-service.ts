import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

/*
  Generated class for the FollowServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowServiceProvider {

  constructor(private db:AngularFireDatabase){  }
  // constructor(public http: HttpClient) {
  //   console.log('Hello FollowServiceProvider Provider');
  // }

  getFollowers(userId:string){
    return this.db.object(`followers/${userId}`)
  }

  getFollowing(followerId:string, followedId:string){
    return this.db.object(`following/${followerId}/${followedId}`)
  }

  follow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}`).update({ [followerId]: true } )
    this.db.object(`following/${followerId}`).update({ [followedId]: true } )
  }
  unfollow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}/${followerId}`).remove()
    this.db.object(`following/${followerId}/${followedId}`).remove()
  }
}

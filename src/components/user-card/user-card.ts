import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { size } from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent {

  currentUserId: string;
  userId: string;
  userData: Observable<User>;
  profile_url: string; //img_url
  //userData: Observable<User>;
  //userData: User;

  followerCount: number;
  followingCount: number;
  isFollowing: boolean;

  followers: any;
  following:any;

  constructor(
    private afAuth: AngularFireAuth,
    public nav: NavController,
    public params: NavParams,
    private dbService: FirebaseProvider)
  {
      this.dbService.init();
      this.afAuth.authState.take(1).subscribe(auth=>{
        this.profile_url = auth.photoURL;
      })
  }

  ngOnInit(){
    this.currentUserId = this.dbService.getCurrentUserId();
    this.userData = this.dbService.getCurrentUserData();
  }

  /*ngOnInit(){
    this.following = this.userService.getFollowing(this.currentUserId, this.userId)
        .subscribe(following => {
          this.isFollowing = following.value;
        })
    this.followers = this.userService.getFollowers(this.userId)
        .subscribe(followers => {
          this.followerCount = this.countFollowers(followers);
        })
  }*/

  private countFollowers(followers){
    if(followers.$value===null){
      console.log("no followers");
      return 0;
    }
    else return size(followers)
  }

  toggleFollow(){
    if(this.isFollowing){
      this.dbService.unfollow(this.currentUserId, this.userId);
    }else{
      this.dbService.follow(this.currentUserId, this.userId);
    }
  }

  ngOnDestroy(){
    this.followers.unsubscribe();
    this.following.unsubscribe();
  }

}

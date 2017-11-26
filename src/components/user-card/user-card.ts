import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
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
  //userData: Observable<User>;
  //userData: User;

  followerCount: number;
  followingCount: number;
  isFollowing: boolean;

  followers: any;
  following:any;

  constructor(
    public nav: NavController,
    public params: NavParams,
    private userService: UserServiceProvider)
  {
      this.userService.init();
  }

  ngOnInit(){
    this.currentUserId = this.userService.getCurrentUserId();
    this.userData = this.userService.getCurrentUserData();
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
      this.userService.unfollow(this.currentUserId, this.userId);
    }else{
      this.userService.follow(this.currentUserId, this.userId);
    }
  }

  ngOnDestroy(){
    this.followers.unsubscribe();
    this.following.unsubscribe();
  }

}

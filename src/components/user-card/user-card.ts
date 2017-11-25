import { Component,OnInit, OnDestroy, Input } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FollowServiceProvider } from '../../providers/follow-service/follow-service';
import { size } from "lodash";


/**
 * Generated class for the UserCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent implements OnInit, OnDestroy {

  @Input() user;        // a user who can be followed
  @Input() currentUser; // currently logged in user

  followerCount: number;
  isFollowing: boolean;
  followers;
  following;

  constructor(private followSvc: FollowServiceProvider,
              public nav: NavController,
              ) {

  }

  ngOnInit() {
    const userId = this.user.$key
    const currentUserId = this.currentUser.uid

    this.following = this.followSvc.getFollowing(currentUserId, userId)
    this.isFollowing = this.following.$value

    this.followers = this.followSvc.getFollowers(userId)
    this.followerCount = this.countFollowers(this.followers)

  }

  private countFollowers(followers) {
    if (followers.$value===null) return 0
    else return size(followers)
  }
  toggleFollow() {
    const userId = this.user.$key
    const currentUserId = this.currentUser.uid
    if (this.isFollowing) this.followSvc.unfollow(currentUserId, userId)
    else this.followSvc.follow(currentUserId, userId)
  }
  ngOnDestroy() {
    this.followers.unsubscribe()
    this.following.unsubscribe()
  }
}

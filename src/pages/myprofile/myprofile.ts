import { Component,OnInit, OnDestroy, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowServiceProvider } from '../../providers/follow-service/follow-service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../../models/user';


/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  constructor(private followSvc: FollowServiceProvider,
              public nav: NavController,
              private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit() {


  }
  signOut(){
    this.afAuth.auth.signOut()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

}

import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

import { LocalstorageProvider } from "../../providers/localstorage/localstorage";
import {FirebaseProvider} from "../../providers/firebase/firebase";


import { User } from '../../models/user';

import 'rxjs/add/operator/take';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;  // an object as User
  userData: Observable<User>;
  signupPage = SignupPage;

  constructor(
    public nav: NavController, private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private _http: Http,
    private localStorage: LocalstorageProvider,
    private FirebaseService: FirebaseProvider
    ) {
  }

  ionViewWillLoad(){
    // let userId = this.localStorage.getUser();
    // if (userId != null){
    //   console.log(userId,'userididid')
    // }
  }
  async login(user: User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.localStorage.setUser(result.uid);
        this.nav.setRoot(TabsPage);
      }
    }catch(e){
      console.error(e);
      let alert = this.alertCtrl.create({
          title: 'Login Failed!',
          subTitle: 'Sorry! Please try it again.',
          buttons: ['OK']
      });
      alert.present();
    }
  }

  async loginWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    const result = await firebase.auth().signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;
        //this.userData = this.afDatabase.object(`user/${result.user.uid}`); // to see if user is already in db
        //console.log("userdata??"+JSON.stringify(this.userData));
        this.user.displayName = result.user.displayName;
        this.user.email = result.user.email;
        this.user.photoURL = result.user.photoURL;
        this.user.password = 'userfromfacebook';
        return true;
    }).catch(function(e){
        console.error(e);
    });
    if(result){
      this.nav.setRoot(TabsPage);
      this.createProfileIfNew();
    }
  }

  //If user log in with facebook for the first time
  createProfileIfNew(){
    this.afAuth.authState.take(1).subscribe(auth => {
      let userId = auth.uid; //get user ID
      this.user.uid = userId;
      this.localStorage.setUser(userId);
      firebase.database().ref('/user/' + userId).once('value').then( snapshot => {
        if(!snapshot.val()){ //if user data doesnt exist
            this.afDatabase.object(`user/${auth.uid}`).set(this.user);
            let alert = this.alertCtrl.create({
              title: 'Welcome!',
              subTitle: 'You\'ve registered successfully!',
              buttons: ['OK']
            });
            alert.present();
        }
      });
      //this.userData = this.afDatabase.object(`user/${auth.uid}`);
      //console.log("userdata??"+JSON.stringify(this.userData));

    });
  }

}

import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;  // an objecct as User
  signupPage = SignupPage;

  constructor(
    public nav: NavController,
    private afAuth: AngularFireAuth) {
  }

  async login(user: User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.nav.setRoot(TabsPage);
      }
    }catch(e){
      console.error(e);
    }
  }
}

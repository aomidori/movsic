import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage = SignupPage;

  constructor(public nav: NavController) {
  }

  public login(){
    this.nav.setRoot(TabsPage);
  }
}

import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  loginPage = LoginPage;
  tabsPage = TabsPage;

  constructor() {
  }


}

import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

import { User } from '../../models/user';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user = {} as User;
  loginPage = LoginPage;
  tabsPage = TabsPage;

  constructor(private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public nav: NavController,
    public alertCtrl: AlertController) {
  }

  async register(user: User){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        this.afAuth.auth.currentUser.updateProfile({
          displayName: user.displayName,
          photoURL: 'https://www.gravatar.com/avatar/'+ Md5.hashStr(user.email.toLowerCase())
        });
        //this.nav.setRoot(TabsPage);
        this.createProfile();
        this.registerSuccessAlert();
      }
    }catch(e){
      console.error(e);
      let alert = this.alertCtrl.create({
          title: 'Registration Failed!',
          subTitle: 'Sorry! Please try it again.',
          buttons: ['OK']
      });
      alert.present();
    }

  }

  registerSuccessAlert(){
    let alert = this.alertCtrl.create({
        title: 'Welcome!',
        subTitle: 'You\'ve registered successfully!',
        buttons: ['OK']
    });
    alert.present();
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.user.uid = auth.uid;
      this.afDatabase.object(`user/${auth.uid}`).set(this.user)
        .then(()=> this.nav.setRoot(TabsPage))
    });
  }


}

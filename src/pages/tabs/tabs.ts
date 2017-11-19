import { Component } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ExplorePage} from '../explore/explore';
import { MessagePage } from '../message/message';
import { MyprofilePage} from '../myprofile/myprofile';

import { AngularFireAuth} from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = MessagePage;
  tab4Root = MyprofilePage;


  constructor(
    private afAuth: AngularFireAuth, private toast: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe( res =>{
      console.log(res);
      if(res.displayName){
        this.toast.create({
          message: 'Welcome '+res.displayName,
          duration: 2000
        }).present();
      }else{
        this.toast.create({
          message: 'No authentication details',
          duration: 2000
        }).present();
      }
    });
  }
}

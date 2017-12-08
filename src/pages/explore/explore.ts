import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, AlertController } from 'ionic-angular';
import { RecomPage } from '../recom/recom';

//@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {
  recomPage = RecomPage;
  constructor(public navCtrl: NavController) {
  }

}


import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, AlertController } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';

//
@Component({
  selector: 'page-recom',
  templateUrl: 'recom.html',
  //entryComponents:[ ExplorePage ]
})
export class RecomPage {
  explorePage = ExplorePage;
  constructor(public navCtrl: NavController) {
    //explorePage: ExplorePage;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecomPage');
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-recognition',
  templateUrl: 'recognition.html',
})
export class RecognitionPage {
  actionText: string;
  recognizing: boolean;
  ifResult: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actionText = "Tap to start";
    this.recognizing = false;
    this.ifResult = false;
  }

  ionViewDidLoad() {

  }
  startRecg(){
    var that = this;
    this.actionText = "Tap to stop";
    this.recognizing = true;
    setTimeout(function(){
      //this.ifResult = true;
      that.showResult();
    }, 4000);
  }
  stopRecg(){
    this.actionText = "Tap to start";
    this.recognizing = false;
  }
  showResult(){
    this.ifResult = true;
  }




}
